import { CLUB } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div style={{ background: "linear-gradient(180deg, #070d1c 0%, #0a0e1a 40%, #0d0812 100%)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #1E4D8C 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-8 z-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ color: "rgba(30,77,140,0.9)" }}>
            Police Sawankhalok FC
          </p>
          <h1 className="font-extrabold text-white leading-none mb-3"
            style={{ fontSize: "clamp(36px, 9vw, 72px)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
            ติดต่อเรา
          </h1>
          <div className="w-16 h-1 rounded-full" style={{ background: "#1E4D8C" }} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Contact Info */}
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: "#1E4D8C" }} />
              <h2 className="text-lg font-bold text-white">ข้อมูลติดต่อ</h2>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "ที่อยู่",
                  value: "สนามกีฬาอำเภอสวรรคโลก\nอ.สวรรคโลก จ.สุโขทัย 64110",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "โทรศัพท์",
                  value: "055-XXX-XXX",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "อีเมล",
                  value: "police.swp.fc@gmail.com",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(196,30,58,0.1)", border: "1px solid rgba(196,30,58,0.2)", color: "#C41E3A" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{item.label}</p>
                    <p className="text-sm text-white whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>โซเชียลมีเดีย</p>
              <div className="flex gap-3">
                <a href={CLUB.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-80"
                  style={{ background: "rgba(24,119,242,0.15)", border: "1px solid rgba(24,119,242,0.3)", color: "#60a5fa" }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a href="#"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-80"
                  style={{ background: "rgba(0,185,0,0.12)", border: "1px solid rgba(0,185,0,0.25)", color: "#4ade80" }}>
                  LINE
                </a>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", minHeight: "320px" }}>
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
                <svg className="w-14 h-14 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-medium">แผนที่ Google Maps</p>
                <p className="text-xs mt-1">สนามกีฬาอำเภอสวรรคโลก</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
