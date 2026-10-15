import { describe, expect, it } from "vitest";
import { CARDIOLOGY_WORDLE_ANSWERS } from "./words";
import { easternDateKey, getDailyPuzzle, puzzleNumberForDate } from "./daily";

describe("daily cardiology wordle", () => {
  it("uses the same Eastern date and word for a given instant", () => {
    const now = new Date("2026-10-16T16:00:00.000Z");
    const first = getDailyPuzzle(now);
    const second = getDailyPuzzle(now);
    expect(first.dateKey).toBe(easternDateKey(now));
    expect(first.word).toBe(second.word);
    expect(first.puzzleNumber).toBe(puzzleNumberForDate(first.dateKey));
    expect(CARDIOLOGY_WORDLE_ANSWERS.some((item) => item.word === first.word)).toBe(true);
  });

  it("changes the puzzle after an Eastern midnight", () => {
    const evening = getDailyPuzzle(new Date("2026-10-16T03:30:00.000Z"));
    const nextMorning = getDailyPuzzle(new Date("2026-10-16T08:30:00.000Z"));
    expect(evening.dateKey).toBe("2026-10-15");
    expect(nextMorning.dateKey).toBe("2026-10-16");
    expect(nextMorning.puzzleNumber).toBe(evening.puzzleNumber + 1);
    expect(nextMorning.word).not.toBe(evening.word);
  });
});
