"use server";

import { revalidatePath } from "next/cache";
import { getSponsors, saveSponsors, nextId } from "@/lib/data-store";
import type { Sponsor } from "@/types";

export async function upsertSponsorAction(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const sponsors = await getSponsors();

  const entry: Sponsor = {
    id: id ?? nextId(sponsors),
    name: String(formData.get("name") || ""),
    logoUrl: (formData.get("logoUrl") as string) || undefined,
    website: (formData.get("website") as string) || undefined,
    tier: (formData.get("tier") as "main" | "gold" | "standard") || "standard",
  };

  if (id) {
    const idx = sponsors.findIndex((s) => s.id === id);
    if (idx >= 0) sponsors[idx] = entry;
    else sponsors.push(entry);
  } else {
    sponsors.push(entry);
  }

  await saveSponsors(sponsors);
  revalidatePath("/");
  revalidatePath("/admin/sponsors");
}

export async function deleteSponsorAction(id: number) {
  const sponsors = (await getSponsors()).filter((s) => s.id !== id);
  await saveSponsors(sponsors);
  revalidatePath("/");
  revalidatePath("/admin/sponsors");
}
