/**
 * Tier 1 URLs — prioritized internal links for cardiologist-only SEO.
 */

import { SPECIALTY_SEO_SLUGS, getSpecialtyNameBySlug } from "@/lib/specialty-seo";

export type Tier1Link = {
  href: string;
  title: string;
  description: string;
  ctaLabel?: string;
  /** Short label for footer / compact lists */
  shortTitle?: string;
  badge?: string;
};

export type Tier1Group = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  links: Tier1Link[];
};

/** Highest-leverage pages for cardiologists. */
export const TIER1_PRIORITY_LINKS: Tier1Link[] = [
  {
    href: "/physician-opportunities",
    title: "Submit preferences & get cardiology matches",
    shortTitle: "Get matched (lead form)",
    description: "Share subspecialty, states, and dates—cardiology recruiter follow-up, not a job-board blast.",
    ctaLabel: "Start matching →",
    badge: "Best for leads",
  },
  {
    href: "/tools/locum-salary-estimator",
    title: "Cardiology locum salary calculator",
    shortTitle: "Locum salary calculator",
    description: "Model weekly gross ranges for cardiologist locums—educational, not a guaranteed offer.",
    ctaLabel: "Run calculator →",
    badge: "Top search query",
  },
  {
    href: "/tools/w2-vs-1099-physician",
    title: "Locum vs employed & W-2 vs 1099",
    shortTitle: "W-2 vs 1099 calculator",
    description: "Compare structures before you sign—educational, not tax advice.",
    ctaLabel: "Compare pay →",
    badge: "Top search query",
  },
  {
    href: "/cardiologist-travel-locums",
    title: "Travel cardiologist locum jobs",
    shortTitle: "Travel cardiology locums",
    description: "Stipends, cath lab call, and STEMI rules documented before you commit.",
    ctaLabel: "Explore travel roles →",
    badge: "Trending",
  },
  {
    href: "/leaving-employed-cardiology",
    title: "Leaving employed cardiology?",
    shortTitle: "Leaving employed cardiology",
    description: "Structured paths without quitting medicine—locums as a bridge when it fits.",
    ctaLabel: "Read guide →",
    badge: "Career transition",
  },
  {
    href: "/physician-burnout-alternatives",
    title: "Cardiologist burnout alternatives",
    shortTitle: "Burnout alternatives",
    description: "Locums, hybrid blocks, and defined call when the week no longer fits.",
    ctaLabel: "See options →",
    badge: "Problem-aware",
  },
  {
    href: "/interventional-cardiologist-locum-jobs",
    title: "Interventional cardiologist locum jobs",
    shortTitle: "Interventional locums",
    description: "STEMI activation, cath lab scope, and backup in writing.",
    ctaLabel: "Interventional guide →",
  },
  {
    href: "/cardiology-locum-jobs",
    title: "Cardiology locum jobs hub",
    shortTitle: "Cardiology locum jobs",
    description: "Money pages by subspecialty—general, interventional, EP, heart failure, and more.",
    ctaLabel: "Browse job types →",
  },
];

export const TIER1_STATE_LINKS: Tier1Link[] = [
  {
    href: "/locum-tenens-jobs/new-york",
    title: "Cardiologist locum jobs in New York",
    shortTitle: "New York",
    description: "Metro and upstate cardiology demand with licensing context.",
    ctaLabel: "NY guide →",
    badge: "High impressions",
  },
  {
    href: "/locum-tenens-jobs/tennessee",
    title: "Cardiologist locum jobs in Tennessee",
    shortTitle: "Tennessee",
    description: "Nashville, Memphis, and community cath lab / consult coverage.",
    ctaLabel: "TN guide →",
    badge: "High impressions",
  },
  {
    href: "/locum-tenens-jobs/washington",
    title: "Cardiologist locum jobs in Washington",
    shortTitle: "Washington",
    description: "Seattle, Spokane, and Pacific Northwest cardiology blocks.",
    ctaLabel: "WA guide →",
    badge: "High impressions",
  },
  {
    href: "/locum-tenens-jobs/florida",
    title: "Cardiologist locum jobs in Florida",
    shortTitle: "Florida",
    description: "Seasonal volume, licensing, and coastal vs inland fit.",
    ctaLabel: "FL guide →",
  },
  {
    href: "/locum-tenens-jobs/texas",
    title: "Cardiologist locum jobs in Texas",
    shortTitle: "Texas",
    description: "Metro depth and community cardiology statewide.",
    ctaLabel: "TX guide →",
  },
  {
    href: "/locum-tenens-jobs/california",
    title: "Cardiologist locum jobs in California",
    shortTitle: "California",
    description: "Compliance-forward cardiology placements north and south.",
    ctaLabel: "CA guide →",
  },
];

