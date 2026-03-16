import { getPlayers } from "@/lib/data-store";
import PlayersClient from "./PlayersClient";

export default function AdminPlayersPage() {
  const players = getPlayers();
  return <PlayersClient initialPlayers={players} />;
}
