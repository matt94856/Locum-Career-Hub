import { describe, expect, it } from "vitest";
import { buildResultShareLandingUrl, displayShareUrl, expandSharePath } from "./share";

describe("share URLs", () => {
  it("builds a short /s link that wraps better than the old query landing", () => {
    const url = buildResultShareLandingUrl({
      kind: "calc",
      title: "Interventional Cardiology locums",
      stat: "$6k–$12k/wknd",
      subtitle: "12 weekends/year · $82k–$148k",
      path: "/cardiologist-locums-calculator",
    });
    expect(url).toContain("/s?");
    expect(url).toContain("p=c");
    expect(url.length).toBeLessThan(180);
    expect(displayShareUrl(url).startsWith("locumcareerhub.com/s?")).toBe(true);
    expect(expandSharePath("c")).toBe("/cardiologist-locums-calculator");
  });
});
