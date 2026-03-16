"use server";

import { revalidatePath } from "next/cache";
import { getPlayers, savePlayers, nextId } from "@/lib/data-store";
import type { Player } from "@/types";
import type { Position } from "@/lib/constants";

export async function addPlayerAction(formData: FormData) {
  const players = getPlayers();
  const newPlayer: Player = {
    id: nextId(players),
    jerseyNumber: parseInt(formData.get("jerseyNumber") as string) || 0,
    nameTh: (formData.get("nameTh") as string) ?? "",
    nameEn: (formData.get("nameEn") as string) || undefined,
    nickname: (formData.get("nickname") as string) || undefined,
    position: (formData.get("position") as Position) ?? "MF",
    dateOfBirth: (formData.get("dateOfBirth") as string) || undefined,
    heightCm: parseInt(formData.get("heightCm") as string) || undefined,
    weightKg: parseInt(formData.get("weightKg") as string) || undefined,
    nationality: (formData.get("nationality") as string) || "ไทย",
    preferredFoot: (formData.get("preferredFoot") as string) || undefined,
    hometown: (formData.get("hometown") as string) || undefined,
    photoUrl: (formData.get("photoUrl") as string) || undefined,
    isActive: formData.get("isActive") === "true",
  };
  savePlayers([...players, newPlayer]);
  revalidatePath("/squad");
  revalidatePath("/admin/players");
}

export async function updatePlayerAction(id: number, formData: FormData) {
  const players = getPlayers();
  const updated = players.map((p) =>
    p.id === id
      ? {
          ...p,
          jerseyNumber: parseInt(formData.get("jerseyNumber") as string) || p.jerseyNumber,
          nameTh: (formData.get("nameTh") as string) || p.nameTh,
          nameEn: (formData.get("nameEn") as string) || undefined,
          nickname: (formData.get("nickname") as string) || undefined,
          position: (formData.get("position") as Position) || p.position,
          dateOfBirth: (formData.get("dateOfBirth") as string) || undefined,
          heightCm: parseInt(formData.get("heightCm") as string) || undefined,
          weightKg: parseInt(formData.get("weightKg") as string) || undefined,
          nationality: (formData.get("nationality") as string) || p.nationality,
          preferredFoot: (formData.get("preferredFoot") as string) || undefined,
          hometown: (formData.get("hometown") as string) || undefined,
          photoUrl: (formData.get("photoUrl") as string) || undefined,
          isActive: formData.get("isActive") === "true",
        }
      : p
  );
  savePlayers(updated);
  revalidatePath("/squad");
  revalidatePath("/admin/players");
}

export async function deletePlayerAction(id: number) {
  const players = getPlayers().filter((p) => p.id !== id);
  savePlayers(players);
  revalidatePath("/squad");
  revalidatePath("/admin/players");
}
