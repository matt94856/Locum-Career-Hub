import {
  buildResultShareLandingUrl,
  composeShareCopy,
  formatUsdRange,
} from "@/lib/share";
import { IC_PAY_SPECIALTY, type IcPayEstimate } from "./model";

export function icPayRangeLabel(estimate: IcPayEstimate) {
  return formatUsdRange(estimate.dailyLow, estimate.dailyHigh);
}

export function icPaySharePayload(estimate: IcPayEstimate) {
  const range = icPayRangeLabel(estimate);
  const stat = `${range}/day`;
  const text = [
    `I ran the ${IC_PAY_SPECIALTY} locums pay arcade.`,
    "",
    `Pay expectation: ${range} a day`,
    estimate.rankLabel,
    "",
    "Directional range — not a quote.",
  ].join("\n");
  const url = buildResultShareLandingUrl({
    kind: "tool",
    title: IC_PAY_SPECIALTY,
    stat,
    subtitle: estimate.rankLabel,
    path: "/interventional-cardiology-locums-pay",
  });

  return {
    title: `${IC_PAY_SPECIALTY} locums pay`,
    stat,
    text,
    url,
    post: composeShareCopy(text, url),
  };
}
