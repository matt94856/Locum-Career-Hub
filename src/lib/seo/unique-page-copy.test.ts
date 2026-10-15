import { describe, expect, it } from "vitest";
import { careerFitSections, uniqueFaqs } from "./unique-page-copy";

describe("uniqueFaqs", () => {
  it("drops near-duplicate STEMI questions", () => {
    const faqs = uniqueFaqs([
      { q: "How does STEMI call affect interventional locum pay?", a: "Document activation." },
      { q: "How do STEMI call expectations affect interventional locums?", a: "Same idea." },
      { q: "Do interventional locums always include STEMI call?", a: "No." },
    ]);
    expect(faqs).toHaveLength(2);
    expect(faqs[0]?.q).toMatch(/affect interventional locum pay/i);
    expect(faqs[1]?.q).toMatch(/always include/i);
  });

  it("caps the list", () => {
    const faqs = uniqueFaqs(
      [
        { q: "One?", a: "a" },
        { q: "Two?", a: "b" },
        { q: "Three?", a: "c" },
        { q: "Four?", a: "d" },
        { q: "Five?", a: "e" },
        { q: "Six?", a: "f" },
      ],
      5,
    );
    expect(faqs).toHaveLength(5);
  });
});

describe("careerFitSections", () => {
  it("keeps only when-it-fits copy", () => {
    const kept = careerFitSections([
      { h2: "Scope: cath lab, PCI, and STEMI call", paragraphs: ["x"] },
      { h2: "When interventional locums fits—and when it does not", paragraphs: ["y"] },
    ]);
    expect(kept).toHaveLength(1);
    expect(kept[0]?.h2).toMatch(/when interventional/i);
  });
});
