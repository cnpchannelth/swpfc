"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Player } from "@/types";
import { POSITIONS, type Position } from "@/lib/constants";
import { addPlayerAction, updatePlayerAction, deletePlayerAction } from "@/lib/actions/players";
import { useToast } from "@/components/ui/Toast";

const POSITION_OPTIONS: Position[] = ["GK", "DF", "MF", "FW"];
const FOOT_OPTIONS = ["ขวา", "ซ้าย", "ทั้งสอง"];

interface Props {
  initialPlayers: Player[];
}

function PlayerModal({
  player,
  onClose,
  onSave,
}: {
  player: Player | null;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    await onSave(new FormData(formRef.current));
    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold text-white">
            {player ? "แก้ไขนักเตะ" : "เพิ่มนักเตะใหม่"}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-5 grid grid-cols-2 gap-4">
          {/* Jersey Number */}
          <Field label="เบอร์เสื้อ *" name="jerseyNumber" type="number"
            defaultValue={player?.jerseyNumber} required />
          {/* Position */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">ตำแหน่ง *</label>
            <select name="position" defaultValue={player?.position ?? "MF"} required
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary">
              {POSITION_OPTIONS.map((p) => (
                <option key={p} value={p}>{POSITIONS[p]} ({p})</option>
              ))}
            </select>
          </div>
          {/* Name TH */}
          <div className="col-span-2">
            <Field label="ชื่อ-สกุล (ไทย) *" name="nameTh" defaultValue={player?.nameTh} required />
          </div>
          {/* Name EN */}
          <Field label="ชื่อ-สกุล (อังกฤษ)" name="nameEn" defaultValue={player?.nameEn} />
          {/* Nickname */}
          <Field label="ชื่อเล่น" name="nickname" defaultValue={player?.nickname} />
          {/* DOB */}
          <Field label="วันเกิด" name="dateOfBirth" type="date" defaultValue={player?.dateOfBirth} />
          {/* Height */}
          <Field label="ส่วนสูง (ซม.)" name="heightCm" type="number" defaultValue={player?.heightCm} />
          {/* Weight */}
          <Field label="น้ำหนัก (กก.)" name="weightKg" type="number" defaultValue={player?.weightKg} />
          {/* Preferred Foot */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">เท้าที่ถนัด</label>
            <select name="preferredFoot" defaultValue={player?.preferredFoot ?? "ขวา"}
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary">
              {FOOT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          {/* Hometown */}
          <Field label="ภูมิลำเนา" name="hometown" defaultValue={player?.hometown} />
          {/* Photo URL */}
          <div className="col-span-2">
            <Field label="URL รูปภาพ (เช่น /images/players/name.jpg)" name="photoUrl" defaultValue={player?.photoUrl} />
          </div>
          {/* Is Active */}
          <div className="col-span-2 flex items-center gap-2">
            <input type="hidden" name="isActive" value="false" />
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              value="true"
              defaultChecked={player?.isActive ?? true}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="isActive" className="text-sm text-text-muted">นักเตะยังอยู่ในทีม (Active)</label>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-text-muted bg-surface-light hover:bg-border rounded-lg transition-colors">
              ยกเลิก
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark disabled:opacity-60 rounded-lg transition-colors">
              {loading ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", defaultValue, required }: {
  label: string; name: string; type?: string;
  defaultValue?: string | number; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-muted mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white text-sm placeholder-text-muted/50 focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}

export default function PlayersClient({ initialPlayers }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  function openAdd() { setEditPlayer(null); setShowModal(true); }
  function openEdit(p: Player) { setEditPlayer(p); setShowModal(true); }

  async function handleSave(formData: FormData) {
    if (editPlayer) {
      await updatePlayerAction(editPlayer.id, formData);
      toast("แก้ไขข้อมูลนักเตะสำเร็จ");
    } else {
      await addPlayerAction(formData);
      toast("เพิ่มนักเตะสำเร็จ");
    }
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("ยืนยันการลบนักเตะคนนี้?")) return;
    setDeleting(id);
    await deletePlayerAction(id);
    toast("ลบนักเตะสำเร็จ", "info");
    router.refresh();
    setDeleting(null);
  }

  const positionBadge = (pos: Position) => {
    const colors = { GK: "text-warning bg-warning/10", DF: "text-blue-400 bg-blue-500/10", MF: "text-green-400 bg-green-500/10", FW: "text-primary bg-primary/10" };
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[pos]}`}>{POSITIONS[pos]}</span>;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">จัดการนักเตะ</h1>
          <p className="text-text-muted text-sm mt-1">นักเตะทั้งหมด {initialPlayers.length} คน</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          เพิ่มนักเตะ
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="text-left px-4 py-3 text-text-muted font-medium w-12">เบอร์</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium">ชื่อ</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium">ตำแหน่ง</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium hidden md:table-cell">ภูมิลำเนา</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium">สถานะ</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {initialPlayers.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-surface-light transition-colors">
                  <td className="px-4 py-3 font-bold font-[family-name:var(--font-display)] text-primary text-xl">
                    {p.jerseyNumber}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{p.nameTh}</p>
                    {p.nickname && <p className="text-xs text-text-muted">"{p.nickname}"</p>}
                  </td>
                  <td className="px-4 py-3">{positionBadge(p.position)}</td>
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">{p.hometown || "-"}</td>
                  <td className="text-center px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? "bg-success/10 text-success" : "bg-border text-text-muted"}`}>
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-center px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(p)}
                        className="text-xs px-3 py-1.5 bg-secondary/20 text-secondary-light hover:bg-secondary/40 rounded-lg transition-colors">
                        แก้ไข
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                        className="text-xs px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg transition-colors disabled:opacity-50">
                        {deleting === p.id ? "..." : "ลบ"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {initialPlayers.length === 0 && (
            <p className="text-center text-text-muted py-12">ยังไม่มีนักเตะ — กด "เพิ่มนักเตะ" เพื่อเริ่มต้น</p>
          )}
        </div>
      </div>

      {showModal && (
        <PlayerModal
          player={editPlayer}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
