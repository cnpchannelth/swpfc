"use server";

import { revalidatePath } from "next/cache";
import { getNews, saveNews, nextId } from "@/lib/data-store";
import type { NewsArticle } from "@/types";

function buildSlug(title: string, id: number): string {
  // Simple slug: id + sanitized title
  const sanitized = title
    .replace(/[^a-zA-Z0-9ก-๛\s]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return `${sanitized}-${id}`;
}

export async function addNewsAction(formData: FormData) {
  const articles = getNews();
  const id = nextId(articles);
  const title = (formData.get("title") as string) ?? "";
  const isPublished = formData.get("isPublished") === "true";

  const newArticle: NewsArticle = {
    id,
    title,
    slug: buildSlug(title, id),
    excerpt: (formData.get("excerpt") as string) || undefined,
    content: (formData.get("content") as string) ?? "",
    coverImage: (formData.get("coverImage") as string) || undefined,
    category: (formData.get("category") as string) || "general",
    isPublished,
    publishedAt: isPublished ? new Date().toISOString() : undefined,
    createdAt: new Date().toISOString(),
  };
  saveNews([...articles, newArticle]);
  revalidatePath("/news");
  revalidatePath("/admin/news");
}

export async function updateNewsAction(id: number, formData: FormData) {
  const articles = getNews();
  const isPublished = formData.get("isPublished") === "true";
  const existing = articles.find((a) => a.id === id);
  const title = (formData.get("title") as string) || existing?.title || "";

  const updated = articles.map((a) =>
    a.id === id
      ? {
          ...a,
          title,
          slug: buildSlug(title, id),
          excerpt: (formData.get("excerpt") as string) || undefined,
          content: (formData.get("content") as string) || a.content,
          coverImage: (formData.get("coverImage") as string) || undefined,
          category: (formData.get("category") as string) || a.category,
          isPublished,
          publishedAt:
            isPublished && !a.publishedAt
              ? new Date().toISOString()
              : a.publishedAt,
        }
      : a
  );
  saveNews(updated);
  revalidatePath("/news");
  revalidatePath("/admin/news");
}

export async function deleteNewsAction(id: number) {
  const articles = getNews().filter((a) => a.id !== id);
  saveNews(articles);
  revalidatePath("/news");
  revalidatePath("/admin/news");
}

export async function togglePublishAction(id: number) {
  const articles = getNews();
  const updated = articles.map((a) =>
    a.id === id
      ? {
          ...a,
          isPublished: !a.isPublished,
          publishedAt: !a.isPublished ? new Date().toISOString() : a.publishedAt,
        }
      : a
  );
  saveNews(updated);
  revalidatePath("/news");
  revalidatePath("/admin/news");
}
