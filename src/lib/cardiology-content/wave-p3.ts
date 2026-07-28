import type { EditorialGuideBody, EditorialResourceDraft } from "./types";

const U = "2026-07-28";
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

export const P3_GUIDES: EditorialGuideBody[] = [
  {
    slug: "first-week-cardiology-locums",
    pageDef: def("career", "First Week on Cardiology Locums", "First Week on a Cardiology Locums Assignment: What to Expect", "Day-one checklist for cardiology locums—EHR, STEMI path, partners, documentation.", "first week locum cardiology", ["first week locum cardiology", "locum cardiologist orientation", "cardiology locum day one"]),
    sections: [
      S("Day-one mission", "Learn STEMI/consult pathways, who to call at 2 a.m., and documentation expectations before heroics.", "Orientation is clinical safety."),
      S("Checklist", "EHR access, pager rules, cath/EP contacts, echo workflows, transfer patterns, coding tips from locals.", "Write it down."),
      S("Social map", "Meet the people who actually run nights—not only the medical director.", "Allies matter."),
      S("End of week review", "Decide whether to extend based on culture and recoverability—not only rate.", "Leaving a bad fit early is allowed."),
    ],
    faqs: [faq("What if orientation is thin?", "Demand a pathway walkthrough before nights."), faq("Should I take call night one?", "Only if privileged and oriented—push back on unsafe starts.")],
  },
  {
    slug: "how-many-locum-agencies",
    pageDef: def("career", "How Many Locum Agencies", "How Many Locums Agencies Should a Cardiologist Work With?", "The 2–3 agency rule for cardiologists—quality over inbox flood.", "how many locum agencies", ["how many locum agencies", "multiple locum recruiters", "cardiology locum recruiters"]),
    sections: [
      S("Two to three is the sweet spot", "One can limit options. Five creates repetitive low-quality noise.", "Invest in relationships that understand cardiology scope."),
      S("When to cut", "Chronic lowballs, vague call, disrespect for boundaries.", "Your time is clinical capital."),
      S("Specialty-only value", "Cardiology-only recruiting reduces mismatches.", "Honest 'no fit' is a feature."),
    ],
    faqs: [faq("Can I use hospital direct plus agencies?", "Sometimes—watch exclusive language in contracts."), faq("Should I sign exclusivity?", "Usually avoid broad exclusivity early.")],
  },
  {
    slug: "telecardiology-locums-2026",
    pageDef: def("career", "Telecardiology Locums 2026", "Telecardiology and Hybrid Locums: What's Real in 2026", "Where telecardiology works—and where it is fantasy—for locum cardiologists.", "telecardiology jobs", ["telecardiology jobs", "tele cardiology locums", "remote cardiology locum"]),
    sections: [
      S("What is real", "Some read pools, select e-consults, and hybrid models exist.", "On-site STEMI coverage is not a Zoom product."),
      S("Licensing", "Multi-state rules still apply. Tele does not erase boards.", "Plan footprints."),
      S("Quality and boundaries", "Turnaround SLAs, overnight expectations, and malpractice clarity matter.", "Remote does not mean unbounded."),
      S("Hybrid futures", "Expect more hybrids, not full replacement of bedside cardiology.", "Keep skills current."),
    ],
    faqs: [faq("Can tele replace travel?", "Partially for imaging/consult niches—not for most IC needs."), faq("Pay vs on-site?", "Varies widely—compare scope.")],
  },
  {
    slug: "recover-from-bad-first-cardiology-job",
    pageDef: def("career", "Recover From a Bad First Cardiology Job", "Building a Career After a Bad First Cardiology Job", "Exit without narrative damage—locums and redesign as bridges.", "bad first cardiology job", ["bad first cardiology job", "leave first cardiology job", "recover cardiology career"]),
    sections: [
      S("Bad first jobs happen", "You are not uniquely failing. Systems hire aggressively and under-deliver.", "Start exit design early."),
      S("Protect the story", "Finish professionally. Secure references. Avoid public scorched earth.", "Small field."),
      S("Bridge options", "Structured locums, setting change, FTE reset.", "Licensing lead times—plan."),
      S("Rebuild confidence", "Peer truth > shame. Choose the next role for fit, not redemption via more suffering.", "Recoverability first."),
    ],
    faqs: [faq("Will one bad job ruin me?", "Unlikely if you exit cleanly and perform well next."), faq("Should I jump immediately?", "If unsafe or covenant-feasible—yes with a plan. If merely miserable, plan then jump.")],
  },
  {
    slug: "dual-physician-couple-cardiology",
    pageDef: def("career", "Dual-Physician Couples in Cardiology", "Dual-Physician Couples in Cardiology: Job Search Strategy", "Geography sequencing and locums bridges for dual-physician households.", "dual physician couple cardiology", ["dual physician couple jobs", "two physician household cardiology", "physician couple job search"]),
    sections: [
      S("Optimize the household", "Two careers beat one 'perfect' job that breaks the other partner.", "Write joint constraints."),
      S("Sequencing", "Sometimes one partner anchors while the other uses locums/travel temporarily.", "Time-limit the imbalance."),
      S("Geography", "Underrated markets can win for couples.", "Airports and licenses matter."),
      S("Communication", "Decide deal-breakers before interviews.", "Resentment grows in silence."),
    ],
    faqs: [faq("Should we only look at the same city?", "Often yes long-term; short locums bridges can help transitions."), faq("Academic + private mix?", "Common—verify call and childcare logistics.")],
  },
  {
    slug: "return-to-clinical-cardiology",
    pageDef: def("career", "Return to Clinical Cardiology", "Returning to Clinical Cardiology After a Break", "Re-entry after parenting, illness, or nonclinical time—privileging and locums as on-ramps.", "return to clinical cardiology", ["return to clinical cardiology", "cardiologist career break", "reenter cardiology practice"]),
    sections: [
      S("Re-entry is common", "Breaks happen—parenting, health, nonclinical chapters. Shame helps no one.", "Plan privileges and skill refresh."),
      S("Documentation", "Update CME, references, and recent clinical activity narratives.", "Honesty with hospitals beats spin."),
      S("Locums as on-ramp", "Defined scopes and mentorship-friendly sites can rebuild confidence.", "Avoid brutal STEMI intensity as day one back."),
      S("Pace", "Part-time returns are valid.", "Protect recoverability."),
    ],
    faqs: [faq("How long is too long away?", "Hospital-dependent—ask early and specifically."), faq("Do I need retraining?", "Sometimes formal, sometimes supervised return—site-specific.")],
  },
  {
    slug: "women-in-cardiology-careers",
    pageDef: def("career", "Women in Cardiology Careers", "Women in Cardiology: Flexibility, Call, and Structural Barriers", "Schedule design and flexible paths—without lean-in fluff.", "women in cardiology career", ["women in cardiology", "female cardiologist career", "cardiology work life women"]),
    sections: [
      S("Structural, not personal", "Call structures and culture create unequal loads. Individual grit is not a system fix.", "Name structural barriers."),
      S("Flexibility as agency", "Part-time, job shares, selective locums, and boundary enforcement are tools.", "Not moral failures."),
      S("Negotiation", "Ask for post-call rules and transparent metrics.", "Bring peers and data."),
      S("Community", "Mentorship and peer networks matter disproportionately.", "Build them intentionally."),
    ],
    faqs: [faq("Is cardiology uniquely hard for women?", "Many procedural fields share issues—cardiology call intensity is real."), faq("Is locums better?", "It can be for control—when contracts match life.")],
  },
  {
    slug: "img-cardiologist-locums",
    pageDef: def("career", "IMG Cardiologist Locums", "International Medical Graduates in Cardiology Locums: Extra Friction Points", "Licensing, privileging, and timeline friction IMGs face in cardiology locums.", "IMG cardiologist locums", ["IMG cardiologist locums", "international medical graduate locums", "IMG cardiology jobs"]),
    sections: [
      S("Extra friction is real", "Verification timelines and documentation quirks can extend starts.", "Start earlier than MD peers advise."),
      S("Licensing", "Board processes vary. Keep packets pristine.", "IMLC eligibility is fact-specific."),
      S("Privileging", "Hospitals may request additional verification steps.", "Budget calendar time."),
      S("Matching", "Work with recruiters who understand IMG timelines honestly.", "Fantasy start dates waste everyone."),
    ],
    faqs: [faq("Can IMGs do travel locums?", "Yes with licensing footprints—often slower."), faq("Visa issues?", "Complex—immigration counsel required; we do not give legal advice.")],
  },
  {
    slug: "pediatric-cardiology-locums-guide",
    pageDef: def("subspecialty", "Pediatric Cardiology Locums Guide", "Pediatric Cardiology Locums: Niche Reality Check", "When pediatric cardiology locums exists—and when it does not.", "pediatric cardiology locum jobs", ["pediatric cardiology locums", "pediatric cardiologist locum", "peds cardiology locum tenens"]),
    sections: [
      S("Niche reality", "Pediatric cardiology locums exists in narrower pockets than adult cardiology.", "Do not expect adult-volume market dynamics."),
      S("Scope", "Confirm age ranges, procedural expectations, and surgical program adjacency.", "Wrong-fit is high risk."),
      S("Privileging", "Specialized logs and references matter.", "Timelines can be long."),
      S("Career design", "Many peds cardiologists blend employed anchors with selective coverage.", "Plan honestly."),
    ],
    faqs: [faq("Is peds locums common?", "Less than adult general/IC."), faq("Can adult cards cover peds?", "Generally no for true pediatric scope.")],
  },
  {
    slug: "compare-cardiology-offers-by-state",
    pageDef: def("career", "Compare Cardiology Offers by State", "Comparing Cardiology Offers Across States: Net Lifestyle Math", "Taxes, COL, partner income, commute—worksheet thinking for multi-state offers.", "compare cardiology offers by state", ["compare cardiology offers", "cardiology salary by state lifestyle", "net cardiology compensation"]),
    sections: [
      S("Nominal vs net", "State salary screenshots lie without COL, taxes, and call.", "Build a household spreadsheet."),
      S("Non-money columns", "Schools, spouse career, airports, winters, visa/family constraints.", "These decide retention."),
      S("Call-adjusted pay", "Divide compensation by recoverable life units.", "Painful—and clarifying."),
      S("Locums testing", "Sometimes a block teaches more than another dinner interview.", "Licensing time required."),
    ],
    faqs: [faq("Which tax rate should I use?", "CPA—do not guess from blogs."), faq("Is highest salary state best?", "Often not.")],
  },
  {
    slug: "cardiology-compensation-trends",
    pageDef: def("data", "Cardiology Compensation Trends", "Cardiology Compensation Trends Physicians Should Watch", "Workforce shortage, PE pressure, RVUs, and locums demand—high-level trends.", "cardiology compensation trends", ["cardiology compensation trends", "cardiologist pay trends", "cardiology workforce compensation"]),
    sections: [
      S("Shortage meets system pressure", "Coverage needs remain while employed models intensify productivity pressure.", "Locums demand is partly a system design signal."),
      S("What to watch", "Call burden trends, PE/health-system consolidation effects, RVU policy shifts.", "Local beats national averages."),
      S("Physician response", "Boundary setting, portfolio careers, selective geography.", "Agency without conspiracy thinking."),
      S("Data humility", "Surveys lag. Your contract is the truth set.", "Use trends as context only."),
    ],
    faqs: [faq("Will pay keep rising?", "Unknown—scope and nights still dominate individual outcomes."), faq("Should I wait to sign?", "Do not wait forever; do verify terms.")],
  },
  {
    slug: "tax-deductions-for-locum-cardiologists",
    sections: [
      S("Categories, not DIY dogma", "Licensing, CME, travel, malpractice, and home office rules may apply depending on facts.", "CPA required."),
      S("Recordkeeping", "Receipts and calendars save audits and arguments.", "Treat books like clinical notes."),
      S("Stipends", "Tax treatment varies—ask professionals.", "Educational only."),
      S("Entity interplay", "LLC/S corp changes deduction patterns.", "Do not copy forum structures blindly."),
    ],
    faqs: [faq("Can I deduct all travel?", "Not automatically—facts matter."), faq("Is this tax advice?", "No.")],
  },
  {
    slug: "northeast-cardiology-markets",
    pageDef: def("career", "Northeast Cardiology Markets", "Northeast Cardiology Markets: Academic Gravity vs Locums Demand", "Academic density, non-competes, and travel blocks in the Northeast.", "Northeast cardiology jobs", ["Northeast cardiology jobs", "New England cardiology locums", "NY cardiology locum"]),
    sections: [
      S("Academic gravity", "Dense academic centers shape culture and competition.", "Non-competes and politics appear often."),
      S("Locums role", "Coverage still needed—fit varies by city and community hospitals.", "Licensing across nearby states can help."),
      S("Lifestyle", "Transit, schools, and cost vary block by block.", "Do not treat 'Northeast' as one market."),
      S("Explore", "State hubs + clear city constraints.", "Ask call questions early."),
    ],
    faqs: [faq("Is Northeast pay highest?", "Not uniformly after COL."), faq("Good for fellows?", "Strong training density—job fit still local.")],
  },
  {
    slug: "southeast-cardiology-locums",
    pageDef: def("career", "Southeast Cardiology Locums", "Southeast Cardiology Locums: Growth Markets and Call Reality", "FL/GA/NC/SC/TN-style growth markets and call realities.", "Southeast cardiology locums", ["Southeast cardiology locums", "Southeast cardiologist jobs", "Florida Georgia cardiology locums"]),
    sections: [
      S("Growth and migration", "Population growth supports coverage needs.", "Call culture still decides happiness."),
      S("Licensing footprint", "Multi-state SE footprints are common for travelers.", "Sequence boards."),
      S("Lifestyle variance", "Coastal vs inland, metro vs rural—huge spread.", "Visit operationally."),
      S("Next steps", "Combine regional preference with subspecialty hubs.", "Inquire with honest constraints."),
    ],
    faqs: [faq("Is Florida the whole Southeast?", "No—do not collapse the region."), faq("Heat and call?", "Logistics matter—plan recovery.")],
  },
  {
    slug: "midwest-cardiology",
    pageDef: def("career", "Midwest Cardiology", "Midwest Cardiology: Underrated Lifestyle and Steady Demand", "COL advantages, family lifestyle, and cardiology demand in the Midwest.", "Midwest cardiology jobs", ["Midwest cardiology jobs", "Midwest cardiologist locums", "Midwest physician lifestyle"]),
    sections: [
      S("Underrated on purpose", "Coastal narratives ignore Midwestern recoverability and cost advantages.", "Look anyway."),
      S("Demand", "Community and regional centers need coverage.", "Steady can beat flashy."),
      S("Family math", "Schools, housing, and commute often win.", "Spouse careers still key."),
      S("Locums", "Local/regional blocks can reduce airport life.", "Ask about winters and call."),
    ],
    faqs: [faq("Is pay lower?", "Sometimes nominal—net lifestyle may still win."), faq("Boring?", "Only if you require coastal identity.")],
  },
  {
    slug: "prevent-privileging-delays",
    pageDef: def("career", "Prevent Privileging Delays", "Privileging Nightmares: How to Prevent a Delayed Start Date", "Document hygiene and specialty gotchas that delay cardiology starts.", "hospital privileging delays", ["privileging delays physicians", "hospital credentialing delay", "locum start date delayed"]),
    sections: [
      S("Most delays are predictable", "Incomplete packets, slow references, mismatched logs, committee calendars.", "Hygiene is power."),
      S("Specialty gotchas", "IC/EP logs must match requested privileges.", "Imaging SLAs documentation helps."),
      S("Communication", "Respond same day to credentialing requests.", "Silence extends clocks."),
      S("Buffers", "Do not book nonrefundable travel before approval.", "Optimism is not a start date."),
    ],
    faqs: [faq("Can recruiters fix delays?", "They can chase—cannot invent committee dates."), faq("Temporary privileges?", "Site-specific—never assume.")],
  },
  {
    slug: "locums-improves-permanent-options",
    pageDef: def("career", "Locums Improves Permanent Options", "How Cardiology Locums Can Improve—Not Hurt—Your Permanent Job Options", "Site scouting, negotiation leverage, and network effects.", "locums help permanent cardiology job", ["locums help permanent job", "locum then permanent cardiology", "locums negotiation leverage"]),
    sections: [
      S("Locums as intelligence", "Working a site teaches call culture faster than dinner interviews.", "Use that data."),
      S("Leverage", "Real alternative economics change negotiations.", "Stay professional—no threats."),
      S("Network", "Good blocks create references and future offers.", "Bad blocks teach boundaries."),
      S("CV framing", "Intentional sampling story > apology story.", "Keep clinical excellence obvious."),
    ],
    faqs: [faq("Will permanent employers dislike locums?", "Some bias exists; results and letters matter more."), faq("How long to locums before permanent?", "Often 6–24 months—goals decide.")],
  },
  {
    slug: "mentorship-after-cardiology-fellowship",
    pageDef: def("career", "Mentorship After Cardiology Fellowship", "Mentorship Gaps After Fellowship: How to Build Your Own", "Peer networks and mentors after training ends.", "cardiology mentorship after fellowship", ["cardiology mentorship", "mentorship after fellowship", "early career cardiologist mentors"]),
    sections: [
      S("The cliff", "Fellowship ends and structured mentorship often vanishes.", "Build replacements intentionally."),
      S("Who counts", "Peers two years ahead, non-competitive attendings, and skill-specific mentors.", "One person cannot be everything."),
      S("How to ask", "Specific asks beat vague 'be my mentor.'", "Respect time; close loops."),
      S("Locums angle", "Travel can isolate—schedule peer check-ins.", "Community is clinical infrastructure."),
    ],
    faqs: [faq("What if my workplace has no mentors?", "Build external ones; consider setting change."), faq("Paid coaching?", "Sometimes useful—vet carefully.")],
  },
  {
    slug: "when-to-hire-physician-contract-attorney",
    pageDef: def("career", "When to Hire a Physician Contract Attorney", "When to Hire a Physician Contract Attorney (Cardiology-Specific)", "Triggers: non-compete, tail, RVU complexity—what fellows should know.", "physician contract attorney cardiology", ["physician contract attorney", "cardiology contract review lawyer", "review cardiology employment contract"]),
    sections: [
      S("Cheap compared to cages", "Physician-specific counsel catches non-competes, tail, and productivity traps generalists miss.", "Budget for it."),
      S("Triggers", "Any real offer with covenants or complex RVUs.", "Earlier is cheaper than litigation fantasies."),
      S("What you still own", "Operational call questions and culture diligence.", "Lawyers do not replace site visits."),
      S("Disclaimer", "Not a referral service or legal advice.", "Educational career guidance."),
    ],
    faqs: [faq("Can I use a friend who is a lawyer?", "Prefer physician-contract specialists."), faq("What if employer rushes?", "Rushing covenants is a signal—slow down.")],
  },
  {
    slug: "critical-care-cardiology-careers",
    pageDef: def("subspecialty", "Critical Care Cardiology Careers", "Critical Care Cardiology and Hybrid Roles: Emerging Paths", "Critical care cardiology adjacency—training and locums rarity.", "critical care cardiology career", ["critical care cardiology", "CICU cardiologist career", "cardiac intensivist jobs"]),
    sections: [
      S("Emerging identity", "CICU-focused roles are growing in some systems.", "Training pathways vary."),
      S("Lifestyle", "Intensity can be high; schedules vary by model.", "Ask for night structures."),
      S("Locums rarity", "True CICU locums is less common than general/IC.", "Expect narrower markets."),
      S("Hybrid careers", "Many blend CICU with consult/clinic.", "Define percentages."),
    ],
    faqs: [faq("Do I need extra fellowship?", "Often yes for true intensivist roles—confirm locally."), faq("Burnout risk?", "Real—design recovery.")],
  },
  {
    slug: "cardio-oncology-careers",
    pageDef: def("subspecialty", "Cardio-Oncology Careers", "Cardio-Oncology Careers: Niche Demand and Practice Models", "Where cardio-oncology fits—employed models vs locums rarity.", "cardio oncology career", ["cardio-oncology career", "cardio oncology jobs", "cardiologist oncology"]),
    sections: [
      S("Niche with meaning", "Cardio-oncology serves a growing patient need.", "Program maturity varies widely."),
      S("Practice models", "Embedded in cancer centers vs consult overlays.", "Referral engines decide volume."),
      S("Locums", "Rare as pure locums; skills still enrich general profiles.", "Do not expect dense travel markets."),
      S("Training", "Seek mentors and structured exposure.", "Document competencies."),
    ],
    faqs: [faq("Is it a full-time field everywhere?", "No—often hybrid."), faq("Compensation?", "Highly local—verify.")],
  },
  {
    slug: "disability-insurance-locum-cardiologists",
    pageDef: def("career", "Disability Insurance for Locum Cardiologists", "Disability Insurance and Locums: Coverage Gaps Cardiologists Miss", "Questions for advisors when income becomes variable.", "disability insurance locum physician", ["disability insurance locum physician", "physician disability insurance 1099", "locum cardiologist disability"]),
    sections: [
      S("Variable income changes risk", "1099 patterns can expose coverage gaps.", "Review policies when you change work design."),
      S("Questions for advisors", "Own-occupation definitions, riders, and how variable income is underwritten.", "Professionals only."),
      S("Timing", "Buy thoughtfully while healthy and documentable.", "Do not wait for crisis."),
      S("Disclaimer", "Not insurance advice.", "Educational awareness only."),
    ],
    faqs: [faq("Does employer coverage follow me to locums?", "Often not—verify."), faq("Is this urgent?", "If you have dependents and procedural income—yes, review soon.")],
  },
  {
    slug: "hard-to-staff-cardiology-markets",
    pageDef: def("career", "Hard-to-Staff Cardiology Markets", "Alaska, Hawaii, and Hard-to-Staff Cardiology Markets", "Premium travel curiosity—logistics, family feasibility, rate premiums.", "Alaska Hawaii cardiology locums", ["Alaska cardiology locums", "Hawaii cardiology locums", "hard to staff cardiology"]),
    sections: [
      S("Premiums have reasons", "Distance, licensing, and lifestyle logistics drive scarcity premiums.", "Romance the place after you model the work."),
      S("Family feasibility", "Schools, spouse careers, and travel time can veto the adventure.", "Be honest."),
      S("Clinical reality", "Backup and transfer patterns matter more on islands and remote systems.", "Ask operationally."),
      S("Try vs commit", "Locums can test hard-to-staff markets before permanent leaps.", "Privileging timelines still apply."),
    ],
    faqs: [faq("Are rates always higher?", "Often—verify nights and support."), faq("Good first locums?", "Only if logistics fit your life.")],
  },
  {
    slug: "pros-and-cons-of-locum-cardiology",
    sections: [
      S("Balanced, not a sales sheet", "Locums offers control and income potential with gaps in benefits, stability, and admin load.", "Life stage changes the math."),
      S("Pros", "Defined blocks, geographic optionality, clearer short-term scope when written well.", "Learning across systems."),
      S("Cons", "Credentialing friction, income variability, stigma in some rooms, benefits DIY.", "Travel fatigue."),
      S("Decision", "Use the 24-month framework—not slogans.", "Hybrid designs are allowed."),
    ],
    faqs: [faq("Is locums worth it?", "If it advances your primary goal without destroying recoverability—yes."), faq("Permanent better?", "For many—when culture and covenants are sane.")],
  },
  {
    slug: "is-locum-cardiology-worth-it",
    sections: [
      S("A fit test, not a cheer", "Score autonomy, income, geography, stability, and energy.", "If three are red, reconsider."),
      S("Who it fits", "Samplers, redesigners, gliders, debt sprinters with guardrails.", "Not everyone."),
      S("Who it hurts", "People needing instant income without licenses; people who hate variability; people escaping without a plan.", "Honesty saves years."),
      S("Try small", "One well-chosen block teaches more than endless rumination.", "Then decide."),
    ],
    faqs: [faq("Can I reverse course?", "Usually yes with narrative and performance."), faq("Should fellows default to locums?", "No—default to clarity.")],
  },
  {
    slug: "career-paths-burned-out-cardiologists",
    pageDef: def("career", "Career Paths for Burned-Out Cardiologists", "Best Career Paths for Burned-Out Cardiologists (Clinical Options First)", "Part-time, locums, setting change—clinical-first options before nonclinical exits.", "burned out cardiologist career paths", ["burned out cardiologist", "cardiology burnout career change", "leave cardiology burnout"]),
    sections: [
      S("Clinical-first bias (on purpose)", "Many burned-out cardiologists still want medicine—with a different design.", "Explore redesign before identity demolition."),
      S("Options map", "Part-time, non-invasive emphasis, setting change, selective locums, glidepath retirement.", "Pick experiments."),
      S("Health first", "If you are in acute distress, seek professional support.", "Career pages are not therapy."),
      S("Confidential help", "Talk through flexible cardiology paths without judgment.", "Honest fit only."),
    ],
    faqs: [faq("Is nonclinical the answer?", "Sometimes—but try clinical redesign first if you still want patients."), faq("How fast can I change?", "Contracts and licenses set speed limits.")],
  },
  {
    slug: "what-flexibility-means-to-physicians",
    pageDef: def("career", "What Flexibility Means to Physicians", "What 'Flexibility' Means to Physicians—and What Recruiters Get Wrong", "Define flexibility as recoverable time—not buzzwords.", "physician flexibility meaning", ["physician flexibility meaning", "flexible schedule cardiologist", "locum flexibility"]),
    sections: [
      S("Define it", "Recoverable control of nights, census, and off-blocks.", "If undefined, it is marketing."),
      S("Recruiter tells", "Specificity = respect. Adjectives = fog.", "Cardiology scope needs detail."),
      S("Your sheet", "Write non-negotiables before shopping.", "Measure every offer against it."),
      S("Locums", "Can deliver flexibility when contracts are real.", "Poor blocks fake it."),
    ],
    faqs: [faq("Is remote work flexibility?", "Only for roles that are truly remote—most cardiology still needs bedside realities."), faq("Part-time equals flexible?", "Not if call is full.")],
  },
];

