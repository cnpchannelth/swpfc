"use client";

import { useState, useRef, useTransition } from "react";
import type { LeagueStanding } from "@/types";
import { upsertStandingAction, deleteStandingAction } from "@/lib/actions/standings";
import { useToast } from "@/components/ui/Toast";

type EditEntry = Omit<LeagueStanding, "team"> & {
  teamId: number;
  teamName: string;
  isOwn: boolean;
};

export default function StandingsAdminClient({ standings }: { standings: LeagueStanding[] }) {
  const [editing, setEditing] = useState<EditEntry | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  function openNew() {
    setEditing({ id: 0, teamId: 0, teamName: "", isOwn: false, position: standings.length + 1, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 });
    setIsNew(true);
  }

  function openEdit(row: LeagueStanding) {
    setEditing({ id: row.id, teamId: row.team.id, teamName: row.team.nameTh, isOwn: row.team.isOwn, position: row.position, played: row.played, won: row.won, drawn: row.drawn, lost: row.lost, goalsFor: row.goalsFor, goalsAgainst: row.goalsAgainst, points: row.points });
    setIsNew(false);
  }

  function closeForm() { setEditing(null); setIsNew(false); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    if (editing && !isNew) fd.set("id", String(editing.id));
    fd.set("teamId", String(editing?.teamId ?? 0));
    startTransition(async () => {
      await upsertStandingAction(fd);
      toast(isNew ? "เพิ่มแล้ว" : "อัปเดตแล้ว", "success");
      closeForm();
    });
  }

  function handleDelete(id: number) {
    if (!confirm("ลบแถวนี้?")) return;
    startTransition(async () => {
      await deleteStandingAction(id);
      toast("ลบแล้ว", "success");
    });
  }

  const numInput = (name: string, label: string, defaultVal: number) => (
    <div>
      <label className="block text-xs font-medium text-text-muted mb-1">{label}</label>
      <input
        name={name}
        type="number"
        min={0}
        defaultValue={defaultVal}
        className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text">ตารางคะแนน</h1>
          <p className="text-text-muted text-sm mt-1">{standings.length} ทีม</p>
        </div>
        <button onClick={openNew} className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          + เพิ่มทีม
        </button>
      </div>

      {/* Form Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface border border-border rounded-2xl p-6 w-full max-w-lg my-4">
            <h2 className="text-lg font-bold text-text mb-4">{isNew ? "เพิ่มทีม" : "แก้ไขข้อมูล"}</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">ชื่อทีม *</label>
                <input
                  name="teamName"
                  required
                  defaultValue={editing.teamName}
                  className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
                <input type="checkbox" name="isOwn" value="true" defaultChecked={editing.isOwn} className="rounded" />
                เป็นทีมของเรา (SWP)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {numInput("position", "อันดับ", editing.position)}
                {numInput("played", "แข่ง", editing.played)}
                {numInput("won", "ชนะ", editing.won)}
                {numInput("drawn", "เสมอ", editing.drawn)}
                {numInput("lost", "แพ้", editing.lost)}
                {numInput("goalsFor", "ได้ประตู", editing.goalsFor)}
                {numInput("goalsAgainst", "เสียประตู", editing.goalsAgainst)}
                {numInput("points", "คะแนน", editing.points)}
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

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-text-muted text-xs">
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">ทีม</th>
              <th className="text-center px-2 py-3">แข่ง</th>
              <th className="text-center px-2 py-3">ชนะ</th>
              <th className="text-center px-2 py-3">เสมอ</th>
              <th className="text-center px-2 py-3">แพ้</th>
              <th className="text-center px-2 py-3 hidden sm:table-cell">ได้</th>
              <th className="text-center px-2 py-3 hidden sm:table-cell">เสีย</th>
              <th className="text-center px-2 py-3 font-bold">คะแนน</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr key={row.id} className={`border-b border-border/50 hover:bg-surface-light transition-colors ${row.team.isOwn ? "bg-primary/5" : ""}`}>
                <td className="px-4 py-3 text-text-muted font-medium">{row.position}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${row.team.isOwn ? "text-primary" : "text-text"}`}>
                    {row.team.nameTh}
                    {row.team.isOwn && <span className="ml-1 text-xs text-primary/70">(เรา)</span>}
                  </span>
                </td>
                <td className="text-center px-2 py-3 text-text-muted">{row.played}</td>
                <td className="text-center px-2 py-3 text-text-muted">{row.won}</td>
                <td className="text-center px-2 py-3 text-text-muted">{row.drawn}</td>
                <td className="text-center px-2 py-3 text-text-muted">{row.lost}</td>
                <td className="text-center px-2 py-3 text-text-muted hidden sm:table-cell">{row.goalsFor}</td>
                <td className="text-center px-2 py-3 text-text-muted hidden sm:table-cell">{row.goalsAgainst}</td>
                <td className="text-center px-2 py-3 font-bold text-text">{row.points}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(row)} className="text-xs px-2 py-1 rounded bg-surface-light border border-border text-text-muted hover:text-text transition-colors">แก้ไข</button>
                    <button onClick={() => handleDelete(row.id)} className="text-xs px-2 py-1 rounded bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20 transition-colors">ลบ</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {standings.length === 0 && (
          <p className="text-center text-text-muted py-12">ยังไม่มีข้อมูล</p>
        )}
      </div>
    </div>
  );
}
