import { getPlayers, getPlayerStats } from "@/lib/data-store";
import StatsAdminClient from "./StatsAdminClient";

export default function AdminStatsPage() {
  const players = getPlayers().filter((p) => p.isActive);
  const stats = getPlayerStats();
  return <StatsAdminClient players={players} stats={stats} />;
}
