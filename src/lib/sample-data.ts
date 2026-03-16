import type {
  Player,
  Team,
  Match,
  MatchEvent,
  PlayerSeasonStats,
  LeagueStanding,
  NewsArticle,
  Staff,
  Sponsor,
} from "@/types";

// ===== TEAMS =====
export const ownTeam: Team = {
  id: 1,
  nameTh: "ตำรวจสวรรคโลก เอฟซี",
  nameEn: "Police Sawankhalok FC",
  logoUrl: "/logo.png",
  isOwn: true,
};

export const teams: Team[] = [
  ownTeam,
  { id: 2, nameTh: "ศรีสัชนาลัย ซิตี้", logoUrl: undefined, isOwn: false },
  { id: 3, nameTh: "สุโขทัย ยูไนเต็ด", logoUrl: undefined, isOwn: false },
  { id: 4, nameTh: "ทุ่งเสลี่ยม เอฟซี", logoUrl: undefined, isOwn: false },
  { id: 5, nameTh: "คีรีมาศ เอฟซี", logoUrl: undefined, isOwn: false },
  { id: 6, nameTh: "กงไกรลาศ เอฟซี", logoUrl: undefined, isOwn: false },
  { id: 7, nameTh: "บ้านด่านลานหอย", logoUrl: undefined, isOwn: false },
  { id: 8, nameTh: "เมืองสุโขทัย เอฟซี", logoUrl: undefined, isOwn: false },
];

// ===== PLAYERS =====
export const players: Player[] = [
  // ผู้รักษาประตู
  {
    id: 1, jerseyNumber: 1, nameTh: "สมชาย วิเศษสิงห์", position: "GK",
    dateOfBirth: "1995-03-15", heightCm: 185, weightKg: 80,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "สวรรคโลก",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 2, jerseyNumber: 30, nameTh: "ณัฐพงศ์ แก้วประเสริฐ", position: "GK",
    dateOfBirth: "1998-07-22", heightCm: 182, weightKg: 78,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "สุโขทัย",
    photoUrl: undefined, isActive: true,
  },
  // กองหลัง
  {
    id: 3, jerseyNumber: 2, nameTh: "วีระพล จันทร์เพ็ญ", position: "DF",
    dateOfBirth: "1996-11-08", heightCm: 178, weightKg: 73,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "สวรรคโลก",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 4, jerseyNumber: 4, nameTh: "ธนกฤต สุขสวัสดิ์", position: "DF",
    dateOfBirth: "1994-05-20", heightCm: 181, weightKg: 76,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "ศรีสัชนาลัย",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 5, jerseyNumber: 5, nameTh: "พิชิต ดำรงค์ศิลป์", position: "DF",
    dateOfBirth: "1997-01-14", heightCm: 180, weightKg: 75,
    nationality: "ไทย", preferredFoot: "ซ้าย", hometown: "สวรรคโลก",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 6, jerseyNumber: 3, nameTh: "อนุชา บุญมาก", position: "DF",
    dateOfBirth: "1999-09-03", heightCm: 176, weightKg: 71,
    nationality: "ไทย", preferredFoot: "ซ้าย", hometown: "สุโขทัย",
    photoUrl: undefined, isActive: true,
  },
  // กองกลาง
  {
    id: 7, jerseyNumber: 6, nameTh: "ภูวดล สิทธิชัย", position: "MF",
    dateOfBirth: "1996-04-18", heightCm: 173, weightKg: 68,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "สวรรคโลก",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 8, jerseyNumber: 8, nameTh: "กิตติพงษ์ เพชรดี", position: "MF",
    dateOfBirth: "1995-12-25", heightCm: 175, weightKg: 70,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "ทุ่งเสลี่ยม",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 9, jerseyNumber: 10, nameTh: "ศุภกิจ แสงทอง", nickname: "กิจ", position: "MF",
    dateOfBirth: "1997-06-30", heightCm: 170, weightKg: 65,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "สวรรคโลก",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 10, jerseyNumber: 14, nameTh: "รัตนพล ใจดี", position: "MF",
    dateOfBirth: "2000-02-11", heightCm: 172, weightKg: 67,
    nationality: "ไทย", preferredFoot: "ทั้งสอง", hometown: "คีรีมาศ",
    photoUrl: undefined, isActive: true,
  },
  // กองหน้า
  {
    id: 11, jerseyNumber: 9, nameTh: "ชนาธิป เจริญสุข", nickname: "ธิป", position: "FW",
    dateOfBirth: "1998-08-05", heightCm: 174, weightKg: 69,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "สวรรคโลก",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 12, jerseyNumber: 11, nameTh: "พงศกร ทองสุข", position: "FW",
    dateOfBirth: "1999-10-17", heightCm: 176, weightKg: 71,
    nationality: "ไทย", preferredFoot: "ซ้าย", hometown: "กงไกรลาศ",
    photoUrl: undefined, isActive: true,
  },
  {
    id: 13, jerseyNumber: 7, nameTh: "อัครพล วงศ์สุวรรณ", position: "FW",
    dateOfBirth: "1996-03-28", heightCm: 178, weightKg: 72,
    nationality: "ไทย", preferredFoot: "ขวา", hometown: "สวรรคโลก",
    photoUrl: undefined, isActive: true,
  },
];

