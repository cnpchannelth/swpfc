"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { NewsArticle } from "@/types";
import { NEWS_CATEGORIES } from "@/lib/constants";
import { formatThaiDate } from "@/lib/utils";
import { addNewsAction, updateNewsAction, deleteNewsAction, togglePublishAction } from "@/lib/actions/news";
import { useToast } from "@/components/ui/Toast";

const CATEGORY_KEYS = Object.keys(NEWS_CATEGORIES) as (keyof typeof NEWS_CATEGORIES)[];

interface Props {
  initialArticles: NewsArticle[];
}

function NewsModal({
  article,
  onClose,
  onSave,
}: {
  article: NewsArticle | null;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(article?.coverImage ?? null);
  const [uploading, setUploading] = useState(false);

  async function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json.url) {
      setCoverPreview(json.url);
      const hidden = formRef.current?.querySelector<HTMLInputElement>('input[name="coverImage"]');
      if (hidden) hidden.value = json.url;
    }
    setUploading(false);
  }

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
      <div className="bg-surface border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold text-text">
            {article ? "แก้ไขข่าว" : "เพิ่มข่าวใหม่"}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">หัวข้อข่าว *</label>
            <input type="text" name="title" defaultValue={article?.title ?? ""} required
              placeholder="กรอกหัวข้อข่าว..."
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">หมวดหมู่</label>
              <select name="category" defaultValue={article?.category ?? "general"}
                className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary [&_option]:bg-white [&_option]:text-text">
                {CATEGORY_KEYS.map((k) => (
                  <option key={k} value={k}>{NEWS_CATEGORIES[k]}</option>
                ))}
              </select>
            </div>
            {/* Publish status */}
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="hidden" name="isPublished" value="false" />
                <input type="checkbox" name="isPublished" value="true"
                  defaultChecked={article?.isPublished ?? false}
                  className="w-4 h-4 accent-primary" />
                <span className="text-sm text-text-muted">เผยแพร่ทันที</span>
              </label>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">ข้อความย่อ</label>
            <input type="text" name="excerpt" defaultValue={article?.excerpt ?? ""}
              placeholder="สรุปข่าวสั้นๆ (แสดงในรายการข่าว)"
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary" />
          </div>

          {/* Cover image */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-2">รูปปกข่าว</label>
            <div className="flex items-center gap-3">
              <div className="w-20 h-14 rounded-lg bg-surface-light border border-border overflow-hidden flex items-center justify-center flex-shrink-0">
                {coverPreview ? (
                  <Image src={coverPreview} alt="cover" width={80} height={56} className="object-cover w-full h-full" />
                ) : (
                  <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <label className="cursor-pointer flex-1">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed text-sm font-medium transition-colors
                  ${uploading ? "border-border text-text-muted" : "border-primary/40 text-primary hover:border-primary hover:bg-primary/5"}`}>
                  {uploading ? "กำลังอัพโหลด..." : "เลือกรูปปก / ถ่ายภาพ"}
                </div>
                <input type="file" accept="image/*" capture="environment" onChange={handleCoverChange} className="hidden" disabled={uploading} />
              </label>
            </div>
            <input type="hidden" name="coverImage" defaultValue={article?.coverImage ?? ""} />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">
              เนื้อหาข่าว * <span className="text-text-muted/60">(รองรับ Markdown: **หนา**, ## หัวข้อ, - รายการ)</span>
            </label>
            <textarea name="content" defaultValue={article?.content ?? ""} required rows={10}
              placeholder={`# หัวข้อหลัก\n\nเนื้อหาข่าว...\n\n**ตัวหนา** และ _ตัวเอียง_`}
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-text text-sm font-mono focus:outline-none focus:border-primary resize-y" />
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

export default function NewsClient({ initialArticles }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editArticle, setEditArticle] = useState<NewsArticle | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [toggling, setToggling] = useState<number | null>(null);

  function openAdd() { setEditArticle(null); setShowModal(true); }
  function openEdit(a: NewsArticle) { setEditArticle(a); setShowModal(true); }

  async function handleSave(formData: FormData) {
    if (editArticle) {
      await updateNewsAction(editArticle.id, formData);
      toast("แก้ไขข่าวสำเร็จ");
    } else {
      await addNewsAction(formData);
      toast("เพิ่มข่าวสำเร็จ");
    }
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("ยืนยันการลบข่าวนี้?")) return;
    setDeleting(id);
    await deleteNewsAction(id);
    toast("ลบข่าวสำเร็จ", "info");
    router.refresh();
    setDeleting(null);
  }

  async function handleToggle(id: number) {
    setToggling(id);
    await togglePublishAction(id);
    toast("เปลี่ยนสถานะสำเร็จ");
    router.refresh();
    setToggling(null);
  }

  const sorted = [...initialArticles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text">จัดการข่าวสาร</h1>
          <p className="text-text-muted text-sm mt-1">
            ข่าวทั้งหมด {initialArticles.length} รายการ
            {" · "}เผยแพร่แล้ว {initialArticles.filter((a) => a.isPublished).length} รายการ
          </p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          เพิ่มข่าว
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="text-left px-4 py-3 text-text-muted font-medium">หัวข้อข่าว</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium hidden md:table-cell">หมวดหมู่</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium hidden md:table-cell">วันที่</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium">สถานะ</th>
                <th className="text-center px-4 py-3 text-text-muted font-medium">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((a) => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-surface-light transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-text line-clamp-1">{a.title}</p>
                    {a.excerpt && <p className="text-xs text-text-muted line-clamp-1 mt-0.5">{a.excerpt}</p>}
                  </td>
                  <td className="text-center px-4 py-3 hidden md:table-cell">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary-light">
                      {NEWS_CATEGORIES[a.category as keyof typeof NEWS_CATEGORIES] ?? a.category}
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 text-text-muted text-xs hidden md:table-cell">
                    {formatThaiDate(new Date(a.createdAt))}
                  </td>
                  <td className="text-center px-4 py-3">
                    <button
                      onClick={() => handleToggle(a.id)}
                      disabled={toggling === a.id}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        a.isPublished
                          ? "bg-success/20 text-success hover:bg-success/30"
                          : "bg-border text-text-muted hover:bg-surface-light"
                      } disabled:opacity-50`}
                    >
                      {toggling === a.id ? "..." : a.isPublished ? "✓ เผยแพร่" : "ฉบับร่าง"}
                    </button>
                  </td>
                  <td className="text-center px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(a)}
                        className="text-xs px-3 py-1.5 bg-secondary/20 text-secondary-light hover:bg-secondary/40 rounded-lg transition-colors">
                        แก้ไข
                      </button>
                      <button onClick={() => handleDelete(a.id)} disabled={deleting === a.id}
                        className="text-xs px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg transition-colors disabled:opacity-50">
                        {deleting === a.id ? "..." : "ลบ"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sorted.length === 0 && (
            <p className="text-center text-text-muted py-12">ยังไม่มีข่าว</p>
          )}
        </div>
      </div>

      {showModal && (
        <NewsModal article={editArticle} onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
}
