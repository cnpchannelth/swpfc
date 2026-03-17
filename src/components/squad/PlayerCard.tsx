import Link from "next/link";
import Image from "next/image";
import type { Player } from "@/types";

const POSITION_LABEL: Record<string, string> = {
  GK: "GK", DF: "DF", MF: "MF", FW: "FW",
};

const POSITION_COLOR: Record<string, string> = {
  GK: "#D29922",
  DF: "#3B82F6",
  MF: "#22C55E",
  FW: "#C41E3A",
};

export default function PlayerCard({ player }: { player: Player }) {
  const posColor = POSITION_COLOR[player.position] ?? "#C41E3A";

  return (
    <Link href={`/squad/${player.id}`} className="block group">
      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-300 ease-out
          group-hover:-translate-y-2 group-hover:shadow-2xl"
        style={{
          aspectRatio: "3/4",
          background: "linear-gradient(160deg, #0f1d35 0%, #0a0e1a 60%, #1a0a10 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
          style={{
            boxShadow: `inset 0 0 0 1.5px ${posColor}60, 0 0 30px ${posColor}30`,
          }}
        />

        {/* Top strip — position badge */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 pt-3">
          <span
            className="text-xs font-extrabold tracking-widest px-2 py-0.5 rounded"
            style={{
              background: `${posColor}25`,
              color: posColor,
              border: `1px solid ${posColor}50`,
              fontFamily: "var(--font-display)",
            }}
          >
            {POSITION_LABEL[player.position]}
          </span>
          {/* SWP badge */}
          <span className="text-[10px] font-bold text-white/30 tracking-widest"
            style={{ fontFamily: "var(--font-display)" }}>
            SWP
          </span>
        </div>

        {/* Jersey number watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
          style={{
            fontSize: "clamp(80px, 40%, 140px)",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.04)",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {player.jerseyNumber}
        </div>

        {/* Player photo */}
        <div className="absolute inset-0 z-[1]">
          {player.photoUrl ? (
            <Image
              src={player.photoUrl}
              alt={player.nameTh}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-end justify-center pb-12">
              <svg
                className="w-28 h-28 opacity-10"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>

        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[2]"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(5,8,20,0.98) 0%, rgba(5,8,20,0.85) 40%, transparent 100%)",
          }}
        />

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] px-4 pb-4">
          {/* Jersey number */}
          <div
            className="font-extrabold leading-none mb-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 8vw, 40px)",
              color: posColor,
              textShadow: `0 0 20px ${posColor}80`,
            }}
          >
            {player.jerseyNumber}
          </div>

          {/* Name */}
          <h3
            className="font-extrabold text-white leading-tight line-clamp-2"
            style={{
              fontSize: "clamp(13px, 3.5vw, 16px)",
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
            }}
          >
            {player.nameTh}
          </h3>

          {/* Nickname */}
          {player.nickname && (
            <p className="text-xs mt-0.5 truncate" style={{ color: `${posColor}cc` }}>
              &ldquo;{player.nickname}&rdquo;
            </p>
          )}
        </div>

        {/* Diagonal shine on hover */}
        <div
          className="absolute inset-0 z-[4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
          }}
        />
      </div>
    </Link>
  );
}