// ===== MATCHES =====
export const matches: Match[] = [
  {
    id: 1, competitionId: 1, matchDate: "2025-12-01T15:30:00",
    venue: "สนามกีฬาอำเภอสวรรคโลก",
    homeTeam: ownTeam, awayTeam: teams[1],
    homeScore: 3, awayScore: 1, status: "completed", matchday: 1,
  },
  {
    id: 2, competitionId: 1, matchDate: "2025-12-08T15:30:00",
    venue: "สนามกีฬาอำเภอศรีสัชนาลัย",
    homeTeam: teams[2], awayTeam: ownTeam,
    homeScore: 1, awayScore: 2, status: "completed", matchday: 2,
  },
  {
    id: 3, competitionId: 1, matchDate: "2025-12-15T15:30:00",
    venue: "สนามกีฬาอำเภอสวรรคโลก",
    homeTeam: ownTeam, awayTeam: teams[3],
    homeScore: 2, awayScore: 0, status: "completed", matchday: 3,
  },
  {
    id: 4, competitionId: 1, matchDate: "2025-12-22T15:30:00",
    venue: "สนามกีฬาอำเภอคีรีมาศ",
    homeTeam: teams[4], awayTeam: ownTeam,
    homeScore: 0, awayScore: 0, status: "completed", matchday: 4,
  },
  {
    id: 5, competitionId: 1, matchDate: "2026-01-05T15:30:00",
    venue: "สนามกีฬาอำเภอสวรรคโลก",
    homeTeam: ownTeam, awayTeam: teams[5],
    homeScore: 4, awayScore: 2, status: "completed", matchday: 5,
  },
  {
    id: 6, competitionId: 1, matchDate: "2026-03-22T15:30:00",
    venue: "สนามกีฬาอำเภอสวรรคโลก",
    homeTeam: ownTeam, awayTeam: teams[6],
    homeScore: undefined, awayScore: undefined, status: "scheduled", matchday: 6,
  },
  {
    id: 7, competitionId: 1, matchDate: "2026-03-29T15:30:00",
    venue: "สนามกีฬาเมืองสุโขทัย",
    homeTeam: teams[7], awayTeam: ownTeam,
    homeScore: undefined, awayScore: undefined, status: "scheduled", matchday: 7,
  },
];

// ===== MATCH EVENTS =====
export const matchEvents: MatchEvent[] = [
  // Match 1: SWP 3-1 ศรีสัชนาลัย
  { id: 1, matchId: 1, player: players[10], eventType: "goal", minute: 23, extraTime: 0 },
  { id: 2, matchId: 1, player: players[8], eventType: "assist", minute: 23, extraTime: 0 },
  { id: 3, matchId: 1, player: players[11], eventType: "goal", minute: 55, extraTime: 0 },
  { id: 4, matchId: 1, player: players[12], eventType: "goal", minute: 78, extraTime: 0 },
  { id: 5, matchId: 1, player: players[7], eventType: "assist", minute: 78, extraTime: 0 },
  // Match 3: SWP 2-0 ทุ่งเสลี่ยม
  { id: 6, matchId: 3, player: players[10], eventType: "goal", minute: 34, extraTime: 0 },
  { id: 7, matchId: 3, player: players[8], eventType: "goal", minute: 67, extraTime: 0 },
  // Match 5: SWP 4-2 กงไกรลาศ
  { id: 8, matchId: 5, player: players[10], eventType: "goal", minute: 12, extraTime: 0 },
  { id: 9, matchId: 5, player: players[10], eventType: "goal", minute: 45, extraTime: 1 },
  { id: 10, matchId: 5, player: players[12], eventType: "goal", minute: 58, extraTime: 0 },
  { id: 11, matchId: 5, player: players[11], eventType: "goal", minute: 82, extraTime: 0 },
];

