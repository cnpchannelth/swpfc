import { CLUB } from "@/lib/constants";

export default function LatestNews() {
  const fbPageUrl = encodeURIComponent(CLUB.facebook);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded" />
          ข่าวล่าสุด
        </h2>
        <a
          href={CLUB.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#1877F2] hover:text-blue-700 transition-colors flex items-center gap-1.5 font-medium"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          ดูทั้งหมดบน Facebook
        </a>
      </div>

      {/* Facebook Page Plugin */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* Facebook embed */}
          <div className="flex-1 min-h-[500px] flex items-center justify-center p-2">
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=${fbPageUrl}&tabs=timeline&width=500&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
              width="100%"
              height="500"
              style={{ border: "none", overflow: "hidden", maxWidth: "500px", width: "100%" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Facebook Page Feed"
            />
          </div>

          {/* CTA side panel */}
          <div className="lg:w-72 p-6 bg-surface-light border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center items-center text-center gap-4">
            <div className="w-16 h-16 bg-[#1877F2] rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-text text-lg leading-tight">{CLUB.name}</p>
              <p className="text-text-muted text-sm mt-1">ติดตามข่าวสารล่าสุด ผลการแข่งขัน และกิจกรรมของสโมสรได้ที่ Facebook Page</p>
            </div>
            <a
              href={CLUB.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-5 bg-[#1877F2] hover:bg-[#1565D8] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              กดถูกใจ & ติดตาม
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
