// Server Component — ดึงข้อมูลจาก data-store แล้วส่งให้ SquadClient
import { getPlayers } from "@/lib/data-store";
import SquadClient from "./SquadClient";

export default function SquadPage() {
  const players = getPlayers();
  return <SquadClient players={players} />;
}