// ===== PLAYER SEASON STATS =====
export const playerStats: PlayerSeasonStats[] = [
  { id: 1, player: players[10], appearances: 5, goals: 5, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0, minutesPlayed: 450 },
  { id: 2, player: players[11], appearances: 5, goals: 2, assists: 2, yellowCards: 0, redCards: 0, cleanSheets: 0, minutesPlayed: 380 },
  { id: 3, player: players[12], appearances: 5, goals: 2, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0, minutesPlayed: 420 },
  { id: 4, player: players[8], appearances: 5, goals: 1, assists: 3, yellowCards: 0, redCards: 0, cleanSheets: 0, minutesPlayed: 450 },
  { id: 5, player: players[7], appearances: 5, goals: 0, assists: 2, yellowCards: 2, redCards: 0, cleanSheets: 0, minutesPlayed: 440 },
  { id: 6, player: players[0], appearances: 5, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 2, minutesPlayed: 450 },
  { id: 7, player: players[3], appearances: 5, goals: 1, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0, minutesPlayed: 450 },
  { id: 8, player: players[9], appearances: 4, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0, minutesPlayed: 310 },
];

// ===== LEAGUE STANDINGS =====
export const standings: LeagueStanding[] = [
  { id: 1, team: ownTeam, position: 1, played: 5, won: 3, drawn: 1, lost: 0, goalsFor: 11, goalsAgainst: 3, points: 10 },  // เรา!
  { id: 2, team: teams[7], position: 2, played: 5, won: 3, drawn: 0, lost: 2, goalsFor: 8, goalsAgainst: 6, points: 9 },
  { id: 3, team: teams[2], position: 3, played: 5, won: 2, drawn: 2, lost: 1, goalsFor: 7, goalsAgainst: 5, points: 8 },
  { id: 4, team: teams[4], position: 4, played: 5, won: 2, drawn: 1, lost: 2, goalsFor: 5, goalsAgainst: 4, points: 7 },
  { id: 5, team: teams[1], position: 5, played: 5, won: 2, drawn: 0, lost: 3, goalsFor: 6, goalsAgainst: 8, points: 6 },
  { id: 6, team: teams[5], position: 6, played: 5, won: 1, drawn: 2, lost: 2, goalsFor: 5, goalsAgainst: 7, points: 5 },
  { id: 7, team: teams[3], position: 7, played: 5, won: 1, drawn: 1, lost: 3, goalsFor: 4, goalsAgainst: 8, points: 4 },
  { id: 8, team: teams[6], position: 8, played: 5, won: 0, drawn: 1, lost: 4, goalsFor: 3, goalsAgainst: 10, points: 1 },
];

