import { describe, expect, it } from "vitest";
import { TOOL_EVIDENCE_SOURCES, sourceIsStale } from "../tool-data/sources";
import { calculatePortfolioTool } from "./calculate-portfolio-tool";
import { PORTFOLIO_TOOLS } from "./portfolio-tools";

const defaults = (id: (typeof PORTFOLIO_TOOLS)[number]["id"]) => {
  const tool = PORTFOLIO_TOOLS.find((item) => item.id === id);
  if (!tool) throw new Error(`Missing tool ${id}`);
  return Object.fromEntries(tool.fields.map((field) => [field.key, field.defaultValue]));
};

describe("portfolio decision tools", () => {
  it("provides a deterministic result for all ten tools", () => {
    for (const tool of PORTFOLIO_TOOLS) {
      const first = calculatePortfolioTool(tool.id, defaults(tool.id));
      const second = calculatePortfolioTool(tool.id, defaults(tool.id));
      expect(first).toEqual(second);
      expect(first.metrics.length).toBeGreaterThanOrEqual(3);
      expect(first.warnings.length).toBeGreaterThan(0);
    }
  });

  it("fails IMLC prequalification when a core criterion is absent", () => {
    const result = calculatePortfolioTool("imlc", { ...defaults("imlc"), cleanHistory: "no" });
    expect(result.score).toBe(80);
    expect(result.headline).toContain("needs verification");
  });

  it("increases license ROI when assignment probability rises", () => {
    const base = defaults("license-roi");
    const low = calculatePortfolioTool("license-roi", { ...base, probability: 10 });
    const high = calculatePortfolioTool("license-roi", { ...base, probability: 90 });
    expect(high.metrics[0].value).not.toEqual(low.metrics[0].value);
  });

  it("includes unpaid time in offer effective value", () => {
    const base = defaults("offer-comparison");
    const lowBurden = calculatePortfolioTool("offer-comparison", { ...base, aUnpaidHours: 0 });
    const highBurden = calculatePortfolioTool("offer-comparison", { ...base, aUnpaidHours: 100 });
    expect(lowBurden.metrics[0].value).not.toEqual(highBurden.metrics[0].value);
  });

  it("never produces credentialing readiness outside 0–100", () => {
    const result = calculatePortfolioTool("credentialing", {
      ...defaults("credentialing"),
      documentsReady: 0,
      procedureLogs: "no",
      references: "no",
      disclosures: "yes",
    });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("does not label CMS RVUs as a compensation benchmark", () => {
    const result = calculatePortfolioTool("rvu", defaults("rvu"));
    expect(result.warnings.join(" ")).toContain("not compensation benchmarks");
  });

  it("flags source records when they exceed cadence", () => {
    expect(sourceIsStale(TOOL_EVIDENCE_SOURCES.imlccEligibility, new Date("2026-07-30T00:00:00Z"))).toBe(false);
    expect(sourceIsStale(TOOL_EVIDENCE_SOURCES.imlccEligibility, new Date("2026-09-01T00:00:00Z"))).toBe(true);
  });
});
