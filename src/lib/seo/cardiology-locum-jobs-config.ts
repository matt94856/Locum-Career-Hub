import { SITE } from "@/lib/site";
import type { ContentSection } from "@/lib/cardiology-seo/types";

export const CARDIOLOGY_HUB_PATH = "/locum-jobs/cardiology" as const;

export type CardiologyLocumSpecialty = {
  pathSlug: string;
  /** Legacy `/specialties/[slug]` segment */
  legacySlug: string;
  name: string;
  /** H1: "Locum [Specialty] Jobs" */
  h1: string;
  titleKeyword: string;
  metaDescription: string;
  intro: string;
  relatedPathSlugs: string[];
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
};

const BRAND = ` | ${SITE.name}`;
export const SERP_TITLE_MAX_WITH_BRAND = 60;
export const SERP_TITLE_PART_MAX = SERP_TITLE_MAX_WITH_BRAND - BRAND.length;

export function cardiologySpecialtyPath(pathSlug: string): string {
  return `${CARDIOLOGY_HUB_PATH}/${pathSlug}`;
}

/** Map legacy specialty slug → new path slug */
export const LEGACY_TO_PATH_SLUG: Record<string, string> = {
  "general-cardiology": "general",
  "interventional-cardiology": "interventional",
  electrophysiology: "electrophysiology",
  "heart-failure": "heart-failure",
  "advanced-imaging": "cardiac-imaging",
  "structural-heart": "structural-heart",
  "preventive-cardiology": "preventive-cardiology",
  "pediatric-cardiology": "pediatric-cardiology",
  "adult-congenital-cardiology": "adult-congenital",
};

export const PATH_TO_LEGACY_SLUG = Object.fromEntries(
  Object.entries(LEGACY_TO_PATH_SLUG).map(([legacy, path]) => [path, legacy]),
) as Record<string, string>;

export const CARDIOLOGY_HUB_TITLE = "Cardiology Locum Tenens Jobs & Cardiologist Recruiting";
export const CARDIOLOGY_HUB_H1 = "Locum Cardiologist Jobs & Recruitment";
export const CARDIOLOGY_HUB_DESCRIPTION =
  "Find top locum cardiologist positions and locum tenens job opportunities. Nationwide cardiology placements in interventional, EP, heart failure, imaging, and pediatric. Connect with expert recruiters at Locum Career Hub.";

export const HOME_TITLE = "Locum Tenens Physician Staffing & Cardiologist Jobs";
export const HOME_DESCRIPTION =
  "Flexible locum tenens physician staffing across all specialties. Competitive pay and support for doctors. Join Locum Career Hub – your cardiology locum jobs expert.";

export const CARDIOLOGY_HUB_FAQS: { q: string; a: string }[] = [
  {
    q: "What is a locum cardiologist?",
    a: "A locum cardiologist is a physician temporarily covering cardiology duties at a hospital or clinic. They provide specialized care on flexible contracts and fill staffing gaps.",
  },
  {
    q: "How do I find locum cardiology jobs?",
    a: "Use Locum Career Hub to connect with hospitals hiring cardiologists. Browse our cardiology jobs page or contact us to discuss your preferences and licenses, and we’ll match you with opportunities.",
  },
  {
    q: "How much do locum cardiologists make?",
    a: "Pay varies by subspecialty, call burden, and location. Interventional and EP blocks often command premium weekly rates; consult and clinic roles differ. See our salary guides for directional ranges—not guaranteed offers.",
  },
  {
    q: "Do I need special credentials for locum cardiology?",
    a: "Board certification or eligibility, active state licensure, and hospital privileging are standard. Interventional and EP roles require documented cath lab or EP lab scope. We help you map timelines before you commit.",
  },
  {
    q: "Does Locum Career Hub recruit non-cardiologists?",
    a: "No. Locum Career Hub recruits MD/DO cardiologists only—general, interventional, EP, heart failure, imaging, structural, preventive, and pediatric cardiology.",
  },
];

