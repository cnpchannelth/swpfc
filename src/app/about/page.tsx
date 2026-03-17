import Image from "next/image";
import { getStaff } from "@/lib/data-store";
import { CLUB } from "@/lib/constants";

export default async function AboutPage() {
  const staff = await getStaff();

  return (
    <div style={{ background: "linear-gradient(180deg, #070d1c 0%, #0a0e1a 40%, #0d0812 100%)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #C41E3A 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-8 z-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ color: "rgba(196,30,58,0.8)" }}>
            Police Sawankhalok FC
          </p>
          <h1 className="font-extrabold text-white leading-none mb-3"
            style={{ fontSize: "clamp(36px, 9vw, 72px)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
            เกี่ยวกับสโมสร
          </h1>
          <div className="w-16 h-1 rounded-full" style={{ background: "#C41E3A" }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16 space-y-8">

        {/* ── Club History ── */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex flex-col md:flex-row gap-8 items-start p-6 md:p-8">
            {/* Logo */}
            <div className="relative flex-shrink-0 mx-auto md:mx-0">
              <div className="absolute inset-0 blur-2xl opacity-30 scale-110"
                style={{ background: "radial-gradient(circle, #C41E3A, transparent 70%)" }} />
              <Image src={CLUB.logo} alt={CLUB.nameEn} width={140} height={140} className="relative float-y" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 rounded-full" style={{ background: "#C41E3A" }} />
                <h2 className="text-xl font-bold text-white">ประวัติสโมสร</h2>
              </div>
              <div className="space-y-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                <p>
                  <strong className="text-white">Police Sawankhalok FC</strong>{" "}
                  เป็นสโมสรฟุตบอลระดับท้องถิ่นที่สังกัดสถานีตำรวจภูธรสวรรคโลก
                  อำเภอสวรรคโลก จังหวัดสุโขทัย ก่อตั้งขึ้นเพื่อส่งเสริมกีฬาฟุตบอลในท้องถิ่น
                  และสร้างความสัมพันธ์ที่ดีระหว่างเจ้าหน้าที่ตำรวจกับชุมชน
                </p>
                <p>
                  สโมสรใช้ชื่อย่อว่า{" "}
                  <strong style={{ color: "#C41E3A", textShadow: "0 0 10px rgba(196,30,58,0.5)" }}>SWP</strong>{" "}
                  และใช้สีแดง-น้ำเงินเป็นสีประจำสโมสร โดยมีตราสัญลักษณ์เป็นรูปโล่
                  ซึ่งสื่อถึงการปกป้องและความแข็งแกร่ง
                </p>
                <p>
                  ปัจจุบันสโมสรแข่งขันในลีกระดับอำเภอสวรรคโลก
                  โดยมีสนามเหย้าที่สนามกีฬาอำเภอสวรรคโลก
                </p>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                {[
                  { label: "ก่อตั้ง", value: "2567" },
                  { label: "เมือง", value: "สวรรคโลก" },
                  { label: "จังหวัด", value: "สุโขทัย" },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl p-3 text-center"
                    style={{ background: "rgba(196,30,58,0.08)", border: "1px solid rgba(196,30,58,0.2)" }}>
                    <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{f.label}</p>
                    <p className="font-bold text-white">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Staff ── */}
        {staff.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ background: "#C41E3A" }} />
              <h2 className="text-xl font-bold text-white">ทีมงานบริหารและสตาฟฟ์โค้ช</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {staff.map((member) => (
                <div key={member.id} className="rounded-2xl p-4 text-center card-shine staff-card"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                  }}>
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden"
                    style={{ background: "rgba(196,30,58,0.1)", border: "2px solid rgba(196,30,58,0.2)" }}>
                    {member.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={member.photoUrl} alt={member.nameTh} className="w-full h-full object-cover object-top"
                        onError={e => { e.currentTarget.style.display = "none"; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 opacity-20" fill="white" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white">{member.nameTh}</h3>
                  <p className="text-xs mt-1 font-medium" style={{ color: "#C41E3A" }}>{member.roleTh}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Venue ── */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ background: "#C41E3A" }} />
              <h2 className="text-xl font-bold text-white">สนามเหย้า</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                <p className="font-bold text-white text-lg">สนามกีฬาอำเภอสวรรคโลก</p>
                <p>อำเภอสวรรคโลก จังหวัดสุโขทัย 64110</p>
                <p>สนามหญ้าธรรมชาติ ขนาดมาตรฐาน</p>
              </div>
              <div className="h-48 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <svg className="w-10 h-10 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">แผนที่ Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
