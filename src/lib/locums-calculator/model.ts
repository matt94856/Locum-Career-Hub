export const CALCULATOR_BENCHMARK_EFFECTIVE_DATE = "2026-09-14";

export const SPECIALTIES = [
  "Interventional Cardiology",
  "Electrophysiology (EP)",
  "Non-Invasive / General Cardiology",
  "Structural Heart",
  "Advanced Heart Failure",
  "Nuclear Cardiology",
  "Cardiac Imaging",
] as const;

export const EXPERIENCE_LEVELS = ["Current Fellow", "0-5 years", "6-10 years", "11-20 years", "20+ years"] as const;
export const PRACTICE_TYPES = ["Hospital employed", "Private practice", "Academic medicine", "Government / VA", "Semi-retired", "Retired but active"] as const;
export const AVAILABILITY_OPTIONS = ["1 weekend per month", "1 week per month", "2 weeks per month", "3+ weeks per month", "Full-time locums"] as const;
export const ASSIGNMENT_STYLES = ["Weekend call coverage", "Weekday coverage", "Clinic only", "Inpatient rounding", "Cath lab / procedural coverage", "Flexible"] as const;
export const IMLC_OPTIONS = ["Yes", "No", "Unsure"] as const;
export const TRAVEL_OPTIONS = ["Local assignments only", "Within my region", "Anywhere in the United States", "Internationally interested"] as const;
export const COMPENSATION_OPTIONS = ["Under $400k", "$400k-$600k", "$600k-$800k", "$800k+", "Prefer not to answer"] as const;
export const CAREER_GOALS = ["Increase income", "Reduce burnout", "More schedule flexibility", "Try a new location", "Transition away from full-time practice", "Retirement bridge"] as const;

export type CalculatorAnswers = {
  specialty: (typeof SPECIALTIES)[number];
  experience: (typeof EXPERIENCE_LEVELS)[number];
  practiceType: (typeof PRACTICE_TYPES)[number];
  availability: (typeof AVAILABILITY_OPTIONS)[number];
  assignmentStyle: (typeof ASSIGNMENT_STYLES)[number];
  licenses: string[];
  imlcStatus: (typeof IMLC_OPTIONS)[number];
  travelPreference: (typeof TRAVEL_OPTIONS)[number];
  currentCompensation: (typeof COMPENSATION_OPTIONS)[number];
  careerGoal: (typeof CAREER_GOALS)[number];
};

export type CalculatorBlockUnit = "weekend" | "week";
export type CallModel = "24h" | "pager" | "none";

export type CalculatorResult = {
  demandScore: number;
  fitScore: number;
  opportunityAccessScore: number;
  annualLow: number;
  annualHigh: number;
  dailyLow: number;
  dailyHigh: number;
  callbackHourlyLow: number;
  callbackHourlyHigh: number;
  /** 7-day 24-hour coverage week (daily × 7), for comparing full blocks — not a weekend. */
  weeklyLow: number;
  weeklyHigh: number;
  blockLow: number;
  blockHigh: number;
  blockUnit: CalculatorBlockUnit;
  blocksPerYear: number;
  scheduleLabel: string;
  annualWeeks: number;
  callModel: CallModel;
  rateNote: string;
  confidence: "Foundational" | "Good" | "Strong";
  advantages: string[];
  matchedOpportunities: string[];
  unlocks: string[];
  currentCompMidpoint: number | null;
  incomeIncreasePercent: number | null;
};

type SpecialtyBenchmark = {
  demand: number;
  dailyLow: number;
  dailyHigh: number;
  weeklyLow: number;
  weeklyHigh: number;
  match: string;
};

function band(dailyLow: number, dailyHigh: number, demand: number, match: string): SpecialtyBenchmark {
  return {
    demand,
    dailyLow,
    dailyHigh,
    weeklyLow: dailyLow * 7,
    weeklyHigh: dailyHigh * 7,
    match,
  };
}

/** Recruiter-sourced daily gross. Callback and night pager are daily ÷ 8. */
export const SPECIALTY_BENCHMARKS: Record<CalculatorAnswers["specialty"], SpecialtyBenchmark> = {
  "Interventional Cardiology": band(3200, 3500, 95, "Cath lab and interventional coverage"),
  "Electrophysiology (EP)": band(2800, 3200, 91, "EP lab, ablation, and device coverage"),
  "Non-Invasive / General Cardiology": band(2200, 2800, 85, "Consult, clinic, rounding, and imaging coverage"),
  "Structural Heart": band(3200, 3500, 89, "Structural heart and valve-program coverage"),
  "Advanced Heart Failure": band(2200, 2800, 87, "Advanced heart failure consult coverage"),
  "Nuclear Cardiology": band(2200, 2800, 82, "Nuclear cardiology and stress-lab coverage"),
  "Cardiac Imaging": band(2200, 2800, 86, "Echo, CT, MRI, and read coverage"),
};

