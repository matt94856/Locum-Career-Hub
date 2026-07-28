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

export const P2B_GUIDES: EditorialGuideBody[] = [
  {
    slug: "negotiate-cardiology-call-pay",
    pageDef: def("career", "Negotiate Cardiology Call Pay", "How to Negotiate Cardiology Call Pay Without Sounding Difficult", "Language templates and framing for cardiologists negotiating call pay.", "negotiate cardiology call pay", ["negotiate cardiology call pay", "STEMI call pay negotiation", "cardiology call stipend"]),
    sections: [
      S("Call pay is not greed", "You are pricing scarce nights and clinical risk. Professional framing beats apology.", "Bring historical counts if you have them."),
      S("What to ask for", "Clarity on activation pay, weekend rates, holiday multipliers, and what is included in base.", "Ambiguous 'competitive call pay' is not a term."),
      S("Language that works", "Stay calm, specific, and limited to priorities. 'I can commit to this role if nights are structured as X' beats a laundry list.", "If they punish questions, believe them."),
      S("BATNA quietly", "Knowing alternatives—including locums economics—changes your posture without threats.", "Ethics and contracts first."),
    ],
    faqs: [faq("Will negotiating call lose the offer?", "Healthy employers expect it. Brittle ones reveal themselves."), faq("Should attorneys negotiate call pay?", "Attorneys help covenants; you still own operational asks.")],
  },
  {
    slug: "unsustainable-cardiology-job-signs",
    pageDef: def("career", "Unsustainable Cardiology Job Signs", "Signs Your Cardiology Job Is Quietly Unsustainable", "Early warning signs—sleep debt, call creep, moral injury—before crisis exits.", "unsustainable cardiology job", ["unsustainable cardiology job", "cardiology burnout warning signs", "toxic cardiology job"]),
    sections: [
      S("Quiet unsustainability", "Jobs rarely announce they are breaking you. Patterns do: rising nights, shrinking recovery, moral injury.", "Track for 60–90 days."),
      S("Objective markers", "Sleep debt, canceled personal life, dread before shifts, rising near-misses in attention.", "Subjective misery counts."),
      S("System markers", "Moving RVU targets, disappearing backup, punishment for boundaries.", "Culture tells on itself."),
      S("Response options", "Renegotiate, reduce FTE, change settings, or plan a structured exit—including locums bridges.", "Crisis quitting is optional if you start early."),
    ],
    faqs: [faq("Is this just fellowship hangover?", "Maybe—but employed patterns that worsen after month six deserve attention."), faq("Who do I tell?", "Trusted peers first; professional support if distressed.")],
  },
  {
    slug: "cardiologist-income-optimization",
    pageDef: def("career", "Cardiologist Income Optimization", "Income Optimization for Cardiologists Without Burning Out", "Hourly effective rate thinking—raise income without destroying recoverability.", "cardiologist income optimization", ["cardiologist income optimization", "increase cardiologist income", "locums income cardiology"]),
    sections: [
      S("Optimize effective life rate", "Dollars divided by recoverable life is the real metric.", "A higher W-2 with stolen weekends can lose."),
      S("Levers", "Call pay clarity, selective locums, reduced unpaid admin, smarter geography.", "Not endless nights."),
      S("Debt vs lifestyle", "Debt sprints need end dates and guardrails.", "Permanent intensity is not a personality."),
      S("Tools", "Use calculators and W-2 vs 1099 framing as aids—not oracles.", "CPA for tax reality."),
    ],
    faqs: [faq("Is locums always higher income?", "Often gross weekly can be strong; benefits gaps and gaps between blocks matter."), faq("Should I maximize every weekend?", "Usually no.")],
  },
  {
    slug: "interventional-vs-ep-career",
    pageDef: def("comparison", "Interventional vs EP Career", "Choosing Between IC and EP: Lifestyle Tradeoffs Fellows Avoid Discussing", "Honest IC vs EP career tradeoffs—call, personality fit, longevity.", "interventional vs electrophysiology career", ["interventional vs EP", "IC vs EP lifestyle", "choose EP or interventional"]),
    sections: [
      S("Not a prestige contest", "Choose the work your nervous system can sustain for decades.", "Prestige fades; nights do not."),
      S("IC realities", "STEMI intensity, radiation, lab days, complication stress.", "Thrilling for some; corrosive for others."),
      S("EP realities", "Lab dependence, ablation/device mix, arrhythmia call myths vs facts.", "Ask working EPs about their actual weeks."),
      S("Decision aids", "Do elective rotations with honesty. Talk to unhappy people too—not only stars.", "You can still redesign later, but switching costs rise."),
    ],
    faqs: [faq("Can I dual train?", "Pathways exist but are demanding—mentor carefully."), faq("Which pays more?", "Markets vary; lifestyle fit still wins long-term.")],
  },
  {
    slug: "locums-stigma-myth",
    pageDef: def("career", "Locums Stigma Myth", "The Myth That Locums Is Only for Doctors Who Couldn't Get a Real Job", "Why locums stigma is outdated—and how cardiologists use it strategically.", "locums stigma physicians", ["locums stigma", "is locums real medicine", "locum tenens reputation"]),
    sections: [
      S("Stigma is often self-serving", "Some rooms equate locums with failure because it threatens narrative control.", "Outcomes and references matter more than gossip."),
      S("Who actually uses locums", "Early-career samplers, mid-career redesigners, late-career gliders, dual-career households.", "Elite training does not forbid flexible work."),
      S("How to tell your story", "Intentional chapter + clinical continuity + clear goals.", "Avoid sounding like you are running away—even if you are escaping a bad fit."),
      S("Reality check", "Locums is not morally superior to employment. It is a tool.", "Use it with standards."),
    ],
    faqs: [faq("Will academic jobs reject locums history?", "Some bias exists; coherent narratives and strong letters help."), faq("Should I hide locums?", "Do not lie. Frame clearly.")],
  },
  {
    slug: "mountain-west-cardiology",
    pageDef: def("career", "Mountain West Cardiology", "Mountain West Cardiology: Lifestyle Markets and Locums Demand", "CO, UT, ID, MT, AZ-style lifestyle magnets—outdoor living vs call realities.", "Mountain West cardiology jobs", ["Mountain West cardiology", "Colorado cardiology locums", "Utah cardiology jobs lifestyle"]),
    sections: [
      S("Lifestyle magnets", "Outdoor access draws physicians—and competition/call realities still apply.", "Visit for winters and workweeks, not only summer."),
      S("Locums demand patterns", "Coverage needs exist unevenly across the region.", "Licensing footprints matter."),
      S("Family calculus", "Spouse careers and schools can outweigh trailheads.", "Be honest."),
      S("Explore practically", "State hubs + clear preferences beat romantic geography shopping.", "Ask about nights before you ask about powder days."),
    ],
    faqs: [faq("Is pay lower for lifestyle?", "Sometimes tradeoffs exist—model total life."), faq("Best state in the region?", "Household-specific.")],
  },
  {
    slug: "physician-lifestyle-framework",
    pageDef: def("career", "Physician Lifestyle Framework", "Physician Lifestyle Rankings Are Mostly Nonsense—Here's a Better Framework", "A personal scorecard beating viral lifestyle ranking lists.", "physician lifestyle rankings", ["physician lifestyle rankings", "best lifestyle medical specialty", "cardiology lifestyle score"]),
    sections: [
      S("Rankings flatten humans", "Viral lists ignore partners, debt, geography, and call culture variance inside specialties.", "Use a personal framework."),
      S("Scorecard", "Recoverability, partner fit, debt trajectory, geography, meaning, autonomy.", "Weight what you actually value."),
      S("Cardiology variance", "IC nights differ from prevention clinics inside the same specialty label.", "Subspecialty + setting > specialty meme."),
      S("Revisit yearly", "Life stages change weights. That is allowed.", "Careers are redesignable."),
    ],
    faqs: [faq("Is cardiology bad lifestyle?", "It can be—or not—depending on design."), faq("Should I switch specialties for lifestyle?", "Rarely simpler than redesigning within cardiology first.")],
  },
  {
    slug: "wanting-easier-cardiology-job",
    pageDef: def("career", "Wanting an Easier Cardiology Job", "The Quiet Shame of Wanting an Easier Cardiology Job", "Permission to want recoverability without calling it weakness.", "wanting easier cardiology job", ["easier cardiology job", "less call cardiology", "cardiology lifestyle shame"]),
    sections: [
      S("Name the taboo", "Wanting fewer nights is treated like moral failure in some cultures. It is not.", "Recoverability is professionalism."),
      S("Easier is imprecise", "You likely want clearer boundaries, better partners, or less STEMI intensity—not laziness.", "Specify the redesign."),
      S("Options", "Non-invasive focus, part-time, setting change, selective locums, semi-retirement glidepaths.", "Clinical-first paths exist."),
      S("Talking about it", "Trusted peers > performative toughness online.", "If you need a confidential career conversation, ask."),
    ],
    faqs: [faq("Will colleagues judge me?", "Some will. Your nervous system still matters."), faq("Is this burnout?", "Possibly—assess both job design and personal distress.")],
  },
  {
    slug: "keep-locums-option-while-employed",
    pageDef: def("career", "Keep a Locums Option While Employed", "Why Smart Cardiologists Keep a Locums Option Even When Employed", "Locums as BATNA and leverage—not failure—while employed.", "employed cardiologist locums option", ["employed cardiologist locums", "locums while employed", "physician BATNA locums"]),
    sections: [
      S("Options are psychological safety", "Knowing you can redesign reduces trapped feelings—even if you stay.", "Literacy before crisis."),
      S("Contract first", "Moonlighting/locums may be restricted. Read before you build.", "Do not violate covenants."),
      S("Practical readiness", "Keep documents current; maintain a license plan; know market scope.", "Quiet preparation is enough."),
      S("Leverage without threats", "BATNA informs negotiation tone—it is not a weaponized speech.", "Professionalism wins."),
    ],
    faqs: [faq("Is this disloyal?", "Having options is adult career management."), faq("Do I need an agency now?", "Not always—education first.")],
  },
  {
    slug: "best-places-practice-cardiology-lifestyle",
    pageDef: def("career", "Best Places to Practice Cardiology for Lifestyle", "Best Places to Practice Cardiology for Lifestyle (Not Just Pay)", "Lifestyle geography for cardiologists—outdoors, schools, call markets, spouse careers.", "best places to practice cardiology", ["best places to practice cardiology", "best cities cardiologists lifestyle", "cardiology lifestyle locations"]),
    sections: [
      S("Pay lists miss the point", "Highest pay can hide worst nights. Lifestyle geography needs household math.", "Score COL, schools, airports, call culture."),
      S("Outdoor magnets vs reality", "Mountain and coastal magnets attract competition and variable call.", "Visit during work intensity, not vacation only."),
      S("Underrated regions", "Midwest and secondary markets can win on recoverability and cost.", "Do not outsource judgment to Twitter."),
      S("Locums as geography testing", "Try regions via blocks before permanent commitment when contracts allow.", "Licensing lead times apply."),
    ],
    faqs: [faq("Is there a #1 place?", "No. Households differ."), faq("Should pay lead the search?", "Lead with constraints; let pay be a filter.")],
  },
  {
    slug: "locums-to-pay-off-medical-debt",
    pageDef: def("career", "Locums to Pay Off Medical Debt", "Using Locums to Pay Off Medical School Debt Faster", "Debt-sprint math with burnout guardrails for cardiologists.", "locums pay off medical school debt", ["locums pay off medical school debt", "physician debt locums", "cardiologist loan payoff"]),
    sections: [
      S("Debt sprint is a project", "Higher income with an end date and sleep guardrails can work.", "Permanent martyrdom is not a payoff plan."),
      S("Model honestly", "Taxes, gaps between blocks, travel costs, and benefits forgone.", "CPA + spreadsheet."),
      S("Intensity caps", "Set a maximum night load you will not exceed for money.", "Write it down."),
      S("After the sprint", "Plan the redesign before you arrive—otherwise intensity becomes identity.", "Portfolio careers help."),
    ],
    faqs: [faq("Is this only for new grads?", "No—mid-career resets happen too."), faq("Should I delay permanent jobs?", "Sometimes briefly—with licensing reality in mind.")],
  },
  {
    slug: "moonlighting-vs-locums-cardiology",
    pageDef: def("comparison", "Moonlighting vs Locums Cardiology", "Moonlighting vs Locums for Cardiologists: Same Money, Different Rules", "Privileging, malpractice, and employer policy differences.", "cardiology moonlighting vs locums", ["moonlighting vs locums", "cardiology moonlighting", "locum vs moonlight physician"]),
    sections: [
      S("Not the same product", "Moonlighting often sits inside employment/training rules. Locums is usually separate contracting with distinct privileging.", "Conflating them creates compliance risk."),
      S("Malpractice and policies", "Coverage sources differ. Employer permission differs.", "Get written clarity."),
      S("When each fits", "Moonlighting may be simpler short-term. Locums may scale better for travel/multi-site.", "Goals decide."),
      S("Fellows note", "Follow program rules strictly. Independent locum attending work generally requires completion of training.", "Do not improvise."),
    ],
    faqs: [faq("Can I do both?", "Sometimes—contracts permitting."), faq("Which pays more?", "Depends on market and intensity—compare total friction.")],
  },
  {
    slug: "locum-cardiologist-tax-guide",
    sections: [
      S("1099 reality check", "Many locum cardiologists face quarterly estimates and self-employment considerations.", "Get a CPA early—not after April panic."),
      S("W-2 locum roles", "Withholding can simplify cash flow while changing deduction patterns.", "Compare net, not headlines."),
      S("Entities", "LLC/S corp questions arise with scale. Fact-specific—avoid forum templates.", "Not tax advice."),
      S("Records", "Track travel, licensing, CME, and malpractice costs carefully.", "Good books are clinical professionalism for 1099 work."),
    ],
    faqs: [faq("Do I need an S corp immediately?", "Often no—ask a CPA about thresholds."), faq("Are stipends taxable?", "It depends—professional advice required.")],
  },
  {
    slug: "cardiologist-llc-guide",
    sections: [
      S("When entity questions appear", "Irregular 1099 income and rising volume trigger LLC/S corp conversations.", "Timing is fact-specific."),
      S("What an LLC does and does not do", "It is not magic liability armor or automatic tax savings.", "Professionals only."),
      S("S corp discussions", "Reasonable compensation and compliance matter. DIY from social media is risky.", "Educational framing only."),
      S("Next step", "CPA + attorney when income complexity rises.", "Locum Career Hub does not provide tax services."),
    ],
    faqs: [faq("Should every locum cardiologist form an LLC?", "No."), faq("Can I wait?", "Often yes until numbers justify complexity.")],
  },
  {
    slug: "employed-cardiologist-salary-drivers",
    pageDef: def("career", "Employed Cardiologist Salary Drivers", "Cardiologist Salary Drivers Beyond the Base Number", "What actually moves employed cardiology compensation—call, RVUs, geography, and exit costs.", "cardiologist salary drivers", ["cardiologist salary drivers", "employed cardiologist compensation", "cardiology pay factors"]),
    sections: [
      S("Base is incomplete", "Call pay, RVUs, benefits, and exit costs complete the picture.", "Forum averages hide scope."),
      S("Geography", "COL and market demand interact. High nominal pay can lose on net lifestyle.", "Household math."),
      S("Subspecialty", "IC/EP/HF/imaging differ. Compare like with like.", "See subspecialty guides."),
      S("Locums contrast", "Weekly gross vs employed total comp needs careful modeling.", "Use calculators as directional aids."),
    ],
    faqs: [faq("Where do I find reliable numbers?", "Multiple sources + written offers beat one chart."), faq("Should I share offers with peers?", "Carefully—and verify scope differences.")],
  },
];

