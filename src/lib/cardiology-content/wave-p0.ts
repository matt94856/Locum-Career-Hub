import type { EditorialGuideBody, EditorialResourceDraft } from "./types";

const U = "2026-07-28";

function S(h2: string, ...paragraphs: string[]) {
  return { h2, paragraphs };
}

function faq(q: string, a: string) {
  return { q, a };
}

/** P0 remainder (#3–10) */
export const P0_GUIDES: EditorialGuideBody[] = [
  {
    slug: "evaluate-first-cardiology-job-offer",
    pageDef: {
      category: "career",
      h1: "How to Evaluate Your First Cardiology Job Offer",
      title: "How to Evaluate Your First Cardiology Job Offer (Without Getting Trapped)",
      description:
        "A fellow-friendly scorecard for cardiology offers—schedule, volume, partners, exit terms, and money. Not base-salary theater.",
      topic: "cardiology job offer evaluation",
      keywords: [
        "cardiology job offer evaluation",
        "first cardiology job contract",
        "cardiology fellow job offer",
      ],
    },
    sections: [
      S(
        "Base salary is loud. The rest of your life is quiet.",
        "Your first attending offer will spotlight compensation. That number matters—and it is often the least predictive of whether you still like medicine in year three. Schedule reality, partner culture, volume proof, and exit terms decide the chapter.",
        "Use a scorecard with five dimensions: schedule, volume, partners, exit terms, money. If any one is catastrophic, a high salary does not rescue it.",
      ),
      S(
        "Dimension 1 — Schedule and recoverability",
        "Ask for call frequency, STEMI or consult activation patterns, post-call clinic rules, and weekend census ranges. 'Light call' is not a term. Counts are.",
        "Recoverability means whether the system protects sleep and judgment after hard nights—or expects heroism plus a full clinic the next morning.",
      ),
      S(
        "Dimension 2 — Volume you can verify",
        "Request historical patterns for clinic panels, consult census, and procedural volumes relevant to your scope. Upside stories without data are marketing.",
        "If the group will not share ranges, you are negotiating with hope. Hope is not a contract strategy.",
      ),
      S(
        "Dimension 3 — Partners and culture",
        "Prestige letterhead does not take call. Partners do—or they do not. Ask juniors what happened to the last person who left. Watch how partners speak about each other.",
        "Culture shows up in who gets protected after brutal nights and whether productivity theater replaces patient care.",
      ),
      S(
        "Dimension 4 — Exit terms: non-compete and tail",
        "Non-compete radius, duration, and scope can trap you geographically. Tail coverage on claims-made policies can become a six-figure exit tax.",
        "Hire a physician-specific contract attorney when an offer is real. Generic counsel misses cardiology traps routinely.",
      ),
      S(
        "Dimension 5 — Money without self-deception",
        "Model RVU thresholds, conversion factors, call pay, and how often targets move. Compare total compensation—not headline base alone.",
        "If you are exploring locums as BATNA, know your alternative weekly economics before you accept a trapped employed offer. Locum Career Hub can discuss flexible paths without pressuring you to leave a good job.",
      ),
      S(
        "When a 'great offer' is a trap",
        "Red flags: vague call, verbal promises not in writing, moving RVU goalposts, hostility to basic questions, and threats to yank the offer for professional negotiation.",
        "A healthy employer can handle thoughtful pushback on schedule and exit terms. If they cannot, believe that data.",
      ),
    ],
    faqs: [
      faq(
        "How hard can I negotiate without losing the offer?",
        "Push firmly on a short priority list—professionally. Scattered demands and combative tone lose offers. Reasonable asks on non-compete, tail, and schedule clarity usually get a hearing.",
      ),
      faq(
        "Do I need a physician-specific attorney?",
        "Yes when non-compete, tail, or complex productivity language is involved. The fee is cheap compared with a bad five-year cage.",
      ),
      faq(
        "What if verbal promises are not in the contract?",
        "They are not terms. Ask to add them in writing. If the employer refuses, assume the verbal version will not survive leadership changes.",
      ),
      faq(
        "Should locums be part of my first-job decision?",
        "As information and leverage, yes. As a panic escape from incomplete credentialing, no. Treat locums as a structured option with licensing lead time.",
      ),
    ],
  },
  {
    slug: "interventional-cardiology-locums",
    pageDef: {
      category: "subspecialty",
      h1: "Interventional Cardiology Locums Guide",
      title: "Interventional Cardiology Locums: Call, STEMI, Case Mix, and Pay Drivers",
      description:
        "What IC locums actually require—STEMI pathways, backup, privileging, case mix, and pay drivers. Written for interventional cardiologists.",
      topic: "interventional cardiology locums",
      keywords: [
        "interventional cardiology locums",
        "STEMI locum cardiologist",
        "interventional locum jobs",
      ],
    },
    sections: [
      S(
        "IC locums success is pathway clarity—not the weekly rate flyer",
        "Interventional locum blocks fail when STEMI activation, backup, and complication pathways are fuzzy. A premium rate with chaotic nights is not a win.",
        "Demand written answers before you fly: activation windows, primary vs backup role, surgical backup, transport patterns, and who takes the next case when you are post-call.",
      ),
      S(
        "Case mix and volume honesty",
        "Ask what the lab actually does: diagnostic vs PCI mix, complex PCI expectations, mechanical support availability, and whether structural work is in scope for this privilege set.",
        "Do not assume TAVR or advanced structural privileges follow PCI privileges. Credentialing will ask for logs aligned to requested procedures.",
      ),
      S(
        "Privileging documentation that prevents day-one chaos",
        "Keep case logs, references, and board documentation current. Procedural privileging is where start dates slip.",
        "Temporary privileges are not universal. Plan income on documented approval, not optimism.",
      ),
      S(
        "Call intensity and recoverability",
        "STEMI call is clinical work and lifestyle design. Clarify nights, weekends, callback expectations, and whether clinic continues after brutal activations.",
        "Radiation and fatigue are real. Wrong-fit intensity is how IC locums burns people out faster than employment.",
      ),
      S(
        "Pay drivers for IC blocks",
        "Rates move with STEMI responsibility, acuity, geography, travel, and scarcity—not adjectives like competitive. Compare call premiums and stipends on the same spreadsheet.",
        "Use the interventional pay guide and calculator as directional tools. Hospitals set offers; Locum Career Hub does not guarantee rates.",
      ),
      S(
        "Red flags before you accept travel",
        "Vague activation rules, no named backup, pressure to start before privileges clear, and refusal to put census or call counts in writing.",
        "A good cardiology recruiter helps you filter these. A bad one sells the rate and skips the lab reality.",
      ),
    ],
    faqs: [
      faq(
        "Can I do IC locums without recent volume?",
        "Hospitals often require recent case logs matching privileges. Low recent volume can block or narrow scope—ask early.",
      ),
      faq(
        "How does structural overlap work on IC locums?",
        "Structural privileges are usually separate. Confirm what is in and out of scope for that assignment.",
      ),
      faq(
        "What about radiation and call fatigue?",
        "Treat them as design constraints. Ask about lab volume, night load, and recovery rules—not only compensation.",
      ),
      faq(
        "Is travel IC locums realistic for families?",
        "Yes for some, with clear block lengths and recovery between travel weeks. Logistics decide sustainability as much as rate.",
      ),
    ],
  },
  {
    slug: "physician-autonomy-vs-salary",
    pageDef: {
      category: "career",
      h1: "Why Autonomy Matters More Than Salary After Year Three",
      title: "Why Autonomy Matters More Than Salary After Year Three",
      description:
        "For mid-career cardiologists, schedule control often compounds happiness more than another raise. A honest look at autonomy vs compensation.",
      topic: "physician autonomy vs salary",
      keywords: [
        "physician autonomy vs salary",
        "cardiologist burnout autonomy",
        "schedule control cardiology",
      ],
    },
    sections: [
      S(
        "The year-three inflection nobody schedules",
        "Early attending years are survival and skill consolidation. By year three, many cardiologists notice the raise stopped fixing the misery. Compensation curves flatten. Autonomy compounds.",
        "This is not anti-money. It is anti-self-deception. Another five percent does not restore weekends you do not own.",
      ),
      S(
        "What autonomy actually means in cardiology",
        "Autonomy is control over time, case mix boundaries, and the ability to say no without career punishment. It is not infinite freedom—it is recoverable agency.",
        "In practice: post-call protection, clinic volumes that respect physics, and partners who share nights instead of dumping them.",
      ),
      S(
        "When raises stop fixing misery",
        "If every raise comes with more call creep, you are being paid to erode. Track effective hourly life cost—not only W-2 totals.",
        "High pay with low control is a common trap in employed cardiology. Medium pay with high control is underrated.",
      ),
      S(
        "How to audit your current autonomy",
        "List the last eight weekends. Count nights that stole the next day. Note meetings that displace clinical judgment. Ask whether you can decline work without politics.",
        "If the audit scares you, that is useful data—not disloyalty.",
      ),
      S(
        "Levers: partnership, part-time, setting change, locums",
        "Autonomy can improve inside employment—or require a redesign: part-time, different setting, hybrid locums, or a full transition.",
        "Locums is one lever for control of blocks and geography. It is not automatically better. It is a tool. Locum Career Hub helps cardiologists compare options without pretending every problem is a staffing problem.",
      ),
    ],
    faqs: [
      faq(
        "Is wanting autonomy unprofessional?",
        "No. Sustainable clinicians stay in the field. Martyrdom is not a quality metric.",
      ),
      faq(
        "Can I increase autonomy without quitting?",
        "Sometimes—renegotiate call, reduce FTE, change partners, or add protected time. If the system punishes those asks, believe the system.",
      ),
      faq(
        "Does locums always mean more autonomy?",
        "It can—when contracts define boundaries. Poorly chosen blocks can recreate the same trap with airports.",
      ),
    ],
  },
  {
    slug: "ep-cardiology-locums",
    pageDef: {
      category: "subspecialty",
      h1: "EP Cardiology Locums Guide",
      title: "EP Locums Guide: Ablation, Devices, and What Hospitals Actually Need",
      description:
        "Electrophysiology locums realities—ablation vs devices, lab readiness, privileging, and wrong-fit risks for EP cardiologists.",
      topic: "electrophysiology locums",
      keywords: [
        "electrophysiology locums",
        "EP locum jobs",
        "ablation locum cardiologist",
      ],
    },
    sections: [
      S(
        "EP locums is scarce and skill-specific",
        "Hospitals need EP coverage that matches their lab—not a generic cardiology body. Ablation-capable, device-focused, or both are different products.",
        "Wrong-fit EP blocks waste everyone's time and create safety risk. Match your recent skills to site need explicitly.",
      ),
      S(
        "Ablation vs devices vs both",
        "Clarify case types, anesthesia support, mapping systems, and device clinic load. Remote monitoring between blocks should not be an unpaid surprise.",
        "Device-only EP can be valuable where that is the gap. Do not pretend ablation readiness you cannot document.",
      ),
      S(
        "Lab staffing and dependencies",
        "EP days fail when anesthesia, techs, or industry support are unreliable. Ask how the lab actually runs on busy days.",
        "Arrhythmia call expectations belong in writing—frequency, backup, and whether general cardiology covers anything overnight.",
      ),
      S(
        "Privileging and volume documentation",
        "Keep ablation and device logs current. Privileging delays are common in EP because hospitals are precise about procedural scope.",
        "Pair licensing strategy with privileging calendars if you travel. IMLC helps licenses; it does not grant lab privileges.",
      ),
      S(
        "Pay scarcity dynamics",
        "EP scarcity can support stronger rates—when the fit is real. Still compare call, lab readiness, and travel honestly.",
        "See the EP pay guide for directional context. No public page replaces a written offer for a specific site.",
      ),
    ],
    faqs: [
      faq(
        "Can device-only EP physicians do locums?",
        "Yes where the site needs device clinic and implant coverage without ablation. Confirm scope in privileging.",
      ),
      faq(
        "How recent must ablation volume be?",
        "Hospital-dependent. Ask for requirements before you invest travel and credentialing time.",
      ),
      faq(
        "Is EP locums good for lifestyle?",
        "It can be—with clean boundaries. Lab days plus arrhythmia call can also be intense. Design for recoverability.",
      ),
    ],
  },
  {
    slug: "interstate-medical-licensure-compact-guide",
    sections: [
      S(
        "IMLC in plain language for cardiologists",
        "The Interstate Medical Licensure Compact can accelerate eligible physicians into participating states. It is a licensing pathway—not a privileging shortcut and not a guarantee of locum starts.",
        "Use IMLC when multi-state travel is part of your model. Do not use it as magical thinking for California-style friction boards outside the compact reality.",
      ),
      S(
        "Compact vs non-compact implications for travel blocks",
        "Build a map: states you want, compact status, and historical board timelines. Sequence applications so privileging is not waiting on a license you started too late.",
        "Travel cardiology without a license plan becomes expensive waiting. Treat licenses like inventory.",
      ),
      S(
        "Sequencing licenses for the first year",
        "Start with states that match realistic blocks and life constraints. Add opportunistic states only after the core footprint works.",
        "Parallel hospital applications only when licenses are far enough along to justify the paperwork burden.",
      ),
      S(
        "How licensing interacts with privileging timelines",
        "A license without privileges does not generate income. Privileges without a license do not exist. Plan both backward from day one.",
        "Use the credentialing timeline tool as a planning aid, then get site-specific ranges from recruiters who tell the truth.",
      ),
      S(
        "Common cardiologist mistakes",
        "Starting IMLC the week a dream block appears. Assuming temporary privileges will cover gaps. Ignoring DEA and payer enrollment where required.",
        "Another mistake: collecting licenses you will never use while neglecting the two states that actually match your life.",
      ),
      S(
        "When IMLC is not enough",
        "Non-compact targets, complex histories, and name/education verification issues still take time. Build buffers.",
        "Locum Career Hub helps cardiologists plan multi-state footprints for real assignments—not vanity license collections.",
      ),
    ],
    faqs: [
      faq(
        "Does IMLC speed hospital privileging?",
        "Not directly. It can remove a licensing bottleneck so privileging can proceed. Hospitals still run their process.",
      ),
      faq(
        "Which license should I get first?",
        "The state most likely to yield a realistic first block given your scope and life constraints—not the loudest job ad.",
      ),
      faq(
        "What about high-friction states?",
        "Budget extra months and start earlier. Do not promise yourself travel income there on a compact-state timeline.",
      ),
      faq(
        "Is this legal advice?",
        "No. Confirm eligibility and process with state boards and qualified professionals. This guide is educational.",
      ),
    ],
  },
];

