import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface MarketDateInfo {
  saturday: Date;
  sunday: Date;
  year: number;
  month: number;
  monthName: string;
  isOngoing: boolean;
  isTodayMarket: boolean;
}

export interface CountdownInfo {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isOngoing: boolean;
  isTodayMarket: boolean;
}

const MONTH_NAMES = [
  "一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月",
];

function getLastWeekendOfMonth(year: number, month: number): { saturday: Date; sunday: Date } {
  const lastDay = new Date(year, month + 1, 0);
  const lastDayOfWeek = lastDay.getDay();

  let saturday: Date;
  let sunday: Date;

  if (lastDayOfWeek === 0) {
    sunday = new Date(lastDay);
    saturday = new Date(lastDay);
    saturday.setDate(lastDay.getDate() - 1);
  } else if (lastDayOfWeek === 6) {
    saturday = new Date(lastDay);
    sunday = new Date(lastDay);
    sunday.setDate(lastDay.getDate() + 1);
  } else {
    const daysToSaturday = lastDayOfWeek + 1;
    saturday = new Date(lastDay);
    saturday.setDate(lastDay.getDate() - daysToSaturday);
    sunday = new Date(saturday);
    sunday.setDate(saturday.getDate() + 1);
  }

  saturday.setHours(8, 0, 0, 0);
  sunday.setHours(8, 0, 0, 0);

  return { saturday, sunday };
}

export function getNextMarketDate(now: Date = new Date()): MarketDateInfo {
  let year = now.getFullYear();
  let month = now.getMonth();

  let { saturday, sunday } = getLastWeekendOfMonth(year, month);

  const marketEnd = new Date(sunday);
  marketEnd.setHours(18, 0, 0, 0);

  if (now > marketEnd) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    const next = getLastWeekendOfMonth(year, month);
    saturday = next.saturday;
    sunday = next.sunday;
  }

  const saturdayEnd = new Date(saturday);
  saturdayEnd.setHours(18, 0, 0, 0);
  const sundayEnd = new Date(sunday);
  sundayEnd.setHours(16, 0, 0, 0);

  const isOngoing =
    (now >= saturday && now <= saturdayEnd) ||
    (now >= sunday && now <= sundayEnd);

  const isTodayMarket =
    (now.toDateString() === saturday.toDateString()) ||
    (now.toDateString() === sunday.toDateString());

  return {
    saturday,
    sunday,
    year,
    month,
    monthName: MONTH_NAMES[month],
    isOngoing,
    isTodayMarket,
  };
}

export function getCountdown(marketInfo: MarketDateInfo, now: Date = new Date()): CountdownInfo {
  const { saturday, isOngoing, isTodayMarket } = marketInfo;

  if (isOngoing) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isOngoing: true,
      isTodayMarket,
    };
  }

  let target = new Date(saturday);
  target.setHours(8, 0, 0, 0);

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isOngoing: false,
      isTodayMarket,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: diff,
    isOngoing: false,
    isTodayMarket,
  };
}

export function formatDateRange(marketInfo: MarketDateInfo): string {
  const { saturday, sunday, monthName, year } = marketInfo;
  const satDay = saturday.getDate();
  const sunDay = sunday.getDate();
  return `${monthName} ${satDay}日 - ${sunDay}日 · ${year}年`;
}
