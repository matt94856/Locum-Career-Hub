import { US_STATE_SLUGS } from "@/lib/us-state-slugs";
import { getStateNameBySlug } from "@/lib/us-state-slugs";
import { CARDIOLOGY_METROS, metroSlug } from "@/lib/cardiology-programmatic/metros";
import {
  type CardiologyProgrammaticPage,
  hashSeed,
  pick,
} from "@/lib/cardiology-programmatic/content";

const SETTING_TYPES = [
  {
    key: "cath-lab",
    label: "Cath lab",
    h1Suffix: "Cath Lab Cardiology Locums",
    focus: "PCI, diagnostic cath, and STEMI activation with documented backup and case mix.",
  },
  {
    key: "inpatient-consult",
    label: "Inpatient cardiology consult",
    h1Suffix: "Inpatient Cardiology Consult Locums",
    focus: "Hospital consult services with daily census targets, call rules, and echo/stress oversight.",
  },
  {
    key: "outpatient-clinic",
    label: "Outpatient cardiology clinic",
    h1Suffix: "Outpatient Cardiology Clinic Locums",
    focus: "Clinic blocks with panel size, visit length, and prior-auth support defined upfront.",
  },
  {
    key: "telecardiology",
    label: "Telecardiology",
    h1Suffix: "Telecardiology Locum Coverage",
    focus: "Remote reads and teleconsults with licensure, callback, and turnaround SLAs in writing.",
  },
] as const;

