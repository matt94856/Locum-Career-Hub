import { describe, expect, it } from "vitest";
import { estimateEpDailyRange, EP_MARKET_DAILY_HIGH, EP_MARKET_DAILY_LOW } from "./model";

describe("EP locums skill range", () => {
  it("keeps the published attending starting range at 2800–3200", () => {
    expect(EP_MARKET_DAILY_LOW).toBe(2800);
    expect(EP_MARKET_DAILY_HIGH).toBe(3200);
  });

  it("puts device-only early careers below the typical attending band", () => {
    const estimate = estimateEpDailyRange({
      experience: "early",
      work: "devices",
      skill: "core",
      call: "weekday",
      access: "one_state",
    });
    expect(estimate.dailyLow).toBeLessThan(2800);
    expect(estimate.rank).toBe("below");
  });

  it("lifts complex ablation and extraction above the midpoint", () => {
    const estimate = estimateEpDailyRange({
      experience: "senior",
      work: "complex",
      skill: "extraction",
      call: "weekends",
      access: "imlc",
    });
    expect(estimate.dailyLow).toBeGreaterThanOrEqual(3200);
    expect(estimate.rank).toBe("above");
    expect(estimate.summary).toMatch(/not a posted salary/i);
  });
});
