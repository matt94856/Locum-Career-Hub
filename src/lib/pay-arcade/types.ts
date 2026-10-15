export type PayArcadeRank = "below" | "inside" | "above";

export const PAY_ARCADE_RANK_LABEL: Record<PayArcadeRank, string> = {
  below: "Below the usual band",
  inside: "Inside the usual band",
  above: "Above the usual band",
};

export type PayArcadeEstimate = {
  dailyLow: number;
  dailyHigh: number;
  rank: PayArcadeRank;
  rankLabel: string;
  headline: string;
  summary: string;
  why: string[];
};

export type PayArcadeChoice = { id: string; label: string; hint: string };

export type PayArcadeRound = {
  key: string;
  title: string;
  options: PayArcadeChoice[];
};
