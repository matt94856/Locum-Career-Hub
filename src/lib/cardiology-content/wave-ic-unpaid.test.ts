import { describe, expect, it } from "vitest";
import { getCardiologySeoPageByPath, getIndexableCardiologySeoPaths } from "@/lib/cardiology-seo/registry";
import { IC_ALL_SLUGS, IC_CLUSTER_NAV } from "./wave-ic-cluster";
import { IC_DECISION_GUIDES, IC_DECISION_NAV } from "./wave-ic-unpaid";

describe("IC unpaid decision cluster", () => {
  it("registers 10 unique decision-guide routes", () => {
    expect(IC_DECISION_NAV).toHaveLength(10);
    expect(IC_DECISION_GUIDES).toHaveLength(10);
    expect(new Set(IC_DECISION_GUIDES.map((guide) => guide.slug)).size).toBe(10);
    expect(IC_ALL_SLUGS.size).toBe(IC_CLUSTER_NAV.length + IC_DECISION_NAV.length);
  });

  it("puts each decision page on the sitemap with unique copy and a lead CTA", () => {
    const indexable = new Set(getIndexableCardiologySeoPaths());
    const missing = IC_DECISION_NAV.filter((item) => !indexable.has(item.href)).map((item) => item.href);
    expect(missing).toEqual([]);
    for (const item of IC_DECISION_NAV) {
      const page = getCardiologySeoPageByPath(item.href);
      expect(page?.noindex).toBeFalsy();
      expect(page?.contentTier).toBe("flagship");
      expect(page?.h1.length).toBeGreaterThan(12);
      expect(page?.directAnswer.length).toBeGreaterThan(80);
      expect(page?.sections.length).toBeGreaterThanOrEqual(5);
      expect(page?.faqs.length).toBeGreaterThanOrEqual(4);
      expect(
        page?.relatedLinks.some((link) => link.href.includes("physician-opportunities") || link.href.includes("lead-form")),
      ).toBe(true);
    }
    const start = getCardiologySeoPageByPath("/guides/how-to-start-interventional-cardiology-locums");
    expect(start?.relatedLinks.some((link) => link.href === "/guides/pci-logs-and-privileging-for-locums")).toBe(true);
    expect(start?.relatedLinks.some((link) => link.href === "/guides/imlc-for-interventional-cardiology-locums")).toBe(true);
  });

  it("does not treat the northeastern Kansas inpatient job as an IC page", () => {
    const copy = IC_DECISION_GUIDES.flatMap((guide) => [
      guide.directAnswer ?? "",
      ...guide.sections.flatMap((section) => section.paragraphs),
      ...guide.faqs.map((item) => `${item.q} ${item.a}`),
    ]).join(" ");
    expect(copy.toLowerCase()).toMatch(/not an inpatient general cardiology/);
    expect(copy.toLowerCase()).toMatch(/northeastern kansas inpatient cardiology is a different job/);
  });
});
