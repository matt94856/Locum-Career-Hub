export type OpenJobTrack = "non-invasive" | "interventional" | "electrophysiology";
export type OpenJobKind = "direct" | "vms";

export type OpenJobDraft = {
  slug: string;
  state: string;
  stateSlug: string;
  region: string;
  track: OpenJobTrack;
  kind: OpenJobKind;
  datePosted: string;
  need: string;
  setting: string;
  schedule: string;
  call: string;
  /** SERP title segment before the brand (keep near 50 characters). */
  metaTitle: string;
  /** Unique clinical/context paragraph so pages are not interchangeable. */
  angle: string;
  compensation?: string;
  extraRequirements?: string[];
  extraBenefits?: string[];
  extraFaqs?: { q: string; a: string }[];
};
