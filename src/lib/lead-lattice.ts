/** 3-specialty × 4-life-stage conversion lattice for cardiologist leads. */

export const CAREER_STAGES = [
  {
    id: "fellowship",
    label: "Finishing fellowship / first attending year",
    shortLabel: "Fellowship / new attending",
  },
  {
    id: "moonlighting",
    label: "Employed, adding income",
    shortLabel: "Moonlighting",
  },
  {
    id: "locums-primary",
    label: "Locums as my primary work",
    shortLabel: "Locums-primary",
  },
  {
    id: "retirement",
    label: "Scaling down / semi-retired",
    shortLabel: "Scale-down",
  },
] as const;

export type CareerStageId = (typeof CAREER_STAGES)[number]["id"];

export const CAREER_STAGE_IDS = CAREER_STAGES.map((s) => s.id) as CareerStageId[];

export function isCareerStageId(value: string): value is CareerStageId {
  return (CAREER_STAGE_IDS as string[]).includes(value);
}

export type ScreeningQuestion = {
  id: string;
  label: string;
  options: string[];
};

const GENERAL_SCREENS: ScreeningQuestion[] = [
  {
    id: "nuclear",
    label: "Nuclear cardiology competency",
    options: ["Yes", "No", "Prefer not to say"],
  },
  {
    id: "setting",
    label: "Preferred setting",
    options: ["Inpatient / consults", "Outpatient clinic only", "Either"],
  },
];

const INTERVENTIONAL_SCREENS: ScreeningQuestion[] = [
  {
    id: "stemi",
    label: "STEMI call",
    options: ["Yes — primary STEMI", "Diagnostic / no STEMI", "Either"],
  },
  {
    id: "pci_logs",
    label: "Independent PCI operator logs",
    options: ["Current independent logs", "Recent graduate / building volume", "Prefer not to say"],
  },
];

const EP_SCREENS: ScreeningQuestion[] = [
  {
    id: "ep_scope",
    label: "EP scope you want to cover",
    options: ["Ablation + devices", "Devices / clinic only", "Consults / arrhythmia only"],
  },
  {
    id: "ep_call",
    label: "Arrhythmia call",
    options: ["OK with call", "No-call / scheduled days only", "Either"],
  },
];

export function screensForSpecialty(specialty: string): ScreeningQuestion[] {
  const lower = specialty.toLowerCase();
  if (lower.includes("interventional")) return INTERVENTIONAL_SCREENS;
  if (lower.includes("electrophysiology") || lower === "ep") return EP_SCREENS;
  if (lower.includes("general") || lower.includes("non-invasive") || lower.includes("imaging")) {
    return GENERAL_SCREENS;
  }
  return [];
}

export const LATTICE_SPECIALTIES = [
  {
    pathSlug: "general",
    name: "General Cardiology",
    href: "/locum-jobs/cardiology/general",
    fit: "Inpatient consults, clinic blocks, nuclear/TEE, 7-on/7-off or 2-weeks/month outpatient.",
    payHref: "/cardiologist-locums-pay-report",
    payLabel: "Cardiologist locums pay report",
  },
  {
    pathSlug: "interventional",
    name: "Interventional Cardiology",
    href: "/locum-jobs/cardiology/interventional",
    fit: "Cath lab and STEMI vs diagnostic-only PCI. Weekend moonlighting or full locums.",
    payHref: "/interventional-cardiology-locums-pay",
    payLabel: "Interventional locums pay",
  },
  {
    pathSlug: "electrophysiology",
    name: "Electrophysiology",
    href: "/locum-jobs/cardiology/electrophysiology",
    fit: "Ablation weeks, device clinic, or 2-day lab coverage without STEMI.",
    payHref: "/ep-cardiology-locums-pay",
    payLabel: "EP locums pay",
  },
] as const;

export const LATTICE_DOORS = [
  {
    id: "fellowship" as const,
    href: "/locum-jobs-for-new-graduates",
    title: "Finishing fellowship",
    detail: "Board-eligible first blocks, licensing lead time, and first-attending scope.",
  },
  {
    id: "moonlighting" as const,
    href: "/moonlighting-physician-jobs",
    title: "Adding income",
    detail: "Employed cardiologists stacking weekend, clinic, or cath-lab coverage without quitting.",
  },
  {
    id: "locums-primary" as const,
    href: "/national-locum-tenens-jobs-guide",
    title: "Locums as the job",
    detail: "Travel or local blocks with written call, cath lab, and EP lab expectations.",
  },
  {
    id: "retirement" as const,
    href: "/retired-physician-opportunities",
    title: "Scaling down",
    detail: "Semi-retired clinic, consult, or device coverage without full-time employment.",
  },
] as const;

