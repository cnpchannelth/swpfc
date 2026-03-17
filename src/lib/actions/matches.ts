"use server";

import { revalidatePath } from "next/cache";
import { getMatches, saveMatches, nextId } from "@/lib/data-store";
import { ownTeam } from "@/lib/sample-data";
import type { Match } from "@/types";

function buildMatch(id: number, formData: FormData): Match {
  const isHome = formData.get("isHome") === "true";
  const opponentName = (formData.get("opponentName") as string) ?? "คู่แข่ง";
  const opponentTeam = {
    id: id + 1000, // ป้องกัน ID ชน
    nameTh: opponentName,
    isOwn: false,
  };
  const homeScore = formData.get("homeScore") !== ""
    ? parseInt(formData.get("homeScore") as string)
    : undefined;
  const awayScore = formData.get("awayScore") !== ""
    ? parseInt(formData.get("awayScore") as string)
    : undefined;

  return {
    id,
    competitionId: 1,
    matchDate: (formData.get("matchDate") as string) ?? new Date().toISOString(),
    venue: (formData.get("venue") as string) || undefined,
    homeTeam: isHome ? ownTeam : opponentTeam,
    awayTeam: isHome ? opponentTeam : ownTeam,
    homeScore,
    awayScore,
    status: (formData.get("status") as Match["status"]) ?? "scheduled",
    matchday: parseInt(formData.get("matchday") as string) || undefined,
  };
}

export async function addMatchAction(formData: FormData) {
  const matches = await getMatches();
  const newMatch = buildMatch(nextId(matches), formData);
  await saveMatches([...matches, newMatch]);
  revalidatePath("/fixtures");
  revalidatePath("/");
  revalidatePath("/admin/matches");
}

export async function updateMatchAction(id: number, formData: FormData) {
  const matches = await getMatches();
  const updated = matches.map((m) =>
    m.id === id ? { ...buildMatch(id, formData), id } : m
  );
  await saveMatches(updated);
  revalidatePath("/fixtures");
  revalidatePath("/");
  revalidatePath("/admin/matches");
}

export async function deleteMatchAction(id: number) {
  const matches = (await getMatches()).filter((m) => m.id !== id);
  await saveMatches(matches);
  revalidatePath("/fixtures");
  revalidatePath("/");
  revalidatePath("/admin/matches");
}