const INTENT_PAGES: {
  slug: string;
  h1: string;
  title: string;
  description: string;
  focus: string;
}[] = [
  {
    slug: "cardiologist-moonlighting-locums",
    h1: "Cardiologist Moonlighting & Weekend Locums",
    title: "Cardiologist Moonlighting Jobs | Locum Blocks",
    description:
      "Weekend and after-hours cardiology locums for employed cardiologists—documented call, cath lab scope, and malpractice clarity.",
    focus: "moonlighting while employed",
  },
  {
    slug: "cardiologist-1099-locums",
    h1: "1099 Cardiologist Locum Tenens",
    title: "1099 Cardiologist Locums | Contractor Guide",
    description:
      "How 1099 cardiology locums differ from W-2 employed work—taxes, malpractice, and contract terms explained at a high level.",
    focus: "1099 contractor structure",
  },
  {
    slug: "cardiologist-credentialing-timeline",
    h1: "Cardiologist Locum Credentialing Timeline",
    title: "Cardiology Locum Credentialing | What to Expect",
    description:
      "Privileging, licensing, and FPPE timelines for cardiologist locums—realistic planning before your first block.",
    focus: "credentialing and privileging",
  },
  {
    slug: "cardiologist-leaving-employed-practice",
    h1: "Leaving Employed Cardiology for Locums",
    title: "Employed to Locum Cardiologist | Bridge Plan",
    description:
      "A structured bridge from employed cardiology to locum blocks—non-compete, tail coverage, and schedule design.",
    focus: "transition from employed practice",
  },
  {
    slug: "weekend-cardiology-locums",
    h1: "Weekend Cardiology Locum Coverage",
    title: "Weekend Cardiologist Locums | Block Schedules",
    description:
      "Weekend cath lab, consult, and clinic coverage for cardiologists who want defined boundaries.",
    focus: "weekend-only blocks",
  },
  {
    slug: "semi-retired-cardiologist-locums",
    h1: "Semi-Retired Cardiologist Locums",
    title: "Semi-Retirement Cardiology Locums",
    description:
      "Lower-intensity cardiology locum blocks for semi-retired cardiologists—clinic, reads, or selective call.",
    focus: "semi-retirement pacing",
  },
  {
    slug: "interventional-cardiologist-travel-locums",
    h1: "Travel Interventional Cardiologist Locums",
    title: "Travel Interventional Cardiology Jobs",
    description:
      "Travel interventional cardiology locums with stipends, STEMI rules, and case mix documented before you fly.",
    focus: "travel interventional assignments",
  },
  {
    slug: "general-cardiologist-locum-jobs",
    h1: "General Cardiologist Locum Jobs",
    title: "General Cardiology Locum Jobs Nationwide",
    description:
      "General cardiology locum roles—consult, clinic, and imaging—with recruiter advocacy and clear expectations.",
    focus: "general cardiology placements",
  },
  {
    slug: "electrophysiology-locum-jobs",
    h1: "Electrophysiology Locum Jobs",
    title: "EP Cardiologist Locum Jobs",
    description:
      "EP locums for ablation, devices, and arrhythmia consults—lab capabilities confirmed before you commit.",
    focus: "electrophysiology placements",
  },
  {
    slug: "heart-failure-cardiologist-locums",
    h1: "Heart Failure Cardiologist Locums",
    title: "Advanced Heart Failure Locum Jobs",
    description:
      "Heart failure and advanced therapy locums—document census, transplant-adjacent scope, and weekend coverage.",
    focus: "heart failure service coverage",
  },
  {
    slug: "cardiologist-locum-malpractice",
    h1: "Malpractice for Cardiologist Locums",
    title: "Cardiology Locum Malpractice Insurance",
    description:
      "Claims-made vs occurrence, tail, and limits for cardiology locums—questions to ask before signing.",
    focus: "malpractice structure",
  },
  {
    slug: "cardiologist-locum-pay-rates",
    h1: "Cardiologist Locum Pay & Rate Drivers",
    title: "Cardiology Locum Pay | Rate Factors",
    description:
      "What drives cardiology locum rates—call, STEMI, clinic panel, and subspecialty scope—without guaranteed pay claims.",
    focus: "compensation drivers",
  },
  {
    slug: "cardiologist-imlc-licensing",
    h1: "IMLC & Licensing for Cardiologist Locums",
    title: "Cardiologist Locum Licensing | IMLC Guide",
    description:
      "Multi-state licensing for cardiology locums—compact eligibility and realistic timelines.",
    focus: "licensing and IMLC",
  },
  {
    slug: "cardiologist-cath-lab-call",
    h1: "Cath Lab Call for Cardiologist Locums",
    title: "Cath Lab Call Coverage | Locum Cardiology",
    description:
      "Night and weekend cath lab call—STEMI activation, backup surgery, and add-on case rules for locum cardiologists.",
    focus: "cath lab call expectations",
  },
  {
    slug: "cardiologist-stemi-coverage",
    h1: "STEMI Coverage for Locum Cardiologists",
    title: "STEMI Call Locum Cardiology Jobs",
    description:
      "STEMI activation roles for interventional cardiologist locums—transport, primary PCI, and backup documented.",
    focus: "STEMI activation",
  },
  {
    slug: "cardiologist-echo-read-locums",
    h1: "Echo Read Pools for Cardiologist Locums",
    title: "Cardiology Echo Locum Reads",
    description:
      "Echo interpretation locums with turnaround SLAs, callback rules, and daily read volumes in writing.",
    focus: "echo interpretation",
  },
  {
    slug: "cardiologist-burnout-locums-bridge",
    h1: "Cardiologist Burnout & Locums Bridge",
    title: "Burned-Out Cardiologist? Locum Bridge Options",
    description:
      "Locum blocks as a bridge when employed cardiology pace is unsustainable—defined dates and documented workload.",
    focus: "burnout recovery bridge",
  },
  {
    slug: "cardiologist-locum-contract-review",
    h1: "Cardiologist Locum Contract Review Checklist",
    title: "Cardiology Locum Contract Checklist",
    description:
      "Key cardiology locum contract terms—call, census, cancellation, and malpractice—before you sign.",
    focus: "contract review",
  },
  {
    slug: "cardiologist-locum-stipends",
    h1: "Travel Stipends for Cardiologist Locums",
    title: "Cardiology Locum Travel & Housing Stipends",
    description:
      "Air, lodging, and rental car stipends for traveling cardiologists—what to confirm in writing.",
    focus: "travel stipends",
  },
  {
    slug: "cardiologist-new-attending-locums",
    h1: "New Attending Cardiologist Locums",
    title: "Early-Career Cardiologist Locum Jobs",
    description:
      "Locum options for newly board-certified cardiologists—credentialing paths and mentorship-forward sites.",
    focus: "early-career cardiologists",
  },
  {
    slug: "cardiologist-locum-tenens-meaning",
    h1: "Locum Tenens for Cardiologists Explained",
    title: "What Is Locum Tenens for Cardiologists?",
    description:
      "Plain-language explainer of locum tenens for cardiologists—how blocks, pay, and recruiting work.",
    focus: "locum tenens basics",
  },
  {
    slug: "cardiologist-hospital-privileging",
    h1: "Hospital Privileging for Locum Cardiologists",
    title: "Cardiology Hospital Privileging | Locums",
    description:
      "Temporary and full privileging for cardiology locums—FPPE, case logs, and cath lab scope.",
    focus: "hospital privileging",
  },
  {
    slug: "cardiologist-tavr-locum-coverage",
    h1: "TAVR & Structural Heart Locum Coverage",
    title: "TAVR Locum Cardiologist Jobs",
    description:
      "Structural heart and TAVR locums—heart team time, imaging prerequisites, and case mix.",
    focus: "TAVR and structural heart",
  },
  {
    slug: "cardiologist-nuclear-cardiology-locums",
    h1: "Nuclear Cardiology Locum Reads",
    title: "Nuclear Cardiology Locum Jobs",
    description:
      "Nuclear reads and stress test supervision for cardiology locums—volume and radiation safety context.",
    focus: "nuclear cardiology",
  },
  {
    slug: "cardiologist-part-time-locums",
    h1: "Part-Time Cardiologist Locum Blocks",
    title: "Part-Time Cardiology Locum Jobs",
    description:
      "Partial FTE and part-time cardiology locum blocks—clinic weeks without full call burden.",
    focus: "part-time blocks",
  },
  {
    slug: "cardiologist-locum-recruiter",
    h1: "Cardiologist Locum Recruiter (Physician-First)",
    title: "Cardiology Locum Recruiter | Locum Career Hub",
    description:
      "Physician recruiter for cardiologist locums only—transparent matching, not a job-board blast.",
    focus: "recruiter-led matching",
  },
  {
    slug: "cardiologist-rural-locums",
    h1: "Rural Cardiologist Locum Jobs",
    title: "Rural Cardiology Locum Coverage",
    description:
      "Rural and critical-access cardiology locums—transport, STEMI pathways, and backup plans.",
    focus: "rural cardiology coverage",
  },
  {
    slug: "cardiologist-academic-locums",
    h1: "Academic Cardiologist Locum Coverage",
    title: "Academic Cardiology Locum Jobs",
    description:
      "Academic medical center cardiology locums—teaching load, fellows, and lab access clarified upfront.",
    focus: "academic settings",
  },
  {
    slug: "cardiologist-locum-cancellation-policy",
    h1: "Cancellation Terms for Cardiology Locums",
    title: "Cardiology Locum Cancellation Clauses",
    description:
      "Cancellation and weather policies for cardiologist locum contracts—what to negotiate.",
    focus: "cancellation clauses",
  },
  {
    slug: "cardiologist-locum-vs-employed",
    h1: "Locum vs Employed Cardiologist",
    title: "Locum vs Employed Cardiology Compared",
    description:
      "Compare employed and locum cardiology paths—schedule, pay structure, and lifestyle tradeoffs at a high level.",
    focus: "employed vs locum comparison",
  },
  {
    slug: "cardiologist-locum-tax-basics",
    h1: "Tax Basics for 1099 Cardiologist Locums",
    title: "Cardiology Locum Taxes (Overview)",
    description:
      "High-level tax considerations for 1099 cardiologist locums—not individualized tax advice.",
    focus: "tax overview",
  },
  {
    slug: "cardiologist-call-pay-locums",
    h1: "Call Pay for Cardiologist Locums",
    title: "Cardiology Locum Call Pay",
    description:
      "How call pay is structured for cardiology locums—nights, weekends, and STEMI activation.",
    focus: "call pay structure",
  },
  {
    slug: "cardiologist-locum-orientation",
    h1: "Orientation for Cardiologist Locum Assignments",
    title: "Cardiology Locum Orientation Days",
    description:
      "Paid orientation, EHR training, and proctoring for cardiologist locums—document before start.",
    focus: "orientation expectations",
  },
  {
    slug: "cardiologist-locum-non-compete",
    h1: "Non-Compete & Cardiologist Locums",
    title: "Non-Compete Clauses for Cardiology Locums",
    description:
      "How non-compete language interacts with cardiology locum contracts—questions for your attorney.",
    focus: "non-compete considerations",
  },
  {
    slug: "cardiologist-device-clinic-locums",
    h1: "Device Clinic Locums for EP Cardiologists",
    title: "Cardiac Device Clinic Locum Jobs",
    description:
      "Pacemaker and ICD clinic locums—panel size, device reps, and remote monitoring expectations.",
    focus: "device clinic coverage",
  },
  {
    slug: "cardiologist-stress-test-supervision",
    h1: "Stress Test Supervision for Locum Cardiologists",
    title: "Stress Lab Supervision Locums",
    description:
      "Supervision agreements for exercise and pharmacologic stress testing on cardiology locum assignments.",
    focus: "stress test supervision",
  },
  {
    slug: "cardiologist-locum-faq",
    h1: "Cardiologist Locum Tenens FAQ",
    title: "Cardiology Locum FAQ | Locum Career Hub",
    description:
      "Frequently asked questions about cardiologist locum tenens—credentialing, pay drivers, and recruiter fit.",
    focus: "common questions",
  },
];

