export type TileColor = "green" | "yellow" | "gray";

export function normalizeGuess(guess: string) {
  return guess.toUpperCase().replace(/[^A-Z]/g, "");
}

/** Wordle duplicate-letter scoring. */
export function scoreGuess(guess: string, answer: string): TileColor[] {
  const attempt = normalizeGuess(guess);
  const target = normalizeGuess(answer);
  if (attempt.length !== target.length) {
    throw new Error("Guess length must match the answer");
  }

  const colors: TileColor[] = Array.from({ length: target.length }, () => "gray");
  const remaining: Record<string, number> = {};

  for (let i = 0; i < target.length; i += 1) {
    const letter = target[i] ?? "";
    if (attempt[i] === letter) {
      colors[i] = "green";
    } else {
      remaining[letter] = (remaining[letter] ?? 0) + 1;
    }
  }

  for (let i = 0; i < attempt.length; i += 1) {
    if (colors[i] === "green") continue;
    const letter = attempt[i] ?? "";
    if ((remaining[letter] ?? 0) > 0) {
      colors[i] = "yellow";
      remaining[letter] = (remaining[letter] ?? 0) - 1;
    }
  }

  return colors;
}

export function isWin(colors: TileColor[]) {
  return colors.length > 0 && colors.every((color) => color === "green");
}

export function emojiGrid(rows: TileColor[][]) {
  const map: Record<TileColor, string> = {
    green: "🟩",
    yellow: "🟨",
    gray: "⬜",
  };
  return rows.map((row) => row.map((color) => map[color]).join("")).join("\n");
}

export const HEARTLE_SHARE_CHALLENGE = "I did the Heartle today. Can you beat this score?";

export function shareResult(input: {
  puzzleNumber: number;
  guesses: number;
  maxGuesses: number;
  won: boolean;
  rows: TileColor[][];
  url: string;
}) {
  const score = input.won ? String(input.guesses) : "X";
  const number = new Intl.NumberFormat("en-US").format(input.puzzleNumber);
  const header = `Heartle ${number} ${score}/${input.maxGuesses}`;
  return `${header}\n\n${emojiGrid(input.rows)}\n\n${HEARTLE_SHARE_CHALLENGE}\n${input.url}`;
}

export function bestLetterColors(rows: { guess: string; colors: TileColor[] }[]) {
  const rank: Record<TileColor, number> = { gray: 1, yellow: 2, green: 3 };
  const best: Record<string, TileColor> = {};
  for (const row of rows) {
    row.guess.split("").forEach((letter, index) => {
      const color = row.colors[index];
      if (!color) return;
      const current = best[letter];
      if (!current || rank[color] > rank[current]) best[letter] = color;
    });
  }
  return best;
}
