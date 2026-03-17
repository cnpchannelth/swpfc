"use client";

import { useState, useRef, useTransition } from "react";
import type { Staff } from "@/types";
import { upsertStaffAction, deleteStaffAction } from "@/lib/actions/staff";
import { useToast } from "@/components/ui/Toast";

const EMPTY: Omit<Staff, "id"> = { nameTh: "", roleTh: "", photoUrl: "", bio: "" };

export default function StaffAdminClient({ staff }: { staff: Staff[] }) {
  const [editing, setEditing] = useState<Staff | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const { toast } = useToast();

  function openNew() {
    setEditing({ id: 0, ...EMPTY });
    setIsNew(true);
    setPhotoPreview("");
  }

  function openEdit(member: Staff) {
    setEditing({ ...member });
    setIsNew(false);
    setPhotoPreview(member.photoUrl || "");
  }

  function closeForm() {
    setEditing(null);
    setIsNew(false);
    setPhotoPreview("");
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json() as { url?: string };
    if (json.url) {
      setPhotoPreview(json.url);
      setEditing((prev) => prev ? { ...prev, photoUrl: json.url } : prev);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    if (editing && !isNew) fd.set("id", String(editing.id));
    if (editing?.photoUrl) fd.set("photoUrl", editing.photoUrl);
    startTransition(async () => {
      await upsertStaffAction(fd);
      toast(isNew ? "เพิ่มสตาฟฟ์แล้ว" : "อัปเดตแล้ว", "success");
      closeForm();
    });
  }

  function handleDelete(id: number) {
    if (!confirm("ลบรายการนี้?")) return;
    startTransition(async () => {
      await deleteStaffAction(id);
      toast("ลบแล้ว", "success");
    });
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text">ทีมงาน / สตาฟฟ์โค้ช</h1>
          <p className="text-text-muted text-sm mt-1">{staff.length} รายการ</p>
        </div>
        <button
          onClick={openNew}
          className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + เพิ่มสตาฟฟ์
        </button>
      </div>

      {/* Form Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold text-text mb-4">{isNew ? "เพิ่มสตาฟฟ์" : "แก้ไขสตาฟฟ์"}</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Photo upload */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-surface-light overflow-hidden flex items-center justify-center flex-shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-10 h-10 text-text-muted/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="text-xs bg-surface-light border border-border px-3 py-1.5 rounded-lg text-text-muted hover:text-text transition-colors"
                  >
                    เลือกรูปภาพ
                  </button>
                  <p className="text-xs text-text-muted mt-1">สามารถถ่ายรูปจากโทรศัพท์</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">ชื่อ-นามสกุล *</label>
                <input
                  name="nameTh"
                  required
                  defaultValue={editing.nameTh}
                  className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">ตำแหน่ง *</label>
                <input
                  name="roleTh"
                  required
                  defaultValue={editing.roleTh}
                  placeholder="เช่น ผู้จัดการทีม, หัวหน้าผู้ฝึกสอน"
                  className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">ประวัติย่อ</label>
                <textarea
                  name="bio"
                  rows={3}
                  defaultValue={editing.bio || ""}
                  className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                >
                  {isPending ? "กำลังบันทึก..." : "บันทึก"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 bg-surface-light border border-border text-text-muted font-semibold py-2 rounded-lg text-sm hover:text-text transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {staff.map((member) => (
          <div key={member.id} className="bg-surface border border-border rounded-xl p-4 text-center relative group">
            <div className="w-16 h-16 rounded-full bg-surface-light mx-auto mb-3 overflow-hidden flex items-center justify-center">
              {member.photoUrl ? (
                <img src={member.photoUrl} alt={member.nameTh} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-text-muted/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <h3 className="text-sm font-bold text-text">{member.nameTh}</h3>
            <p className="text-xs text-primary mt-1">{member.roleTh}</p>
            {member.bio && <p className="text-xs text-text-muted mt-2 line-clamp-2">{member.bio}</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openEdit(member)}
                className="flex-1 text-xs bg-surface-light border border-border px-2 py-1.5 rounded-lg text-text-muted hover:text-text transition-colors"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="flex-1 text-xs bg-danger/10 border border-danger/30 px-2 py-1.5 rounded-lg text-danger hover:bg-danger/20 transition-colors"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
        {staff.length === 0 && (
          <p className="col-span-full text-center text-text-muted py-12">ยังไม่มีสตาฟฟ์</p>
        )}
      </div>
    </div>
  );
}
