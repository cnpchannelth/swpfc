// Server Component — ดึงข้อมูลจาก data-store แล้วส่งให้ SquadClient
import { getPlayers } from "@/lib/data-store";
import SquadClient from "./SquadClient";

export const runtime = "edge";

export default async function SquadPage() {
  const players = await getPlayers();
  return <SquadClient players={players} />;
}
