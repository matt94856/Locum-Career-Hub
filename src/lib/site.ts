/** Brand mark (PNG); used in UI, metadata icons, and structured data. */
export const BRAND_LOGO_URL =
  "https://github.com/matt94856/Locum-Career-Hub/blob/main/public/locumcareerhublogo.png?raw=true" as const;

export const SITE = {
  name: "Locum Career Hub",
  domain: "LocumCareerHub.com",
  url: "https://www.locumcareerhub.com",
  tagline:
    "The modern physician career platform for flexibility, freedom, and balance—built for clinicians who are tired, stretched thin, or simply ready for a calmer path.",
  email: "matthewfuller389@gmail.com",
  phoneDisplay: "(352) 293-6242",
  phoneTel: "+13522936242",
  /** 30-minute intro calls — override with NEXT_PUBLIC_CALENDLY_URL if it changes */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/mattf94856/30min",
  /**
   * Default 1200×630 social preview is generated at `/opengraph-image` (see `app/opengraph-image.tsx`).
   * `BRAND_LOGO_URL` remains useful for UI + some structured data where a raster logo is expected.
   */
  ogImage: BRAND_LOGO_URL,
} as const;

/** Absolute URL to the default Open Graph / social preview PNG. */
export const SITE_OPEN_GRAPH_IMAGE = `${SITE.url}/opengraph-image` as const;

/** Lower-pressure CTAs used across the marketing site */
export const CTA = {
  explore: "Explore Opportunities",
  flexible: "See Flexible Options",
  recruiter: "Talk With a Physician Recruiter",
  learn: "Learn About Flexible Careers",
  schedule: "Find Your Ideal Schedule",
  bookCall: "Schedule a 30-minute intro call",
} as const;

export const NAV_LINKS = [
  { href: "/for-physicians", label: "For physicians" },
  { href: "/physician-opportunities", label: "Opportunities" },
  { href: "/specialties", label: "Specialties" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
