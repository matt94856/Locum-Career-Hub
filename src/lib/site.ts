/** Brand mark (PNG); used in UI, metadata icons, and structured data. */
export const BRAND_LOGO_URL =
  "https://github.com/matt94856/Locum-Career-Hub/blob/main/public/locumcareerhublogo.png?raw=true" as const;

export const SITE = {
  name: "Locum Career Hub",
  domain: "LocumCareerHub.com",
  url: "https://www.locumcareerhub.com",
  tagline:
    "The modern career hub for physicians seeking flexibility, freedom, higher income, and better work-life balance through locum tenens.",
  email: "physicians@locumcareerhub.com",
  phoneDisplay: "(800) 555-0199",
  phoneTel: "+18005550199",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/locum-career-hub/recruiter",
  /** Default OG / social preview image */
  ogImage: BRAND_LOGO_URL,
} as const;

export const NAV_LINKS = [
  { href: "/physician-opportunities", label: "Opportunities" },
  { href: "/specialties", label: "Specialties" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
