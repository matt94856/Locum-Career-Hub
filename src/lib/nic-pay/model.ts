import { bandFromShifts } from "@/lib/pay-arcade/math";
import { PAY_ARCADE_RANK_LABEL, type PayArcadeEstimate, type PayArcadeRank } from "@/lib/pay-arcade/types";

export const NIC_PAY_TOOL_ID = "nic_locums_pay_range";
export const NIC_PAY_EFFECTIVE_DATE = "2026-10-15";
export const NIC_PAY_SPECIALTY = "Non-Invasive Cardiology";
export const NIC_MARKET_DAILY_LOW = 2200;
export const NIC_MARKET_DAILY_HIGH = 2800;

export type NicExperience = "fellowship" | "early" | "mid" | "senior";
export type NicTee = "none" | "reads" | "performs";
export type NicNukes = "none" | "supervise" | "interpret";
export type NicCall = "none" | "nights" | "weekends";
export type NicSetting = "outpatient" | "inpatient" | "both";

export type NicPayAnswers = {
  experience: NicExperience;
  tee: NicTee;
  nukes: NicNukes;
  call: NicCall;
  setting: NicSetting;
};

const EXPERIENCE = {
  fellowship: { low: -200, high: -100, why: "Still finishing training, so hospitals usually start below the typical attending non-invasive band." },
  early: { low: -100, high: 0, why: "Early independence is common, but TEE, nuclear, and call comfort still set the floor." },
  mid: { low: 0, high: 100, why: "A few years of independent consult and clinic work is the profile most locum days are built around." },
  senior: { low: 0, high: 100, why: "Longer independent practice helps if imaging and call skills are current." },
} as const;

const TEE = {
  none: { low: -100, high: 0, why: "No TEE is fine for many clinic blocks, but it narrows hospital coverage." },
  reads: { low: 0, high: 100, why: "Reading TEEs helps on inpatient days even if you are not the primary operator." },
  performs: { low: 200, high: 300, why: "Performing TEEs is one of the skills hospitals pay above the usual non-invasive midpoint for." },
} as const;

const NUKES = {
  none: { low: -100, high: 0, why: "No nuclear work is fine for consult-only weeks, but it drops some imaging sites." },
  supervise: { low: 0, high: 100, why: "Supervising stress and nuclear studies opens mixed clinic and hospital blocks." },
  interpret: { low: 100, high: 200, why: "Interpreting nuclear studies is harder to staff and usually lifts the top of the range." },
} as const;

const CALL = {
  none: { low: -100, high: 0, why: "No-call clinic days skip the night premium." },
  nights: { low: 0, high: 100, why: "Some nights add callback after the hours already included in the daily number." },
  weekends: { low: 100, high: 200, why: "24-hour weekends are the assignments that pay for consult and pager risk." },
} as const;

const SETTING = {
  outpatient: { low: -100, high: 0, why: "Outpatient-only clinic is a real locum product, but it usually sits under mixed coverage." },
  inpatient: { low: 0, high: 100, why: "Inpatient consults are the core of many non-invasive locum weeks." },
  both: { low: 100, high: 200, why: "Inpatient and outpatient together is what most hospitals are trying to fill." },
} as const;

export function estimateNicDailyRange(answers: NicPayAnswers): PayArcadeEstimate {
  const parts = [
    EXPERIENCE[answers.experience],
    TEE[answers.tee],
    NUKES[answers.nukes],
    CALL[answers.call],
    SETTING[answers.setting],
  ];
  const { dailyLow, dailyHigh } = bandFromShifts(NIC_MARKET_DAILY_LOW, NIC_MARKET_DAILY_HIGH, parts, 1800, 3400);
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const range = `${money.format(dailyLow)}–${money.format(dailyHigh)}`;

  const rank: PayArcadeRank =
    answers.tee === "performs" || (answers.nukes === "interpret" && answers.call !== "none")
      ? "above"
      : answers.experience === "fellowship" || (answers.tee === "none" && answers.nukes === "none" && answers.call === "none")
        ? "below"
        : "inside";

  const headline =
    rank === "above"
      ? `Your mix often sits above the usual $2,200–$2,800 starting range`
      : rank === "below"
        ? `Your mix often starts below the usual attending non-invasive range`
        : `Your mix often lands inside or just around the usual starting range`;

  return {
    dailyLow,
    dailyHigh,
    rank,
    rankLabel: PAY_ARCADE_RANK_LABEL[rank],
    headline,
    summary: `${range} a day is a directional daily guarantee for a non-invasive cardiologist with this mix. It is not a posted salary. TEE, nuclear, call, and inpatient vs outpatient work can land a real offer lower or higher.`,
    why: parts.map((part) => part.why).slice(0, 4),
  };
}
