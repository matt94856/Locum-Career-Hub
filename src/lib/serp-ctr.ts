import type { Metadata } from "next";
import { metadataPageTitle, shareDocumentTitle } from "@/lib/seo-title";
import {
  CARDIOLOGY_HUB_DESCRIPTION,
  CARDIOLOGY_HUB_TITLE,
  HOME_DESCRIPTION,
  HOME_TITLE,
  cardiologySpecialtyPath,
  specialtySerpTitle,
} from "@/lib/seo/cardiology-locum-jobs-config";
import { socialShareMetadata } from "@/lib/social-metadata";

/** Google typically truncates descriptions around 155–160 characters. */
export const SERP_DESCRIPTION_MAX = 155;

/** Target length for the segment before `| Brand` in SERP titles (~60 chars total with brand). */
export const SERP_TITLE_MAX = 52;

export function clampSerpDescription(text: string, max = SERP_DESCRIPTION_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

export function clampSerpTitle(text: string, max = SERP_TITLE_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  // Preserve complete title language in metadata. Google may rewrite or visually
  // truncate titles, but a literal ellipsis wastes space and can cut the query.
  void max;
  return t;
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
    title: "Cardiologist Locum Tenens Jobs (2026) | Free Recruiter Match",
    description: buildSerpDescription({
      hook: "Cardiologist locum tenens jobs with transparent pay drivers and credentialing support.",
      proof: "Cardiologist-only recruiter—cath lab, consult, clinic, and EP blocks.",
      cta: "Connect with a cardiology recruiter today.",
    }),
  },
  "physician-travel-jobs": {
    title: "Travel Cardiologist Locum Jobs | Stipends & STEMI Clarity",
    description: buildSerpDescription({
      hook: "Travel cardiologist locum jobs with transparent stipends, cath lab call, and STEMI rules in writing.",
      proof: "Cardiologist-only recruiter—metro and community blocks nationwide.",
      cta: "Calculate earning potential or request travel matches.",
    }),
  },
  "retired-physician-opportunities": {
    title: "Semi-Retired Cardiologist Locum Jobs | Flexible Blocks",
    description: buildSerpDescription({
      hook: "Semi-retired cardiologist locum opportunities with lighter call and selective blocks.",
      proof: "Cardiologist-only recruiter support—not a generic job board.",
      cta: "Explore part-time and retirement-bridge options.",
    }),
  },
  "moonlighting-physician-jobs": {
    title: "Cardiologist Moonlighting Jobs | Weekend Cath Lab & Clinic",
    description: buildSerpDescription({
      hook: "Cardiology moonlighting that fits around your primary role—weekend cath lab, consult, and reads.",
      proof: "Compliance-first scheduling for MD/DO cardiologists.",
      cta: "See moonlighting options—low pressure.",
    }),
  },
  "interventional-cardiologist-locum-jobs": {
    title: "Interventional Cardiologist Locum Jobs | STEMI & Cath Lab",
    description: buildSerpDescription({
      hook: "Interventional cardiology locums with STEMI activation, case mix, and backup documented.",
      proof: "Cardiologist-only recruiter—not a generic board.",
      cta: "Match to cath lab blocks today.",
    }),
  },
  "leaving-employed-cardiology": {
    title: "Leaving Employed Cardiology? Flexible Paths for Cardiologists",
    description: buildSerpDescription({
      hook: "Structured alternatives to quitting medicine—locums, hybrid, and part-time cardiology models.",
      proof: "Burnout-aware, cardiology recruiter clarity.",
      cta: "Explore next steps without judgment.",
    }),
  },
  "leaving-hospital-medicine": {
    title: "Leaving Employed Cardiology? Flexible Paths for Cardiologists",
    description: buildSerpDescription({
      hook: "Structured alternatives to quitting medicine—locums, hybrid, and part-time cardiology models.",
      proof: "Burnout-aware, cardiology recruiter clarity.",
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
  "what-is-a-locum-cardiologist": {
    title: "What Is a Locum Cardiologist? Definition & Role",
    description:
      "A locum cardiologist provides temporary cardiology coverage under contract. Learn duties, credentials, and how to find locum cardiology jobs. Contact Locum Career Hub.",
  },
  "locum-cardiologist-salary": {
    title: "Locum Cardiologist Salary Guide | Pay Ranges",
    description:
      "Directional locum cardiologist salary ranges by subspecialty, call, and state—not guaranteed offers. Compare rates and contact Locum Career Hub for recruiter context.",
  },
  "flexible-physician-careers": {
    title: "Flexible Cardiology Careers | Locums, Moonlighting & Blocks",
    description: buildSerpDescription({
      hook: "Design a cardiology schedule that fits your life—contract blocks, reads, and locum pathways.",
      proof: "Cardiologist-only recruiter support.",
      cta: "Start with a 30-minute intro.",
    }),
  },
};

export function landingSerpOverride(slug: string): { title: string; description: string } | undefined {
  return LANDING_SERP[slug];
}

export function buildHomeSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: HOME_TITLE,
    description: clampSerpDescription(HOME_DESCRIPTION),
    path: "/",
    keywords: [
      "locum tenens physician staffing",
      "locum cardiologist jobs",
      "cardiology locum jobs",
      "cardiologist recruiter",
    ],
  });
}

