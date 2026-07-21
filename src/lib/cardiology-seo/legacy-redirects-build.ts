import { CARDIOLOGY_METROS } from "../cardiology-programmatic/metros";
import { citySeoSlug, legacyCardiologyLocumsSlug } from "./slug-utils";

const SETTING_KEYS = ["cath-lab", "inpatient-consult", "outpatient-clinic", "telecardiology"] as const;

/** Intent slugs shared between legacy `/cardiology-locums` and `/guides` */
const INTENT_SLUGS = [
  "cardiologist-moonlighting-locums",
  "cardiologist-1099-locums",
  "cardiologist-credentialing-timeline",
  "cardiologist-leaving-employed-practice",
  "weekend-cardiology-locums",
  "semi-retired-cardiologist-locums",
  "interventional-cardiologist-travel-locums",
  "general-cardiologist-locum-jobs",
  "electrophysiology-locum-jobs",
  "heart-failure-cardiologist-locums",
  "cardiologist-locum-malpractice",
  "cardiologist-locum-pay-rates",
  "cardiologist-imlc-licensing",
  "cardiologist-cath-lab-call",
  "cardiologist-stemi-coverage",
  "cardiologist-echo-read-locums",
  "cardiologist-burnout-locums-bridge",
  "cardiologist-locum-contract-review",
  "cardiologist-locum-stipends",
  "cardiologist-new-attending-locums",
  "cardiologist-locum-tenens-meaning",
  "cardiologist-hospital-privileging",
  "cardiologist-tavr-locum-coverage",
  "cardiologist-nuclear-cardiology-locums",
  "cardiologist-part-time-locums",
  "cardiologist-locum-recruiter",
  "cardiologist-rural-locums",
  "cardiologist-academic-locums",
  "cardiologist-locum-cancellation-policy",
  "cardiologist-locum-vs-employed",
  "cardiologist-locum-tax-basics",
  "cardiologist-call-pay-locums",
  "cardiologist-locum-orientation",
  "cardiologist-locum-non-compete",
  "cardiologist-device-clinic-locums",
  "cardiologist-stress-test-supervision",
  "cardiologist-locum-faq",
] as const;

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
    destination: `/guides/${slug}`,
    permanent: true as const,
  }));

  return [...metroRedirects, ...settingRedirects, ...intentRedirects];
}

export function isLegacyIntentSlug(slug: string): boolean {
  return (INTENT_SLUGS as readonly string[]).includes(slug);
}

export const LEGACY_SETTING_KEYS = SETTING_KEYS;
