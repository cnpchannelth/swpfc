// Server Component — ดึงข้อมูลจาก data-store แล้วส่งให้ FixturesClient
import { getMatches, standings } from "@/lib/data-store";
import FixturesClient from "./FixturesClient";

export default function FixturesPage() {
  const matches = getMatches();
  return <FixturesClient matches={matches} standings={standings} />;
}
