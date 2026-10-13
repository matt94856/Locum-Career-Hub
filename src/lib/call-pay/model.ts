/**
 * Beginner call-pay comparison for general and interventional cardiology.
 *
 * Interventional bands are recruiter guidance for this tool: a 24-hour call
 * rate with 0–4 hours included often matches an 8-hour day ($3,200–$3,600),
 * callback is often $400–$450, and a higher-guarantee 0–6 hour quote is
 * $3,800–$4,200.
 *
 * General cardiology uses the published daily band ($2,200–$2,800), not the
 * interventional numbers. Callback is that daily rate ÷ 8 ($275–$350). The
 * higher-guarantee 0–6 quote is $400 above the general band ($2,600–$3,200),
 * which keeps the same lesson: two extra included hours cost less than a busy
 * callback day.
 */

export const CALL_PAY_EFFECTIVE_DATE = "2026-10-12";

export type CallPaySpecialty = "interventional" | "general";
export type CallPayStructure = "included-4" | "included-6";

export type CallPayBand = {
  specialty: CallPaySpecialty;
  label: string;
  /** 8-hour day rate, and the usual 24-hour rate when only 0–4 hours are included. */
  flexibleDailyLow: number;
  flexibleDailyHigh: number;
  flexibleIncludedHours: 4;
  /** Higher daily rate that includes 0–6 hours. More guaranteed, less callback upside. */
  guaranteedDailyLow: number;
  guaranteedDailyHigh: number;
  guaranteedIncludedHours: 6;
  callbackLow: number;
  callbackHigh: number;
};

export const CALL_PAY_BANDS: Record<CallPaySpecialty, CallPayBand> = {
  interventional: {
    specialty: "interventional",
    label: "Interventional cardiology",
    flexibleDailyLow: 3200,
    flexibleDailyHigh: 3600,
    flexibleIncludedHours: 4,
    guaranteedDailyLow: 3800,
    guaranteedDailyHigh: 4200,
    guaranteedIncludedHours: 6,
    callbackLow: 400,
    callbackHigh: 450,
  },
  general: {
    specialty: "general",
    label: "General cardiology",
    flexibleDailyLow: 2200,
    flexibleDailyHigh: 2800,
    flexibleIncludedHours: 4,
    guaranteedDailyLow: 2600,
    guaranteedDailyHigh: 3200,
    guaranteedIncludedHours: 6,
    callbackLow: 275,
    callbackHigh: 350,
  },
};

export type DayPay = {
  dailyRate: number;
  includedHours: number;
  hoursWorked: number;
  callbackRate: number;
  callbackHours: number;
  callbackPay: number;
  total: number;
};

export function dayPay(input: {
  dailyRate: number;
  includedHours: number;
  callbackRate: number;
  hoursWorked: number;
}): DayPay {
  const hoursWorked = Math.max(0, input.hoursWorked);
  const callbackHours = Math.max(0, hoursWorked - input.includedHours);
  const callbackPay = callbackHours * input.callbackRate;
  return {
    dailyRate: input.dailyRate,
    includedHours: input.includedHours,
    hoursWorked,
    callbackRate: input.callbackRate,
    callbackHours,
    callbackPay,
    total: input.dailyRate + callbackPay,
  };
}

export type StructureSnapshot = {
  id: CallPayStructure;
  name: string;
  includedHours: number;
  low: DayPay;
  high: DayPay;
};

export type CallPayComparison = {
  specialty: CallPaySpecialty;
  hoursWorked: number;
  flexible: StructureSnapshot;
  guaranteed: StructureSnapshot;
  /** Positive when the 0–4 structure pays more than the 0–6 guarantee at the low end of each band. */
  lowEndAdvantage: number;
  winnerAtLowEnd: CallPayStructure;
};

export function compareCallPay(specialty: CallPaySpecialty, hoursWorked: number): CallPayComparison {
  const band = CALL_PAY_BANDS[specialty];
  const flexible: StructureSnapshot = {
    id: "included-4",
    name: "0–4 hours included",
    includedHours: band.flexibleIncludedHours,
    low: dayPay({
      dailyRate: band.flexibleDailyLow,
      includedHours: band.flexibleIncludedHours,
      callbackRate: band.callbackLow,
      hoursWorked,
    }),
    high: dayPay({
      dailyRate: band.flexibleDailyHigh,
      includedHours: band.flexibleIncludedHours,
      callbackRate: band.callbackHigh,
      hoursWorked,
    }),
  };
  const guaranteed: StructureSnapshot = {
    id: "included-6",
    name: "0–6 hours included",
    includedHours: band.guaranteedIncludedHours,
    low: dayPay({
      dailyRate: band.guaranteedDailyLow,
      includedHours: band.guaranteedIncludedHours,
      callbackRate: band.callbackLow,
      hoursWorked,
    }),
    high: dayPay({
      dailyRate: band.guaranteedDailyHigh,
      includedHours: band.guaranteedIncludedHours,
      callbackRate: band.callbackHigh,
      hoursWorked,
    }),
  };
  const lowEndAdvantage = flexible.low.total - guaranteed.low.total;
  return {
    specialty,
    hoursWorked: Math.max(0, hoursWorked),
    flexible,
    guaranteed,
    lowEndAdvantage,
    winnerAtLowEnd: lowEndAdvantage >= 0 ? "included-4" : "included-6",
  };
}
