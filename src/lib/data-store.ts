import fs from "fs";
import path from "path";
import type { Player, Match, NewsArticle, PlayerSeasonStats } from "@/types";
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

// ===== PLAYER STATS =====
export function getPlayerStats(): PlayerSeasonStats[] {
  return readFile<PlayerSeasonStats[]>("player_stats.json", defaultPlayerStats);
}
export function savePlayerStats(data: PlayerSeasonStats[]) {
  writeFile("player_stats.json", data);
}

// ===== STANDINGS =====
export function getStandings() {
  return readFile('standings.json', defaultStandings);
}
export function saveStandings(data: typeof defaultStandings) {
  writeFile('standings.json', data);
}

// ===== STAFF =====
export function getStaff() {
  return readFile('staff.json', defaultStaff);
}
export function saveStaff(data: typeof defaultStaff) {
  writeFile('staff.json', data);
}

// ===== SPONSORS =====
export function getSponsors() {
  return readFile('sponsors.json', defaultSponsors);
}
export function saveSponsors(data: typeof defaultSponsors) {
  writeFile('sponsors.json', data);
}

// Legacy export
export { defaultStandings as standings };

// ===== HELPERS =====
export function nextId(items: { id: number }[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}
