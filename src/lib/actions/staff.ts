"use server";

import { revalidatePath } from "next/cache";
import { getStaff, saveStaff, nextId } from "@/lib/data-store";
import type { Staff } from "@/types";

export async function upsertStaffAction(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const staff = await getStaff();

  const entry: Staff = {
    id: id ?? nextId(staff),
    nameTh: String(formData.get("nameTh") || ""),
    roleTh: String(formData.get("roleTh") || ""),
    photoUrl: (formData.get("photoUrl") as string) || undefined,
    bio: (formData.get("bio") as string) || undefined,
  };

  if (id) {
    const idx = staff.findIndex((s) => s.id === id);
    if (idx >= 0) staff[idx] = entry;
    else staff.push(entry);
  } else {
    staff.push(entry);
  }

  await saveStaff(staff);
  revalidatePath("/about");
  revalidatePath("/admin/staff");
}

export async function deleteStaffAction(id: number) {
  const staff = (await getStaff()).filter((s) => s.id !== id);
  await saveStaff(staff);
  revalidatePath("/about");
  revalidatePath("/admin/staff");
}
