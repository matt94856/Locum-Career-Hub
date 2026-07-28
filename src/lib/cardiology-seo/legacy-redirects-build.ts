import { CARDIOLOGY_METROS } from "../cardiology-programmatic/metros";
import { citySeoSlug, legacyCardiologyLocumsSlug } from "./slug-utils";

const SETTING_KEYS = ["cath-lab", "inpatient-consult", "outpatient-clinic", "telecardiology"] as const;

/**
 * Legacy `/cardiology-locums/{intent}` URLs must redirect to *live* destinations.
 * Do not point at `/guides/{same-slug}` unless that slug exists in the SEO registry —
 * those redirects previously created soft-404s after consolidation.
 */
const INTENT_REDIRECTS: Record<string, string> = {
  "cardiologist-moonlighting-locums": "/cardiology-locum-jobs/cardiology-moonlighting-jobs",
  "cardiologist-1099-locums": "/guides/1099-vs-w2-cardiologist",
  "cardiologist-credentialing-timeline": "/tools/credentialing-timeline",
  "cardiologist-leaving-employed-practice": "/leaving-employed-cardiology",
  "weekend-cardiology-locums": "/part-time-cardiologist-jobs",
  "semi-retired-cardiologist-locums": "/guides/locum-cardiology-after-retirement",
  "interventional-cardiologist-travel-locums":
    "/cardiology-locum-jobs/interventional-cardiology-locum-jobs",
  "general-cardiologist-locum-jobs": "/cardiology-locum-jobs/general-cardiology-locum-jobs",
  "electrophysiology-locum-jobs": "/cardiology-locum-jobs/electrophysiology-locum-jobs",
  "heart-failure-cardiologist-locums": "/guides/heart-failure-locum-opportunities",
  "cardiologist-locum-malpractice": "/resources/malpractice-coverage-locum-cardiologists",
  "cardiologist-locum-pay-rates": "/how-much-do-cardiologists-make-doing-locums",
  "cardiologist-imlc-licensing": "/guides/interstate-medical-licensure-compact-guide",
  "cardiologist-cath-lab-call": "/resources/call-schedules-cardiology-jobs",
  "cardiologist-stemi-coverage": "/locum-jobs/cardiology/interventional",
  "cardiologist-echo-read-locums": "/guides/echocardiography-jobs",
  "cardiologist-burnout-locums-bridge": "/cardiologist-burnout-solutions",
  "cardiologist-locum-contract-review": "/tools/cardiology-locum-contract-checker",
  "cardiologist-locum-stipends": "/guides/are-travel-expenses-paid-for-locums",
  "cardiologist-new-attending-locums": "/resources/fellowship-to-locums-transition",
  "cardiologist-locum-tenens-meaning": "/what-is-a-locum-cardiologist",
  "cardiologist-hospital-privileging": "/resources/credentialing-for-locum-cardiologists",
  "cardiologist-tavr-locum-coverage": "/locum-jobs/cardiology/structural-heart",
  "cardiologist-nuclear-cardiology-locums": "/guides/nuclear-cardiology-jobs",
  "cardiologist-part-time-locums": "/part-time-cardiologist-jobs",
  "cardiologist-locum-recruiter": "/physician-opportunities",
  "cardiologist-rural-locums": "/best-states-for-cardiology-locums",
  "cardiologist-academic-locums": "/guides/academic-vs-private-practice-cardiology",
  "cardiologist-locum-cancellation-policy": "/guides/how-long-are-locum-contracts",
  "cardiologist-locum-vs-employed": "/resources/locum-vs-permanent-cardiology-jobs",
  "cardiologist-locum-tax-basics": "/guides/locum-cardiologist-tax-guide",
  "cardiologist-call-pay-locums": "/resources/call-schedules-cardiology-jobs",
  "cardiologist-locum-orientation": "/guides/how-to-become-a-locum-cardiologist",
  "cardiologist-locum-non-compete": "/guides/transitioning-from-permanent-practice-to-locums",
  "cardiologist-device-clinic-locums": "/locum-jobs/cardiology/electrophysiology",
  "cardiologist-stress-test-supervision": "/guides/nuclear-cardiology-jobs",
  "cardiologist-locum-faq": "/faq",
};

const INTENT_SLUGS = Object.keys(INTENT_REDIRECTS) as (keyof typeof INTENT_REDIRECTS)[];

export function buildCardiologyLocumsLegacyRedirects(stateSlugs: readonly string[]) {
  const metroRedirects = CARDIOLOGY_METROS.map((m) => ({
    source: `/cardiology-locums/${legacyCardiologyLocumsSlug(m.city, m.stateSlug)}`,
    destination: `/cities/${citySeoSlug(m.city)}`,
    permanent: true as const,
  }));

  const settingRedirects = stateSlugs.flatMap((state) =>
    SETTING_KEYS.map((key) => ({
      source: `/cardiology-locums/${key}-cardiology-locums-${state}`,
      destination: `/locum-tenens-jobs/${state}`,
      permanent: true as const,
    })),
  );

  const intentRedirects = INTENT_SLUGS.map((slug) => ({
    source: `/cardiology-locums/${slug}`,
    destination: INTENT_REDIRECTS[slug],
    permanent: true as const,
  }));

  return [...metroRedirects, ...settingRedirects, ...intentRedirects];
}

export function isLegacyIntentSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(INTENT_REDIRECTS, slug);
}

export function legacyIntentDestination(slug: string): string | undefined {
  return INTENT_REDIRECTS[slug];
}

export const LEGACY_SETTING_KEYS = SETTING_KEYS;
