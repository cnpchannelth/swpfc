"use client";

import { useState, useRef, useTransition } from "react";
import type { Sponsor } from "@/types";
import { upsertSponsorAction, deleteSponsorAction } from "@/lib/actions/sponsors";
import { useToast } from "@/components/ui/Toast";

const TIERS: { value: Sponsor["tier"]; label: string; color: string }[] = [
  { value: "main", label: "สปอนเซอร์หลัก", color: "text-warning" },
  { value: "gold", label: "ระดับทอง", color: "text-yellow-500" },
  { value: "standard", label: "ระดับมาตรฐาน", color: "text-text-muted" },
];

export default function SponsorsAdminClient({ sponsors }: { sponsors: Sponsor[] }) {
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const { toast } = useToast();

  function openNew() {
    setEditing({ id: 0, name: "", tier: "standard" });
    setIsNew(true);
    setLogoPreview("");
  }

  function openEdit(s: Sponsor) {
    setEditing({ ...s });
    setIsNew(false);
    setLogoPreview(s.logoUrl || "");
  }

  function closeForm() { setEditing(null); setIsNew(false); setLogoPreview(""); }

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json() as { url?: string };
    if (json.url) {
      setLogoPreview(json.url);
      setEditing((prev) => prev ? { ...prev, logoUrl: json.url } : prev);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    if (editing && !isNew) fd.set("id", String(editing.id));
    if (editing?.logoUrl) fd.set("logoUrl", editing.logoUrl);
    startTransition(async () => {
      await upsertSponsorAction(fd);
      toast(isNew ? "เพิ่มแล้ว" : "อัปเดตแล้ว", "success");
      closeForm();
    });
  }

  function handleDelete(id: number) {
    if (!confirm("ลบสปอนเซอร์นี้?")) return;
    startTransition(async () => {
      await deleteSponsorAction(id);
      toast("ลบแล้ว", "success");
    });
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text">สปอนเซอร์</h1>
          <p className="text-text-muted text-sm mt-1">{sponsors.length} รายการ</p>
        </div>
        <button onClick={openNew} className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          + เพิ่มสปอนเซอร์
        </button>
      </div>

      {/* Form Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-text mb-4">{isNew ? "เพิ่มสปอนเซอร์" : "แก้ไขสปอนเซอร์"}</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Logo upload */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded-lg bg-surface-light overflow-hidden flex items-center justify-center flex-shrink-0 border border-border">
                  {logoPreview ? (
                    <img src={logoPreview} alt="logo" className="max-w-full max-h-full object-contain p-1" />
                  ) : (
                    <span className="text-xs text-text-muted">โลโก้</span>
                  )}
                </div>
                <div>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                  <button type="button" onClick={() => logoInputRef.current?.click()} className="text-xs bg-surface-light border border-border px-3 py-1.5 rounded-lg text-text-muted hover:text-text transition-colors">
                    อัพโหลดโลโก้
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">ชื่อสปอนเซอร์ *</label>
                <input name="name" required defaultValue={editing.name} className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">เว็บไซต์</label>
                <input name="website" type="url" defaultValue={editing.website || ""} placeholder="https://" className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">ระดับ</label>
                <select name="tier" defaultValue={editing.tier} className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary">
                  {TIERS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 mt-2">
                <button type="submit" disabled={isPending} className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
                  {isPending ? "กำลังบันทึก..." : "บันทึก"}
                </button>
                <button type="button" onClick={closeForm} className="flex-1 bg-surface-light border border-border text-text-muted font-semibold py-2 rounded-lg text-sm hover:text-text transition-colors">
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sponsors Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sponsors.map((s) => {
          const tier = TIERS.find((t) => t.value === s.tier);
          return (
            <div key={s.id} className="bg-surface border border-border rounded-xl p-4 text-center">
              <div className="h-12 flex items-center justify-center mb-3">
                {s.logoUrl ? (
                  <img src={s.logoUrl} alt={s.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="w-12 h-12 bg-surface-light rounded-lg flex items-center justify-center text-text-muted text-xs">โลโก้</div>
                )}
              </div>
              <h3 className="text-sm font-bold text-text">{s.name}</h3>
              <p className={`text-xs mt-1 ${tier?.color}`}>{tier?.label}</p>
              {s.website && <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary mt-1 block truncate hover:underline">{s.website}</a>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(s)} className="flex-1 text-xs bg-surface-light border border-border px-2 py-1.5 rounded-lg text-text-muted hover:text-text transition-colors">แก้ไข</button>
                <button onClick={() => handleDelete(s.id)} className="flex-1 text-xs bg-danger/10 border border-danger/30 px-2 py-1.5 rounded-lg text-danger hover:bg-danger/20 transition-colors">ลบ</button>
              </div>
            </div>
          );
        })}
        {sponsors.length === 0 && (
          <p className="col-span-full text-center text-text-muted py-12">ยังไม่มีสปอนเซอร์</p>
        )}
      </div>
    </div>
  );
}