export function toLeadSpecialty(specialty: CalculatorAnswers["specialty"]): string {
  const mapping: Record<CalculatorAnswers["specialty"], string> = {
    "Interventional Cardiology": "Interventional Cardiology",
    "Electrophysiology (EP)": "Electrophysiology",
    "Non-Invasive / General Cardiology": "General Cardiology",
    "Structural Heart": "Structural Heart",
    "Advanced Heart Failure": "Heart Failure",
    "Nuclear Cardiology": "Advanced Imaging",
    "Cardiac Imaging": "Advanced Imaging",
  };
  return mapping[specialty];
}

const AVAILABILITY_MODEL: Record<
  CalculatorAnswers["availability"],
  { blocksPerYear: number; unit: CalculatorBlockUnit; scheduleLabel: string }
> = {
  "1 weekend per month": { blocksPerYear: 12, unit: "weekend", scheduleLabel: "12 weekends/year" },
  "1 week per month": { blocksPerYear: 12, unit: "week", scheduleLabel: "12 weeks/year" },
  "2 weeks per month": { blocksPerYear: 24, unit: "week", scheduleLabel: "24 weeks/year" },
  "3+ weeks per month": { blocksPerYear: 36, unit: "week", scheduleLabel: "36 weeks/year" },
  "Full-time locums": { blocksPerYear: 46, unit: "week", scheduleLabel: "46 weeks/year" },
};

