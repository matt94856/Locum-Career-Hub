import type { BlogPost } from "@/lib/blog-types";
import { EDITORIAL_POSTS } from "@/lib/blog-editorial";

export type { ArticleBlock, BlogPost } from "@/lib/blog-types";

const CORE_POSTS: BlogPost[] = [
  {
    slug: "physician-burnout-early-warning-signs",
    title: "Physician Burnout: Early Warning Signs Clinicians Miss",
    description:
      "Spot burnout earlier with a practical framework for emotional exhaustion, depersonalization, and loss of meaning—plus steps to protect your career.",
    date: "2026-04-18",
    readMinutes: 12,
    category: "Well-being",
    keywords: ["physician burnout", "doctor burnout alternatives", "physician work-life balance"],
    author: {
      name: "Matthew Fuller",
      jobTitle: "Physician recruiting lead, Locum Career Hub",
      description:
        "Physician-first recruiting focused on credentialing clarity, realistic scheduling, and low-pressure next steps for locum tenens and flexible roles.",
    },
    content: [
      {
        type: "p",
        text: "Burnout rarely announces itself with a calendar invite. It tends to arrive as subtle friction: harder mornings, shorter patience in team rooms, or a quiet sense that your work no longer matches the reasons you chose medicine.",
      },
      {
        type: "h2",
        text: "A practical framework: exhaustion, cynicism, and efficacy",
      },
      {
        type: "p",
        text: "Many clinicians find the Maslach framework useful because it separates symptoms from character flaws. When emotional exhaustion rises, cynicism or depersonalization creeps in, or you feel less effective at work, it is worth treating those signals as data—not weakness.",
      },
      {
        type: "ul",
        items: [
          "Emotional exhaustion: depleted empathy, dread before shifts, feeling “wired but tired.”",
          "Depersonalization: cynicism toward patients, colleagues, or the institution; sarcasm as a default shield.",
          "Reduced sense of accomplishment: charting feels pointless, quality metrics feel performative, wins stop registering.",
        ],
      },
      {
        type: "h2",
        text: "Early warning signs that are easy to rationalize",
      },
      {
        type: "p",
        text: "High performers often explain away early burnout as “a busy month” or “a tough rotation.” Pay attention when short-term stress becomes a chronic baseline—especially if recovery stops working.",
      },
      {
        type: "ul",
        items: [
          "You postpone rest because “after this project” never arrives.",
          "You avoid certain patient populations or shifts you used to tolerate.",
          "You feel irritable about small workflow issues that previously felt neutral.",
          "You notice more conflict with nursing, APPs, or administrators—and less curiosity about their constraints.",
          "You fantasize about quitting medicine entirely, not just switching jobs.",
        ],
      },
      {
        type: "h2",
        text: "Systems vs. individual: both matter",
      },
      {
        type: "p",
        text: "Burnout is driven by workload, control, reward, community, fairness, and values alignment. Individual strategies (sleep, therapy, boundaries) help—but they land better when paired with realistic assessments of your environment.",
      },
      {
        type: "h2",
        text: "Where locum tenens can fit (without promising a miracle)",
      },
      {
        type: "p",
        text: "Locum tenens is not treatment. It can be a strategic bridge: fewer standing committees, clearer start/end dates, and the ability to sample teams before committing long-term. For some physicians, temporary assignments reduce chronic moral injury triggers by improving autonomy and pacing.",
      },
      {
        type: "h3",
        text: "If you are struggling right now",
      },
      {
        type: "p",
        text: "If you are experiencing thoughts of self-harm, please seek immediate help from local emergency services or a crisis line in your country. This article is educational context—not a substitute for professional mental health care.",
      },
      {
        type: "callout",
        variant: "legal",
        title: "Disclaimer",
        text: "Locum Career Hub provides recruiting information, not medical, mental health, or legal advice. Work with licensed professionals for diagnosis, treatment, and employment contract review.",
      },
    ],
  },
  {
    slug: "locum-pay-comparison-w2-vs-1099",
    title: "Locum Pay Comparisons: What W-2 and 1099 Actually Mean for Doctors",
    description:
      "A plain-language overview of locum pay structures, stipends, and what to ask before you compare weekly rates apples-to-apples.",
    date: "2026-04-02",
    readMinutes: 11,
    category: "Compensation",
    keywords: ["locum tenens opportunities", "flexible physician jobs", "physician compensation trends"],
    content: [
      {
        type: "p",
        text: "When physicians compare locum offers, the headline number is almost never the full story. Two assignments can advertise similar weekly rates yet produce meaningfully different take-home outcomes once taxes, stipends, malpractice, and cancelation rules are included.",
      },
      {
        type: "h2",
        text: "What recruiters mean by W-2 vs. 1099",
      },
      {
        type: "p",
        text: "In broad strokes, W-2 arrangements often behave more like employment for tax withholding purposes, while 1099 independent contractor arrangements shift more administrative responsibility to you. Exact treatment depends on the contract, payer of record, and how expenses are structured.",
      },
      {
        type: "ul",
        items: [
          "W-2: withholding may be simpler day-to-day; some deductions and business expenses may be constrained compared to contractor models.",
          "1099: may offer flexibility in entity structure and expense tracking, but requires disciplined bookkeeping and a CPA who understands multi-state work.",
        ],
      },
      {
        type: "callout",
        variant: "legal",
        title: "Not tax advice",
        text: "This article is educational. Tax outcomes depend on your facts, state rules, and entity elections. Always confirm with a qualified CPA before making decisions.",
      },
      {
        type: "h2",
        text: "The line items that change effective pay",
      },
      {
        type: "ul",
        items: [
          "Malpractice: occurrence vs claims-made, tail coverage responsibility, and any specialty-specific riders.",
          "Travel and lodging: stipend caps, taxable vs non-taxable treatment, and what happens if flights are delayed.",
          "Cancelation policies: guaranteed hours vs at-will reductions.",
          "Extra shifts: premium rates, how they are approved, and documentation expectations.",
          "Call: stipend or hourly add-ons, post-call expectations, and whether overnight work is counted toward weekly hours.",
        ],
      },
      {
        type: "h2",
        text: "A practical comparison checklist",
      },
      {
        type: "p",
        text: "Before you choose, write down assumptions for each offer: weekly hours, average census, call burden, commute from lodging, and EHR efficiency. A slightly lower rate with better support staffing can outperform a higher rate in a chaotic unit.",
      },
      {
        type: "h3",
        text: "Use locums as market research",
      },
      {
        type: "p",
        text: "Short blocks can help you benchmark what your time is worth across geographies and practice models—useful context before signing a multi-year employment agreement.",
      },
    ],
  },
  {
    slug: "tax-advantages-locum-tenens",
    title: "Tax Planning Considerations for Locum Tenens Physicians",
    description:
      "High-level considerations for deductions, entity structures, and travel expenses—plus when to involve a CPA who understands medicine.",
    date: "2026-03-21",
    readMinutes: 10,
    category: "Finance",
    keywords: ["locum tenens jobs", "flexible physician jobs", "physician opportunities"],
    content: [
      {
        type: "callout",
        variant: "legal",
        title: "Educational only",
        text: "This is not tax, legal, or investment advice. Multi-state locums can create complex filings; engage a CPA with physician-client experience early.",
      },
      {
        type: "p",
        text: "Locum tenens often introduces multi-state income, travel reimbursements, and business expenses that do not show up in a single W-2 hospital job. The goal is not “tax tricks”—it is clean documentation and predictable quarterly planning.",
      },
      {
        type: "h2",
        text: "Why bookkeeping discipline matters",
      },
      {
        type: "ul",
        items: [
          "Keep receipts and itineraries for flights, lodging, mileage, and rental cars when applicable.",
          "Track licensing fees, DEA renewals, and board maintenance separately from personal expenses.",
          "Separate accounts can reduce end-of-year reconstruction stress (even if not strictly required).",
        ],
      },
      {
        type: "h2",
        text: "Common discussion topics with a CPA",
      },
      {
        type: "ul",
        items: [
          "Entity choice (if any) and whether it matches your liability and admin tolerance.",
          "State residency rules and sourcing of income across states.",
          "Per diem vs actual expense methodologies where relevant.",
          "Estimated tax timing to avoid underpayment penalties.",
        ],
      },
      {
        type: "h2",
        text: "Compare offers on after-tax outcomes",
      },
      {
        type: "p",
        text: "Two weekly rates can converge after tax and expenses—especially if one assignment requires expensive travel or longer unpaid credentialing gaps. A simple spreadsheet with conservative assumptions often clarifies the decision faster than intuition.",
      },
    ],
  },
  {
    slug: "travel-tips-for-locum-physicians",
    title: "Travel Tips for Locum Physicians: Packing, Fitness, and Sleep",
    description:
      "Make travel locums sustainable with lightweight routines for sleep, food, and exercise—without living out of a chaotic suitcase.",
    date: "2026-03-06",
    readMinutes: 9,
    category: "Travel",
    keywords: ["travel doctor jobs", "locum tenens opportunities", "physician work-life balance"],
    content: [
      {
        type: "p",
        text: "Travel locums pays well partly because it consumes life bandwidth: airports, rental cars, unfamiliar units, and variable sleep. The physicians who last longest treat travel like a system—not a series of heroic one-offs.",
      },
      {
        type: "h2",
        text: "Packing: repeatability beats perfection",
      },
      {
        type: "ul",
        items: [
          "Maintain a written packing list and refine it after each trip.",
          "Duplicate chargers, toiletries, and scrubs/white coats to reduce packing friction.",
          "Keep a small laundry kit and stain wipes; hospital coffee happens.",
        ],
      },
      {
        type: "h2",
        text: "Sleep: protect performance like it is a clinical protocol",
      },
      {
        type: "p",
        text: "Eye masks, ear plugs, white noise, and a consistent wind-down routine help when hotel HVAC and hallway noise vary wildly. If you rotate between days and nights, plan transition days rather than assuming you can brute-force sleep.",
      },
      {
        type: "h2",
        text: "Movement and food: small defaults win",
      },
      {
        type: "p",
        text: "Walking rounds count as movement, but add two short strength sessions weekly to protect your back and stress response. For nutrition, default to simple repeatable meals when you are tired—decision fatigue is real after long shifts.",
      },
      {
        type: "h2",
        text: "Arrival day: set expectations with yourself",
      },
      {
        type: "p",
        text: "Block time for credentialing badge pickup, parking logistics, and charting environment setup. A calm first evening reduces first-shift panic and helps you present as the steady clinician you are.",
      },
    ],
  },
  {
    slug: "transitioning-into-locums-after-employment",
    title: "Transitioning Into Locums After Employment: A Measured Plan",
    description:
      "How to move from a staff role to locum tenens without burning bridges—or your nervous system.",
    date: "2026-02-19",
    readMinutes: 10,
    category: "Career Moves",
    keywords: ["physician opportunities", "flexible physician jobs", "locum tenens jobs"],
    content: [
      {
        type: "p",
        text: "Transitioning from a staff role to locums is part logistics, part psychology. The logistics are credentialing, licensing, and finances. The psychology is leaving a known identity for a more flexible one—without impulsive decisions driven by a bad week.",
      },
      {
        type: "h2",
        text: "Start with your employment agreement",
      },
      {
        type: "ul",
        items: [
          "Notice periods and whether prn/locums triggers any restrictions.",
          "Moonlighting clauses and who must approve outside work.",
          "Non-compete scope (as written) and what counsel says about enforceability in your state.",
          "Malpractice tail obligations if you leave before a defined milestone.",
        ],
      },
      {
        type: "callout",
        variant: "legal",
        title: "Legal review",
        text: "Have an attorney review restrictive covenants and moonlighting language. Recruiters can help with timing, but they are not a substitute for legal advice.",
      },
      {
        type: "h2",
        text: "Credentialing is the real clock",
      },
      {
        type: "p",
        text: "Many first-time locums physicians underestimate how long privileges can take. Build a realistic timeline with your recruiter: licensing, references, verification, and committee dates. Your goal is a first shift date you can trust—not a best-case fantasy.",
      },
      {
        type: "h2",
        text: "De-risk your first assignment",
      },
      {
        type: "p",
        text: "If possible, choose an early assignment with clear staffing support, predictable census targets, and a culture that welcomes questions. A shorter block reduces downside while you calibrate documentation pace and travel stamina.",
      },
    ],
  },
  {
    slug: "locums-after-residency-what-to-expect",
    title: "Locums After Residency: What New Graduates Should Expect",
    description:
      "A realistic primer on autonomy, supervision, documentation load, and how to pick first assignments that build confidence safely.",
    date: "2026-02-02",
    readMinutes: 11,
    category: "Early Career",
    keywords: ["post-residency physician jobs", "locum tenens jobs", "physician staffing"],
    content: [
      {
        type: "p",
        text: "The months after residency are high-leverage: you have fresh skills, board exams looming or freshly passed, and a strong need to understand what practice setting fits your values. Locums can be a structured way to explore—but site selection matters more than ever.",
      },
      {
        type: "h2",
        text: "What “autonomy” really means on day one",
      },
      {
        type: "p",
        text: "You may be independently licensed, but operational autonomy varies by hospital policy, specialty, and supervision models. Ask direct questions about cross-cover, consult availability, and escalation pathways—especially overnight.",
      },
      {
        type: "h2",
        text: "Documentation load: plan for it",
      },
      {
        type: "ul",
        items: [
          "Ask which EHR is used and whether templates are standardized.",
          "Clarify expected note timing (same day, before shift end, etc.).",
          "Understand how APP partnerships split work and who cosigns what.",
        ],
      },
      {
        type: "h2",
        text: "Choosing safer first assignments",
      },
      {
        type: "p",
        text: "Prioritize sites that publish reasonable census targets, have backup for procedures you are still building confidence in, and communicate culture honestly in interviews. If a site cannot answer basic staffing questions, treat that as a signal.",
      },
      {
        type: "h3",
        text: "Loan paydown vs. exploration",
      },
      {
        type: "p",
        text: "Some graduates use locums to accelerate income while exploring geographies. Others prioritize stability. There is no universal answer—only a budget and risk tolerance that should match your contract choices.",
      },
    ],
  },
  {
    slug: "locums-during-retirement-gliding-not-grinding",
    title: "Locums During Retirement: Glide Paths That Keep You Sharp",
    description:
      "Semi-retirement physician work can be joyful—if you protect boundaries and choose teams that respect experience without exploiting it.",
    date: "2026-01-16",
    readMinutes: 9,
    category: "Late Career",
    keywords: ["semi-retirement physician work", "retired physician opportunities", "flexible physician jobs"],
    content: [
      {
        type: "p",
        text: "Many physicians want a glide path rather than a hard stop. Locums can keep skills sharp and maintain community connection—if you protect boundaries so the work stays elective, not extractive.",
      },
      {
        type: "h2",
        text: "Define non-negotiables before you talk rates",
      },
      {
        type: "ul",
        items: [
          "Maximum shifts per month and preferred block length.",
          "Travel radius and tolerance for flying vs driving.",
          "Call burden you will accept—and post-call recovery expectations.",
          "Documentation burden you consider sustainable.",
        ],
      },
      {
        type: "h2",
        text: "Choose teams that value experience appropriately",
      },
      {
        type: "p",
        text: "The best semi-retirement assignments use your judgment without treating you as a universal coverage sponge. Ask how night coverage is staffed, how often “extra patients” appear beyond agreed expectations, and how leadership handles conflict.",
      },
      {
        type: "h2",
        text: "Licensing and credentialing still apply",
      },
      {
        type: "p",
        text: "Semi-retirement does not bypass credentialing realism. Compact licenses and proactive renewals expand optionality. Build a simple annual checklist for DEA, state licenses, and board maintenance so surprises do not derail your plans.",
      },
    ],
  },
  {
    slug: "best-states-for-locum-physicians",
    title: "Best States for Locum Physicians (and How to Think About “Best”)",
    description:
      "Demand, licensing speed, stipend norms, and lifestyle factors—how to build a short list that fits your goals, not generic rankings.",
    date: "2026-01-04",
    readMinutes: 12,
    category: "Markets",
    keywords: ["locum tenens opportunities", "physician travel jobs", "physician staffing"],
    content: [
      {
        type: "p",
        text: "Online “best states” lists are entertaining but often misleading. Demand varies by cardiology subspecialty, season, and local staffing pipelines. A state can be hot for interventional cardiology locums and softer for outpatient clinic blocks at the same time.",
      },
      {
        type: "h2",
        text: "Build a scorecard that matches your life",
      },
      {
        type: "ul",
        items: [
          "Licensing speed and whether you already hold a license there.",
          "Travel burden from your home base and tolerance for time zones.",
          "Case mix, trauma designation, and staffing layers relevant to your specialty.",
          "Stipend norms vs. cost of living for multi-week blocks.",
          "Tax and regulatory complexity (worth discussing with a CPA).",
        ],
      },
      {
        type: "h2",
        text: "Compact licenses and optionality",
      },
      {
        type: "p",
        text: "If you qualify, interstate licensure compacts can expand your feasible geography. Ask your recruiter which states are realistic given your timeline—some markets look attractive on paper but have credentialing bottlenecks.",
      },
      {
        type: "h2",
        text: "Featured markets vs. hidden gems",
      },
      {
        type: "p",
        text: "Large states with many health systems can offer repeat assignments and schedule flexibility. Smaller markets may pay premiums for access and continuity. The “best” choice is often the one with transparent expectations and a team culture you can sustain.",
      },
    ],
  },
  {
    slug: "physician-compensation-trends-2026-primer",
    title: "Physician Compensation Trends: A 2026 Primer for Job Seekers",
    description:
      "Macro pressures, shift premiums, and what recruiters are seeing across inpatient and procedural specialties.",
    date: "2025-12-12",
    readMinutes: 10,
    category: "Compensation",
    keywords: ["physician compensation trends", "physician opportunities", "locum tenens jobs"],
    content: [
      {
        type: "p",
        text: "Compensation in 2026 continues to reflect coverage risk: harder-to-fill shifts, higher acuity, rural access challenges, and leadership gaps that increase reliance on flexible labor. That does not mean every offer is strong—due diligence still matters.",
      },
      {
        type: "h2",
        text: "What tends to move rates",
      },
      {
        type: "ul",
        items: [
          "Night and weekend premiums where local staff shortages persist.",
          "Rural and community settings with smaller specialist benches.",
          "Seasonal demand spikes in certain geographies.",
          "Credentialing speed when a hospital needs coverage urgently.",
        ],
      },
      {
        type: "h2",
        text: "Flexibility is increasingly part of the offer",
      },
      {
        type: "p",
        text: "Many employers compete on schedule design as much as headline pay—especially as physicians prioritize sustainability after burnout cycles. Ask how schedules are built, how extra shifts are approved, and what protections exist for unsafe staffing proposals.",
      },
      {
        type: "h2",
        text: "Use locums as a benchmarking tool",
      },
      {
        type: "p",
        text: "Short assignments can help you understand your market value across settings. That information is useful whether you stay flexible long-term or return to a permanent role with clearer negotiation leverage.",
      },
      {
        type: "callout",
        variant: "note",
        title: "Market variability",
        text: "Trends are directional and vary by region and specialty. Your recruiter should cite current market conditions for your credentials—not generic internet anecdotes.",
      },
    ],
  },
  {
    slug: "flexible-medical-careers-beyond-traditional-employment",
    title: "Flexible Medical Careers Beyond Traditional Employment",
    description:
      "Explore hybrid models—locums, telehealth, per diem, and fractional leadership—and how to assemble a portfolio career responsibly.",
    date: "2025-11-28",
    readMinutes: 11,
    category: "Career Design",
    keywords: ["flexible medical careers", "flexible physician jobs", "physician work-life balance"],
    content: [
      {
        type: "p",
        text: "A “portfolio” medical career can combine clinical work with teaching, advising, research, or entrepreneurship. The upside is autonomy; the downside is administrative overhead. The physicians who thrive build systems early—not after burnout from double-booking themselves.",
      },
      {
        type: "h2",
        text: "Common building blocks",
      },
      {
        type: "ul",
        items: [
          "Locum tenens blocks for income and exploration.",
          "Per diem or PRN shifts close to home for stability.",
          "Telehealth where licensure, payer rules, and scope align with your specialty.",
          "Fractional medical director roles when governance experience is a goal.",
        ],
      },
      {
        type: "h2",
        text: "Operational hygiene matters",
      },
      {
        type: "p",
        text: "Contracts, malpractice coverage, scheduling, and invoicing each add cognitive load. Keep roles few enough that you can execute them well. Coherence beats collecting titles.",
      },
      {
        type: "h2",
        text: "Locums as an anchor",
      },
      {
        type: "p",
        text: "Many portfolio clinicians anchor income with predictable locums blocks, then layer smaller projects around that anchor. Predictable anchors reduce financial anxiety while you experiment.",
      },
      {
        type: "callout",
        variant: "legal",
        title: "Compliance and scope",
        text: "Each role has distinct compliance expectations (payer enrollment, state telehealth rules, employer outside-work policies). Review obligations carefully before stacking engagements.",
      },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [...EDITORIAL_POSTS, ...CORE_POSTS];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
