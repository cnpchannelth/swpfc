// Server Component — ดึงข้อมูลจาก data-store แล้วส่งให้ FixturesClient
import { getMatches, getStandings } from "@/lib/data-store";
import FixturesClient from "./FixturesClient";

export default function FixturesPage() {
  const matches = getMatches();
  const standings = getStandings();
  return <FixturesClient matches={matches} standings={standings} />;
}
