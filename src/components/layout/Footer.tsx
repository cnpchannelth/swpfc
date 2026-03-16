import Link from "next/link";
import Image from "next/image";
import { CLUB, NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Club Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={CLUB.logo}
                alt={CLUB.nameEn}
                width={48}
                height={48}
                className="rounded"
              />
              <div>
                <h3 className="font-bold text-white">{CLUB.name}</h3>
                <p className="text-sm text-text-muted">{CLUB.nameEn}</p>
              </div>
            </div>
            <p className="text-sm text-text-muted">
              สโมสรฟุตบอลตำรวจสวรรคโลก สังกัดสถานีตำรวจภูธรสวรรคโลก
              จังหวัดสุโขทัย
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">ลิงก์ด่วน</h4>
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold text-white mb-4">ติดต่อเรา</h4>
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              <p>สนามกีฬาอำเภอสวรรคโลก</p>
              <p>อ.สวรรคโลก จ.สุโขทัย 64110</p>
              <div className="flex gap-4 mt-4">
                {/* Facebook */}
                <a
                  href={CLUB.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-light rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* LINE */}
                <a
                  href="#"
                  className="w-10 h-10 bg-surface-light rounded-lg flex items-center justify-center hover:bg-[#00B900] transition-colors"
                  aria-label="LINE"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-text-muted">
            &copy; 2569 {CLUB.name}. สงวนลิขสิทธิ์.
          </p>
        </div>
      </div>
    </footer>
  );
}
