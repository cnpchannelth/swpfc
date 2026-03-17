// ตำแหน่งนักเตะ
export const POSITIONS = {
  GK: "ผู้รักษาประตู",
  DF: "กองหลัง",
  MF: "กองกลาง",
  FW: "กองหน้า",
} as const;

export type Position = keyof typeof POSITIONS;

// ชื่อเดือนไทย
export const THAI_MONTHS = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
] as const;

export const THAI_MONTHS_SHORT = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
] as const;

// Navigation
export const NAV_ITEMS = [
  { label: "หน้าแรก", href: "/" },
  { label: "เกี่ยวกับสโมสร", href: "/about" },
  { label: "ทีม", href: "/squad" },
  { label: "ตารางแข่งขัน", href: "/fixtures" },
  { label: "สถิติ", href: "/stats" },
  { label: "ข่าวสาร", href: "/news" },
  { label: "ติดต่อ", href: "/contact" },
] as const;

// Club info
export const CLUB = {
  name: "Police Sawankhalok FC",
  nameEn: "Police Sawankhalok FC",
  shortName: "SWP",
  founded: "2567",
  logo: "/logo.png",
  facebook: "https://www.facebook.com/profile.php?id=100083301889343",
} as const;

// Event types
export const EVENT_TYPES = {
  goal: "ประตู",
  assist: "แอสซิสต์",
  yellow_card: "ใบเหลือง",
  red_card: "ใบแดง",
  substitution_in: "เปลี่ยนตัวเข้า",
  substitution_out: "เปลี่ยนตัวออก",
  own_goal: "เข้าประตูตัวเอง",
} as const;

// Match status
export const MATCH_STATUS = {
  scheduled: "กำหนดการ",
  live: "กำลังแข่ง",
  completed: "จบการแข่งขัน",
  postponed: "เลื่อนการแข่งขัน",
} as const;

// News categories
export const NEWS_CATEGORIES = {
  general: "ทั่วไป",
  match_report: "รายงานผลแข่งขัน",
  transfer: "การย้ายทีม",
  announcement: "ประกาศ",
} as const;
