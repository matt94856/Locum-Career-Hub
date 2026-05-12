export type ProgrammaticSeoPage = {
  /** URL slug without leading slash */
  slug: string;
  /** Human label for internal tooling */
  label: string;
  /** Optional: county, city, or facility grouping key */
  geoKey?: string;
};

/**
 * Programmatic SEO dataset (empty starter).
 *
 * Recommended expansion pattern:
 * - Generate rows from a spreadsheet export (CSV → JSON) at build time
 * - Keep medical claims compliant; focus on intent, process, and recruiter CTAs
 */
export const PROGRAMMATIC_SEO_PAGES: ProgrammaticSeoPage[] = [];
