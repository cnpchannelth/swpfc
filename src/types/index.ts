import type { Position } from "@/lib/constants";

export interface Player {
  id: number;
  jerseyNumber: number;
  nameTh: string;
  nameEn?: string;
  nickname?: string;
  position: Position;
  dateOfBirth?: string;
  heightCm?: number;
  weightKg?: number;
  nationality: string;
  preferredFoot?: string;
  hometown?: string;
  photoUrl?: string;
  isActive: boolean;
}

export interface Team {
  id: number;
  nameTh: string;
  nameEn?: string;
  logoUrl?: string;
  isOwn: boolean;
}

export interface Match {
  id: number;
  competitionId: number;
  matchDate: string;
  venue?: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: "scheduled" | "live" | "completed" | "postponed";
  matchday?: number;
}

export interface MatchEvent {
  id: number;
  matchId: number;
  player: Player;
  eventType: string;
  minute: number;
  extraTime: number;
  notes?: string;
}

export interface PlayerSeasonStats {
  id: number;
  player: Player;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheets: number;
  minutesPlayed: number;
}

export interface LeagueStanding {
  id: number;
  team: Team;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

export interface Staff {
  id: number;
  nameTh: string;
  roleTh: string;
  photoUrl?: string;
  bio?: string;
}

export interface Sponsor {
  id: number;
  name: string;
  logoUrl?: string;
  website?: string;
  tier: "main" | "gold" | "standard";
}
