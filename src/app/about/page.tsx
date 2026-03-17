import Image from "next/image";
import { getStaff } from "@/lib/data-store";
import { CLUB } from "@/lib/constants";



export default async function AboutPage() {
  const staff = await getStaff();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-text mb-2">เกี่ยวกับสโมสร</h1>
      <p className="text-text-muted mb-8">ประวัติและข้อมูลสโมสร Police Sawankhalok FC</p>

      {/* Club History */}
      <section className="bg-surface border border-border rounded-xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Image
            src={CLUB.logo}
            alt={CLUB.nameEn}
            width={150}
            height={150}
            className="flex-shrink-0 mx-auto md:mx-0"
          />
          <div>
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded" />
              ประวัติสโมสร
            </h2>
            <div className="space-y-3 text-text-muted leading-relaxed">
              <p>
                <strong className="text-text">Police Sawankhalok FC</strong>{" "}
                เป็นสโมสรฟุตบอลระดับท้องถิ่นที่สังกัดสถานีตำรวจภูธรสวรรคโลก
                อำเภอสวรรคโลก จังหวัดสุโขทัย ก่อตั้งขึ้นเพื่อส่งเสริมกีฬาฟุตบอลในท้องถิ่น
                และสร้างความสัมพันธ์ที่ดีระหว่างเจ้าหน้าที่ตำรวจกับชุมชน
              </p>
              <p>
                สโมสรใช้ชื่อย่อว่า <strong className="text-primary">SWP</strong> และใช้สีแดง-น้ำเงิน
                เป็นสีประจำสโมสร โดยมีตราสัญลักษณ์เป็นรูปโล่ ซึ่งสื่อถึงการปกป้องและความแข็งแกร่ง
              </p>
              <p>
                ปัจจุบันสโมสรแข่งขันในลีกระดับอำเภอสวรรคโลก
                โดยมีสนามเหย้าที่สนามกีฬาอำเภอสวรรคโลก
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Staff */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded" />
          ทีมงานบริหารและสตาฟฟ์โค้ช
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className="bg-surface border border-border rounded-xl p-4 text-center"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 bg-surface-light rounded-full mx-auto mb-3 flex items-center justify-center">
                <svg className="w-10 h-10 text-text-muted/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-text">{member.nameTh}</h3>
              <p className="text-xs text-primary mt-1">{member.roleTh}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Venue */}
      <section className="bg-surface border border-border rounded-xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded" />
          สนามเหย้า
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3 text-text-muted">
            <p>
              <strong className="text-text">สนามกีฬาอำเภอสวรรคโลก</strong>
            </p>
            <p>อำเภอสวรรคโลก จังหวัดสุโขทัย 64110</p>
            <p>สนามหญ้าธรรมชาติ ขนาดมาตรฐาน</p>
          </div>
          <div className="h-48 bg-surface-light rounded-lg flex items-center justify-center text-text-muted text-sm">
            <p>แผนที่ Google Maps</p>
          </div>
        </div>
      </section>
    </div>
  );
}
