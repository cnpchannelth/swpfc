"use client";

import { useState } from "react";
import Image from "next/image";
import type { Match, LeagueStanding } from "@/types";
import { formatThaiDate, formatThaiTime } from "@/lib/utils";
import { CLUB } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Tab = "results" | "upcoming" | "table";

const RESULT_CFG = {
  W: { label: "ชนะ", color: "#2EA043", glow: "rgba(46,160,67,0.35)", dark: "rgba(46,160,67,0.12)" },
  D: { label: "เสมอ", color: "#D29922", glow: "rgba(210,153,34,0.35)", dark: "rgba(210,153,34,0.12)" },
  L: { label: "แพ้",  color: "#C41E3A", glow: "rgba(196,30,58,0.35)",  dark: "rgba(196,30,58,0.12)" },
};

function TeamLogo({ isOwn, name }: { isOwn: boolean; name: string }) {
  if (isOwn) {
    return (
      <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(196,30,58,0.15)", border: "1px solid rgba(196,30,58,0.3)" }}>
        <Image src={CLUB.logo} alt="SWP" width={44} height={44} className="object-contain" />
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-base"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.5)",
        fontFamily: "var(--font-display)",
      }}>
      {name.charAt(0)}
    </div>
  );
}

export default function FixturesClient({ matches, standings }: { matches: Match[]; standings: LeagueStanding[] }) {
  const [tab, setTab] = useState<Tab>("results");

  const upcoming = matches.filter((m) => m.status === "scheduled")
    .sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime());
  const results = matches.filter((m) => m.status === "completed")
    .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime());

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "results",  label: "ผลการแข่งขัน", count: results.length },
    { key: "upcoming", label: "นัดถัดไป",      count: upcoming.length },
    { key: "table",    label: "ตารางคะแนน",    count: standings.length },
  ];

  return (
    <div style={{ background: "linear-gradient(180deg, #070d1c 0%, #0a0e1a 40%, #0d0812 100%)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #1E4D8C 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-8 z-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ color: "rgba(30,77,140,0.9)" }}>
            ฤดูกาล 2569 · Police Sawankhalok FC
          </p>
          <h1 className="font-extrabold text-white leading-none mb-3"
            style={{ fontSize: "clamp(36px, 9vw, 72px)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
            ตารางแข่งขัน
          </h1>
          <div className="w-16 h-1 rounded-full" style={{ background: "#1E4D8C" }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">

        {/* ── Tabs ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300"
                style={active ? {
                  background: "rgba(30,77,140,0.2)",
                  border: "1px solid rgba(30,77,140,0.6)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(30,77,140,0.3)",
                } : {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                }}>
                {t.label}
                <span className="ml-2 text-xs font-medium" style={{ color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Results ── */}
        {tab === "results" && (
          <div className="flex flex-col gap-3">
            {results.map((match) => {
              const isHome = match.homeTeam.isOwn;
              const swpScore = isHome ? match.homeScore : match.awayScore;
              const oppScore = isHome ? match.awayScore : match.homeScore;
              const result = swpScore! > oppScore! ? "W" : swpScore === oppScore ? "D" : "L";
              const rc = RESULT_CFG[result];
              const homeIsOwn = match.homeTeam.isOwn;

              return (
                <div key={match.id} className="relative overflow-hidden rounded-2xl group transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = `1px solid ${rc.color}40`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 8px 32px ${rc.dark}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>

                  {/* Left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: rc.color }} />

                  <div className="flex items-center gap-3 px-5 py-4 pl-6">
                    {/* Result badge */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-base flex-shrink-0"
                      style={{
                        background: rc.dark,
                        border: `1px solid ${rc.color}50`,
                        color: rc.color,
                        boxShadow: `0 0 12px ${rc.glow}`,
                        fontFamily: "var(--font-display)",
                      }}>
                      {result}
                    </div>

                    {/* Home team */}
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <span className="text-sm font-bold text-right" style={{ color: homeIsOwn ? "white" : "rgba(255,255,255,0.5)" }}>
                        {homeIsOwn ? "SWP" : match.homeTeam.nameTh}
                      </span>
                      <TeamLogo isOwn={homeIsOwn} name={match.homeTeam.nameTh} />
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-3 px-4 flex-shrink-0">
                      <span className="font-extrabold" style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px, 5vw, 32px)",
                        color: rc.color,
                        textShadow: `0 0 20px ${rc.glow}`,
                      }}>
                        {match.homeScore}
                      </span>
                      <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.2)" }}>–</span>
                      <span className="font-extrabold" style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px, 5vw, 32px)",
                        color: rc.color,
                        textShadow: `0 0 20px ${rc.glow}`,
                      }}>
                        {match.awayScore}
                      </span>
                    </div>

                    {/* Away team */}
                    <div className="flex items-center gap-3 flex-1">
                      <TeamLogo isOwn={!homeIsOwn} name={match.awayTeam.nameTh} />
                      <span className="text-sm font-bold" style={{ color: !homeIsOwn ? "white" : "rgba(255,255,255,0.5)" }}>
                        {!homeIsOwn ? "SWP" : match.awayTeam.nameTh}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="text-right flex-shrink-0 hidden sm:block">
                      <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {formatThaiDate(new Date(match.matchDate))}
                      </p>
                      {match.venue && (
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                          {match.venue}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {results.length === 0 && <EmptyState icon="⚽" text="ยังไม่มีผลการแข่งขัน" />}
          </div>
        )}

        {/* ── Upcoming ── */}
        {tab === "upcoming" && (
          <div className="flex flex-col gap-4">
            {upcoming.map((match) => {
              const matchDate = new Date(match.matchDate);
              const homeIsOwn = match.homeTeam.isOwn;
              return (
                <div key={match.id} className="rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(30,77,140,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                    border: "1px solid rgba(30,77,140,0.25)",
                    boxShadow: "0 0 30px rgba(30,77,140,0.1)",
                  }}>
                  {/* Header bar */}
                  <div className="px-5 py-2.5 flex items-center justify-between"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                      นัดที่ {match.matchday}
                    </span>
                    <span className="text-xs font-medium" style={{ color: "#1E4D8C" }}>
                      {formatThaiDate(matchDate)} · {formatThaiTime(matchDate)} น.
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-5 py-6">
                    {/* Home */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <TeamLogo isOwn={homeIsOwn} name={match.homeTeam.nameTh} />
                      <span className="text-sm font-bold text-center" style={{ color: homeIsOwn ? "white" : "rgba(255,255,255,0.5)" }}>
                        {homeIsOwn ? "SWP" : match.homeTeam.nameTh}
                      </span>
                      {homeIsOwn && (
                        <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(196,30,58,0.2)", color: "#C41E3A", border: "1px solid rgba(196,30,58,0.3)" }}>
                          เหย้า
                        </span>
                      )}
                    </div>

                    {/* VS */}
                    <div className="text-center px-4 flex-shrink-0">
                      <div className="font-extrabold text-white/20 mb-1" style={{ fontSize: "clamp(28px, 7vw, 48px)", fontFamily: "var(--font-display)" }}>
                        VS
                      </div>
                      {match.venue && (
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>📍 {match.venue}</p>
                      )}
                    </div>

                    {/* Away */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <TeamLogo isOwn={!homeIsOwn} name={match.awayTeam.nameTh} />
                      <span className="text-sm font-bold text-center" style={{ color: !homeIsOwn ? "white" : "rgba(255,255,255,0.5)" }}>
                        {!homeIsOwn ? "SWP" : match.awayTeam.nameTh}
                      </span>
                      {!homeIsOwn && (
                        <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(30,77,140,0.2)", color: "#3B82F6", border: "1px solid rgba(30,77,140,0.3)" }}>
                          เยือน
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {upcoming.length === 0 && <EmptyState icon="📅" text="ยังไม่มีนัดที่กำหนดการ" />}
          </div>
        )}

        {/* ── League Table ── */}
        {tab === "table" && (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {/* Header */}
            <div className="grid text-xs font-bold tracking-wider uppercase px-4 py-3"
              style={{
                gridTemplateColumns: "48px 1fr 48px 48px 48px 48px 48px 48px 48px 64px",
                background: "rgba(255,255,255,0.04)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.3)",
              }}>
              <div>#</div>
              <div>ทีม</div>
              <div className="text-center">แข่ง</div>
              <div className="text-center">ชนะ</div>
              <div className="text-center">เสมอ</div>
              <div className="text-center">แพ้</div>
              <div className="text-center hidden sm:block">ได้</div>
              <div className="text-center hidden sm:block">เสีย</div>
              <div className="text-center hidden sm:block">±</div>
              <div className="text-center font-extrabold" style={{ color: "rgba(255,255,255,0.5)" }}>แต้ม</div>
            </div>

            {standings.map((row, i) => {
              const isOwn = row.team.isOwn;
              const gd = row.goalsFor - row.goalsAgainst;
              return (
                <div key={row.id}
                  className="grid items-center px-4 py-3.5 transition-all duration-200"
                  style={{
                    gridTemplateColumns: "48px 1fr 48px 48px 48px 48px 48px 48px 48px 64px",
                    background: isOwn ? "rgba(196,30,58,0.08)" : "transparent",
                    borderBottom: i < standings.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    borderLeft: isOwn ? "3px solid #C41E3A" : "3px solid transparent",
                  }}
                  onMouseEnter={e => { if (!isOwn) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={e => { if (!isOwn) e.currentTarget.style.background = "transparent"; }}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm" style={{ color: row.position <= 3 ? "#D29922" : "rgba(255,255,255,0.4)", fontFamily: "var(--font-display)" }}>
                      {row.position}
                    </span>
                  </div>

                  {/* Team name */}
                  <div className="flex items-center gap-2">
                    {isOwn && <Image src={CLUB.logo} alt="SWP" width={24} height={24} className="flex-shrink-0" />}
                    <span className="font-bold text-sm" style={{ color: isOwn ? "white" : "rgba(255,255,255,0.6)" }}>
                      {isOwn ? "SWP" : row.team.nameTh}
                    </span>
                    {isOwn && (
                      <span className="text-xs px-1.5 py-0.5 rounded hidden sm:inline" style={{ background: "rgba(196,30,58,0.2)", color: "#C41E3A", border: "1px solid rgba(196,30,58,0.3)" }}>
                        เรา
                      </span>
                    )}
                  </div>

                  {[row.played, row.won, row.drawn, row.lost].map((v, idx) => (
                    <div key={idx} className="text-center text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{v}</div>
                  ))}
                  <div className="text-center text-sm hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}>{row.goalsFor}</div>
                  <div className="text-center text-sm hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}>{row.goalsAgainst}</div>
                  <div className="text-center text-sm hidden sm:block font-medium" style={{ color: gd > 0 ? "#2EA043" : gd < 0 ? "#C41E3A" : "rgba(255,255,255,0.4)" }}>
                    {gd > 0 ? `+${gd}` : gd}
                  </div>

                  {/* Points */}
                  <div className="text-center">
                    <span className="font-extrabold text-xl" style={{
                      fontFamily: "var(--font-display)",
                      color: isOwn ? "#C41E3A" : "white",
                      textShadow: isOwn ? "0 0 20px rgba(196,30,58,0.5)" : "none",
                    }}>
                      {row.points}
                    </span>
                  </div>
                </div>
              );
            })}
            {standings.length === 0 && <EmptyState icon="🏆" text="ยังไม่มีข้อมูลตารางคะแนน" />}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="rounded-2xl p-20 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <p className="text-5xl mb-4">{icon}</p>
      <p className="font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{text}</p>
    </div>
  );
}
