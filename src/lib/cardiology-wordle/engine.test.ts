import { describe, expect, it } from "vitest";
import { emojiGrid, isWin, scoreGuess, shareResult } from "./engine";

describe("wordle scoring", () => {
  it("marks greens and leftover yellows the Wordle way", () => {
    expect(scoreGuess("STENT", "STEMI")).toEqual(["green", "green", "green", "gray", "gray"]);
    expect(scoreGuess("MEATS", "STEMI")).toEqual(["yellow", "yellow", "gray", "yellow", "yellow"]);
    expect(scoreGuess("AORTA", "AORTA")).toEqual(["green", "green", "green", "green", "green"]);
  });

  it("does not double-count a letter", () => {
    expect(scoreGuess("LLAMA", "AORTA")).toEqual(["gray", "gray", "yellow", "gray", "green"]);
  });

  it("builds a Wordle-style share card", () => {
    const rows = [scoreGuess("HEART", "STEMI"), scoreGuess("STEMI", "STEMI")];
    expect(isWin(rows[1] ?? [])).toBe(true);
    expect(emojiGrid(rows)).toContain("🟩");
    expect(shareResult({
      puzzleNumber: 2,
      guesses: 2,
      maxGuesses: 6,
      won: true,
      rows,
      url: "https://www.locumcareerhub.com/cardiology-wordle",
    })).toMatch(/Cardiology Wordle #2 2\/6/);
  });
});