export function buildCardiologySpecialtySerpMetadata(spec: {
  name: string;
  metaDescription: string;
  pathSlug: string;
  titleKeyword: string;
}): Metadata {
  return buildSerpMetadata({
    title: specialtySerpTitle(spec.name),
    description: spec.metaDescription,
    path: cardiologySpecialtyPath(spec.pathSlug),
    keywords: [spec.titleKeyword, "locum cardiologist jobs", "cardiology locum tenens"],
  });
}

export function buildCardiologyHubSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: CARDIOLOGY_HUB_TITLE,
    description: clampSerpDescription(CARDIOLOGY_HUB_DESCRIPTION),
    path: "/locum-jobs/cardiology",
    keywords: ["locum cardiologist jobs", "cardiology locum tenens", "cardiologist recruiting"],
  });
}

/** High-impression state hubs from GSC — query-aligned titles for CTR recovery. */
const PRIORITY_STATE_SERP: Record<string, { title: string; hook: string; proof: string }> = {
  "new-york": {
    title: "NY Cardiology Locum Jobs | EP, Interventional & General",
    hook: "New York cardiology locum jobs by subspecialty—EP, interventional, and general consult/clinic blocks.",
    proof: "Metro privileging, STEMI networks, and licensing timelines explained.",
  },
  washington: {
    title: "Washington Cardiology Locum Jobs | Licensing & Call",
    hook: "Washington cardiologist locum jobs with clear cath lab, consult, and imaging expectations.",
    proof: "IMLC-friendly planning notes plus Pacific Northwest market context.",
  },
  california: {
    title: "California Cardiology Locum Jobs | Non-IMLC Planning",
    hook: "California cardiology locums with longer licensing lead times planned upfront.",
    proof: "Direct-board pathway notes for LA, Bay Area, San Diego, and Sacramento.",
  },
  texas: {
    title: "Texas Cardiology Locum Jobs | IMLC & Metro Blocks",
    hook: "Texas cardiologist locum jobs across Houston, Dallas, Austin, and San Antonio markets.",
    proof: "IMLC pathway plus call and stipend norms by metro.",
  },
  tennessee: {
    title: "Tennessee Cardiology Locum Jobs | Rates & Licensing",
    hook: "Tennessee cardiology locum coverage for community and regional systems.",
    proof: "Licensing, privileging, and travel vs local block tradeoffs.",
  },
};

