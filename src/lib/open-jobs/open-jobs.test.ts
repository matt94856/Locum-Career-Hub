import { describe, expect, it } from "vitest";
import { FEATURED_CARDIOLOGY_OPPORTUNITIES } from "@/lib/featured-cardiology-opportunities";
import { OPEN_JOB_DRAFTS } from "@/lib/open-jobs";

describe("open cardiology job pages", () => {
  it("keeps unique slugs, H1s, and SERP titles", () => {
    const slugs = FEATURED_CARDIOLOGY_OPPORTUNITIES.map((job) => job.slug);
    const h1s = FEATURED_CARDIOLOGY_OPPORTUNITIES.map((job) => job.h1);
    const titles = FEATURED_CARDIOLOGY_OPPORTUNITIES.map((job) => job.metaTitle);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(h1s).size).toBe(h1s.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("posts a date and enough unique FAQ copy on every job", () => {
    for (const job of FEATURED_CARDIOLOGY_OPPORTUNITIES) {
      expect(job.datePosted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(job.faqs.length).toBeGreaterThanOrEqual(5);
      expect(job.directAnswer.length).toBeGreaterThan(120);
      expect(job.metaDescription.length).toBeGreaterThan(40);
    }
  });

  it("does not invent a Montana VMS page or duplicate the western NC outpatient URL", () => {
    expect(OPEN_JOB_DRAFTS.some((job) => job.slug.includes("montana"))).toBe(false);
    expect(
      OPEN_JOB_DRAFTS.some((job) => job.slug === "north-carolina-outpatient-cardiology-locum"),
    ).toBe(false);
    expect(
      FEATURED_CARDIOLOGY_OPPORTUNITIES.some(
        (job) => job.slug === "north-carolina-outpatient-cardiology-locum",
      ),
    ).toBe(true);
  });

  it("keeps VMS copy from claiming travel coverage by default", () => {
    const vms = FEATURED_CARDIOLOGY_OPPORTUNITIES.filter((job) => job.listingKind === "vms");
    expect(vms.length).toBeGreaterThan(10);
    for (const job of vms) {
      expect(job.supportLine?.toLowerCase()).toContain("limited");
      expect(job.supportLine?.toLowerCase()).not.toContain("travel, lodging, and malpractice insurance covered");
    }
  });
});
