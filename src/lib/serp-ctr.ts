import type { Metadata } from "next";
import { metadataPageTitle, shareDocumentTitle } from "@/lib/seo-title";
import { socialShareMetadata } from "@/lib/social-metadata";

/** Google typically truncates descriptions around 155–160 characters. */
export const SERP_DESCRIPTION_MAX = 155;

/** Target length for the segment before `| Brand` in SERP titles. */
export const SERP_TITLE_MAX = 58;

export function clampSerpDescription(text: string, max = SERP_DESCRIPTION_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

export function clampSerpTitle(text: string, max = SERP_TITLE_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 24 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

/** Benefit + proof + CTA — tuned for search snippets. */
export function buildSerpDescription(input: {
  hook: string;
  proof?: string;
  cta?: string;
}): string {
  const cta = input.cta ?? "Talk with a physician recruiter—no spam.";
  const proof = input.proof ?? "Physician-first guidance, not a job-board blast.";
  return clampSerpDescription(`${input.hook} ${proof} ${cta}`);
}

export function buildSerpMetadata(input: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const titlePart = clampSerpTitle(input.title);
  const description = clampSerpDescription(input.description);
  return {
    title: metadataPageTitle(titlePart),
    description,
    alternates: { canonical: input.path },
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    ...socialShareMetadata({
      title: shareDocumentTitle(titlePart),
      description,
      path: input.path,
      type: input.type,
      publishedTime: input.publishedTime,
    }),
  };
}

/** High-impression landing slugs from Search Console — query-aligned titles. */
const LANDING_SERP: Record<string, { title: string; description: string }> = {
  "national-locum-tenens-jobs-guide": {
    title: "Locum Tenens Jobs for Physicians (2026) | Free Recruiter Match",
    description: buildSerpDescription({
      hook: "High-demand locum tenens jobs with transparent pay and credentialing support.",
      proof: "Nationwide hospitalist, ED, and outpatient placements.",
      cta: "Connect with a physician recruiter today.",
    }),
  },
  "physician-travel-jobs": {
    title: "Travel Physician Jobs (2026) | Stipends & Block Schedules",
    description: buildSerpDescription({
      hook: "Travel doctor jobs with transparent stipends, lodging, and handoff expectations.",
      proof: "Compare metro and community blocks nationwide.",
      cta: "Request travel matches in minutes.",
    }),
  },
  "moonlighting-physician-jobs": {
    title: "Moonlighting Physician Jobs | Weekend & Telehealth Blocks",
    description: buildSerpDescription({
      hook: "Moonlighting jobs that fit around your primary role—ED, telehealth, and local coverage.",
      proof: "Compliance-first scheduling conversations.",
      cta: "See moonlighting options—low pressure.",
    }),
  },
  "hospitalist-locum-jobs": {
    title: "Hospitalist Locum Jobs | Census & Call Spelled Out",
    description: buildSerpDescription({
      hook: "Hospitalist locum tenens with documented census, backup, and night coverage.",
      proof: "No vague ‘manageable’ panels.",
      cta: "Match to hospitalist blocks today.",
    }),
  },
  "leaving-hospital-medicine": {
    title: "Leaving Hospital Medicine? Flexible Paths for Physicians",
    description: buildSerpDescription({
      hook: "Structured alternatives to quitting medicine—locums, hybrid, and part-time models.",
      proof: "Burnout-aware, recruiter-led clarity.",
      cta: "Explore next steps without judgment.",
    }),
  },
  "physician-burnout-alternatives": {
    title: "Physician Burnout Alternatives | Locums & Flexible Work",
    description: buildSerpDescription({
      hook: "Practical burnout alternatives: defined blocks, fewer committees, clearer expectations.",
      proof: "Built for clinicians who still love patients.",
      cta: "Get a calm options review.",
    }),
  },
  "flexible-physician-careers": {
    title: "Flexible Physician Careers | Locums, Moonlighting & Blocks",
    description: buildSerpDescription({
      hook: "Design a schedule that fits your life—contract blocks, telehealth, and locum pathways.",
      proof: "Specialty-aware recruiter support.",
      cta: "Start with a 30-minute intro.",
    }),
  },
};

export function landingSerpOverride(slug: string): { title: string; description: string } | undefined {
  return LANDING_SERP[slug];
}

export function buildHomeSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Locum Tenens Jobs for Physicians (2026) | Recruiter Support",
    description: buildSerpDescription({
      hook: "Locum tenens jobs with transparent pay, credentialing timelines, and realistic schedules.",
      proof: "State & specialty hubs for US physicians.",
      cta: "Talk to a recruiter—no job-board spam.",
    }),
    path: "/",
    keywords: [
      "locum tenens jobs",
      "locum tenens physician",
      "locum physician jobs",
      "physician staffing",
      "locum tenens recruiter",
    ],
  });
}

export function buildStateSerpMetadata(stateName: string, slug: string): Metadata {
  return buildSerpMetadata({
    title: `Locum Tenens Jobs in ${stateName} (2026) | Licensing & Pay`,
    description: buildSerpDescription({
      hook: `${stateName} locum tenens jobs for hospitalists, ED, anesthesia, and outpatient specialties.`,
      proof: "Credentialing paths, metros, and contract norms explained.",
      cta: `Request ${stateName} matches today.`,
    }),
    path: `/locum-tenens-jobs/${slug}`,
    keywords: [
      `locum tenens ${stateName}`,
      `locum tenens jobs in ${stateName}`,
      "locum physician jobs",
      "travel physician jobs",
    ],
  });
}

