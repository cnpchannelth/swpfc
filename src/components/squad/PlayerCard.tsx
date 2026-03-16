import Link from "next/link";
import Image from "next/image";
import { POSITIONS } from "@/lib/constants";
import type { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const positionColors = {
    GK: "bg-warning/20 text-warning",
    DF: "bg-blue-500/20 text-blue-400",
    MF: "bg-green-500/20 text-green-400",
    FW: "bg-primary/20 text-primary",
  };

  return (
    <Link href={`/squad/${player.id}`} className="block h-[280px]">
      <div className="flip-card h-full w-full">
        <div className="flip-card-inner rounded-xl overflow-hidden">

          {/* ======== FRONT ======== */}
          <div className="flip-card-front bg-surface border border-border rounded-xl overflow-hidden">
            {/* Photo area */}
            <div className="relative h-48 bg-gradient-to-br from-secondary-dark to-dark flex items-center justify-center overflow-hidden">
              <span className="absolute top-3 left-3 text-5xl font-extrabold font-[family-name:var(--font-display)] text-primary/30 z-10 select-none">
                {player.jerseyNumber}
              </span>

              {player.photoUrl ? (
                <Image
                  src={player.photoUrl}
                  alt={player.nameTh}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <svg className="w-24 h-24 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}

              {player.photoUrl && (
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold font-[family-name:var(--font-display)] text-primary">
                  #{player.jerseyNumber}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${positionColors[player.position]}`}>
                  {POSITIONS[player.position]}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm leading-snug">{player.nameTh}</h3>
              {player.nickname && (
                <p className="text-xs text-text-muted mt-0.5">&quot;{player.nickname}&quot;</p>
              )}
            </div>
          </div>

          {/* ======== BACK ======== */}
          <div className="flip-card-back bg-surface border border-primary/40 rounded-xl overflow-hidden flex flex-col p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-extrabold font-[family-name:var(--font-display)] text-primary/40 select-none leading-none">
                {player.jerseyNumber}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${positionColors[player.position]}`}>
                {POSITIONS[player.position]}
              </span>
            </div>

            <h3 className="font-extrabold text-white text-base leading-snug mb-3">
              {player.nameTh}
            </h3>

            <div className="grid grid-cols-2 gap-2 flex-1 text-xs">
              {player.nationality && (
                <div className="bg-dark rounded-lg p-2">
                  <p className="text-text-muted">สัญชาติ</p>
                  <p className="text-white font-medium mt-0.5">{player.nationality}</p>
                </div>
              )}
              {player.preferredFoot && (
                <div className="bg-dark rounded-lg p-2">
                  <p className="text-text-muted">เท้าถนัด</p>
                  <p className="text-white font-medium mt-0.5">{player.preferredFoot}</p>
                </div>
              )}
              {player.heightCm && (
                <div className="bg-dark rounded-lg p-2">
                  <p className="text-text-muted">ส่วนสูง</p>
                  <p className="text-white font-medium mt-0.5">{player.heightCm} ซม.</p>
                </div>
              )}
              {player.hometown && (
                <div className="bg-dark rounded-lg p-2">
                  <p className="text-text-muted">ภูมิลำเนา</p>
                  <p className="text-white font-medium mt-0.5 truncate">{player.hometown}</p>
                </div>
              )}
            </div>

            <p className="text-xs text-primary mt-3 text-center">แตะเพื่อดูโปรไฟล์ →</p>
          </div>

        </div>
      </div>
    </Link>
  );
}
