import { describe, expect, it } from "vitest";
import { EMPTY_HEARTLE_STATS, applyHeartleResult, heartleHeadline, heartleWinTitle, shiftDateKey } from "./stats";

describe("heartle stats", () => {
  it("uses Wordle-style win titles and headlines", () => {
    expect(heartleWinTitle(1)).toBe("Genius");
    expect(heartleWinTitle(3)).toBe("Impressive");
    expect(heartleWinTitle(6)).toBe("Phew");
    expect(heartleHeadline(true, 3)).toBe("You got Heartle in 3!");
    expect(heartleHeadline(false, 6)).toBe("The Heartle got you today");
  });

  it("records a first win and consecutive streak, without double-counting the same day", () => {
    const first = applyHeartleResult(EMPTY_HEARTLE_STATS, { dateKey: "2026-10-16", won: true, guesses: 3 });
    expect(first).toMatchObject({ played: 1, wins: 1, currentStreak: 1, maxStreak: 1, lastDateKey: "2026-10-16" });
    expect(first.distribution[2]).toBe(1);

    const sameDay = applyHeartleResult(first, { dateKey: "2026-10-16", won: true, guesses: 2 });
    expect(sameDay).toEqual(first);

    const nextDay = applyHeartleResult(first, { dateKey: shiftDateKey("2026-10-16", 1), won: true, guesses: 4 });
    expect(nextDay.currentStreak).toBe(2);
    expect(nextDay.maxStreak).toBe(2);
    expect(nextDay.distribution[3]).toBe(1);

    const skipped = applyHeartleResult(first, { dateKey: "2026-10-18", won: true, guesses: 2 });
    expect(skipped.currentStreak).toBe(1);

    const loss = applyHeartleResult(nextDay, { dateKey: "2026-10-18", won: false, guesses: 6 });
    expect(loss.currentStreak).toBe(0);
    expect(loss.wins).toBe(2);
    expect(loss.played).toBe(3);
  });
});