// ===== NEWS =====
export const news: NewsArticle[] = [
  {
    id: 1,
    title: "ตำรวจสวรรคโลก ถล่ม กงไกรลาศ 4-2 ขึ้นจ่าฝูง!",
    slug: "swp-vs-kongkrailas-4-2",
    excerpt: "ชนาธิป เจริญสุข ซัดดับเบิ้ล พาทีมคว้า 3 แต้มสำคัญ ขึ้นนำตารางคะแนน",
    content: `# ตำรวจสวรรคโลก 4-2 กงไกรลาศ เอฟซี

ตำรวจสวรรคโลก เอฟซี เปิดบ้านถล่ม กงไกรลาศ เอฟซี 4-2 ในศึกลีกอำเภอสวรรคโลก นัดที่ 5 ที่สนามกีฬาอำเภอสวรรคโลก

**ชนาธิป เจริญสุข** เบอร์ 9 ตัวเก่งของทีม ทำผลงานยอดเยี่ยมด้วยการยิง 2 ประตู ในนาทีที่ 12 และ 45+1 ก่อนที่ **อัครพล วงศ์สุวรรณ** จะมาเพิ่มเป็น 3-1 ในนาทีที่ 58 และ **พงศกร ทองสุข** ปิดท้ายด้วยประตูสวยๆ ในนาทีที่ 82

ชัยชนะครั้งนี้ทำให้ตำรวจสวรรคโลก ขึ้นนำตารางคะแนนด้วยผลงาน 10 คะแนนจาก 5 นัด`,
    coverImage: undefined,
    category: "match_report",
    isPublished: true,
    publishedAt: "2026-01-05T18:00:00",
    createdAt: "2026-01-05T18:00:00",
  },
  {
    id: 2,
    title: "SWP เปิดตัวชุดแข่งใหม่ประจำฤดูกาล 2569",
    slug: "new-kit-2569",
    excerpt: "สโมสรเปิดตัวชุดแข่งขันใหม่ ดีไซน์สุดเท่ เน้นสีแดง-น้ำเงิน อัตลักษณ์ของสโมสร",
    content: `# เปิดตัวชุดแข่งใหม่ประจำฤดูกาล 2569

ตำรวจสวรรคโลก เอฟซี เปิดตัวชุดแข่งขันใหม่ประจำฤดูกาล 2569 โดยชุดเหย้าเป็นสีแดงตัดน้ำเงิน ซึ่งเป็นสีประจำสโมสร และชุดเยือนเป็นสีขาวตัดน้ำเงิน

ชุดแข่งใหม่นี้ได้รับแรงบันดาลใจจากตราสัญลักษณ์โล่ของสโมสร และเพิ่มดีเทลลายทางเฉียงที่แขนเสื้อ`,
    coverImage: undefined,
    category: "announcement",
    isPublished: true,
    publishedAt: "2025-11-15T10:00:00",
    createdAt: "2025-11-15T10:00:00",
  },
  {
    id: 3,
    title: "เปิดรับสมัครนักเตะเพิ่มเติมสำหรับฤดูกาล 2569",
    slug: "player-recruitment-2569",
    excerpt: "สโมสรเปิดรับสมัครนักเตะที่มีความสามารถ เพื่อเสริมทัพในฤดูกาลนี้",
    content: `# เปิดรับสมัครนักเตะเพิ่มเติม

ตำรวจสวรรคโลก เอฟซี เปิดรับสมัครนักเตะที่มีความสามารถทุกตำแหน่ง เพื่อเสริมทัพสำหรับช่วงครึ่งหลังของฤดูกาล 2569

**คุณสมบัติ:**
- อายุ 18-35 ปี
- มีสุขภาพร่างกายแข็งแรง
- มีประสบการณ์การเล่นฟุตบอลในระดับอำเภอขึ้นไป

**สนใจติดต่อ:** สโมสรตำรวจสวรรคโลก เอฟซี หรือส่งข้อมูลผ่านเพจ Facebook ของสโมสร`,
    coverImage: undefined,
    category: "announcement",
    isPublished: true,
    publishedAt: "2026-01-10T09:00:00",
    createdAt: "2026-01-10T09:00:00",
  },
];

// ===== STAFF =====
export const staff: Staff[] = [
  { id: 1, nameTh: "พ.ต.อ. สมศักดิ์ รักษาดี", roleTh: "ประธานสโมสร", photoUrl: undefined },
  { id: 2, nameTh: "อาทิตย์ พลังดี", roleTh: "หัวหน้าผู้ฝึกสอน", photoUrl: undefined },
  { id: 3, nameTh: "วิชัย ศรีสวัสดิ์", roleTh: "ผู้ช่วยผู้ฝึกสอน", photoUrl: undefined },
  { id: 4, nameTh: "สุรชัย มั่นคง", roleTh: "ผู้ฝึกสอนผู้รักษาประตู", photoUrl: undefined },
  { id: 5, nameTh: "นภา ใจงาม", roleTh: "ผู้จัดการทีม", photoUrl: undefined },
];

// ===== SPONSORS =====
export const sponsors: Sponsor[] = [
  { id: 1, name: "สถานีตำรวจภูธรสวรรคโลก", logoUrl: undefined, tier: "main" },
  { id: 2, name: "ร้านอาหารครัวสวรรค์", logoUrl: undefined, tier: "gold" },
  { id: 3, name: "อู่ช่างเล็ก ออโต้", logoUrl: undefined, tier: "standard" },
];
