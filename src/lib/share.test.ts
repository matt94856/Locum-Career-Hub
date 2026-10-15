import { describe, expect, it } from "vitest";
import { buildOgImagePath, buildResultShareLandingUrl, displayShareUrl, expandSharePath, isArcadeSharePath } from "./share";

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
    expect(expandSharePath("i")).toBe("/interventional-cardiology-locums-pay");
    expect(expandSharePath("e")).toBe("/ep-cardiology-locums-pay");
    expect(expandSharePath("n")).toBe("/non-invasive-cardiology-locums-pay");
    expect(isArcadeSharePath("i")).toBe(true);
    expect(isArcadeSharePath("/cardiologist-locums-calculator")).toBe(false);
    expect(buildOgImagePath({ title: "Interventional Cardiology", stat: "$3,200–$3,900/day", style: "arcade" })).toContain(
      "style=arcade",
    );
  });
});
