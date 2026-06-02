import { US_STATES } from "@/lib/states";

export type CredentialingTier = "fast" | "moderate" | "extended";

export type StateCredentialingEstimate = {
  stateName: string;
  tier: CredentialingTier;
  licenseWeeks: string;
  privilegingWeeks: string;
  notes: string;
};

const FAST_STATES = new Set([
  "Florida",
  "Texas",
  "Arizona",
  "Tennessee",
  "Indiana",
  "Missouri",
  "Alabama",
  "Idaho",
]);

const EXTENDED_STATES = new Set([
  "California",
  "New York",
  "Massachusetts",
  "New Jersey",
  "Oregon",
  "Washington",
  "Illinois",
]);

function tierForState(name: string): CredentialingTier {
  if (FAST_STATES.has(name)) return "fast";
  if (EXTENDED_STATES.has(name)) return "extended";
  return "moderate";
}

function weeksForTier(tier: CredentialingTier, kind: "license" | "privilege"): string {
  if (kind === "license") {
    if (tier === "fast") return "2–6 weeks";
    if (tier === "extended") return "8–16+ weeks";
    return "4–10 weeks";
  }
  if (tier === "fast") return "4–8 weeks";
  if (tier === "extended") return "8–14+ weeks";
  return "6–12 weeks";
}

export function getCredentialingEstimate(stateName: string): StateCredentialingEstimate | undefined {
  if (!US_STATES.includes(stateName as (typeof US_STATES)[number])) return undefined;
  const tier = tierForState(stateName);
  const notes =
    tier === "extended"
      ? "Plan early for hospital privileging committees, background checks, and references—metro academic sites often run longer."
      : tier === "fast"
        ? "Often quicker for experienced cardiologists with clean files—but cath lab privileges still require procedure logs."
        : "Typical mixed inpatient/outpatient timelines; confirm whether IMLC or expedited licensing applies to you.";

  return {
    stateName,
    tier,
    licenseWeeks: weeksForTier(tier, "license"),
    privilegingWeeks: weeksForTier(tier, "privilege"),
    notes,
  };
}

export const CREDENTIALING_DISCLAIMER =
  "Directional estimates only—your ABIM status, disciplinary history, payer enrollment, and hospital bylaws change timelines. Not legal advice.";
