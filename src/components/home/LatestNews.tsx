import Link from "next/link";
import { getNews } from "@/lib/data-store";

const news = getNews();
import { formatThaiDateShort } from "@/lib/utils";
import { NEWS_CATEGORIES } from "@/lib/constants";

export default function LatestNews() {
  const latestNews = news
    .filter((n) => n.isPublished)
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded" />
          ข่าวล่าสุด
        </h2>
        <Link
          href="/news"
          className="text-sm text-primary hover:text-primary-light transition-colors"
        >
          ดูทั้งหมด &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {latestNews.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <article className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors h-full flex flex-col">
              {/* Cover Image Placeholder */}
              <div className="h-40 bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center">
                <span className="text-4xl font-bold font-[family-name:var(--font-display)] text-white/20">
                  SWP
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs text-primary font-medium mb-2">
                  {NEWS_CATEGORIES[article.category as keyof typeof NEWS_CATEGORIES] || article.category}
                </span>
                <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-text-muted mt-2 line-clamp-2 flex-1">
                  {article.excerpt}
                </p>
                <p className="text-xs text-text-muted mt-3">
                  {formatThaiDateShort(new Date(article.publishedAt!))}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
