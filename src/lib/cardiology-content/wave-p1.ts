import type { EditorialGuideBody, EditorialResourceDraft } from "./types";

const U = "2026-07-28";
const S = (h2: string, ...paragraphs: string[]) => ({ h2, paragraphs });
const faq = (q: string, a: string) => ({ q, a });
const def = (
  category: "career" | "subspecialty" | "comparison" | "faq" | "licensing" | "tax",
  h1: string,
  title: string,
  description: string,
  topic: string,
  keywords: string[],
) => ({ category, h1, title, description, topic, keywords });

export const P1_GUIDES: EditorialGuideBody[] = [
  {
    slug: "non-invasive-cardiology-locums",
    pageDef: def(
      "subspecialty",
      "Non-Invasive Cardiology Locums",
      "Non-Invasive Cardiology Locums: Clinic, Consult, Imaging—What Weeks Look Like",
      "What non-invasive cardiology locum weeks actually include—consult caps, clinic, imaging supervision, and callbacks.",
      "non invasive cardiology locums",
      ["non invasive cardiology locums", "general cardiology locum schedule", "consult cardiology locums"],
    ),
    sections: [
      S("Largest pool, most schedule ambiguity", "Non-invasive locums are often sold as 'lighter.' Sometimes they are. Sometimes clinic-only still includes night callbacks and weekend census.", "Define consult caps, imaging supervision, and after-hours rules before you accept."),
      S("A realistic week", "Expect a mix of inpatient consults, clinic sessions, and echo/stress oversight depending on the site. Ask for census ranges and read volume SLAs.", "If the site cannot describe a typical Tuesday, they cannot protect your Tuesday."),
      S("Imaging expectations", "Clarify who reads what, turnaround times, and whether you are on-site or covering a pool. Imaging creep is a common surprise.", "Nuclear and echo supervision rules should match your credentials."),
      S("When non-invasive locums fits", "Parents, burnout recovery, and physicians who want clinical continuity without cath-lab intensity often thrive here—with boundaries.", "Use part-time and schedule guides if you are stacking this onto employed work."),
    ],
    faqs: [
      faq("Is non-invasive locums lower paid?", "Often directional bands sit below heavy STEMI IC, but call and geography matter more than the label."),
      faq("Can I avoid nights entirely?", "Sometimes. Get it in writing. 'Rarely' is not a schedule."),
    ],
  },
  {
    slug: "cardiology-locum-schedule-examples",
    pageDef: def(
      "career",
      "Cardiology Locum Schedule Examples",
      "What a Cardiology Locums Schedule Actually Looks Like",
      "Concrete cardiology locum schedule patterns—week-on blocks, weekends, seasonal, and hybrid employed+locums.",
      "cardiology locum schedule",
      ["cardiology locum schedule", "locum cardiologist schedule examples", "week on week off cardiology"],
    ),
    sections: [
      S("Flexibility is meaningless until you see a calendar", "Physicians do not buy 'flexibility.' They buy recoverable weeks. Here are patterns that actually show up in cardiology locums.", "None are universal. All should be written into contracts."),
      S("Week-on / defined block models", "Multi-day or multi-week continuous coverage with clear start/stop dates. Travel and lodging logistics matter as much as clinical load.", "Ask what happens on the shoulder days of the block."),
      S("Weekends-only and additive models", "Employed physicians sometimes add weekend coverage. This can help financially and destroy recoverability if the weekday job is already heavy.", "Treat additive nights as a clinical risk decision, not free money."),
      S("Seasonal and hybrid designs", "Some cardiologists work harder in certain seasons and protect others. Hybrids need employment-contract clearance.", "Design the year, not only the next block."),
    ],
    faqs: [
      faq("Can I customize a schedule?", "Often within market reality. Scarcity helps; chaos sites do not."),
      faq("What schedule is best for burnout?", "Usually fewer nights and true off-blocks—not more variety with the same intensity."),
    ],
  },
  {
    slug: "questions-cardiology-fellows-should-ask",
    pageDef: def(
      "career",
      "Questions Cardiology Fellows Should Ask Employers",
      "Questions Every Cardiology Fellow Should Ask Employers",
      "Forty practical questions for cardiology fellows—call, volume, partners, exit terms, and culture.",
      "questions cardiology fellows ask employers",
      ["questions cardiology fellows ask employers", "cardiology job interview questions", "cardiology fellowship job search"],
    ),
    sections: [
      S("Why fellows under-ask", "Training culture rewards endurance, not interrogation. The job market rewards clear questions. You are allowed to ask operational questions without being 'difficult.'", "Bring a written list. Memory fails after third dinner interview."),
      S("Call and schedule questions", "How many nights per month historically? STEMI activation counts? Post-call clinic? Weekend census? Who is true backup?", "If answers are vibes, treat that as the answer."),
      S("Volume and money questions", "What are clinic panel sizes? Consult caps? RVU thresholds and conversion factors? How often did thresholds change in three years?", "Ask what partners actually produced—not the brochure upside."),
      S("Partners, exit, and culture", "Why did the last two physicians leave? Non-compete radius/duration/scope? Tail responsibility? How are conflicts handled?", "Junior attendings often tell more truth than the chair."),
      S("After the interview", "Score answers the same day. Compare offers on one rubric. Involve a physician contract attorney when covenants get real.", "Pair with the first-job offer evaluation guide."),
    ],
    faqs: [
      faq("Will asking tough questions lose the offer?", "Healthy groups respect professionalism. Threats over basic diligence are a warning."),
      faq("How many questions is too many?", "Prioritize ten that matter. Scattershot lists look unprepared."),
    ],
  },
  {
    slug: "academic-vs-private-vs-employed-cardiology",
    pageDef: def(
      "comparison",
      "Academic vs Private vs Hospital-Employed Cardiology",
      "Private Practice vs Academic vs Hospital-Employed Cardiology",
      "Cardiology-specific tradeoffs across academic, private, and hospital-employed settings—lifestyle, politics, and income trajectory.",
      "academic vs private vs employed cardiology",
      ["academic vs private practice cardiology", "hospital employed cardiology", "cardiology career settings"],
    ),
    sections: [
      S("Three different jobs that share a specialty name", "Academic, private, and hospital-employed cardiology differ in politics, pace, research expectations, and how money shows up.", "Fellows often choose prestige or fear—not fit."),
      S("Academic", "Mission, teaching, and research can be real. Bureaucracy and compensation tradeoffs can also be real. Ask about protected time that actually exists.", "Locums sometimes supplements academic summers—check conflict rules."),
      S("Private practice", "Autonomy and upside can be higher. Partnership tracks and buy-ins need clear math. Culture variance is enormous.", "Verify call sharing among partners, not marketing."),
      S("Hospital-employed", "Stability and benefits attract many. Non-competes, RVU structures, and system politics can constrain autonomy.", "Read exit terms before you fall in love with the sign-on."),
    ],
    faqs: [
      faq("Which path is best for lifestyle?", "The one with recoverable call and decent partners—not the category label."),
      faq("Can I switch later?", "Yes, with non-compete and reputation constraints. Switching is easier with a clean first chapter."),
    ],
  },
  {
    slug: "heart-failure-locum-opportunities",
    sections: [
      S("HF locums is program-dependent", "Advanced heart failure coverage is not interchangeable with general consult cardiology. Confirm weekend census, advanced therapies adjacency, and what you will not cover.", "Wrong-fit HF blocks create clinical and political risk."),
      S("What sites actually need", "Some need rebound census help. Some need transplant-adjacent sophistication. Some need both and will not admit it.", "Ask for program description in writing."),
      S("Privileging and documentation", "Training and experience documentation should match the acuity. Do not stretch beyond safe scope for a rate.", "Pair with credentialing timeline planning."),
      S("Lifestyle realities", "HF can mean fewer STEMI nights and more weekend cognitive load. Define recoverability explicitly.", "Locum Career Hub matches cardiologists by real scope—not generic heart labels."),
    ],
    faqs: [
      faq("Can general cardiologists cover HF locums?", "Sometimes for defined consult scope—not for advanced program roles. Clarify."),
      faq("Is HF locums common?", "Less common than general/IC. Fit matters more than volume of ads."),
    ],
  },
  {
    slug: "structural-heart-locums",
    pageDef: def(
      "subspecialty",
      "Structural Heart Locums",
      "Structural Heart Locums: TAVR Programs, Privileging, and Fit",
      "When structural heart locums is realistic—TAVR program needs, privileging, and wrong-fit risks.",
      "structural heart locums",
      ["structural heart locum jobs", "TAVR locum coverage", "structural cardiology locums"],
    ),
    sections: [
      S("Niche, high-barrier, high-trust", "Structural locums is not a casual add-on to PCI travel. Programs gate privileges carefully.", "Be honest about your recent structural volume."),
      S("What programs need", "Heart-team participation, specific procedure privileges, and reliable scheduling around OR/hybrid lab resources.", "Ask what happens when cases cancel or run late."),
      S("Privileging reality", "Expect detailed logs and references. Timelines stretch. Temporary privileges are uncommon for complex structural work.", "Plan months, not vibes."),
      S("When to walk away", "If a site wants structural coverage without program infrastructure, that is not an opportunity—it is a hazard.", "Fit beats scarcity premium."),
    ],
    faqs: [
      faq("Can IC locums include structural?", "Only with matching privileges. Do not assume overlap."),
      faq("Is structural locums a full career?", "For a few. For most it is selective coverage alongside broader practice."),
    ],
  },
  {
    slug: "cardiology-career-mistakes-first-five-years",
    pageDef: def(
      "career",
      "Cardiology Career Mistakes in the First Five Years",
      "Career Mistakes Cardiologists Make in Their First Five Years",
      "Common early-career cardiology mistakes—non-competes, wrong partners, ignoring call culture, delaying options.",
      "cardiology career mistakes",
      ["cardiology career mistakes", "first five years cardiologist", "early career cardiology advice"],
    ),
    sections: [
      S("Mistake: optimizing only for logo and salary", "Prestige and base pay are easy to compare. Call culture and exit terms are harder—and more decisive.", "Use an offer scorecard."),
      S("Mistake: signing a cage you did not read", "Non-competes and tail obligations reshape your next decade. Skimming is expensive.", "Pay for physician-specific counsel once."),
      S("Mistake: saying yes to every committee and favor", "Early attendings overcompensate. Boundaries are a clinical skill.", "Protect recoverability like you protect patients."),
      S("Mistake: waiting too long to build options", "Licenses, networks, and locums literacy take time. Starting when you are already desperate is late.", "Keep a quiet BATNA."),
      S("Mistake: ignoring partner fit", "Bad partners turn good hospitals into attrition machines. Believe early warning signs.", "Forward this to a co-fellow who tells the truth."),
    ],
    faqs: [
      faq("Is it too late if I already signed a bad first job?", "No. Exit design exists. Start with contract terms and a confidential plan."),
      faq("Should new grads do locums first?", "Sometimes as a structured sample—not as avoidance of attending identity."),
    ],
  },
  {
    slug: "do-locum-cardiologists-get-malpractice-insurance",
    sections: [
      S("Malpractice is a deal-breaker category", "Never assume who provides coverage. Ask claims-made vs occurrence, limits, and tail responsibility before you sign.", "Cath lab and STEMI scopes need coverage matched to risk."),
      S("Claims-made vs occurrence", "Claims-made policies can require tail after the assignment. Occurrence policies behave differently. Get definitions in writing.", "This is educational—not insurance advice."),
      S("Who pays", "Agency, facility, or physician arrangements vary. Ambiguity here is unacceptable.", "If answers change by email thread, stop and reset in the contract."),
      S("Questions before day one", "Limits? Tail? Prior acts? What happens if a claim arrives after the block ends?", "Pair with contract review habits—not hope."),
    ],
    faqs: [
      faq("Do all locum cardiologists get malpractice included?", "Often arranged—but not identical. Verify every assignment."),
      faq("Should I buy my own policy?", "Sometimes. Discuss with a knowledgeable broker and your contracts."),
    ],
  },
  {
    slug: "cardiology-fellowship-job-search-timeline",
    pageDef: def(
      "career",
      "Cardiology Fellowship Job Search Timeline",
      "Month-by-Month: Final Year of Cardiology Fellowship Job Search",
      "A calm final-year cardiology fellowship job-search calendar—contracts, interviews, and decision points.",
      "cardiology fellowship job search timeline",
      ["cardiology fellowship job search timeline", "when to start cardiology job search", "final year cardiology fellowship"],
    ),
    sections: [
      S("You are probably later than you think—and still salvageable", "Programs under-teach job-search timing. Start with geography constraints and deal-breakers, not panic applications.", "A one-page brief beats scattered CV blasts."),
      S("Early final year", "Clarify academic vs employed vs private interest. Build question lists. Identify attorney resources. Update CV and procedure logs.", "If locums is a bridge option, start license thinking early."),
      S("Mid final year", "Interview with operational diligence. Compare offers on one rubric. Do not accept the first shiny number under fatigue.", "Involve counsel when covenants appear."),
      S("Late final year", "Finalize contracts, licensing, and credentialing for July realities. Build a 90-day attending transition plan.", "Protect sleep during this phase—fatigue signs bad deals."),
    ],
    faqs: [
      faq("What if I have no offers by spring?", "Widen geography, tighten story, consider structured locums bridge with eyes open on timelines."),
      faq("Should I moonlighting-optimize instead?", "Only if it does not destroy fellowship performance and contract rules allow it."),
    ],
  },
  {
    slug: "rural-cardiology-careers",
    pageDef: def(
      "career",
      "Rural Cardiology Careers",
      "Rural Cardiology: Lifestyle, Volume, and Locums Reality",
      "Honest rural cardiology tradeoffs—purpose, isolation, call, and locums premiums.",
      "rural cardiology jobs",
      ["rural cardiology jobs", "rural cardiologist locums", "rural cardiology lifestyle"],
    ),
    sections: [
      S("Rural is not a personality test", "Some cardiologists thrive on breadth, purpose, and community. Others feel professionally stranded. Both reactions are legitimate.", "Visit with eyes open—including weekends."),
      S("Volume and call realities", "Breadth can be high. Backup can be thin. Transfer patterns matter for STEMI and complex care.", "Ask what happens at 2 a.m. when you are it."),
      S("Locums in rural markets", "Rural sites often need coverage and may pay for friction. Logistics, housing, and recovery between blocks decide sustainability.", "Premium rates do not cancel isolation."),
      S("Family and spouse careers", "Dual careers can make rural impossible—or creatively workable with locums bridges.", "Design the household, not only the CV."),
    ],
    faqs: [
      faq("Are rural locums always higher pay?", "Often directional premiums exist—verify scope and nights."),
      faq("Can rural be part-time?", "Sometimes. Confirm whether 'part-time' still means full call."),
    ],
  },
  {
    slug: "cardiology-rvu-compensation-guide",
    sections: [
      S("RVUs are a language. Learn it before you negotiate.", "Many employed cardiology offers hide lifestyle inside productivity math. Thresholds, conversion factors, and carve-outs matter.", "Ask for historical partner distributions."),
      S("Moving goalposts", "If thresholds change frequently, upside is unstable. Get change rules in writing when possible.", "Verbal 'you'll easily hit it' is not a model."),
      S("Call and non-RVU work", "Admin, meetings, and certain coverage may not pay like clinical RVUs. Ask what is invisible labor.", "Effective hourly life cost beats brochure salary."),
      S("Locums comparison", "Many locum contracts are daily/weekly rates, not RVU. Still understand RVU culture at a site—it predicts intensity.", "Use offer tools to compare structures apples-to-apples."),
    ],
    faqs: [
      faq("Should fellows negotiate RVU terms?", "Yes—definitions and thresholds, not only base."),
      faq("Is higher conversion always better?", "Not if thresholds and call destroy the week."),
    ],
  },
  {
    slug: "physician-portfolio-career",
    pageDef: def(
      "career",
      "Physician Portfolio Careers",
      "The Future of Physician Careers Is Portfolio Work",
      "How cardiologists design portfolio careers—employed anchors, locums, teaching, and consulting—without hustle culture.",
      "physician portfolio career",
      ["physician portfolio career", "flexible physician career design", "cardiologist portfolio work"],
    ),
    sections: [
      S("Stop calling it a side hustle", "Portfolio work is intentional career design: multiple income and meaning streams with boundaries.", "Hustle culture burns clinicians. Design culture sustains them."),
      S("Common cardiology portfolios", "Employed base + rare locums; locums-primary + teaching; clinic-heavy + imaging reads; semi-retired glidepath blocks.", "Write your constraints first."),
      S("Risk management", "Contracts, malpractice, non-competes, and tax structure all change when you stack work.", "Use CPAs and attorneys for real complexity—this is educational."),
      S("Where Locum Career Hub fits", "We help with the locums/flexible clinical chapter—not every portfolio piece. Cardiology-only matching, honest fit.", "Tools exist to model pay and W-2 vs 1099 framing."),
    ],
    faqs: [
      faq("Is portfolio work only for late career?", "No. Early-career physicians use it carefully for debt and sampling—with eyes on credentialing time."),
      faq("Does this mean leaving medicine?", "Usually the opposite: staying clinically with a livable design."),
    ],
  },
  {
    slug: "locum-cardiology-for-new-graduates",
    sections: [
      S("New grads can use locums—with structure", "After fellowship, locums can sample markets and build leverage. It is not a shortcut around licensing and privileging.", "First blocks should match documented training scope."),
      S("Quarter-by-quarter first year", "Q1: setup and conservative blocks. Q2: optimize sites and taxes with a CPA. Q3: cut bad fits. Q4: decide hybrid, locums-primary, or permanent.", "Treat it like a business chapter."),
      S("Mentorship gaps", "Locums can feel isolating. Build peer contacts and keep clinical references warm.", "Avoid stacking brutal STEMI intensity as your first attending identity."),
      S("Soft landing options", "If permanent is the goal, use locums to gather site intelligence—then negotiate with real data.", "Locum Career Hub supports cardiologist-only transitions without multi-specialty spam."),
    ],
    faqs: [
      faq("Will programs judge locums after fellowship?", "Some stigma remains. A coherent story and strong clinical work matter."),
      faq("How soon can I start?", "Licensure and privileging dominate. Plan months."),
    ],
  },
];

