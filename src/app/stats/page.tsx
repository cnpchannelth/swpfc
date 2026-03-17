// Server Component — ดึงข้อมูลจาก data-store แล้วส่งให้ StatsClient
import { getMatches, getPlayerStats, getStandings } from "@/lib/data-store";
import StatsClient from "./StatsClient";



export default async function StatsPage() {
  const [matches, playerStats, standings] = await Promise.all([
    getMatches(),
    getPlayerStats(),
    getStandings(),
  ]);
  return <StatsClient playerStats={playerStats} standings={standings} matches={matches} />;
}