function baseSections(seed: number, geoLabel: string, focus: string): CardiologyProgrammaticPage["sections"] {
  const intros = [
    `${geoLabel} cardiology programs compete for the same finite pool of subspecialists. Locum Career Hub is a physician recruiter—we introduce cardiologists to vetted hospitals and groups; we are not the employer of record.`,
    `When ${focus} is on the table, the details that matter are almost always operational: call, cath lab access, consult census, and malpractice structure—not slogans.`,
    `Cardiologists evaluating ${geoLabel} should treat every locum offer like a short-term partnership: document expectations before you book travel or block clinic schedules.`,
  ];
  return [
    {
      h2: pick(
        [`What cardiologist locums look like in ${geoLabel}`, `How ${geoLabel} cardiology locum demand is shaping up`, `${geoLabel}: cardiology locum market context`],
        seed,
      ),
      paragraphs: [
        pick(intros, seed),
        pick(
          [
            `Facilities in ${geoLabel} often need coverage for vacations, parental leave, volume growth, or service-line launches. The best fits spell out STEMI pathways (when interventional), echo turnaround, and who backs you up at night.`,
            `We help cardiologists compare blocks with written workload rules—consult caps, clinic panel size, or cath lab activation windows—so you can decide if the pace is sustainable.`,
            `If you are new to locums, start with availability, subspecialty, and travel radius; we map realistic options rather than blasting unrelated openings.`,
          ],
          seed,
          1,
        ),
      ],
    },
    {
      h2: pick(["Credentialing & privileging for cardiologists", "Licensing before your first block", "What slows cardiology locum starts"], seed, 2),
      paragraphs: [
        pick(
          [
            `Cardiology credentialing usually includes case logs for procedural subspecialties, echo privileges, and sometimes stress-lab supervision agreements. Timelines vary by state medical board and hospital committee calendars—not by recruiter promises.`,
            `Share your active licenses, board status, and whether you need temporary privileges. We align introductions with sites that can support your timeline.`,
            `Malpractice structure (claims-made vs occurrence, tail, limits) should be resolved before you commit—especially for cath lab and STEMI roles.`,
          ],
          seed,
          3,
        ),
      ],
    },
    {
      h2: pick(["Rate drivers (not guarantees)", "How cardiology locum pay is usually structured", "What affects your weekly range"], seed, 4),
      paragraphs: [
        pick(
          [
            `Pay reflects call burden, STEMI responsibility, clinic panel size, and subspecialty—not just geography. We discuss ranges in context; we do not guarantee income.`,
            `Travel stipends, lodging, and cancellation terms belong in the contract. Cardiologists should compare total package and lifestyle load, not a headline rate alone.`,
            `Use our salary estimator as a directional tool—your contract may differ based on scope and site acuity.`,
          ],
          seed,
          5,
        ),
      ],
    },
    {
      h2: "Next step: cardiologist-only matching",
      paragraphs: [
        `Locum Career Hub recruits cardiologists only. Submit your subspecialty, license states, and target dates—we follow up with realistic locum options and documented expectations.`,
      ],
    },
  ];
}

