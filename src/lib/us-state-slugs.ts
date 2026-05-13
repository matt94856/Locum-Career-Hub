import { US_STATES } from "@/lib/states";

/** URL slug for a US state / DC name (matches `locum-tenens-jobs/[state]`). */
export function stateNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const US_STATE_SLUGS = US_STATES.map((s) => stateNameToSlug(s));

const SLUG_TO_NAME = new Map(US_STATES.map((s) => [stateNameToSlug(s), s]));

export function getStateNameBySlug(slug: string): string | undefined {
  return SLUG_TO_NAME.get(slug);
}
