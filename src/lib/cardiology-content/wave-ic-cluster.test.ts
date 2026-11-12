import { describe, expect, it } from "vitest";
import { getCardiologySeoPageByPath, getIndexableCardiologySeoPaths } from "@/lib/cardiology-seo/registry";
import { IC_CLUSTER_GUIDES, IC_CLUSTER_NAV, IC_CLUSTER_SLUGS } from "./wave-ic-cluster";

describe("interventional SEO cluster", () => {
  it("registers 12 unique flagship guide routes", () => {
    expect(IC_CLUSTER_NAV).toHaveLength(12);
    expect(IC_CLUSTER_GUIDES).toHaveLength(12);
    expect(IC_CLUSTER_SLUGS.size).toBe(12);
    expect(new Set(IC_CLUSTER_GUIDES.map((guide) => guide.slug)).size).toBe(12);
  });

  it("puts each cluster page on the sitemap with unique copy and a lead CTA target", () => {
    const indexable = new Set(getIndexableCardiologySeoPaths());
    for (const item of IC_CLUSTER_NAV) {
      expect(indexable.has(item.href)).toBe(true);
      const page = getCardiologySeoPageByPath(item.href);
      expect(page?.noindex).toBeFalsy();
      expect(page?.contentTier).toBe("flagship");
      expect(page?.h1.length).toBeGreaterThan(12);
      expect(page?.directAnswer.length).toBeGreaterThan(80);
      expect(page?.sections.length).toBeGreaterThanOrEqual(5);
      expect(page?.faqs.length).toBeGreaterThanOrEqual(4);
      expect(page?.relatedLinks.some((link) => link.href.includes("physician-opportunities") || link.href.includes("lead-form"))).toBe(
        true,
      );
    }
    const imlc = getCardiologySeoPageByPath("/guides/imlc-for-interventional-cardiology-locums");
    expect(imlc?.relatedLinks.some((link) => link.href === "/guides/how-to-start-interventional-cardiology-locums")).toBe(true);
  });

  it("does not treat the northeastern Kansas inpatient job as an IC page", () => {
    const copy = IC_CLUSTER_GUIDES.flatMap((guide) => [
      guide.directAnswer ?? "",
      ...guide.sections.flatMap((section) => section.paragraphs),
    ]).join(" ");
    expect(copy.toLowerCase()).toMatch(/not an inpatient general cardiology/);
    expect(copy.toLowerCase()).toMatch(/northeastern kansas inpatient cardiology is a different job/);
  });
});
