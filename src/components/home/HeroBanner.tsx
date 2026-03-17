import Image from "next/image";
import Link from "next/link";
import { CLUB } from "@/lib/constants";
import { getMatches } from "@/lib/data-store";

export default async function HeroBanner() {
  const matches = await getMatches();
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
    W: { label: "ชนะ", color: "#2EA043", glow: "rgba(46,160,67,0.4)" },
    D: { label: "เสมอ", color: "#D29922", glow: "rgba(210,153,34,0.4)" },
    L: { label: "แพ้",  color: "#C41E3A", glow: "rgba(196,30,58,0.4)" },
  };

  return (
    <section
      className="relative overflow-hidden scan-sweep"
      style={{ background: "linear-gradient(160deg, #060d1f 0%, #0e1628 40%, #0a0310 100%)", minHeight: "520px" }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Red radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-25 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #C41E3A 0%, transparent 65%)" }} />

      {/* Diagonal stripe */}
      <div className="absolute inset-0 hero-stripes opacity-60 pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #070d1c)" }} />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Logo */}
          <div className="flex-shrink-0 relative float-y">
            <div className="absolute inset-0 rounded-full blur-3xl scale-125 opacity-40"
              style={{ background: "radial-gradient(circle, #C41E3A, transparent 70%)" }} />
            <div className="absolute inset-0 rounded-full blur-xl scale-110 opacity-20"
              style={{ background: "radial-gradient(circle, #1E4D8C, transparent 70%)" }} />
            <Image
              src={CLUB.logo}
              alt={CLUB.nameEn}
              width={200}
              height={200}
              className="relative drop-shadow-2xl logo-glow"
              priority
            />
          </div>

          {/* Text content */}
          <div className="text-center md:text-left flex-1">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 font-bold animate-fade-in-up neon-flicker"
              style={{ color: "#C41E3A", textShadow: "0 0 10px rgba(196,30,58,0.6)" }}>
              ฤดูกาล 2569
            </p>

            <h1
              className="font-extrabold text-white leading-none mb-2 glitch-text"
              data-text={CLUB.name}
              style={{
                fontSize: "clamp(32px, 7vw, 72px)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
                textShadow: "0 0 60px rgba(196,30,58,0.3), 0 2px 20px rgba(0,0,0,0.8)",
                animation: "fadeInUp 0.6s ease 0.1s both",
              }}
            >
              {CLUB.name}
            </h1>

            {/* Red accent line */}
            <div className="flex items-center gap-3 mb-5 justify-center md:justify-start"
              style={{ animation: "fadeInUp 0.6s ease 0.2s both" }}>
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, #C41E3A, transparent)" }} />
              <span className="text-xs tracking-widest font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>
                SAWANKHALOK · SUKHOTHAI
              </span>
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, #C41E3A, transparent)" }} />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-5"
              style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}>
              <span className="relative px-4 py-2 text-sm font-bold rounded-lg card-shine"
                style={{
                  background: "rgba(46,160,67,0.15)",
                  border: "1px solid rgba(46,160,67,0.4)",
                  color: "#2EA043",
                  boxShadow: "0 0 16px rgba(46,160,67,0.2)",
                }}>
                🏆 อันดับ 1 ในลีก
              </span>
              <Link href="/fixtures"
                className="relative px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 card-shine"
                style={{
                  background: "rgba(196,30,58,0.15)",
                  border: "1px solid rgba(196,30,58,0.5)",
                  color: "#ff6b7a",
                  boxShadow: "0 0 16px rgba(196,30,58,0.2)",
                }}
                onMouseEnter={undefined}
              >
                ดูตารางแข่งขัน →
              </Link>
            </div>

            {/* Latest result */}
            {latestScore && (() => {
              const rc = resultConfig[latestScore.result as keyof typeof resultConfig];
              return (
                <div className="inline-flex items-center gap-3" style={{ animation: "fadeInUp 0.6s ease 0.4s both" }}>
                  <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>ผลล่าสุด</span>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{
                      background: `${rc.color}15`,
                      border: `1px solid ${rc.color}50`,
                      boxShadow: `0 0 16px ${rc.glow}`,
                    }}>
                    <span className="font-extrabold text-base" style={{ fontFamily: "var(--font-display)", color: rc.color, textShadow: `0 0 12px ${rc.glow}` }}>
                      {rc.label}
                    </span>
                    <span className="text-white font-extrabold text-xl" style={{ fontFamily: "var(--font-display)" }}>
                      {latestScore.swp}–{latestScore.opp}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {latestScore.isHome ? "vs" : "@"} {latestScore.opponent}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C41E3A, #1E4D8C, #C41E3A, transparent)" }} />
    </section>
  );
}
