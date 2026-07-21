import { cardiologySpecialtyPath } from "@/lib/seo/cardiology-locum-jobs-config";
import type { JobSeoPageContent } from "@/lib/cardiology-authority/types";
import { getStateNameBySlug } from "@/lib/us-state-slugs";

export type JobSpecialtyDef = {
  /** URL segment e.g. `interventional-cardiology` */
  slug: string;
  pathSlug: string;
  name: string;
  keyword: string;
};

export const JOB_SPECIALTY_DEFS: JobSpecialtyDef[] = [
  { slug: "general-cardiology", pathSlug: "general", name: "General Cardiology", keyword: "general cardiology locum" },
  {
    slug: "interventional-cardiology",
    pathSlug: "interventional",
    name: "Interventional Cardiology",
    keyword: "interventional cardiology locum",
  },
  { slug: "electrophysiology", pathSlug: "electrophysiology", name: "Electrophysiology", keyword: "EP locum cardiology" },
  { slug: "heart-failure", pathSlug: "heart-failure", name: "Heart Failure", keyword: "heart failure locum" },
  { slug: "cardiac-imaging", pathSlug: "cardiac-imaging", name: "Cardiac Imaging", keyword: "cardiac imaging locum" },
  { slug: "structural-heart", pathSlug: "structural-heart", name: "Structural Heart", keyword: "structural heart locum" },
  {
    slug: "preventive-cardiology",
    pathSlug: "preventive-cardiology",
    name: "Preventive Cardiology",
    keyword: "preventive cardiology locum",
  },
  {
    slug: "pediatric-cardiology",
    pathSlug: "pediatric-cardiology",
    name: "Pediatric Cardiology",
    keyword: "pediatric cardiology locum",
  },
  {
    slug: "adult-congenital-cardiology",
    pathSlug: "adult-congenital",
    name: "Adult Congenital Cardiology",
    keyword: "adult congenital locum",
  },
];

export const JOB_SPECIALTY_SLUGS = JOB_SPECIALTY_DEFS.map((d) => d.slug);

export function getJobSpecialtyDef(slug: string): JobSpecialtyDef | undefined {
  return JOB_SPECIALTY_DEFS.find((d) => d.slug === slug);
}

export function jobStatePath(stateSlug: string): string {
  return `/locum-tenens-jobs/${stateSlug}`;
}

export function jobStateSpecialtyPath(stateSlug: string, specialtySlug: string): string {
  return `/locum-tenens-jobs/${stateSlug}/${specialtySlug}`;
}

const HIGH_VOLUME_STATES = new Set(["florida", "texas", "california", "new-york", "north-carolina"]);

function stateDemandNote(stateName: string, stateSlug: string): string {
  if (HIGH_VOLUME_STATES.has(stateSlug)) {
    return `${stateName} shows sustained demand for cardiology locum coverage across community hospitals, regional STEMI networks, and metro academic affiliates—licensing lead times and privileging should be planned early.`;
  }
  return `${stateName} cardiology programs use locum cardiologists for leave, volume spikes, and recruitment gaps—compare travel stipends and call documentation before committing.`;
}

function flagshipStateParagraph(stateName: string, stateSlug: string): string | null {
  const notes: Record<string, string> = {
    florida:
      "Florida mixes year-round inpatient volume with seasonal population swings—interventional and general cardiologists often see cath lab call tied to STEMI networks from Tampa through South Florida, while snowbird season can tighten clinic panels on both coasts.",
    texas:
      "Texas spans large independent cardiology groups and system-employed models—Houston, Dallas, Austin, and San Antonio each credential differently, so travel stipends and malpractice tail language should be compared before multi-site blocks.",
    california:
      "California licensing and privileging timelines are among the longest—plan IMLC or direct licensure early, and document whether your locum block includes tele-EP reads, outpatient stress testing, or full cath lab activation.",
    "new-york":
      "New York metro programs frequently need locum coverage for consult-heavy services and cath lab backup—document inpatient census caps, weekend echo coverage, and who activates the STEMI team before you accept a block.",
    "north-carolina":
      "North Carolina’s growing health systems recruit locum cardiologists for heart failure clinics, structural programs, and community STEMI partnerships—Research Triangle and Charlotte markets differ on travel expectations and stipend norms.",
  };
  return notes[stateSlug] ?? null;
}