export function buildStateSerpMetadata(stateName: string, slug: string): Metadata {
  const custom = PRIORITY_STATE_SERP[slug];
  return buildSerpMetadata({
    title: custom?.title ?? `Cardiologist Locum Jobs in ${stateName} (2026)`,
    description: buildSerpDescription({
      hook: custom?.hook ?? `${stateName} cardiologist locum jobs—cath lab, consult, clinic, and imaging blocks.`,
      proof: custom?.proof ?? "Privileging paths, metros, and call norms explained.",
      cta: `Calculate earning potential or request ${stateName} cardiology matches.`,
    }),
    path: `/locum-tenens-jobs/${slug}`,
    keywords: [
      `cardiologist locum jobs ${stateName}`,
      `cardiology locums ${stateName}`,
      `locum tenens jobs in ${stateName}`,
      "locum cardiologist jobs",
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
      proof: "Cardiologist-only recruiter—not a generic board.",
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
  "general-cardiology": {
    title: "General Cardiologist Locum Jobs | Consult & Clinic",
    hook: "General cardiology locums with consult census, echo reads, and call documented in writing.",
  },
  "interventional-cardiology": {
    title: "Interventional Cardiologist Locum Jobs | Cath Lab & STEMI",
    hook: "Interventional cardiology locums with STEMI activation, case mix, and backup clarified upfront.",
  },
  electrophysiology: {
    title: "EP Cardiologist Locum Jobs | Ablation & Devices",
    hook: "Electrophysiology locums with lab capabilities, device clinic load, and arrhythmia call defined.",
  },
  "heart-failure": {
    title: "Heart Failure Cardiologist Locum Jobs",
    hook: "Advanced heart failure locums with census, transplant-adjacent scope, and weekend coverage documented.",
  },
};

export function buildSpecialtySerpMetadata(name: string, slug: string): Metadata {
  const custom = SPECIALTY_SERP[slug];
  return buildSerpMetadata({
    title: custom?.title ?? `${name} Locum Jobs for Cardiologists`,
    description: buildSerpDescription({
      hook:
        custom?.hook ??
        `${name} locum and flexible contract work with clear volume, call, and malpractice terms.`,
      proof: "Compare travel vs local blocks by state.",
      cta: "Request cardiology matches—no spam.",
    }),
    path: `/specialties/${slug}`,
    keywords: [`${name} locum`, "cardiologist locum tenens", "cardiology locum jobs"],
  });
}

const GLOSSARY_SERP: Record<string, { title: string; hook: string; cta: string }> = {
  "locum-malpractice-insurance": {
    title: "Locum Malpractice Insurance & Tail for Cardiologists",
    hook: "How occurrence vs claims-made malpractice and tail coverage work for cardiology locum assignments.",
    cta: "Review contract flags, then talk with a cardiology specialist.",
  },
  credentialing: {
    title: "Physician Credentialing for Cardiology Locums",
    hook: "What credentialing means for locum cardiologists—and how it affects your real start date.",
    cta: "Estimate your timeline with the credentialing planner.",
  },
};

export function buildGlossarySerpMetadata(title: string, slug: string): Metadata {
  const custom = GLOSSARY_SERP[slug];
  return buildSerpMetadata({
    title: custom?.title ?? `What Is ${title}? Locum Tenens Definition`,
    description: buildSerpDescription({
      hook:
        custom?.hook ??
        `Plain-English definition of “${title}” for physicians exploring locum tenens and staffing.`,
      proof: "Educational guide—not legal or tax advice.",
      cta: custom?.cta ?? "Ready for matches? Submit your states & dates.",
    }),
    path: `/glossary/${slug}`,
    keywords: [title.toLowerCase(), "locum tenens glossary", "physician staffing terms"],
  });
}

export function buildToolsIndexSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Cardiologist Calculators | Pay, IMLC, Call & Offers",
    description: buildSerpDescription({
      hook: "Free cardiologist decision tools for locums earnings, IMLC eligibility, call burden, and offer comparison.",
      proof: "Evidence-versioned formulas with clear limitations.",
      cta: "Open a calculator—anonymous until you request follow-up.",
    }),
    path: "/tools",
    keywords: [
      "cardiologist calculator",
      "locum tenens income calculator",
      "locum vs employed calculator",
      "IMLC eligibility calculator",
    ],
  });
}

export function buildSalaryEstimatorSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Locum Tenens Income Calculator for Cardiologists",
    description: buildSerpDescription({
      hook: "Calculate cardiologist locums income by specialty, schedule, licenses, travel, and assignment style.",
      proof: "Personalized fit score, income scenarios, and career comparison—not a generic pay table.",
      cta: "Build your free earning report in under 2 minutes.",
    }),
    path: "/cardiologist-locums-calculator",
    keywords: [
      "locum tenens income calculator",
      "cardiologist locums calculator",
      "locum vs employed calculator",
      "cardiology locum tenens salary calculator",
    ],
  });
}

export function buildForPhysiciansSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Locum Tenens for Cardiologists | Burnout & Flexible Blocks",
    description: buildSerpDescription({
      hook: "Cardiology locum jobs when cath lab call and clinic load no longer fit your life.",
      proof: "Burnout-aware guides and cardiology subspecialty hubs.",
      cta: "Explore options—talk to a cardiology recruiter.",
    }),
    path: "/for-physicians",
    keywords: ["cardiologist locum tenens", "cardiologist burnout", "flexible cardiology careers"],
  });
}

export function buildLocumJobsHubSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Cardiologist Locum Jobs by State (2026) | All 50 States",
    description: buildSerpDescription({
      hook: "Browse cardiologist locum jobs in every US state—then open subspecialty guides.",
      proof: "Licensing, metros, and privileging context per state.",
      cta: "Pick your state and request cardiology matches.",
    }),
    path: "/locum-tenens-jobs",
    keywords: ["cardiologist locum jobs", "cardiology locum by state", "cardiologist locum tenens"],
  });
}

export function buildPhysicianOpportunitiesSerpMetadata(): Metadata {
  return buildSerpMetadata({
    title: "Cardiologist Locum Opportunities | Submit Preferences",
    description: buildSerpDescription({
      hook: "Tell us subspecialty, states, and dates—get realistic cardiology locum matches, not spam.",
      proof: "Cardiologist-only recruiter advocacy on rates and privileging.",
      cta: "Submit the form in 2 minutes.",
    }),
    path: "/physician-opportunities",
    keywords: ["cardiologist opportunities", "cardiology locum jobs", "cardiologist recruiter"],
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
