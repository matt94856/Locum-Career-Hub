import { CARDIOLOGY_WORDLE_MAX_GUESSES, CARDIOLOGY_WORDLE_TZ } from "./daily";

export const HEARTLE_STATS_KEY = "lch-cardiology-wordle-stats";

export const HEARTLE_WIN_TITLES = ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"] as const;

export type HeartleStats = {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  lastDateKey: string | null;
  distribution: number[];
};

export const EMPTY_HEARTLE_STATS: HeartleStats = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastDateKey: null,
  distribution: Array.from({ length: CARDIOLOGY_WORDLE_MAX_GUESSES }, () => 0),
};

export function heartleWinTitle(guesses: number) {
  return HEARTLE_WIN_TITLES[guesses - 1] ?? "Phew";
}

export function heartleHeadline(won: boolean, guesses: number) {
  if (!won) return "The Heartle got you today";
  return guesses === 1 ? "You got Heartle in 1!" : `You got Heartle in ${guesses}!`;
}

export function shiftDateKey(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const next = new Date(Date.UTC(year, (month ?? 1) - 1, (day ?? 1) + days));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-${String(next.getUTCDate()).padStart(2, "0")}`;
}

export function loadHeartleStats(): HeartleStats {
  try {
    const raw = window.localStorage.getItem(HEARTLE_STATS_KEY);
    if (!raw) return { ...EMPTY_HEARTLE_STATS, distribution: [...EMPTY_HEARTLE_STATS.distribution] };
    const data = JSON.parse(raw) as Partial<HeartleStats>;
    const distribution = Array.from({ length: CARDIOLOGY_WORDLE_MAX_GUESSES }, (_, index) => {
      const value = data.distribution?.[index];
      return typeof value === "number" && value >= 0 ? value : 0;
    });
    return {
      played: typeof data.played === "number" ? data.played : 0,
      wins: typeof data.wins === "number" ? data.wins : 0,
      currentStreak: typeof data.currentStreak === "number" ? data.currentStreak : 0,
      maxStreak: typeof data.maxStreak === "number" ? data.maxStreak : 0,
      lastDateKey: typeof data.lastDateKey === "string" ? data.lastDateKey : null,
      distribution,
    };
  } catch {
    return { ...EMPTY_HEARTLE_STATS, distribution: [...EMPTY_HEARTLE_STATS.distribution] };
  }
}

export function saveHeartleStats(stats: HeartleStats) {
  try {
    window.localStorage.setItem(HEARTLE_STATS_KEY, JSON.stringify(stats));
  } catch {
    // Private mode can block storage.
  }
}

export function applyHeartleResult(
  stats: HeartleStats,
  input: { dateKey: string; won: boolean; guesses: number },
): HeartleStats {
  if (stats.lastDateKey === input.dateKey) return stats;
  const continued = Boolean(input.won && stats.lastDateKey === shiftDateKey(input.dateKey, -1));
  const currentStreak = input.won ? (continued ? stats.currentStreak + 1 : 1) : 0;
  const distribution = [...stats.distribution];
  if (input.won) {
    const index = Math.min(Math.max(input.guesses, 1), CARDIOLOGY_WORDLE_MAX_GUESSES) - 1;
    distribution[index] = (distribution[index] ?? 0) + 1;
  }
  return {
    played: stats.played + 1,
    wins: stats.wins + (input.won ? 1 : 0),
    currentStreak,
    maxStreak: Math.max(stats.maxStreak, currentStreak),
    lastDateKey: input.dateKey,
    distribution,
  };
}

export function recordHeartleResult(input: { dateKey: string; won: boolean; guesses: number }) {
  const next = applyHeartleResult(loadHeartleStats(), input);
  saveHeartleStats(next);
  return next;
}

export function winPercent(stats: HeartleStats) {
  if (stats.played <= 0) return 0;
  return Math.round((stats.wins / stats.played) * 100);
}

export function msUntilNextEasternMidnight(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CARDIOLOGY_WORDLE_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const second = Number(parts.find((part) => part.type === "second")?.value ?? 0);
  const elapsed = ((hour * 60 + minute) * 60 + second) * 1000;
  const remain = 86_400_000 - elapsed;
  return remain <= 0 ? 86_400_000 : remain;
}

export function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}
