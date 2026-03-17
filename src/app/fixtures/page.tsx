// Server Component — ดึงข้อมูลจาก data-store แล้วส่งให้ FixturesClient
import { getMatches, getStandings } from "@/lib/data-store";
import FixturesClient from "./FixturesClient";



export default async function FixturesPage() {
  const [matches, standings] = await Promise.all([getMatches(), getStandings()]);
  return <FixturesClient matches={matches} standings={standings} />;
}
