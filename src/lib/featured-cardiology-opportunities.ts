export type FeaturedCardiologyOpportunity = {
  slug: string;
  state: string;
  stateSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shortLabel: string;
  setting: string;
  schedule: string;
  call: string;
  requirements: string[];
  benefits: string[];
  directAnswer: string;
  idealFits: { title: string; detail: string }[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  faqs: { q: string; a: string }[];
  keywords: string[];
  datePosted: string;
  relatedSpecialtySlugs: string[];
  screeningQuestions: {
    id: string;
    label: string;
    options: string[];
  }[];
};

export const FEATURED_CARDIOLOGY_OPPORTUNITIES: FeaturedCardiologyOpportunity[] = [
  {
    slug: "kansas-inpatient-non-invasive-cardiology-locum",
    state: "Kansas",
    stateSlug: "kansas",
    title: "Kansas Inpatient Non-Invasive Cardiology Locum Opportunity",
    metaTitle: "Kansas Inpatient Cardiology Locum | 7 On/7 Off",
    metaDescription:
      "Kansas inpatient non-invasive cardiology locum: 7-on/7-off, licensing support, nuclear required and travel, lodging, and malpractice covered.",
    h1: "Inpatient Non-Invasive Cardiology Locum Job in Kansas",
    shortLabel: "Kansas inpatient cardiology · 7 on/7 off",
    setting: "Inpatient non-invasive cardiology",
    schedule: "Seven days on / seven days off; approximately 8–9 working hours per day",
    call:
      "24-hour call during the scheduled block; calls after 6 p.m. are described as extremely rare",
    requirements: [
      "Board certification in cardiovascular disease",
      "Nuclear cardiology competency required",
      "TEE experience preferred",
      "Comfort with inpatient consults, rounding, and non-invasive cardiology coverage",
      "Must not have previously contributed to the Kansas professional liability/PCF program; eligibility is verified before presentation",
    ],
    benefits: [
      "Kansas licensing assistance available",
      "Travel and lodging covered",
      "Malpractice insurance covered",
      "Predictable 7-on/7-off block structure",
      "Most active clinical work is expected within an 8–9 hour daytime window",
    ],
    directAnswer:
      "This Kansas locum assignment is designed for a board-certified non-invasive cardiologist who enjoys inpatient consults and rounding, can provide nuclear cardiology coverage, and wants a recurring 7-on/7-off schedule. The scheduled block includes 24-hour call, but the facility reports that calls after 6 p.m. are extremely rare. Kansas licensing, travel, lodging, and malpractice are covered for an eligible physician.",
    idealFits: [
      {
        title: "Experienced inpatient general cardiologists",
        detail:
          "Physicians comfortable managing consults, rounding, and diagnostic cardiology without an interventional practice focus.",
      },
      {
        title: "Nuclear-certified non-invasive cardiologists",
        detail:
          "Nuclear competency is required; TEE experience makes a candidate more competitive but is not listed as mandatory.",
      },
      {
        title: "Out-of-state physicians open to Kansas licensure",
        detail:
          "The opportunity will support licensing, making it relevant to candidates without a current Kansas license.",
      },
      {
        title: "Block-schedule and travel locum physicians",
        detail:
          "Seven-on/seven-off can work for physicians who prefer concentrated clinical weeks followed by protected time away.",
      },
      {
        title: "Physicians between permanent roles",
        detail:
          "A recurring inpatient block can provide continuity while a cardiologist evaluates a longer-term career decision.",
      },
      {
        title: "Later-career cardiologists retaining inpatient scope",
        detail:
          "A defined block may appeal to experienced physicians who still enjoy inpatient medicine but want less year-round administrative responsibility.",
      },
    ],
    sections: [
      {
        heading: "What the Kansas inpatient week looks like",
        paragraphs: [
          "The assignment is inpatient only. The cardiologist should expect consultative cardiology, rounding, and non-invasive diagnostic responsibilities during a seven-day block.",
          "Although the block carries 24-hour call, the facility describes actual work as approximately eight to nine hours per day and reports that calls after 6 p.m. are extremely rare. Candidates should still review written call, callback, and escalation expectations before accepting.",
        ],
      },
      {
        heading: "Required nuclear scope and preferred TEE experience",
        paragraphs: [
          "Nuclear cardiology is a required competency for this opening. Candidates should be ready to document applicable certification, recent experience, or privileges during credentialing.",
          "TEE is preferred. Confirm whether TEE coverage is occasional, scheduled, or backup-only and whether the facility expects independent performance, interpretation, or both.",
        ],
      },
      {
        heading: "Kansas licensing and PCF eligibility",
        paragraphs: [
          "The client is willing to license an otherwise qualified physician. Kansas participates in the Interstate Medical Licensure Compact, but individual eligibility and final timelines depend on the physician’s licensing history and credentials.",
          "This opening has a facility-specific eligibility condition: candidates cannot have previously contributed to the Kansas professional liability/PCF program. Locum Career Hub verifies that condition before presentation. This page does not interpret Kansas insurance law or guarantee eligibility.",
        ],
      },
      {
        heading: "Travel-supported 7-on/7-off cardiology locums",
        paragraphs: [
          "Travel, lodging, and malpractice insurance are covered. That structure is useful for regional travelers and physicians who want to evaluate Kansas without taking on assignment-related housing or insurance logistics themselves.",
          "Before committing, confirm the travel-booking policy, arrival expectations, orientation time, cancellation terms, and whether post-call travel is permitted.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will the Kansas facility license an out-of-state cardiologist?",
        a: "Yes. The client is willing to support Kansas licensing for a qualified physician. Final eligibility and timing depend on the physician’s record and licensing pathway.",
      },
      {
        q: "Is this Kansas cardiology job inpatient or outpatient?",
        a: "It is an inpatient-only non-invasive cardiology assignment.",
      },
      {
        q: "Does the Kansas role require 24-hour call?",
        a: "Yes. The seven-day block includes 24-hour call. The facility reports that calls after 6 p.m. are extremely rare, but candidates should review the written callback and escalation terms.",
      },
      {
        q: "Is nuclear cardiology required?",
        a: "Yes. Nuclear cardiology competency is required. TEE experience is preferred.",
      },
      {
        q: "What is the Kansas PCF eligibility requirement?",
        a: "For this specific opening, candidates must not have previously contributed to the applicable Kansas professional liability/PCF program. We verify the facility’s requirement before submitting a candidate.",
      },
      {
        q: "Are travel, lodging, and malpractice covered?",
        a: "Yes. Travel, lodging, and malpractice insurance are covered for this assignment.",
      },
    ],
    keywords: [
      "Kansas cardiology locum job",
      "inpatient cardiology locum Kansas",
      "non-invasive cardiology locum jobs",
      "7 on 7 off cardiology jobs",
      "cardiologist jobs with license assistance",
      "nuclear cardiology locum jobs",
    ],
    datePosted: "2026-09-09",
    relatedSpecialtySlugs: ["general-cardiology", "advanced-imaging"],
    screeningQuestions: [
      {
        id: "nuclear",
        label: "Do you currently meet nuclear cardiology competency requirements?",
        options: ["Yes", "No", "Not sure—please verify with me"],
      },
      {
        id: "kansasPcf",
        label: "Have you previously contributed to the applicable Kansas PCF/HCSF program?",
        options: ["No", "Yes", "Not sure—please check my eligibility"],
      },
      {
        id: "tee",
        label: "Are you currently comfortable with TEE?",
        options: ["Yes", "No", "Case-dependent"],
      },
    ],
  },
  {
    slug: "north-carolina-outpatient-cardiology-locum",
    state: "North Carolina",
    stateSlug: "north-carolina",
    title: "North Carolina Outpatient Cardiology Locum Opportunity",
    metaTitle: "NC Outpatient Cardiology Locum | 2 Weeks/Month",
    metaDescription:
      "North Carolina outpatient cardiology locum: 4–5 clinic days per week for 2 weeks monthly. Travel, lodging, and malpractice covered.",
    h1: "Outpatient Cardiology Locum Job in North Carolina",
    shortLabel: "North Carolina outpatient cardiology · 2 weeks/month",
    setting: "Outpatient-only general/non-invasive cardiology",
    schedule: "Four to five clinic days per week for two weeks per month",
    call: "No inpatient responsibilities; confirm any after-hours phone responsibilities before accepting",
    requirements: [
      "Cardiology board certification required",
      "Comfort with recurring outpatient clinic coverage",
      "Availability for two weeks per month",
      "Ability to work four to five clinic days during each scheduled week",
    ],
    benefits: [
      "Outpatient-only clinical setting",
      "Recurring two-weeks-per-month cadence",
      "Travel and lodging covered",
      "Malpractice insurance covered",
      "Predictable blocks for a portfolio, part-time, or later-career schedule",
    ],
    directAnswer:
      "This North Carolina opportunity is for a board-certified cardiologist seeking outpatient-only locum work on a recurring schedule. The physician will work four to five clinic days per week for two weeks each month. Travel, lodging, and malpractice insurance are covered, making the role especially relevant to physicians seeking predictable part-time blocks without inpatient responsibilities.",
    idealFits: [
      {
        title: "Outpatient-focused general cardiologists",
        detail:
          "Physicians who prefer longitudinal clinic care and routine non-invasive cardiology over hospital rounding.",
      },
      {
        title: "Part-time and portfolio-career cardiologists",
        detail:
          "Two weeks per month can anchor a schedule that also includes teaching, telecardiology, consulting, or protected time off.",
      },
      {
        title: "Semi-retired cardiologists",
        detail:
          "Recurring outpatient blocks may suit later-career physicians who want continued clinical practice without a full monthly schedule.",
      },
      {
        title: "Employed physicians with moonlighting approval",
        detail:
          "The cadence may fit some existing schedules, but candidates must review employer approval, restrictive covenants, fatigue, and malpractice obligations.",
      },
      {
        title: "Locum-first-timers",
        detail:
          "An outpatient-only setting and repeat monthly cadence may offer a more familiar entry into locum work than mixed inpatient/call coverage.",
      },
      {
        title: "Traveling cardiologists seeking predictable blocks",
        detail:
          "Covered travel and lodging reduce the logistical burden of returning to North Carolina for planned clinic weeks.",
      },
    ],
    sections: [
      {
        heading: "A recurring outpatient cardiology schedule",
        paragraphs: [
          "The client is seeking two weeks of coverage each month. During each scheduled week, the physician will work four to five outpatient clinic days.",
          "That cadence can appeal to cardiologists who want dependable recurring work rather than isolated weekend shifts or an open-ended full-time assignment.",
        ],
      },
      {
        heading: "Who benefits from two weeks per month",
        paragraphs: [
          "A half-month schedule can work for a physician building a portfolio career, easing into semi-retirement, or maintaining protected time for family, teaching, research, or another approved professional commitment.",
          "An employed cardiologist should not assume the assignment qualifies as casual moonlighting. Review employer policies, restrictive covenants, licensing, fatigue, and scheduling before pursuing outside work.",
        ],
      },
      {
        heading: "Outpatient-only does not mean scope-free",
        paragraphs: [
          "Before accepting, request written patient volume, new-versus-follow-up mix, diagnostic interpretation expectations, support staffing, EMR, and inbox or callback responsibilities.",
          "The role does not include inpatient coverage. Any after-hours phone, result-management, or chart-completion expectations should still be confirmed in writing.",
        ],
      },
      {
        heading: "Travel, lodging, and malpractice are covered",
        paragraphs: [
          "The assignment includes travel, lodging, and malpractice coverage. Candidates should still confirm booking policies, cancellation terms, covered arrival/departure dates, and the malpractice structure before signing.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many weeks per month does the North Carolina cardiologist work?",
        a: "The client is seeking two weeks per month, with four to five outpatient clinic days during each scheduled week.",
      },
      {
        q: "Is this North Carolina cardiology job outpatient only?",
        a: "Yes. The clinical setting is outpatient only, with no inpatient responsibilities described.",
      },
      {
        q: "Is this a good fit for a semi-retired cardiologist?",
        a: "It may be. The recurring half-month schedule and outpatient setting can suit some later-career physicians, subject to current competency, credentialing, and the final clinical scope.",
      },
      {
        q: "Can an employed cardiologist work this assignment?",
        a: "Possibly, but only after reviewing employer moonlighting approval, restrictive covenants, malpractice, fatigue, and schedule conflicts.",
      },
      {
        q: "Is board certification required?",
        a: "Yes. Cardiology board certification is required for this opening.",
      },
      {
        q: "Are travel, lodging, and malpractice covered?",
        a: "Yes. Travel, lodging, and malpractice insurance are covered.",
      },
    ],
    keywords: [
      "North Carolina outpatient cardiology locum",
      "outpatient cardiology jobs North Carolina",
      "part-time cardiologist jobs NC",
      "cardiology locum two weeks per month",
      "non-invasive cardiology locum jobs",
      "semi-retired cardiologist jobs",
    ],
    datePosted: "2026-09-09",
    relatedSpecialtySlugs: ["general-cardiology"],
    screeningQuestions: [
      {
        id: "monthlyAvailability",
        label: "Could you regularly cover two weeks per month?",
        options: ["Yes", "Possibly—depending on dates", "No"],
      },
      {
        id: "outpatientOnly",
        label: "Are you seeking outpatient-only cardiology work?",
        options: ["Yes", "Open to outpatient", "Still comparing settings"],
      },
    ],
  },
];

export function featuredOpportunityPath(slug: string): string {
  return `/featured-cardiology-jobs/${slug}`;
}

export function getFeaturedCardiologyOpportunity(
  slug: string,
): FeaturedCardiologyOpportunity | undefined {
  return FEATURED_CARDIOLOGY_OPPORTUNITIES.find((opportunity) => opportunity.slug === slug);
}

export function getFeaturedOpportunitiesForState(
  stateSlug: string,
  specialtySlug?: string,
): FeaturedCardiologyOpportunity[] {
  return FEATURED_CARDIOLOGY_OPPORTUNITIES.filter(
    (opportunity) =>
      opportunity.stateSlug === stateSlug &&
      (!specialtySlug || opportunity.relatedSpecialtySlugs.includes(specialtySlug)),
  );
}
