"use client";

import { useState } from "react";
import Image from "next/image";
import type { PlayerSeasonStats, LeagueStanding, Match } from "@/types";
import { POSITIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type StatTab = "scorers" | "assists" | "cleansheets" | "cards";

const POSITION_COLOR: Record<string, string> = {
  GK: "#D29922", DF: "#3B82F6", MF: "#22C55E", FW: "#C41E3A",
};

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

  const topScorers    = [...playerStats].filter((s) => s.goals > 0).sort((a, b) => b.goals - a.goals);
  const topAssists    = [...playerStats].filter((s) => s.assists > 0).sort((a, b) => b.assists - a.assists);
  const cleanSheets   = [...playerStats].filter((s) => s.cleanSheets > 0).sort((a, b) => b.cleanSheets - a.cleanSheets);
  const mostCards     = [...playerStats]
    .filter((s) => s.yellowCards + s.redCards > 0)
    .sort((a, b) => (b.yellowCards + b.redCards * 2) - (a.yellowCards + a.redCards * 2));

  const tabs: { key: StatTab; label: string; icon: string; color: string; list: PlayerSeasonStats[] }[] = [
    { key: "scorers",     label: "ดาวซัลโว",     icon: "⚽", color: "#C41E3A", list: topScorers },
    { key: "assists",     label: "แอสซิสต์",     icon: "🎯", color: "#3B82F6", list: topAssists },
    { key: "cleansheets", label: "คลีนชีท",      icon: "🧤", color: "#22C55E", list: cleanSheets },
    { key: "cards",       label: "ใบเหลือง/แดง", icon: "🟨", color: "#D29922", list: mostCards },
  ];

  const totalGoals      = playerStats.reduce((sum, s) => sum + s.goals, 0);
  const totalAssists    = playerStats.reduce((sum, s) => sum + s.assists, 0);
  const totalCleanSheets = playerStats.reduce((sum, s) => sum + s.cleanSheets, 0);
  const winRate = swpStats && swpStats.played > 0
    ? Math.round((swpStats.won / swpStats.played) * 100) : 0;

  const activeTab = tabs.find((t) => t.key === tab)!;
  const accentColor = activeTab.color;

  function getValue(s: PlayerSeasonStats) {
    if (tab === "scorers")     return s.goals;
    if (tab === "assists")     return s.assists;
    if (tab === "cleansheets") return s.cleanSheets;
    return s.yellowCards + s.redCards;
  }

  const maxValue = Math.max(...activeTab.list.map(getValue), 1);

  const rankStyle = [
    { bg: "rgba(255,215,0,0.15)", border: "rgba(255,215,0,0.5)", text: "#FFD700", glow: "rgba(255,215,0,0.3)" },
    { bg: "rgba(192,192,192,0.15)", border: "rgba(192,192,192,0.4)", text: "#C0C0C0", glow: "rgba(192,192,192,0.2)" },
    { bg: "rgba(205,127,50,0.15)", border: "rgba(205,127,50,0.4)", text: "#CD7F32", glow: "rgba(205,127,50,0.2)" },
  ];

  return (
    <div style={{ background: "linear-gradient(180deg, #070d1c 0%, #0a0e1a 40%, #0d0812 100%)", minHeight: "100vh" }}>

      {/* ── Scanline overlay ── */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* Glow blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accentColor} 0%, transparent 70%)`, transition: "background 0.5s" }} />

        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-8 z-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ color: `${accentColor}cc` }}>
            ฤดูกาล 2569 · Police Sawankhalok FC
          </p>
          <h1 className="font-extrabold text-white leading-none mb-3"
            style={{ fontSize: "clamp(40px, 10vw, 80px)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em", textShadow: `0 0 60px ${accentColor}40` }}>
            สถิติ
          </h1>
          <div className="w-20 h-1 rounded-full transition-all duration-500" style={{ background: accentColor }} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pb-16 z-10">

        {/* ── Overview stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { label: "ประตูทั้งหมด", value: totalGoals, color: "#C41E3A", sub: `${completedMatches.length} นัด`, icon: "⚽" },
            { label: "แอสซิสต์รวม", value: totalAssists, color: "#3B82F6", sub: "ช่วยยิง", icon: "🎯" },
            { label: "คลีนชีท",     value: totalCleanSheets, color: "#22C55E", sub: "รักษาประตู", icon: "🧤" },
            { label: "อัตราชนะ",    value: `${winRate}%`, color: "#D29922", sub: `${swpStats?.won ?? 0}W ${swpStats?.drawn ?? 0}D ${swpStats?.lost ?? 0}L`, icon: "🏆" },
          ].map((stat) => (
            <div key={stat.label} className="relative overflow-hidden rounded-2xl p-5 group"
              style={{
                background: `linear-gradient(135deg, ${stat.color}18 0%, rgba(255,255,255,0.03) 100%)`,
                border: `1px solid ${stat.color}35`,
                boxShadow: `0 0 20px ${stat.color}10`,
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px ${stat.color}30`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px ${stat.color}10`)}
            >
              {/* Corner glow */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30"
                style={{ background: stat.color }} />
              <p className="text-2xl mb-3">{stat.icon}</p>
              <p className="font-extrabold leading-none mb-1 text-white"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 7vw, 44px)", textShadow: `0 0 30px ${stat.color}80` }}>
                {stat.value}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: stat.color }}>
                {stat.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="relative px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden"
                style={active ? {
                  background: `${t.color}20`,
                  border: `1px solid ${t.color}60`,
                  color: "white",
                  boxShadow: `0 0 20px ${t.color}30, inset 0 0 20px ${t.color}10`,
                } : {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {active && (
                  <div className="absolute inset-0 opacity-20 rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${t.color} 0%, transparent 100%)` }} />
                )}
                <span className="relative">{t.icon} {t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Player Stat List ── */}
        <div className="flex flex-col gap-3">
          {activeTab.list.map((stat, index) => {
            const value = getValue(stat);
            const barWidth = (value / maxValue) * 100;
            const posColor = POSITION_COLOR[stat.player.position] ?? "#C41E3A";
            const rs = rankStyle[index] ?? null;

            return (
              <div key={stat.id}
                className="relative overflow-hidden rounded-2xl group transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                  border: `1px solid rgba(255,255,255,0.07)`,
                  boxShadow: index === 0 ? `0 0 30px ${accentColor}20` : "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = `1px solid ${accentColor}40`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 32px ${accentColor}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = `1px solid rgba(255,255,255,0.07)`;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = index === 0 ? `0 0 30px ${accentColor}20` : "none";
                }}
              >
                {/* Animated left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
                  style={{ background: index < 3 ? (rs?.text ?? accentColor) : accentColor, opacity: index === 0 ? 1 : 0.4 }} />

                {/* Top-rank glow overlay */}
                {index === 0 && (
                  <div className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ background: `linear-gradient(90deg, ${accentColor}08 0%, transparent 50%)` }} />
                )}

                <div className="flex items-center gap-4 p-4 pl-5">
                  {/* Rank badge */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 relative"
                    style={rs ? {
                      background: rs.bg,
                      border: `1px solid ${rs.border}`,
                      color: rs.text,
                      boxShadow: `0 0 12px ${rs.glow}`,
                      fontFamily: "var(--font-display)",
                    } : {
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Photo */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative"
                    style={{
                      background: `linear-gradient(135deg, ${posColor}20, rgba(0,0,0,0.3))`,
                      border: `1px solid ${posColor}40`,
                      boxShadow: `0 0 12px ${posColor}20`,
                    }}>
                    {stat.player.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={stat.player.photoUrl}
                        alt={stat.player.nameTh}
                        className="object-cover w-full h-full object-top"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full items-center justify-center"
                      style={{ display: stat.player.photoUrl ? "none" : "flex" }}>
                      <span className="font-extrabold text-lg" style={{ fontFamily: "var(--font-display)", color: posColor }}>
                        {stat.player.jerseyNumber}
                      </span>
                    </div>
                    {/* Position badge */}
                    <div className="absolute bottom-0 right-0 px-1 text-[9px] font-extrabold rounded-tl"
                      style={{ background: posColor, color: "white", fontFamily: "var(--font-display)" }}>
                      {stat.player.position}
                    </div>
                  </div>

                  {/* Name + position */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate leading-tight" style={{ fontSize: "clamp(13px, 3vw, 16px)" }}>
                      {stat.player.nameTh}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md"
                        style={{ background: `${posColor}20`, color: posColor, border: `1px solid ${posColor}40` }}>
                        {POSITIONS[stat.player.position]}
                      </span>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {stat.appearances} นัด
                      </span>
                      {tab === "cards" && (
                        <>
                          {stat.yellowCards > 0 && (
                            <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                              style={{ background: "rgba(255,200,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,200,0,0.3)" }}>
                              🟨 {stat.yellowCards}
                            </span>
                          )}
                          {stat.redCards > 0 && (
                            <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                              style={{ background: "rgba(196,30,58,0.2)", color: "#ff6b6b", border: "1px solid rgba(196,30,58,0.4)" }}>
                              🟥 {stat.redCards}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Animated bar */}
                    <div className="hidden sm:block mt-2">
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${barWidth}%`,
                            background: `linear-gradient(90deg, ${accentColor}cc, ${accentColor})`,
                            boxShadow: `0 0 8px ${accentColor}80`,
                          }} />
                      </div>
                    </div>
                  </div>

                  {/* Big stat number */}
                  <div className="text-right flex-shrink-0">
                    <span className="font-extrabold leading-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(36px, 8vw, 56px)",
                        color: index === 0 ? accentColor : "white",
                        textShadow: index === 0 ? `0 0 30px ${accentColor}80` : "none",
                        opacity: index === 0 ? 1 : 0.7 + (0.3 * (1 - index / activeTab.list.length)),
                      }}>
                      {value}
                    </span>
                    <p className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {tab === "scorers" ? "ประตู" : tab === "assists" ? "แอสซิสต์" : tab === "cleansheets" ? "คลีนชีท" : "ใบ"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {activeTab.list.length === 0 && (
            <div className="rounded-2xl p-20 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-5xl mb-4">{activeTab.icon}</p>
              <p className="font-bold text-white/50">ยังไม่มีข้อมูลสถิติ</p>
              <p className="text-sm mt-1 text-white/25">เพิ่มสถิติในหน้า Admin → สถิติ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
