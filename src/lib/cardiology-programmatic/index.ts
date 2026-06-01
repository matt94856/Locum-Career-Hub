import { generateAllCardiologyProgrammaticPages } from "@/lib/cardiology-programmatic/generate-pages";

export type { CardiologyProgrammaticPage, CardiologyContentSection } from "@/lib/cardiology-programmatic/content";

const PAGES = generateAllCardiologyProgrammaticPages();

const bySlug = new Map(PAGES.map((p) => [p.slug, p]));

export const CARDIOLOGY_PROGRAMMATIC_SLUGS = PAGES.map((p) => p.slug);

export function getCardiologyProgrammaticPage(slug: string) {
  return bySlug.get(slug);
}

export function getCardiologyProgrammaticPageCount(): number {
  return PAGES.length;
}

/** Sync programmatic SEO registry used by content tooling. */
export { PAGES as CARDIOLOGY_PROGRAMMATIC_PAGES };
