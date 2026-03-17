import { getStandings, getMatches } from "@/lib/data-store";
import AnimatedStats from "./AnimatedStats";
import type { Match } from "@/types";

export const runtime = "edge";

type StreakResult = "W" | "D" | "L";

function getStreak(matches: Match[]): StreakResult[] {
  return matches
    .filter((m) => m.status === "completed")
    .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())
    .slice(0, 5)
    .map((m) => {
      const isHome = m.homeTeam.isOwn;
      const swp = isHome ? m.homeScore! : m.awayScore!;
      const opp = isHome ? m.awayScore! : m.homeScore!;
      return swp > opp ? "W" : swp === opp ? "D" : "L";
    })
    .reverse();
}

export default async function QuickStatsBar() {
  const [standings, matches] = await Promise.all([getStandings(), getMatches()]);
  const swpStats = standings.find((s) => s.team.isOwn);
  if (!swpStats) return null;

  const streak = getStreak(matches);

  const stats = [
    { label: "แข่ง",    value: swpStats.played },
    { label: "ชนะ",    value: swpStats.won,          color: "text-success" },
    { label: "เสมอ",   value: swpStats.drawn,         color: "text-warning" },
    { label: "แพ้",    value: swpStats.lost,          color: "text-danger" },
    { label: "ได้",    value: swpStats.goalsFor },
    { label: "เสีย",   value: swpStats.goalsAgainst },
    { label: "คะแนน", value: swpStats.points,         color: "text-primary" },
  ];

  return (
    <section className="bg-surface border-y border-border">
      <AnimatedStats stats={stats} streak={streak} />
    </section>
  );
}
