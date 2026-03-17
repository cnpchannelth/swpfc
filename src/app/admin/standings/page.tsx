import { getStandings } from "@/lib/data-store";
import StandingsAdminClient from "./StandingsAdminClient";

export default function AdminStandingsPage() {
  const standings = getStandings();
  return <StandingsAdminClient standings={standings} />;
}
