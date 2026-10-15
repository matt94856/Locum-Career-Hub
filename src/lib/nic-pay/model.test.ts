import { describe, expect, it } from "vitest";
import { estimateNicDailyRange, NIC_MARKET_DAILY_HIGH, NIC_MARKET_DAILY_LOW } from "./model";

describe("Non-invasive locums skill range", () => {
  it("keeps the published attending starting range at 2200–2800", () => {
    expect(NIC_MARKET_DAILY_LOW).toBe(2200);
    expect(NIC_MARKET_DAILY_HIGH).toBe(2800);
  });

  it("puts no-TEE no-nuclear no-call clinic below the usual band", () => {
    const estimate = estimateNicDailyRange({
      experience: "early",
      tee: "none",
      nukes: "none",
      call: "none",
      setting: "outpatient",
    });
    expect(estimate.dailyLow).toBeLessThan(2200);
    expect(estimate.rank).toBe("below");
  });

  it("lifts performing TEEs with mixed coverage above the midpoint", () => {
    const estimate = estimateNicDailyRange({
      experience: "mid",
      tee: "performs",
      nukes: "interpret",
      call: "weekends",
      setting: "both",
    });
    expect(estimate.dailyLow).toBeGreaterThanOrEqual(2500);
    expect(estimate.rank).toBe("above");
    expect(estimate.summary).toMatch(/not a posted salary/i);
    expect(estimate.summary).not.toMatch(/÷/);
  });
});
