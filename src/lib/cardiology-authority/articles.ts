import { CARDIOLOGY_HUB_PATH, cardiologySpecialtyPath } from "@/lib/seo/cardiology-locum-jobs-config";
import type { CardiologyArticle } from "@/lib/cardiology-authority/types";
import { defaultEeatMeta } from "@/lib/cardiology-authority/eeat";
import { expandArticleSections } from "@/lib/cardiology-authority/article-expansion";

const RESOURCES_PATH = "/resources" as const;

function articlePath(slug: string) {
  return `${RESOURCES_PATH}/${slug}`;
}

/** Phase 3 informational articles — cardiologist-only, recruiter-disclosed, answer-first. */
export const CARDIOLOGY_ARTICLES: CardiologyArticle[] = [
  {
    slug: "how-much-do-locum-cardiologists-make",
    path: articlePath("how-much-do-locum-cardiologists-make"),
    title: "How Much Do Locum Cardiologists Make?",
    metaDescription:
      "Directional locum cardiologist pay ranges by subspecialty, call, and geography. Educational—not guaranteed offers. Locum Career Hub recruits cardiologists only.",
    h1: "How Much Do Locum Cardiologists Make?",
    directAnswer:
      "Locum cardiologist pay is usually quoted as weekly gross contract rates that vary by subspecialty, call burden, and site acuity. Interventional and EP blocks with STEMI or overnight call often sit at the higher end of national distributions; general consult and clinic-heavy roles differ. Figures here are market context—not offers from Locum Career Hub.",
    keywords: ["locum cardiologist salary", "how much do locum cardiologists make", "cardiology locum pay"],
    relatedArticleSlugs: ["locum-cardiologist-salary-guide", "rvu-compensation-cardiologists", "best-states-for-locum-cardiologists"],
    relatedSpecialtyPathSlugs: ["interventional", "general", "electrophysiology"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "What drives locum cardiologist compensation?",
        paragraphs: [
          "Cardiology locum pay is not a single number. Hospitals price coverage based on STEMI activation responsibility, cath lab case mix, consult census, clinic panel size, imaging read pools, and whether you are local or traveling. The American College of Cardiology (ACC) and specialty societies emphasize documented scope and quality metrics—those same scope variables move locum rates.",
          "Locum Career Hub is a recruiting and matching service, not your employer. We help cardiologists compare written expectations (call, cath lab, consult caps) alongside directional rate bands before you pursue privileging.",
        ],
      },
      {
        h2: "Subspecialty pay differences",
        paragraphs: [
          "Interventional cardiology locums with PCI and STEMI call typically command premium weekly rates relative to non-invasive consult roles. Electrophysiology locums hinge on ablation day volume, device clinic load, and arrhythmia call. Heart failure and structural heart programs may include weekend census and heart-team obligations that should be compensated or explicitly excluded.",
          "General cardiology locums spanning consult, clinic, echo supervision, and selective call sit in a broad middle band—still highly sensitive to nights and backup staffing.",
        ],
      },
      {
        h2: "1099 structure and stipends",
        paragraphs: [
          "Most locum cardiologists contract as independent professionals (often 1099). Weekly rates may exclude travel, lodging, and malpractice—stipends should be documented separately. Compare W-2 employed packages using total compensation, not headline salary alone.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are locum cardiologist salary posts online accurate?",
        a: "Forums and aggregator posts mix subspecialties and omit call burden. Use them as rough context only—confirm scope and rates in writing for your specific assignment.",
      },
      {
        q: "Does Locum Career Hub guarantee a pay rate?",
        a: "No. We provide recruiter-led context and advocate during negotiations; hospitals set final offers.",
      },
    ],
  },
  {
    slug: "locum-cardiologist-salary-guide",
    path: articlePath("locum-cardiologist-salary-guide"),
    title: "Locum Cardiologist Salary Guide",
    metaDescription:
      "Complete locum cardiologist salary guide—subspecialty drivers, stipends, call pay, and state context. Cardiologist-only recruiting.",
    h1: "Locum Cardiologist Salary Guide",
    directAnswer:
      "A locum cardiologist salary guide should compare subspecialty, call, acuity, travel, and contract structure—not a single national average. Use state salary pages and subspecialty hubs to contextualize offers; Locum Career Hub does not publish guaranteed compensation.",
    keywords: ["locum cardiologist salary guide", "cardiologist locum tenens salary", "cardiology compensation"],
    relatedArticleSlugs: ["how-much-do-locum-cardiologists-make", "locum-vs-permanent-cardiology-jobs"],
    relatedSpecialtyPathSlugs: ["general", "heart-failure", "cardiac-imaging"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Employed vs locum cardiology pay",
        paragraphs: [
          "Employed cardiologists often receive benefits, retirement, and malpractice tail support bundled into W-2 packages. Locum contracts trade some benefits for higher weekly gross and schedule flexibility—but only when call, travel, and credentialing costs are modeled honestly.",
        ],
      },
      {
        h2: "Where to find state and subspecialty context",
        paragraphs: [
          "Browse our salary hub and fifty-one state cardiologist salary guides for licensing and demand notes. Pair those with subspecialty pages under the cardiology jobs hub for scope-specific pay drivers.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I use RVU benchmarks for locums?",
        a: "Many locum cardiology contracts are daily or weekly rates, not RVU-based—but understanding RVU culture at a site still helps you judge workload intensity.",
      },
    ],
  },
  {
    slug: "locum-vs-permanent-cardiology-jobs",
    path: articlePath("locum-vs-permanent-cardiology-jobs"),
    title: "Locum vs Permanent Cardiology Jobs",
    metaDescription:
      "Compare locum tenens and permanent cardiology careers—call, compensation, credentialing, and lifestyle for board-certified cardiologists.",
    h1: "Locum vs Permanent Cardiology Jobs",
    directAnswer:
      "Locum cardiology jobs offer defined contract windows and often clearer call boundaries; permanent roles offer stability, benefits, and long-term program integration. The better fit depends on subspecialty, family constraints, and whether your pain point is schedule, culture, or compensation structure.",
    keywords: ["locum vs permanent cardiology", "cardiologist career options", "locum tenens cardiology"],
    relatedArticleSlugs: ["leaving-hospital-employment-for-locums", "how-to-become-a-locum-cardiologist"],
    relatedSpecialtyPathSlugs: ["general", "interventional"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "When locums fits cardiologists",
        paragraphs: [
          "Cardiologists often explore locums when employed call, clinic panel creep, or administrative load outpaces recovery time. Contract blocks can create runway while you evaluate permanent options—especially if STEMI rules and consult census are documented upfront.",
        ],
      },
      {
        h2: "When permanent fits better",
        paragraphs: [
          "If you want deep program building, research integration, or long-term TAVR/structural program leadership, permanent employment may align better. Locums can still supplement—but moonlighting policies and non-competes matter.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I mix locum and employed cardiology?",
        a: "Many cardiologists moonlight with written employer approval. Malpractice tail and call stacking must be managed carefully.",
      },
    ],
  },
  {
    slug: "leaving-hospital-employment-for-locums",
    path: articlePath("leaving-hospital-employment-for-locums"),
    title: "Leaving Hospital Employment for Locums",
    metaDescription:
      "A structured guide for cardiologists leaving employed hospital practice for locum tenens—call, tail coverage, and credentialing.",
    h1: "Leaving Hospital Employment for Locums",
    directAnswer:
      "Leaving employed cardiology for locums is usually a work-structure change—not leaving medicine. Plan malpractice tail, non-compete review, licensing footprint, and realistic privileging timelines before your last employed day.",
    keywords: ["leaving employed cardiology", "hospital employment locums", "cardiologist career transition"],
    relatedArticleSlugs: ["cardiologist-burnout-alternatives", "credentialing-for-locum-cardiologists"],
    relatedSpecialtyPathSlugs: ["general", "interventional"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Exit checklist for employed cardiologists",
        paragraphs: [
          "Review tail coverage, restrictive covenants, device clinic panels you must transition, and cath lab privileges that may lapse. Coordinate last dates with credentialing lead times for your first locum site.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I quit before securing a locum block?",
        a: "Many cardiologists secure a written locum contract and privileging timeline before resigning—reducing income gaps.",
      },
    ],
  },
  {
    slug: "cardiologist-burnout-alternatives",
    path: articlePath("cardiologist-burnout-alternatives"),
    title: "Cardiologist Burnout: Alternatives and Career Options",
    metaDescription:
      "Burnout alternatives for cardiologists—locums, part-time blocks, subspecialty pivots, and recruiter-supported next steps.",
    h1: "Cardiologist Burnout: Alternatives and Career Options",
    directAnswer:
      "Cardiologist burnout is often driven by unsustainable call, inbox load, and moral injury—not loss of clinical skill. Alternatives include locum blocks with defined dates, part-time clinic roles, subspecialty-focused assignments, or employer changes—Locum Career Hub recruits cardiologists only and does not provide medical or mental health treatment.",
    keywords: ["cardiologist burnout", "physician burnout alternatives", "cardiology career change"],
    relatedArticleSlugs: ["leaving-hospital-employment-for-locums", "locum-vs-permanent-cardiology-jobs"],
    relatedSpecialtyPathSlugs: ["general", "preventive-cardiology"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Locums as one tool—not a cure",
        paragraphs: [
          "Locum tenens can reduce certain structural stressors when expectations are documented. It does not fix toxic leadership or unsafe staffing by itself. Cardiologists should still prioritize sleep, support, and clinical boundaries.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it wrong to explore locums while burned out?",
        a: "Exploring options is reasonable; committing to heavy call travel blocks while depleted is not. Pace matters.",
      },
    ],
  },
  {
    slug: "credentialing-for-locum-cardiologists",
    path: articlePath("credentialing-for-locum-cardiologists"),
    title: "How Credentialing Works for Locum Cardiologists",
    metaDescription:
      "Hospital privileging, FPPE, and payer enrollment for locum cardiologists—timelines and documents explained.",
    h1: "How Credentialing Works for Locum Cardiologists",
    directAnswer:
      "Locum cardiologist credentialing includes state licensure, hospital privileging (often with FPPE), malpractice verification, and sometimes payer enrollment. Timelines commonly run weeks to months depending on state and cath lab scope.",
    keywords: ["cardiologist credentialing locums", "hospital privileging cardiology", "locum tenens credentialing"],
    relatedArticleSlugs: ["state-licensing-guide-locum-cardiologists", "how-to-become-a-locum-cardiologist"],
    relatedSpecialtyPathSlugs: ["interventional", "electrophysiology"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Privileging vs licensing",
        paragraphs: [
          "A state license authorizes you to practice in the state; hospital privileges authorize specific scopes—PCI, TAVR, device implants, echo supervision—at that facility. Locum assignments should list required privileges before you submit documents.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I start locums with IMLC?",
        a: "IMLC can accelerate licensing for eligible physicians, but each hospital still completes privileging and may require full state licenses for on-site procedural work.",
      },
    ],
  },
  {
    slug: "state-licensing-guide-locum-cardiologists",
    path: articlePath("state-licensing-guide-locum-cardiologists"),
    title: "State Licensing Guide for Locum Cardiologists",
    metaDescription:
      "State medical licensing for locum cardiologists—IMLC, timelines, and fifty-one state guides.",
    h1: "State Licensing Guide for Locum Cardiologists",
    directAnswer:
      "Locum cardiologists need active state licenses (or compact pathways where eligible) for on-site work in each state. Licensing timelines vary widely; California and New York often take longer than compact-friendly states.",
    keywords: ["cardiologist state license locums", "IMLC cardiologist", "medical license locum tenens"],
    relatedArticleSlugs: ["credentialing-for-locum-cardiologists", "best-states-for-locum-cardiologists"],
    relatedSpecialtyPathSlugs: ["general"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Use state-specific guides",
        paragraphs: [
          "We publish licensing guides for each state under /guides/how-to-get-a-{state}-medical-license and cardiologist locum hubs under /locum-tenens-jobs/{state}. Start licensing early if you plan multi-state travel blocks.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do telecardiology reads require full state licenses?",
        a: "Often yes for patient-specific reads and callbacks—confirm payer and facility rules; telehealth licensure is not automatic.",
      },
    ],
  },
  {
    slug: "rvu-compensation-cardiologists",
    path: articlePath("rvu-compensation-cardiologists"),
    title: "RVU Compensation Explained for Cardiologists",
    metaDescription:
      "How RVU-based pay interacts with cardiology locums and employed contracts—educational overview for physicians.",
    h1: "RVU Compensation Explained for Cardiologists",
    directAnswer:
      "RVU (relative value unit) compensation ties pay to documented work—E/M visits, procedures, and tests—with conversion factors set by employers or contracts. Locum cardiology deals are often daily or weekly rates, but RVU culture still signals workload intensity at a site.",
    keywords: ["cardiologist RVU", "cardiology compensation RVU", "wRVU cardiology"],
    relatedArticleSlugs: ["how-much-do-locum-cardiologists-make", "locum-cardiologist-salary-guide"],
    relatedSpecialtyPathSlugs: ["general", "interventional"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "RVU vs flat locum rates",
        paragraphs: [
          "Employed cardiologists often negotiate wRVU targets with conversion dollars. Locum contracts may specify minimum daily census or procedure counts even when paid weekly—functionally similar workload pressure.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do cath lab locums use RVU pay?",
        a: "Some hybrid models exist, but most locum interventional contracts use weekly rates with implied case volume—document case mix either way.",
      },
    ],
  },
  {
    slug: "malpractice-coverage-locum-cardiologists",
    path: articlePath("malpractice-coverage-locum-cardiologists"),
    title: "Malpractice Coverage for Locum Cardiologists",
    metaDescription:
      "Occurrence vs claims-made malpractice, tail coverage, and PCI scope for locum cardiologists.",
    h1: "Malpractice Coverage for Locum Cardiologists",
    directAnswer:
      "Locum cardiologists must confirm malpractice limits, policy type (occurrence vs claims-made), tail coverage, and whether PCI, structural, or device procedures are covered acts before starting. Facilities or agencies typically provide coverage, but details belong in writing.",
    keywords: ["locum cardiologist malpractice", "malpractice tail cardiology", "locum tenens malpractice"],
    relatedArticleSlugs: ["credentialing-for-locum-cardiologists", "locum-vs-permanent-cardiology-jobs"],
    relatedSpecialtyPathSlugs: ["interventional", "structural-heart"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Procedural scope and liability",
        paragraphs: [
          "Interventional and structural locums carry PCI, STEMI, and complication pathways that must match policy coverage. General consult roles still need clear inpatient coverage rules.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who pays for tail when leaving locums?",
        a: "Contract-dependent—some assignments include tail; employed-to-locum transitions need explicit tail planning.",
      },
    ],
  },
  {
    slug: "best-states-for-locum-cardiologists",
    path: articlePath("best-states-for-locum-cardiologists"),
    title: "Best States for Locum Cardiologists",
    metaDescription:
      "How to choose states for locum cardiology—licensing, demand, lifestyle, and subspecialty fit—not generic rankings.",
    h1: "Best States for Locum Cardiologists",
    directAnswer:
      "The best state for a locum cardiologist depends on subspecialty demand, licensing footprint, call tolerance, and travel—not a single national ranking. Florida, Texas, California, and New York often show volume, but fit beats hype.",
    keywords: ["best states for locum cardiologists", "cardiology locum jobs by state", "locum tenens cardiology"],
    relatedArticleSlugs: ["state-licensing-guide-locum-cardiologists", "how-much-do-locum-cardiologists-make"],
    relatedSpecialtyPathSlugs: ["general", "interventional"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Evaluate states by subspecialty",
        paragraphs: [
          "Interventional demand clusters around PCI programs and STEMI networks. EP demand follows ablation backlog and device clinics. Use state hubs and /jobs/{state} pages for licensing and metro context.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are compact states always faster?",
        a: "IMLC helps eligible physicians, but hospital privileging remains the critical path for cath lab starts.",
      },
    ],
  },
  {
    slug: "cardiology-workforce-shortage-trends",
    path: articlePath("cardiology-workforce-shortage-trends"),
    title: "Cardiology Workforce Shortage Trends",
    metaDescription:
      "Cardiology workforce trends—aging population, PCI volume, EP demand, and locum coverage patterns.",
    h1: "Cardiology Workforce Shortage Trends",
    directAnswer:
      "Cardiology workforce pressure stems from aging populations, procedural volume growth (PCI, TAVR, ablation), and uneven distribution of subspecialists. Hospitals use locum cardiologists for leave, volume spikes, and recruitment gaps—demand varies by metro and subspecialty.",
    keywords: ["cardiology workforce shortage", "cardiologist demand", "locum cardiology trends"],
    relatedArticleSlugs: ["best-states-for-locum-cardiologists", "how-to-become-a-locum-cardiologist"],
    relatedSpecialtyPathSlugs: ["heart-failure", "structural-heart"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Subspecialty-specific shortages",
        paragraphs: [
          "Electrophysiology and interventional coverage are common locum entry points when permanent recruitment lags. General consult shortages appear in community hospitals with limited backup.",
          "The American Heart Association (AHA) continues to highlight cardiovascular disease burden—translating into sustained hospital demand for inpatient and procedural cardiologists.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does shortage mean every locum rate is high?",
        a: "No—rural community roles and low-acuity clinic blocks may pay differently than STEMI-heavy interventional coverage.",
      },
    ],
  },
  {
    slug: "how-to-become-a-locum-cardiologist",
    path: articlePath("how-to-become-a-locum-cardiologist"),
    title: "How to Become a Locum Cardiologist",
    metaDescription:
      "Step-by-step path to locum cardiology—board certification, licenses, privileging, and recruiter matching.",
    h1: "How to Become a Locum Cardiologist",
    directAnswer:
      "To become a locum cardiologist, complete cardiology training, obtain board certification or eligibility, secure state licenses, gather procedural logs for cath/EP roles, and work with a cardiologist-only recruiter to match documented assignments.",
    keywords: ["how to become a locum cardiologist", "locum cardiology jobs", "cardiologist locum tenens"],
    relatedArticleSlugs: ["fellowship-to-locums-transition", "credentialing-for-locum-cardiologists"],
    relatedSpecialtyPathSlugs: ["general", "interventional", "electrophysiology"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "ABIM and hospital expectations",
        paragraphs: [
          "Most hospitals expect ABIM cardiovascular disease certification or eligibility; subspecialty procedural roles require corresponding training and logs. Locum Career Hub matches MD/DO cardiologists only.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can fellows locum?",
        a: "Generally no for independent locum contracts—attending privileges require completed fellowship and licensure. Moonlighting rules differ.",
      },
    ],
  },
  {
    slug: "fellowship-to-locums-transition",
    path: articlePath("fellowship-to-locums-transition"),
    title: "Transitioning From Fellowship to Locums",
    metaDescription:
      "New cardiology attendings considering locums—credentialing, first contracts, and scope documentation.",
    h1: "Transitioning From Fellowship to Locums",
    directAnswer:
      "New cardiology attendings can use locums to sample practice environments before permanent contracts, but must complete licensing, board steps, and procedural credentialing. First assignments should match fellowship scope with documented supervision rules if needed.",
    keywords: ["cardiology fellowship locums", "new cardiologist locum jobs", "first locum assignment"],
    relatedArticleSlugs: ["how-to-become-a-locum-cardiologist", "credentialing-for-locum-cardiologists"],
    relatedSpecialtyPathSlugs: ["general", "pediatric-cardiology"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "First contract cautions",
        paragraphs: [
          "Avoid stacking heavy STEMI call on your first locum block. Confirm echo read SLAs, consult caps, and malpractice limits match your training stage.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I take a permanent job first?",
        a: "Many fellows choose permanent roles for stability; locums can still be a structured sample if credentialing timelines align.",
      },
    ],
  },
  {
    slug: "call-schedules-cardiology-jobs",
    path: articlePath("call-schedules-cardiology-jobs"),
    title: "Call Schedules in Cardiology Jobs",
    metaDescription:
      "STEMI call, consult call, and cath lab activation—what locum cardiologists should document.",
    h1: "Call Schedules in Cardiology Jobs",
    directAnswer:
      "Cardiology call schedules may include STEMI activation, cath lab backup, inpatient consult coverage, and device/arrhythmia call. Locum contracts should specify frequency, backup, post-call rules, and compensation for nights and weekends.",
    keywords: ["cardiology call schedule", "STEMI call locums", "cardiologist night call"],
    relatedArticleSlugs: ["travel-requirements-locum-cardiologists", "malpractice-coverage-locum-cardiologists"],
    relatedSpecialtyPathSlugs: ["interventional", "electrophysiology", "general"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "STEMI and PCI call",
        paragraphs: [
          "Interventional locums must document activation windows, transport patterns, and surgical backup. Primary operator vs backup roles change liability and lifestyle materially.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is reasonable call for locums?",
        a: "There is no universal standard—compare to your employed baseline and recovery needs; document census and activation counts.",
      },
    ],
  },
  {
    slug: "travel-requirements-locum-cardiologists",
    path: articlePath("travel-requirements-locum-cardiologists"),
    title: "Travel Requirements for Locum Cardiologists",
    metaDescription:
      "Travel stipends, lodging, licensing, and credentialing for locum cardiology assignments.",
    h1: "Travel Requirements for Locum Cardiologists",
    directAnswer:
      "Travel locum cardiologists should confirm air, lodging, rental car stipends, mileage rules, and multi-state licensing before accepting blocks. Distance should match your recovery needs—not just headline weekly rates.",
    keywords: ["travel locum cardiologist", "cardiology locum travel", "locum tenens stipends"],
    relatedArticleSlugs: ["best-states-for-locum-cardiologists", "state-licensing-guide-locum-cardiologists"],
    relatedSpecialtyPathSlugs: ["interventional", "general"],
    eeat: defaultEeatMeta(),
    sections: [
      {
        h2: "Multi-state licensing footprint",
        paragraphs: [
          "Travel blocks across regions require proactive license maintenance and privileging calendars. IMLC helps eligible physicians but does not replace hospital FPPE.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are local locums available?",
        a: "Yes—some cardiologists choose local block contracts without travel; match distance to call burden and family constraints.",
      },
    ],
  },
];

const ENRICHED_ARTICLES: CardiologyArticle[] = CARDIOLOGY_ARTICLES.map((a) => ({
  ...a,
  sections: expandArticleSections(a.slug, a.sections),
}));

export const RESOURCES_HUB_PATH = RESOURCES_PATH;

export function getCardiologyArticle(slug: string): CardiologyArticle | undefined {
  return ENRICHED_ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return ENRICHED_ARTICLES.map((a) => a.slug);
}

export function getAllArticles(): CardiologyArticle[] {
  return ENRICHED_ARTICLES;
}

export function hubLinksForArticle(article: CardiologyArticle) {
  return {
    cardiologyHub: CARDIOLOGY_HUB_PATH,
    opportunities: "/physician-opportunities#lead-form",
    specialties: article.relatedSpecialtyPathSlugs.map((s) => ({
      href: cardiologySpecialtyPath(s),
      label: s,
    })),
  };
}
