"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  color?: string;
}

type StreakResult = "W" | "D" | "L";

function useCountUp(target: number, duration = 900, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (target === 0) { setCount(0); return; }
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function AnimatedNumber({
  value,
  color,
  active,
}: {
  value: number;
  color?: string;
  active: boolean;
}) {
  const count = useCountUp(value, 900, active);
  return (
    <span className={`text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] tabular-nums ${color ?? "text-text"}`}>
      {count}
    </span>
  );
}

const streakColors: Record<StreakResult, string> = {
  W: "bg-success text-white",
  D: "bg-warning text-dark",
  L: "bg-danger text-white",
};
const streakLabels: Record<StreakResult, string> = { W: "W", D: "D", L: "L" };

export default function AnimatedStats({
  stats,
  streak,
}: {
  stats: StatItem[];
  streak: StreakResult[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 py-6">
      {/* Stats Row */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <AnimatedNumber value={s.value} color={s.color} active={active} />
            <div className="text-xs text-text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Result Streak */}
      {streak.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="text-xs text-text-muted mr-1">ฟอร์ม 5 นัดล่าสุด</span>
          {streak.map((r, i) => (
            <span
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${streakColors[r]}`}
              style={{
                animation: `fadeInUp 0.4s ease ${i * 80}ms both`,
              }}
            >
              {streakLabels[r]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
