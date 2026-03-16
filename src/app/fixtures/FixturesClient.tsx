"use client";

import { useState } from "react";
import Image from "next/image";
import type { Match, LeagueStanding } from "@/types";
import { formatThaiDate, formatThaiTime } from "@/lib/utils";
import { CLUB } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Tab = "upcoming" | "results" | "table";

export default function FixturesClient({
  matches,
  standings,
}: {
  matches: Match[];
  standings: LeagueStanding[];
}) {
  const [tab, setTab] = useState<Tab>("results");

  const upcoming = matches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime());

  const results = matches
    .filter((m) => m.status === "completed")
    .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime());

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "results", label: "ผลการแข่งขัน", count: results.length },
    { key: "upcoming", label: "นัดถัดไป", count: upcoming.length },
    { key: "table", label: "ตารางคะแนน", count: standings.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-white mb-2">ตารางแข่งขัน</h1>
      <p className="text-text-muted mb-6">ฤดูกาล 2569 - ลีกอำเภอสวรรคโลก</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border pb-0">
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
            <span className="ml-1 text-xs opacity-60">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Results Tab */}
      {tab === "results" && (
        <div className="flex flex-col gap-3">
          {results.map((match) => {
            const matchDate = new Date(match.matchDate);
            const isHome = match.homeTeam.isOwn;
            const swpScore = isHome ? match.homeScore : match.awayScore;
            const oppScore = isHome ? match.awayScore : match.homeScore;
            const result =
              swpScore! > oppScore! ? "W" : swpScore === oppScore ? "D" : "L";
            const resultColor =
              result === "W" ? "text-success" : result === "D" ? "text-warning" : "text-danger";
            const resultBg =
              result === "W" ? "bg-success" : result === "D" ? "bg-warning" : "bg-danger";

            return (
              <div
                key={match.id}
                className="bg-surface border border-border rounded-lg p-4 flex items-center gap-4 hover:border-border hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white", resultBg)}>
                    {result}
                  </span>
                  <span className="text-xs text-text-muted w-10 hidden sm:block">
                    นัดที่ {match.matchday}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-2 flex-1 justify-end text-right">
                    <span className={cn("text-sm font-medium", match.homeTeam.isOwn ? "text-white" : "text-text-muted")}>
                      {match.homeTeam.isOwn ? CLUB.shortName : match.homeTeam.nameTh}
                    </span>
                    {match.homeTeam.isOwn && (
                      <Image src={CLUB.logo} alt="SWP" width={28} height={28} className="flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-3">
                    <span className={cn("text-xl font-bold font-[family-name:var(--font-display)]", resultColor)}>
                      {match.homeScore}
                    </span>
                    <span className="text-text-muted text-sm">-</span>
                    <span className={cn("text-xl font-bold font-[family-name:var(--font-display)]", resultColor)}>
                      {match.awayScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    {match.awayTeam.isOwn && (
                      <Image src={CLUB.logo} alt="SWP" width={28} height={28} className="flex-shrink-0" />
                    )}
                    <span className={cn("text-sm font-medium", match.awayTeam.isOwn ? "text-white" : "text-text-muted")}>
                      {match.awayTeam.isOwn ? CLUB.shortName : match.awayTeam.nameTh}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-text-muted flex-shrink-0">
                  {formatThaiDate(matchDate)}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Upcoming Tab */}
      {tab === "upcoming" && (
        <div className="flex flex-col gap-3">
          {upcoming.map((match) => {
            const matchDate = new Date(match.matchDate);
            return (
              <div
                key={match.id}
                className="bg-surface border border-border rounded-lg p-6 flex flex-col md:flex-row items-center gap-4"
              >
                <span className="text-xs text-text-muted">นัดที่ {match.matchday}</span>
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className={cn("text-sm font-medium", match.homeTeam.isOwn ? "text-white" : "text-text-muted")}>
                      {match.homeTeam.isOwn ? CLUB.shortName : match.homeTeam.nameTh}
                    </span>
                    {match.homeTeam.isOwn && (
                      <Image src={CLUB.logo} alt="SWP" width={40} height={40} />
                    )}
                  </div>
                  <div className="text-center px-4">
                    <p className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-muted">
                      VS
                    </p>
                    <p className="text-xs text-primary mt-1">{formatThaiDate(matchDate)}</p>
                    <p className="text-xs text-text-muted">{formatThaiTime(matchDate)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    {match.awayTeam.isOwn && (
                      <Image src={CLUB.logo} alt="SWP" width={40} height={40} />
                    )}
                    <span className={cn("text-sm font-medium", match.awayTeam.isOwn ? "text-white" : "text-text-muted")}>
                      {match.awayTeam.isOwn ? CLUB.shortName : match.awayTeam.nameTh}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-text-muted">{match.venue}</span>
              </div>
            );
          })}
          {upcoming.length === 0 && (
            <p className="text-center text-text-muted py-12">ยังไม่มีนัดที่กำหนดการ</p>
          )}
        </div>
      )}

      {/* League Table Tab */}
      {tab === "table" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <th className="text-left py-3 px-2 w-8">#</th>
                <th className="text-left py-3 px-2">ทีม</th>
                <th className="text-center py-3 px-2">แข่ง</th>
                <th className="text-center py-3 px-2">ชนะ</th>
                <th className="text-center py-3 px-2">เสมอ</th>
                <th className="text-center py-3 px-2">แพ้</th>
                <th className="text-center py-3 px-2 hidden sm:table-cell">ได้</th>
                <th className="text-center py-3 px-2 hidden sm:table-cell">เสีย</th>
                <th className="text-center py-3 px-2 hidden sm:table-cell">ต่าง</th>
                <th className="text-center py-3 px-2 font-bold">คะแนน</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-border/50 transition-colors",
                    row.team.isOwn
                      ? "bg-primary/10 border-l-2 border-l-primary"
                      : "hover:bg-surface-light"
                  )}
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-text-muted">{row.position}</span>
                      {row.position === 1 && <span className="text-success text-xs">▲</span>}
                      {row.position === standings.length && <span className="text-danger text-xs">▼</span>}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      {row.team.isOwn && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      )}
                      <span className={cn("font-medium", row.team.isOwn ? "text-white" : "text-text-muted")}>
                        {row.team.isOwn ? CLUB.shortName : row.team.nameTh}
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-2 text-text-muted">{row.played}</td>
                  <td className="text-center py-3 px-2 text-text-muted">{row.won}</td>
                  <td className="text-center py-3 px-2 text-text-muted">{row.drawn}</td>
                  <td className="text-center py-3 px-2 text-text-muted">{row.lost}</td>
                  <td className="text-center py-3 px-2 text-text-muted hidden sm:table-cell">{row.goalsFor}</td>
                  <td className="text-center py-3 px-2 text-text-muted hidden sm:table-cell">{row.goalsAgainst}</td>
                  <td className="text-center py-3 px-2 text-text-muted hidden sm:table-cell">
                    {row.goalsFor - row.goalsAgainst > 0 ? "+" : ""}
                    {row.goalsFor - row.goalsAgainst}
                  </td>
                  <td className={cn("text-center py-3 px-2 font-bold font-[family-name:var(--font-display)] text-lg", row.team.isOwn ? "text-primary" : "text-white")}>
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