export const CARDIOLOGY_HUB_SECTIONS: ContentSection[] = [
  {
    h2: "Why Become a Locum Cardiologist?",
    paragraphs: [
      "Locum cardiologists choose contract-based work for flexibility, compensation transparency, and control over call and cath lab scope. Defined start and end dates can create breathing room when employed schedules feel unsustainable—without leaving medicine.",
      "Many cardiologists use locums to sample health systems, reduce committee load, or bridge between employed roles. Pay drivers include STEMI call, consult census, clinic panel size, and procedural volume—not geography alone.",
      "Documented call, cath lab, and consult expectations before day one; travel or local blocks matched to subspecialty; recruiter advocacy on rates, stipends, and malpractice—not a job-board blast.",
    ],
  },
  {
    h2: "Cardiology Subspecialties",
    paragraphs: [
      "Hospitals search for cardiologists across general consult and clinic coverage, interventional cath lab and STEMI call, electrophysiology ablation and devices, advanced heart failure, cardiac imaging, structural heart programs, preventive cardiology, and pediatric cardiology. Each subspecialty has different privileging, pay drivers, and lifestyle tradeoffs.",
      "General cardiologists often cover consult services and outpatient clinics with echo and stress oversight. Interventional cardiologists anchor cath lab and STEMI programs. Electrophysiology locums focus on ablation, devices, and arrhythmia consults. Heart failure specialists support advanced programs and high-acuity census. Imaging cardiologists interpret echo, nuclear, MRI, and CT studies. Structural heart operators cover TAVR and mitral programs. Preventive cardiologists run lipid and risk clinics. Pediatric cardiologists serve congenital and pediatric ICU programs.",
      "Use the links below to explore subspecialty-specific duties, licensing requirements, typical pay drivers, and FAQs—then submit an inquiry when you are ready for recruiter-led matching.",
    ],
  },
  {
    h2: "How to Get Started",
    paragraphs: [
      "Start with an honest inventory of licenses, board status, procedural logs, and hard boundaries (nights, STEMI, clinic panel). Share subspecialty, preferred states, and availability with a cardiology recruiter.",
      "Credentialing and privileging often set the critical path—begin state licensing early if you are expanding footprint. Keep CV procedural sections current for cath lab and EP roles.",
      "List active licenses and IMLC eligibility; confirm malpractice tail and moonlighting policies if employed; define non-negotiables for STEMI activation, consult caps, and echo read turnaround.",
    ],
  },
  {
    h2: "Why Locum Career Hub",
    paragraphs: [
      "Locum Career Hub is a cardiologist-only recruiting service—not a hospital employer. We connect MD/DO cardiologists with programs that document expectations upfront and respond when mutual fit exists.",
      "If we do not have a realistic match for your subspecialty and states, we tell you directly—typically within one business day of your inquiry.",
    ],
  },
];

function specialtyMeta(specialtyLabel: string): string {
  const label = specialtyLabel.charAt(0).toUpperCase() + specialtyLabel.slice(1);
  return `Find flexible locum ${label} cardiology jobs. Competitive pay and schedule. Contact Locum Career Hub for expert placement in ${label} cardiology.`;
}

/** SERP `<title>` before brand suffix — primary keyword first, title case. */
export function specialtySerpTitle(name: string): string {
  if (/cardiology/i.test(name)) {
    return `${name} Locum Jobs`;
  }
  return `${name} Cardiology Locum Jobs`;
}

/** Contextual in-paragraph cross-links between specialty pages. */
export const SPECIALTY_CONTEXTUAL_LINKS: Record<
  string,
  { prefix: string; targetPathSlug: string; anchor: string; suffix?: string }[]
> = {
  interventional: [
    {
      prefix: "For structural heart cases, see our",
      targetPathSlug: "structural-heart",
      anchor: "Structural Heart locum jobs",
      suffix: "page.",
    },
  ],
  "structural-heart": [
    {
      prefix: "Many structural operators also cover",
      targetPathSlug: "interventional",
      anchor: "interventional cardiology locum jobs",
      suffix: "with PCI and STEMI call.",
    },
  ],
  electrophysiology: [
    {
      prefix: "EP locums often pair with",
      targetPathSlug: "interventional",
      anchor: "interventional cardiology locum jobs",
      suffix: "at combined arrhythmia and cath lab programs.",
    },
  ],
  general: [
    {
      prefix: "General consult roles differ from",
      targetPathSlug: "interventional",
      anchor: "interventional cardiology locum jobs",
      suffix: "—confirm cath lab scope before signing.",
    },
  ],
  "heart-failure": [
    {
      prefix: "Advanced HF programs may overlap with",
      targetPathSlug: "cardiac-imaging",
      anchor: "cardiac imaging locum jobs",
      suffix: "for echo and MRI reads.",
    },
  ],
  "cardiac-imaging": [
    {
      prefix: "Imaging locums often support",
      targetPathSlug: "general",
      anchor: "general cardiology locum jobs",
      suffix: "consult and clinic coverage.",
    },
  ],
  "pediatric-cardiology": [
    {
      prefix: "Pediatric programs may overlap with",
      targetPathSlug: "adult-congenital",
      anchor: "adult congenital cardiology locum jobs",
      suffix: "at regional congenital centers.",
    },
  ],
};

