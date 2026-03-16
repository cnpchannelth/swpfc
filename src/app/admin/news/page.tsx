import { getNews } from "@/lib/data-store";
import NewsClient from "./NewsClient";

export default function AdminNewsPage() {
  const articles = getNews();
  return <NewsClient initialArticles={articles} />;
}
