import type { Metadata } from "next";
import { socialShareMetadata } from "@/lib/social-metadata";
import { SITE } from "@/lib/site";

export function specialtyStatePath(stateSlug: string, specialtySlug: string) {
  return `/locum-tenens-jobs/${stateSlug}/${specialtySlug}`;
}

export function buildSpecialtyStateMetadata(input: {
  stateSlug: string;
  stateName: string;
  specialtySlug: string;
  specialtyName: string;
}): Metadata {
  const { stateName, specialtyName, stateSlug, specialtySlug } = input;
  const path = specialtyStatePath(stateSlug, specialtySlug);
  const title = `${specialtyName} Locum Jobs ${stateName} | Locum Tenens | ${SITE.name}`;
  const description = `${stateName} locum tenens and flexible ${specialtyName} roles—credentialing context, realistic scheduling, and recruiter advocacy (not generic job-board noise).`;
  return {
    title,
    description,
    alternates: { canonical: path },
    keywords: [
      `${specialtyName} locum ${stateName}`,
      `locum tenens ${stateName}`,
      `${specialtyName} physician jobs`,
      "locum physician jobs",
      "physician staffing agency",
      "locum tenens recruiter",
    ],
    ...socialShareMetadata({ title, description, path }),
  };
}

export function buildSpecialtyStateFaqs(specialtyName: string, stateName: string) {
  return [
    {
      q: `What does ${specialtyName} locum work look like in ${stateName}?`,
      a: `Assignments vary by facility, but the non-negotiable is documentation: census or volume targets, backup and call, malpractice, stipends, and start dates. We help you compare ${stateName} options that match your boundaries—not just headline rates.`,
    },
    {
      q: `Do I need a ${stateName} license before I inquire?`,
      a: "Not always. Share your current licenses, compact status, and target start window. We map realistic timelines and interim options based on your footprint.",
    },
    {
      q: "How is this different from a job board?",
      a: "You still choose what you pursue—but you get recruiter-led context on fit, credentialing pacing, and contract norms so you are not guessing alone at night.",
    },
  ] as const;
}
