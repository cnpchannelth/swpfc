"use client";

import { useState } from "react";
import PlayerCard from "@/components/squad/PlayerCard";
import type { Player } from "@/types";
import { POSITIONS, type Position } from "@/lib/constants";
import { cn } from "@/lib/utils";

const positionFilters: { key: "ALL" | Position; label: string }[] = [
  { key: "ALL", label: "ทั้งหมด" },
  { key: "GK", label: "ผู้รักษาประตู" },
  { key: "DF", label: "กองหลัง" },
  { key: "MF", label: "กองกลาง" },
  { key: "FW", label: "กองหน้า" },
];

export default function SquadClient({ players }: { players: Player[] }) {
  const [filter, setFilter] = useState<"ALL" | Position>("ALL");

  const filteredPlayers =
    filter === "ALL"
      ? players
      : players.filter((p) => p.position === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-white mb-2">ทีมนักเตะ</h1>
      <p className="text-text-muted mb-6">
        รายชื่อนักเตะสโมสรตำรวจสวรรคโลก เอฟซี ฤดูกาล 2569
      </p>

      {/* Position Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {positionFilters.map((pf) => (
          <button
            key={pf.key}
            onClick={() => setFilter(pf.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === pf.key
                ? "bg-primary text-white"
                : "bg-surface border border-border text-text-muted hover:text-white hover:border-primary/50"
            )}
          >
            {pf.label}
            {pf.key !== "ALL" && (
              <span className="ml-1 text-xs opacity-60">
                ({players.filter((p) => p.position === pf.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Player Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <p className="text-center text-text-muted py-12">ไม่พบนักเตะ</p>
      )}
    </div>
  );
}
