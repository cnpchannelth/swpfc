"use client";

import { useState } from "react";
import Image from "next/image";
import type { PlayerSeasonStats, LeagueStanding, Match } from "@/types";
import { POSITIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type StatTab = "scorers" | "assists" | "cleansheets" | "cards";

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
  const completedMatches = matches.filter((m) => m.status === "completed");

  const topScorers = [...playerStats].filter((s) => s.goals > 0).sort((a, b) => b.goals - a.goals);
  const topAssists = [...playerStats].filter((s) => s.assists > 0).sort((a, b) => b.assists - a.assists);
  const cleanSheets = [...playerStats].filter((s) => s.cleanSheets > 0).sort((a, b) => b.cleanSheets - a.cleanSheets);
  const mostCards = [...playerStats]
    .filter((s) => s.yellowCards + s.redCards > 0)
    .sort((a, b) => (b.yellowCards + b.redCards * 2) - (a.yellowCards + a.redCards * 2));

  const tabs: { key: StatTab; label: string; icon: string; list: PlayerSeasonStats[] }[] = [
    { key: "scorers", label: "ดาวซัลโว", icon: "⚽", list: topScorers },
    { key: "assists", label: "แอสซิสต์", icon: "🎯", list: topAssists },
    { key: "cleansheets", label: "คลีนชีท", icon: "🧤", list: cleanSheets },
    { key: "cards", label: "ใบเหลือง/แดง", icon: "🟨", list: mostCards },
  ];

  const totalGoals = playerStats.reduce((sum, s) => sum + s.goals, 0);
  const totalAssists = playerStats.reduce((sum, s) => sum + s.assists, 0);
  const totalCleanSheets = playerStats.reduce((sum, s) => sum + s.cleanSheets, 0);
  const winRate = swpStats && swpStats.played > 0
    ? Math.round((swpStats.won / swpStats.played) * 100)
    : 0;

  const activeTab = tabs.find((t) => t.key === tab)!;

  function getValue(s: PlayerSeasonStats) {
    if (tab === "scorers") return s.goals;
    if (tab === "assists") return s.assists;
    if (tab === "cleansheets") return s.cleanSheets;
    return s.yellowCards + s.redCards;
  }

  const maxValue = Math.max(...activeTab.list.map(getValue), 1);

  const rankColors = ["bg-yellow-400 text-yellow-900", "bg-gray-300 text-gray-700", "bg-amber-600 text-amber-100"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text mb-1">สถิติ</h1>
        <p className="text-text-muted">ตำรวจสวรรคโลก เอฟซี · ฤดูกาล 2569</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "ประตูทั้งหมด", value: totalGoals, color: "from-red-500 to-primary", icon: "⚽", sub: `${completedMatches.length} นัด` },
          { label: "แอสซิสต์รวม", value: totalAssists, color: "from-secondary to-blue-600", icon: "🎯", sub: "ช่วยยิง" },
          { label: "คลีนชีท", value: totalCleanSheets, color: "from-green-500 to-emerald-600", icon: "🧤", sub: "รักษาประตู" },
          { label: "อัตราชนะ", value: `${winRate}%`, color: "from-amber-500 to-orange-500", icon: "🏆", sub: `${swpStats?.won ?? 0}W ${swpStats?.drawn ?? 0}D ${swpStats?.lost ?? 0}L` },
        ].map((stat) => (
          <div key={stat.label}
            className="relative bg-surface border border-border rounded-2xl p-5 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.07]`} />
            <div className="relative">
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-3xl font-extrabold font-[family-name:var(--font-display)] text-text leading-none">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-text-muted mt-1">{stat.label}</p>
              <p className="text-xs text-text-muted/70 mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface-light rounded-xl p-1 border border-border w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all",
              tab === t.key
                ? "bg-white text-primary shadow-sm border border-border/50"
                : "text-text-muted hover:text-text"
            )}
          >
            <span className="mr-1.5">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Stat List */}
      <div className="flex flex-col gap-3">
        {activeTab.list.map((stat, index) => {
          const value = getValue(stat);
          const barWidth = (value / maxValue) * 100;

          return (
            <div
              key={stat.id}
              className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              {/* Rank Badge */}
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center font-extrabold font-[family-name:var(--font-display)] text-sm flex-shrink-0",
                index < 3 ? rankColors[index] : "bg-surface-light text-text-muted"
              )}>
                {index + 1}
              </div>

              {/* Photo + Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-border">
                  {stat.player.photoUrl ? (
                    <Image src={stat.player.photoUrl} alt={stat.player.nameTh} width={48} height={48} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-lg font-bold font-[family-name:var(--font-display)] text-primary/60">
                      {stat.player.jerseyNumber}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-text truncate leading-tight">{stat.player.nameTh}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text-muted">{POSITIONS[stat.player.position]}</span>
                    <span className="text-text-muted/40">·</span>
                    <span className="text-xs text-text-muted">{stat.appearances} นัด</span>
                    {tab === "cards" && (
                      <>
                        {stat.yellowCards > 0 && <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium">🟨 {stat.yellowCards}</span>}
                        {stat.redCards > 0 && <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">🟥 {stat.redCards}</span>}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="hidden md:flex flex-col gap-1 flex-1 max-w-[200px]">
                <div className="h-2.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>

              {/* Value */}
              <div className="text-right flex-shrink-0">
                <span className="text-4xl font-extrabold font-[family-name:var(--font-display)] text-primary leading-none">
                  {value}
                </span>
                <p className="text-xs text-text-muted mt-0.5">
                  {tab === "scorers" ? "ประตู" : tab === "assists" ? "แอสซิสต์" : tab === "cleansheets" ? "คลีนชีท" : "ใบ"}
                </p>
              </div>
            </div>
          );
        })}

        {activeTab.list.length === 0 && (
          <div className="bg-surface border border-border rounded-2xl p-16 text-center">
            <p className="text-4xl mb-3">{activeTab.icon}</p>
            <p className="text-text-muted font-medium">ยังไม่มีข้อมูลสถิติ</p>
            <p className="text-text-muted/60 text-sm mt-1">เพิ่มสถิติในหน้า Admin → สถิติ</p>
          </div>
        )}
      </div>
    </div>
  );
}