function baseFaqs(seed: number, geoLabel: string): { q: string; a: string }[] {
  return [
    {
      q: pick(
        [`Do I need a license in ${geoLabel} before inquiring?`, `Can I locum in ${geoLabel} while licensed elsewhere?`, `How does licensing work for ${geoLabel} cardiology locums?`],
        seed,
      ),
      a: "Requirements vary by assignment. Share your current licenses and dates—we map compact eligibility, full licenses, and realistic privileging timelines.",
    },
    {
      q: "Does Locum Career Hub employ cardiologists directly?",
      a: "No. We are a physician recruiting service that connects cardiologists with hospitals and groups exploring locum coverage. Your contract is with the hiring organization.",
    },
    {
      q: pick(
        ["What subspecialties do you recruit?", "Do you place interventional and general cardiologists?", "Can EP and heart failure cardiologists inquire?"],
        seed,
        1,
      ),
      a: "We recruit cardiologists across general, interventional, EP, heart failure, imaging, structural, and preventive cardiology—MD/DO only.",
    },
    {
      q: "What should be documented before I accept a block?",
      a: "Call schedule, consult or clinic volume, cath lab/STEMI scope, malpractice, cancellation, and travel stipends—written, not verbal.",
    },
    {
      q: pick(
        ["How fast will someone follow up?", "What happens after I submit the form?", "Is this a job-board blast?"],
        seed,
        2,
      ),
      a: "A physician recruiter reviews cardiologist inquiries personally—typically within one business day—with matches that fit your stated boundaries.",
    },
  ];
}

