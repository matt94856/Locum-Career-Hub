export type LandingPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  h2: string;
  keywords: string[];
  intro: string;
  bullets: string[];
  relatedSlugs: string[];
};

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "locum-tenens-jobs",
    title: "Locum Tenens Jobs for Physicians | Locum Career Hub",
    description:
      "Explore high-demand locum tenens jobs with transparent pay, credentialing support, and schedules built around your life. Connect with a physician recruiter today.",
    h1: "Locum Tenens Jobs Built Around Your Career",
    h2: "Physician staffing that prioritizes flexibility, income, and work-life balance",
    keywords: [
      "locum tenens jobs",
      "locum tenens opportunities",
      "physician staffing",
      "physician recruiter",
    ],
    intro:
      "Whether you want block scheduling, seasonal travel, or a bridge between roles, locum tenens jobs can unlock higher weekly rates with less administrative drag. Locum Career Hub matches you to vetted health systems and community hospitals nationwide.",
    bullets: [
      "Curated openings across inpatient, outpatient, and hybrid models",
      "Credentialing navigation with realistic start timelines",
      "Advocacy on rates, travel, lodging, and malpractice coverage",
    ],
    relatedSlugs: [
      "flexible-physician-careers",
      "physician-travel-jobs",
      "part-time-physician-jobs",
    ],
  },
  {
    slug: "physician-travel-jobs",
    title: "Physician Travel Jobs & Locum Assignments | Locum Career Hub",
    description:
      "Discover travel doctor jobs with premium stipends, flexible blocks, and recruiter support from day one. Explore physician travel opportunities nationwide.",
    h1: "Travel Doctor Jobs With Premium Support",
    h2: "See new places, keep clinical autonomy, and protect your schedule",
    keywords: ["travel doctor jobs", "physician travel jobs", "locum tenens opportunities"],
    intro:
      "Travel physician jobs pair adventure with predictable workflows. We align you to teams that respect handoffs, staffing ratios, and specialty-appropriate volumes—so your trip feels sustainable, not chaotic.",
    bullets: [
      "Itineraries that respect recovery and commute time",
      "Transparent stipend and lodging expectations",
      "Repeat assignments when you find a site you love",
    ],
    relatedSlugs: ["locum-tenens-jobs", "locum-tenens-california", "locum-tenens-florida"],
  },
  {
    slug: "flexible-physician-careers",
    title: "Flexible Physician Jobs & Locum Careers | Locum Career Hub",
    description:
      "Design a flexible physician career with locums, moonlighting, and hybrid schedules. Higher income potential with modern recruiter support.",
    h1: "Flexible Physician Careers on Your Terms",
    h2: "Choose blocks that match life stages—from residency to semi-retirement",
    keywords: ["flexible physician jobs", "physician opportunities", "physician work-life balance"],
    intro:
      "Flexibility is not a perk—it is a clinical strategy. Locum Career Hub helps you architect a career that protects time for family, research, entrepreneurship, or recovery while keeping your skills sharp.",
    bullets: [
      "Week-on/week-off, weekends-only, or seasonal coverage",
      "Rate transparency so you can compare W-2 vs 1099 tradeoffs",
      "Advocacy for sustainable panel sizes and support staffing",
    ],
    relatedSlugs: ["part-time-physician-jobs", "moonlighting-physician-jobs", "locum-tenens-jobs"],
  },
  {
    slug: "locum-jobs-for-new-graduates",
    title: "Locum Jobs for New Graduates & Early-Career Physicians",
    description:
      "Post-residency physician jobs through locum tenens: build skills, increase income, and explore practice settings before you commit long-term.",
    h1: "Locum Jobs for New Graduates Who Want Options",
    h2: "Bridge to your ideal role with mentorship-aligned placements",
    keywords: ["post-residency physician jobs", "physician opportunities", "locum tenens jobs"],
    intro:
      "Early career does not have to mean locking into the wrong culture. Locums after residency helps you sample volumes, documentation styles, and communities—while accelerating loan paydown with premium shifts.",
    bullets: [
      "Sites open to new grads with appropriate supervision models",
      "Credentialing roadmaps for first-time state licenses",
      "Guidance on moonlighting vs full-time locums tradeoffs",
    ],
    relatedSlugs: ["moonlighting-physician-jobs", "hospitalist-locum-jobs", "emergency-medicine-locum-jobs"],
  },
  {
    slug: "moonlighting-physician-jobs",
    title: "Moonlighting Physician Jobs | Extra Shifts & Locum Moonlighting",
    description:
      "Find moonlighting physician jobs that fit around your primary role. Weekend blocks, telehealth, and local ED coverage with compliance-first support.",
    h1: "Moonlighting Jobs That Respect Your Primary Practice",
    h2: "Stack shifts without sacrificing boundaries or compliance",
    keywords: ["moonlighting physician jobs", "moonlighting jobs", "flexible physician jobs"],
    intro:
      "Moonlighting should feel additive—not extractive. We coordinate tightly scoped shifts, clarify malpractice coverage, and align expectations with your employer policies when applicable.",
    bullets: [
      "Local and regional options to limit travel fatigue",
      "Rapid credentialing for repeat health system networks",
      "Clear communication templates for employer transparency",
    ],
    relatedSlugs: ["part-time-physician-jobs", "emergency-medicine-locum-jobs", "locum-jobs-for-new-graduates"],
  },
  {
    slug: "retired-physician-opportunities",
    title: "Semi-Retirement & Retired Physician Opportunities | Locum Career Hub",
    description:
      "Semi-retirement physician work with lighter blocks, flexible travel, and curated teams. Stay clinical on your schedule with locum tenens.",
    h1: "Retired Physician Opportunities With True Flexibility",
    h2: "Keep your license active, stay sharp, and protect your freedom",
    keywords: ["semi-retirement physician work", "retired physician opportunities", "flexible physician jobs"],
    intro:
      "Many physicians want a glide path—not a hard stop. Locums during retirement offers selective shifts, lower administrative burden, and the ability to pause between assignments without guilt.",
    bullets: [
      "Selective schedules: seasonal, short blocks, or occasional weekends",
      "Sites accustomed to experienced clinicians and efficient workflows",
      "Support for compact licenses and streamlined renewals",
    ],
    relatedSlugs: ["part-time-physician-jobs", "physician-burnout-alternatives", "flexible-physician-careers"],
  },
  {
    slug: "hospitalist-locum-jobs",
    title: "Hospitalist Locum Jobs | Inpatient Coverage Nationwide",
    description:
      "Hospitalist locum tenens jobs with block scheduling, nocturnist options, and team-oriented units. Speak with a physician recruiter today.",
    h1: "Hospitalist Locum Jobs With Predictable Blocks",
    h2: "Day, swing, and nocturnist coverage aligned to your stamina",
    keywords: ["hospitalist locum jobs", "locum tenens jobs", "physician staffing"],
    intro:
      "Hospital medicine is the backbone of locums demand. We prioritize closed ICUs when promised, APP support, and cap expectations so you can focus on safe admissions and thoughtful discharges.",
    bullets: [
      "Block schedules that protect sleep and handoffs",
      "Academic and community sites with clear census targets",
      "Rapid credentialing for high-volume hospitalist networks",
    ],
    relatedSlugs: ["emergency-medicine-locum-jobs", "locum-tenens-jobs", "part-time-physician-jobs"],
  },
  {
    slug: "emergency-medicine-locum-jobs",
    title: "Emergency Medicine Locum Jobs | ED Locums Nationwide",
    description:
      "Emergency medicine locum jobs with volume transparency, scribe availability, and malpractice clarity. Travel or local shifts available.",
    h1: "Emergency Medicine Locum Jobs Built for Flow",
    h2: "Know acuity mix, trauma designation, and staffing layers up front",
    keywords: ["emergency medicine locum jobs", "travel doctor jobs", "physician opportunities"],
    intro:
      "The best ED locums assignments pair fair hourly rates with operational reality. We surface trauma level, fast track models, and specialty backup so you can choose shifts that match your edge practice style.",
    bullets: [
      "Single coverage vs team models—documented before you sign",
      "Moonlighting-friendly weekend bundles",
      "Support for airway-heavy vs low-acuity preferences",
    ],
    relatedSlugs: ["hospitalist-locum-jobs", "moonlighting-physician-jobs", "physician-travel-jobs"],
  },
  {
    slug: "crna-locum-jobs",
    title: "CRNA Locum Jobs | Anesthesia Locum Tenens Opportunities",
    description:
      "CRNA locum jobs with OR block transparency, call expectations, and premium stipends. Locum Career Hub supports advanced practice anesthesia staffing.",
    h1: "CRNA Locum Jobs With OR Clarity",
    h2: "Call, case mix, and autonomy expectations—aligned before day one",
    keywords: ["CRNA locum jobs", "physician staffing", "locum tenens opportunities"],
    intro:
      "Anesthesia locums lives in the details: OB-heavy days, cardiac call, or outpatient GI blocks require different stamina. We map case mix, CRNA-to-MD supervision models, and stipends with precision.",
    bullets: [
      "Call burden and post-call expectations in writing",
      "OR start times and room turnover norms",
      "Travel packages tuned to multi-week blocks",
    ],
    relatedSlugs: ["hospitalist-locum-jobs", "emergency-medicine-locum-jobs", "locum-tenens-jobs"],
  },
  {
    slug: "locum-tenens-florida",
    title: "Locum Tenens Florida | Physician Jobs & Travel Assignments",
    description:
      "Florida locum tenens jobs for hospitalists, ED, anesthesia, and more. Coastal and inland placements with licensing and credentialing support.",
    h1: "Locum Tenens Florida: High Demand, Coastal Flexibility",
    h2: "Sunshine-state assignments with recruiter-led onboarding",
    keywords: ["locum tenens Florida", "physician opportunities", "travel doctor jobs"],
    intro:
      "Florida’s patient growth continues to outpace staffing pipelines. Locum Career Hub connects you to health systems that value reliability, clean handoffs, and respectful scheduling—whether you prefer Miami energy or Gulf Coast pace.",
    bullets: [
      "Compact and Florida-specific licensing guidance",
      "Seasonal surges and snowbird population planning",
      "Mix of academic, HCA-adjacent, and independent community sites",
    ],
    relatedSlugs: ["locum-tenens-texas", "locum-tenens-california", "physician-travel-jobs"],
  },
  {
    slug: "locum-tenens-texas",
    title: "Locum Tenens Texas | Physician Locums Across Major Metros",
    description:
      "Texas locum tenens jobs with strong weekly rates and diverse models—from major metros to community hospitals statewide.",
    h1: "Locum Tenens Texas: Metro Power + Community Impact",
    h2: "Assignments across Dallas, Houston, Austin, San Antonio, and beyond",
    keywords: ["locum tenens Texas", "physician staffing", "locum tenens jobs"],
    intro:
      "Texas blends volume, variety, and business-friendly operations. We help you compare stipends, malpractice structures, and call expectations across systems so you pick the right cultural fit—not just the headline rate.",
    bullets: [
      "Rapid placement potential across large IDNs",
      "Nocturnist and swing shift bundles",
      "Travel stipends optimized for multi-week blocks",
    ],
    relatedSlugs: ["locum-tenens-florida", "locum-tenens-california", "hospitalist-locum-jobs"],
  },
  {
    slug: "locum-tenens-california",
    title: "Locum Tenens California | Physician Jobs Statewide",
    description:
      "California locum tenens opportunities with compliance-first support. Northern and Southern California placements for hospitalists, ED, and more.",
    h1: "Locum Tenens California: Compliance-First, Premium Support",
    h2: "Navigate California’s unique staffing landscape with expert recruiters",
    keywords: ["locum tenens California", "physician opportunities", "flexible physician jobs"],
    intro:
      "California rewards preparation. Locum Career Hub pairs you with teams experienced in California credentialing timelines, union environments when applicable, and transparent stipend/taxable wage structures.",
    bullets: [
      "Academic and county-adjacent models with clear expectations",
      "Support for licensing timelines and privilege packets",
      "Travel and housing strategies for cost-effective blocks",
    ],
    relatedSlugs: ["locum-tenens-texas", "locum-tenens-florida", "physician-travel-jobs"],
  },
  {
    slug: "physician-burnout-alternatives",
    title: "Physician Burnout Alternatives | Locum Tenens for Recovery",
    description:
      "Doctor burnout alternatives through locums: reduce admin load, reset boundaries, and practice medicine with more autonomy. Confidential recruiter conversations.",
    h1: "Physician Burnout Alternatives That Protect Your License—and Your Life",
    h2: "Clinical options designed around recovery, boundaries, and sustainability",
    keywords: ["doctor burnout alternatives", "physician work-life balance", "locum tenens opportunities"],
    intro:
      "Burnout is a systems problem—but your next step can be personal and strategic. Locums can reduce committee load, inbox slavery, and moral injury triggers while you decide your long-term plan.",
    bullets: [
      "Volume and documentation expectations reviewed in advance",
      "Shorter commitments while you stabilize",
      "Advocacy for sustainable schedules and backup staffing",
    ],
    relatedSlugs: ["flexible-physician-careers", "part-time-physician-jobs", "retired-physician-opportunities"],
  },
  {
    slug: "part-time-physician-jobs",
    title: "Part-Time Physician Jobs | Locum & Hybrid Schedules",
    description:
      "Part-time physician jobs via locum tenens: stackable shifts, hybrid inpatient/outpatient models, and recruiter support for sustainable pacing.",
    h1: "Part-Time Physician Jobs Without Apologizing for Boundaries",
    h2: "Design a sustainable week—clinical days that feel worth it",
    keywords: ["part-time physician jobs", "flexible physician jobs", "physician opportunities"],
    intro:
      "Part-time does not have to mean underpaid or unsupported. Locum Career Hub engineers schedules that protect your energy while keeping skills sharp—ideal alongside family, teaching, or entrepreneurial work.",
    bullets: [
      "Stackable weekend bundles and short blocks",
      "Hybrid telehealth + onsite models when available",
      "Transparent weekly minimums and cancellation policies",
    ],
    relatedSlugs: ["moonlighting-physician-jobs", "flexible-physician-careers", "locum-tenens-jobs"],
  },
];

export const LANDING_SLUGS = LANDING_PAGES.map((p) => p.slug);

export function getLanding(slug: string) {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
