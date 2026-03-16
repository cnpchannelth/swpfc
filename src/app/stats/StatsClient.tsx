"use client";

import { useState } from "react";
import type { PlayerSeasonStats, LeagueStanding, Match } from "@/types";
import { POSITIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type StatTab = "scorers" | "assists" | "cleansheets";

export default function StatsClient({
  playerStats,
  standings,
  matches,
}: {
  playerStats: PlayerSeasonStats[];
  standings: LeagueStanding[];
  matches: Match[];
}) {
  const [tab, setTab] = useState<StatTab>("scorers");

  const swpStats = standings.find((s) => s.team.isOwn);
  const _completedMatches = matches.filter((m) => m.status === "completed");

  // Sort by different stat
  const topScorers = [...playerStats]
    .filter((s) => s.goals > 0)
    .sort((a, b) => b.goals - a.goals);

  const topAssists = [...playerStats]
    .filter((s) => s.assists > 0)
    .sort((a, b) => b.assists - a.assists);

  const cleanSheets = [...playerStats]
    .filter((s) => s.cleanSheets > 0)
    .sort((a, b) => b.cleanSheets - a.cleanSheets);

  const tabs: { key: StatTab; label: string }[] = [
    { key: "scorers", label: "ดาวซัลโว" },
    { key: "assists", label: "แอสซิสต์" },
    { key: "cleansheets", label: "คลีนชีท" },
  ];

  const totalGoals = playerStats.reduce((sum, s) => sum + s.goals, 0);
  const totalAssists = playerStats.reduce((sum, s) => sum + s.assists, 0);
  const winRate = swpStats
    ? Math.round((swpStats.won / swpStats.played) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-white mb-2">สถิติ</h1>
      <p className="text-text-muted mb-6">สถิติสโมสรตำรวจสวรรคโลก เอฟซี ฤดูกาล 2569</p>

      {/* Team Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "ประตูรวม", value: totalGoals, color: "text-primary" },
          { label: "แอสซิสต์รวม", value: totalAssists, color: "text-secondary-light" },
          { label: "คลีนชีท", value: swpStats ? playerStats.reduce((sum, s) => sum + s.cleanSheets, 0) : 0, color: "text-success" },
          { label: "อัตราชนะ", value: `${winRate}%`, color: "text-warning" },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface border border-border rounded-xl p-6 text-center">
            <p className={`text-4xl font-extrabold font-[family-name:var(--font-display)] ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-sm text-text-muted mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Stat Category Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
              tab === t.key
                ? "text-white border-primary"
                : "text-text-muted border-transparent hover:text-white"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Stat Table */}
      <div className="flex flex-col gap-2">
        {(tab === "scorers" ? topScorers : tab === "assists" ? topAssists : cleanSheets).map(
          (stat, index) => {
            const value =
              tab === "scorers"
                ? stat.goals
                : tab === "assists"
                  ? stat.assists
                  : stat.cleanSheets;
            const maxValue =
              tab === "scorers"
                ? topScorers[0]?.goals || 1
                : tab === "assists"
                  ? topAssists[0]?.assists || 1
                  : cleanSheets[0]?.cleanSheets || 1;
            const barWidth = (value / maxValue) * 100;

            return (
              <div
                key={stat.id}
                className="bg-surface border border-border rounded-lg p-4 flex items-center gap-4"
              >
                {/* Rank */}
                <span className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-muted w-8 text-center">
                  {index + 1}
                </span>

                {/* Player Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 bg-surface-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">
                      {stat.player.jerseyNumber}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {stat.player.nameTh}
                    </p>
                    <p className="text-xs text-text-muted">
                      {POSITIONS[stat.player.position]}
                    </p>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="hidden md:block flex-1 max-w-xs">
                  <div className="h-2 bg-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>

                {/* Value */}
                <span className="text-3xl font-extrabold font-[family-name:var(--font-display)] text-primary w-12 text-right">
                  {value}
                </span>
              </div>
            );
          }
        )}

        {(tab === "scorers" ? topScorers : tab === "assists" ? topAssists : cleanSheets)
          .length === 0 && (
          <p className="text-center text-text-muted py-12">ยังไม่มีข้อมูลสถิติ</p>
        )}
      </div>
    </div>
  );
}