export const P3_RESOURCES: EditorialResourceDraft[] = [
  {
    slug: "reading-career-blogs-at-1am",
    title: "If You're Reading Career Blogs at 1 a.m., Read This First",
    metaDescription: "A calm decision tree for anxious cardiology fellows and attendings reading career content at night.",
    h1: "If You're Reading Career Blogs at 1 a.m., Read This First",
    directAnswer: "Nighttime career spirals are common. Capture three non-negotiables, pick one next diligence step, and sleep—major contract decisions should not be finalized at 1 a.m.",
    keywords: ["physician career anxiety", "cardiology fellow anxiety", "career blogs at night"],
    relatedArticleSlugs: [
      "things-nobody-tells-you-cardiology-fellowship",
      "hate-schedule-not-medicine",
      "locum-vs-permanent-cardiology-jobs",
    ],
    relatedSpecialtyPathSlugs: ["general"],
    lastUpdated: U,
    sections: [
      S("You are not broken", "Searching at 1 a.m. means you care about your life.", "It does not mean you must decide tonight."),
      S("Three-path tree", "Stay and renegotiate; redesign clinically (part-time/setting/locums); or plan a longer exit.", "Pick information steps, not identity jumps."),
      S("Tomorrow's one task", "Email a peer, list non-negotiables, or schedule counsel—one task.", "Momentum without chaos."),
      S("If you want help", "A confidential cardiology-only conversation is available when you are ready.", "Sleep first."),
    ],
    faqs: [faq("Should I resign tonight?", "Almost never. Plan first."), faq("Is anxiety alone a reason to leave?", "It is a reason to assess—design and support both matter.")],
  },
];