export const DOOR_LANDING_SLUGS: Record<string, CareerStageId> = {
  "locum-jobs-for-new-graduates": "fellowship",
  "careers-after-residency": "fellowship",
  "moonlighting-physician-jobs": "moonlighting",
  "physician-side-income": "moonlighting",
  "national-locum-tenens-jobs-guide": "locums-primary",
  "locum-opportunities": "locums-primary",
  "locum-physician-jobs": "locums-primary",
  "cardiologist-travel-locums": "locums-primary",
  "physician-travel-jobs": "locums-primary",
  "retired-physician-opportunities": "retirement",
  "part-time-physician-jobs": "retirement",
  "flexible-physician-careers": "retirement",
};

export const FEATURED_PROOF = {
  kansas: {
    href: "/featured-cardiology-jobs/kansas-inpatient-non-invasive-cardiology-locum",
    title: "Kansas inpatient non-invasive locum",
    detail: "7-on/7-off inpatient general cardiology with nuclear required.",
  },
  northCarolina: {
    href: "/featured-cardiology-jobs/north-carolina-outpatient-cardiology-locum",
    title: "North Carolina outpatient locum",
    detail: "Two weeks per month outpatient cardiology for part-time and scale-down schedules.",
  },
  ohio: {
    href: "/featured-cardiology-jobs/ohio-interventional-cardiology-locum",
    title: "Ohio interventional locum",
    detail: "ASAP 1–2 weeks/month IC coverage with 24-hour call and a written daily guarantee.",
  },
} as const;

export function featuredProofForSpecialty(pathSlug: string) {
  if (pathSlug === "general" || pathSlug === "cardiac-imaging") {
    return [FEATURED_PROOF.kansas, FEATURED_PROOF.northCarolina];
  }
  if (pathSlug === "interventional") {
    return [FEATURED_PROOF.ohio];
  }
  return [];
}

export function geoProofForSpecialty(pathSlug: string) {
  if (pathSlug === "electrophysiology") {
    return [
      {
        href: "/locum-tenens-jobs/new-york/electrophysiology",
        title: "New York EP locum jobs",
        detail: "Ablation, devices, and arrhythmia call with NY licensing context.",
      },
      {
        href: "/locum-tenens-jobs/ohio/electrophysiology",
        title: "Ohio EP locum jobs",
        detail: "Community and regional EP lab coverage.",
      },
      {
        href: "/salary/electrophysiologist-salary",
        title: "Electrophysiologist salary guide",
        detail: "Pay drivers for ablation vs device-clinic work.",
      },
    ];
  }
  if (pathSlug === "interventional") {
    return [
      {
        href: "/locum-tenens-jobs/new-jersey/interventional-cardiology",
        title: "New Jersey interventional locum jobs",
        detail: "STEMI and cath-lab coverage with documented activation rules.",
      },
      {
        href: "/locum-tenens-jobs/nevada/interventional-cardiology",
        title: "Nevada interventional locum jobs",
        detail: "Western shortage STEMI coverage and IMLC licensing paths.",
      },
      {
        href: "/locum-tenens-jobs/ohio/interventional-cardiology",
        title: "Ohio interventional locum jobs",
        detail: "ASAP 1–2 week IC blocks with 24-hour call and a written daily guarantee.",
      },
    ];
  }
  if (pathSlug === "general") {
    return [
      {
        href: "/locum-tenens-jobs/texas/general-cardiology",
        title: "Texas general cardiology locum jobs",
        detail: "Consult, clinic, and imaging blocks in a high-volume market.",
      },
      {
        href: "/locum-tenens-jobs/kansas/general-cardiology",
        title: "Kansas general cardiology locum jobs",
        detail: "Inpatient block coverage including the featured 7-on/7-off assignment.",
      },
      {
        href: "/locum-tenens-jobs/north-carolina/general-cardiology",
        title: "North Carolina general cardiology locum jobs",
        detail: "Outpatient and hybrid schedules, including 2-weeks/month clinic.",
      },
    ];
  }
  return [];
}

export function hubPathForJobSpecialtySlug(specialtySlug: string): string | undefined {
  if (specialtySlug === "general-cardiology" || specialtySlug === "cardiology") {
    return "/locum-jobs/cardiology/general";
  }
  if (specialtySlug === "interventional-cardiology") return "/locum-jobs/cardiology/interventional";
  if (specialtySlug === "electrophysiology") return "/locum-jobs/cardiology/electrophysiology";
  if (specialtySlug === "advanced-imaging") return "/locum-jobs/cardiology/cardiac-imaging";
  return undefined;
}
