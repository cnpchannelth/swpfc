import { getPlayers, getPlayerStats } from "@/lib/data-store";
import StatsAdminClient from "./StatsAdminClient";

export const runtime = "edge";

export default async function AdminStatsPage() {
  const [allPlayers, stats] = await Promise.all([getPlayers(), getPlayerStats()]);
  const players = allPlayers.filter((p) => p.isActive);
  return <StatsAdminClient players={players} stats={stats} />;
}
