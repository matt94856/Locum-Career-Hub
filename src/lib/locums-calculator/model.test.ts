import { describe, expect, it } from "vitest";
import { calculateLocumsProfile, callbackFromDaily, SPECIALTY_BENCHMARKS, type CalculatorAnswers } from "./model";

const base: CalculatorAnswers = {
  specialty: "Non-Invasive / General Cardiology",
  experience: "6-10 years",
  practiceType: "Hospital employed",
  availability: "1 week per month",
  assignmentStyle: "Weekday coverage",
  licenses: ["Florida"],
  imlcStatus: "Unsure",
  travelPreference: "Within my region",
  currentCompensation: "$400k-$600k",
  careerGoal: "More schedule flexibility",
};

describe("calculateLocumsProfile", () => {
  it("returns deterministic bounded scores and ordered ranges", () => {
    const result = calculateLocumsProfile(base);
    expect(result.fitScore).toBeGreaterThanOrEqual(35);
    expect(result.fitScore).toBeLessThanOrEqual(98);
    expect(result.opportunityAccessScore).toBeGreaterThanOrEqual(30);
    expect(result.opportunityAccessScore).toBeLessThanOrEqual(98);
    expect(result.weeklyHigh).toBeGreaterThan(result.weeklyLow);
    expect(result.annualHigh).toBeGreaterThan(result.annualLow);
    expect(calculateLocumsProfile(base)).toEqual(result);
  });

  it("uses recruiter daily bands and daily ÷ 8 for callback", () => {
    expect(SPECIALTY_BENCHMARKS["Interventional Cardiology"].dailyLow).toBe(3200);
    expect(SPECIALTY_BENCHMARKS["Interventional Cardiology"].dailyHigh).toBe(3500);
    expect(SPECIALTY_BENCHMARKS["Electrophysiology (EP)"].dailyLow).toBe(2800);
    expect(SPECIALTY_BENCHMARKS["Electrophysiology (EP)"].dailyHigh).toBe(3200);
    expect(SPECIALTY_BENCHMARKS["Non-Invasive / General Cardiology"].dailyLow).toBe(2200);
    expect(SPECIALTY_BENCHMARKS["Non-Invasive / General Cardiology"].dailyHigh).toBe(2800);
    expect(callbackFromDaily(3200)).toBe(400);
    expect(callbackFromDaily(3500)).toBe(437.5);
  });

  it("uses realistic annual availability instead of multiplying by 52", () => {
    const monthly = calculateLocumsProfile(base);
    const fullTime = calculateLocumsProfile({ ...base, availability: "Full-time locums" });
    expect(monthly.annualWeeks).toBe(12);
    expect(fullTime.annualWeeks).toBe(46);
    expect(fullTime.annualHigh).toBeGreaterThan(monthly.annualHigh);
  });

  it("increases access score for licenses and nationwide flexibility without changing demand", () => {
    const constrained = calculateLocumsProfile({ ...base, licenses: [], imlcStatus: "No", travelPreference: "Local assignments only" });
    const flexible = calculateLocumsProfile({
      ...base,
      licenses: ["Florida", "Georgia", "Texas"],
      imlcStatus: "Yes",
      travelPreference: "Anywhere in the United States",
    });
    expect(flexible.opportunityAccessScore).toBeGreaterThan(constrained.opportunityAccessScore);
    expect(flexible.demandScore).toBe(constrained.demandScore);
  });

  it("provides a career comparison only when compensation is supplied", () => {
    const compared = calculateLocumsProfile(base);
    const privateResult = calculateLocumsProfile({ ...base, currentCompensation: "Prefer not to answer" });
    expect(compared.currentCompMidpoint).toBe(500000);
    expect(compared.incomeIncreasePercent).toBeTypeOf("number");
    expect(privateResult.currentCompMidpoint).toBeNull();
    expect(privateResult.incomeIncreasePercent).toBeNull();
  });

  it("prices an IC weekend as 2–3 call days, not a 7-day coverage week", () => {
    const weekend = calculateLocumsProfile({
      ...base,
      specialty: "Interventional Cardiology",
      availability: "1 weekend per month",
      assignmentStyle: "Weekend call coverage",
    });
    const week = calculateLocumsProfile({
      ...base,
      specialty: "Interventional Cardiology",
      availability: "1 week per month",
      assignmentStyle: "Cath lab / procedural coverage",
    });
    expect(weekend.blockUnit).toBe("weekend");
    expect(weekend.callModel).toBe("24h");
    expect(weekend.blockLow).toBe(6400);
    expect(weekend.blockHigh).toBeLessThanOrEqual(13000);
    expect(weekend.blockHigh).toBeLessThan(week.weeklyLow);
    expect(week.weeklyLow).toBe(22400);
    expect(week.weeklyHigh).toBe(24500);
    expect(week.blockUnit).toBe("week");
    expect(weekend.annualHigh).toBe(weekend.blockHigh * 12);
  });

  it("keeps a 7-day IC coverage week in a recruiter-realistic band", () => {
    const result = calculateLocumsProfile({
      ...base,
      specialty: "Interventional Cardiology",
      experience: "11-20 years",
      availability: "Full-time locums",
      assignmentStyle: "Cath lab / procedural coverage",
      travelPreference: "Anywhere in the United States",
    });
    expect(result.weeklyHigh).toBeLessThanOrEqual(26000);
    expect(result.blockHigh).toBeGreaterThan(result.weeklyHigh);
    expect(result.fitScore).toBeLessThanOrEqual(98);
  });
});
