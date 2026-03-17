import Image from "next/image";
import Link from "next/link";
import { getMatches } from "@/lib/data-store";
import { formatThaiDateShort } from "@/lib/utils";
import { CLUB } from "@/lib/constants";
import FadeIn from "@/components/ui/FadeIn";

export default function LatestResults() {
  const matches = getMatches();
  const completedMatches = matches
    .filter((m) => m.status === "completed")
    .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())
    .slice(0, 3);

  if (completedMatches.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded" />
        ผลการแข่งขันล่าสุด
      </h2>
      <div className="flex flex-col gap-3">
        {completedMatches.map((match, i) => {
          const matchDate = new Date(match.matchDate);
          const isHome = match.homeTeam.isOwn;
          const swpScore = isHome ? match.homeScore : match.awayScore;
          const oppScore = isHome ? match.awayScore : match.homeScore;
          const opponent = isHome ? match.awayTeam : match.homeTeam;
          const result =
            swpScore! > oppScore! ? "W" : swpScore === oppScore ? "D" : "L";
          const resultBg =
            result === "W" ? "bg-success" : result === "D" ? "bg-warning" : "bg-danger";
          const resultText =
            result === "W" ? "ชนะ" : result === "D" ? "เสมอ" : "แพ้";

          return (
            <FadeIn key={match.id} delay={i * 80}>
              <Link href="/fixtures">
                <div className="bg-surface border border-border rounded-lg p-4 hover:border-primary/50 transition-all hover:-translate-y-0.5 flex items-center gap-4 group">
                  {/* Result Badge */}
                  <div className={`${resultBg} w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-semibold leading-none">{resultText}</span>
                    <span className="text-white text-lg font-bold font-[family-name:var(--font-display)] leading-none mt-0.5">
                      {result}
                    </span>
                  </div>

                  {/* Teams & Score */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Image
                      src={CLUB.logo}
                      alt="SWP"
                      width={32}
                      height={32}
                      className="flex-shrink-0 group-hover:scale-110 transition-transform"
                    />
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-text font-semibold text-sm">{CLUB.shortName}</span>
                      <span className="text-xl font-bold font-[family-name:var(--font-display)] text-text">
                        {match.homeScore} - {match.awayScore}
                      </span>
                      <span className="text-text-muted text-sm truncate">{opponent.nameTh}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <span className="text-xs text-text-muted flex-shrink-0 hidden sm:block">
                    {formatThaiDateShort(matchDate)}
                  </span>

                  {/* Home/Away */}
                  <span className="text-xs px-2 py-1 rounded bg-surface-light text-text-muted flex-shrink-0">
                    {isHome ? "เหย้า" : "เยือน"}
                  </span>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
