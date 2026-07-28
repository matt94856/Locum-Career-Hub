import type { ContentSection } from "@/lib/cardiology-seo/types";
import type { PageDef } from "@/lib/cardiology-seo/definitions";

/** Deep long-form body for /guides/{slug} pages (flagship editorial layer). */
export type EditorialGuideBody = {
  slug: string;
  /** When set, registers a new PageDef so the guide is routable. */
  pageDef?: Omit<PageDef, "slug"> & { slug?: string };
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
};

/** Long-form /resources article draft (merged into CARDIOLOGY_ARTICLES). */
export type EditorialResourceDraft = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  keywords: string[];
  relatedArticleSlugs: string[];
  relatedSpecialtyPathSlugs: string[];
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  lastUpdated?: string;
};
