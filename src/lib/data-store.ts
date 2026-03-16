import fs from "fs";
import path from "path";
import type { Player, Match, NewsArticle } from "@/types";
import {
  players as defaultPlayers,
  matches as defaultMatches,
  news as defaultNews,
  playerStats as defaultPlayerStats,
  standings as defaultStandings,
  staff as defaultStaff,
  sponsors as defaultSponsors,
} from "./sample-data";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readFile<T>(filename: string, fallback: T): T {
  const fp = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(fp)) {
      return JSON.parse(fs.readFileSync(fp, "utf-8")) as T;
    }
  } catch {
    // ignore parse errors, return fallback
  }
  return fallback;
}

function writeFile(filename: string, data: unknown) {
  ensureDir();
  fs.writeFileSync(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

// ===== PLAYERS =====
export function getPlayers(): Player[] {
  return readFile<Player[]>("players.json", defaultPlayers);
}
export function savePlayers(data: Player[]) {
  writeFile("players.json", data);
}

// ===== MATCHES =====
export function getMatches(): Match[] {
  return readFile<Match[]>("matches.json", defaultMatches);
}
export function saveMatches(data: Match[]) {
  writeFile("matches.json", data);
}

// ===== NEWS =====
export function getNews(): NewsArticle[] {
  return readFile<NewsArticle[]>("news.json", defaultNews);
}
export function saveNews(data: NewsArticle[]) {
  writeFile("news.json", data);
}

// ===== READ-ONLY (sample data) =====
export { defaultPlayerStats as playerStats };
export { defaultStandings as standings };
export { defaultStaff as staff };
export { defaultSponsors as sponsors };

// ===== HELPERS =====
export function nextId(items: { id: number }[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}
