import type { Metadata } from "next";
import { socialShareMetadata } from "@/lib/social-metadata";

export type StateLocumPage = {
  slug: string;
  stateName: string;
  code: string;
  title: string;
  description: string;
  h1: string;
  h2: string;
  keywords: string[];
  answer: string;
  whoFor: string[];
  intro: string;
  bullets: string[];
  faqs: { q: string; a: string }[];
};

export const STATE_LOCUM_PAGES: StateLocumPage[] = [
  {
    slug: "florida",
    stateName: "Florida",
    code: "FL",
    title: "Locum Tenens Jobs Florida | Travel Physician Jobs | Locum Career Hub",
    description:
      "Florida locum tenens jobs for hospitalists, ED, anesthesia, and more. Coastal and inland placements with licensing and credentialing support.",
    h1: "Locum Tenens Jobs in Florida: Demand, Flexibility, and Clear Expectations",
    h2: "When you want travel physician jobs—or local blocks—with less administrative drag",
    keywords: [
      "locum tenens Florida",
      "locum tenens jobs",
      "travel physician jobs",
      "locum physician jobs",
      "physician opportunities Florida",
    ],
    answer:
      "Florida locum tenens jobs are contract-based physician coverage roles across inpatient and procedural specialties—often used when clinicians want defined blocks, seasonal variety, or distance from a draining employed schedule.",
    whoFor: [
      "Physicians comparing travel physician jobs vs local Florida blocks",
      "Hospitalists and ED clinicians seeking locum tenens jobs with transparent census targets",
      "Clinicians using locums as a burnout buffer while deciding next steps",
    ],
    intro:
      "Florida’s patient growth continues to outpace staffing pipelines. Many physicians arrive here after months of invisible workload creep—not because they dislike patients, but because the week no longer fits a human life. Locum Career Hub connects you to teams that value reliability, clean handoffs, and respectful scheduling—whether you prefer coastal energy or Gulf Coast pace.",
    bullets: [
      "Compact and Florida-specific licensing guidance",
      "Seasonal surges and snowbird population planning",
      "Mix of academic, large-system, and independent community sites",
    ],
    faqs: [
      {
        q: "Do I need a Florida license before I inquire?",
        a: "Not always. Many assignments require an active Florida license, but we can map realistic timelines and interim options based on your current footprint.",
      },
      {
        q: "Are Florida locums only for travelers?",
        a: "No. Some clinicians choose local block work; others choose broader travel physician jobs. We match distance to your constraints.",
      },
      {
        q: "How do locum tenens jobs help if I am burned out?",
        a: "They can reduce certain structural stressors—clearer dates, fewer standing meetings—when expectations are documented. They are not a cure-all, but they can be a useful bridge.",
      },
    ],
  },
  {
    slug: "texas",
    stateName: "Texas",
    code: "TX",
    title: "Locum Tenens Jobs Texas | Locum Physician Jobs | Locum Career Hub",
    description:
      "Texas locum tenens jobs with strong weekly rates and diverse models—from major metros to community hospitals statewide.",
    h1: "Locum Tenens Jobs in Texas: Metro Depth and Community Impact",
    h2: "Compare stipends, malpractice, and call before you commit",
    keywords: [
      "locum tenens Texas",
      "locum tenens jobs",
      "locum opportunities Texas",
      "travel doctor jobs",
      "physician recruiter",
    ],
    answer:
      "Texas locum tenens jobs are contract physician roles across large IDNs and community hospitals—often attractive when you want competitive weekly rates with explicit call and backup expectations.",
    whoFor: [
      "Physicians exploring locum opportunities in Dallas, Houston, Austin, San Antonio, and beyond",
      "Clinicians who want flexible physician jobs without leaving clinical medicine",
      "Hospitalists comparing hospitalist locum jobs across systems",
    ],
    intro:
      "Texas blends volume, variety, and business-friendly operations. If your current role feels relentlessly heavy, you are allowed to want a different shape of work. We help you compare stipends, malpractice structures, and call expectations across systems so you pick the right cultural fit—not just the headline rate.",
    bullets: [
      "Rapid placement potential across large integrated networks",
      "Nocturnist and swing shift bundles when you want rhythm",
      "Travel stipends optimized for multi-week blocks",
    ],
    faqs: [
      {
        q: "Is Texas only for high-volume clinicians?",
        a: "No. Assignments vary by site. We document census, backup, and acuity mix so you can choose what matches your stamina.",
      },
      {
        q: "What specialties are most common for Texas locums?",
        a: "Hospital medicine, emergency medicine, anesthesia/CRNA, and outpatient specialties are common—but demand shifts quarterly.",
      },
    ],
  },
  {
    slug: "california",
    stateName: "California",
    code: "CA",
    title: "Locum Tenens Jobs California | Flexible Physician Work | Locum Career Hub",
    description:
      "California locum tenens opportunities with compliance-first support. Northern and Southern California placements for hospitalists, ED, and more.",
    h1: "Locum Tenens Jobs in California: Compliance-First, Premium Support",
    h2: "Navigate timelines, stipends, and expectations with recruiter-led clarity",
    keywords: [
      "locum tenens California",
      "locum tenens jobs",
      "flexible physician jobs",
      "travel physician jobs California",
    ],
    answer:
      "California locum tenens jobs are contract-based roles that require extra onboarding discipline—licensing timelines, documentation norms, and sometimes union environments—handled best with transparent expectations up front.",
    whoFor: [
      "Physicians who want flexible work but need realistic credentialing planning",
      "Clinicians comparing Northern vs Southern California travel physician jobs",
      "Anyone leaving hospital medicine who needs a structured bridge",
    ],
    intro:
      "California rewards preparation—and punishes vague promises. Locum Career Hub pairs you with teams experienced in California credentialing timelines, union environments when applicable, and transparent stipend and taxable wage structures.",
    bullets: [
      "Academic and county-adjacent models with clear expectations",
      "Support for licensing timelines and privilege packets",
      "Travel and housing strategies for cost-effective blocks",
    ],
    faqs: [
      {
        q: "Are California locums slower to start?",
        a: "Often yes. Timelines vary by facility and specialty. We build realistic dates so you are not surprised mid-process.",
      },
      {
        q: "Can I work part-time in California through locums?",
        a: "Many assignments are block-based. We help you match weekly intensity to your recovery needs—not just the headline rate.",
      },
    ],
  },
  {
    slug: "north-carolina",
    stateName: "North Carolina",
    code: "NC",
    title: "Locum Tenens Jobs North Carolina | Locum Career Hub",
    description:
      "North Carolina locum tenens jobs across growing health systems—hospital medicine, emergency care, and outpatient specialties with recruiter advocacy.",
    h1: "Locum Tenens Jobs in North Carolina: Growing Systems, Measured Pace",
    h2: "Flexible blocks when you want optionality without constant chaos",
    keywords: ["locum tenens North Carolina", "locum tenens jobs", "physician opportunities NC", "travel physician jobs"],
    answer:
      "North Carolina locum tenens jobs are contract physician roles across expanding metro and community markets—often a fit when you want strong demand with a more measured lifestyle footprint than the largest coastal metros.",
    whoFor: [
      "Physicians exploring flexible physician jobs in the Southeast",
      "Clinicians comparing locum opportunities near Research Triangle and Charlotte growth corridors",
    ],
    intro:
      "North Carolina continues to attract patient volume and health-system expansion. If you are seeking flexibility, the goal is not ‘more hustle’—it is clearer boundaries. We map staffing layers, backup, and documentation expectations before you interview.",
    bullets: [
      "Metro and community placements with documented census targets",
      "Credentialing roadmaps aligned to health-system networks",
      "Options for local blocks and selective travel",
    ],
    faqs: [
      {
        q: "Is North Carolina a good state for first-time locums?",
        a: "It can be—depending on specialty and site. We prioritize transparency on volume and support so your first assignment feels survivable.",
      },
    ],
  },
  {
    slug: "arizona",
    stateName: "Arizona",
    code: "AZ",
    title: "Locum Tenens Jobs Arizona | Locum Career Hub",
    description:
      "Arizona locum tenens jobs with seasonal demand context, transparent call expectations, and support for travel and local block models.",
    h1: "Locum Tenens Jobs in Arizona: Seasonal Demand, Clear Boundaries",
    h2: "Plan around population surges without sacrificing recovery time",
    keywords: ["locum tenens Arizona", "locum tenens jobs", "physician travel jobs Arizona", "moonlighting physician jobs"],
    answer:
      "Arizona locum tenens jobs combine seasonal patient-flow realities with diverse inpatient and outpatient needs—best approached with explicit call, heat-season pacing, and travel logistics discussed up front.",
    whoFor: [
      "Physicians seeking moonlighting physician jobs stacked as organized blocks",
      "Clinicians who want travel physician jobs with predictable off anchors",
    ],
    intro:
      "Arizona’s demand curve has seasonal texture. Many physicians use locums here to regain control of the calendar—whether that means short blocks, winter-season intensity you choose intentionally, or local weekend bundles.",
    bullets: [
      "Seasonal volume planning with honest staffing discussions",
      "Travel stipends and housing norms clarified before you sign",
      "ED, hospitalist, and outpatient pathways when clinically appropriate",
    ],
    faqs: [
      {
        q: "Do Arizona assignments always require heavy travel?",
        a: "No. Some clinicians choose local block work; others prefer broader travel. We align distance to your constraints.",
      },
    ],
  },
  {
    slug: "washington",
    stateName: "Washington",
    code: "WA",
    title: "Locum Tenens Jobs Washington State | Locum Career Hub",
    description:
      "Washington locum tenens jobs across the Pacific Northwest—transparent expectations for call, backup, and credentialing timelines.",
    h1: "Locum Tenens Jobs in Washington: Pacific Northwest Flexibility",
    h2: "When you want locum opportunities with documented support layers",
    keywords: ["locum tenens Washington", "locum tenens jobs", "physician opportunities Washington", "flexible physician jobs"],
    answer:
      "Washington locum tenens jobs are contract-based roles across urban and regional systems—often selected when physicians want strong inpatient demand with explicit expectations on call and documentation load.",
    whoFor: [
      "Physicians exploring flexible physician careers without leaving clinical medicine",
      "Clinicians comparing Seattle-metro vs regional community models",
    ],
    intro:
      "The Pacific Northwest attracts clinicians who want outdoor access and a different pace—but the work can still be intense without the right site fit. We prioritize backup, staffing ratios, and realistic commute assumptions.",
    bullets: [
      "Metro and regional community models with clear handoff norms",
      "Credentialing support aligned to health-system requirements",
      "Advocacy for sustainable census and documentation expectations",
    ],
    faqs: [
      {
        q: "Are Washington locums mostly metro?",
        a: "No. Demand spans Seattle-Tacoma and broader regional hospitals. We help you choose based on volume, backup, and commute reality.",
      },
    ],
  },
  {
    slug: "new-york",
    stateName: "New York",
    code: "NY",
    title: "Locum Tenens Jobs New York | Locum Physician Jobs | Locum Career Hub",
    description:
      "New York locum tenens jobs across metro and upstate systems—credentialing clarity, call transparency, and flexible block options.",
    h1: "Locum Tenens Jobs in New York: Metro Density, Measured Fit",
    h2: "Travel physician jobs and local blocks—with expectations documented first",
    keywords: [
      "locum tenens New York",
      "locum tenens jobs",
      "locum physician jobs New York",
      "travel physician jobs",
      "physician recruiter",
    ],
    answer:
      "New York locum tenens jobs are contract physician roles across dense metro and upstate markets—often chosen when clinicians need income clarity, defined blocks, or a bridge away from a draining employed schedule.",
    whoFor: [
      "Physicians comparing locum opportunities across NYC-adjacent and upstate systems",
      "Clinicians exploring career change for doctors scenarios who need runway",
      "Anyone seeking locum tenens jobs with explicit call and backup documentation",
    ],
    intro:
      "New York medicine can feel high-speed by default. If you are burned out, that pace is not a moral test—it is an environment problem. Locums will not fix every leadership issue, but contract blocks can create breathing room when expectations are written clearly and your recovery time is protected.",
    bullets: [
      "Credentialing and privileging timelines discussed with realistic owners",
      "Call, backup, and documentation load reviewed before interviews",
      "Options for multi-week travel blocks and selective local work",
    ],
    faqs: [
      {
        q: "Are New York locums only NYC?",
        a: "No. Demand exists across metro, suburban, and upstate models. We help you match acuity, commute, and lifestyle constraints.",
      },
      {
        q: "Can locums help if I am considering leaving hospital medicine?",
        a: "It can be a bridge: defined dates, fewer standing committees, and explicit volume expectations—while you decide what long-term fit looks like.",
      },
    ],
  },
];

export const STATE_LOCUM_SLUGS = STATE_LOCUM_PAGES.map((p) => p.slug);

export function getStateLocumPage(slug: string): StateLocumPage | undefined {
  return STATE_LOCUM_PAGES.find((p) => p.slug === slug);
}

export function buildStateLocumMetadata(page: StateLocumPage): Metadata {
  const path = `/locum-tenens-jobs/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    keywords: page.keywords,
    ...socialShareMetadata({
      title: page.title,
      description: page.description,
      path,
    }),
  };
}
