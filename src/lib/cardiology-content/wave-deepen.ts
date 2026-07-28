import type { EditorialGuideBody } from "./types";

const S = (h2: string, ...paragraphs: string[]) => ({ h2, paragraphs });
const faq = (q: string, a: string) => ({ q, a });

/**
 * Deepen thin Expand/Upgrade targets that already have routes.
 * No pageDef — bodies only (Map last-wins when appended after earlier waves).
 */
export const DEEPEN_GUIDES: EditorialGuideBody[] = [
  {
    slug: "cardiologist-salary-guide",
    sections: [
      S(
        "Salary is a structure, not a headline",
        "Cardiologist compensation mixes base, RVUs or collections, quality bonuses, call stipends, and benefits. A single national average hides whether nights, STEMI, or clinic panel are the real price of the package.",
        "Compare employed total compensation to locum weekly gross after benefits gaps, unpaid credentialing, and recovery weeks—not brochure base alone.",
      ),
      S(
        "What actually moves cardiology pay",
        "Subspecialty scope, call intensity, geography, hospital vs group ownership, and productivity math drive outcomes more than title. Interventional and EP packages often look higher until you annualize nights and complication risk.",
        "Ask for historical partner or employed distributions, not theoretical upside. Moving thresholds and vague 'you'll crush it' language are red flags.",
      ),
      S(
        "Locums vs employed economics",
        "Locum rates are often weekly or daily and exclude employer-paid benefits. Model quarterly taxes, health insurance, retirement, and malpractice with a CPA and broker when comparing.",
        "Use the locums calculator and pay report as directional tools. Written assignment scope still decides real earnings.",
      ),
      S(
        "Geography without mythology",
        "High-paying regions often trade cost of living, call burden, or travel. Lowest-tax states are not automatically highest net if intensity destroys recoverability.",
        "See state salary pages and highest-paying-states guides for context—not guarantees.",
      ),
      S(
        "Negotiation posture that protects the week",
        "Negotiate call, census caps, APP support, and exit terms with the same energy as base. A higher number with undefined STEMI nights is not a raise.",
        "Attorney review for covenants, tail, and partnership tracks is normal diligence—not distrust.",
      ),
    ],
    faqs: [
      faq("What is a typical cardiologist salary?", "Ranges vary widely by subspecialty, call, and geography. Treat published averages as context, not an offer."),
      faq("Do locum cardiologists earn more?", "Sometimes on a weekly gross basis—after benefits, taxes, and unpaid onboarding, the comparison can reverse. Model both structures."),
      faq("Should fellows focus on base or RVUs?", "Both—plus call and non-competes. Definitions beat slogans."),
    ],
  },
  {
    slug: "cardiology-locum-contract-length",
    sections: [
      S(
        "How long cardiology locum contracts usually run",
        "Blocks commonly span a few days to several months. Weekend coverage, one-week inpatient stretches, multi-week cath/EP coverage, and longer leave coverage each have different privileging economics.",
        "Extensions should be re-documented with updated call, census, and rate—not assumed from a handshake.",
      ),
      S(
        "Short vs long: the real tradeoffs",
        "Short blocks raise privileging and travel overhead relative to clinical days. Long blocks reduce admin churn but raise commitment risk if culture, staffing, or STEMI volume is wrong.",
        "Match length to uncertainty: first site at a new hospital often deserves a moderate trial, not a six-month lock-in.",
      ),
      S(
        "Cancellations, gaps, and runway",
        "Know who pays when facilities cancel, delay privileging, or cut census. Credentialing delays are a length problem in disguise—your calendar can go empty while unpaid work continues.",
        "If you are fully locums-based, plan income gaps explicitly. Hybrid employed + selective blocks changes the math.",
      ),
      S(
        "First-assignment length guidance",
        "Many cardiologists do best with a block long enough to learn the EHR, partners, and true night load—and short enough to exit a bad fit without drama.",
        "Ask whether the site wants recurrence. Recurring moderate blocks often beat one heroic marathon.",
      ),
    ],
    faqs: [
      faq("Do blocks auto-renew?", "Assume no. Get renewals and rate changes in writing."),
      faq("What is best for a first assignment?", "Often moderate length: enough to learn, short enough to leave a wrong fit."),
      faq("Can I stack short blocks nationally?", "Yes if licensing and recovery allow—watch unpaid credentialing time."),
    ],
  },
  {
    slug: "cardiology-locum-travel-expenses",
    sections: [
      S(
        "Separate clinical pay from travel economics",
        "Travel, housing, rental car, mileage, parking, and per diems are contract items—not vibes. Compare clinical compensation separately from reimbursed expenses so a 'high rate' with self-pay hotels is not misread.",
        "Ask what is prepaid vs reimbursed, receipt rules, and caps before you book flights.",
      ),
      S(
        "Housing and logistics that protect sleep",
        "Housing near the hospital with reliable parking beats a cheaper Airbnb across town after STEMI nights. Duplicate essentials, protect sleep windows, and plan grocery/access for odd hours.",
        "Travel fatigue is a clinical safety issue. Sites that normalize impossible logistics are telling you something.",
      ),
      S(
        "Tax-adjacent notes (not advice)",
        "Some travel costs interact with tax treatment depending on your structure and facts. Keep organized records and discuss with a CPA who understands locum physicians.",
        "Educational only—not tax advice.",
      ),
      S(
        "When travel is not worth it",
        "If reimbursements are ambiguous, housing is unsafe or far, or unpaid travel days erase the weekly gross, decline or renegotiate.",
        "Local or regional blocks can be the better career design for many cardiologists.",
      ),
    ],
    faqs: [
      faq("Are travel and housing always included?", "No. Structures differ—verify each contract."),
      faq("Who books flights?", "Varies by agency/facility. Clarify before accepting."),
      faq("Can I drive instead of fly?", "Often—confirm mileage rules and lodging still apply."),
    ],
  },
  {
    slug: "locum-cardiologist-tax-overview",
    sections: [
      S(
        "1099 realities without panic",
        "Many locum cardiologists receive 1099 income. That usually means quarterly estimated taxes, self-employment tax considerations, and benefits you fund yourself—not that you are 'behind' for practicing medicine.",
        "Educational overview only. Your CPA should model your actual facts.",
      ),
      S(
        "Build a monthly floor",
        "Before celebrating weekly gross, set aside a conservative tax reserve and a benefits reserve. Cash that feels abundant in week one can feel scarce in April.",
        "Pair tax planning with health insurance, disability, and retirement contributions early—not after the first busy quarter.",
      ),
      S(
        "Entity questions belong with professionals",
        "LLC, S-corp, and sole prop questions are fact-specific. Do not copy a colleague's structure because their Instagram looked clean.",
        "See our LLC/S-corp guide as orientation—then hire advice.",
      ),
      S(
        "Multi-state work",
        "Licensing across states can create filing complexity. Track where you worked and keep assignment calendars tidy for your preparer.",
        "IMLC helps licensing speed; it does not erase tax complexity.",
      ),
    ],
    faqs: [
      faq("Is this tax advice?", "No. Educational only—use a qualified CPA."),
      faq("Do I need quarterly estimates?", "Often for 1099 income—confirm with your preparer."),
      faq("W-2 locums exist?", "Some arrangements differ. Read the contract and pay stubs carefully."),
    ],
  },
  {
    slug: "locum-cardiologist-tax-deductions",
    sections: [
      S(
        "Deductions are documentation problems",
        "Possible categories cardiologists discuss with CPAs include travel between assignments, licensing fees, CME, professional dues, and home office facts—when they qualify under current rules.",
        "Receipts and calendars beat memory. Educational only—not tax advice.",
      ),
      S(
        "Do not invent aggressive positions",
        "If a deduction strategy sounds like a TikTok hack, pause. Audit risk and sleep quality matter.",
        "Ask your CPA what is ordinary, necessary, and well-supported for your pattern of work.",
      ),
      S(
        "Benefits and retirement still count",
        "Health premiums, retirement contributions, and disability planning can matter as much as chasing every deduction line.",
        "Model total wealth and recoverability—not only taxable income minimization.",
      ),
      S(
        "Coordinate with entity choice",
        "Deduction patterns can change with entity structure. Sequence entity decisions with a CPA and attorney—not after you already spent.",
      ),
    ],
    faqs: [
      faq("Can I deduct everything travel-related?", "Not automatically. Rules and facts matter—ask a CPA."),
      faq("Is CME deductible?", "Often discussed—confirm current rules for your situation."),
      faq("Should I use software alone?", "Software helps organization; professional review still matters."),
    ],
  },
  {
    slug: "llc-s-corp-locum-cardiologists",
    sections: [
      S(
        "Structure is a tool, not a personality",
        "Some locum cardiologists operate as sole proprietors; others use LLCs or S-corps for liability and tax planning reasons. None of those choices make you more or less of a physician.",
        "Pick structure with a CPA and attorney who understand physician locums—not from a group chat.",
      ),
      S(
        "What to ask professionals",
        "Ask about reasonable compensation rules, payroll burden, multi-state filings, retirement plan options, and how malpractice and contracts interact with your entity.",
        "Cheap setup with wrong ongoing compliance is expensive.",
      ),
      S(
        "Timing",
        "Do not delay starting clinically forever waiting for perfect entity paperwork—and do not ignore entity planning until April panic.",
        "A staged plan with clear owners (you, CPA, attorney) beats improvisation.",
      ),
      S(
        "Educational boundary",
        "This page is orientation for MD/DO cardiologists exploring locums economics. It is not legal or tax advice.",
      ),
    ],
    faqs: [
      faq("Do I need an LLC to do locums?", "Not always. Ask professionals based on your risk and income pattern."),
      faq("Is S-corp always better?", "No. It depends on income, expenses, and compliance cost."),
      faq("Can my spouse help with the entity?", "Sometimes—discuss roles carefully with advisors."),
    ],
  },
  {
    slug: "highest-paying-states-cardiologists",
    sections: [
      S(
        "High pay is usually high intensity somewhere",
        "State rankings that ignore call, STEMI volume, cost of living, and licensing friction mislead. A top 'pay' state can still be a bad week.",
        "Use rankings as a shortlist for diligence—not as a destination myth.",
      ),
      S(
        "What to compare instead of a leaderboard",
        "Compare written weekly rates, call, backup, housing, and unpaid credentialing days. Then adjust for taxes and living costs with someone who knows your household.",
        "Our state salary pages and locums calculator help directional modeling.",
      ),
      S(
        "Licensing lead time",
        "A high-paying state you cannot license into quickly is not a near-term option. IMLC helps some physicians; it does not cover every scenario.",
        "Build a license map before you resign from employed work.",
      ),
      S(
        "Lifestyle filter",
        "Partner/family needs, school calendars, and recoverability belong in the ranking. Money that destroys sleep is a bad trade.",
      ),
    ],
    faqs: [
      faq("Which state pays cardiologists the most?", "It depends on role, call, and year. Treat published lists as directional."),
      faq("Should I chase the top state?", "Only if scope, licensing, and life design fit."),
      faq("Do rural states pay more?", "Sometimes—with intensity and support tradeoffs. Verify staffing and backup."),
    ],
  },
  {
    slug: "pediatric-cardiology-locums",
    sections: [
      S(
        "Pediatric cardiology locums is a specialty market",
        "Volume is thinner than adult general or interventional locums. Fit, program type, and imaging/procedural scope matter more than scrolling endless adult job boards.",
        "Confirm whether coverage is inpatient consults, clinic, imaging, cath, or electrophysiology-adjacent—and what age ranges are in scope.",
      ),
      S(
        "Privileging and training match",
        "Children's hospitals and mixed programs differ in acuity and backup. Bring logs that match advertised privileges.",
        "Do not stretch into unsupported procedural scope for a rate.",
      ),
      S(
        "Lifestyle and travel",
        "Fewer open roles can mean more travel between centers. Plan recovery and family logistics honestly.",
        "Local or regional recurring blocks may beat national hopping.",
      ),
      S(
        "How we help",
        "Locum Career Hub recruits cardiologists—including pediatric cardiology when roles fit. Inquire with clear scope preferences.",
      ),
    ],
    faqs: [
      faq("Are pediatric cardiology locums common?", "Less common than adult general/IC. Quality of fit beats volume of ads."),
      faq("Can adult cardiologists cover peds locums?", "Usually no for true pediatric scope—confirm credentialing rules."),
      faq("Do rates differ from adult cardiology?", "Often—acuity, rarity, and program type drive numbers."),
    ],
  },
  {
    slug: "semi-retired-cardiologist-locums",
    sections: [
      S(
        "Glidepath, not abrupt cliff",
        "Semi-retired cardiologists often want clinical identity without employed call forever. Locum blocks can create a glidepath: defined dates, selective scope, and recovery weeks.",
        "Write non-negotiables first—nights, STEMI, travel radius, and annual week caps.",
      ),
      S(
        "Scope that matches this season",
        "Many prefer consult/clinic/imaging over primary STEMI. That is a legitimate design choice—not a lesser career.",
        "Confirm privileges and malpractice match the lighter scope you want.",
      ),
      S(
        "Benefits and identity",
        "Plan health insurance, retirement drawdown, and how you will explain the chapter to colleagues without apology.",
        "Stigma is real in some rooms; patient care still needs sustainable physicians.",
      ),
      S(
        "Credentialing realism",
        "Privileging still takes time. Start licensing and paperwork before you fully step down from employed roles if continuity matters.",
      ),
    ],
    faqs: [
      faq("Can I do locums a few weeks a year?", "Often—if sites accept limited availability and privileging economics work."),
      faq("Will hospitals want older cardiologists?", "Many need experienced coverage. Document current competence and preferred scope."),
      faq("Is this only for retirement?", "No—also for sabbatical-like seasons and phased transitions."),
    ],
  },
  {
    slug: "is-locum-cardiology-worth-it",
    sections: [
      S(
        "Worth it for what goal?",
        "Locum cardiology is worth it when it advances a primary goal—debt sprint, schedule redesign, geographic testing, bridge between jobs, or semi-retirement—without destroying recoverability.",
        "It is not worth it as a vague escape fantasy from every workplace frustration.",
      ),
      S(
        "Run the real scorecard",
        "Score autonomy, income after benefits/taxes, clinical fit, travel load, credentialing friction, and stigma tolerance. Hybrids are allowed.",
        "See pros/cons and locums vs employed resources for frameworks.",
      ),
      S(
        "Life-stage math",
        "Fellows, mid-career parents, and late-career cardiologists weigh the same tradeoffs differently. Copying a peer's answer is not diligence.",
        "Revisit the scorecard every 12–24 months.",
      ),
      S(
        "Soft next step",
        "If you want cardiologist-only matching with transparent scope conversations, inquire. If you only needed a decision framework, you have one.",
      ),
    ],
    faqs: [
      faq("Is locums better than employed?", "Neither is universally better. Design beats ideology."),
      faq("How long before I know?", "Often after 2–3 well-chosen blocks with honest debriefs."),
      faq("Can I reverse course?", "Often yes—keep relationships and licenses warm."),
    ],
  },
  {
    slug: "pros-cons-locum-cardiology",
    sections: [
      S(
        "Balanced view (not a sales sheet)",
        "Locums can offer control, geographic optionality, and clearer short-term scope when contracts are written well. It also brings benefits gaps, income variability, credentialing friction, and travel fatigue.",
        "Life stage changes which side of the ledger dominates.",
      ),
      S(
        "Pros that actually matter",
        "Defined blocks, ability to decline bad fits, learning across systems, and sometimes stronger weekly gross for intense coverage.",
        "For some, the psychological win is choosing the week—not maximizing dollars.",
      ),
      S(
        "Cons that get underplayed",
        "DIY benefits, unpaid onboarding, stigma in some academic or employed cultures, loneliness on the road, and the temptation to stack call until you recreate burnout.",
        "Admin overhead is real work.",
      ),
      S(
        "Decide with a 24-month goal",
        "Write the primary goal and non-negotiables. Hybrids (employed + rare locums) are legitimate. Slogans are not a plan.",
      ),
    ],
    faqs: [
      faq("Is locums worth it?", "If it advances your primary goal without destroying recoverability."),
      faq("Is permanent better?", "For many—when culture, call, and covenants are sane."),
      faq("Should I try one block first?", "Often yes, with licensing lead time planned."),
    ],
  },
  {
    slug: "interventional-cardiology-career",
    sections: [
      S(
        "Career design beyond the cath lab hero narrative",
        "Interventional careers span primary STEMI call, elective PCI mixes, peripheral work, structural pathways, and hybrid employed/locum models. The job title does not define the week—activation load and backup do.",
        "Write the lifestyle you can sustain before chasing volume mythology.",
      ),
      S(
        "Training to first attending",
        "Logs, privileges, and surgical backup culture matter as much as fellowship prestige. Ask how complications are handled and who is actually in-house.",
        "First-job scorecards should weight nights and partner behavior heavily.",
      ),
      S(
        "Where locums fits",
        "IC locums can bridge jobs, sample markets, or create recovery between intense employed stretches. It will not fix STEMI hatred if every block recreates the same activation pattern.",
        "See interventional locums hub and pay pages for directional economics.",
      ),
      S(
        "Long-game options",
        "Some interventionalists shift toward structural, imaging-heavy, or leadership roles; others reduce FTE or go selective locums. Career design is allowed.",
      ),
    ],
    faqs: [
      faq("Is interventional always higher pay?", "Often higher gross with higher intensity—model total design."),
      faq("Can I do IC locums part-time?", "Sometimes, if privileges and moonlighting rules allow."),
      faq("When should I leave a toxic cath lab?", "When safety, dignity, or recoverability are gone—plan licensing before the blowup if you can."),
    ],
  },
  {
    slug: "electrophysiology-career",
    sections: [
      S(
        "EP careers are lab-and-clinic systems",
        "Ablation days, device implants, device clinics, and remote monitoring create a different intensity profile than STEMI call—but not a zero-intensity life.",
        "Clarify weekly mix before you accept employed or locum roles.",
      ),
      S(
        "Training and privileging",
        "Mapping platforms, volumes, and device experience shape privileges. Bring honest logs.",
        "Program culture around complex ablation support matters.",
      ),
      S(
        "Locums as a design tool",
        "EP locums can cover leave, backlog, or selective lab days. Remote monitoring burden between travel weeks must be explicit.",
        "See EP locums hub and pay guidance for directional rates.",
      ),
      S(
        "Burnout patterns in EP",
        "Inbox and remote alerts can erase the benefit of 'no STEMI.' Bound monitoring expectations like you would bound call.",
      ),
    ],
    faqs: [
      faq("Is EP less intense than IC?", "Different intensity. Define nights and remote load."),
      faq("Do EP locums include devices and ablation?", "Often both—confirm weekly targets."),
      faq("Can EP be part-time?", "Yes in some designs—privileging economics still apply."),
    ],
  },
];
