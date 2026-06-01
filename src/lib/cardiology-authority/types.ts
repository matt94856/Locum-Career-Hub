import type { ContentSection } from "@/lib/cardiology-seo/types";

export type AuthoritySource = { label: string; href: string };

export type EeatMeta = {
  author: string;
  authorRole: string;
  reviewer: string;
  reviewerCredentials: string;
  lastUpdated: string;
  sources: AuthoritySource[];
};

export type CardiologyArticle = {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  keywords: string[];
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  relatedArticleSlugs: string[];
  relatedSpecialtyPathSlugs: string[];
  eeat: EeatMeta;
};

export type CardiologyPillarExtension = {
  pathSlug: string;
  directAnswer: string;
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  entityNotes?: string[];
  eeat: EeatMeta;
};

export type JobSeoPageContent = {
  stateSlug: string;
  stateName: string;
  specialtyPathSlug?: string;
  specialtyName?: string;
  title: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
};
