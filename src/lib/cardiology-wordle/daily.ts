import { CARDIOLOGY_WORDLE_ANSWERS, type WordleAnswer } from "./words";

export const CARDIOLOGY_WORDLE_EPOCH = "2026-10-15";
export const CARDIOLOGY_WORDLE_TZ = "America/New_York";
export const CARDIOLOGY_WORDLE_PATH = "/cardiology-wordle";
export const CARDIOLOGY_WORDLE_TOOL_ID = "cardiology-wordle";
export const CARDIOLOGY_WORDLE_MAX_GUESSES = 6;

export type DailyPuzzle = WordleAnswer & {
  dateKey: string;
  puzzleNumber: number;
  length: number;
};

/** YYYY-MM-DD in America/New_York. */
export function easternDateKey(now: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CARDIOLOGY_WORDLE_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Date.UTC(year, (month ?? 1) - 1, day ?? 1);
}

export function puzzleNumberForDate(dateKey: string) {
  const start = parseDateKey(CARDIOLOGY_WORDLE_EPOCH);
  const current = parseDateKey(dateKey);
  return Math.floor((current - start) / 86_400_000) + 1;
}

function shuffleIndex(dateKey: string, length: number) {
  const number = puzzleNumberForDate(dateKey);
  // Step through the bank so consecutive days do not collide.
  return ((number - 1) % length + length) % length;
}

export function getDailyPuzzle(now: Date = new Date()): DailyPuzzle {
  const dateKey = easternDateKey(now);
  const index = shuffleIndex(dateKey, CARDIOLOGY_WORDLE_ANSWERS.length);
  const answer = CARDIOLOGY_WORDLE_ANSWERS[index];
  if (!answer) throw new Error("Cardiology Wordle bank is empty");
  return {
    ...answer,
    dateKey,
    puzzleNumber: puzzleNumberForDate(dateKey),
    length: answer.word.length,
  };
}
