export const CALCULATOR_BENCHMARK_EFFECTIVE_DATE = "2026-07-21";

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

export type CalculatorResult = {
  demandScore: number;
  fitScore: number;
  opportunityAccessScore: number;
  annualLow: number;
  annualHigh: number;
  weeklyLow: number;
  weeklyHigh: number;
  annualWeeks: number;
  confidence: "Foundational" | "Good" | "Strong";
  advantages: string[];
  matchedOpportunities: string[];
  unlocks: string[];
  currentCompMidpoint: number | null;
  incomeIncreasePercent: number | null;
};

type SpecialtyBenchmark = {
  demand: number;
  weeklyLow: number;
  weeklyHigh: number;
  match: string;
};

export const SPECIALTY_BENCHMARKS: Record<CalculatorAnswers["specialty"], SpecialtyBenchmark> = {
  "Interventional Cardiology": { demand: 95, weeklyLow: 19000, weeklyHigh: 28000, match: "Cath lab and interventional coverage" },
  "Electrophysiology (EP)": { demand: 91, weeklyLow: 18000, weeklyHigh: 26000, match: "EP lab, ablation, and device coverage" },
  "Non-Invasive / General Cardiology": { demand: 85, weeklyLow: 12000, weeklyHigh: 18000, match: "Consult, clinic, rounding, and imaging coverage" },
  "Structural Heart": { demand: 89, weeklyLow: 20000, weeklyHigh: 30000, match: "Structural heart and valve-program coverage" },
  "Advanced Heart Failure": { demand: 87, weeklyLow: 14000, weeklyHigh: 21000, match: "Advanced heart failure consult coverage" },
  "Nuclear Cardiology": { demand: 82, weeklyLow: 13000, weeklyHigh: 19000, match: "Nuclear cardiology and stress-lab coverage" },
  "Cardiac Imaging": { demand: 86, weeklyLow: 14000, weeklyHigh: 22000, match: "Echo, CT, MRI, and read coverage" },
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

const WEEKS_BY_AVAILABILITY: Record<CalculatorAnswers["availability"], number> = {
  "1 weekend per month": 5.4,
  "1 week per month": 12,
  "2 weeks per month": 24,
  "3+ weeks per month": 36,
  "Full-time locums": 46,
};

const EXPERIENCE_MULTIPLIER: Record<CalculatorAnswers["experience"], number> = {
  "Current Fellow": 0.78,
  "0-5 years": 0.95,
  "6-10 years": 1,
  "11-20 years": 1.04,
  "20+ years": 1,
};

const STYLE_MULTIPLIER: Record<CalculatorAnswers["assignmentStyle"], number> = {
  "Weekend call coverage": 1.08,
  "Weekday coverage": 1,
  "Clinic only": 0.88,
  "Inpatient rounding": 0.96,
  "Cath lab / procedural coverage": 1.12,
  Flexible: 1.03,
};

const TRAVEL_MULTIPLIER: Record<CalculatorAnswers["travelPreference"], number> = {
  "Local assignments only": 0.96,
  "Within my region": 1,
  "Anywhere in the United States": 1.06,
  "Internationally interested": 1,
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

function roundToThousand(value: number): number {
  return Math.round(value / 1000) * 1000;
}

function fitNarrative(answers: CalculatorAnswers, benchmark: SpecialtyBenchmark): Pick<CalculatorResult, "advantages" | "matchedOpportunities" | "unlocks"> {
  const advantages = [`${answers.specialty} has a ${benchmark.demand}/100 directional demand index`];
  if (answers.licenses.length >= 3) advantages.push(`${answers.licenses.length} active licenses broaden your immediate assignment footprint`);
  if (answers.availability === "2 weeks per month" || answers.availability === "3+ weeks per month" || answers.availability === "Full-time locums") {
    advantages.push("Your availability supports common recurring coverage blocks");
  }
  if (answers.travelPreference === "Anywhere in the United States") advantages.push("Nationwide flexibility improves access to harder-to-cover programs");
  if (answers.assignmentStyle === "Flexible") advantages.push("Flexible assignment scope creates more ways to match your schedule");

  const matchedOpportunities = [benchmark.match];
  if (answers.availability === "1 weekend per month") matchedOpportunities.push("Recurring weekend coverage");
  if (answers.travelPreference === "Local assignments only") matchedOpportunities.push("Local or drive-to coverage blocks");
  else matchedOpportunities.push("Travel-based temporary coverage");
  if (answers.practiceType === "Semi-retired" || answers.practiceType === "Retired but active") matchedOpportunities.push("Lower-frequency retirement-bridge assignments");

  const unlocks: string[] = [];
  if (answers.licenses.length < 2) unlocks.push("A second strategically chosen state license could broaden your assignment pool");
  if (answers.imlcStatus === "No") unlocks.push("If eligible, the IMLC pathway may shorten the process of obtaining additional state licenses");
  if (answers.imlcStatus === "Unsure") unlocks.push("Confirming IMLC eligibility can make multi-state planning more predictable");
  if (answers.travelPreference === "Local assignments only") unlocks.push("Expanding to regional travel would increase the number of realistic coverage models");
  if (answers.availability === "1 weekend per month") unlocks.push("Adding one weekday block per quarter can unlock clinic and procedural assignments");

  return { advantages: advantages.slice(0, 4), matchedOpportunities: matchedOpportunities.slice(0, 4), unlocks: unlocks.slice(0, 3) };
}

export function calculateLocumsProfile(answers: CalculatorAnswers): CalculatorResult {
  const benchmark = SPECIALTY_BENCHMARKS[answers.specialty];
  const annualWeeks = WEEKS_BY_AVAILABILITY[answers.availability];
  const combinedMultiplier = clamp(
    EXPERIENCE_MULTIPLIER[answers.experience] *
      STYLE_MULTIPLIER[answers.assignmentStyle] *
      TRAVEL_MULTIPLIER[answers.travelPreference],
    0.72,
    1.24,
  );

  const weeklyLow = roundToThousand(benchmark.weeklyLow * combinedMultiplier);
  const weeklyHigh = roundToThousand(benchmark.weeklyHigh * combinedMultiplier);
  const annualLow = roundToThousand(weeklyLow * annualWeeks);
  const annualHigh = roundToThousand(weeklyHigh * annualWeeks);

  const availabilityScore = annualWeeks >= 24 ? 15 : annualWeeks >= 12 ? 11 : 7;
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
    weeklyLow,
    weeklyHigh,
    annualWeeks,
    confidence: answers.licenses.length >= 2 && answers.imlcStatus !== "Unsure" ? "Strong" : answers.licenses.length >= 1 ? "Good" : "Foundational",
    currentCompMidpoint,
    incomeIncreasePercent,
    ...narrative,
  };
}
