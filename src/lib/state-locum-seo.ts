import type { Metadata } from "next";
import { getStateNameBySlug } from "@/lib/us-state-slugs";
import { buildStateSerpMetadata } from "@/lib/serp-ctr";

export type StateLocumPage = {
  slug: string;
  stateName: string;
  code?: string;
  title: string;
  description: string;
  h1: string;
  h2: string;
  keywords: string[];
  answer: string;
  whoFor: string[];
  intro: string;
  bullets: string[];
  faqs: { q: string; a: string }[];
};

/** Legacy multi-specialty state copy removed—all states use cardiologist-only fallback below. */
export const STATE_LOCUM_PAGES: StateLocumPage[] = [];

/** All US states + DC — use for sitemaps and static generation. */
export { US_STATE_SLUGS as STATE_LOCUM_SLUGS } from "@/lib/us-state-slugs";

function buildFallbackStateLocumPage(slug: string, stateName: string): StateLocumPage {
  return {
    slug,
    stateName,
    title: `Cardiologist Locum Jobs ${stateName} | Cardiology Locums | Locum Career Hub`,
    description: `${stateName} cardiologist locum tenens jobs—cath lab, consult, clinic, and imaging blocks with credentialing context and recruiter advocacy. Cardiologists only.`,
    h1: `Cardiologist Locum Jobs in ${stateName}`,
    h2: `Cath lab, consult, and clinic coverage with documented call and privileging`,
    keywords: [
      `cardiologist locum ${stateName}`,
      `cardiology locum tenens ${stateName}`,
      "cardiologist locum jobs",
      "interventional cardiologist locum",
      "cardiologist recruiter",
    ],
    answer: `${stateName} cardiologist locum jobs are contract-based cardiology assignments—often inpatient consult, cath lab, clinic, or imaging coverage—where licensing, privileging, and call should be documented before you start.`,
    whoFor: [
      `Cardiologists (MD/DO) licensed or pursuing licensure in ${stateName}`,
      "Interventional, general, EP, and heart failure cardiologists comparing travel vs local blocks",
      "Cardiologists who want cath lab, consult census, and call rules in writing before day one",
    ],
    intro: `${stateName} cardiology programs use locum cardiologists for leave, volume growth, and service-line coverage. Locum Career Hub recruits cardiologists only—we connect you with hospitals and groups; we are not the employer—and we prioritize documented workload over vague promises.`,
    bullets: [
      "State licensing and cardiology privileging timelines discussed early",
      "Malpractice, travel stipends, and cancellation terms reviewed before you commit",
      "Subspecialty-aware cardiologist matching—not generic job-board blasts",
    ],
    faqs: [
      {
        q: `Do I need an active ${stateName} license before I inquire?`,
        a: "Requirements vary by assignment. Share your current licenses and target dates—we map realistic paths and interim options.",
      },
      {
        q: "Are cardiology locums only for travelers?",
        a: "No. Some cardiologists choose local block contracts; others prefer travel blocks. Distance should match your call and recovery needs.",
      },
      {
        q: "What speeds up cardiologist matching?",
        a: "Share subspecialty, states you will consider, availability, travel appetite, and hard boundaries (STEMI call, consult census, clinic panel).",
      },
    ],
  };
}

export function getStateLocumPage(slug: string): StateLocumPage | undefined {
  const rich = STATE_LOCUM_PAGES.find((p) => p.slug === slug);
  if (rich) return rich;
  const stateName = getStateNameBySlug(slug);
  if (!stateName) return undefined;
  return buildFallbackStateLocumPage(slug, stateName);
}

export function buildStateLocumMetadata(page: StateLocumPage): Metadata {
  return buildStateSerpMetadata(page.stateName, page.slug);
}