const COMP_MIDPOINT: Record<CalculatorAnswers["currentCompensation"], number | null> = {
  "Under $400k": 350000,
  "$400k-$600k": 500000,
  "$600k-$800k": 700000,
  "$800k+": 850000,
  "Prefer not to answer": null,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundToHundred(value: number): number {
  return Math.round(value / 100) * 100;
}

export function callbackFromDaily(daily: number): number {
  return daily / 8;
}

function experienceFactor(experience: CalculatorAnswers["experience"]): number {
  if (experience === "Current Fellow") return 0.95;
  if (experience === "0-5 years") return 0.98;
  return 1;
}

function callModelFor(answers: CalculatorAnswers): CallModel {
  if (answers.availability === "1 weekend per month") return "24h";
  if (answers.assignmentStyle === "Clinic only") return "none";
  if (answers.assignmentStyle === "Weekday coverage") return "pager";
  return "24h";
}

function coverageDays(answers: CalculatorAnswers, callModel: CallModel): { low: number; high: number } {
  if (answers.availability === "1 weekend per month") return { low: 2, high: 3 };
  if (callModel === "none" || callModel === "pager") return { low: 5, high: 5 };
  return { low: 7, high: 7 };
}

function extraCallbackHours(answers: CalculatorAnswers, callModel: CallModel): number {
  if (callModel !== "24h") return 0;
  const busy =
    answers.travelPreference === "Anywhere in the United States" ||
    answers.assignmentStyle === "Cath lab / procedural coverage" ||
    answers.assignmentStyle === "Weekend call coverage";
  if (answers.availability === "1 weekend per month") return busy ? 4 : 2;
  return busy ? 8 : 4;
}

function pagerNightsHigh(callModel: CallModel): number {
  return callModel === "pager" ? 5 : 0;
}

function rateNoteFor(callModel: CallModel, dailyLow: number, dailyHigh: number): string {
  const cb = `${roundToHundred(callbackFromDaily(dailyLow))}–${roundToHundred(callbackFromDaily(dailyHigh))}`;
  if (callModel === "24h") {
    return `24-hour call days are modeled at the daily rate (typically includes 0–4 hours). Extra callback is about ${cb}/hr (daily ÷ 8). Busy facilities can add more callback.`;
  }
  if (callModel === "pager") {
    return `Weekdays use the daily rate. Night pager, when used, is a one-time add of about ${cb} (daily ÷ 8) on top of the day rate.`;
  }
  return "Clinic-only days use the daily rate with no 24-hour call or pager modeled.";
}

function fitNarrative(answers: CalculatorAnswers, benchmark: SpecialtyBenchmark): Pick<CalculatorResult, "advantages" | "matchedOpportunities" | "unlocks"> {
  const advantages = [
    `${answers.specialty} directional daily gross is $${benchmark.dailyLow.toLocaleString()}–$${benchmark.dailyHigh.toLocaleString()}`,
  ];
  if (answers.licenses.length >= 3) advantages.push(`${answers.licenses.length} active licenses broaden your immediate assignment footprint`);
  if (answers.availability === "2 weeks per month" || answers.availability === "3+ weeks per month" || answers.availability === "Full-time locums") {
    advantages.push("Your availability supports common recurring coverage blocks");
  }
  if (answers.travelPreference === "Anywhere in the United States") advantages.push("Nationwide flexibility improves access to harder-to-cover programs");
  if (answers.assignmentStyle === "Flexible") advantages.push("Flexible assignment scope creates more ways to match your schedule");

  const matchedOpportunities = [benchmark.match];
  if (answers.availability === "1 weekend per month") matchedOpportunities.push("Recurring weekend 24-hour coverage");
  if (answers.travelPreference === "Local assignments only") matchedOpportunities.push("Local or drive-to coverage blocks");
  else matchedOpportunities.push("Travel-based temporary coverage");
  if (answers.practiceType === "Semi-retired" || answers.practiceType === "Retired but active") matchedOpportunities.push("Lower-frequency retirement-bridge assignments");

  const unlocks: string[] = [];
  if (answers.licenses.length < 2) unlocks.push("A second strategically chosen state license could broaden your assignment pool");
  if (answers.imlcStatus === "No") unlocks.push("If eligible, the IMLC pathway may shorten the process of obtaining additional state licenses");
  if (answers.imlcStatus === "Unsure") unlocks.push("Confirming IMLC eligibility can make multi-state planning more predictable");
  if (answers.travelPreference === "Local assignments only") unlocks.push("Expanding to regional travel would increase the number of realistic coverage models");
  if (answers.availability === "1 weekend per month") unlocks.push("Adding a weekday block uses the daily rate for clinic or rounding days — a different product than a 24-hour weekend");

  return { advantages: advantages.slice(0, 4), matchedOpportunities: matchedOpportunities.slice(0, 4), unlocks: unlocks.slice(0, 3) };
}

export function calculateLocumsProfile(answers: CalculatorAnswers): CalculatorResult {
  const benchmark = SPECIALTY_BENCHMARKS[answers.specialty];
  const availability = AVAILABILITY_MODEL[answers.availability];
  const callModel = callModelFor(answers);
  const factor = experienceFactor(answers.experience);
  const dailyLow = roundToHundred(benchmark.dailyLow * factor);
  const dailyHigh = roundToHundred(benchmark.dailyHigh * factor);
  const callbackHourlyLow = callbackFromDaily(dailyLow);
  const callbackHourlyHigh = callbackFromDaily(dailyHigh);
  const days = coverageDays(answers, callModel);
  const extraHours = extraCallbackHours(answers, callModel);
  const pagerHigh = pagerNightsHigh(callModel);

  const blockLow = roundToHundred(days.low * dailyLow);
  const blockHigh = roundToHundred(
    days.high * dailyHigh + extraHours * callbackHourlyHigh + pagerHigh * callbackHourlyHigh,
  );
  const annualLow = roundToHundred(blockLow * availability.blocksPerYear);
  const annualHigh = roundToHundred(blockHigh * availability.blocksPerYear);
  const weeklyLow = roundToHundred(dailyLow * 7);
  const weeklyHigh = roundToHundred(dailyHigh * 7);
  const annualWeeks =
    availability.unit === "weekend" ? Math.round(((days.low + days.high) / 2) * (12 / 7) * 10) / 10 : availability.blocksPerYear;

  const availabilityScore = availability.blocksPerYear >= 24 && availability.unit === "week" ? 15 : availability.blocksPerYear >= 12 && availability.unit === "week" ? 11 : 7;
  const licenseScore = clamp(answers.licenses.length * 3, 0, 12);
  const travelScore = answers.travelPreference === "Anywhere in the United States" ? 10 : answers.travelPreference === "Within my region" ? 7 : 4;
  const imlcScore = answers.imlcStatus === "Yes" ? 8 : answers.imlcStatus === "Unsure" ? 4 : 2;
  const experienceScore = answers.experience === "Current Fellow" ? 3 : answers.experience === "0-5 years" ? 7 : 10;
  const fitScore = Math.round(clamp(benchmark.demand * 0.5 + availabilityScore + licenseScore + travelScore + imlcScore + experienceScore, 35, 98));
  const opportunityAccessScore = Math.round(clamp(35 + licenseScore * 2 + travelScore * 2 + imlcScore + availabilityScore, 30, 98));
  const currentCompMidpoint = COMP_MIDPOINT[answers.currentCompensation];
  const annualMidpoint = (annualLow + annualHigh) / 2;
  const incomeIncreasePercent = currentCompMidpoint ? Math.round((annualMidpoint / currentCompMidpoint) * 100) : null;
  const narrative = fitNarrative(answers, benchmark);

  return {
    demandScore: benchmark.demand,
    fitScore,
    opportunityAccessScore,
    annualLow,
    annualHigh,
    dailyLow,
    dailyHigh,
    callbackHourlyLow: roundToHundred(callbackHourlyLow),
    callbackHourlyHigh: roundToHundred(callbackHourlyHigh),
    weeklyLow,
    weeklyHigh,
    blockLow,
    blockHigh: Math.max(blockHigh, blockLow + 100),
    blockUnit: availability.unit,
    blocksPerYear: availability.blocksPerYear,
    scheduleLabel: availability.scheduleLabel,
    annualWeeks,
    callModel,
    rateNote: rateNoteFor(callModel, dailyLow, dailyHigh),
    confidence: answers.licenses.length >= 2 && answers.imlcStatus !== "Unsure" ? "Strong" : answers.licenses.length >= 1 ? "Good" : "Foundational",
    currentCompMidpoint,
    incomeIncreasePercent,
    ...narrative,
  };
}