export function buildSpecialtyStateSerpMetadata(input: {
  stateName: string;
  stateSlug: string;
  specialtyName: string;
  specialtySlug: string;
}): Metadata {
  const { stateName, specialtyName, stateSlug, specialtySlug } = input;
  return buildSerpMetadata({
    title: `${specialtyName} Locum Jobs in ${stateName} | Rates & Licensing`,
    description: buildSerpDescription({
      hook: `${stateName} ${specialtyName} locum roles with written census, call, and credentialing expectations.`,
      proof: "Physician recruiter—not a generic board.",
      cta: "Apply in minutes; realistic follow-up.",
    }),
    path: `/locum-tenens-jobs/${stateSlug}/${specialtySlug}`,
    keywords: [
      `${specialtyName} locum ${stateName}`,
      `locum tenens jobs in ${stateName}`,
      `${specialtyName} physician jobs`,
    ],
  });
}

const SPECIALTY_SERP: Record<string, { title: string; hook: string }> = {
  telehealth: {
    title: "Telemedicine Locum Jobs | Multi-State Licensing Guide",
    hook: "Telemedicine and telehealth locum roles with clear visit pace, licensure, and prescribing rules.",
  },
  "family-medicine": {
    title: "Family Medicine Locum Jobs | Outpatient & Rural Blocks",
    hook: "Family medicine locum tenens with visit caps, MA support, and scope documented in writing.",
  },
  pediatrics: {
    title: "Pediatric Locum Jobs | Inpatient & Outpatient Coverage",
    hook: "Pediatric locum roles with age range, census, and PICU backup clarified before you start.",
  },
};

export function buildSpecialtySerpMetadata(name: string, slug: string): Metadata {
  const custom = SPECIALTY_SERP[slug];
  return buildSerpMetadata({
    title: custom?.title ?? `${name} Locum Tenens Jobs | Flexible Physician Work`,
    description: buildSerpDescription({
      hook:
        custom?.hook ??
        `${name} locum and flexible contract work with clear volume, call, and malpractice terms.`,
      proof: "Compare travel vs local blocks by state.",
      cta: "Request specialty matches—no spam.",
    }),
    path: `/specialties/${slug}`,
    keywords: [`${name} locum`, "locum tenens jobs", "flexible physician jobs", "telemedicine locums jobs"],
  });
}

export function buildGlossarySerpMetadata(title: string, slug: string): Metadata {
  return buildSerpMetadata({
    title: `What Is ${title}? Locum Tenens Definition`,
    description: buildSerpDescription({
      hook: `Plain-English definition of “${title}” for physicians exploring locum tenens and staffing.`,
      proof: "Educational guide—not legal or tax advice.",
      cta: "Ready for matches? Submit your states & dates.",
    }),
    path: `/glossary/${slug}`,
    keywords: [title.toLowerCase(), "locum tenens glossary", "physician staffing terms"],
  });
}

export function buildToolsIndexSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Physician Locum Tools | Salary & W-2 vs 1099 Calculators",
    description: buildSerpDescription({
      hook: "Free locum salary and tax-structure calculators built for physicians.",
      proof: "Illustrative ranges with clear disclaimers.",
      cta: "Run a estimate, then talk to a recruiter.",
    }),
    path: "/tools",
    keywords: ["locum tenens calculator", "locum pay calculator", "physician locum tools"],
  });
}

export function buildSalaryEstimatorSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Locum Tenens Salary Calculator (Free) | Weekly Pay Range",
    description: buildSerpDescription({
      hook: "Free locum tenens income calculator—model weekly gross ranges by specialty and schedule.",
      proof: "Illustrative only; not a quote or tax advice.",
      cta: "Estimate pay, then request real matches.",
    }),
    path: "/tools/locum-salary-estimator",
    keywords: [
      "locum tenens income calculator",
      "locum pay calculator",
      "locum salary calculator",
      "locum tenens salary",
    ],
  });
}

export function buildForPhysiciansSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Locum Tenens for Physicians | Burnout & Flexible Work",
    description: buildSerpDescription({
      hook: "Locum tenens jobs and flexible careers when hospital medicine no longer fits your life.",
      proof: "Burnout-aware guides and specialty hubs.",
      cta: "Explore options—talk to a recruiter.",
    }),
    path: "/for-physicians",
    keywords: ["locum tenens for physicians", "physician burnout", "flexible physician careers"],
  });
}

export function buildLocumJobsHubSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Locum Tenens Jobs by State (2026) | All 50 States",
    description: buildSerpDescription({
      hook: "Browse locum tenens jobs in every US state—then open specialty-specific guides.",
      proof: "Licensing, metros, and credentialing context per state.",
      cta: "Pick your state and request matches.",
    }),
    path: "/locum-tenens-jobs",
    keywords: ["locum tenens jobs", "locum tenens by state", "locum physician jobs"],
  });
}

export function buildPhysicianOpportunitiesSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Physician Locum Opportunities | Submit Your Preferences",
    description: buildSerpDescription({
      hook: "Tell us specialty, states, and dates—get realistic locum matches, not spam.",
      proof: "Physician recruiter advocacy on rates and credentialing.",
      cta: "Submit the form in 2 minutes.",
    }),
    path: "/physician-opportunities",
    keywords: ["physician opportunities", "locum tenens jobs", "physician recruiter"],
  });
}

export function buildW2vs1099SerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Locum vs Employed Calculator | W-2 vs 1099 for Physicians",
    description: buildSerpDescription({
      hook: "Compare locum vs employed pay and W-2 vs 1099 structure for physicians.",
      proof: "Educational modeling—not individualized tax advice.",
      cta: "Run the comparison, then explore locum roles.",
    }),
    path: "/tools/w2-vs-1099-physician",
    keywords: ["locum vs employed calculator", "1099 physician", "W-2 vs 1099 doctor", "locum tax calculator"],
  });
}
