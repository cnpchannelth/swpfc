import { CLUB } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-white mb-2">ติดต่อเรา</h1>
      <p className="text-text-muted mb-8">ช่องทางการติดต่อสโมสรตำรวจสวรรคโลก เอฟซี</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded" />
            ข้อมูลติดต่อ
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-white">ที่อยู่</p>
                <p className="text-sm text-text-muted mt-1">
                  สนามกีฬาอำเภอสวรรคโลก<br />
                  อ.สวรรคโลก จ.สุโขทัย 64110
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-white">โทรศัพท์</p>
                <p className="text-sm text-text-muted mt-1">055-XXX-XXX</p>
              </div>
            </div>

            <div className="flex gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-white">อีเมล</p>
                <p className="text-sm text-text-muted mt-1">police.swp.fc@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-bold text-white mb-3">โซเชียลมีเดีย</h3>
            <div className="flex gap-3">
              <a
                href={CLUB.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#00B900] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755z" />
                </svg>
                LINE
              </a>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="h-full min-h-80 bg-surface-light flex items-center justify-center">
            <div className="text-center text-text-muted">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm">แผนที่ Google Maps</p>
              <p className="text-xs mt-1">สนามกีฬาอำเภอสวรรคโลก</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
