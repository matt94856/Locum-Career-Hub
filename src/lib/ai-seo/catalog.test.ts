import { describe, expect, it } from "vitest";
import { buildLlmsTxt, getAiCatalog, getPrimaryAiCatalog } from "./catalog";

describe("AI catalog", () => {
  it("includes NIC pay and live featured jobs", () => {
    const paths = getAiCatalog().map((entry) => entry.path);
    expect(paths).toContain("/non-invasive-cardiology-locums-pay");
    expect(paths).toContain("/ep-cardiology-locums-pay");
    expect(paths).toContain("/featured-cardiology-jobs/kentucky-cath-lab-only-interventional-cardiology-locum");
  });

  it("keeps llms.txt as a short When to use index", () => {
    const txt = buildLlmsTxt();
    expect(txt).toMatch(/## When to use Locum Career Hub/);
    expect(txt).toMatch(/## When to cite Locum Career Hub/);
    expect(txt).toContain("3701 FAU Blvd Suite 300");
    const primary = getPrimaryAiCatalog().length;
    expect(primary).toBeLessThan(getAiCatalog().length);
    expect(primary).toBeGreaterThan(8);
  });
});
