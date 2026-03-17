import { getPlayers } from "@/lib/data-store";
import PlayersClient from "./PlayersClient";



export default async function AdminPlayersPage() {
  const players = await getPlayers();
  return <PlayersClient initialPlayers={players} />;
}
