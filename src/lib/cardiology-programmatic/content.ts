export type CardiologyContentSection = { h2: string; paragraphs: string[] };

export type CardiologyProgrammaticPage = {
  slug: string;
  kind: "metro" | "setting" | "intent";
  title: string;
  metaDescription: string;
  h1: string;
  h2: string;
  keywords: string[];
  directAnswer: string;
  intro: string;
  sections: CardiologyContentSection[];
  faqs: { q: string; a: string }[];
  relatedLinks: { href: string; title: string }[];
};

export function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function pick<T>(items: T[], seed: number, offset = 0): T {
  return items[(seed + offset) % items.length]!;
}
