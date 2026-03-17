import { getMatches } from "@/lib/data-store";
import MatchesClient from "./MatchesClient";



export default async function AdminMatchesPage() {
  const matches = await getMatches();
  return <MatchesClient initialMatches={matches} />;
}
