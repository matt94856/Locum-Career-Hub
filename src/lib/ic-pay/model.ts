/** Educational IC locums range by skills — not a posted salary or offer. */

export const IC_PAY_TOOL_ID = "ic_locums_pay_range";
export const IC_PAY_EFFECTIVE_DATE = "2026-10-15";

export const IC_MARKET_DAILY_LOW = 3200;
export const IC_MARKET_DAILY_HIGH = 3500;

export type IcExperience = "fellowship" | "early" | "mid" | "senior";
export type IcStemi = "backup" | "independent" | "shock";
export type IcSkill = "core" | "mcs" | "structural";
export type IcCall = "weekday" | "nights" | "stemi_weekends";
export type IcAccess = "one_state" | "multi_state" | "imlc";

export type IcPayAnswers = {
  experience: IcExperience;
  stemi: IcStemi;
  skill: IcSkill;
  call: IcCall;
  access: IcAccess;
};

export type IcPayRank = "below" | "inside" | "above";

export const IC_PAY_SPECIALTY = "Interventional Cardiology";

export const IC_PAY_RANK_LABEL: Record<IcPayRank, string> = {
  below: "Below the usual band",
  inside: "Inside the usual band",
  above: "Above the usual band",
};

export type IcPayEstimate = {
  dailyLow: number;
  dailyHigh: number;
  rank: IcPayRank;
  rankLabel: string;
  headline: string;
  summary: string;
  why: string[];
  movers: string[];
};

function round100(value: number): number {
  return Math.round(value / 100) * 100;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

const EXPERIENCE_SHIFT: Record<IcExperience, { low: number; high: number; why: string }> = {
  fellowship: { low: -300, high: -200, why: "Still finishing training, so hospitals usually start below the typical attending band." },
  early: { low: -100, high: 0, why: "Early independence is common, but logs and STEMI comfort still set the floor." },
  mid: { low: 0, high: 100, why: "A few years of independent PCI is the profile most locum IC days are built around." },
  senior: { low: 0, high: 200, why: "Longer independent practice can help if you still take STEMI and keep current logs." },
};

const STEMI_SHIFT: Record<IcStemi, { low: number; high: number; why: string }> = {
  backup: { low: -200, high: -100, why: "Backup-only STEMI is closer to scheduled lab coverage than a primary-PCI call job." },
  independent: { low: 0, high: 100, why: "Independent primary PCI is the skill hospitals pay the typical IC locum range for." },
  shock: { low: 200, high: 400, why: "High-volume STEMI and shock coverage is harder to staff and usually prices above the midpoint." },
};

const SKILL_SHIFT: Record<IcSkill, { low: number; high: number; why: string }> = {
  core: { low: 0, high: 0, why: "Core PCI is enough for many coverage blocks." },
  mcs: { low: 100, high: 200, why: "Impella or MCS comfort opens busier STEMI programs." },
  structural: { low: 200, high: 400, why: "Structural work is a smaller pool and can lift the top of the range." },
};

const CALL_SHIFT: Record<IcCall, { low: number; high: number; why: string }> = {
  weekday: { low: -100, high: 0, why: "Weekday lab-only days skip most of the night-call premium." },
  nights: { low: 0, high: 100, why: "Some nights add callback, which is how a busy day can land above the daily guarantee." },
  stemi_weekends: { low: 100, high: 200, why: "Full 24-hour STEMI weekends are the assignments that pay for activation risk." },
};

const ACCESS_SHIFT: Record<IcAccess, { low: number; high: number; why: string }> = {
  one_state: { low: 0, high: 0, why: "One license is enough for a local block, but it narrows what we can present quickly." },
  multi_state: { low: 0, high: 100, why: "Two or more licenses make it easier to match urgent coverage." },
  imlc: { low: 100, high: 200, why: "IMLC eligibility often shortens the path into compact states that need IC coverage." },
};

export function estimateIcDailyRange(answers: IcPayAnswers): IcPayEstimate {
  const parts = [
    EXPERIENCE_SHIFT[answers.experience],
    STEMI_SHIFT[answers.stemi],
    SKILL_SHIFT[answers.skill],
    CALL_SHIFT[answers.call],
    ACCESS_SHIFT[answers.access],
  ];

  const dailyLow = round100(
    clamp(IC_MARKET_DAILY_LOW + parts.reduce((sum, part) => sum + part.low, 0), 2700, 4200),
  );
  const dailyHigh = round100(
    clamp(
      Math.max(IC_MARKET_DAILY_HIGH + parts.reduce((sum, part) => sum + part.high, 0), dailyLow + 200),
      dailyLow + 200,
      4500,
    ),
  );

  const why = parts.map((part) => part.why);

  const movers: string[] = [];
  if (answers.stemi === "backup") {
    movers.push("Independent primary PCI logs are usually the biggest jump from backup-only work.");
  }
  if (answers.call === "weekday") {
    movers.push("Taking some 24-hour STEMI call is how a daily guarantee turns into a larger check on busy nights.");
  }
  if (answers.access === "one_state") {
    movers.push("A second license or IMLC eligibility widens the hospitals we can credential quickly.");
  }
  if (answers.skill === "core" && answers.stemi !== "backup") {
    movers.push("MCS or structural experience is optional, but it helps on harder-to-staff programs.");
  }
  if (movers.length === 0) {
    movers.push("Written scope still matters more than the headline: STEMI activation, backup, and what hours are already included.");
  }

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const range = `${money.format(dailyLow)}–${money.format(dailyHigh)}`;

  const rank: IcPayRank =
    answers.stemi === "shock" || answers.skill === "structural"
      ? "above"
      : answers.experience === "fellowship" || answers.stemi === "backup"
        ? "below"
        : "inside";

  const headline =
    rank === "above"
      ? `Your mix often sits above the usual $3,200–$3,500 starting range`
      : rank === "below"
        ? `Your mix often starts below the usual attending range`
        : `Your mix often lands inside or just around the usual starting range`;

  const summary = `${range} a day is a directional daily guarantee for an interventionalist with this mix. It is not a posted salary. Skills, current logs, and the written call rules can land a real offer lower or higher. Busy STEMI nights can add hourly callback after the hours already included in that daily number.`;

  return {
    dailyLow,
    dailyHigh,
    rank,
    rankLabel: IC_PAY_RANK_LABEL[rank],
    headline,
    summary,
    why: why.slice(0, 4),
    movers: movers.slice(0, 3),
  };
}
