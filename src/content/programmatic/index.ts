import { CARDIOLOGY_PROGRAMMATIC_SLUGS } from "@/lib/cardiology-programmatic";

export type ProgrammaticSeoPage = {
  /** URL slug without leading slash */
  slug: string;
  /** Human label for internal tooling */
  label: string;
  /** Optional: county, city, or facility grouping key */
  geoKey?: string;
};

/** Cardiologist-only programmatic SEO pages (`/cardiology-locums/[slug]`). */
export const PROGRAMMATIC_SEO_PAGES: ProgrammaticSeoPage[] = CARDIOLOGY_PROGRAMMATIC_SLUGS.map((slug) => ({
  slug,
  label: slug,
}));
