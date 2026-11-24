import { describe, expect, it } from "vitest";
import { prefersMarkdown } from "./accept";

describe("prefersMarkdown", () => {
  it("returns false for empty or HTML-first browsers", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")).toBe(false);
  });

  it("returns true for Accept: text/markdown", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/markdown; charset=utf-8")).toBe(true);
  });

  it("prefers markdown when its q is at least HTML", () => {
    expect(prefersMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
    expect(prefersMarkdown("text/html, text/markdown;q=0.1")).toBe(false);
  });
});
