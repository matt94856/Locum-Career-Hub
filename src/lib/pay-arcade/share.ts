import { buildResultShareLandingUrl, composeShareCopy, formatUsdRange } from "@/lib/share";
import type { PayArcadeEstimate } from "./types";

export function payArcadeRangeLabel(estimate: Pick<PayArcadeEstimate, "dailyLow" | "dailyHigh">) {
  return formatUsdRange(estimate.dailyLow, estimate.dailyHigh);
}

export function payArcadeSharePayload(input: {
  specialty: string;
  path: string;
  estimate: Pick<PayArcadeEstimate, "dailyLow" | "dailyHigh" | "rankLabel">;
}) {
  const range = payArcadeRangeLabel(input.estimate);
  const stat = `${range}/day`;
  const text = [
    `I ran the ${input.specialty} locums pay arcade.`,
    "",
    `Pay expectation: ${range} a day`,
    input.estimate.rankLabel,
    "",
    "Directional range — not a quote.",
  ].join("\n");
  const url = buildResultShareLandingUrl({
    kind: "tool",
    title: input.specialty,
    stat,
    subtitle: input.estimate.rankLabel,
    path: input.path,
  });

  return {
    title: `${input.specialty} locums pay`,
    stat,
    text,
    url,
    post: composeShareCopy(text, url),
  };
}
