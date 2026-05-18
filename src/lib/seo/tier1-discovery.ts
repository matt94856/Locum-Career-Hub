/**
 * Tier 1 URLs — prioritized from Search Console impressions & near–page-one positions.
 * Used for internal linking (homepage hub, footer, hubs) to concentrate crawl equity and conversions.
 */

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

/** Highest-leverage pages: near page 1 in GSC or strong query match. */
export const TIER1_PRIORITY_LINKS: Tier1Link[] = [
  {
    href: "/physician-opportunities",
    title: "Submit preferences & get locum matches",
    shortTitle: "Get matched (lead form)",
    description: "Share specialty, states, and dates—physician recruiter follow-up, not a job-board blast.",
    ctaLabel: "Start matching →",
    badge: "Best for leads",
  },
  {
    href: "/tools/locum-salary-estimator",
    title: "Free locum salary calculator",
    shortTitle: "Locum salary calculator",
    description: "Model weekly gross ranges—matches “locum tenens income calculator” searches.",
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
    href: "/physician-travel-jobs",
    title: "Travel physician jobs",
    shortTitle: "Travel physician jobs",
    description: "Stipends, blocks, and handoffs explained—high travel-job search volume.",
    ctaLabel: "Explore travel roles →",
    badge: "Trending",
  },
  {
    href: "/leaving-hospital-medicine",
    title: "Leaving hospital medicine?",
    shortTitle: "Leaving hospital medicine",
    description: "Structured paths without quitting medicine—currently ranking ~page 1.",
    ctaLabel: "Read guide →",
    badge: "Page 1 potential",
  },
  {
    href: "/physician-burnout-alternatives",
    title: "Physician burnout alternatives",
    shortTitle: "Burnout alternatives",
    description: "Locums, hybrid work, and defined blocks when the week no longer fits.",
    ctaLabel: "See options →",
    badge: "Page 1 potential",
  },
  {
    href: "/moonlighting-physician-jobs",
    title: "Moonlighting physician jobs",
    shortTitle: "Moonlighting jobs",
    description: "Weekend, telehealth, and local ED blocks around your primary job.",
    ctaLabel: "Moonlighting guide →",
  },
  {
    href: "/hospitalist-locum-jobs",
    title: "Hospitalist locum jobs",
    shortTitle: "Hospitalist locums",
    description: "Census, call, and backup documented before you commit.",
    ctaLabel: "Hospitalist guide →",
  },
];

export const TIER1_STATE_LINKS: Tier1Link[] = [
  {
    href: "/locum-tenens-jobs/new-york",
    title: "Locum tenens jobs in New York",
    shortTitle: "New York",
    description: "Metro and upstate demand with licensing context.",
    ctaLabel: "NY guide →",
    badge: "High impressions",
  },
  {
    href: "/locum-tenens-jobs/tennessee",
    title: "Locum tenens jobs in Tennessee",
    shortTitle: "Tennessee",
    description: "Nashville, Memphis, and community hospital coverage.",
    ctaLabel: "TN guide →",
    badge: "High impressions",
  },
  {
    href: "/locum-tenens-jobs/washington",
    title: "Locum tenens jobs in Washington",
    shortTitle: "Washington",
    description: "Seattle, Spokane, and Pacific Northwest blocks.",
    ctaLabel: "WA guide →",
    badge: "High impressions",
  },
  {
    href: "/locum-tenens-jobs/florida",
    title: "Locum tenens jobs in Florida",
    shortTitle: "Florida",
    description: "Seasonal volume, licensing, and coastal vs inland fit.",
    ctaLabel: "FL guide →",
  },
  {
    href: "/locum-tenens-jobs/texas",
    title: "Locum tenens jobs in Texas",
    shortTitle: "Texas",
    description: "Metro depth and community impact statewide.",
    ctaLabel: "TX guide →",
  },
  {
    href: "/locum-tenens-jobs/california",
    title: "Locum tenens jobs in California",
    shortTitle: "California",
    description: "Compliance-forward placements north and south.",
    ctaLabel: "CA guide →",
  },
];

export const TIER1_SPECIALTY_LINKS: Tier1Link[] = [
  {
    href: "/specialties/telehealth",
    title: "Telemedicine locum jobs",
    shortTitle: "Telehealth locums",
    description: "Multi-state licensing and visit-pace clarity.",
    ctaLabel: "Telehealth →",
    badge: "High impressions",
  },
  {
    href: "/specialties/family-medicine",
    title: "Family medicine locum jobs",
    shortTitle: "Family medicine",
    description: "Outpatient pace, panel size, and scope in writing.",
    ctaLabel: "Family medicine →",
    badge: "Strong position",
  },
  {
    href: "/specialties/hospitalist-medicine",
    title: "Hospitalist locum jobs",
    shortTitle: "Hospitalist",
    description: "Census caps, nocturnist lanes, and cross-cover rules.",
    ctaLabel: "Hospitalist →",
  },
  {
    href: "/specialties/emergency-medicine",
    title: "Emergency medicine locum jobs",
    shortTitle: "Emergency medicine",
    description: "Volume bands, boarding, and acuity mix.",
    ctaLabel: "EM locums →",
  },
];

export const TIER1_GLOSSARY_LINKS: Tier1Link[] = [
  {
    href: "/glossary/locum-tenens",
    title: "What is locum tenens?",
    shortTitle: "Locum tenens definition",
    description: "Plain-English definition for physicians and semantic search.",
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
    title: "Pages physicians find in search right now",
    subtitle:
      "These URLs already earn impressions in Google Search Console—we link to them prominently so users and crawlers find your best answers fast.",
    links: TIER1_PRIORITY_LINKS,
  },
  {
    id: "states",
    eyebrow: "High-demand states",
    title: "Locum tenens jobs by state",
    subtitle: "State hubs with licensing, metros, and specialty drill-downs.",
    links: TIER1_STATE_LINKS,
  },
  {
    id: "specialties",
    eyebrow: "Specialties",
    title: "Locum coverage by specialty",
    subtitle: "Specialty overviews plus state-specific combo pages from each hub.",
    links: TIER1_SPECIALTY_LINKS,
  },
  {
    id: "glossary",
    eyebrow: "Definitions",
    title: "Glossary physicians search before they apply",
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
    title: "National locum tenens jobs guide",
    shortTitle: "National locum guide",
    description: "",
  },
  {
    href: "/for-physicians",
    title: "For physicians hub",
    shortTitle: "For physicians",
    description: "",
  },
];

export const LEAD_FORM_HREF = "/physician-opportunities#lead-form" as const;
export const HOME_LEAD_ANCHOR = "#get-matched" as const;
