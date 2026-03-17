"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Match } from "@/types";
import { MATCH_STATUS } from "@/lib/constants";
import { formatThaiDate } from "@/lib/utils";
import { addMatchAction, updateMatchAction, deleteMatchAction } from "@/lib/actions/matches";
import { useToast } from "@/components/ui/Toast";

const STATUS_OPTIONS: Match["status"][] = ["scheduled", "completed", "live", "postponed"];

interface Props {
  initialMatches: Match[];
}

function MatchModal({
  match,
  onClose,
  onSave,
}: {
  match: Match | null;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  // Derive current values for edit
  const isHome = match ? match.homeTeam.isOwn : true;
  const opponentName = match
    ? (match.homeTeam.isOwn ? match.awayTeam.nameTh : match.homeTeam.nameTh)
    : "";
  // Format datetime-local value
  const dateLocal = match
    ? new Date(match.matchDate).toISOString().slice(0, 16)
    : "";

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
          <h2 className="text-lg font-bold text-text">
            {match ? "แก้ไขแมตช์" : "เพิ่มแมตช์ใหม่"}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {/* Home/Away */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-2">SWP เป็นทีม</label>
            <div className="flex gap-3">
              {[
                { value: "true", label: "🏠 ทีมเหย้า" },
                { value: "false", label: "✈️ ทีมเยือน" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isHome"
                    value={opt.value}
                    defaultChecked={
                      opt.value === "true" ? isHome : !isHome
                    }
                    className="accent-primary"
                  />
                  <span className="text-sm text-text">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opponent */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">ชื่อทีมคู่แข่ง *</label>
            <input type="text" name="opponentName" defaultValue={opponentName} required
              placeholder="เช่น ศรีสัชนาลัย ซิตี้"
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
          </div>

          {/* Match Date */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">วันเวลาแข่งขัน *</label>
            <input type="datetime-local" name="matchDate" defaultValue={dateLocal} required
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">สนามแข่งขัน</label>
            <input type="text" name="venue" defaultValue={match?.venue ?? ""}
              placeholder="เช่น สนามกีฬาอำเภอสวรรคโลก"
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
          </div>

          {/* Matchday */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">นัดที่</label>
            <input type="number" name="matchday" defaultValue={match?.matchday ?? ""}
              placeholder="เช่น 1, 2, 3..."
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">สถานะ</label>
            <select name="status" defaultValue={match?.status ?? "scheduled"}
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary">
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{MATCH_STATUS[s]}</option>
              ))}
            </select>
          </div>

          {/* Score */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">
                สกอร์ทีมเหย้า
              </label>
              <input type="number" name="homeScore" min="0"
                defaultValue={match?.homeScore ?? ""}
                placeholder="ยังไม่มี"
                className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">
                สกอร์ทีมเยือน
              </label>
              <input type="number" name="awayScore" min="0"
                defaultValue={match?.awayScore ?? ""}
                placeholder="ยังไม่มี"
                className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
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

export default function MatchesClient({ initialMatches }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editMatch, setEditMatch] = useState<Match | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  function openAdd() { setEditMatch(null); setShowModal(true); }
  function openEdit(m: Match) { setEditMatch(m); setShowModal(true); }

  async function handleSave(formData: FormData) {
    if (editMatch) {
      await updateMatchAction(editMatch.id, formData);
      toast("แก้ไขแมตช์สำเร็จ");
    } else {
      await addMatchAction(formData);
      toast("เพิ่มแมตช์สำเร็จ");
    }
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("ยืนยันการลบแมตช์นี้?")) return;
    setDeleting(id);
    await deleteMatchAction(id);
    toast("ลบแมตช์สำเร็จ", "info");
    router.refresh();
    setDeleting(null);
  }

  const sortedMatches = [...initialMatches].sort(
    (a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime()
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text">จัดการแมตช์</h1>
          <p className="text-text-muted text-sm mt-1">แมตช์ทั้งหมด {initialMatches.length} นัด</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          เพิ่มแมตช์
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="text-left px-4 py-3 text-text-muted font-medium">วันที่</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium">คู่แข่ง</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium">สกอร์</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium hidden md:table-cell">สนาม</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium">สถานะ</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {sortedMatches.map((m) => {
                const isHome = m.homeTeam.isOwn;
                const opponent = isHome ? m.awayTeam : m.homeTeam;
                const statusColors: Record<string, string> = {
                  completed: "bg-success/20 text-success",
                  scheduled: "bg-warning/20 text-warning",
                  live: "bg-primary/20 text-primary",
                  postponed: "bg-border text-text-muted",
                };
                return (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-surface-light transition-colors">
                    <td className="px-4 py-3 text-text-muted">
                      {formatThaiDate(new Date(m.matchDate))}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-text">
                        {isHome ? "🏠" : "✈️"} {opponent.nameTh}
                      </p>
                      {m.matchday && <p className="text-xs text-text-muted">นัดที่ {m.matchday}</p>}
                    </td>
                    <td className="text-center px-4 py-3">
                      <span className="font-bold font-[family-name:var(--font-display)] text-text text-lg">
                        {m.homeScore !== undefined
                          ? `${m.homeScore} - ${m.awayScore}`
                          : "- vs -"}
                      </span>
                    </td>
                    <td className="text-center px-4 py-3 text-text-muted text-xs hidden md:table-cell">
                      {m.venue || "-"}
                    </td>
                    <td className="text-center px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[m.status] ?? ""}`}>
                        {MATCH_STATUS[m.status]}
                      </span>
                    </td>
                    <td className="text-center px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(m)}
                          className="text-xs px-3 py-1.5 bg-secondary/20 text-secondary-light hover:bg-secondary/40 rounded-lg transition-colors">
                          แก้ไข
                        </button>
                        <button onClick={() => handleDelete(m.id)} disabled={deleting === m.id}
                          className="text-xs px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg transition-colors disabled:opacity-50">
                          {deleting === m.id ? "..." : "ลบ"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {sortedMatches.length === 0 && (
            <p className="text-center text-text-muted py-12">ยังไม่มีแมตช์</p>
          )}
        </div>
      </div>

      {showModal && (
        <MatchModal match={editMatch} onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
}
