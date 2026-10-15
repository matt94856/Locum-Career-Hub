import { describe, expect, it } from "vitest";
import { CARDIOLOGY_WORDLE_ALLOWED, CARDIOLOGY_WORDLE_ANSWERS } from "./words";

describe("cardiology wordle bank", () => {
  it("keeps unique 4–6 letter answers and a 5-letter majority", () => {
    const words = CARDIOLOGY_WORDLE_ANSWERS.map((item) => item.word);
    expect(new Set(words).size).toBe(words.length);
    expect(words.length).toBeGreaterThanOrEqual(90);
    expect(words.every((word) => word.length >= 4 && word.length <= 6)).toBe(true);
    expect(words.every((word) => /^[A-Z]+$/.test(word))).toBe(true);
    const fives = words.filter((word) => word.length === 5).length;
    expect(fives).toBeGreaterThan(words.length / 2);
  });

  it("allows HEART and BLOOD as misses", () => {
    expect(CARDIOLOGY_WORDLE_ALLOWED.has("HEART")).toBe(true);
    expect(CARDIOLOGY_WORDLE_ALLOWED.has("BLOOD")).toBe(true);
  });
});
