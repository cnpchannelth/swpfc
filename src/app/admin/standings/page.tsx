import { getStandings } from "@/lib/data-store";
import StandingsAdminClient from "./StandingsAdminClient";



export default async function AdminStandingsPage() {
  const standings = await getStandings();
  return <StandingsAdminClient standings={standings} />;
}
