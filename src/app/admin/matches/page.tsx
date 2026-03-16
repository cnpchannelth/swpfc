import { getMatches } from "@/lib/data-store";
import MatchesClient from "./MatchesClient";

export default function AdminMatchesPage() {
  const matches = getMatches();
  return <MatchesClient initialMatches={matches} />;
}