function buildMetroPage(metro: (typeof CARDIOLOGY_METROS)[number]): CardiologyProgrammaticPage {
  const slug = metroSlug(metro);
  const seed = hashSeed(slug);
  const geoLabel = `${metro.city}, ${metro.state}`;
  const stateHref = `/locum-tenens-jobs/${metro.stateSlug}`;
  return {
    slug,
    kind: "metro",
    title: `Cardiologist Locum Jobs in ${geoLabel} | Locum Career Hub`,
    metaDescription: `Cardiologist locum tenens jobs in ${geoLabel}—cath lab, consult, and clinic blocks with documented call and credentialing context. Recruiter match, not a job-board blast.`,
    h1: `Cardiologist Locum Jobs in ${geoLabel}`,
    h2: pick(
      [
        "Interventional, general, and EP coverage—with expectations written before day one",
        "Compare cath lab call, consult census, and stipends with a cardiologist-only recruiter",
        "Travel or local blocks for cardiologists who want clearer boundaries",
      ],
      seed,
    ),
    keywords: [
      `cardiologist locum jobs ${metro.city}`,
      `cardiology locum tenens ${metro.state}`,
      "cardiologist locum tenens",
      "interventional cardiologist locum",
    ],
    directAnswer: `Cardiologist locum jobs in ${geoLabel} are contract-based cardiology assignments—often inpatient consult, cath lab, clinic, or imaging coverage—where licensing, privileging, and call rules should be documented before you start.`,
    intro: `${geoLabel} health systems periodically need cardiologist locum coverage for leave, volume surges, and program expansion. Locum Career Hub matches MD/DO cardiologists to opportunities with transparent workload and recruiter advocacy—we do not employ clinicians at hospitals.`,
    sections: baseSections(seed, geoLabel, `cardiologist locums in ${geoLabel}`),
    faqs: baseFaqs(seed, geoLabel),
    relatedLinks: [
      { href: stateHref, title: `Cardiology locums in ${metro.state}` },
      { href: "/physician-opportunities#lead-form", title: "Submit cardiologist preferences" },
      { href: "/specialties/general-cardiology", title: "General cardiology locums" },
      { href: "/cardiologist-locums-calculator", title: "Cardiologist locums calculator" },
    ],
  };
}

