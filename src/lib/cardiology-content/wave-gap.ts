import type { EditorialGuideBody } from "./types";

const S = (h2: string, ...paragraphs: string[]) => ({ h2, paragraphs });
const faq = (q: string, a: string) => ({ q, a });
const def = (
  category: "career" | "subspecialty" | "comparison" | "faq" | "licensing" | "tax" | "data",
  h1: string,
  title: string,
  description: string,
  topic: string,
  keywords: string[],
) => ({ category, h1, title, description, topic, keywords });

/**
 * Exact strategy-URL slugs that were missing after P0–P3 waves
 * (content existed under alternate slugs or not at all).
 */
export const GAP_GUIDES: EditorialGuideBody[] = [
  {
    slug: "heart-failure-cardiology-locums",
    pageDef: def(
      "subspecialty",
      "Heart Failure Cardiology Locums",
      "Heart Failure Locums: Advanced HF Coverage Without Wrong-Fit Risk",
      "Heart failure locum realities—program needs, weekend census, and privileging for HF cardiologists.",
      "heart failure cardiology locums",
      ["heart failure locums", "HF cardiologist locum", "advanced heart failure locum"],
    ),
    sections: [
      S("Program-dependent coverage", "Advanced HF locums is not interchangeable with general consult cardiology. Confirm weekend census, advanced therapies adjacency, and exclusions in writing.", "Wrong-fit creates clinical and political risk."),
      S("What sites need", "Some need rebound help. Some need transplant-adjacent sophistication. Ask for a written program description.", "Do not infer from the job title alone."),
      S("Privileging", "Match logs and training to acuity. Stretching scope for a rate is unsafe.", "Plan credentialing timelines early."),
      S("Lifestyle", "Fewer STEMI nights does not guarantee recoverability—weekend cognitive load can be heavy.", "Define boundaries explicitly."),
    ],
    faqs: [
      faq("Can general cardiologists cover HF locums?", "Sometimes for defined consult scope—not advanced program roles."),
      faq("Is HF locums common?", "Less common than general/IC; fit matters more than ad volume."),
    ],
  },
  {
    slug: "locum-cardiologist-malpractice",
    pageDef: def(
      "faq",
      "Locum Cardiologist Malpractice",
      "Malpractice for Locum Cardiologists: Claims-Made, Occurrence, Tail",
      "Who provides malpractice on cardiology locums—claims-made vs occurrence, limits, and tail.",
      "locum cardiologist malpractice insurance",
      ["locum cardiologist malpractice", "locum malpractice tail", "claims made locum cardiologist"],
    ),
    sections: [
      S("Never assume coverage", "Ask who provides malpractice, claims-made vs occurrence, limits, and post-assignment responsibility before you sign.", "Cath lab and STEMI scopes need coverage matched to risk."),
      S("Claims-made vs occurrence", "Claims-made can require tail after the block. Occurrence behaves differently. Get definitions in writing.", "Educational only—not insurance advice."),
      S("Tail and prior acts", "Clarify what happens if a claim arrives after the assignment ends.", "Ambiguity here is unacceptable."),
      S("Every assignment", "Do not reuse assumptions from a prior block. Re-verify each contract.", "Pair with credentialing diligence."),
    ],
    faqs: [
      faq("Is malpractice always included?", "Often arranged—but not identical across sites. Verify."),
      faq("Should I buy my own policy?", "Sometimes. Discuss with a knowledgeable broker."),
    ],
  },
  {
    slug: "cardiology-rvu-compensation",
    pageDef: def(
      "career",
      "Cardiology RVU Compensation",
      "Cardiology RVU Compensation Explained (So You Stop Getting Surprised)",
      "RVU thresholds, conversion factors, and moving goalposts—plain language for cardiologists.",
      "cardiology RVU compensation",
      ["cardiology RVU compensation", "cardiologist RVU threshold", "RVU conversion cardiology"],
    ),
    sections: [
      S("Learn the language before you negotiate", "Many employed offers hide lifestyle inside productivity math. Thresholds, conversion factors, and carve-outs matter.", "Ask for historical partner distributions."),
      S("Moving goalposts", "If thresholds change often, upside is unstable. Ask how changes are made.", "Verbal 'you'll easily hit it' is not a model."),
      S("Invisible labor", "Admin and certain coverage may not pay like clinical RVUs.", "Effective life rate beats brochure salary."),
      S("Locums contrast", "Many locum contracts are daily/weekly rates—still learn RVU culture to predict intensity.", "Compare structures on one spreadsheet."),
    ],
    faqs: [
      faq("Should fellows negotiate RVUs?", "Yes—definitions and thresholds, not only base."),
      faq("Is higher conversion always better?", "Not if call and thresholds destroy the week."),
    ],
  },
  {
    slug: "start-cardiology-locums-after-fellowship",
    pageDef: def(
      "career",
      "Start Cardiology Locums After Fellowship",
      "How to Start Cardiology Locums After Fellowship",
      "Quarter-by-quarter first-year plan for new cardiology attendings entering locums.",
      "start cardiology locums after fellowship",
      ["locums after cardiology fellowship", "new cardiologist locums", "first year locum cardiologist"],
    ),
    sections: [
      S("Structure beats improvisation", "After fellowship, locums can sample markets—if licensing and privileging are planned.", "First blocks should match documented training scope."),
      S("Quarter plan", "Q1 setup and conservative blocks. Q2 optimize sites/taxes with a CPA. Q3 cut bad fits. Q4 decide hybrid, locums-primary, or permanent.", "Treat it like a business chapter."),
      S("Mentorship gaps", "Build peer contacts; keep references warm.", "Avoid brutal STEMI intensity as your first attending identity."),
      S("Soft landing", "If permanent is the goal, use locums for site intelligence—then negotiate with data.", "Cardiologist-only matching helps reduce noise."),
    ],
    faqs: [
      faq("Will programs judge locums after fellowship?", "Some stigma remains; coherent stories and strong clinical work matter."),
      faq("How soon can I start?", "Licensure and privileging dominate—plan months."),
    ],
  },
  {
    slug: "cardiology-locum-contract-length",
    pageDef: def(
      "faq",
      "Cardiology Locum Contract Length",
      "How Long Are Cardiology Locum Contracts? Blocks, Extensions, Gaps",
      "Typical cardiology locum block lengths, extensions, and income-gap planning.",
      "cardiology locum contract length",
      ["how long are locum contracts cardiology", "cardiology locum block length", "locum contract extension"],
    ),
    sections: [
      S("Typical lengths", "Blocks commonly span a few days to several months. Extensions should be re-documented—not assumed.", "Plan gaps if you are fully locums-based."),
      S("Short vs long tradeoffs", "Short blocks raise privileging overhead. Long blocks raise commitment risk if culture is wrong.", "Match length to uncertainty."),
      S("Cancellations", "Know who pays when facilities cancel. Credentialing delays are a length problem in disguise.", "Build runway."),
    ],
    faqs: [
      faq("Do blocks auto-renew?", "Assume no—get renewals in writing."),
      faq("Best length for a first assignment?", "Often moderate: enough to learn, short enough to exit a bad fit."),
    ],
  },
  {
    slug: "cardiology-locum-travel-expenses",
    pageDef: def(
      "faq",
      "Cardiology Locum Travel Expenses",
      "Are Travel Expenses Paid for Cardiology Locums?",
      "Stipends vs reimbursement—what cardiologists should get in writing for travel and lodging.",
      "cardiology locum travel expenses",
      ["locum travel expenses paid", "cardiology locum stipend", "locum housing airfare"],
    ),
    sections: [
      S("Stipend vs reimbursement", "Some contracts include stipends; others reimburse receipts. Ambiguity is expensive.", "Get the mechanism in writing."),
      S("Document the details", "Airfare, lodging standard, rental car, mileage, parking, weather cancellations.", "Distance to hospital is a clinical safety issue."),
      S("Tax notes", "Travel economics can have tax implications—CPA territory.", "Not tax advice."),
    ],
    faqs: [
      faq("Are travel expenses always paid?", "No. Verify each assignment."),
      faq("What if lodging is far or unsafe?", "Raise it before start—or decline."),
    ],
  },
  {
    slug: "interventional-cardiology-career",
    pageDef: def(
      "subspecialty",
      "Interventional Cardiology Career Guide",
      "Interventional Cardiology Career Guide: Training to Practice Reality",
      "IC career realities—STEMI burden, volume, burnout risk, and locums as a valve.",
      "interventional cardiology career",
      ["interventional cardiology career guide", "become interventional cardiologist", "IC cardiology lifestyle"],
    ),
    sections: [
      S("Training to practice", "IC adds cath-lab identity on top of general cardiology. Privileging follows logs—not vibes.", "Structural privileges are usually separate."),
      S("STEMI burden", "Activation culture decides lifestyle more than the fellowship brochure.", "Ask for counts in job searches."),
      S("Burnout risk", "Radiation, nights, and complication stress accumulate.", "Design recoverability early."),
      S("Locums valve", "Selective IC locums can add control or income—when pathways are clear.", "See the IC locums guide."),
    ],
    faqs: [
      faq("Is IC always higher pay?", "Often—with higher intensity. Model life rate."),
      faq("Can I leave IC later?", "Possible but costly—choose with eyes open."),
    ],
  },
  {
    slug: "electrophysiology-career",
    pageDef: def(
      "subspecialty",
      "Electrophysiology Career Guide",
      "Electrophysiology Career Guide: Ablation, Devices, Lifestyle Myths",
      "EP career realities—lab dependence, call myths, and locums scarcity.",
      "electrophysiology career",
      ["electrophysiology career guide", "EP cardiology lifestyle", "ablation career"]),
    sections: [
      S("Lab-dependent craft", "EP days hinge on anesthesia, techs, and lab readiness—not only your skill.", "Ask how labs actually run."),
      S("Lifestyle myths", "EP is not automatically 'better lifestyle' than IC. Arrhythmia call and lab days can be intense.", "Talk to working EPs about real weeks."),
      S("Ablation vs devices", "Different products, different locums markets.", "Document what you actually do."),
      S("Locums scarcity", "EP coverage is scarce when fit is real—wrong-fit is still wrong.", "See the EP locums guide."),
    ],
    faqs: [
      faq("Device-only EP viable?", "Yes in the right markets."),
      faq("IC vs EP?", "Choose nervous-system fit, not prestige."),
    ],
  },
  {
    slug: "highest-paying-states-cardiologists",
    pageDef: def(
      "data",
      "Highest Paying States for Cardiologists",
      "Highest Paying States for Cardiologists (and What High Pay Costs)",
      "State pay screenshots vs COL, call intensity, and licensing friction.",
      "highest paying states for cardiologists",
      ["highest paying states cardiologists", "best paid states cardiology", "cardiologist salary by state lifestyle"],
    ),
    sections: [
      S("Nominal vs net", "Highest pay lists ignore COL, taxes, and nights.", "Build household math."),
      S("Call-adjusted pay", "Divide compensation by recoverable life units.", "Painful—and clarifying."),
      S("Licensing friction", "Some high-pay geographies are slow to enter.", "Timeline is part of compensation."),
      S("Locums angle", "State premiums vary by scope—STEMI vs clinic.", "Use state hubs + calculator as context."),
    ],
    faqs: [
      faq("Is there a true #1 state?", "No—constraints differ by household."),
      faq("Should pay lead the search?", "Lead with constraints; filter on pay."),
    ],
  },
  {
    slug: "locum-cardiologist-tax-overview",
    pageDef: def(
      "tax",
      "Locum Cardiologist Tax Overview",
      "Locum Cardiologist Tax Overview: Quarterly Estimates, Entities, Deductions",
      "High-level 1099 tax topics for locum cardiologists—CPA required.",
      "locum cardiologist tax overview",
      ["locum cardiologist taxes", "1099 cardiologist taxes", "locum physician quarterly taxes"],
    ),
    sections: [
      S("1099 reality", "Quarterly estimates and self-employment considerations are common.", "Get a CPA before April panic."),
      S("W-2 locum roles", "Withholding simplifies cash flow; deduction patterns change.", "Compare net."),
      S("Entities", "LLC/S corp is fact-specific—avoid forum templates.", "Not tax advice."),
      S("Records", "Track travel, licensing, CME, malpractice carefully.", "Good books are professionalism."),
    ],
    faqs: [
      faq("Do I need an S corp immediately?", "Often no—ask a CPA."),
      faq("Is this tax advice?", "No—educational only."),
    ],
  },
  {
    slug: "llc-s-corp-locum-cardiologists",
    pageDef: def(
      "tax",
      "LLC and S-Corp for Locum Cardiologists",
      "LLC and S-Corp for Locum Cardiologists: When to Talk to a CPA",
      "When entity formation conversations make sense for locum cardiologists.",
      "LLC S corp locum cardiologist",
      ["LLC for locum cardiologist", "S corp locum cardiologist", "locum physician entity"],
    ),
    sections: [
      S("When questions appear", "Irregular 1099 income and rising volume trigger entity talks.", "Timing is fact-specific."),
      S("LLC limits", "Not magic liability armor or automatic savings.", "Professionals only."),
      S("S corp notes", "Reasonable compensation and compliance matter.", "DIY from social media is risky."),
      S("Next step", "CPA + attorney when complexity rises.", "We do not provide tax services."),
    ],
    faqs: [
      faq("Should every locum cardiologist form an LLC?", "No."),
      faq("Can I wait?", "Often yes until numbers justify complexity."),
    ],
  },
  {
    slug: "semi-retired-cardiologist-locums",
    pageDef: def(
      "career",
      "Semi-Retired Cardiologist Locums",
      "Semi-Retired Cardiologist Locums: Gliding, Not Grinding",
      "Lower-intensity locum blocks for late-career cardiologists.",
      "semi retired cardiologist locums",
      ["semi retired cardiologist locum", "retired cardiologist locums", "glidepath cardiology locums"],
    ),
    sections: [
      S("Gliding, not grinding", "Many late-career cardiologists want continuity without full employed intensity.", "Selective blocks can preserve skill and identity."),
      S("Lower-intensity design", "Clearer clinic/consult scopes, limited nights, predictable lodging.", "State limits early."),
      S("Credentialing still matters", "Privileging timelines do not retire when you do.", "Keep documents current."),
      S("Respectful matching", "You are an expert—not an afterthought.", "Intensity boundaries are professional."),
    ],
    faqs: [
      faq("Can fully retired physicians return?", "Sometimes—with licensing/privileging work."),
      faq("Part-time only?", "Often yes—still confirm call."),
    ],
  },
  {
    slug: "pediatric-cardiology-locums",
    pageDef: def(
      "subspecialty",
      "Pediatric Cardiology Locums",
      "Pediatric Cardiology Locums: Niche Reality Check",
      "When pediatric cardiology locums exists—and market realities vs adult cardiology.",
      "pediatric cardiology locums",
      ["pediatric cardiology locum jobs", "pediatric cardiologist locum", "peds cardiology locums"],
    ),
    sections: [
      S("Narrower market", "Peds cardiology locums exists in pockets—not adult-volume dynamics.", "Set expectations accordingly."),
      S("Scope", "Confirm age ranges, procedural expectations, surgical adjacency.", "Wrong-fit risk is high."),
      S("Privileging", "Specialized logs and references; timelines can be long.", "Start early."),
      S("Career design", "Many blend employed anchors with selective coverage.", "Plan honestly."),
    ],
    faqs: [
      faq("Is peds locums common?", "Less than adult general/IC."),
      faq("Can adult cards cover peds?", "Generally no for true pediatric scope."),
    ],
  },
  {
    slug: "locum-cardiologist-tax-deductions",
    pageDef: def(
      "tax",
      "Locum Cardiologist Tax Deductions",
      "Tax Deductions Locum Cardiologists Commonly Discuss with CPAs",
      "Common deduction categories for locum cardiologists—CPA required.",
      "locum cardiologist tax deductions",
      ["tax deductions locum cardiologist", "locum physician deductions", "1099 cardiologist deductions"],
    ),
    sections: [
      S("Categories, not dogma", "Licensing, CME, travel, malpractice, and home-office rules may apply depending on facts.", "CPA required."),
      S("Recordkeeping", "Receipts and calendars matter.", "Treat books like clinical notes."),
      S("Stipends", "Tax treatment varies—ask professionals.", "Educational only."),
      S("Entities", "LLC/S corp changes patterns.", "Do not copy forum structures."),
    ],
    faqs: [
      faq("Can I deduct all travel?", "Not automatically—facts matter."),
      faq("Is this tax advice?", "No."),
    ],
  },
  {
    slug: "pros-cons-locum-cardiology",
    pageDef: def(
      "comparison",
      "Pros and Cons of Locum Cardiology",
      "Pros and Cons of Locum Cardiology (Balanced, Not a Sales Sheet)",
      "Honest tradeoffs of locum cardiology by life stage.",
      "pros and cons locum cardiology",
      ["pros and cons locum cardiology", "locum cardiology worth it pros cons", "locum vs employed tradeoffs"],
    ),
    sections: [
      S("Balanced view", "Locums offers control and income potential with benefits gaps, variability, and credentialing friction.", "Life stage changes the math."),
      S("Pros", "Defined blocks, geographic optionality, clearer short-term scope when written well.", "Learning across systems."),
      S("Cons", "Income gaps, DIY benefits, stigma in some rooms, travel fatigue.", "Admin overhead."),
      S("Decide with a framework", "Use 24-month goals—not slogans. Hybrids are allowed.", "See locums vs employed guide."),
    ],
    faqs: [
      faq("Is locums worth it?", "If it advances your primary goal without destroying recoverability."),
      faq("Is permanent better?", "For many—when culture and covenants are sane."),
    ],
  },
  // Strategy listed these as /guides/...; also available as /resources/... essays
  {
    slug: "hate-schedule-not-medicine",
    pageDef: def(
      "career",
      "I Don't Hate Medicine. I Hate My Schedule.",
      "I Don't Hate Medicine. I Hate My Schedule.",
      "Separate vocation from job design—for cardiologists who still love medicine.",
      "hate schedule not medicine",
      ["hate schedule not medicine", "physician schedule burnout", "cardiologist loves medicine hates schedule"],
    ),
    sections: [
      S("Identity rescue", "You can keep the vocation and redesign the job.", "Quitting medicine is not the only door."),
      S("Schedule as clinical infrastructure", "Sleep and recoverability are quality infrastructure.", "Martyrdom is not a quality metric."),
      S("Options map", "Renegotiate, reduce FTE, change setting, selective locums, glidepath retirement.", "Pick experiments with end dates."),
      S("Soft next step", "If you want a confidential conversation about flexible cardiology paths, inquire.", "If you only needed permission, you have it."),
    ],
    faqs: [
      faq("Is this just burnout?", "Schedule redesign helps many; still seek support if distressed."),
      faq("Will colleagues understand?", "Some will. Your patients still need a sustainable you."),
    ],
  },
  {
    slug: "reading-career-blogs-at-1am",
    pageDef: def(
      "career",
      "If You're Reading Career Blogs at 1 a.m., Read This First",
      "If You're Reading Career Blogs at 1 a.m., Read This First",
      "A calm decision tree for anxious cardiology fellows and attendings.",
      "physician career anxiety night",
      ["physician career anxiety", "cardiology fellow anxiety", "career blogs at night"],
    ),
    sections: [
      S("You are not broken", "Searching at 1 a.m. means you care about your life.", "It does not mean you must decide tonight."),
      S("Three-path tree", "Stay and renegotiate; redesign clinically; or plan a longer exit.", "Pick information steps, not identity jumps."),
      S("Tomorrow's one task", "Email a peer, list non-negotiables, or schedule counsel—one task.", "Momentum without chaos."),
      S("If you want help", "A confidential cardiology-only conversation is available when you are ready.", "Sleep first."),
    ],
    faqs: [
      faq("Should I resign tonight?", "Almost never. Plan first."),
      faq("Is anxiety alone a reason to leave?", "It is a reason to assess—design and support both matter."),
    ],
  },
  {
    slug: "career-design-not-side-hustle",
    pageDef: def(
      "career",
      "Career Design, Not Side Hustle",
      "Stop Calling It a Side Hustle. It's Career Design.",
      "Reframe physician extra work as intentional portfolio design.",
      "physician career design",
      ["physician career design", "physician side hustle", "portfolio physician career"],
    ),
    sections: [
      S("Language shapes behavior", "Side hustle implies extraction. Career design implies boundaries.", "Choose language carefully."),
      S("Portfolio examples", "Employed + rare locums; teaching + clinic; imaging reads + consults.", "Write constraints first."),
      S("Guardrails", "Contracts, malpractice, sleep caps.", "Money without judgment is a bad trade."),
    ],
    faqs: [
      faq("Is all extra work bad?", "No—unbounded extra work is."),
      faq("Where does locums fit?", "As one designed chapter when scope and timelines fit."),
    ],
  },
  {
    slug: "fellowship-never-taught-money",
    pageDef: def(
      "career",
      "What Fellowship Never Taught You About Money",
      "What Fellowship Never Taught You About Money",
      "RVUs, negotiation, 1099 reality, and debt strategy fellowship rarely teaches.",
      "fellowship never taught money",
      ["physician money fellowship", "cardiology fellow finances", "RVU negotiation cardiology"],
    ),
    sections: [
      S("Money anxiety is information", "Debt plus delayed earnings creates rational anxiety.", "Replace rumination with a monthly floor and offer rubric."),
      S("RVUs and negotiation", "Learn definitions before you sign.", "Attorney + spreadsheet beats pride."),
      S("1099 literacy", "If locums enters your plan, learn quarterly estimates with a CPA.", "Educational only."),
      S("Debt sprint guardrails", "Higher income that destroys sleep is a bad loan payoff strategy.", "Recoverability is a financial asset."),
    ],
    faqs: [
      faq("Should I maximize income in year one?", "Only inside sustainable design."),
      faq("Is locums the fastest debt payoff?", "Sometimes—licensing lead time and intensity matter."),
    ],
  },
];
