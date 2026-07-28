import type { PageDef } from "@/lib/cardiology-seo/definitions";
import {
  CAREER_PAGE_DEFS,
  COMPARISON_PAGE_DEFS,
  DATA_PAGE_DEFS,
  EMPLOYER_PAGE_DEFS,
  FAQ_PAGE_DEFS,
  LICENSING_PAGE_DEFS,
  PILLAR_PAGE_DEFS,
  SUBSPECIALTY_PAGE_DEFS,
  TAX_PAGE_DEFS,
} from "@/lib/cardiology-seo/definitions";
import type { EditorialGuideBody, EditorialResourceDraft } from "./types";
import { P0_GUIDES, P0_RESOURCES } from "./wave-p0";
import { P1_GUIDES, P1_RESOURCES } from "./wave-p1";
import { P2A_GUIDES, P2A_RESOURCES } from "./wave-p2a";
import { P2B_GUIDES, P2B_RESOURCES } from "./wave-p2b";
import { P3_GUIDES, P3_RESOURCES } from "./wave-p3";
import { GAP_GUIDES } from "./wave-gap";
import { DEEPEN_GUIDES } from "./wave-deepen";

export const ALL_EDITORIAL_GUIDES: EditorialGuideBody[] = [
  ...P0_GUIDES,
  ...P1_GUIDES,
  ...P2A_GUIDES,
  ...P2B_GUIDES,
  ...P3_GUIDES,
  ...GAP_GUIDES,
  ...DEEPEN_GUIDES,
];

export const ALL_EDITORIAL_RESOURCES: EditorialResourceDraft[] = [
  ...P0_RESOURCES,
  ...P1_RESOURCES,
  ...P2A_RESOURCES,
  ...P2B_RESOURCES,
  ...P3_RESOURCES,
];

const guideBodyBySlug = new Map(ALL_EDITORIAL_GUIDES.map((g) => [g.slug, g]));

export function getEditorialGuideBody(slug: string): EditorialGuideBody | undefined {
  return guideBodyBySlug.get(slug);
}

export function hasEditorialGuideBody(slug: string): boolean {
  return guideBodyBySlug.has(slug);
}

const EXISTING_GUIDE_SLUGS = new Set(
  [
    ...CAREER_PAGE_DEFS,
    ...SUBSPECIALTY_PAGE_DEFS,
    ...EMPLOYER_PAGE_DEFS,
    ...COMPARISON_PAGE_DEFS,
    ...FAQ_PAGE_DEFS,
    ...DATA_PAGE_DEFS,
    ...PILLAR_PAGE_DEFS,
    ...LICENSING_PAGE_DEFS,
    ...TAX_PAGE_DEFS,
  ].map((d) => d.slug),
);

/** New guide PageDefs that are not already in definitions.ts */
export function getEditorialPageDefs(): PageDef[] {
  const defs: PageDef[] = [];
  const seen = new Set<string>();
  for (const guide of ALL_EDITORIAL_GUIDES) {
    if (!guide.pageDef) continue;
    if (EXISTING_GUIDE_SLUGS.has(guide.slug) || seen.has(guide.slug)) continue;
    seen.add(guide.slug);
    defs.push({
      category: guide.pageDef.category,
      slug: guide.slug,
      h1: guide.pageDef.h1,
      title: guide.pageDef.title,
      description: guide.pageDef.description,
      topic: guide.pageDef.topic,
      keywords: guide.pageDef.keywords,
      geoLabel: guide.pageDef.geoLabel,
      stateSlug: guide.pageDef.stateSlug,
      showRecruiterTrust: guide.pageDef.showRecruiterTrust,
    });
  }
  return defs;
}

export function getEditorialGuideSlugs(): string[] {
  return ALL_EDITORIAL_GUIDES.map((g) => g.slug);
}

export function getEditorialStats() {
  return {
    guides: ALL_EDITORIAL_GUIDES.length,
    newGuideRoutes: getEditorialPageDefs().length,
    resources: ALL_EDITORIAL_RESOURCES.length,
  };
}