export const P2B_RESOURCES: EditorialResourceDraft[] = [
  {
    slug: "hate-schedule-not-medicine",
    title: "I Don't Hate Medicine. I Hate My Schedule.",
    metaDescription: "Separate vocation from job design—permission for cardiologists who still love medicine but need a different week.",
    h1: "I Don't Hate Medicine. I Hate My Schedule.",
    directAnswer: "Many cardiologists still love clinical work and hate their schedule design. Separating vocation from job structure is the first step toward a sustainable career—including part-time, setting changes, or locums.",
    keywords: ["hate schedule not medicine", "physician schedule burnout", "cardiologist loves medicine hates schedule"],
    relatedArticleSlugs: ["cardiologist-burnout-alternatives", "locum-vs-permanent-cardiology-jobs", "wanting-easier-cardiology-job"],
    relatedSpecialtyPathSlugs: ["general"],
    lastUpdated: U,
    sections: [
      S("Identity rescue", "You can keep the vocation and redesign the job.", "Quitting medicine is not the only door."),
      S("Schedule as clinical infrastructure", "Sleep and recoverability are quality infrastructure.", "Martyrdom is not a quality metric."),
      S("Options map", "Renegotiate, reduce FTE, change setting, selective locums, glidepath retirement.", "Pick experiments with end dates."),
      S("Soft next step", "If you want a confidential conversation about flexible cardiology paths, inquire.", "If you only needed permission, you have it."),
    ],
    faqs: [faq("Is this just burnout?", "Schedule redesign helps many; still seek support if distressed."), faq("Will colleagues understand?", "Some will. Your patients still need a sustainable you.")],
  },
  {
    slug: "career-design-not-side-hustle",
    title: "Stop Calling It a Side Hustle. It's Career Design.",
    metaDescription: "Reframe physician extra work as intentional portfolio design—not hustle culture.",
    h1: "Stop Calling It a Side Hustle. It's Career Design.",
    directAnswer: "Extra clinical or flexible work should be intentional career design with boundaries—not hustle-culture 'side hustle' energy that burns clinicians out.",
    keywords: ["physician career design", "physician side hustle", "portfolio physician career"],
    relatedArticleSlugs: ["hate-schedule-not-medicine", "fellowship-never-taught-money"],
    relatedSpecialtyPathSlugs: ["general"],
    lastUpdated: U,
    sections: [
      S("Language shapes behavior", "Side hustle implies extraction. Career design implies boundaries.", "Choose language carefully."),
      S("Portfolio examples", "Employed + rare locums; teaching + clinic; imaging reads + consults.", "Write constraints first."),
      S("Guardrails", "Contracts, malpractice, sleep caps.", "Money without judgment is a bad trade."),
    ],
    faqs: [faq("Is all extra work bad?", "No—unbounded extra work is."), faq("Where does locums fit?", "As one designed chapter when scope and timelines fit.")],
  },
];
