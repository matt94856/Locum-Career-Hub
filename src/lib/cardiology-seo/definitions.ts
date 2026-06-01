import { US_STATES } from "@/lib/states";
import { stateNameToSlug } from "@/lib/us-state-slugs";
import { CARDIOLOGY_METROS } from "@/lib/cardiology-programmatic/metros";
import type { CardiologySeoCategory } from "@/lib/cardiology-seo/types";

export type PageDef = {
  category: CardiologySeoCategory;
  slug: string;
  h1: string;
  title: string;
  description: string;
  topic: string;
  keywords: string[];
  geoLabel?: string;
  stateSlug?: string;
  showRecruiterTrust?: boolean;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const MONEY_PAGE_DEFS: PageDef[] = [
  {
    category: "money",
    slug: "locum-cardiologist-jobs",
    h1: "Locum Cardiologist Jobs",
    title: "Locum Cardiologist Jobs | Cardiologist-Only Recruiting",
    description:
      "Locum cardiologist jobs nationwide—cath lab, consult, clinic, and imaging blocks with documented call. Recruiter follow-up if opportunities match your states.",
    topic: "locum cardiologist jobs",
    keywords: ["locum cardiologist jobs", "cardiologist locum tenens", "cardiology locum jobs"],
  },
  {
    category: "money",
    slug: "cardiology-locum-tenens-jobs",
    h1: "Cardiology Locum Tenens Jobs",
    title: "Cardiology Locum Tenens Jobs | MD/DO Cardiologists",
    description:
      "Cardiology locum tenens jobs with transparent privileging and call expectations. Submit an inquiry—a recruiter contacts you if roles fit your selected states.",
    topic: "cardiology locum tenens",
    keywords: ["cardiology locum tenens", "cardiology locum tenens jobs", "locum tenens cardiologist"],
  },
  {
    category: "money",
    slug: "interventional-cardiology-locum-jobs",
    h1: "Interventional Cardiology Locum Jobs",
    title: "Interventional Cardiology Locum Jobs | Cath Lab & STEMI",
    description:
      "Interventional cardiology locum jobs—STEMI, PCI, and cath lab scope documented before you commit. Cardiologist-only recruiter.",
    topic: "interventional cardiology locums",
    keywords: ["interventional cardiology locum", "interventional cardiologist locum jobs", "cath lab locums"],
  },
  {
    category: "money",
    slug: "non-invasive-cardiology-locum-jobs",
    h1: "Non-Invasive Cardiology Locum Jobs",
    title: "Non-Invasive Cardiology Locum Jobs | Consult & Imaging",
    description:
      "Non-invasive cardiology locum roles—consult, echo, stress, and clinic—with call and read volumes in writing.",
    topic: "non-invasive cardiology locums",
    keywords: ["non-invasive cardiology locum", "general cardiologist locum jobs", "cardiology consult locums"],
  },
  {
    category: "money",
    slug: "electrophysiology-locum-jobs",
    h1: "Electrophysiology Locum Jobs",
    title: "Electrophysiology Locum Jobs | EP & Device Clinic",
    description:
      "Electrophysiology locum jobs—ablation, devices, and arrhythmia consults—with lab capabilities confirmed upfront.",
    topic: "electrophysiology locums",
    keywords: ["electrophysiology locum jobs", "EP cardiologist locum", "electrophysiologist locum"],
  },
  {
    category: "money",
    slug: "structural-heart-locum-jobs",
    h1: "Structural Heart Locum Jobs",
    title: "Structural Heart Locum Jobs | TAVR & Valve Programs",
    description:
      "Structural heart locum coverage—TAVR, MitraClip, and heart team expectations documented for cardiologists.",
    topic: "structural heart locums",
    keywords: ["structural heart locum jobs", "TAVR locum cardiologist", "structural cardiologist locum"],
  },
  {
    category: "money",
    slug: "heart-failure-cardiology-locum-jobs",
    h1: "Heart Failure Cardiology Locum Jobs",
    title: "Heart Failure Cardiology Locum Jobs | Advanced HF",
    description:
      "Heart failure cardiology locum jobs—advanced therapies, census, and weekend coverage clarified before start.",
    topic: "heart failure cardiology locums",
    keywords: ["heart failure locum jobs", "advanced heart failure locum", "HF cardiologist locum"],
  },
  {
    category: "money",
    slug: "general-cardiology-locum-jobs",
    h1: "General Cardiology Locum Jobs",
    title: "General Cardiology Locum Jobs Nationwide",
    description:
      "General cardiology locum jobs—inpatient consult, outpatient clinic, and imaging—with recruiter-led matching.",
    topic: "general cardiology locums",
    keywords: ["general cardiology locum jobs", "general cardiologist locum", "cardiology locum jobs"],
  },
  {
    category: "money",
    slug: "pediatric-cardiology-locum-jobs",
    h1: "Pediatric Cardiology Locum Jobs",
    title: "Pediatric Cardiology Locum Jobs | Peds Cardiology",
    description:
      "Pediatric cardiology locum opportunities where programs need temporary MD/DO coverage—scope and call documented.",
    topic: "pediatric cardiology locums",
    keywords: ["pediatric cardiology locum jobs", "peds cardiology locum", "pediatric cardiologist locum"],
  },
  {
    category: "money",
    slug: "inpatient-cardiology-locum-jobs",
    h1: "Inpatient Cardiology Locum Jobs",
    title: "Inpatient Cardiology Locum Jobs | Hospital Consult",
    description:
      "Inpatient cardiology locum jobs—consult services, call, and census targets in writing before you commit.",
    topic: "inpatient cardiology locums",
    keywords: ["inpatient cardiology locum", "cardiology consult locum jobs", "hospital cardiology locums"],
  },
  {
    category: "money",
    slug: "outpatient-cardiology-locum-jobs",
    h1: "Outpatient Cardiology Locum Jobs",
    title: "Outpatient Cardiology Locum Jobs | Clinic Blocks",
    description:
      "Outpatient cardiology locum clinic blocks—panel size, visit length, and prior-auth support defined upfront.",
    topic: "outpatient cardiology locums",
    keywords: ["outpatient cardiology locum", "cardiology clinic locum jobs", "cardiology clinic locums"],
  },
  {
    category: "money",
    slug: "telecardiology-jobs",
    h1: "Telecardiology Jobs",
    title: "Telecardiology Jobs | Remote Cardiology Locums",
    description:
      "Telecardiology jobs and remote reads—licensure, callback rules, and turnaround SLAs for cardiologists.",
    topic: "telecardiology locums",
    keywords: ["telecardiology jobs", "telecardiology locum", "remote cardiology reads"],
  },
  {
    category: "money",
    slug: "cardiology-moonlighting-jobs",
    h1: "Cardiology Moonlighting Jobs",
    title: "Cardiology Moonlighting Jobs | Weekend & After-Hours",
    description:
      "Cardiology moonlighting for employed cardiologists—weekend cath lab, clinic, or consult blocks with clear scope.",
    topic: "cardiology moonlighting",
    keywords: ["cardiology moonlighting jobs", "cardiologist moonlighting", "weekend cardiology locums"],
  },
];

export const SALARY_PAGE_DEFS: PageDef[] = [
  { category: "salary", slug: "cardiologist-salary-guide", h1: "Cardiologist Salary Guide", title: "Cardiologist Salary Guide (2026) | Locum & Employed", description: "Cardiologist salary drivers—subspecialty, call, geography—not guaranteed offers. Educational guide for MD/DO cardiologists.", topic: "cardiologist salary", keywords: ["cardiologist salary", "cardiology salary guide", "cardiologist compensation"] },
  { category: "salary", slug: "locum-cardiologist-salary", h1: "Locum Cardiologist Salary", title: "Locum Cardiologist Salary | Weekly Rate Drivers", description: "What influences locum cardiologist weekly rates—STEMI, call, clinic panel, and travel.", topic: "locum cardiologist salary", keywords: ["locum cardiologist salary", "cardiology locum pay", "locum cardiology rates"] },
  { category: "salary", slug: "interventional-cardiologist-salary", h1: "Interventional Cardiologist Salary", title: "Interventional Cardiologist Salary Guide", description: "Interventional cardiology compensation context—cath lab call, case mix, and geography.", topic: "interventional cardiologist salary", keywords: ["interventional cardiologist salary", "PCI cardiologist pay"] },
  { category: "salary", slug: "electrophysiologist-salary", h1: "Electrophysiologist Salary", title: "Electrophysiologist Salary Guide", description: "EP cardiologist salary drivers—ablation, devices, and call.", topic: "electrophysiologist salary", keywords: ["electrophysiologist salary", "EP cardiologist compensation"] },
  { category: "salary", slug: "cardiology-compensation-by-state", h1: "Cardiology Compensation by State", title: "Cardiology Compensation by State | Overview", description: "How cardiology pay varies by state—demand, call, and cost of living context.", topic: "cardiology compensation by state", keywords: ["cardiology salary by state", "cardiologist pay by state"] },
  { category: "salary", slug: "highest-paying-states-for-cardiologists", h1: "Highest Paying States for Cardiologists", title: "Highest Paying States for Cardiologists", description: "States where cardiology locum demand and rate drivers often cluster—educational, not a guarantee.", topic: "highest paying states for cardiologists", keywords: ["highest paying states cardiologists", "best states cardiology locums"] },
  { category: "salary", slug: "highest-paying-locum-cardiology-jobs", h1: "Highest Paying Locum Cardiology Jobs", title: "Highest Paying Locum Cardiology Jobs", description: "What makes some locum cardiology assignments pay more—call, STEMI, acuity.", topic: "highest paying locum cardiology", keywords: ["highest paying locum cardiology", "top paid cardiology locums"] },
  { category: "salary", slug: "cardiology-rvu-compensation-guide", h1: "Cardiology RVU Compensation Guide", title: "Cardiology RVU Compensation Guide", description: "RVU-based cardiology compensation basics for employed and locum contexts.", topic: "cardiology RVU compensation", keywords: ["cardiology RVU", "cardiologist RVU compensation"] },
  { category: "salary", slug: "cardiology-pay-per-day-guide", h1: "Cardiology Pay Per Day Guide", title: "Cardiology Pay Per Day Guide | Locum Context", description: "Daily rate thinking for cardiology locums—when it helps compare blocks.", topic: "cardiology pay per day", keywords: ["cardiology daily rate", "cardiologist pay per day locum"] },
];

function licensingDefs(): PageDef[] {
  const general: PageDef[] = [
    { category: "licensing", slug: "interstate-medical-licensure-compact-guide", h1: "Interstate Medical Licensure Compact Guide", title: "IMLC Guide for Cardiologists", description: "IMLC basics for cardiologists pursuing multi-state locums—not legal advice.", topic: "IMLC for cardiologists", keywords: ["IMLC", "interstate medical licensure compact", "cardiologist licensing"] },
    { category: "licensing", slug: "fastest-states-for-medical-licensing", h1: "Fastest States for Medical Licensing", title: "Fastest States for Physician Licensing", description: "Licensing speed factors for cardiologists—varies by board and record.", topic: "fastest medical licensing states", keywords: ["fastest medical license states", "quick physician license"] },
    { category: "licensing", slug: "medical-license-processing-times-by-state", h1: "Medical License Processing Times by State", title: "Medical License Processing Times by State", description: "Overview of license processing variability—confirm with state boards.", topic: "license processing times", keywords: ["medical license processing time", "physician license timeline"] },
  ];
  const perState = US_STATES.map((stateName) => {
    const stateSlug = stateNameToSlug(stateName);
    return {
      category: "licensing" as const,
      slug: `how-to-get-a-${stateSlug}-medical-license`,
      h1: `How to Get a ${stateName} Medical License`,
      title: `${stateName} Medical License Guide for Cardiologists`,
      description: `High-level ${stateName} medical license steps for cardiologists exploring locums—verify with the state board.`,
      topic: `${stateName} medical license`,
      keywords: [`${stateName} medical license`, `how to get medical license ${stateName}`, "cardiologist licensing"],
      geoLabel: stateName,
      stateSlug,
    };
  });
  return [...general, ...perState];
}

export const TAX_PAGE_DEFS: PageDef[] = [
  { category: "tax", slug: "locum-cardiologist-tax-guide", h1: "Locum Cardiologist Tax Guide", title: "Locum Cardiologist Tax Guide (Overview)", description: "High-level tax topics for 1099 cardiologist locums—not individualized tax advice.", topic: "locum cardiologist taxes", keywords: ["locum cardiologist taxes", "cardiology locum tax guide"] },
  { category: "tax", slug: "1099-vs-w2-cardiologist", h1: "1099 vs W-2 for Cardiologists", title: "1099 vs W-2 Cardiologist | Locum Context", description: "Compare 1099 and W-2 structures for cardiology locums at a high level.", topic: "1099 vs W-2 cardiologist", keywords: ["1099 vs w2 cardiologist", "locum cardiologist 1099"] },
  { category: "tax", slug: "cardiologist-llc-guide", h1: "Cardiologist LLC Guide", title: "LLC for Locum Cardiologists (Overview)", description: "When cardiologists consider an LLC for locums—consult your CPA and attorney.", topic: "cardiologist LLC", keywords: ["cardiologist LLC", "LLC for locum physicians"] },
  { category: "tax", slug: "s-corporation-for-locum-cardiologists", h1: "S Corporation for Locum Cardiologists", title: "S Corp for Locum Cardiologists (Overview)", description: "S corporation basics for locum cardiologists—not tax advice.", topic: "S corp locum cardiologist", keywords: ["S corporation locum cardiologist", "locum s corp"] },
  { category: "tax", slug: "tax-deductions-for-locum-cardiologists", h1: "Tax Deductions for Locum Cardiologists", title: "Tax Deductions for Locum Cardiologists (Overview)", description: "Common deduction categories locum cardiologists discuss with CPAs.", topic: "locum cardiologist deductions", keywords: ["tax deductions locum cardiologist", "locum physician deductions"] },
  { category: "tax", slug: "travel-expense-deductions-for-locums", h1: "Travel Expense Deductions for Locums", title: "Travel Deductions for Locum Cardiologists", description: "Travel and stipend concepts for locum cardiologists—confirm with a tax professional.", topic: "travel deductions locums", keywords: ["travel expense deductions locums", "locum travel tax"] },
];

export const CAREER_PAGE_DEFS: PageDef[] = [
  { category: "career", slug: "how-to-become-a-locum-cardiologist", h1: "How to Become a Locum Cardiologist", title: "How to Become a Locum Cardiologist", description: "Steps cardiologists take toward locum work—licensing, privileging, and recruiter fit.", topic: "becoming a locum cardiologist", keywords: ["how to become locum cardiologist", "locum cardiology career"] },
  { category: "career", slug: "pros-and-cons-of-locum-cardiology", h1: "Pros and Cons of Locum Cardiology", title: "Pros and Cons of Locum Cardiology", description: "Balanced look at locum cardiology—flexibility, call, and admin tradeoffs.", topic: "pros and cons locum cardiology", keywords: ["pros and cons locum cardiology", "locum cardiology worth it"] },
  { category: "career", slug: "is-locum-cardiology-worth-it", h1: "Is Locum Cardiology Worth It?", title: "Is Locum Cardiology Worth It?", description: "When locum cardiology fits—and when it does not—based on goals and boundaries.", topic: "is locum cardiology worth it", keywords: ["is locum cardiology worth it", "locum cardiology lifestyle"] },
  { category: "career", slug: "full-time-vs-locum-cardiology", h1: "Full-Time vs Locum Cardiology", title: "Full-Time vs Locum Cardiology Compared", description: "Employed vs locum cardiology paths—schedule, pay structure, and stability.", topic: "full time vs locum cardiology", keywords: ["full time vs locum cardiology", "employed vs locum cardiologist"] },
  { category: "career", slug: "locum-cardiology-after-retirement", h1: "Locum Cardiology After Retirement", title: "Locum Cardiology After Retirement", description: "Semi-retired cardiologist locum blocks—lower intensity options.", topic: "locum cardiology retirement", keywords: ["retired cardiologist locum", "semi retired cardiology locums"] },
  { category: "career", slug: "locum-cardiology-for-new-graduates", h1: "Locum Cardiology for New Graduates", title: "Locum Cardiology for New Graduates", description: "Early-career cardiologists and locums—credentialing and mentorship context.", topic: "locum cardiology new grad", keywords: ["new cardiologist locum", "early career cardiology locum"] },
  { category: "career", slug: "transitioning-from-permanent-practice-to-locums", h1: "Transitioning From Permanent Practice to Locums", title: "Permanent to Locum Cardiology Transition", description: "Leaving employed cardiology for locums—non-compete, tail, and timeline planning.", topic: "transition to locum cardiology", keywords: ["transition locum cardiology", "leave employed cardiology"] },
];

export const SUBSPECIALTY_PAGE_DEFS: PageDef[] = [
  { category: "subspecialty", slug: "what-does-an-interventional-cardiologist-do", h1: "What Does an Interventional Cardiologist Do?", title: "What Does an Interventional Cardiologist Do?", description: "Interventional cardiology scope—cath lab, PCI, and STEMI—in plain language.", topic: "interventional cardiologist role", keywords: ["what does interventional cardiologist do", "interventional cardiology career"] },
  { category: "subspecialty", slug: "interventional-cardiology-career-guide", h1: "Interventional Cardiology Career Guide", title: "Interventional Cardiology Career Guide", description: "Training path and practice settings for interventional cardiologists.", topic: "interventional cardiology career", keywords: ["interventional cardiology career guide", "become interventional cardiologist"] },
  { category: "subspecialty", slug: "electrophysiologist-career-guide", h1: "Electrophysiologist Career Guide", title: "Electrophysiologist Career Guide", description: "EP cardiology career overview—ablation, devices, and hospital practice.", topic: "electrophysiologist career", keywords: ["electrophysiologist career guide", "EP cardiology career"] },
  { category: "subspecialty", slug: "structural-heart-cardiologist-jobs", h1: "Structural Heart Cardiologist Jobs", title: "Structural Heart Cardiologist Jobs", description: "Structural heart career and locum context—TAVR and valve programs.", topic: "structural heart jobs", keywords: ["structural heart cardiologist jobs", "structural heart career"] },
  { category: "subspecialty", slug: "structural-heart-salary-guide", h1: "Structural Heart Salary Guide", title: "Structural Heart Salary Guide", description: "Structural cardiology compensation drivers—educational overview.", topic: "structural heart salary", keywords: ["structural heart salary", "structural cardiologist pay"] },
  { category: "subspecialty", slug: "heart-failure-cardiologist-career-guide", h1: "Heart Failure Cardiologist Career Guide", title: "Heart Failure Cardiologist Career Guide", description: "Advanced HF cardiology careers—programs, call, and therapies.", topic: "heart failure cardiologist career", keywords: ["heart failure cardiologist career", "advanced HF cardiology"] },
  { category: "subspecialty", slug: "heart-failure-locum-opportunities", h1: "Heart Failure Locum Opportunities", title: "Heart Failure Locum Opportunities", description: "Heart failure locum coverage types and documentation essentials.", topic: "heart failure locum opportunities", keywords: ["heart failure locum opportunities", "HF locum jobs"] },
  { category: "subspecialty", slug: "echocardiography-jobs", h1: "Echocardiography Jobs", title: "Echocardiography Jobs for Cardiologists", description: "Echo-heavy cardiology roles—read pools and on-site echo.", topic: "echocardiography jobs", keywords: ["echocardiography jobs", "cardiology echo jobs"] },
  { category: "subspecialty", slug: "nuclear-cardiology-jobs", h1: "Nuclear Cardiology Jobs", title: "Nuclear Cardiology Jobs", description: "Nuclear cardiology reads and stress supervision for locum cardiologists.", topic: "nuclear cardiology jobs", keywords: ["nuclear cardiology jobs", "nuclear cardiology locum"] },
  { category: "subspecialty", slug: "cardiac-ct-jobs", h1: "Cardiac CT Jobs", title: "Cardiac CT Jobs for Cardiologists", description: "Cardiac CT interpretation roles—volume and licensure context.", topic: "cardiac CT jobs", keywords: ["cardiac CT jobs", "cardiology CT reads"] },
  { category: "subspecialty", slug: "cardiac-mri-jobs", h1: "Cardiac MRI Jobs", title: "Cardiac MRI Jobs for Cardiologists", description: "Cardiac MRI read and program opportunities for imaging cardiologists.", topic: "cardiac MRI jobs", keywords: ["cardiac MRI jobs", "CMR cardiologist jobs"] },
];

export const EMPLOYER_PAGE_DEFS: PageDef[] = [
  { category: "employer", slug: "cardiology-jobs-at-mayo-clinic", h1: "Cardiology Jobs at Mayo Clinic (Locum Context)", title: "Cardiology Jobs at Mayo Clinic | Independent Locums", description: "Educational page—Locum Career Hub is not affiliated with Mayo Clinic. Explore cardiologist locum matching.", topic: "Mayo Clinic cardiology context", keywords: ["Mayo Clinic cardiology jobs", "cardiology locum jobs"] },
  { category: "employer", slug: "cardiology-jobs-at-cleveland-clinic", h1: "Cardiology Jobs at Cleveland Clinic (Locum Context)", title: "Cleveland Clinic Cardiology | Locum Guide", description: "Not affiliated with Cleveland Clinic—cardiologist locum recruiting nationwide.", topic: "Cleveland Clinic cardiology context", keywords: ["Cleveland Clinic cardiology jobs", "cardiology locums"] },
  { category: "employer", slug: "cardiology-jobs-at-hca-hospitals", h1: "Cardiology Jobs at HCA Hospitals (Locum Context)", title: "HCA Cardiology Locum Context", description: "Community and HCA-type hospital cardiology locums—recruiter-led matching.", topic: "HCA cardiology locums", keywords: ["HCA cardiology jobs", "hospital cardiology locum"] },
  { category: "employer", slug: "cardiology-jobs-at-adventhealth", h1: "Cardiology Jobs at AdventHealth (Locum Context)", title: "AdventHealth Cardiology Locums", description: "Independent locum recruiting—not employed by AdventHealth.", topic: "AdventHealth cardiology", keywords: ["AdventHealth cardiology jobs", "Florida cardiology locum"] },
  { category: "employer", slug: "cardiology-jobs-at-ascension", h1: "Cardiology Jobs at Ascension (Locum Context)", title: "Ascension Cardiology Locum Context", description: "Cardiologist locum opportunities that may include similar health system settings.", topic: "Ascension cardiology", keywords: ["Ascension cardiology jobs", "cardiology locum tenens"] },
  { category: "employer", slug: "cardiology-jobs-at-kaiser-permanente", h1: "Cardiology Jobs at Kaiser Permanente (Locum Context)", title: "Kaiser Cardiology Locum Context", description: "Not affiliated with Kaiser—explore independent cardiology locum blocks.", topic: "Kaiser cardiology context", keywords: ["Kaiser cardiology jobs", "cardiology locum California"] },
];

export const COMPARISON_PAGE_DEFS: PageDef[] = [
  { category: "comparison", slug: "locum-cardiology-vs-permanent-practice", h1: "Locum Cardiology vs Permanent Practice", title: "Locum vs Permanent Cardiology Practice", description: "Compare locum and employed cardiology on schedule, pay, and flexibility.", topic: "locum vs permanent cardiology", keywords: ["locum cardiology vs permanent", "employed vs locum cardiologist"] },
  { category: "comparison", slug: "interventional-vs-non-invasive-cardiology", h1: "Interventional vs Non-Invasive Cardiology", title: "Interventional vs Non-Invasive Cardiology", description: "Training and lifestyle differences—helpful for career and locum planning.", topic: "interventional vs non-invasive cardiology", keywords: ["interventional vs non invasive cardiology", "cardiology subspecialty compare"] },
  { category: "comparison", slug: "academic-vs-private-practice-cardiology", h1: "Academic vs Private Practice Cardiology", title: "Academic vs Private Practice Cardiology", description: "How academic and private cardiology paths differ for locum transitions.", topic: "academic vs private cardiology", keywords: ["academic vs private cardiology", "academic cardiologist locum"] },
  { category: "comparison", slug: "hospital-employed-vs-locum-cardiologist", h1: "Hospital Employed vs Locum Cardiologist", title: "Hospital Employed vs Locum Cardiologist", description: "Employed hospital cardiology vs locum blocks—what changes.", topic: "hospital employed vs locum", keywords: ["hospital employed vs locum cardiologist", "employed cardiologist locum"] },
  { category: "comparison", slug: "cardiology-vs-gastroenterology-salary", h1: "Cardiology vs Gastroenterology Salary", title: "Cardiology vs GI Salary (Overview)", description: "High-level comparison of compensation drivers—not individual offers.", topic: "cardiology vs GI salary", keywords: ["cardiology vs gastroenterology salary", "physician salary compare"] },
  { category: "comparison", slug: "cardiology-vs-radiology-compensation", h1: "Cardiology vs Radiology Compensation", title: "Cardiology vs Radiology Compensation", description: "How cardiology and radiology pay models differ at a high level.", topic: "cardiology vs radiology compensation", keywords: ["cardiology vs radiology salary", "cardiologist vs radiologist pay"] },
];

export const FAQ_PAGE_DEFS: PageDef[] = [
  { category: "faq", slug: "how-much-do-locum-cardiologists-make", h1: "How Much Do Locum Cardiologists Make?", title: "How Much Do Locum Cardiologists Make?", description: "Factors that influence locum cardiologist pay—no guaranteed rates.", topic: "locum cardiologist pay", keywords: ["how much do locum cardiologists make", "locum cardiologist salary"] },
  { category: "faq", slug: "are-travel-expenses-paid-for-locums", h1: "Are Travel Expenses Paid for Locums?", title: "Travel Expenses for Locum Cardiologists", description: "How travel stipends and reimbursement often work in cardiology locum contracts.", topic: "locum travel expenses", keywords: ["locum travel expenses paid", "cardiology locum stipend"] },
  { category: "faq", slug: "do-locum-cardiologists-get-malpractice-insurance", h1: "Do Locum Cardiologists Get Malpractice Insurance?", title: "Malpractice Insurance for Locum Cardiologists", description: "Malpractice basics for cardiology locums—claims-made, occurrence, and tail.", topic: "locum cardiologist malpractice", keywords: ["locum cardiologist malpractice insurance", "cardiology locum malpractice"] },
  { category: "faq", slug: "how-long-are-locum-contracts", h1: "How Long Are Locum Contracts?", title: "How Long Are Cardiology Locum Contracts?", description: "Typical locum block lengths and renewal patterns for cardiologists.", topic: "locum contract length", keywords: ["how long are locum contracts", "cardiology locum contract length"] },
  { category: "faq", slug: "can-cardiologists-work-locums-part-time", h1: "Can Cardiologists Work Locums Part-Time?", title: "Part-Time Locum Cardiology", description: "Partial blocks and weekend cardiology locums while employed elsewhere.", topic: "part time locum cardiology", keywords: ["part time locum cardiologist", "cardiology locum part time"] },
  { category: "faq", slug: "can-retired-cardiologists-work-locums", h1: "Can Retired Cardiologists Work Locums?", title: "Retired Cardiologist Locums", description: "Semi-retired and retired cardiologists exploring lower-intensity locum blocks.", topic: "retired cardiologist locums", keywords: ["retired cardiologist locum", "semi retired cardiology locum"] },
];

export const DATA_PAGE_DEFS: PageDef[] = [
  { category: "data", slug: "cardiologist-salary-by-state", h1: "Cardiologist Salary by State", title: "Cardiologist Salary by State (Overview)", description: "State-level cardiology compensation context—update assumptions annually.", topic: "cardiologist salary by state", keywords: ["cardiologist salary by state", "cardiology pay by state"] },
  { category: "data", slug: "cardiologist-demand-by-state", h1: "Cardiologist Demand by State", title: "Cardiologist Demand by State", description: "Where cardiology locum demand often clusters—metro and rural context.", topic: "cardiologist demand by state", keywords: ["cardiologist demand by state", "cardiology job demand"] },
  { category: "data", slug: "physician-shortage-data", h1: "Physician Shortage Data (Cardiology Focus)", title: "Physician Shortage Data | Cardiology", description: "Workforce shortage context relevant to cardiology coverage gaps.", topic: "physician shortage cardiology", keywords: ["physician shortage", "cardiology workforce shortage"] },
  { category: "data", slug: "cardiology-workforce-statistics", h1: "Cardiology Workforce Statistics", title: "Cardiology Workforce Statistics", description: "High-level cardiology workforce trends for career and locum planning.", topic: "cardiology workforce statistics", keywords: ["cardiology workforce statistics", "cardiologist workforce"] },
  { category: "data", slug: "cardiologist-age-demographics", h1: "Cardiologist Age Demographics", title: "Cardiologist Age Demographics", description: "Demographic context for cardiology retirement and locum supply.", topic: "cardiologist demographics", keywords: ["cardiologist age demographics", "cardiology workforce age"] },
  { category: "data", slug: "fastest-growing-cardiology-markets", h1: "Fastest Growing Cardiology Markets", title: "Fastest Growing Cardiology Markets", description: "Markets where cardiology volume and staffing pressure often rise.", topic: "growing cardiology markets", keywords: ["fastest growing cardiology markets", "cardiology job growth"] },
];

export const PILLAR_PAGE_DEFS: PageDef[] = [
  { category: "pillar", slug: "complete-guide-to-locum-cardiology", h1: "Complete Guide to Locum Cardiology", title: "Complete Guide to Locum Cardiology", description: "In-depth guide to locum cardiology—credentialing, contracts, taxes, and recruiter fit.", topic: "complete locum cardiology guide", keywords: ["complete guide locum cardiology", "locum cardiology guide"] },
  { category: "pillar", slug: "complete-guide-to-cardiology-careers", h1: "Complete Guide to Cardiology Careers", title: "Complete Guide to Cardiology Careers", description: "Cardiology career paths—subspecialties, training, and practice settings.", topic: "cardiology careers guide", keywords: ["cardiology career guide", "how to become cardiologist"] },
  { category: "pillar", slug: "complete-guide-to-interventional-cardiology", h1: "Complete Guide to Interventional Cardiology", title: "Complete Guide to Interventional Cardiology", description: "Interventional cardiology training, practice, and locum considerations.", topic: "interventional cardiology guide", keywords: ["complete guide interventional cardiology", "interventional cardiology"] },
  { category: "pillar", slug: "complete-guide-to-electrophysiology-careers", h1: "Complete Guide to Electrophysiology Careers", title: "Complete Guide to Electrophysiology Careers", description: "EP cardiology from training through locum practice considerations.", topic: "electrophysiology careers guide", keywords: ["electrophysiology career guide", "EP cardiology guide"] },
  { category: "pillar", slug: "complete-guide-to-medical-licensing-for-cardiologists", h1: "Complete Guide to Medical Licensing for Cardiologists", title: "Medical Licensing Guide for Cardiologists", description: "Multi-state licensing and IMLC context for cardiology locums.", topic: "cardiologist licensing guide", keywords: ["medical licensing cardiologists", "cardiologist multi state license"] },
  { category: "pillar", slug: "complete-guide-to-locum-physician-taxes", h1: "Complete Guide to Locum Physician Taxes", title: "Complete Guide to Locum Physician Taxes (Cardiology)", description: "Tax topics locum cardiologists discuss with professionals—not tax advice.", topic: "locum physician taxes guide", keywords: ["locum physician tax guide", "locum cardiologist taxes"] },
];

export function buildStatePageDefs(): PageDef[] {
  return US_STATES.map((stateName) => {
    const stateSlug = stateNameToSlug(stateName);
    const slug = `${stateSlug}-cardiology-locum-jobs`;
    return {
      category: "state",
      slug,
      h1: `${stateName} Cardiology Locum Jobs`,
      title: `${stateName} Cardiology Locum Jobs | Cardiologist Locums`,
      description: `${stateName} cardiologist locum jobs—cath lab, consult, and clinic blocks. Submit an inquiry; a recruiter follows up if opportunities match your selected areas.`,
      topic: `${stateName} cardiology locum jobs`,
      keywords: [`${stateName} cardiology locum jobs`, `cardiologist locum ${stateName}`, `cardiology locum tenens ${stateName}`],
      geoLabel: stateName,
      stateSlug,
      showRecruiterTrust: true,
    };
  });
}

export function buildCityPageDefs(): PageDef[] {
  return CARDIOLOGY_METROS.map((m) => {
    const citySlug = slugify(m.city);
    const slug = `${citySlug}-cardiology-locum-jobs`;
    const geoLabel = `${m.city}, ${m.state}`;
    return {
      category: "city",
      slug,
      h1: `Cardiology Locum Jobs in ${geoLabel}`,
      title: `Cardiology Locum Jobs ${m.city} ${m.state} | Locum Career Hub`,
      description: `Cardiologist locum jobs in ${geoLabel}. Submit an inquiry—a recruiter will contact you if realistic opportunities exist in your selected regions.`,
      topic: `cardiology locum jobs ${m.city}`,
      keywords: [`cardiology locum jobs ${m.city}`, `cardiologist locum ${m.city}`, `cardiology locum tenens ${m.state}`],
      geoLabel,
      stateSlug: m.stateSlug,
      showRecruiterTrust: true,
    };
  });
}

export const LICENSING_PAGE_DEFS = licensingDefs();
