"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function NextMatchCountdown({ matchDate }: { matchDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const target = new Date(matchDate).getTime();

    function calc() {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    }

    calc();
    setStarted(true);
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [matchDate]);

  if (!started) return null;

  const units = [
    { label: "วัน",     value: timeLeft.days },
    { label: "ชั่วโมง", value: timeLeft.hours },
    { label: "นาที",   value: timeLeft.minutes },
    { label: "วินาที", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-1 mt-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1">
          <div className="text-center">
            <div className="bg-dark rounded-lg px-2 py-1 min-w-[2.8rem] text-center">
              <span className="text-xl font-bold font-[family-name:var(--font-display)] text-primary tabular-nums">
                {pad(u.value)}
              </span>
            </div>
            <p className="text-[10px] text-text-muted mt-0.5">{u.label}</p>
          </div>
          {i < 3 && (
            <span className="text-text-muted font-bold mb-3 text-lg">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
