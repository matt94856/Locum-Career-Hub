import { getStateProfile } from "@/lib/seo/state-profiles";
import { recruiterTrustSection } from "@/lib/cardiology-seo/rich-content";
import type { ContentSection } from "@/lib/cardiology-seo/types";
import { stateNameToSlug } from "@/lib/us-state-slugs";
import { US_STATES } from "@/lib/states";

/** Directional weekly locum gross ranges by market tier—not offers or guarantees. */
const TIER_NOTE: Record<string, string> = {
  "West Coast": "West Coast and non-compact states often show higher stipend pressure and longer licensing lead times—packages may reflect housing costs more than hourly rate alone.",
  Northeast: "Northeast metros frequently combine higher acuity inpatient work with longer credentialing timelines; interventional call packages trend toward the upper end of national distributions.",
  Southeast: "Southeast markets often balance strong winter or seasonal volume with IMLC-friendly licensing for many physicians—compare call burden, not just headline weekly rates.",
  Midwest: "Midwest assignments vary between academic quaternary centers and community hospitals; census and call definitions move weekly ranges more than geography alone.",
  "Mountain West": "Mountain West locums may include travel to community sites—document mileage, housing, and cath lab activation expectations.",
  "Great Plains": "Great Plains community hospitals often need general cardiology and imaging-heavy locums; packages may trade lower COL for broader call.",
  "Pacific Northwest": "Pacific Northwest roles mix employed saturation in metros with outreach clinic needs—imaging read pools appear frequently in contracts.",
  South: "Southern states often show steady consult and cath lab locum demand; STEMI call and weekend coverage are primary pay drivers.",
  "Mid-Atlantic": "Mid-Atlantic markets blend academic referral depth with suburban clinic growth—multi-state licensing planning matters for DC/NJ/PA crosses.",
  Southwest: "Southwest retirement migration can inflate winter-season demand; seasonal blocks may price differently than year-round coverage.",
  Pacific: "Pacific and Alaska/Hawaii assignments usually require dedicated state licenses and travel stipends—lead times are critical path items.",
};

function subspecialtyPayContext(stateName: string): ContentSection {
  return {
    h2: "How subspecialty affects cardiology pay in this market",
    paragraphs: [
      `Interventional cardiologists in ${stateName} are usually compensated relative to STEMI activation, cath lab case mix, and add-on PCI availability—not just days worked.`,
      "Electrophysiology locums often hinge on ablation day volume, device clinic panels, and overnight arrhythmia call.",
      "General and non-invasive cardiologists should compare consult census, echo read turnaround, and clinic panel size—weekly rates are not interchangeable across subspecialties.",
      "Heart failure and structural programs may include weekend census and heart-team meeting time that should be compensated or explicitly excluded in the contract.",
    ],
  };
}

export function buildStateSalarySections(stateName: string): ContentSection[] | null {
  const slug = stateNameToSlug(stateName);
  const profile = getStateProfile(slug);
  if (!profile) return null;

  const regionNote = TIER_NOTE[profile.region] ?? "Compare offers using documented call, scope, and malpractice—not online rate posts alone.";

  return [
    {
      h2: `${stateName} cardiology compensation context`,
      paragraphs: [
        `This page explains what typically influences cardiologist pay—employed and locum—in ${stateName}. It is educational only; your offer depends on subspecialty, call, acuity, and contract structure.`,
        profile.marketSnapshot,
      ],
    },
    {
      h2: "Locum vs employed pay drivers",
      paragraphs: [
        profile.locumDemandNotes,
        "Employed packages often emphasize RVU targets, quality metrics, and benefits. Locum packages emphasize weekly or daily rates, travel stipends, and malpractice structure—compare total economics with a CPA, not headline numbers alone.",
        regionNote,
      ],
    },
    subspecialtyPayContext(stateName),
    {
      h2: "Licensing and start-date economics",
      paragraphs: [
        profile.licensingPath,
        profile.imlcEligible
          ? `${stateName} is commonly planned with IMLC or compact thinking for many physicians—but hospital privileging and payer enrollment still take time.`
          : `${stateName} typically requires a full state license for most physicians; build your start-date plan backward from board processing and privileging.`,
        `Major metros: ${profile.majorMetros.join(", ")}. Demand often clusters there, but community sites may offer different call and stipend tradeoffs.`,
      ],
    },
    {
      h2: "Negotiation checklist before you accept",
      paragraphs: [
        "Document: call schedule, STEMI role, consult caps, clinic panel, imaging read SLAs, malpractice (claims-made vs occurrence), tail, cancellation, and travel stipends.",
        "Ask whether orientation days are paid, how add-on cases are compensated, and who covers mid-assignment extensions.",
        ...profile.credentialingTips.map((t) => `Credentialing tip: ${t}`),
      ],
    },
    recruiterTrustSection(stateName),
  ];
}

export function buildStateSalaryFaqs(stateName: string) {
  const slug = stateNameToSlug(stateName);
  const profile = getStateProfile(slug);
  const imlc = profile?.imlcEligible ? "often compact-eligible" : "typically requires a full state license";

  return [
    {
      q: `What is a typical locum cardiologist weekly rate in ${stateName}?`,
      a: "There is no single typical rate—STEMI call, subspecialty, and clinic load move offers. Use our salary estimator for directional ranges, then negotiate from written scope.",
    },
    {
      q: `Is ${stateName} ${imlc} for licensing?`,
      a: "Licensing rules change—confirm with the state board and your counsel. Even with compact eligibility, privileging timelines are separate.",
    },
    {
      q: "Will a recruiter contact me if I inquire about pay and jobs?",
      a: "Yes—a cardiology recruiter reviews your subspecialty and states. If realistic locum opportunities exist in your selected areas, we follow up—usually within one business day.",
    },
    {
      q: `How does ${stateName} compare to other states for cardiology pay?`,
      a: "Compare call burden, cost of living, and tax structure—not only weekly rates. See our highest-paying states overview and this state's locum job hub for context.",
    },
    {
      q: "Is this individualized financial or tax advice?",
      a: "No. Consult a CPA and attorney for your situation. This page describes common market drivers only.",
    },
  ];
}

export function buildAllStateSalaryDefs() {
  return US_STATES.map((stateName) => {
    const stateSlug = stateNameToSlug(stateName);
    const slug = `cardiologist-salary-${stateSlug}`;
    return {
      category: "salary" as const,
      slug,
      h1: `Cardiologist Salary in ${stateName}`,
      title: `Cardiologist Salary ${stateName} (2026) | Locum & Employed`,
      description: `What influences cardiologist pay in ${stateName}—locum weekly drivers, subspecialty, and licensing. Educational guide; not a guaranteed offer.`,
      topic: `cardiologist salary ${stateName}`,
      keywords: [
        `cardiologist salary ${stateName}`,
        `${stateName} cardiology compensation`,
        `locum cardiologist salary ${stateName}`,
      ],
      geoLabel: stateName,
      stateSlug,
      showRecruiterTrust: true,
    };
  });
}
