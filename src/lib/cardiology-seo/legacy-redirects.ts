import { CARDIOLOGY_METROS } from "@/lib/cardiology-programmatic/metros";
import { US_STATE_SLUGS } from "@/lib/us-state-slugs";
import { citySeoSlug, legacyCardiologyLocumsSlug } from "@/lib/cardiology-seo/slug-utils";
import { isLegacyIntentSlug, LEGACY_SETTING_KEYS } from "@/lib/cardiology-seo/legacy-redirects-build";

export { buildCardiologyLocumsLegacyRedirects } from "@/lib/cardiology-seo/legacy-redirects-build";

export function getLegacyCardiologyLocumsRedirectDestination(legacySlug: string): string | undefined {
  const metro = CARDIOLOGY_METROS.find((m) => legacyCardiologyLocumsSlug(m.city, m.stateSlug) === legacySlug);
  if (metro) return `/cities/${citySeoSlug(metro.city)}`;

  for (const state of US_STATE_SLUGS) {
    for (const key of LEGACY_SETTING_KEYS) {
      if (legacySlug === `${key}-cardiology-locums-${state}`) {
        return `/locum-tenens-jobs/${state}`;
      }
    }
  }

  if (isLegacyIntentSlug(legacySlug)) {
    return `/guides/${legacySlug}`;
  }

  return undefined;
}
