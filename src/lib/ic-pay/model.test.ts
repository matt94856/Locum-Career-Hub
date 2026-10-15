import { describe, expect, it } from "vitest";
import { estimateIcDailyRange, IC_MARKET_DAILY_HIGH, IC_MARKET_DAILY_LOW } from "./model";

describe("IC locums skill range", () => {
  it("keeps the published attending starting range at 3200–3500", () => {
    expect(IC_MARKET_DAILY_LOW).toBe(3200);
    expect(IC_MARKET_DAILY_HIGH).toBe(3500);
  });

  it("puts backup-only early careers below the typical attending band", () => {
    const estimate = estimateIcDailyRange({
      experience: "early",
      stemi: "backup",
      skill: "core",
      call: "weekday",
      access: "one_state",
    });
    expect(estimate.dailyHigh).toBeLessThanOrEqual(3400);
    expect(estimate.dailyLow).toBeLessThan(3200);
  });

  it("lifts high-volume STEMI, structural, and weekend call above the midpoint", () => {
    const estimate = estimateIcDailyRange({
      experience: "senior",
      stemi: "shock",
      skill: "structural",
      call: "stemi_weekends",
      access: "imlc",
    });
    expect(estimate.dailyLow).toBeGreaterThanOrEqual(3500);
    expect(estimate.dailyHigh).toBeGreaterThan(estimate.dailyLow);
    expect(estimate.headline.toLowerCase()).toContain("above");
  });

  it("never presents a single number as the rate", () => {
    const estimate = estimateIcDailyRange({
      experience: "mid",
      stemi: "independent",
      skill: "core",
      call: "nights",
      access: "multi_state",
    });
    expect(estimate.dailyHigh - estimate.dailyLow).toBeGreaterThanOrEqual(200);
    expect(estimate.summary).toMatch(/not a posted salary/i);
    expect(estimate.rank).toBe("inside");
    expect(estimate.rankLabel).toMatch(/inside/i);
  });
});
