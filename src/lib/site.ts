/** Brand mark (PNG); used in UI, metadata icons, and structured data. */
export const BRAND_LOGO_URL =
  "https://github.com/matt94856/Locum-Career-Hub/blob/main/public/locumcareerhublogo.png?raw=true" as const;

export const SITE = {
  name: "Locum Career Hub",
  domain: "LocumCareerHub.com",
  url: "https://www.locumcareerhub.com",
  tagline:
    "Cardiologist locum tenens recruiting—with transparent expectations, credentialing clarity, and calm next steps for MD/DO cardiologists exploring flexible cardiology work.",
  email: "matthewfuller389@gmail.com",
  phoneDisplay: "(352) 293-6242",
  phoneTel: "+13522936242",
  /** Override with `NEXT_PUBLIC_CALENDLY_URL` in Netlify / `.env.local` if the booking link changes. */
  calendlyUrl:
    (process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/matthewfuller389/30min").trim() ||
    "https://calendly.com/matthewfuller389/30min",
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
  explore: "Explore cardiology locums",
  flexible: "See flexible cardiology blocks",
  recruiter: "Talk with a cardiology recruiter",
  learn: "Learn about cardiologist locums",
  schedule: "Find your ideal block schedule",
  bookCall: "Schedule a 30-minute intro call",
} as const;

export const NAV_LINKS = [
  { href: "/#cardiologist-guides", label: "Cardiologist guides" },
  { href: "/physician-opportunities", label: "Opportunities" },
  { href: "/locum-jobs/cardiology", label: "Cardiology jobs" },
  { href: "/states", label: "By state" },
  { href: "/cities", label: "By city" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
