import Link from "next/link";
import { getPlayers, getMatches, getNews } from "@/lib/data-store";

export default function AdminDashboardPage() {
  const players = getPlayers();
  const matches = getMatches();
  const news = getNews();

  const completed = matches.filter((m) => m.status === "completed");
  const upcoming = matches.filter((m) => m.status === "scheduled");
  const published = news.filter((n) => n.isPublished);

  const stats = [
    { label: "นักเตะทั้งหมด", value: players.length, href: "/admin/players", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
    { label: "แมตช์ทั้งหมด", value: matches.length, href: "/admin/matches", color: "text-secondary-light", bg: "bg-secondary/10 border-secondary/20" },
    { label: "ผลแข่งขัน", value: completed.length, href: "/admin/matches", color: "text-success", bg: "bg-success/10 border-success/20" },
    { label: "นัดถัดไป", value: upcoming.length, href: "/admin/matches", color: "text-warning", bg: "bg-warning/10 border-warning/20" },
    { label: "ข่าวทั้งหมด", value: news.length, href: "/admin/news", color: "text-text", bg: "bg-surface-light border-border" },
    { label: "ข่าวเผยแพร่", value: published.length, href: "/admin/news", color: "text-success", bg: "bg-success/10 border-success/20" },
  ];

  const quickActions = [
    { label: "เพิ่มนักเตะใหม่", href: "/admin/players", icon: "👤" },
    { label: "บันทึกผลแข่งขัน", href: "/admin/matches", icon: "⚽" },
    { label: "เพิ่มข่าวสาร", href: "/admin/news", icon: "📰" },
  ];

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-extrabold text-white mb-1">ภาพรวม</h1>
      <p className="text-text-muted text-sm mb-6">ยินดีต้อนรับ แอดมินตำรวจสวรรคโลก เอฟซี</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <div className={`border rounded-xl p-5 hover:opacity-80 transition-opacity ${s.bg}`}>
              <p className={`text-3xl font-extrabold font-[family-name:var(--font-display)] ${s.color}`}>
                {s.value}
              </p>
              <p className="text-sm text-text-muted mt-1">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-white mb-3">การดำเนินการด่วน</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link key={a.label} href={a.href}>
              <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-3 hover:border-primary/50 transition-colors">
                <span className="text-2xl">{a.icon}</span>
                <span className="text-sm font-medium text-white">{a.label}</span>
                <svg className="w-4 h-4 text-text-muted ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest matches */}
      <div>
        <h2 className="text-base font-bold text-white mb-3">แมตช์ล่าสุด</h2>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <th className="text-left px-4 py-3">คู่แข่ง</th>
                <th className="text-center px-4 py-3">สกอร์</th>
                <th className="text-center px-4 py-3">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {matches.slice(-5).reverse().map((m) => {
                const isHome = m.homeTeam.isOwn;
                const opponent = isHome ? m.awayTeam : m.homeTeam;
                return (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-surface-light transition-colors">
                    <td className="px-4 py-3 text-white">
                      {isHome ? "🏠 " : "✈️ "}
                      {opponent.nameTh}
                    </td>
                    <td className="text-center px-4 py-3 font-bold font-[family-name:var(--font-display)] text-white">
                      {m.homeScore !== undefined ? `${m.homeScore} - ${m.awayScore}` : "- vs -"}
                    </td>
                    <td className="text-center px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        m.status === "completed" ? "bg-success/20 text-success"
                        : m.status === "scheduled" ? "bg-warning/20 text-warning"
                        : "bg-surface-light text-text-muted"
                      }`}>
                        {m.status === "completed" ? "จบแล้ว" : m.status === "scheduled" ? "กำหนดการ" : m.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
