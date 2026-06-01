import {
  buildCityPageDefs,
  buildStatePageDefs,
  CAREER_PAGE_DEFS,
  COMPARISON_PAGE_DEFS,
  DATA_PAGE_DEFS,
  EMPLOYER_PAGE_DEFS,
  FAQ_PAGE_DEFS,
  LICENSING_PAGE_DEFS,
  MONEY_PAGE_DEFS,
  PILLAR_PAGE_DEFS,
  SALARY_PAGE_DEFS,
  SUBSPECIALTY_PAGE_DEFS,
  TAX_PAGE_DEFS,
} from "@/lib/cardiology-seo/definitions";
import { buildAllStateSalaryDefs } from "@/lib/cardiology-seo/state-salary-content";
import { buildPageFromDef } from "@/lib/cardiology-seo/build-page";
import type { CardiologySeoPage } from "@/lib/cardiology-seo/types";

const ALL_DEFS = [
  ...MONEY_PAGE_DEFS,
  ...buildStatePageDefs(),
  ...buildCityPageDefs(),
  ...SALARY_PAGE_DEFS,
  ...buildAllStateSalaryDefs(),
  ...LICENSING_PAGE_DEFS,
  ...TAX_PAGE_DEFS,
  ...CAREER_PAGE_DEFS,
  ...SUBSPECIALTY_PAGE_DEFS,
  ...EMPLOYER_PAGE_DEFS,
  ...COMPARISON_PAGE_DEFS,
  ...FAQ_PAGE_DEFS,
  ...DATA_PAGE_DEFS,
  ...PILLAR_PAGE_DEFS,
];

const PAGES: CardiologySeoPage[] = ALL_DEFS.map(buildPageFromDef);
const byPath = new Map(PAGES.map((p) => [p.path, p]));

export function getAllCardiologySeoPages(): CardiologySeoPage[] {
  return PAGES;
}

export function getCardiologySeoPageByPath(path: string): CardiologySeoPage | undefined {
  return byPath.get(path);
}

export function getCardiologySeoPagesByCategory(
  category: CardiologySeoPage["category"],
): CardiologySeoPage[] {
  return PAGES.filter((p) => p.category === category);
}

export function getCardiologySeoPaths(): string[] {
  return PAGES.map((p) => p.path);
}

export function getCardiologySeoPageCount(): number {
  return PAGES.length;
}

export function getFlagshipPageCount(): number {
  return PAGES.filter((p) => p.contentTier === "flagship" && !p.noindex).length;
}

export function getIndexableCardiologySeoPaths(): string[] {
  return PAGES.filter((p) => !p.noindex).map((p) => p.path);
}

/** Slugs for dynamic route segments (without category prefix). */
export function getMoneySlugs(): string[] {
  return PAGES.filter((p) => p.category === "money").map((p) => p.slug);
}

export function getStateSlugs(): string[] {
  return PAGES.filter((p) => p.category === "state").map((p) => p.slug);
}

export function getCitySlugs(): string[] {
  return PAGES.filter((p) => p.category === "city").map((p) => p.slug);
}

export function getSalarySlugs(): string[] {
  return PAGES.filter((p) => p.category === "salary").map((p) => p.slug);
}

export function getGuideSlugs(): string[] {
  return PAGES.filter((p) => p.category !== "money" && p.category !== "state" && p.category !== "city" && p.category !== "salary").map(
    (p) => p.slug,
  );
}

export function getPageByMoneySlug(slug: string) {
  return PAGES.find((p) => p.category === "money" && p.slug === slug);
}

export function getPageByStateSlug(slug: string) {
  return PAGES.find((p) => p.category === "state" && p.slug === slug);
}

export function getPageByCitySlug(slug: string) {
  return PAGES.find((p) => p.category === "city" && p.slug === slug);
}

export function getPageBySalarySlug(slug: string) {
  return PAGES.find((p) => p.category === "salary" && p.slug === slug);
}

export function getPageByGuideSlug(slug: string) {
  return PAGES.find(
    (p) =>
      p.slug === slug &&
      p.category !== "money" &&
      p.category !== "state" &&
      p.category !== "city" &&
      p.category !== "salary",
  );
}