export const P0_RESOURCES: EditorialResourceDraft[] = [
  {
    slug: "locum-vs-permanent-cardiology-jobs",
    title: "Locums vs Employed Cardiology: A 24-Month Decision Framework",
    metaDescription:
      "A practical framework for fellows and attendings comparing locum tenens and employed cardiology—without slogans.",
    h1: "Locums vs Permanent Cardiology Jobs",
    directAnswer:
      "Locums vs employed cardiology is not 'freedom vs stability.' Use a 24-month goals framework: control, income, geography, burnout stage, and risk tolerance—then allow hybrid designs.",
    keywords: [
      "locums vs employed cardiology",
      "locum vs permanent cardiology",
      "cardiology career decision framework",
    ],
    relatedArticleSlugs: [
      "things-nobody-tells-you-cardiology-fellowship",
      "fellowship-to-locums-transition",
      "leaving-hospital-employment-for-locums",
    ],
    relatedSpecialtyPathSlugs: ["general", "interventional", "electrophysiology"],
    lastUpdated: U,
    sections: [
      S(
        "Myths that distort the decision",
        "Myth: locums is only for burned-out or unemployable doctors. Myth: employed means safe. Myth: you must pick forever in July of fellowship.",
        "Both paths can be excellent or miserable. Contracts and call culture decide more than labels.",
      ),
      S(
        "Pick a primary: stability, control, or income sprint",
        "You can optimize for more than one over time—but not all three at maximum in month one. Name your primary for the next 24 months.",
        "Debt sprint looks different from burnout recovery. Geography for a dual-physician couple looks different from solo travel readiness.",
      ),
      S(
        "Hybrid models that work in cardiology",
        "Examples: employed anchor plus occasional locums; 12 months locums then intentional permanent; part-time employed plus defined blocks.",
        "Hybrids fail when employment contracts forbid them or when you stack unsustainable nights on both sides.",
      ),
      S(
        "Risk register",
        "Employed risks: non-compete, tail, call creep, RVU theater. Locums risks: income gaps, credentialing delays, benefits gaps, stigma in some rooms.",
        "Write the risks down. Ignoring them is how people feel blindsided later.",
      ),
      S(
        "A 24-month decision tree",
        "Quarterly checkpoints beat binary identity. Re-evaluate after real data from sites or partners—not after one bad week or one shiny offer.",
        "If you want help comparing flexible cardiology paths, inquire with clear constraints. Locum Career Hub recruits cardiologists only and will say when nothing fits.",
      ),
    ],
    faqs: [
      faq(
        "Can I do locums for a year then take employed?",
        "Yes, commonly. Explain the chapter as intentional market sampling and keep clinical continuity clear.",
      ),
      faq(
        "Will locums look bad on a CV?",
        "It depends on the room. Outcomes improve when you tell a coherent story and maintain strong clinical references.",
      ),
      faq(
        "What if my spouse needs geographic stability?",
        "Design around that constraint first. Locums can still work locally or in short blocks—travel is optional, not definitional.",
      ),
    ],
  },
  {
    slug: "credentialing-for-locum-cardiologists",
    title: "Cardiology Locum Credentialing & Privileging: Realistic Timelines",
    metaDescription:
      "Realistic cardiology locum credentialing and privileging timelines—document checklists, IC/EP delays, and what you control.",
    h1: "Credentialing for Locum Cardiologists",
    directAnswer:
      "Credentialing verifies who you are; privileging defines what you may do. Marketing timelines lie. Plan licensing and hospital approvals in months, with longer buffers for procedural IC and EP scopes.",
    keywords: [
      "cardiology locum credentialing",
      "hospital privileging timeline",
      "locum cardiologist credentialing checklist",
    ],
    relatedArticleSlugs: [
      "state-licensing-guide-locum-cardiologists",
      "how-to-become-a-locum-cardiologist",
      "malpractice-coverage-locum-cardiologists",
    ],
    relatedSpecialtyPathSlugs: ["interventional", "electrophysiology", "general"],
    lastUpdated: U,
    sections: [
      S(
        "Stop conflating credentialing and privileging",
        "Credentialing is identity and qualifications verification. Privileging is permission to perform specific clinical work at that facility.",
        "You need both. Temporary privileges exist at some sites and are not a national entitlement.",
      ),
      S(
        "Realistic timeline ranges",
        "Non-procedural local blocks can move faster when licenses are ready. Multi-state interventional or EP starts often take longer because logs, references, and committee schedules matter.",
        "Anyone promising universal two-week starts is selling. Ask for site-specific ranges in writing.",
      ),
      S(
        "IC and EP delay drivers",
        "Case log specificity, reference responsiveness, and committee calendars drive delays. Incomplete packets restart clocks.",
        "Build a living credentialing folder and update it quarterly—even when you are not actively looking.",
      ),
      S(
        "Document checklist you control",
        "CV, licenses, board certificates, malpractice history, DEA where needed, procedure logs, CME summaries, and references who actually respond.",
        "The parts you control are hygiene and speed of your responses. The parts you do not control are board and hospital calendars.",
      ),
      S(
        "Parallel-path without drowning",
        "Run licenses and top hospital applications in parallel only when bandwidth and probability justify it. Five simultaneous long-shot packets create chaos.",
        "Use timeline tools as planning aids. Pair them with a recruiter who admits when a start date is fantasy.",
      ),
    ],
    faqs: [
      faq(
        "Why did my start date slip?",
        "Common causes: incomplete documents, slow references, committee timing, license holds, and privilege requests that do not match logs.",
      ),
      faq(
        "Can I work while privileging is pending?",
        "Only if the facility grants temporary privileges and your contract allows it. Never assume.",
      ),
      faq(
        "How many hospitals should I privilege at once?",
        "Enough to create options—not so many that quality collapses. Two to four active serious targets is a common working range.",
      ),
    ],
  },
  {
    slug: "leaving-hospital-employment-for-locums",
    title: "Leaving Employed Cardiology for Locums: Exit Without Burning Bridges",
    metaDescription:
      "How cardiologists leave hospital employment for locums—non-compete, tail, notice, reputation, and first blocks.",
    h1: "Leaving Hospital Employment for Locums",
    directAnswer:
      "Leaving employed cardiology for locums is an exit design problem: non-compete, tail, notice, reputation, and a first-block plan. People leave for call creep and lost recoverability more often than for 'a little more money.'",
    keywords: [
      "leaving employed cardiology",
      "hospital employment to locums",
      "why cardiologists leave hospital jobs",
    ],
    relatedArticleSlugs: [
      "locum-vs-permanent-cardiology-jobs",
      "cardiologist-burnout-alternatives",
      "credentialing-for-locum-cardiologists",
    ],
    relatedSpecialtyPathSlugs: ["general", "interventional"],
    lastUpdated: U,
    sections: [
      S(
        "Why cardiologists actually leave",
        "Call creep that never made the brochure. RVU theater. Partner dynamics. Administrative load. Family life as the silent resigning party.",
        "Naming the real reason helps you choose the right next design—not just a different logo with the same trap.",
      ),
      S(
        "Exit mechanics: notice, non-compete, tail",
        "Read your contract before you announce anything. Non-compete and tail terms shape geography and cash needs after exit.",
        "Get physician-specific legal counsel for high-stakes covenants. This article is not legal advice.",
      ),
      S(
        "Reputation: leave like a professional",
        "Finish responsibly. Avoid public venting that follows you. Secure references before relationships cool.",
        "The cardiology world is smaller than it feels when you are angry on a Sunday night.",
      ),
      S(
        "First locums chapter design",
        "Do not stack your hardest possible STEMI block as emotional revenge against your old job. Start with fit and boundaries.",
        "Licensing and privileging lead times mean you plan the bridge before you burn the dock.",
      ),
      S(
        "Confidential exploration is allowed",
        "Exploring options while employed is career hygiene when done ethically and contractually. Panic quitting is not a strategy.",
        "Locum Career Hub can discuss cardiology-only flexible paths confidentially. If nothing fits your constraints, we say so.",
      ),
    ],
    faqs: [
      faq(
        "Is it disloyal to explore locums while employed?",
        "Loyalty does not require ignoring an unsustainable trajectory. Review contract and malpractice rules before you commit to side work.",
      ),
      faq(
        "How do I know it's the job vs burnout generally?",
        "If recoverability improves with time off and worsens only in that system's call pattern, the job is implicated. Still consider clinical support for distress.",
      ),
      faq(
        "Should I have a block lined up before resigning?",
        "Ideally yes—or a financial runway that matches licensing/privileging reality. Hope is not a runway.",
      ),
    ],
  },
];
