"use server";

import { revalidatePath } from "next/cache";
import { getStandings, saveStandings, nextId } from "@/lib/data-store";
import type { LeagueStanding } from "@/types";

export async function upsertStandingAction(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const standings = getStandings();

  const entry: LeagueStanding = {
    id: id ?? nextId(standings),
    team: {
      id: Number(formData.get("teamId") || 0),
      nameTh: String(formData.get("teamName") || ""),
      isOwn: formData.get("isOwn") === "true",
    },
    position: Number(formData.get("position") || 0),
    played: Number(formData.get("played") || 0),
    won: Number(formData.get("won") || 0),
    drawn: Number(formData.get("drawn") || 0),
    lost: Number(formData.get("lost") || 0),
    goalsFor: Number(formData.get("goalsFor") || 0),
    goalsAgainst: Number(formData.get("goalsAgainst") || 0),
    points: Number(formData.get("points") || 0),
  };

  if (id) {
    const idx = standings.findIndex((s) => s.id === id);
    if (idx >= 0) standings[idx] = entry;
    else standings.push(entry);
  } else {
    standings.push(entry);
  }

  // Re-sort by position
  standings.sort((a, b) => a.position - b.position);
  saveStandings(standings);
  revalidatePath("/fixtures");
  revalidatePath("/admin/standings");
}

export async function deleteStandingAction(id: number) {
  const standings = getStandings().filter((s) => s.id !== id);
  standings.sort((a, b) => a.position - b.position);
  saveStandings(standings);
  revalidatePath("/fixtures");
  revalidatePath("/admin/standings");
}
