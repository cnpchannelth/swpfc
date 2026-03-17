import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPlayers, getPlayerStats } from "@/lib/data-store";
import { POSITIONS } from "@/lib/constants";
import { formatThaiDate } from "@/lib/utils";

export const runtime = "edge";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PlayerDetailPage({ params }: Props) {
  const { id } = await params;
  const players = await getPlayers();
  const player = players.find((p) => p.id === parseInt(id));
  if (!player) return notFound();

  const allStats = await getPlayerStats();
  const stats = allStats.find((s) => s.player.id === player.id);

  const positionColors = {
    GK: "bg-warning/20 text-warning border-warning/30",
    DF: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    MF: "bg-green-500/20 text-green-400 border-green-500/30",
    FW: "bg-primary/20 text-primary border-primary/30",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/squad"
        className="text-sm text-text-muted hover:text-primary transition-colors mb-6 inline-block"
      >
        &larr; กลับไปหน้าทีม
      </Link>

      {/* Player Hero */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="relative h-56 md:h-72 bg-gradient-to-br from-secondary-dark via-secondary to-dark flex items-center justify-center overflow-hidden">
          {player.photoUrl ? (
            <>
              <Image
                src={player.photoUrl}
                alt={player.nameTh}
                fill
                className="object-cover object-top"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent" />
            </>
          ) : (
            <span className="text-[120px] md:text-[180px] font-extrabold font-[family-name:var(--font-display)] text-primary/15 select-none">
              {player.jerseyNumber}
            </span>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl font-bold font-[family-name:var(--font-display)] text-primary">
                  #{player.jerseyNumber}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium border ${positionColors[player.position]}`}
                >
                  {POSITIONS[player.position]}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-text">
                {player.nameTh}
              </h1>
              {player.nickname && (
                <p className="text-text-muted mt-1">
                  &quot;{player.nickname}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Bio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {player.dateOfBirth && (
              <div className="bg-dark rounded-lg p-3">
                <p className="text-xs text-text-muted">วันเกิด</p>
                <p className="text-sm font-medium text-text mt-1">
                  {formatThaiDate(new Date(player.dateOfBirth))}
                </p>
              </div>
            )}
            {player.heightCm && (
              <div className="bg-dark rounded-lg p-3">
                <p className="text-xs text-text-muted">ส่วนสูง</p>
                <p className="text-sm font-medium text-text mt-1">
                  {player.heightCm} ซม.
                </p>
              </div>
            )}
            {player.weightKg && (
              <div className="bg-dark rounded-lg p-3">
                <p className="text-xs text-text-muted">น้ำหนัก</p>
                <p className="text-sm font-medium text-text mt-1">
                  {player.weightKg} กก.
                </p>
              </div>
            )}
            {player.preferredFoot && (
              <div className="bg-dark rounded-lg p-3">
                <p className="text-xs text-text-muted">เท้าที่ถนัด</p>
                <p className="text-sm font-medium text-text mt-1">
                  {player.preferredFoot}
                </p>
              </div>
            )}
            <div className="bg-dark rounded-lg p-3">
              <p className="text-xs text-text-muted">สัญชาติ</p>
              <p className="text-sm font-medium text-text mt-1">
                {player.nationality}
              </p>
            </div>
            {player.hometown && (
              <div className="bg-dark rounded-lg p-3">
                <p className="text-xs text-text-muted">ภูมิลำเนา</p>
                <p className="text-sm font-medium text-text mt-1">
                  {player.hometown}
                </p>
              </div>
            )}
          </div>

          {/* Season Stats */}
          {stats && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded" />
                สถิติฤดูกาล 2569
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                {[
                  { label: "ลงสนาม", value: stats.appearances },
                  { label: "ประตู", value: stats.goals, highlight: true },
                  { label: "แอสซิสต์", value: stats.assists },
                  { label: "ใบเหลือง", value: stats.yellowCards },
                  { label: "ใบแดง", value: stats.redCards },
                  ...(player.position === "GK"
                    ? [{ label: "คลีนชีท", value: stats.cleanSheets }]
                    : []),
                  { label: "นาที", value: stats.minutesPlayed },
                ].map((stat) => (
                  <div key={stat.label} className="bg-dark rounded-lg p-3 text-center">
                    <p className={`text-2xl font-bold font-[family-name:var(--font-display)] ${stat.highlight ? "text-primary" : "text-text"}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