export function buildJobStatePage(stateSlug: string): JobSeoPageContent | undefined {
  const stateName = getStateNameBySlug(stateSlug);
  if (!stateName) return undefined;

  return {
    stateSlug,
    stateName,
    title: `Cardiology Locum Jobs in ${stateName} | Locum Career Hub`,
    metaDescription: `${stateName} cardiologist locum tenens jobs—subspecialty-aware matching, licensing context, and recruiter advocacy. Cardiologists only. Not guaranteed offers.`,
    h1: `Cardiology Locum Jobs in ${stateName}`,
    directAnswer: `${stateName} cardiology locum jobs are contract-based cardiologist assignments—consult, cath lab, clinic, imaging, or EP coverage—where state licensing, hospital privileging, and call rules should be documented before you start. Locum Career Hub recruits cardiologists only; we are not the employer.`,
    sections: [
      {
        h2: `Why hospitals in ${stateName} hire locum cardiologists`,
        paragraphs: [
          stateDemandNote(stateName, stateSlug),
          flagshipStateParagraph(stateName, stateSlug) ??
            "Programs reference ACC and ABIM expectations for board-certified cardiologists. Locum blocks fill leave, census growth, and permanent search gaps without implying guaranteed compensation on this page.",
        ],
      },
      {
        h2: "Browse by cardiology subspecialty",
        paragraphs: [
          `Use the subspecialty links below for ${stateName}-specific context on interventional, EP, general, heart failure, imaging, structural, preventive, pediatric, and adult congenital locum coverage—each page adds scope and credentialing notes unique to that discipline.`,
        ],
      },
      {
        h2: "Licensing and credentialing in this state",
        paragraphs: [
          `Start ${stateName} medical licensing early if you plan travel blocks. Hospital privileging—including cath lab, EP lab, or echo scope—often sets the critical path after licensure.`,
          "See our state licensing guide and fifty-one state cardiologist salary pages for complementary context.",
        ],
      },
    ],
    faqs: [
      {
        q: `Do I need a ${stateName} license before inquiring?`,
        a: "Requirements vary by assignment. Share current licenses and target dates—we map realistic paths.",
      },
      {
        q: "Does this page list guaranteed job openings?",
        a: "No—this is educational SEO content. Submit an inquiry for recruiter-led matching when mutual fit exists.",
      },
    ],
  };
}

export function buildJobStateSpecialtyPage(
  stateSlug: string,
  specialtySlug: string,
): JobSeoPageContent | undefined {
  const stateName = getStateNameBySlug(stateSlug);
  const spec = getJobSpecialtyDef(specialtySlug);
  if (!stateName || !spec) return undefined;

  const specialtyHub = cardiologySpecialtyPath(spec.pathSlug);

  return {
    stateSlug,
    stateName,
    specialtyPathSlug: spec.pathSlug,
    specialtyName: spec.name,
    title: `${spec.name} Locum Jobs in ${stateName} | Locum Career Hub`,
    metaDescription: `${stateName} ${spec.keyword} jobs—credentialing context, scope documentation, and cardiologist-only recruiter matching. Educational—not guaranteed offers.`,
    h1: `${spec.name} Locum Jobs in ${stateName}`,
    directAnswer: `${stateName} ${spec.name.toLowerCase()} locum jobs are temporary cardiologist contracts requiring state licensure, hospital privileging aligned with ${spec.name.toLowerCase()} scope, and documented call or lab expectations. Locum Career Hub matches MD/DO cardiologists only—we do not employ physicians.`,
    sections: [
      {
        h2: `${spec.name} demand in ${stateName}`,
        paragraphs: [
          stateDemandNote(stateName, stateSlug),
          flagshipStateParagraph(stateName, stateSlug) ??
            `${spec.name} locums in ${stateName} should spell out cath lab, consult census, clinic panel, imaging SLA, or EP lab scope before day one—see our national ${spec.name.toLowerCase()} hub for subspecialty-specific checklists.`,
        ],
      },
      {
        h2: "Related resources",
        paragraphs: [
          `National pillar: ${specialtyHub}. Compare locum vs permanent options, credentialing timelines, and malpractice coverage in our cardiology resources library.`,
        ],
      },
    ],
    faqs: [
      {
        q: `How do I find ${spec.name.toLowerCase()} locums in ${stateName}?`,
        a: "Submit subspecialty, state, and availability through Locum Career Hub—we respond with realistic options or a direct no-fit within one business day.",
      },
      {
        q: "Are rates published on this page?",
        a: "No—use salary guides for directional context; hospitals set final offers.",
      },
    ],
  };
}
