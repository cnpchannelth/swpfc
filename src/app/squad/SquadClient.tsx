"use client";

import { useState } from "react";
import PlayerCard from "@/components/squad/PlayerCard";
import type { Player } from "@/types";
import { type Position } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FILTERS: { key: "ALL" | Position; label: string; short: string }[] = [
  { key: "ALL",  label: "ทั้งหมด",        short: "ALL" },
  { key: "GK",   label: "ผู้รักษาประตู",  short: "GK"  },
  { key: "DF",   label: "กองหลัง",        short: "DF"  },
  { key: "MF",   label: "กองกลาง",        short: "MF"  },
  { key: "FW",   label: "กองหน้า",        short: "FW"  },
];

const FILTER_COLOR: Record<string, string> = {
  GK: "#D29922", DF: "#3B82F6", MF: "#22C55E", FW: "#C41E3A", ALL: "#C41E3A",
};

export default function SquadClient({ players }: { players: Player[] }) {
  const [filter, setFilter] = useState<"ALL" | Position>("ALL");

  const filtered =
    filter === "ALL" ? players : players.filter((p) => p.position === filter);

  const color = FILTER_COLOR[filter];

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #070d1c 0%, #0a0e1a 40%, #0d0812 100%)",
        minHeight: "100vh",
      }}
    >
      {/* ── Hero header ── */}
      <div className="relative overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Red glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #C41E3A 0%, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-8">
          <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-2 font-semibold">
            ฤดูกาล 2569
          </p>
          <h1
            className="font-extrabold text-white leading-none mb-3"
            style={{
              fontSize: "clamp(40px, 10vw, 80px)",
              fontFamily: "var(--font-display)",
              textShadow: "0 0 60px rgba(196,30,58,0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            ทีมนักเตะ
          </h1>
          <div className="w-16 h-1 rounded-full" style={{ background: color }} />
          <p className="text-sm text-white/40 mt-3">
            {players.length} นักเตะ · Police Sawankhalok FC
          </p>
        </div>
      </div>

      {/* ── Position filter ── */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const fc = FILTER_COLOR[f.key];
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "relative px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-200",
                  active ? "text-white" : "text-white/40 hover:text-white/70"
                )}
                style={
                  active
                    ? {
                        background: `${fc}20`,
                        border: `1px solid ${fc}60`,
                        boxShadow: `0 0 16px ${fc}30`,
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
              >
                <span style={{ fontFamily: "var(--font-display)" }}>
                  {f.short}
                </span>
                <span className="ml-2 text-xs opacity-60 font-normal">
                  {f.label}
                </span>
                {active && (
                  <span
                    className="ml-2 text-xs font-bold"
                    style={{ color: fc }}
                  >
                    {f.key === "ALL"
                      ? players.length
                      : players.filter((p) => p.position === f.key).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Player grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-8">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/30 py-20 text-sm">ไม่พบนักเตะ</p>
        )}
      </div>
    </div>
  );
}
