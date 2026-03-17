import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Player, Match, NewsArticle, PlayerSeasonStats, LeagueStanding, Staff, Sponsor } from "@/types";
import {
  players as defaultPlayers,
  matches as defaultMatches,
  news as defaultNews,
  playerStats as defaultPlayerStats,
  standings as defaultStandings,
  staff as defaultStaff,
  sponsors as defaultSponsors,
} from "./sample-data";

// ---- D1 helpers ----

async function readStore<T>(key: string, fallback: T): Promise<T> {
  try {
    const { env } = getRequestContext();
    const db = (env as unknown as { DB: D1Database }).DB;
    const row = await db
      .prepare("SELECT value FROM store WHERE key = ?")
      .bind(key)
      .first<{ value: string }>();
    if (!row) return fallback;
    const parsed = JSON.parse(row.value) as T;
    if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(fallback) && (fallback as unknown[]).length > 0) {
      return fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

async function writeStore(key: string, data: unknown): Promise<void> {
  const { env } = getRequestContext();
  const db = (env as unknown as { DB: D1Database }).DB;
  await db
    .prepare("INSERT INTO store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .bind(key, JSON.stringify(data))
    .run();
}

// ===== PLAYERS =====
export async function getPlayers(): Promise<Player[]> {
  return readStore<Player[]>("players", defaultPlayers);
}
export async function savePlayers(data: Player[]): Promise<void> {
  return writeStore("players", data);
}

// ===== MATCHES =====
export async function getMatches(): Promise<Match[]> {
  return readStore<Match[]>("matches", defaultMatches);
}
export async function saveMatches(data: Match[]): Promise<void> {
  return writeStore("matches", data);
}

// ===== NEWS =====
export async function getNews(): Promise<NewsArticle[]> {
  return readStore<NewsArticle[]>("news", defaultNews);
}
export async function saveNews(data: NewsArticle[]): Promise<void> {
  return writeStore("news", data);
}

// ===== PLAYER STATS =====
export async function getPlayerStats(): Promise<PlayerSeasonStats[]> {
  return readStore<PlayerSeasonStats[]>("player_stats", defaultPlayerStats);
}
export async function savePlayerStats(data: PlayerSeasonStats[]): Promise<void> {
  return writeStore("player_stats", data);
}

// ===== STANDINGS =====
export async function getStandings(): Promise<LeagueStanding[]> {
  return readStore<LeagueStanding[]>("standings", defaultStandings);
}
export async function saveStandings(data: LeagueStanding[]): Promise<void> {
  return writeStore("standings", data);
}

// ===== STAFF =====
export async function getStaff(): Promise<Staff[]> {
  return readStore<Staff[]>("staff", defaultStaff);
}
export async function saveStaff(data: Staff[]): Promise<void> {
  return writeStore("staff", data);
}

// ===== SPONSORS =====
export async function getSponsors(): Promise<Sponsor[]> {
  return readStore<Sponsor[]>("sponsors", defaultSponsors);
}
export async function saveSponsors(data: Sponsor[]): Promise<void> {
  return writeStore("sponsors", data);
}

// ===== HELPERS =====
export function nextId(items: { id: number }[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}
