export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  category: string;
  keywords: string[];
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "physician-burnout-early-warning-signs",
    title: "Physician Burnout: Early Warning Signs Clinicians Miss",
    description:
      "Spot burnout earlier with a practical framework for emotional exhaustion, depersonalization, and loss of meaning—plus steps to protect your career.",
    date: "2026-04-18",
    readMinutes: 8,
    category: "Well-being",
    keywords: ["physician burnout", "doctor burnout alternatives", "physician work-life balance"],
    body: [
      "Burnout rarely arrives as a single moment. It tends to show up as irritability after charting, dread before shifts, or a creeping sense that your work no longer fits your values.",
      "If you are noticing cynicism toward patients or colleagues, chronic fatigue despite sleep, or a sense of inefficacy, it may be time to evaluate systems-level drivers—not just “resilience.”",
      "Locum tenens is not a cure-all, but it can be a strategic bridge: fewer standing meetings, clearer boundaries, and the ability to choose environments aligned with your stamina.",
    ],
  },
  {
    slug: "locum-pay-comparison-w2-vs-1099",
    title: "Locum Pay Comparisons: What W-2 and 1099 Actually Mean for Doctors",
    description:
      "A plain-language overview of locum pay structures, stipends, and what to ask before you compare weekly rates apples-to-apples.",
    date: "2026-04-02",
    readMinutes: 10,
    category: "Compensation",
    keywords: ["locum tenens opportunities", "flexible physician jobs", "physician compensation trends"],
    body: [
      "Weekly rate is only one line item. Malpractice coverage, travel reimbursement methodology, lodging quality, and cancelation policies materially change your effective compensation.",
      "W-2 locums may simplify taxes but can reduce certain deductions; 1099 engagements may increase flexibility while shifting admin burden. Your recruiter should explain the tradeoffs clearly.",
      "Ask for stipend caps, taxable vs non-taxable treatment, and overtime or extra-shift premiums in writing before you commit.",
    ],
  },
  {
    slug: "tax-advantages-locum-tenens",
    title: "Tax Planning Considerations for Locum Tenens Physicians",
    description:
      "High-level considerations for deductions, entity structures, and travel expenses—plus when to involve a CPA who understands medicine.",
    date: "2026-03-21",
    readMinutes: 9,
    category: "Finance",
    keywords: ["locum tenens jobs", "flexible physician jobs", "physician opportunities"],
    body: [
      "This article is educational, not tax advice. Locums often introduces multi-state income, per-diem nuances, and business expenses that deserve a specialist CPA.",
      "If you operate as an independent contractor, bookkeeping discipline becomes non-negotiable. Track mileage, flights, lodging, licensing fees, and CME with clean documentation.",
      "Planning ahead can reduce April surprises and help you compare engagements based on after-tax outcomes—not headline weekly rates alone.",
    ],
  },
  {
    slug: "travel-tips-for-locum-physicians",
    title: "Travel Tips for Locum Physicians: Packing, Fitness, and Sleep",
    description:
      "Make travel locums sustainable with lightweight routines for sleep, food, and exercise—without living out of a chaotic suitcase.",
    date: "2026-03-06",
    readMinutes: 7,
    category: "Travel",
    keywords: ["travel doctor jobs", "locum tenens opportunities", "physician work-life balance"],
    body: [
      "Consistency beats intensity. A repeatable packing list, duplicate chargers, and a go-bag of toiletries saves cognitive load between assignments.",
      "Sleep is a clinical performance tool. Eye masks, ear plugs, and white noise can rescue unfamiliar hotel rooms—especially before night shifts.",
      "Movement matters: walking rounds count, but add two short strength sessions weekly to protect your back and stress response during road weeks.",
    ],
  },
  {
    slug: "transitioning-into-locums-after-employment",
    title: "Transitioning Into Locums After Employment: A Measured Plan",
    description:
      "How to move from a staff role to locum tenens without burning bridges—or your nervous system.",
    date: "2026-02-19",
    readMinutes: 8,
    category: "Career Moves",
    keywords: ["physician opportunities", "flexible physician jobs", "locum tenens jobs"],
    body: [
      "Start with your employment agreement: non-competes, moonlighting clauses, and notice periods shape your timeline more than job boards do.",
      "Credentialing is the real clock. Begin licensing and privilege planning early so your first locums block aligns with your exit—not six weeks after.",
      "Consider a short local assignment before a cross-country block to validate documentation pace and team culture.",
    ],
  },
  {
    slug: "locums-after-residency-what-to-expect",
    title: "Locums After Residency: What New Graduates Should Expect",
    description:
      "A realistic primer on autonomy, supervision, documentation load, and how to pick first assignments that build confidence safely.",
    date: "2026-02-02",
    readMinutes: 9,
    category: "Early Career",
    keywords: ["post-residency physician jobs", "locum tenens jobs", "physician staffing"],
    body: [
      "Your first months out of training are not the time for mystery sites. Prioritize places with clear backup, reasonable census targets, and cultures that welcome questions.",
      "Ask how quality metrics are tracked, how nursing communication flows, and what the nightly cross-cover expectations look like.",
      "Short blocks can help you calibrate stamina while keeping optionality high as you explore permanent roles.",
    ],
  },
  {
    slug: "locums-during-retirement-gliding-not-grinding",
    title: "Locums During Retirement: Glide Paths That Keep You Sharp",
    description:
      "Semi-retirement physician work can be joyful—if you protect boundaries and choose teams that respect experience without exploiting it.",
    date: "2026-01-16",
    readMinutes: 7,
    category: "Late Career",
    keywords: ["semi-retirement physician work", "retired physician opportunities", "flexible physician jobs"],
    body: [
      "Retirement-era locums works best when you define non-negotiables: max shifts per month, travel radius, and acceptable call burden.",
      "Choose sites that value mentorship and efficiency—not places that treat you as a default “coverage sponge.”",
      "Use locums to stay connected to medicine while preserving space for family, travel, and hobbies that full-time practice crowded out.",
    ],
  },
  {
    slug: "best-states-for-locum-physicians",
    title: "Best States for Locum Physicians (and How to Think About “Best”)",
    description:
      "Demand, licensing speed, stipend norms, and lifestyle factors—how to build a short list that fits your goals, not generic rankings.",
    date: "2026-01-04",
    readMinutes: 11,
    category: "Markets",
    keywords: ["locum tenens opportunities", "physician travel jobs", "physician staffing"],
    body: [
      "“Best” depends on specialty, tolerance for travel, and licensing footprint. A high-demand state is not ideal if credentialing bottlenecks delay your start.",
      "Compact participation can accelerate access across multiple states—ask your recruiter how licensing strategy expands optionality.",
      "Featured markets like Florida, Texas, and California offer volume—but compare after-tax outcomes and operational realities, not billboards.",
    ],
  },
  {
    slug: "physician-compensation-trends-2026-primer",
    title: "Physician Compensation Trends: A 2026 Primer for Job Seekers",
    description:
      "Macro pressures, shift premiums, and what recruiters are seeing across inpatient and procedural specialties.",
    date: "2025-12-12",
    readMinutes: 8,
    category: "Compensation",
    keywords: ["physician compensation trends", "physician opportunities", "locum tenens jobs"],
    body: [
      "Compensation is a function of coverage risk: harder-to-fill shifts, higher acuity, and rural access premiums continue to influence weekly rates.",
      "Employers are competing on flexibility as much as pay—especially for physicians seeking sustainable pacing after burnout cycles.",
      "Use locums strategically to benchmark your market value before signing long-term contracts.",
    ],
  },
  {
    slug: "flexible-medical-careers-beyond-traditional-employment",
    title: "Flexible Medical Careers Beyond Traditional Employment",
    description:
      "Explore hybrid models—locums, telehealth, per diem, and fractional leadership—and how to assemble a portfolio career responsibly.",
    date: "2025-11-28",
    readMinutes: 9,
    category: "Career Design",
    keywords: ["flexible medical careers", "flexible physician jobs", "physician work-life balance"],
    body: [
      "Portfolio careers can increase autonomy, but they require operational hygiene: contracts, insurance, scheduling, and tax planning must be intentional.",
      "Locums can anchor clinical income while you experiment with teaching, advising, or startup work.",
      "The goal is coherence: fewer roles, clearer boundaries, and higher-quality clinical days.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