export const TIER1_SPECIALTY_LINKS: Tier1Link[] = SPECIALTY_SEO_SLUGS.map((slug) => {
  const name = getSpecialtyNameBySlug(slug) ?? slug;
  return {
    href: `/specialties/${slug}`,
    title: `${name} locum jobs`,
    shortTitle: name,
    description: `Cardiologist locum coverage for ${name.toLowerCase()}—call, scope, and privileging in writing.`,
    ctaLabel: `${name} →`,
  };
});

export const TIER1_GLOSSARY_LINKS: Tier1Link[] = [
  {
    href: "/glossary/locum-tenens",
    title: "What is locum tenens?",
    shortTitle: "Locum tenens definition",
    description: "Plain-English definition for cardiologists exploring locum tenens.",
    ctaLabel: "Read definition →",
  },
  {
    href: "/glossary/credentialing",
    title: "Credentialing explained",
    shortTitle: "Credentialing",
    description: "Timelines, owners, and what speeds up hospital start dates.",
    ctaLabel: "Credentialing guide →",
    badge: "High impressions",
  },
  {
    href: "/glossary/locum-tenens-pay",
    title: "Locum tenens pay & rates",
    shortTitle: "Locum pay",
    description: "Weekly rates, stipends, and what to document in contracts.",
    ctaLabel: "Pay overview →",
  },
  {
    href: "/glossary/vms-vendor-management-system",
    title: "What is a VMS in staffing?",
    shortTitle: "VMS (staffing)",
    description: "Vendor management systems—how they affect locum workflows.",
    ctaLabel: "VMS guide →",
  },
];

export const TIER1_HUB_GROUPS: Tier1Group[] = [
  {
    id: "priority",
    eyebrow: "Start here",
    title: "Pages cardiologists find in search",
    subtitle:
      "High-intent cardiology hubs and tools—we link to them prominently so users and crawlers find cardiologist-specific answers fast.",
    links: TIER1_PRIORITY_LINKS,
  },
  {
    id: "states",
    eyebrow: "High-demand states",
    title: "Cardiologist locum jobs by state",
    subtitle: "State hubs with licensing, metros, and subspecialty drill-downs.",
    links: TIER1_STATE_LINKS,
  },
  {
    id: "specialties",
    eyebrow: "Cardiology subspecialties",
    title: "Locum coverage by cardiology subspecialty",
    subtitle: "Subspecialty overviews plus state-specific combo pages from each hub.",
    links: TIER1_SPECIALTY_LINKS,
  },
  {
    id: "glossary",
    eyebrow: "Definitions",
    title: "Glossary cardiologists search before they apply",
    subtitle: "Educational terms that match definition queries—then a clear path to matches.",
    links: TIER1_GLOSSARY_LINKS,
  },
];

/** Footer “Popular searches” — compact set for every page. */
export const TIER1_FOOTER_LINKS: Tier1Link[] = [
  ...TIER1_PRIORITY_LINKS.slice(0, 4),
  ...TIER1_STATE_LINKS.slice(0, 3),
  {
    href: "/national-locum-tenens-jobs-guide",
    title: "National cardiology locum guide",
    shortTitle: "National cardiology guide",
    description: "",
  },
  {
    href: "/for-physicians",
    title: "For cardiologists hub",
    shortTitle: "For cardiologists",
    description: "",
  },
];

export const LEAD_FORM_HREF = "/physician-opportunities#lead-form" as const;
export const HOME_LEAD_ANCHOR = "#get-matched" as const;
