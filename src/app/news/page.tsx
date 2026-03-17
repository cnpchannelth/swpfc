import Link from "next/link";
import { getNews } from "@/lib/data-store";
import { formatThaiDate } from "@/lib/utils";
import { NEWS_CATEGORIES } from "@/lib/constants";

export default function NewsPage() {
  const news = getNews();
  const publishedNews = news
    .filter((n) => n.isPublished)
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-text mb-2">ข่าวสาร</h1>
      <p className="text-text-muted mb-8">ข่าวสารและอัปเดตล่าสุดจากสโมสร</p>

      <div className="flex flex-col gap-4">
        {publishedNews.map((article, index) => (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <article
              className={cn(
                "bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors",
                index === 0 ? "md:flex" : "md:flex"
              )}
            >
              {/* Cover */}
              <div className={cn(
                "bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center flex-shrink-0",
                index === 0 ? "h-48 md:h-auto md:w-80" : "h-32 md:h-auto md:w-48"
              )}>
                <span className="text-4xl font-bold font-[family-name:var(--font-display)] text-white/20">
                  SWP
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-primary font-medium px-2 py-0.5 bg-primary/10 rounded">
                    {NEWS_CATEGORIES[article.category as keyof typeof NEWS_CATEGORIES]}
                  </span>
                  <span className="text-xs text-text-muted">
                    {formatThaiDate(new Date(article.publishedAt!))}
                  </span>
                </div>
                <h2 className={cn(
                  "font-bold text-text leading-snug",
                  index === 0 ? "text-xl" : "text-base"
                )}>
                  {article.title}
                </h2>
                <p className="text-sm text-text-muted mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="text-xs text-primary mt-3 inline-block">
                  อ่านต่อ &rarr;
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {publishedNews.length === 0 && (
        <p className="text-center text-text-muted py-12">ยังไม่มีข่าวสาร</p>
      )}
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
