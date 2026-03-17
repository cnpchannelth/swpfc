import Image from "next/image";
import Link from "next/link";
import { getMatches } from "@/lib/data-store";
import { formatThaiDate, formatThaiTime } from "@/lib/utils";
import { CLUB } from "@/lib/constants";
import NextMatchCountdown from "./NextMatchCountdown";

export default function NextMatchCard() {
  const matches = getMatches();
  const nextMatch = matches.find((m) => m.status === "scheduled");
  if (!nextMatch) return null;

  const matchDate = new Date(nextMatch.matchDate);
  const isHome = nextMatch.homeTeam.isOwn;
  const opponent = isHome ? nextMatch.awayTeam : nextMatch.homeTeam;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded" />
        นัดถัดไป
      </h2>
      <Link href="/fixtures">
        <div className="bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-[0_0_24px_rgba(196,30,58,0.12)] group">
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              {isHome ? (
                <Image
                  src={CLUB.logo}
                  alt="SWP"
                  width={72}
                  height={72}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-16 h-16 bg-surface-light rounded-full flex items-center justify-center text-2xl font-bold text-text-muted">
                  {opponent.nameTh.charAt(0)}
                </div>
              )}
              <span className="text-sm font-medium text-text text-center">
                {isHome ? CLUB.shortName : nextMatch.homeTeam.nameTh}
              </span>
            </div>

            {/* VS & Info */}
            <div className="flex flex-col items-center gap-1 px-4">
              <span className="text-4xl font-bold font-[family-name:var(--font-display)] text-text-muted/60 tracking-widest">
                VS
              </span>
              <div className="text-center mt-1">
                <p className="text-sm text-primary font-semibold">
                  {formatThaiDate(matchDate)}
                </p>
                <p className="text-xs text-text-muted">
                  {formatThaiTime(matchDate)}
                </p>
              </div>
              {/* Countdown */}
              <NextMatchCountdown matchDate={nextMatch.matchDate} />
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              {!isHome ? (
                <Image
                  src={CLUB.logo}
                  alt="SWP"
                  width={72}
                  height={72}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-16 h-16 bg-surface-light rounded-full flex items-center justify-center text-2xl font-bold text-text-muted">
                  {opponent.nameTh.charAt(0)}
                </div>
              )}
              <span className="text-sm font-medium text-text text-center">
                {!isHome ? CLUB.shortName : nextMatch.awayTeam.nameTh}
              </span>
            </div>
          </div>

          {/* Venue */}
          {nextMatch.venue && (
            <div className="mt-4 text-center">
              <p className="text-xs text-text-muted">📍 {nextMatch.venue}</p>
            </div>
          )}
        </div>
      </Link>
    </section>
  );
}
