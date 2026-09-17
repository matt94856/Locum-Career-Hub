import { JOB_SPECIALTY_DEFS } from "@/lib/cardiology-authority/jobs-seo";
import { getStateNameBySlug } from "@/lib/us-state-slugs";
import { PATH_TO_LEGACY_SLUG } from "@/lib/seo/cardiology-locum-jobs-config";
import { getSpecialtyNameBySlug } from "@/lib/specialty-seo";
import { DOOR_LANDING_SLUGS, type CareerStageId } from "@/lib/lead-lattice";

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
  fellowship: [
    { href: "/tools/credentialing-timeline", title: "Credentialing timeline estimator" },
    { href: "/guides/start-cardiology-locums-after-fellowship", title: "Start locums after cardiology fellowship" },
  ],
  moonlighting: [
    { href: "/cardiology-locum-jobs/cardiology-moonlighting-jobs", title: "Cardiology moonlighting jobs" },
    { href: "/guides/moonlighting-vs-locums-cardiology", title: "Moonlighting vs locums for cardiologists" },
  ],
  retirement: [
    { href: "/part-time-cardiologist-jobs", title: "Design a sustainable part-time cardiology schedule" },
    { href: "/guides/semi-retired-cardiologist-locums", title: "Semi-retired cardiologist locums" },
  ],
  locumsPrimary: [
    { href: "/locum-jobs/cardiology", title: "Cardiology locum jobs hub" },
    { href: "/national-locum-tenens-jobs-guide", title: "Cardiologist locum tenens jobs" },
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
  else if (lower.includes("imaging")) defaultSpecialty = "Advanced Imaging";
  const defaultCareerStage = DOOR_LANDING_SLUGS[slug];
  return { defaultSpecialty, defaultPreferredStates: [] as string[], defaultCareerStage };
}

export function thankYouReadingLinks(pagePath?: string | null, careerStage?: CareerStageId | string | null) {
  if (!pagePath) {
    if (careerStage === "fellowship") return THANK_YOU_READING_BY_TOPIC.fellowship;
    if (careerStage === "moonlighting") return THANK_YOU_READING_BY_TOPIC.moonlighting;
    if (careerStage === "retirement") return THANK_YOU_READING_BY_TOPIC.retirement;
    if (careerStage === "locums-primary") return THANK_YOU_READING_BY_TOPIC.locumsPrimary;
    return THANK_YOU_READING_BY_TOPIC.default;
  }
  if (
    pagePath.includes(
      "featured-cardiology-jobs/kansas-inpatient-non-invasive",
    )
  ) {
    return [
      {
        href: "/guides/cardiology-locum-schedule-examples",
        title: "Compare cardiology block schedules",
      },
      {
        href: "/guides/interstate-medical-licensure-compact-guide",
        title: "Prepare for multi-state physician licensing",
      },
    ];
  }
  if (
    pagePath.includes(
      "featured-cardiology-jobs/north-carolina-outpatient",
    )
  ) {
    return [
      {
        href: "/part-time-cardiologist-jobs",
        title: "Design a sustainable part-time cardiology schedule",
      },
      {
        href: "/cardiology-locum-jobs/outpatient-cardiology-locum-jobs",
        title: "Review outpatient cardiology locum scope",
      },
    ];
  }
  if (pagePath.includes("featured-cardiology-jobs/ohio-interventional")) {
    return [
      {
        href: "/interventional-cardiology-locums-pay",
        title: "Interventional cardiology locums pay",
      },
      {
        href: "/locum-tenens-jobs/ohio/interventional-cardiology",
        title: "Ohio interventional locum jobs",
      },
    ];
  }
  if (pagePath.includes("salary") || pagePath.includes("pay")) return THANK_YOU_READING_BY_TOPIC.salary;
  if (pagePath.includes("credential")) return THANK_YOU_READING_BY_TOPIC.credentialing;
  if (pagePath.includes("burnout") || pagePath.includes("leaving-employed")) {
    return THANK_YOU_READING_BY_TOPIC.burnout;
  }
  if (careerStage === "fellowship" || pagePath.includes("fellowship") || pagePath.includes("new-graduates")) {
    return THANK_YOU_READING_BY_TOPIC.fellowship;
  }
  if (careerStage === "moonlighting" || pagePath.includes("moonlight")) {
    return THANK_YOU_READING_BY_TOPIC.moonlighting;
  }
  if (careerStage === "retirement" || pagePath.includes("retired") || pagePath.includes("part-time")) {
    return THANK_YOU_READING_BY_TOPIC.retirement;
  }
  if (careerStage === "locums-primary") return THANK_YOU_READING_BY_TOPIC.locumsPrimary;
  return THANK_YOU_READING_BY_TOPIC.default;
}
