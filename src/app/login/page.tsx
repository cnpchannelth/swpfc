"use client";

import { useActionState } from "react";
import Image from "next/image";
import { loginAction } from "@/lib/actions/auth";
import { CLUB } from "@/lib/constants";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src={CLUB.logo}
            alt={CLUB.nameEn}
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-2xl font-extrabold text-white">{CLUB.name}</h1>
          <p className="text-text-muted text-sm mt-1">ระบบจัดการสโมสร</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <h2 className="text-lg font-bold text-white mb-6 text-center">
            เข้าสู่ระบบแอดมิน
          </h2>

          {/* Error message */}
          {state?.error && (
            <div className="bg-danger/10 border border-danger/30 rounded-lg p-3 mb-4 text-sm text-danger text-center">
              {state.error}
            </div>
          )}

          <form action={action} className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                name="username"
                required
                autoComplete="username"
                placeholder="กรอกชื่อผู้ใช้"
                className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white placeholder-text-muted/50 focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">
                รหัสผ่าน
              </label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="กรอกรหัสผ่าน"
                className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white placeholder-text-muted/50 focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors mt-2"
            >
              {isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
