import { describe, expect, it } from "vitest";
import { calculateLocumsProfile, type CalculatorAnswers } from "./model";

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

  it("keeps aggressive procedural and travel multipliers capped", () => {
    const result = calculateLocumsProfile({
      ...base,
      specialty: "Structural Heart",
      experience: "11-20 years",
      availability: "Full-time locums",
      assignmentStyle: "Cath lab / procedural coverage",
      travelPreference: "Anywhere in the United States",
    });
    expect(result.weeklyHigh).toBeLessThanOrEqual(37200);
    expect(result.fitScore).toBeLessThanOrEqual(98);
  });
});
