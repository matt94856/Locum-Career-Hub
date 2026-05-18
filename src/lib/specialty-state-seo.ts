import type { Metadata } from "next";
import { buildSpecialtyStateSerpMetadata } from "@/lib/serp-ctr";

export function specialtyStatePath(stateSlug: string, specialtySlug: string) {
  return `/locum-tenens-jobs/${stateSlug}/${specialtySlug}`;
}

export function buildSpecialtyStateMetadata(input: {
  stateSlug: string;
  stateName: string;
  specialtySlug: string;
  specialtyName: string;
}): Metadata {
  return buildSpecialtyStateSerpMetadata(input);
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
