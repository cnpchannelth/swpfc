import { getNews } from "@/lib/data-store";
import NewsClient from "./NewsClient";

export const runtime = "edge";

export default async function AdminNewsPage() {
  const articles = await getNews();
  return <NewsClient initialArticles={articles} />;
}
