import { buildCoreSections, buildFaqs } from "@/lib/cardiology-seo/rich-content";
import type { PageDef } from "@/lib/cardiology-seo/definitions";
import {
  buildMetroRichSections,
  getMetroRichProfile,
  isPriorityMetroSlug,
} from "@/lib/cardiology-seo/metro-rich-data";
import { getPillarDeepContent, PILLAR_SLUGS } from "@/lib/cardiology-seo/pillar-content";
import {
  buildStateSalaryFaqs,
  buildStateSalarySections,
} from "@/lib/cardiology-seo/state-salary-content";
import type { CardiologySeoPage, ContentTier } from "@/lib/cardiology-seo/types";

function pathFor(def: PageDef): string {
  switch (def.category) {
    case "money":
      return `/cardiology-locum-jobs/${def.slug}`;
    case "state":
      return `/states/${def.slug}`;
    case "city":
      return `/cities/${def.slug}`;
    case "salary":
      return `/salary/${def.slug}`;
    default:
      return `/guides/${def.slug}`;
  }
}

function resolveContentTier(def: PageDef): ContentTier {
  if (PILLAR_SLUGS.has(def.slug)) return "flagship";
  if (def.category === "salary" && def.slug.startsWith("cardiologist-salary-")) return "flagship";
  if (def.category === "city" && isPriorityMetroSlug(def.slug)) return "flagship";
  if (def.category === "state") return "enhanced";
  if (def.category === "money") return "enhanced";
  return "standard";
}

function defaultRelatedLinks(def: PageDef): { href: string; title: string }[] {
  const links: { href: string; title: string }[] = [
    { href: "/physician-opportunities#lead-form", title: "Submit cardiologist inquiry" },
    { href: "/cardiology-locum-jobs", title: "Cardiology locum jobs hub" },
    { href: "/tools/locum-salary-estimator", title: "Locum salary estimator" },
  ];
  if (def.stateSlug) {
    links.push({
      href: `/states/${def.stateSlug}-cardiology-locum-jobs`,
      title: `${def.geoLabel ?? def.stateSlug} cardiology locums`,
    });
    links.push({
      href: `/salary/cardiologist-salary-${def.stateSlug}`,
      title: `${def.geoLabel ?? def.stateSlug} cardiologist salary guide`,
    });
    links.push({
      href: `/guides/how-to-get-a-${def.stateSlug}-medical-license`,
      title: `${def.geoLabel} medical license guide`,
    });
  }
  return links.slice(0, 7);
}

function buildEnrichedSections(def: PageDef, path: string): CardiologySeoPage["sections"] {
  if (def.category === "salary" && def.slug.startsWith("cardiologist-salary-") && def.geoLabel) {
    const rich = buildStateSalarySections(def.geoLabel);
    if (rich) return rich;
  }

  if (def.category === "city") {
    const metro = getMetroRichProfile(def.slug);
    if (metro) {
      return [...buildMetroRichSections(metro), ...buildCoreSections({
        seed: path,
        topic: def.topic,
        geoLabel: def.geoLabel,
        category: def.category,
      }).slice(0, 1)];
    }
  }

  if (PILLAR_SLUGS.has(def.slug)) {
    const pillar = getPillarDeepContent(def.slug);
    if (pillar) return pillar.sections;
  }

  return buildCoreSections({
    seed: path,
    topic: def.topic,
    geoLabel: def.geoLabel,
    category: def.category,
  });
}

function buildEnrichedFaqs(def: PageDef, path: string): CardiologySeoPage["faqs"] {
  if (def.category === "salary" && def.slug.startsWith("cardiologist-salary-") && def.geoLabel) {
    return buildStateSalaryFaqs(def.geoLabel);
  }

  const base = buildFaqs({ seed: path, geoLabel: def.geoLabel, topic: def.topic });
  if (PILLAR_SLUGS.has(def.slug)) {
    const pillar = getPillarDeepContent(def.slug);
    if (pillar?.extraFaqs.length) return [...base, ...pillar.extraFaqs];
  }
  return base;
}

export function buildPageFromDef(def: PageDef): CardiologySeoPage {
  const path = pathFor(def);
  const seed = path;
  const geo = def.geoLabel;
  const tier = resolveContentTier(def);

  const directAnswer =
    def.category === "state" || def.category === "city"
      ? `${def.h1} are contract-based cardiology assignments in ${geo ?? "selected regions"} where licensing, privileging, and call should be documented before you start. Locum Career Hub is a cardiologist-only recruiting service—we are not the hospital employer.`
      : def.category === "salary" && def.slug.startsWith("cardiologist-salary-")
        ? `${def.h1} depends on subspecialty, call burden, acuity, and whether the role is locum or employed. This page explains market drivers in ${geo ?? "the state"}—not a guaranteed compensation offer.`
        : `${def.h1}—educational context for cardiologists exploring locum tenens. Locum Career Hub recruits MD/DO cardiologists and connects you with hospitals and groups when mutual fit exists.`;

  const intro =
    def.category === "state" || def.category === "city"
      ? `Cardiology programs in ${geo ?? "this market"} periodically need locum coverage for leave, volume growth, and service-line expansion. This page explains what to document before you accept a block—and how our inquiry process works. When you submit the form with ${geo ? `${geo} among your ` : ""}preferred states, a cardiology recruiter will review your subspecialty and timeline. If there are realistic opportunities in the areas you selected, we will reach out shortly (typically within one business day). If nothing fits, we will tell you directly.`
      : def.category === "salary" && def.slug.startsWith("cardiologist-salary-")
        ? `Cardiologists comparing offers in ${geo ?? "this state"} need more than a single number from a forum post. This guide explains how subspecialty, STEMI call, consult census, clinic panels, and licensing timelines interact with compensation—employed and locum. Figures are directional market context, not promises.`
        : PILLAR_SLUGS.has(def.slug)
          ? `This pillar guide is a long-form reference for cardiologists. It is educational—not medical, legal, or tax advice. For recruiter-led matching after you read it, submit an inquiry with your subspecialty and preferred states.`
          : `This guide covers ${def.topic} for cardiologists considering locum tenens. We recruit cardiologists only—not other physician specialties. Content is educational, not medical, legal, or tax advice.`;

  const h2Variants = [
    "Cardiologist-only recruiting with documented expectations",
    "Compare call, cath lab scope, and privileging before you commit",
    "Recruiter follow-up when opportunities match your selected states",
  ];

  const sections = buildEnrichedSections(def, path);
  const faqs = buildEnrichedFaqs(def, path);

  return {
    category: def.category,
    slug: def.slug,
    path,
    title: def.title,
    metaDescription: def.description,
    h1: def.h1,
    h2: h2Variants[Math.abs(seed.length) % h2Variants.length]!,
    keywords: def.keywords,
    directAnswer,
    intro,
    sections,
    faqs,
    relatedLinks: defaultRelatedLinks(def),
    geoLabel: geo,
    showRecruiterTrust:
      def.showRecruiterTrust ?? (def.category === "state" || def.category === "city" || def.slug.startsWith("cardiologist-salary-")),
    contentTier: tier,
    noindex: def.category === "city" && !isPriorityMetroSlug(def.slug),
  };
}
