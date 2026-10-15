import type { ContentSection } from "@/lib/cardiology-seo/types";

export type FaqItem = { q: string; a: string };

function normalizeQuestion(q: string) {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\blocums\b/g, "locum")
    .replace(/\b(how|does|do|what|is|are|a|an|the|for|to|of|and|in)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(q: string) {
  return new Set(normalizeQuestion(q).split(" ").filter(Boolean));
}

function tooSimilar(a: string, b: string) {
  const left = tokens(a);
  const right = tokens(b);
  let overlap = 0;
  for (const token of left) if (right.has(token)) overlap += 1;
  const denom = Math.min(left.size, right.size);
  return denom > 0 && overlap / denom >= 0.7;
}

/** Drop exact and near-duplicate FAQs so specialty + pillar + profile lists do not stack. */
export function uniqueFaqs(faqs: FaqItem[], limit = 5): FaqItem[] {
  const out: FaqItem[] = [];
  for (const faq of faqs) {
    const key = normalizeQuestion(faq.q);
    if (!key) continue;
    if (out.some((existing) => tooSimilar(existing.q, faq.q))) continue;
    out.push(faq);
    if (out.length >= limit) break;
  }
  return out;
}

/** Keep only career-fit extras. About / requirements / pay / credentialing already live in specialty.sections. */
export function careerFitSections(sections: ContentSection[]): ContentSection[] {
  return sections.filter((section) => /when |fits|does not/i.test(section.h2));
}
