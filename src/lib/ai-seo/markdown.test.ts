import { describe, expect, it } from "vitest";
import { buildMarkdownForPath, markdownNotFoundBody } from "./markdown";

describe("markdown negotiation bodies", () => {
  it("returns 404 markdown with recovery links for unknown paths", () => {
    const result = buildMarkdownForPath("/this-path-does-not-exist-lch-404-test");
    expect(result.status).toBe(404);
    expect(result.body).toMatch(/llms\.txt/);
    expect(result.body).toMatch(/sitemap\.xml/);
    expect(markdownNotFoundBody("/nope")).toMatch(/Page not found/);
  });

  it("returns citeable markdown for IC pay", () => {
    const result = buildMarkdownForPath("/interventional-cardiology-locums-pay");
    expect(result.status).toBe(200);
    expect(result.body).toMatch(/interventional cardiology locums daily gross benchmark/i);
  });
});
