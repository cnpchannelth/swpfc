import Image from "next/image";
import Link from "next/link";
import { CLUB } from "@/lib/constants";
import { getMatches } from "@/lib/data-store";

export default function HeroBanner() {
  const matches = getMatches();
  const completed = matches
    .filter((m) => m.status === "completed")
    .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())
    .slice(0, 1)[0];

  const latestScore = completed
    ? (() => {
        const isHome = completed.homeTeam.isOwn;
        const swp = isHome ? completed.homeScore : completed.awayScore;
        const opp = isHome ? completed.awayScore : completed.homeScore;
        const result = swp! > opp! ? "W" : swp === opp ? "D" : "L";
        const opponent = isHome ? completed.awayTeam.nameTh : completed.homeTeam.nameTh;
        return { swp, opp, result, opponent, isHome };
      })()
    : null;

  const resultConfig = {
    W: { label: "ชนะ", color: "text-success", bg: "bg-success/15 border-success/30" },
    D: { label: "เสมอ", color: "text-warning", bg: "bg-warning/15 border-warning/30" },
    L: { label: "แพ้",  color: "text-danger",  bg: "bg-danger/15 border-danger/30"  },
  };

  return (
    <section className="relative hero-gradient overflow-hidden hero-clip">
      {/* Animated stripe overlay */}
      <div className="absolute inset-0 hero-stripes pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Logo with ambient glow */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150" />
            <Image
              src={CLUB.logo}
              alt={CLUB.nameEn}
              width={200}
              height={200}
              className="relative logo-glow drop-shadow-2xl"
              priority
            />
          </div>

          {/* Club Info */}
          <div className="text-center md:text-left flex-1">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2 animate-fade-in-up">
              ฤดูกาล 2569
            </p>
            <h1
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
              style={{ animation: "fadeInUp 0.6s ease 0.1s both" }}
            >
              {CLUB.name}
            </h1>
            <p
              className="text-lg md:text-xl text-text-muted mt-2 font-light"
              style={{ animation: "fadeInUp 0.6s ease 0.2s both" }}
            >
              {CLUB.nameEn}
            </p>

            <div
              className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start"
              style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}
            >
              <span className="px-4 py-2 bg-success/15 text-success border border-success/30 rounded-lg text-sm font-semibold">
                🏆 อันดับ 1 ในลีก
              </span>
              <Link
                href="/fixtures"
                className="px-4 py-2 bg-primary/15 text-primary border border-primary/30 rounded-lg text-sm font-semibold hover:bg-primary/25 transition-colors"
              >
                ดูตารางแข่งขัน →
              </Link>
            </div>

            {latestScore && (
              <div
                className="mt-5 inline-flex items-center gap-3"
                style={{ animation: "fadeInUp 0.6s ease 0.4s both" }}
              >
                <span className="text-xs text-text-muted">ผลล่าสุด</span>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${
                    resultConfig[latestScore.result as keyof typeof resultConfig]?.bg
                  }`}
                >
                  <span
                    className={`font-bold ${
                      resultConfig[latestScore.result as keyof typeof resultConfig]?.color
                    }`}
                  >
                    {resultConfig[latestScore.result as keyof typeof resultConfig]?.label}
                  </span>
                  <span className="text-white font-[family-name:var(--font-display)] text-base">
                    {latestScore.swp} – {latestScore.opp}
                  </span>
                  <span className="text-text-muted text-xs">
                    {latestScore.isHome ? "vs" : "@"} {latestScore.opponent}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Red accent bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
}
