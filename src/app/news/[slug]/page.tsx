import { notFound } from "next/navigation";
import Link from "next/link";
import { getNews } from "@/lib/data-store";
import { formatThaiDate } from "@/lib/utils";
import { NEWS_CATEGORIES } from "@/lib/constants";
import ShareButtons from "@/components/news/ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNews();
  const article = news.find((n) => n.slug === slug && n.isPublished);
  if (!article) return notFound();

  // Simple markdown-like rendering (convert ## headers and **bold**)
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={i} className="text-2xl font-extrabold text-white mt-6 mb-3">
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-xl font-bold text-white mt-5 mb-2">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-text ml-4 list-disc">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={i} />;
      }
      // Bold text
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-text leading-relaxed">
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="font-bold text-white">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back */}
      <Link
        href="/news"
        className="text-sm text-text-muted hover:text-primary transition-colors mb-6 inline-block"
      >
        &larr; กลับไปหน้าข่าว
      </Link>

      <article className="bg-surface border border-border rounded-xl overflow-hidden">
        {/* Cover */}
        <div className="h-48 md:h-64 bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center">
          <span className="text-6xl font-bold font-[family-name:var(--font-display)] text-white/20">
            SWP
          </span>
        </div>

        <div className="p-6 md:p-8">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded">
              {NEWS_CATEGORIES[article.category as keyof typeof NEWS_CATEGORIES]}
            </span>
            <span className="text-sm text-text-muted">
              {formatThaiDate(new Date(article.publishedAt!))}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6">
            {article.title}
          </h1>

          {/* Content */}
          <div className="prose-invert space-y-1">
            {renderContent(article.content)}
          </div>

          {/* Share */}
          <ShareButtons slug={slug} />
        </div>
      </article>
    </div>
  );
}
