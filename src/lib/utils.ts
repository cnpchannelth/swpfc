import { THAI_MONTHS, THAI_MONTHS_SHORT } from "./constants";

/**
 * แปลงปี ค.ศ. เป็น พ.ศ.
 */
export function toBuddhistYear(date: Date): number {
  return date.getFullYear() + 543;
}

/**
 * จัดรูปแบบวันที่เป็นภาษาไทย เช่น "15 มีนาคม 2569"
 */
export function formatThaiDate(date: Date): string {
  const day = date.getDate();
  const month = THAI_MONTHS[date.getMonth()];
  const year = toBuddhistYear(date);
  return `${day} ${month} ${year}`;
}

/**
 * จัดรูปแบบวันที่แบบย่อ เช่น "15 มี.ค. 69"
 */
export function formatThaiDateShort(date: Date): string {
  const day = date.getDate();
  const month = THAI_MONTHS_SHORT[date.getMonth()];
  const year = toBuddhistYear(date).toString().slice(-2);
  return `${day} ${month} ${year}`;
}

/**
 * จัดรูปแบบเวลา เช่น "18:30 น."
 */
export function formatThaiTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} น.`;
}

/**
 * รวม class names (กรอง falsy values ออก)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
