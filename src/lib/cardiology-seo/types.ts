/** flagship = deep content for SEO/AI; standard = templated long-tail */
export type ContentTier = "flagship" | "enhanced" | "standard";

export type CardiologySeoCategory =
  | "money"
  | "state"
  | "city"
  | "salary"
  | "licensing"
  | "tax"
  | "career"
  | "subspecialty"
  | "employer"
  | "comparison"
  | "faq"
  | "data"
  | "pillar";

export type ContentSection = { h2: string; paragraphs: string[] };

export type CardiologySeoPage = {
  category: CardiologySeoCategory;
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  h2: string;
  keywords: string[];
  directAnswer: string;
  intro: string;
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  relatedLinks: { href: string; title: string }[];
  /** Shown on state/city pages — e.g. "Florida" */
  geoLabel?: string;
  showRecruiterTrust?: boolean;
  contentTier?: ContentTier;
  /** Thin city pages: index only priority metros */
  noindex?: boolean;
};