function buildSettingPage(stateSlug: string, setting: (typeof SETTING_TYPES)[number]): CardiologyProgrammaticPage | null {
  const stateName = getStateNameBySlug(stateSlug);
  if (!stateName) return null;
  const slug = `${setting.key}-cardiology-locums-${stateSlug}`;
  const seed = hashSeed(slug);
  const geoLabel = stateName;
  return {
    slug,
    kind: "setting",
    title: `${setting.label} Cardiology Locums in ${stateName} | Locum Career Hub`,
    metaDescription: `${stateName} ${setting.label.toLowerCase()} cardiology locum coverage—${setting.focus} Recruiter-led cardiologist matching.`,
    h1: `${setting.h1Suffix} in ${stateName}`,
    h2: pick(
      [
        "Cardiologist-only recruiting with documented scope",
        "Compare malpractice, call, and credentialing before you commit",
        "Blocks that fit subspecialty-trained cardiologists",
      ],
      seed,
    ),
    keywords: [
      `${setting.key} cardiology locums ${stateName}`,
      "cardiologist locum tenens",
      `cardiology locum jobs ${stateName}`,
    ],
    directAnswer: `${setting.label} cardiology locums in ${stateName} are short-term cardiologist assignments focused on ${setting.focus}`,
    intro: `Hospitals and cardiology groups in ${stateName} use locum cardiologists for ${setting.label.toLowerCase()} coverage when employed schedules cannot absorb demand. We help MD/DO cardiologists review scope, call, and credentialing before accepting a block.`,
    sections: baseSections(seed, geoLabel, setting.label.toLowerCase()),
    faqs: baseFaqs(seed, geoLabel),
    relatedLinks: [
      { href: `/locum-tenens-jobs/${stateSlug}`, title: `All cardiology locums in ${stateName}` },
      { href: `/locum-tenens-jobs/${stateSlug}/interventional-cardiology`, title: `Interventional cardiology locums in ${stateName}` },
      { href: "/physician-opportunities#lead-form", title: "Cardiologist inquiry form" },
    ],
  };
}

function buildIntentPage(intent: (typeof INTENT_PAGES)[number]): CardiologyProgrammaticPage {
  const seed = hashSeed(intent.slug);
  return {
    slug: intent.slug,
    kind: "intent",
    title: intent.title,
    metaDescription: intent.description,
    h1: intent.h1,
    h2: pick(
      [
        "Cardiologist-only guidance from a physician recruiter",
        "Documented expectations—not vague staffing promises",
        "Explore locum blocks when employed cardiology no longer fits",
      ],
      seed,
    ),
    keywords: ["cardiologist locum tenens", "cardiology locum jobs", "cardiologist recruiter", intent.focus],
    directAnswer: `This guide covers ${intent.focus} for cardiologists considering locum tenens—educational context from Locum Career Hub, a cardiologist-only recruiting service.`,
    intro: `Cardiologists ask about ${intent.focus} when exploring locum tenens. Locum Career Hub recruits cardiologists exclusively; we connect you with hospitals and groups—we are not your employer.`,
    sections: baseSections(seed, "nationwide", intent.focus),
    faqs: baseFaqs(seed, "your target state"),
    relatedLinks: [
      { href: "/physician-opportunities#lead-form", title: "Request cardiologist matches" },
      { href: "/locum-tenens-jobs", title: "Cardiology locums by state" },
      { href: "/physicians-guide-to-locum-tenens", title: "Cardiologist guide to locums" },
    ],
  };
}

export function generateAllCardiologyProgrammaticPages(): CardiologyProgrammaticPage[] {
  const metros = CARDIOLOGY_METROS.map(buildMetroPage);
  const settings = US_STATE_SLUGS.flatMap((stateSlug) =>
    SETTING_TYPES.map((s) => buildSettingPage(stateSlug, s)).filter(Boolean),
  ) as CardiologyProgrammaticPage[];
  const intents = INTENT_PAGES.map(buildIntentPage);
  const bySlug = new Map<string, CardiologyProgrammaticPage>();
  for (const p of [...metros, ...settings, ...intents]) {
    if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
  }
  return [...bySlug.values()];
}