export const P1_RESOURCES: EditorialResourceDraft[] = [
  {
    slug: "fellowship-never-taught-money",
    title: "What Fellowship Never Taught You About Money",
    metaDescription:
      "RVUs, negotiation, 1099 reality, and debt strategy—money lessons cardiology fellowship rarely teaches.",
    h1: "What Fellowship Never Taught You About Money",
    directAnswer:
      "Fellowship trains clinical excellence and under-trains financial agency. Fellows need plain language on RVUs, negotiation, debt math, and 1099 realities—without hustle-bro nonsense.",
    keywords: ["physician money fellowship", "cardiology fellow finances", "RVU negotiation cardiology"],
    relatedArticleSlugs: [
      "things-nobody-tells-you-cardiology-fellowship",
      "rvu-compensation-cardiologists",
      "how-much-do-locum-cardiologists-make",
    ],
    relatedSpecialtyPathSlugs: ["general", "interventional"],
    lastUpdated: U,
    sections: [
      S("Money anxiety is information", "Debt plus delayed earnings creates rational anxiety. Shame helps no one.", "Replace rumination with a monthly floor and a written offer rubric."),
      S("RVUs and negotiation", "Learn definitions before you sign. Upside without historical data is fiction.", "Attorney + spreadsheet beats pride."),
      S("1099 literacy", "If locums enters your plan, learn quarterly estimates and benefits gaps before your first block—with a CPA.", "Educational only—not tax advice."),
      S("Debt sprint guardrails", "Higher income that destroys sleep is a bad loan payoff strategy.", "Recoverability is a financial asset."),
    ],
    faqs: [
      faq("Should I maximize income in year one?", "Only inside sustainable design. Burnout is expensive."),
      faq("Is locums the fastest debt payoff?", "Sometimes. Licensing lead time and intensity matter."),
    ],
  },
];