export const CARDIOLOGY_LOCUM_SPECIALTIES: CardiologyLocumSpecialty[] = [
  {
    pathSlug: "general",
    legacySlug: "general-cardiology",
    name: "General Cardiology",
    h1: "Locum General Cardiology Jobs",
    titleKeyword: "general cardiology locum jobs",
    metaDescription: specialtyMeta("general"),
    intro:
      "General cardiology locum jobs cover inpatient consult services, outpatient clinic blocks, echo and stress test oversight, and selective call. Hospitals use locum general cardiologists for leave coverage, volume growth, and bridge staffing while permanent searches run.",
    relatedPathSlugs: ["preventive-cardiology", "cardiac-imaging", "heart-failure"],
    sections: [
      {
        h2: "About General Cardiology Locum Jobs",
        paragraphs: [
          "Assignments blend consult census, clinic panels, and imaging supervision. Confirm whether you cover ICU consults, weekend hospital coverage, and telecardiology reads between blocks.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "Board certification or eligibility in cardiovascular disease, active state license, hospital privileges with echo/stress scope as needed, and malpractice aligned with consult vs procedural exposure.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "Demand appears in community hospitals, regional systems, and metro academic affiliates nationwide. Pay drivers include call frequency, consult volume, clinic panel size, and echo read pools—not headline weekly rates alone.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a locum general cardiologist do day to day?",
        a: "Typical duties include inpatient consults, outpatient clinic visits, stress test supervision, echo interpretation, and documented call—scope varies by contract.",
      },
      {
        q: "Do general cardiology locums require cath lab privileges?",
        a: "Many assignments are consult and clinic focused. Confirm procedural expectations before signing.",
      },
      {
        q: "How do I find general cardiology locum jobs near me?",
        a: "Submit your subspecialty and preferred states through Locum Career Hub—we match documented opportunities rather than blasting generic listings.",
      },
    ],
  },
  {
    pathSlug: "interventional",
    legacySlug: "interventional-cardiology",
    name: "Interventional Cardiology",
    h1: "Locum Interventional Cardiology Jobs",
    titleKeyword: "interventional cardiology locum jobs",
    metaDescription: specialtyMeta("interventional"),
    intro:
      "Interventional cardiology locum jobs center on cath lab coverage, STEMI activation, diagnostic and PCI cases, and sometimes structural heart procedures. Case mix, backup surgery pathways, and call rules must be documented before you commit.",
    relatedPathSlugs: ["structural-heart", "general", "electrophysiology"],
    sections: [
      {
        h2: "About Interventional Cardiology Locum Jobs",
        paragraphs: [
          "Locum interventional cardiologists support PCI-capable hospitals, STEMI networks, and hybrid OR programs. Define activation windows, add-on case compensation, and complication backup in writing.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "Cath lab privileges, current procedural logs if required, board certification in interventional cardiology, state license, and malpractice appropriate to PCI scope.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "High demand in community PCI programs, regional STEMI centers, and vacation markets needing temporary interventional coverage. STEMI call and night coverage are primary pay drivers.",
        ],
      },
    ],
    faqs: [
      {
        q: "What procedures does an interventional locum cardiologist do?",
        a: "Diagnostic cath, PCI, and sometimes peripheral or structural cases depending on lab capabilities and privileges—confirm case mix upfront.",
      },
      {
        q: "How does STEMI call affect interventional locum pay?",
        a: "Activation responsibility, transport patterns, and backup surgery availability change lifestyle and compensation—document them before accepting.",
      },
    ],
  },
  {
    pathSlug: "electrophysiology",
    legacySlug: "electrophysiology",
    name: "Electrophysiology",
    h1: "Locum Electrophysiology Cardiology Jobs",
    titleKeyword: "electrophysiology cardiology locum jobs",
    metaDescription: specialtyMeta("electrophysiology"),
    intro:
      "Electrophysiology locum jobs cover ablation procedures, device implants and clinics, and inpatient arrhythmia consults. Lab mapping systems, EP tech staffing, and device rep support vary by site.",
    relatedPathSlugs: ["interventional", "general", "structural-heart"],
    sections: [
      {
        h2: "About Electrophysiology Locum Jobs",
        paragraphs: [
          "EP locums may include device clinic panels, ablation days, and overnight arrhythmia call. Confirm remote monitoring responsibilities between blocks.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "EP board certification or equivalent experience, cath/EP lab privileges, device implant logs where required, and malpractice aligned with procedural scope.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "Metro academic centers and community arrhythmia programs hire locum EP for backlog ablations and device clinics. Ablation day volume and call drive weekly rates.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do EP locums cover device clinics and ablations?",
        a: "Most assignments include some mix—define weekly ablation targets, device day load, and call before you start.",
      },
    ],
  },
  {
    pathSlug: "heart-failure",
    legacySlug: "heart-failure",
    name: "Heart Failure",
    h1: "Locum Heart Failure Cardiology Jobs",
    titleKeyword: "heart failure cardiology locum jobs",
    metaDescription: specialtyMeta("heart failure"),
    intro:
      "Heart failure locum jobs span advanced heart failure consults, transplant-adjacent services, LVAD programs, and heart-team coordination. Census, weekend coverage, and multi-disciplinary meeting load should be compensated or explicitly excluded.",
    relatedPathSlugs: ["general", "preventive-cardiology", "cardiac-imaging"],
    sections: [
      {
        h2: "About Heart Failure Locum Jobs",
        paragraphs: [
          "Assignments may include inpatient advanced HF census, outpatient transplant clinic, and device management. Clarify LVAD and MCS scope if advertised.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "Advanced heart failure training or equivalent experience, hospital privileges, state license, and comfort with high-acuity inpatient census.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "Quaternary centers and growing community programs use locum HF cardiologists for program expansion and leave. Weekend census and call are key pay drivers.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do heart failure locums require transplant program experience?",
        a: "Not always—confirm whether you cover transplant clinic, LVAD, or consult-only advanced HF before signing.",
      },
    ],
  },
  {
    pathSlug: "cardiac-imaging",
    legacySlug: "advanced-imaging",
    name: "Advanced Cardiac Imaging",
    h1: "Locum Cardiac Imaging Cardiology Jobs",
    titleKeyword: "cardiac imaging cardiology locum jobs",
    metaDescription: specialtyMeta("cardiac imaging"),
    intro:
      "Cardiac imaging locum jobs include echo, nuclear, cardiac MRI and CT interpretation, and multimodality read pools. Turnaround SLAs, study volume, and on-site vs remote expectations must be defined.",
    relatedPathSlugs: ["general", "preventive-cardiology", "heart-failure"],
    sections: [
      {
        h2: "About Cardiac Imaging Locum Jobs",
        paragraphs: [
          "Imaging-heavy locums may combine inpatient echo reads, outpatient stress/nuclear supervision, and structured reporting windows. Confirm PACS access and licensure for tele-reads.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "Level II/III echo or nuclear credentials as required, state license for on-site work, and privileging aligned with modality mix.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "Community hospitals and teleradiology-style read pools hire locum imagers for backlog clearance. Volume and turnaround drive compensation more than geography alone.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can cardiac imaging locums be remote?",
        a: "Some read pools are remote; on-site stress supervision and procedural oversight may still require travel—confirm in the contract.",
      },
    ],
  },
  {
    pathSlug: "structural-heart",
    legacySlug: "structural-heart",
    name: "Structural Heart",
    h1: "Locum Structural Heart Cardiology Jobs",
    titleKeyword: "structural heart cardiology locum jobs",
    metaDescription: specialtyMeta("structural heart"),
    intro:
      "Structural heart locum jobs cover TAVR, MitraClip, and other structural procedures in hybrid OR and heart-team settings. Volume, imaging requirements, and heart-team meeting time should be documented.",
    relatedPathSlugs: ["interventional", "electrophysiology", "general"],
    sections: [
      {
        h2: "About Structural Heart Locum Jobs",
        paragraphs: [
          "Programs need experienced structural operators for case backlog and proctoring requirements. Confirm imaging modality, valve types, and backup surgical pathways.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "Structural heart experience with documented case logs, hybrid OR privileges, and malpractice aligned with procedural risk.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "Growing TAVR programs in community and mid-size systems use locum structural cardiologists for launch and leave coverage. Case mix and call drive rates.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do structural locums require TAVR-specific credentialing?",
        a: "Yes—confirm valve types, annual volume requirements, and proctoring rules with the program before accepting.",
      },
    ],
  },
  {
    pathSlug: "preventive-cardiology",
    legacySlug: "preventive-cardiology",
    name: "Preventive Cardiology",
    h1: "Locum Preventive Cardiology Jobs",
    titleKeyword: "preventive cardiology locum jobs",
    metaDescription: specialtyMeta("preventive"),
    intro:
      "Preventive cardiology locum jobs focus on lipid clinics, cardio-metabolic risk assessment, hypertension programs, and lifestyle medicine outreach. Panel pace and screening volume should match your practice style.",
    relatedPathSlugs: ["general", "cardiac-imaging", "heart-failure"],
    sections: [
      {
        h2: "About Preventive Cardiology Locum Jobs",
        paragraphs: [
          "Assignments are often outpatient-heavy with fewer nights than procedural subspecialties. Confirm whether you cover inpatient lipid consults or clinic-only panels.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "Board certification in cardiovascular disease with preventive focus, state license, and clinic privileging.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "Employer wellness programs, academic prevention clinics, and health-system outreach hire locum preventive cardiologists for panel growth and leave.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are preventive cardiology locums mostly clinic-based?",
        a: "Typically yes—confirm inpatient consult expectations and call before committing.",
      },
    ],
  },
  {
    pathSlug: "pediatric-cardiology",
    legacySlug: "pediatric-cardiology",
    name: "Pediatric Cardiology",
    h1: "Locum Pediatric Cardiology Jobs",
    titleKeyword: "pediatric cardiology locum jobs",
    metaDescription: specialtyMeta("pediatric"),
    intro:
      "Pediatric cardiology locum jobs cover congenital heart disease consults, fetal cardiology, cath and EP for pediatrics, and ICU co-management. Confirm whether the role is pediatric-only or includes adult congenital overlap.",
    relatedPathSlugs: ["adult-congenital", "general", "heart-failure", "electrophysiology"],
    sections: [
      {
        h2: "About Pediatric Cardiology Locum Jobs",
        paragraphs: [
          "Children’s hospitals and pediatric programs within adult systems need locum pediatric cardiologists for subspecialty clinic and inpatient coverage. Define echo and cath lab pediatric scope.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "Pediatric cardiology board certification, state license, and hospital privileges at pediatric facilities.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "Pediatric locum demand concentrates in children’s hospitals and regional congenital programs. Call and cath lab coverage affect weekly rates.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do pediatric cardiology locums require fellowship training?",
        a: "Facilities typically require pediatric cardiology board certification or equivalent documented training.",
      },
    ],
  },
  {
    pathSlug: "adult-congenital",
    legacySlug: "adult-congenital-cardiology",
    name: "Adult Congenital Cardiology",
    h1: "Locum Adult Congenital Cardiology Jobs",
    titleKeyword: "adult congenital cardiology locum jobs",
    metaDescription: specialtyMeta("adult congenital"),
    intro:
      "Adult congenital cardiology locum jobs serve ACHD patients in specialized centers—complex echo, cath, EP, and heart-team coordination. ACHD fellowship or documented ACHD experience is typically required; confirm overlap with pediatric or general consult scope.",
    relatedPathSlugs: ["pediatric-cardiology", "general", "electrophysiology"],
    sections: [
      {
        h2: "About Adult Congenital Locum Jobs",
        paragraphs: [
          "ACHD locums may span clinic, complex imaging, catheterization, and arrhythmia management within congenital networks. Document surgical backup and whether the role includes general adult consult coverage.",
        ],
      },
      {
        h2: "Job Requirements",
        paragraphs: [
          "ACHD fellowship or equivalent experience, state license, privileges aligned with congenital cath and device scope, and malpractice for complex interventions when applicable.",
        ],
      },
      {
        h2: "Typical Locations & Pay",
        paragraphs: [
          "Regional congenital centers and academic ACHD programs hire locum cardiologists for clinic backlog and leave. Case complexity and call drive weekly rates.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is ACHD locum work different from pediatric cardiology locums?",
        a: "ACHD focuses on adults with congenital heart disease; pediatric locums focus on children. Some contracts blend both—confirm patient population upfront.",
      },
    ],
  },
];

export const CARDIOLOGY_PATH_SLUGS = CARDIOLOGY_LOCUM_SPECIALTIES.map((s) => s.pathSlug);

export function getCardiologySpecialtyByPathSlug(pathSlug: string): CardiologyLocumSpecialty | undefined {
  return CARDIOLOGY_LOCUM_SPECIALTIES.find((s) => s.pathSlug === pathSlug);
}

export function getCardiologySpecialtyByLegacySlug(legacySlug: string): CardiologyLocumSpecialty | undefined {
  const pathSlug = LEGACY_TO_PATH_SLUG[legacySlug];
  return pathSlug ? getCardiologySpecialtyByPathSlug(pathSlug) : undefined;
}

export function specialtyPageTitle(name: string): string {
  return specialtySerpTitle(name);
}

/** Anchor text variants for internal links — exact-match per SEO spec. */
export function specialtyLinkLabels(name: string): { jobs: string; tenens: string } {
  const base = name.toLowerCase();
  const shortName = name.replace(/ Cardiology$/i, "");
  const jobs = /cardiology/i.test(name) ? `${base} locum jobs` : `${base} cardiology locum jobs`;
  return {
    jobs,
    tenens: `locum tenens ${shortName}`,
  };
}
