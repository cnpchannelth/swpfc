"use server";

import { redirect } from "next/navigation";
import { checkCredentials, setAuthCookie, clearAuthCookie } from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const username = (formData.get("username") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  if (checkCredentials(username, password)) {
    await setAuthCookie();
    redirect("/admin");
  }

  return { error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
}

export async function logoutAction() {
  await clearAuthCookie();
  redirect("/");
}
