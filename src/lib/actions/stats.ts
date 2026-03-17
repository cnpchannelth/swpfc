"use server";

import { revalidatePath } from "next/cache";
import { getPlayerStats, savePlayerStats, getPlayers, nextId } from "@/lib/data-store";
import type { PlayerSeasonStats } from "@/types";

export async function upsertStatAction(formData: FormData) {
  const playerId = parseInt(formData.get("playerId") as string);
  const players = await getPlayers();
  const player = players.find((p) => p.id === playerId);
  if (!player) return;

  const stats = await getPlayerStats();
  const existing = stats.find((s) => s.player.id === playerId);

  const updated: PlayerSeasonStats = {
    id: existing?.id ?? nextId(stats),
    player,
    appearances: parseInt(formData.get("appearances") as string) || 0,
    goals: parseInt(formData.get("goals") as string) || 0,
    assists: parseInt(formData.get("assists") as string) || 0,
    yellowCards: parseInt(formData.get("yellowCards") as string) || 0,
    redCards: parseInt(formData.get("redCards") as string) || 0,
    cleanSheets: parseInt(formData.get("cleanSheets") as string) || 0,
    minutesPlayed: parseInt(formData.get("minutesPlayed") as string) || 0,
  };

  if (existing) {
    await savePlayerStats(stats.map((s) => (s.player.id === playerId ? updated : s)));
  } else {
    await savePlayerStats([...stats, updated]);
  }

  revalidatePath("/stats");
  revalidatePath("/admin/stats");
}

export async function deleteStatAction(id: number) {
  const stats = (await getPlayerStats()).filter((s) => s.id !== id);
  await savePlayerStats(stats);
  revalidatePath("/stats");
  revalidatePath("/admin/stats");
}
