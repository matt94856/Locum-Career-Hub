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
  /** Snapshot line for pay, if the client shared written terms. */
  compensation?: string;
  /** Shown on cards and specialty hubs. Defaults to travel/lodging/malpractice covered. */
  supportLine?: string;
  /** Eyebrow above the H1. */
  eyebrow?: string;
  /** Value posted to the inquiry API (must match recruiter specialty labels). */
  formSpecialty?: string;
  /** Specialty-state URL slug, e.g. interventional-cardiology. */
  specialtySlug?: string;
  /** Floor of the written daily guarantee, if the client shared terms. */
  baseSalaryMinUsdPerDay?: number;
  relatedLinks?: { href: string; label: string }[];
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

export function opportunitySupportLine(opportunity: FeaturedCardiologyOpportunity) {
  return opportunity.supportLine ?? "Travel, lodging, and malpractice insurance covered.";
}

export function opportunityFormSpecialty(opportunity: FeaturedCardiologyOpportunity) {
  return opportunity.formSpecialty ?? "Non-Invasive Cardiology";
}

export function opportunitySpecialtySlug(opportunity: FeaturedCardiologyOpportunity) {
  return opportunity.specialtySlug ?? "general-cardiology";
}

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
  {
    slug: "ohio-interventional-cardiology-locum",
    state: "Ohio",
    stateSlug: "ohio",
    title: "Ohio Interventional Cardiology Locum Opportunity",
    metaTitle: "Ohio Interventional Cardiology Locum | 1–2 Wks/Mo",
    metaDescription:
      "Ohio interventional cardiology locum: ASAP coverage, 1–2 weeks/month, 24-hour call. $3,200 for 0–4 hours plus $400/hr callback—about $4,800 on an 8-hour day.",
    h1: "Interventional Cardiology Locum Job in Ohio",
    shortLabel: "Ohio interventional cardiology · 1–2 weeks/month",
    setting: "Interventional cardiology with rounding, consults, procedures, and afternoon clinic",
    schedule: "One to two weeks per month; days start at 7 a.m. with rounding, consults, and procedures, then afternoon clinic",
    call: "24-hour call during scheduled coverage",
    compensation:
      "$3,200 guaranteed for 0–4 hours, then $400/hour callback. An 8-hour day is about $4,800.",
    baseSalaryMinUsdPerDay: 3200,
    supportLine: "Confirm travel, lodging, and malpractice terms in writing before you accept.",
    eyebrow: "Featured interventional cardiology opportunity",
    formSpecialty: "Interventional Cardiology",
    specialtySlug: "interventional-cardiology",
    relatedLinks: [
      { href: "/locum-tenens-jobs/ohio/interventional-cardiology", label: "Ohio interventional locum jobs" },
      { href: "/interventional-cardiology-locums-pay", label: "Interventional locums pay" },
      { href: "/moonlighting-physician-jobs", label: "Cardiology moonlighting" },
      { href: "/cardiologist-locums-calculator", label: "Estimate locum compensation" },
    ],
    requirements: [
      "Interventional cardiology training and current cath-lab competency",
      "Board certification in cardiovascular disease (interventional certification preferred)",
      "Ohio license, or a realistic path to Ohio licensure (IMLC-eligible physicians often move faster)",
      "Comfort with 24-hour interventional call during scheduled weeks",
      "Availability for one to two weeks per month, including ASAP coverage if credentialing allows",
    ],
    benefits: [
      "Written daily guarantee: $3,200 for 0–4 hours",
      "Callback at $400/hour after four hours—about $4,800 on a typical 8-hour day",
      "Recurring 1–2 week blocks instead of an always-on employed calendar",
      "Mixed day: morning rounding, consults, and procedures; afternoon clinic",
      "Useful for extra income, locums-primary work, or a change from a current employed schedule",
    ],
    directAnswer:
      "Ohio needs an interventional cardiologist as soon as an eligible physician can start. Coverage is 1–2 weeks per month with 24-hour call. Days start at 7 a.m. with rounding, consults, and procedures, then afternoon clinic. Pay is $3,200 guaranteed for 0–4 hours and $400/hour callback after that—about $4,800 on an 8-hour day.",
    idealFits: [
      {
        title: "Ohio-based interventional cardiologists",
        detail:
          "Physicians already practicing in Ohio who want defined blocks without a full-time employed calendar.",
      },
      {
        title: "Ohio-licensed interventionalists elsewhere",
        detail:
          "If you already hold an Ohio license, credentialing is usually the remaining gate—not a new state application.",
      },
      {
        title: "Out-of-state IC physicians who can license",
        detail:
          "Ohio is IMLC-eligible for many physicians. Licensing still has to finish before an ASAP start is real.",
      },
      {
        title: "Employed interventionalists seeking extra income",
        detail:
          "One to two weeks a month can fit some moonlighting plans. Confirm employer approval, covenants, fatigue, and malpractice first.",
      },
      {
        title: "Locums-primary interventional cardiologists",
        detail:
          "Recurring coverage with a written daily guarantee and callback rate, rather than an open-ended employed STEMI load.",
      },
      {
        title: "Interventionalists ready for a change",
        detail:
          "Useful if the current job no longer fits—too much call, too little control, or a need to reset without leaving cath lab work.",
      },
    ],
    sections: [
      {
        heading: "The week: 7 a.m. start, then clinic",
        paragraphs: [
          "Coverage is needed as soon as a qualified interventional cardiologist can start. The client wants one to two weeks per month—not a full-time employed slot.",
          "Mornings begin at 7 a.m. with rounding, consults, and procedures. Afternoons are clinic. Confirm census, cath-lab staffing, STEMI backup, and clinic volume in writing before you accept.",
        ],
      },
      {
        heading: "24-hour call, with pay that is written down",
        paragraphs: [
          "Scheduled weeks include 24-hour call. The current pay terms are a $3,200 guarantee for 0–4 hours, then $400 per hour of callback after that.",
          "If you work about eight hours, that is $3,200 for the first four hours plus $1,600 for four hours of callback—about $4,800 for the day. Callback volume can run lighter or heavier than eight hours. We confirm the current written terms before presenting you.",
        ],
        bullets: [
          "$3,200 guaranteed for 0–4 hours",
          "$400/hour callback after four hours",
          "Typical 8-hour clinical day ≈ $4,800",
          "Hours are not a personal guarantee—volume varies",
        ],
      },
      {
        heading: "Who this Ohio interventional job is for",
        paragraphs: [
          "This opening is for interventional cardiologists—not general, EP, or imaging-only coverage. It can work if you live in Ohio, already hold an Ohio license, or can add Ohio licensure on a timeline that still meets an ASAP start.",
          "It also fits physicians who want additional income, locum weeks, approved moonlighting, or a change from a current employed or academic schedule. If you are still employed, review moonlighting rules, restrictive covenants, and fatigue policies before you inquire.",
        ],
      },
      {
        heading: "Ohio licensing and an ASAP start",
        paragraphs: [
          "An active Ohio license is the fastest path. Many out-of-state physicians can use the Interstate Medical Licensure Compact, but compact speed is not the same as hospital privileges.",
          "ASAP means the facility needs coverage now. Your actual start date still depends on licensing, privileging, case logs, and the client’s credentialing calendar. Share your license status and earliest realistic week when you inquire.",
        ],
      },
    ],
    faqs: [
      {
        q: "How soon does the Ohio interventional locum need coverage?",
        a: "As soon as an eligible interventional cardiologist can start. Credentialing and privileging still have to finish; an Ohio license usually shortens that path.",
      },
      {
        q: "How many weeks per month is the Ohio IC assignment?",
        a: "One to two weeks per month during scheduled coverage.",
      },
      {
        q: "What does a clinical day look like?",
        a: "Days start at 7 a.m. with rounding, consults, and procedures. Afternoons include clinic. The block also carries 24-hour call.",
      },
      {
        q: "How is pay structured?",
        a: "The current terms are $3,200 guaranteed for 0–4 hours, then $400 per hour of callback. On an 8-hour day that is about $4,800. We confirm written terms before you accept.",
      },
      {
        q: "Do I need an Ohio license already?",
        a: "An Ohio license is the fastest path, but out-of-state interventional cardiologists may still be considered if licensing can finish in time. Ohio is IMLC-eligible for many physicians.",
      },
      {
        q: "Can an employed interventional cardiologist moonlight this role?",
        a: "Sometimes. You must review employer moonlighting approval, restrictive covenants, malpractice, fatigue, and schedule conflicts before accepting outside cath-lab work.",
      },
      {
        q: "Is this for general cardiologists or EP as well?",
        a: "No. This opening is for interventional cardiology coverage—rounding, consults, procedures, clinic, and 24-hour interventional call.",
      },
    ],
    keywords: [
      "interventional cardiologist jobs Ohio",
      "interventional cardiology locum Ohio",
      "Ohio interventional cardiologist moonlighting",
      "locum tenens interventional cardiology Ohio",
      "Ohio licensed interventional cardiologist",
      "additional income interventional cardiologist",
    ],
    datePosted: "2026-09-17",
    relatedSpecialtySlugs: ["interventional-cardiology"],
    screeningQuestions: [
      {
        id: "ohioLicense",
        label: "Do you currently hold an Ohio medical license?",
        options: ["Yes", "No—IMLC or new license needed", "Not sure"],
      },
      {
        id: "monthlyAvailability",
        label: "Could you cover 1–2 weeks per month?",
        options: ["Yes", "Possibly—depending on dates", "No"],
      },
      {
        id: "callComfort",
        label: "Are you comfortable with 24-hour interventional call on scheduled weeks?",
        options: ["Yes", "Need written STEMI/backup details first", "No"],
      },
      {
        id: "startTiming",
        label: "How soon could you start if credentialing cleared?",
        options: ["ASAP", "Within 30 days", "1–3 months", "Exploring only"],
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
