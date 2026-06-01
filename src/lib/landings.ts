export type LandingFaq = { q: string; a: string };

export type LandingSection = {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
};

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
  /** One-sentence direct answer (featured snippets + AI extraction). */
  answer?: string;
  /** “Who this is for” — explicit audience for humans and retrieval systems. */
  whoFor?: string[];
  /** Chunked body sections after the hero (pain → context → options). */
  sections?: LandingSection[];
  /** Page-level FAQs emitted as FAQPage JSON-LD when present. */
  faqs?: LandingFaq[];
  /** Extra internal links (e.g. nested `/locum-tenens-jobs/{state}` hubs). */
  relatedLinks?: { href: string; title: string }[];
};

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "national-locum-tenens-jobs-guide",
    title: "Cardiologist Locum Tenens Jobs | Locum Career Hub",
    description:
      "Cardiologist locum tenens jobs with transparent pay drivers, credentialing context, and schedules built around your life. Cardiologist-only recruiter—no job-board blast.",
    h1: "Cardiologist Locum Jobs When You Want a Different Shape of Work",
    h2: "Cath lab, consult, and clinic blocks—with expectations written before day one",
    keywords: [
      "cardiologist locum tenens",
      "cardiology locum jobs",
      "cardiologist recruiter",
      "interventional cardiologist locum",
    ],
    intro:
      "If cath lab call, consult census, or clinic load feels relentlessly heavy, you are allowed to want something steadier. Cardiology locums can offer defined blocks and compensation discussed openly. Locum Career Hub recruits cardiologists only—we connect MD/DO cardiologists with hospitals and groups; we are not your employer.",
    bullets: [
      "Curated openings across inpatient, outpatient, and hybrid models",
      "Credentialing navigation with realistic start timelines",
      "Advocacy on rates, travel, lodging, and malpractice coverage",
    ],
    relatedSlugs: [
      "flexible-physician-careers",
      "physician-travel-jobs",
      "physician-burnout-solutions",
      "part-time-physician-jobs",
    ],
    relatedLinks: [
      { href: "/locum-tenens-jobs/florida", title: "Locum tenens jobs in Florida" },
      { href: "/locum-tenens-jobs/texas", title: "Locum tenens jobs in Texas" },
      { href: "/locum-tenens-jobs/california", title: "Locum tenens jobs in California" },
      { href: "/locum-tenens-jobs/new-york", title: "Locum tenens jobs in New York" },
    ],
    answer:
      "Locum Career Hub connects cardiologists to contract-based coverage—cath lab, consult, clinic, and imaging blocks—with transparent expectations when an employed schedule is not sustainable.",
    whoFor: [
      "Cardiologists searching locum tenens jobs with clearer call and cath lab boundaries",
      "Interventional, general, EP, and heart failure cardiologists comparing travel vs local blocks",
      "Cardiologists using locums as a bridge while deciding next career steps",
      "Anyone weighing travel cardiology locums vs local clinic or consult blocks",
    ],
    sections: [
      {
        h2: "When the pain is the schedule—not the patients",
        paragraphs: [
          "Many physicians arrive here after months of invisible workload creep: inbox obligations, committee load, and unpredictable nights. That pattern is exhausting even when you still care deeply about patients.",
          "Flexible contract assignments can reduce certain structural stressors—clearer start/stop dates, fewer standing meetings, and explicit volume conversations before you arrive. This is work-design change, not a demand that you enjoy being on the road.",
        ],
      },
      {
        h2: "Where locum tenens fits in a broader career strategy",
        paragraphs: [
          "Locums is a tool, not a moral failing. It can create runway when you need optionality, income clarity, or a calmer bridge while you decide what comes next. It does not fix toxic leadership by itself—and sustainable pacing still matters.",
          "If you are high-intent for cardiology locums, we map subspecialty-specific pathways (interventional, EP, heart failure, imaging) with realistic privileging timelines.",
        ],
        bullets: [
          "Compare travel physician jobs vs local block coverage",
          "Understand stipends, malpractice, and cancellation norms up front",
          "Speak with a physician recruiter in a calm, low-pressure format",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a locum tenens job in plain language?",
        a: "Contract-based clinical coverage that helps hospitals maintain staffing while offering physicians clearer time boundaries and often a different administrative footprint than many permanent roles.",
      },
      {
        q: "Is this only for physicians who already know they want locums?",
        a: "No. Many inquiries start as burnout, flexibility, or income questions. Locum tenens is one path we can compare alongside other flexible models.",
      },
      {
        q: "Do you support credentialing and licensing?",
        a: "Yes. Timelines vary by site and specialty, but we map realistic dates and paperwork owners so you are not guessing alone.",
      },
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
    relatedSlugs: ["national-locum-tenens-jobs-guide", "physician-side-income", "flexible-physician-careers"],
    relatedLinks: [
      { href: "/locum-tenens-jobs/florida", title: "Locum tenens jobs in Florida" },
      { href: "/locum-tenens-jobs/texas", title: "Locum tenens jobs in Texas" },
      { href: "/locum-tenens-jobs/california", title: "Locum tenens jobs in California" },
      { href: "/locum-tenens-jobs/new-york", title: "Locum tenens jobs in New York" },
    ],
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
      "Flexibility is not a perk—it is how careers survive. Whether you need space for family, research, recovery, or simply fewer nights awake thinking about inbox volume, the goal is the same: a week that fits a human being. Locum Career Hub helps you architect options—including contract blocks when they genuinely help—without treating you like a quota.",
    bullets: [
      "Week-on/week-off, weekends-only, or seasonal coverage",
      "Rate transparency so you can compare W-2 vs 1099 tradeoffs",
      "Advocacy for sustainable panel sizes and support staffing",
    ],
    relatedSlugs: ["part-time-physician-jobs", "moonlighting-physician-jobs", "national-locum-tenens-jobs-guide"],
    answer:
      "Flexible physician careers reorganize how, when, and where you work—often through contract blocks, moonlighting, or locums—so your schedule matches your life instead of the other way around.",
    whoFor: [
      "Physicians searching flexible physician jobs or part time doctor jobs",
      "Parents balancing caregiving with clinical work",
      "Clinicians who want autonomy without quitting medicine abruptly",
    ],
    sections: [
      {
        h2: "Flexibility is a systems problem—not a ‘work harder’ problem",
        paragraphs: [
          "If you are staring at another week where every boundary gets negotiated away, you are not imagining it. The mismatch between patient needs and institutional throughput is real—and it lands on clinicians as personal guilt.",
          "Flexible models do not erase hard work. They change which levers you control: dates, blocks, call expectations, and travel distance.",
        ],
      },
      {
        h2: "How flexibility often shows up in practice (locums + beyond)",
        paragraphs: [
          "Some physicians want travel opportunities for variety; others want local block schedules. Some want part-time income without a full job change yet.",
          "Locum tenens is one durable option inside this family of choices—especially when you want cleaner transitions between assignments or higher hourly intensity for fewer weeks per year.",
        ],
        bullets: [
          "Moonlighting physician jobs vs organized block contracts",
          "Local vs travel physician jobs: commute vs reimbursement tradeoffs",
          "How to evaluate ‘flexible’ offers that still hide inbox work",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I have to travel to be flexible?",
        a: "Not necessarily. Some clinicians choose local block contracts; others choose broader travel physician jobs. We help you match distance to your constraints.",
      },
      {
        q: "Is flexibility compatible with burnout recovery?",
        a: "Sometimes—with boundaries. Flexibility can remove certain stressors, but recovery still needs sleep, support, and realistic volume expectations.",
      },
    ],
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
    slug: "interventional-cardiologist-locum-jobs",
    title: "Interventional Cardiologist Locum Jobs | Cath Lab Nationwide",
    description:
      "Interventional cardiology locum jobs with STEMI, cath lab, and case-mix clarity. Cardiologist-only recruiter—documented call before you commit.",
    h1: "Interventional Cardiologist Locum Jobs",
    h2: "STEMI activation, cath lab scope, and backup documented upfront",
    keywords: ["interventional cardiologist locum", "cardiology locum jobs", "cath lab locums"],
    intro:
      "Interventional cardiology locums hinge on STEMI pathways, case mix, and complication backup—not headline rates. Locum Career Hub recruits cardiologists only and aligns introductions with sites that document activation windows and call.",
    bullets: [
      "STEMI and cath lab expectations in writing",
      "Case logs and privileging timelines discussed early",
      "Travel stipends and malpractice structure reviewed before you fly",
    ],
    relatedSlugs: ["national-locum-tenens-jobs-guide", "cardiologist-travel-locums", "part-time-physician-jobs"],
  },
  {
    slug: "cardiologist-travel-locums",
    title: "Travel Cardiologist Locum Jobs | Stipends & Blocks",
    description:
      "Travel cardiologist locum jobs with lodging, air, and cath lab call defined before you commit. MD/DO cardiologists only.",
    h1: "Travel Cardiologist Locum Jobs",
    h2: "Compare stipends, call, and credentialing with a cardiology recruiter",
    keywords: ["travel cardiologist locum", "cardiology locum tenens", "cardiologist travel jobs"],
    intro:
      "Travel cardiology locums can restore boundaries when employed call and clinic load feel unsustainable. We help cardiologists compare blocks with written STEMI rules, consult census, and malpractice—not generic travel promises.",
    bullets: [
      "Air, lodging, and rental car stipends clarified in contracts",
      "Multi-week blocks with orientation expectations documented",
      "Subspecialty-aware matching across general, interventional, and EP",
    ],
    relatedSlugs: ["physician-travel-jobs", "interventional-cardiologist-locum-jobs", "flexible-physician-careers"],
  },
  {
    slug: "physician-burnout-alternatives",
    title: "Physician Burnout Alternatives | Locum Tenens for Recovery",
    description:
      "Doctor burnout alternatives through locums: reduce admin load, reset boundaries, and practice medicine with more autonomy. Confidential recruiter conversations.",
    h1: "Physician Burnout Alternatives That Meet You Where You Are",
    h2: "Clinical options designed around recovery, boundaries, and sustainability",
    keywords: ["physician burnout alternatives", "doctor burnout alternatives", "physician work-life balance", "locum tenens opportunities"],
    intro:
      "Burnout is a systems problem—but your next step can still be personal and strategic. Many physicians need distance from committee load, inbox expectations, and moral injury triggers while they decide what comes next. Short-term contract coverage can create breathing room; we help you evaluate if and when that fits—without treating pain as a sales hook.",
    bullets: [
      "Volume and documentation expectations reviewed in advance",
      "Shorter commitments while you stabilize",
      "Advocacy for sustainable schedules and backup staffing",
    ],
    relatedSlugs: ["physician-burnout-solutions", "flexible-physician-careers", "part-time-physician-jobs"],
  },
  {
    slug: "part-time-physician-jobs",
    title: "Part-Time Physician Jobs | Locum & Hybrid Schedules",
    description:
      "Part-time physician jobs via locum tenens: stackable shifts, hybrid inpatient/outpatient models, and recruiter support for sustainable pacing.",
    h1: "Part-Time Physician Jobs Without Apologizing for Boundaries",
    h2: "Design a sustainable week—clinical days that feel worth it",
    keywords: ["part-time physician jobs", "part time doctor jobs", "flexible physician jobs", "physician opportunities"],
    intro:
      "Part-time does not have to mean underpaid or unsupported. Locum Career Hub engineers schedules that protect your energy while keeping skills sharp—ideal alongside family, teaching, or entrepreneurial work.",
    bullets: [
      "Stackable weekend bundles and short blocks",
      "Hybrid telehealth + onsite models when available",
      "Transparent weekly minimums and cancellation policies",
    ],
    relatedSlugs: ["moonlighting-physician-jobs", "flexible-physician-careers", "national-locum-tenens-jobs-guide"],
  },
  {
    slug: "physician-burnout-solutions",
    title: "Physician Burnout Solutions | Calm Next Steps | Locum Career Hub",
    description:
      "Physician burnout solutions grounded in boundaries, workload clarity, and flexible work patterns—including short-term coverage when you need breathing room.",
    h1: "Physician Burnout Solutions That Start With Listening",
    h2: "When the schedule is stealing your bandwidth, small structural changes can feel enormous",
    keywords: ["physician burnout alternatives", "how doctors avoid burnout", "flexible physician careers"],
    intro:
      "If you are running on fumes, you do not need a lecture—you need options. Many physicians hit a wall where committees, inbox work, and chronic understaffing crowd out the reason they chose medicine. Flexible contract coverage is one tool clinicians use to reset boundaries while they stabilize. We help you evaluate whether that tool fits your life—without pressure.",
    bullets: [
      "Clear expectations on census, backup, and documentation before you commit",
      "Short blocks when you need distance from a draining culture—not a lifetime sentence",
      "Recruiters who respect “no,” “not yet,” and “I am still thinking.”",
    ],
    relatedSlugs: ["physician-burnout-alternatives", "doctor-work-life-balance", "flexible-physician-careers"],
    answer:
      "Physician burnout solutions combine honest workload assessment, boundaries, and sometimes a structural change—like flexible contract coverage—so recovery is not constantly undone by the same schedule.",
    whoFor: [
      "Physicians searching physician burnout solutions or how to reduce physician burnout",
      "Clinicians who feel tired of being a doctor but are not sure what to do next",
      "Anyone exploring physician stress reduction careers without quitting overnight",
    ],
    sections: [
      {
        h2: "Burnout is not a character flaw",
        paragraphs: [
          "If you dread Sunday nights, feel numb after rounds, or notice irritability spilling into home life, those are signals—not moral judgments. Many physicians arrive here after trying to ‘push through’ with better habits alone.",
          "The first step is separating what is inside your control from what the system is asking you to absorb for free.",
        ],
      },
      {
        h2: "When a schedule change is part of the answer",
        paragraphs: [
          "Therapy, peer support, and clinical skills still matter. But if your week is structurally impossible, individual resilience will not fix it.",
          "Flexible contract assignments can create breathing room—clearer start/stop dates, fewer standing meetings, and explicit expectations—while you decide what long-term fit looks like. Locum tenens is one option inside that toolkit.",
        ],
        bullets: [
          "How to reduce physician burnout symptoms while you stabilize",
          "What to ask about census, backup, and documentation load before you commit",
          "How locums can be a bridge—not a permanent identity requirement",
        ],
      },
    ],
    faqs: [
      {
        q: "Is locum tenens a burnout cure?",
        a: "Not by itself. It can remove some chronic stressors when expectations are clear, but toxic patterns can follow you without boundaries. We focus on fit and sustainability—not hype.",
      },
      {
        q: "What if I am not ready to change jobs yet?",
        a: "That is normal. Many conversations start with mapping options, timelines, and what would need to be true for a change to feel safe.",
      },
    ],
  },
  {
    slug: "doctor-work-life-balance",
    title: "Doctor Work-Life Balance | Sustainable Schedules | Locum Career Hub",
    description:
      "Work-life balance for physicians is maintenance, not luxury. Explore boundaries, flexible schedules, and calm next steps.",
    h1: "Doctor Work-Life Balance as Design—Not Guilt",
    h2: "Protect your nights, your family time, and your clinical focus",
    keywords: ["doctor work life balance", "physician work-life balance", "physician schedule flexibility"],
    intro:
      "Balance rarely arrives from slogans. It comes from designing the week: how many consecutive clinical days you can sustain, how much recovery you need between nights, and what admin load is negotiable. For some physicians, employment can be adjusted. For others, flexible assignments create clean parentheses around clinical work—so home stops feeling like recovery from work alone.",
    bullets: [
      "Schedule conversations anchored in your non-negotiables",
      "Options from local weekend work to multi-week travel blocks",
      "Advocacy for handoffs, cap discussions, and malpractice clarity",
    ],
    relatedSlugs: ["physician-schedule-flexibility", "part-time-physician-jobs", "flexible-physician-careers"],
  },
  {
    slug: "physician-side-income",
    title: "Physician Side Income & Ethical Moonlighting | Locum Career Hub",
    description:
      "Physician side income with clarity: compliant shifts, transparent malpractice, and schedules that do not quietly erase recovery time.",
    h1: "Physician Side Income Without Selling Your Sleep",
    h2: "Stack shifts responsibly when loans, goals, or optionality are on the line",
    keywords: ["physician side income", "moonlighting physician jobs", "flexible physician jobs"],
    intro:
      "Side income is often less about greed and more about math: loans, family expenses, or buying runway to change roles. The failure mode is always the same—more shifts erode sleep, empathy, and safety. We help physicians scope extra work with written expectations, malpractice clarity, and volume that matches the reason you are taking the shift.",
    bullets: [
      "Weekend bundles and short blocks when you want rhythm without chaos",
      "Employer-policy awareness so you stay compliant",
      "Repeat health-system networks when you want predictability",
    ],
    relatedSlugs: ["moonlighting-physician-jobs", "locum-jobs-for-new-graduates", "part-time-physician-jobs"],
  },
  {
    slug: "physician-schedule-flexibility",
    title: "Physician Schedule Flexibility | Block Work & Options | Locum Career Hub",
    description:
      "Physician schedule flexibility through structured blocks, transparent call, and recruiter advocacy—so flexibility feels calm, not chaotic.",
    h1: "Physician Schedule Flexibility That Shows Up on the Calendar",
    h2: "Know your start, your end, and your off days before you sign",
    keywords: ["physician schedule flexibility", "flexible physician jobs", "physician career freedom"],
    intro:
      "Flexibility is not only remote charting days. For many clinicians, it means predictable off anchors, fewer standing meetings, and the ability to pause between intense blocks. Contract coverage can be one component of that design—especially when you want clean boundaries while you rebuild energy.",
    bullets: [
      "Week-on/week-off, seasonal, and short-block models when markets allow",
      "Written call, post-call, and census expectations",
      "Iteration after your first assignment—adjust, repeat, or politely exit",
    ],
    relatedSlugs: ["flexible-physician-careers", "part-time-physician-jobs", "national-locum-tenens-jobs-guide"],
  },
  {
    slug: "careers-after-residency",
    title: "Careers After Residency | Explore Before You Commit | Locum Career Hub",
    description:
      "Careers after residency: compare practice settings, protect wellbeing, and learn how flexible blocks can complement training and financial goals.",
    h1: "Careers After Residency: Curiosity Before Lock-In",
    h2: "Sample cultures and volumes while you decide what sustainable looks like",
    keywords: ["careers after residency", "locum tenens jobs", "physician opportunities"],
    intro:
      "The first job after residency does not have to be your forever answer. Many new attendings want real-world data: how a hospital runs, how documentation behaves on the floor, and what busy means in numbers—not rumors. Short-term assignments can be one way to learn quickly—alongside thoughtful W-2 exploration. We help you weigh tradeoffs without jargon or a hard sell.",
    bullets: [
      "Sites suited to early-career models when clinically appropriate",
      "Realistic licensing and credentialing roadmaps",
      "Side-by-side thinking when you are choosing between offers",
    ],
    relatedSlugs: ["locum-jobs-for-new-graduates", "moonlighting-physician-jobs", "physician-side-income"],
  },
  {
    slug: "leaving-hospital-medicine",
    title: "Leaving Hospital Medicine | Calm Next Steps | Locum Career Hub",
    description:
      "Leaving hospital medicine is a major decision. Explore boundaries, flexible contract work, and realistic transitions—including locum tenens when it fits.",
    h1: "Leaving Hospital Medicine Without Burning Bridges",
    h2: "If the system is the problem, your next step can still be strategic",
    keywords: ["leaving hospital medicine", "physician career change", "flexible physician careers", "physician burnout solutions"],
    intro:
      "Many physicians consider leaving hospital medicine after years of moral injury, chronic understaffing, and inbox creep that never shows up on a job description. You might still love patient care—and still need distance from the environment. Flexible contract coverage can be one bridge: defined dates, fewer standing committees, and explicit volume conversations before you arrive.",
    bullets: [
      "A calm review of what is driving the exit (schedule vs culture vs volume)",
      "Options beyond ‘quit or stay’—including short blocks while you stabilize",
      "Credentialing timelines so you are not guessing in silence",
    ],
    relatedSlugs: ["career-change-for-doctors", "physician-burnout-solutions", "flexible-physician-careers", "national-locum-tenens-jobs-guide"],
    answer:
      "Leaving hospital medicine usually means changing your work structure—not your identity. Locum Career Hub helps physicians map transitions (including locum tenens) with transparent expectations and low-pressure guidance.",
    whoFor: [
      "Attendings who feel done with hospital medicine but are unsure what is next",
      "Physicians who want flexibility before a permanent switch",
      "Clinicians seeking physician stress reduction careers without leaving medicine overnight",
    ],
    sections: [
      {
        h2: "Name the pain before you pick the label",
        paragraphs: [
          "Some clinicians want a different specialty. Some want fewer nights. Some want a different employer in the same specialty. ‘Leaving hospital medicine’ can mean many things—and the right move depends on which lever is actually hurting you.",
          "We start with constraints: family, finances, licensing footprint, and what recovery time you need—not slogans.",
        ],
      },
      {
        h2: "Where locum tenens fits as a bridge",
        paragraphs: [
          "Locums is not an escape hatch from boundaries. It is a scheduling tool that can create breathing room when expectations are documented.",
          "If you are problem-aware first, we still speak plainly about tradeoffs: travel fatigue, onboarding load, and the fact that toxic cultures can exist anywhere.",
        ],
        bullets: [
          "Short blocks while you interview for a permanent fit",
          "Income clarity while you reduce admin-heavy roles",
          "Geographic testing without buying a house on day one",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I have to commit to locums full time?",
        a: "No. Many physicians use short blocks as a bridge while they decide what sustainable looks like.",
      },
      {
        q: "What if I am burned out?",
        a: "Then pacing matters even more. We prioritize realistic volume conversations and recovery time—not ‘stack shifts until you feel better.’",
      },
    ],
  },
  {
    slug: "career-change-for-doctors",
    title: "Career Change for Doctors | Options Beyond the Default Path | Locum Career Hub",
    description:
      "Career change for doctors does not have to be abrupt. Compare flexible work, moonlighting, and locum tenens as structured experiments with recruiter support.",
    h1: "Career Change for Doctors: Experiments, Not Panic Moves",
    h2: "You can explore without posting a dramatic resignation first",
    keywords: ["career change for doctors", "physician career options", "flexible physician jobs", "locum opportunities"],
    intro:
      "Career change for doctors is often less about ‘never practicing again’ and more about escaping a schedule that no longer fits a human life. Some physicians want nonclinical paths; many want clinical work with different constraints. Locum Career Hub helps you compare structured experiments—including locum tenens blocks—so you can gather real-world data before you lock in a decade-long decision.",
    bullets: [
      "Compare W-2 changes vs contract blocks with explicit end dates",
      "Moonlighting and part-time stacks when you need income without chaos",
      "Recruiter conversations that respect uncertainty",
    ],
    relatedSlugs: ["leaving-hospital-medicine", "careers-after-residency", "physician-side-income", "national-locum-tenens-jobs-guide"],
    answer:
      "Career change for doctors is a design problem: match clinical intensity, autonomy, and admin load to your season of life. Locum Career Hub maps options—including locum opportunities—without treating uncertainty as a sales hook.",
    whoFor: [
      "Physicians mid-career who feel stuck in the default path",
      "New grads comparing careers after residency",
      "Clinicians who want physician travel opportunities as a learning phase",
    ],
    sections: [
      {
        h2: "Start with constraints, not vibes",
        paragraphs: [
          "The best next step depends on nights tolerated, travel appetite, financial runway, and how much recovery time you need between blocks.",
          "We translate ‘I need a change’ into a short list of realistic models you can compare side by side.",
        ],
      },
      {
        h2: "Locum tenens as a structured experiment",
        paragraphs: [
          "A defined assignment is data: documentation load, staffing layers, and whether the culture matches what you were sold.",
          "If you already know you want locum physician jobs, we still slow down enough to document expectations—because speed without clarity is how clinicians get hurt.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is locums the only option?",
        a: "No. It is one common tool for flexibility and runway. We help you compare it to other models based on your goals.",
      },
    ],
  },
  {
    slug: "tired-of-being-a-doctor",
    title: "When You Feel Tired of Being a Doctor | Supportive Next Steps | Locum Career Hub",
    description:
      "If you feel tired of being a doctor, you deserve nonjudgmental guidance. Explore workload relief, flexible schedules, and locum tenens as one possible tool.",
    h1: "When You Feel Tired of Being a Doctor—That Can Be a Signal, Not a Sentence",
    h2: "Shame is not a strategy; clarity and options are",
    keywords: ["tired of being a doctor", "physician burnout solutions", "doctor work life balance", "flexible physician careers"],
    intro:
      "Feeling tired of being a doctor is more common than your group chat admits—and it does not automatically mean you should quit medicine. Often it means the role has swallowed your recovery time, your autonomy, and your sense of fairness. We help you separate ‘I hate this schedule’ from ‘I hate patients,’ because those are different problems with different solutions. Flexible contract work can sometimes reduce structural stressors; sometimes the answer is a different employer, a different intensity, or clinical time with clearer boundaries.",
    bullets: [
      "A private, calm conversation—no pressure scripts",
      "Practical questions about census, backup, nights, and documentation",
      "Options that respect your safety and your family’s stability",
    ],
    relatedSlugs: ["physician-burnout-solutions", "doctor-work-life-balance", "leaving-hospital-medicine", "flexible-physician-careers"],
    answer:
      "If you feel tired of being a doctor, the next step is often to change the work structure—not your character. Locum Career Hub helps physicians explore flexible models (including locums) with explicit expectations and recruiter respect for boundaries.",
    whoFor: [
      "Physicians experiencing emotional exhaustion or cynicism about work",
      "Clinicians who feel guilty for wanting a different pace",
      "Anyone searching physician burnout solutions without a clear plan yet",
    ],
    sections: [
      {
        h2: "We do not treat pain as a sales hook",
        paragraphs: [
          "Some staffing conversations rush clinicians into travel before they are ready. We slow down enough to understand what would need to be true for a change to feel safe.",
          "If the right answer is not locums, we still want you to leave with clearer language for your next conversation—whether with a chair, a partner, or a therapist.",
        ],
      },
      {
        h2: "When locums can help (and when it cannot)",
        paragraphs: [
          "Locum tenens can create defined start/stop dates and reduce certain admin obligations—useful when you need runway.",
          "It does not fix toxic leadership by itself, and it still requires boundaries. We talk about that plainly.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it wrong to want a break?",
        a: "No. Medicine trains people to override signals. Wanting recovery time is human—and often clinically safer.",
      },
      {
        q: "Do I have to decide immediately?",
        a: "No. Many physicians start by mapping options and timelines, then choose when they are ready.",
      },
    ],
  },
  {
    slug: "locum-opportunities",
    title: "Locum Opportunities for Physicians | Locum Career Hub",
    description:
      "Browse locum opportunities with transparent expectations: rates, travel, malpractice, and scheduling—plus problem-aware context for burned-out clinicians.",
    h1: "Locum Opportunities—Defined Blocks, Clear Expectations",
    h2: "High-intent search, human pacing: understand the model before you commit",
    keywords: ["locum opportunities", "locum tenens opportunities", "locum physician jobs", "physician recruiter"],
    intro:
      "Locum opportunities are contract-based roles that help hospitals maintain coverage while giving physicians clearer time boundaries than many permanent schedules allow. If you landed here without knowing the term ‘locum tenens,’ the simple version is: you agree to defined clinical dates, you practice within documented expectations, and you move on—or repeat—based on fit.",
    bullets: [
      "Specialty-specific matching across inpatient and outpatient models",
      "Credentialing support with realistic start dates",
      "Advocacy on stipends, lodging, malpractice, and cancellation terms",
    ],
    relatedSlugs: ["national-locum-tenens-jobs-guide", "locum-physician-jobs", "physician-travel-jobs", "hospitalist-locum-jobs"],
    answer:
      "Locum opportunities are short- or medium-term physician coverage roles—commonly called locum tenens—with explicit scheduling windows and recruiter support for licensing and credentialing.",
    whoFor: [
      "Physicians searching locum opportunities or locum tenens jobs",
      "Clinicians who want travel physician jobs with documented backup",
      "Anyone comparing locum physician jobs across states",
    ],
    sections: [
      {
        h2: "Problem-aware first, terminology second",
        paragraphs: [
          "Many clinicians start with burnout, flexibility, or income questions. Locums is one possible tool inside a broader career strategy.",
          "We introduce the model in plain language and help you evaluate whether it fits your constraints.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between locum opportunities and permanent jobs?",
        a: "Locums is built around defined assignment windows and contract terms. Permanent roles can offer stability, but may also carry heavier embedded admin load—tradeoffs vary.",
      },
    ],
  },
  {
    slug: "locum-physician-jobs",
    title: "Locum Physician Jobs | Travel & Local Blocks | Locum Career Hub",
    description:
      "Locum physician jobs nationwide: hospital medicine, emergency care, anesthesia, and outpatient specialties—with recruiter-led transparency.",
    h1: "Locum Physician Jobs for Clinicians Who Want the Week to Fit Life",
    h2: "From hospitalist blocks to ED bundles—expectations documented before day one",
    keywords: ["locum physician jobs", "locum tenens jobs", "travel physician jobs", "physician staffing"],
    intro:
      "Locum physician jobs are a practical way to change the shape of your work week—especially when you still want to practice, but need clearer boundaries, different intensity, or a calmer season while you decide what is next. Demand varies by specialty and region, but the core promise of well-run locums is the same: explicit dates, explicit expectations, and less surprise.",
    bullets: [
      "Hospitalist, ED, anesthesia/CRNA, and outpatient pathways when clinically appropriate",
      "Local and travel models depending on your constraints",
      "Iteration after your first assignment—adjust, repeat, or exit politely",
    ],
    relatedSlugs: ["national-locum-tenens-jobs-guide", "locum-opportunities", "emergency-medicine-locum-jobs", "crna-locum-jobs"],
    answer:
      "Locum physician jobs are contract-based clinical roles that help facilities maintain staffing while offering physicians clearer scheduling windows than many traditional employed roles.",
    whoFor: [
      "Physicians searching locum physician jobs or locum tenens jobs",
      "Clinicians exploring travel physician jobs with explicit backup",
      "Moonlighters who want organized blocks instead of chaotic one-offs",
    ],
    faqs: [
      {
        q: "Do locum physician jobs always require travel?",
        a: "No. Some clinicians choose local block contracts; others choose travel assignments. Distance should match your recovery needs.",
      },
    ],
  },
];

export const LANDING_SLUGS = LANDING_PAGES.map((p) => p.slug);

export function getLanding(slug: string) {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
