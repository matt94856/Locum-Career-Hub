import { JOB_SPECIALTY_DEFS } from "@/lib/cardiology-authority/jobs-seo";
import { getStateNameBySlug } from "@/lib/us-state-slugs";
import { PATH_TO_LEGACY_SLUG } from "@/lib/seo/cardiology-locum-jobs-config";
import { getSpecialtyNameBySlug } from "@/lib/specialty-seo";

/** Map job URL specialty slug → form select label */
export function specialtyNameFromJobSlug(jobSpecialtySlug: string): string | undefined {
  return JOB_SPECIALTY_DEFS.find((d) => d.slug === jobSpecialtySlug)?.name;
}

/** Map hub path slug (e.g. interventional) → form select label */
export function specialtyNameFromPathSlug(pathSlug: string): string | undefined {
  const legacy = PATH_TO_LEGACY_SLUG[pathSlug];
  if (!legacy) return undefined;
  return getSpecialtyNameBySlug(legacy);
}

export function stateNameFromSlug(stateSlug: string): string | undefined {
  return getStateNameBySlug(stateSlug);
}

export function leadPrefillFromJobPage(stateSlug: string, jobSpecialtySlug?: string) {
  const stateName = stateNameFromSlug(stateSlug);
  return {
    defaultSpecialty: jobSpecialtySlug ? specialtyNameFromJobSlug(jobSpecialtySlug) : "General Cardiology",
    defaultPreferredStates: stateName ? [stateName] : [],
  };
}

export function leadPrefillFromPathSlug(pathSlug: string) {
  return {
    defaultSpecialty: specialtyNameFromPathSlug(pathSlug) ?? "General Cardiology",
    defaultPreferredStates: [] as string[],
  };
}

/** Resource slugs → suggested thank-you reading */
export const THANK_YOU_READING_BY_TOPIC: Record<string, { href: string; title: string }[]> = {
  default: [
    { href: "/resources/how-much-do-locum-cardiologists-make", title: "How much do locum cardiologists make?" },
    { href: "/resources/credentialing-for-locum-cardiologists", title: "Credentialing for locum cardiologists" },
  ],
  salary: [
    { href: "/resources/locum-cardiologist-salary-guide", title: "Locum cardiologist salary guide" },
    { href: "/tools/w2-vs-1099-physician", title: "W-2 vs 1099 calculator" },
  ],
  credentialing: [
    { href: "/tools/credentialing-timeline", title: "Credentialing timeline estimator" },
    { href: "/resources/credentialing-for-locum-cardiologists", title: "Credentialing checklist" },
  ],
  burnout: [
    { href: "/leaving-employed-cardiology", title: "Leaving employed cardiology" },
    { href: "/flexible-physician-careers", title: "Flexible cardiology careers" },
  ],
};

/** Landing slug → form defaults for high-intent physician landings */
export function leadPrefillFromLandingSlug(slug: string) {
  const lower = slug.toLowerCase();
  let defaultSpecialty = "General Cardiology";
  if (lower.includes("interventional")) defaultSpecialty = "Interventional Cardiology";
  else if (lower.includes("electrophysiology") || lower.includes("-ep-")) defaultSpecialty = "Electrophysiology";
  else if (lower.includes("heart-failure")) defaultSpecialty = "Heart Failure";
  else if (lower.includes("pediatric")) defaultSpecialty = "Pediatric Cardiology";
  return { defaultSpecialty, defaultPreferredStates: [] as string[] };
}

export function thankYouReadingLinks(pagePath?: string | null) {
  if (!pagePath) return THANK_YOU_READING_BY_TOPIC.default;
  if (pagePath.includes("salary") || pagePath.includes("pay")) return THANK_YOU_READING_BY_TOPIC.salary;
  if (pagePath.includes("credential")) return THANK_YOU_READING_BY_TOPIC.credentialing;
  if (pagePath.includes("burnout") || pagePath.includes("leaving-employed")) {
    return THANK_YOU_READING_BY_TOPIC.burnout;
  }
  return THANK_YOU_READING_BY_TOPIC.default;
}
