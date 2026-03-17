import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPlayers, getPlayerStats } from "@/lib/data-store";
import { POSITIONS } from "@/lib/constants";
import { formatThaiDate } from "@/lib/utils";

const POSITION_COLOR: Record<string, string> = {
  GK: "#D29922",
  DF: "#3B82F6",
  MF: "#22C55E",
  FW: "#C41E3A",
};

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

  const posColor = POSITION_COLOR[player.position] ?? "#C41E3A";

  const statItems = [
    { label: "ลงสนาม", value: stats?.appearances ?? 0, accent: false },
    { label: "ประตู", value: stats?.goals ?? 0, accent: true },
    { label: "แอสซิสต์", value: stats?.assists ?? 0, accent: false },
    { label: "ใบเหลือง", value: stats?.yellowCards ?? 0, accent: false },
    { label: "ใบแดง", value: stats?.redCards ?? 0, accent: false },
    ...(player.position === "GK"
      ? [{ label: "คลีนชีท", value: stats?.cleanSheets ?? 0, accent: false }]
      : []),
    { label: "นาที", value: stats?.minutesPlayed ?? 0, accent: false },
  ];

  const bioItems = [
    player.dateOfBirth && { label: "วันเกิด", value: formatThaiDate(new Date(player.dateOfBirth)) },
    player.heightCm && { label: "ส่วนสูง", value: `${player.heightCm} ซม.` },
    player.weightKg && { label: "น้ำหนัก", value: `${player.weightKg} กก.` },
    player.preferredFoot && { label: "เท้าที่ถนัด", value: player.preferredFoot },
    player.nationality && { label: "สัญชาติ", value: player.nationality },
    player.hometown && { label: "ภูมิลำเนา", value: player.hometown },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #070d1c 0%, #0a0e1a 40%, #0d0812 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <Link
          href="/squad"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับไปหน้าทีม
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">

          {/* ── Left: FUT-style card ── */}
          <div className="w-full max-w-[380px] mx-auto lg:mx-0">
            {/* Card */}
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                aspectRatio: "3/4",
                background: "linear-gradient(160deg, #0f1d35 0%, #0a0e1a 60%, #1a0a10 100%)",
                boxShadow: `0 0 60px ${posColor}30, 0 20px 60px rgba(0,0,0,0.8)`,
                border: `1px solid ${posColor}30`,
              }}
            >
              {/* Glow border */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                style={{ boxShadow: `inset 0 0 0 1px ${posColor}40` }}
              />

              {/* Top strip */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-5">
                <span
                  className="text-sm font-extrabold tracking-widest px-3 py-1 rounded-lg"
                  style={{
                    background: `${posColor}25`,
                    color: posColor,
                    border: `1px solid ${posColor}50`,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {POSITIONS[player.position]}
                </span>
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-display)" }}
                >
                  SWP FC
                </span>
              </div>

              {/* Jersey number watermark */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
                style={{
                  fontSize: "clamp(120px, 55%, 200px)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.035)",
                  lineHeight: 1,
                }}
              >
                {player.jerseyNumber}
              </div>

              {/* Photo */}
              <div className="absolute inset-0 z-[1]">
                {player.photoUrl ? (
                  <Image
                    src={player.photoUrl}
                    alt={player.nameTh}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="380px"
                  />
                ) : (
                  <div className="w-full h-full flex items-end justify-center pb-20">
                    <svg className="w-40 h-40 opacity-10" fill="white" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 z-[2]"
                style={{
                  height: "50%",
                  background: "linear-gradient(to top, rgba(5,8,20,0.98) 0%, rgba(5,8,20,0.85) 40%, transparent 100%)",
                }}
              />

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 z-[3] px-6 pb-6">
                <div
                  className="font-extrabold leading-none mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(48px, 15vw, 72px)",
                    color: posColor,
                    textShadow: `0 0 30px ${posColor}80`,
                  }}
                >
                  {player.jerseyNumber}
                </div>
                <h1
                  className="font-extrabold text-white leading-tight"
                  style={{ fontSize: "clamp(16px, 4vw, 22px)", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
                >
                  {player.nameTh}
                </h1>
                {player.nameEn && (
                  <p className="text-sm mt-0.5 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {player.nameEn}
                  </p>
                )}
                {player.nickname && (
                  <p className="text-sm mt-1 font-medium" style={{ color: `${posColor}cc` }}>
                    &ldquo;{player.nickname}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="space-y-6">

            {/* Position label + name (desktop header) */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full" style={{ background: posColor }} />
                <span
                  className="text-sm font-bold tracking-widest uppercase"
                  style={{ color: posColor }}
                >
                  {POSITIONS[player.position]}
                </span>
              </div>
              <h1
                className="font-extrabold text-white"
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontFamily: "var(--font-display)",
                  lineHeight: 1.1,
                  textShadow: `0 0 40px ${posColor}20`,
                }}
              >
                {player.nameTh}
              </h1>
              {player.nickname && (
                <p className="mt-2 text-lg font-medium" style={{ color: `${posColor}cc` }}>
                  &ldquo;{player.nickname}&rdquo;
                </p>
              )}
            </div>

            {/* Season Stats */}
            {stats && (
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                  สถิติฤดูกาล 2569
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {statItems.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: s.accent ? `${posColor}15` : "rgba(255,255,255,0.04)",
                        border: s.accent ? `1px solid ${posColor}40` : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p
                        className="font-extrabold leading-none"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(24px, 6vw, 36px)",
                          color: s.accent ? posColor : "white",
                          textShadow: s.accent ? `0 0 20px ${posColor}60` : "none",
                        }}
                      >
                        {s.value}
                      </p>
                      <p className="text-xs mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bio */}
            {bioItems.length > 0 && (
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                  ข้อมูลนักเตะ
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {bioItems.map((b) => (
                    <div
                      key={b.label}
                      className="rounded-xl px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {b.label}
                      </p>
                      <p className="text-sm font-semibold text-white">{b.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
