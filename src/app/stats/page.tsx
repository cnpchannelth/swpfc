// Server Component — ดึงข้อมูลจาก data-store แล้วส่งให้ StatsClient
import { getMatches, getPlayerStats, standings } from "@/lib/data-store";
import StatsClient from "./StatsClient";

export default function StatsPage() {
  const matches = getMatches();
  const playerStats = getPlayerStats();
  return <StatsClient playerStats={playerStats} standings={standings} matches={matches} />;
}
