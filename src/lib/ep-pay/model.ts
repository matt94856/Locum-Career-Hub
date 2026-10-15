import { bandFromShifts } from "@/lib/pay-arcade/math";
import { PAY_ARCADE_RANK_LABEL, type PayArcadeEstimate, type PayArcadeRank } from "@/lib/pay-arcade/types";

export const EP_PAY_TOOL_ID = "ep_locums_pay_range";
export const EP_PAY_EFFECTIVE_DATE = "2026-10-15";
export const EP_PAY_SPECIALTY = "Electrophysiology";
export const EP_MARKET_DAILY_LOW = 2800;
export const EP_MARKET_DAILY_HIGH = 3200;

export type EpExperience = "fellowship" | "early" | "mid" | "senior";
export type EpWork = "devices" | "ablation" | "complex";
export type EpSkill = "core" | "laa" | "extraction";
export type EpCall = "weekday" | "nights" | "weekends";
export type EpAccess = "one_state" | "multi_state" | "imlc";

export type EpPayAnswers = {
  experience: EpExperience;
  work: EpWork;
  skill: EpSkill;
  call: EpCall;
  access: EpAccess;
};

const EXPERIENCE = {
  fellowship: { low: -300, high: -200, why: "Still finishing training, so hospitals usually start below the typical attending EP band." },
  early: { low: -100, high: 0, why: "Early independence is common, but ablation and device logs still set the floor." },
  mid: { low: 0, high: 100, why: "A few years of independent EP is the profile most locum days are built around." },
  senior: { low: 0, high: 200, why: "Longer independent practice helps if ablation and device logs are current." },
} as const;

const WORK = {
  devices: { low: -200, high: -100, why: "Devices and clinic coverage is real work, but it usually sits under a full ablation block." },
  ablation: { low: 0, high: 100, why: "Independent AF or SVT ablation is the skill hospitals pay the typical EP locum range for." },
  complex: { low: 200, high: 400, why: "Complex ablation or VT work is harder to staff and usually prices above the midpoint." },
} as const;

const SKILL = {
  core: { low: 0, high: 0, why: "Core devices are enough for many coverage blocks." },
  laa: { low: 100, high: 200, why: "Watchman or LAA work opens programs that need more than a device clinic." },
  extraction: { low: 200, high: 400, why: "Lead extraction is a smaller pool and can lift the top of the range." },
} as const;

const CALL = {
  weekday: { low: -100, high: 0, why: "Weekday lab-only days skip most of the night-call premium." },
  nights: { low: 0, high: 100, why: "Some nights add callback after the hours already included in the daily number." },
  weekends: { low: 100, high: 200, why: "Full 24-hour arrhythmia weekends are the assignments that pay for activation risk." },
} as const;

const ACCESS = {
  one_state: { low: 0, high: 0, why: "One license is enough for a local block, but it narrows what we can present quickly." },
  multi_state: { low: 0, high: 100, why: "Two or more licenses make it easier to match urgent EP coverage." },
  imlc: { low: 100, high: 200, why: "IMLC eligibility often shortens the path into compact states that need EP coverage." },
} as const;

export function estimateEpDailyRange(answers: EpPayAnswers): PayArcadeEstimate {
  const parts = [
    EXPERIENCE[answers.experience],
    WORK[answers.work],
    SKILL[answers.skill],
    CALL[answers.call],
    ACCESS[answers.access],
  ];
  const { dailyLow, dailyHigh } = bandFromShifts(EP_MARKET_DAILY_LOW, EP_MARKET_DAILY_HIGH, parts, 2300, 4200);
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const range = `${money.format(dailyLow)}–${money.format(dailyHigh)}`;

  const rank: PayArcadeRank =
    answers.work === "complex" || answers.skill === "extraction"
      ? "above"
      : answers.experience === "fellowship" || answers.work === "devices"
        ? "below"
        : "inside";

  const headline =
    rank === "above"
      ? `Your mix often sits above the usual $2,800–$3,200 starting range`
      : rank === "below"
        ? `Your mix often starts below the usual attending EP range`
        : `Your mix often lands inside or just around the usual starting range`;

  return {
    dailyLow,
    dailyHigh,
    rank,
    rankLabel: PAY_ARCADE_RANK_LABEL[rank],
    headline,
    summary: `${range} a day is a directional daily guarantee for an electrophysiologist with this mix. It is not a posted salary. Ablation scope, current logs, and the written call rules can land a real offer lower or higher.`,
    why: parts.map((part) => part.why).slice(0, 4),
  };
}
