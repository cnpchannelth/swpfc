"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Player, PlayerSeasonStats } from "@/types";
import { POSITIONS } from "@/lib/constants";
import { upsertStatAction, deleteStatAction } from "@/lib/actions/stats";
import { useToast } from "@/components/ui/Toast";

interface Props {
  players: Player[];
  stats: PlayerSeasonStats[];
}

const STAT_FIELDS = [
  { name: "appearances", label: "ลงสนาม", icon: "🏃" },
  { name: "goals", label: "ประตู", icon: "⚽" },
  { name: "assists", label: "แอสซิสต์", icon: "🎯" },
  { name: "cleanSheets", label: "คลีนชีท", icon: "🧤" },
  { name: "yellowCards", label: "ใบเหลือง", icon: "🟨" },
  { name: "redCards", label: "ใบแดง", icon: "🟥" },
  { name: "minutesPlayed", label: "นาที", icon: "⏱" },
];

function StatModal({
  player,
  existing,
  onClose,
  onSave,
}: {
  player: Player;
  existing: PlayerSeasonStats | null;
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-text">{player.nameTh}</h2>
            <p className="text-xs text-text-muted">{POSITIONS[player.position]} · เบอร์ {player.jerseyNumber}</p>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-5">
          <input type="hidden" name="playerId" value={player.id} />
          <div className="grid grid-cols-2 gap-3">
            {STAT_FIELDS.map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-medium text-text-muted mb-1">
                  {f.icon} {f.label}
                </label>
                <input
                  type="number"
                  name={f.name}
                  min="0"
                  defaultValue={(existing as unknown as Record<string, number>)?.[f.name] ?? 0}
                  className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-text-muted bg-surface-light hover:bg-border rounded-lg transition-colors">
              ยกเลิก
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark disabled:opacity-60 rounded-lg transition-colors">
              {loading ? "กำลังบันทึก..." : "บันทึกสถิติ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function StatsAdminClient({ players, stats }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const statMap = new Map(stats.map((s) => [s.player.id, s]));

  async function handleSave(formData: FormData) {
    await upsertStatAction(formData);
    toast("บันทึกสถิติสำเร็จ");
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("ยืนยันการลบสถิตินักเตะคนนี้?")) return;
    setDeleting(id);
    await deleteStatAction(id);
    toast("ลบสถิติสำเร็จ", "info");
    router.refresh();
    setDeleting(null);
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-text">จัดการสถิตินักเตะ</h1>
        <p className="text-text-muted text-sm mt-1">บันทึกสถิติการยิง แอสซิสต์ และอื่นๆ รายฤดูกาล</p>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="text-left px-4 py-3 text-text-muted font-medium">นักเตะ</th>
                <th className="text-center px-3 py-3 text-text-muted font-medium">ลงสนาม</th>
                <th className="text-center px-3 py-3 text-text-muted font-medium">⚽</th>
                <th className="text-center px-3 py-3 text-text-muted font-medium">🎯</th>
                <th className="text-center px-3 py-3 text-text-muted font-medium">🧤</th>
                <th className="text-center px-3 py-3 text-text-muted font-medium">🟨</th>
                <th className="text-center px-3 py-3 text-text-muted font-medium">🟥</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => {
                const s = statMap.get(p.id);
                return (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-surface-light transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-text">{p.nameTh}</p>
                      <p className="text-xs text-text-muted">{POSITIONS[p.position]} · #{p.jerseyNumber}</p>
                    </td>
                    <td className="text-center px-3 py-3 font-bold text-text">{s?.appearances ?? <span className="text-text-muted">-</span>}</td>
                    <td className="text-center px-3 py-3 font-bold text-primary">{s?.goals ?? <span className="text-text-muted">-</span>}</td>
                    <td className="text-center px-3 py-3 font-bold text-secondary">{s?.assists ?? <span className="text-text-muted">-</span>}</td>
                    <td className="text-center px-3 py-3 font-bold text-success">{s?.cleanSheets ?? <span className="text-text-muted">-</span>}</td>
                    <td className="text-center px-3 py-3 font-bold text-warning">{s?.yellowCards ?? <span className="text-text-muted">-</span>}</td>
                    <td className="text-center px-3 py-3 font-bold text-danger">{s?.redCards ?? <span className="text-text-muted">-</span>}</td>
                    <td className="text-center px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setEditPlayer(p)}
                          className="text-xs px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors font-medium">
                          {s ? "แก้ไข" : "เพิ่มสถิติ"}
                        </button>
                        {s && (
                          <button onClick={() => handleDelete(s.id)} disabled={deleting === s.id}
                            className="text-xs px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg transition-colors disabled:opacity-50">
                            {deleting === s.id ? "..." : "ลบ"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {players.length === 0 && (
            <p className="text-center text-text-muted py-12">ยังไม่มีนักเตะ — เพิ่มนักเตะก่อนในหน้า "จัดการนักเตะ"</p>
          )}
        </div>
      </div>

      {editPlayer && (
        <StatModal
          player={editPlayer}
          existing={statMap.get(editPlayer.id) ?? null}
          onClose={() => setEditPlayer(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
