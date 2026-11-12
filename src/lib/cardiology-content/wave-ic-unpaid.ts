import type { EditorialGuideBody } from "./types";

const S = (h2: string, ...paragraphs: string[]) => ({ h2, paragraphs });
const faq = (q: string, a: string) => ({ q, a });

const HUB = "/locum-jobs/cardiology/interventional";
const JOBS = "/interventional-cardiologist-locum-jobs";
const PAY = "/interventional-cardiology-locums-pay";
const KY = "/featured-cardiology-jobs/kentucky-cath-lab-only-interventional-cardiology-locum";
const OH = "/featured-cardiology-jobs/ohio-interventional-cardiology-locum";
const IMLC_TOOL = "/tools/imlc-eligibility-calculator";
const CALC = "/cardiologist-locums-calculator";
const FORM = "/physician-opportunities#lead-form";

/** Decision/gating IC pages. Live Google (2026-11-11): these queries show SCAI/Reddit/guides, not CompHealth/Weatherby ad packs. */
export const IC_DECISION_NAV: { href: string; title: string }[] = [
  { href: "/guides/how-to-start-interventional-cardiology-locums", title: "How to start IC locums" },
  { href: "/guides/pci-without-surgical-backup-locums", title: "PCI without surgical backup" },
  { href: "/guides/call-only-interventional-locums", title: "Call-only IC locums" },
  { href: "/guides/primary-pci-vs-diagnostic-cath-locums", title: "Primary PCI vs diagnostic-only" },
  { href: "/guides/board-eligible-interventional-locums", title: "Board-eligible IC locums" },
  { href: "/guides/temporary-privileges-for-ic-locums", title: "Temp privileges for the cath lab" },
  { href: "/guides/interventional-locums-gratis-hours-and-callback", title: "Gratis hours and callback" },
  { href: "/guides/questions-before-ic-locum-contract", title: "Questions before an IC contract" },
  { href: "/guides/first-interventional-locum-assignment", title: "First IC locum assignment" },
  { href: "/guides/impella-mcs-locum-jobs", title: "Impella and MCS locums" },
];

function coreLinks(extra: { href: string; title: string }[] = []) {
  const seen = new Set<string>();
  return [
    { href: FORM, title: "Submit cardiologist inquiry" },
    { href: HUB, title: "Interventional locum jobs hub" },
    ...extra,
    { href: JOBS, title: "Interventional cardiologist locum jobs" },
    { href: PAY, title: "Interventional locums pay" },
    { href: KY, title: "Kentucky cath-lab-only IC locum" },
    { href: OH, title: "Ohio interventional locum" },
    { href: IMLC_TOOL, title: "IMLC eligibility calculator" },
    { href: CALC, title: "Cardiologist locums calculator" },
  ].filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  }).slice(0, 8);
}

export const IC_DECISION_GUIDES: EditorialGuideBody[] = [
  {
    slug: "how-to-start-interventional-cardiology-locums",
    pageDef: {
      category: "career",
      h1: "How to Start Interventional Cardiology Locums",
      title: "How to Start Interventional Cardiology Locums | Logs First",
      description:
        "A physician-side sequence for starting IC locums: PCI logs, licenses or IMLC, moonlighting rules, then a written STEMI scope. Not a job-board blast.",
      topic: "how to start interventional cardiology locums",
      keywords: [
        "how to start interventional cardiology locums",
        "start IC locums after fellowship",
        "interventional cardiology locums tenens",
      ],
    },
    directAnswer:
      "Start interventional locums with a file, not a flight. Pull 12–24 months of PCI and STEMI logs, list licenses and IMLC eligibility, confirm your employed contract allows moonlighting if you still have a day job, then ask to be presented only to blocks whose written STEMI, backup, and included hours you will actually take.",
    intro:
      "Google’s job SERP for interventional locum jobs is a paid wall of CompHealth, Weatherby, and Hayes. The search physicians actually type — how to start — currently ranks generic cardiology blogs, a hospital staffing essay, and Reddit. This page is the interventional sequence those results skip.",
    relatedLinks: coreLinks([
      { href: "/guides/pci-logs-and-privileging-for-locums", title: "PCI logs and privileging" },
      { href: "/guides/imlc-for-interventional-cardiology-locums", title: "IMLC for IC locums" },
    ]),
    sections: [
      S(
        "Do not start on the advertised job title",
        "“Interventional cardiology locum jobs” is where national agencies buy ads. You will see Florida cath-lab cards and nationwide promises before you see a written activation rule. Starting there trains you to shop geography instead of privileging.",
        "Start on your file. Logs, licenses, malpractice history, and whether you take primary STEMI. Then a recruiter who already recruits interventionalists can tell you which live blocks can actually credential you. Locum Career Hub is that recruiter. We are not the hospital.",
      ),
      S(
        "The order that does not waste a month",
        "1) Export PCI and STEMI volume for the last 12–24 months, with dates the credentials committee can read. 2) List every active license and whether you are IMLC-eligible. 3) If you are employed, read the moonlighting and non-compete clauses before you hold dates. 4) Decide lab-only versus mixed weeks versus call-only. 5) Submit the inquiry with those facts, not a wish list of cities.",
        "Skipping step 1 is how ASAP presentations die. Skipping step 3 is how an employed weekend becomes a compliance problem. Skipping step 4 is how you get presented to a Kentucky lab-only week when you wanted Ohio mixed call.",
      ),
      S(
        "Fellowship graduates versus employed attendings",
        "A new interventionalist can locum, but many STEMI panels want independent volume and a year of attending work. Board-eligible operators should read the BE page before assuming every listing that says BC/BE will privilege a fresh graduate for solo nights.",
        "Employed attendings usually have the logs. Their gate is the contract and fatigue. Weekend STEMI on top of a weekday lab is a different product than leaving employment for recurring one-week blocks. Pick the door before you pick the state.",
      ),
      S(
        "Licenses before romance",
        "Compact eligibility shortens a second license in Kentucky, Ohio, and other IMLC SPL states. It is still a separate license. California, New York, and other non-compact boards are a full application. Do not fall in love with a Sacramento week until you know that timeline.",
        "Two or three compact states you will actually fly to beat a map of twenty. Check the IMLC calculator, then inquire. Presentation can start while compact paperwork moves if the hospital’s start date allows it.",
      ),
      S(
        "What “started” looks like here",
        "You have a match request on file with specialty Interventional Cardiology, licenses, STEMI comfort, and the schedule shape you want. We compare that to live orders — currently a Kentucky cath-lab-only block and an Ohio 1–2 week mixed week — plus exclusive coverage that never hits a public URL.",
        "The northeastern Kansas inpatient cardiology locum is a different job. It is not an inpatient general cardiology disguise for STEMI. Do not treat that featured page as your IC start.",
      ),
    ],
    faqs: [
      faq(
        "Can I start IC locums straight out of fellowship?",
        "Sometimes, on supervised or lower-acuity panels. Many primary STEMI weeks want independent attending logs. Say your graduation date and volume honestly.",
      ),
      faq(
        "Do I need to quit my job first?",
        "No. Employed moonlighting is a real door if the contract allows it. Read weekend IC and employed moonlighting before you stack nights.",
      ),
      faq(
        "Should I apply to every agency listing?",
        "No. Duplicate CVs slow privileging and burn references. One complete file with a cardiology recruiter is faster than five incomplete ones.",
      ),
      faq(
        "How long until I can take a STEMI week?",
        "License, then credentials, then cath-lab privileges. Thirty to 120 days is common. Temporary privileges are not a plan — read that page before you book flights.",
      ),
    ],
  },
  {
    slug: "pci-without-surgical-backup-locums",
    pageDef: {
      category: "subspecialty",
      h1: "PCI Without Surgical Backup Locums",
      title: "PCI Without Surgical Backup Locums | Non-SOS Labs",
      description:
        "Locum PCI at hospitals without on-site cardiac surgery. What SCAI non-SOS guidance means for STEMI call, transfers, and which cases you should refuse.",
      topic: "PCI without surgical backup locums",
      keywords: [
        "PCI without surgical backup locum",
        "PCI no on-site surgery locum",
        "non-SOS STEMI locum",
      ],
    },
    directAnswer:
      "Many IC locums are primary PCI at hospitals without on-site cardiac surgery. That is a legitimate community model under SCAI non-SOS guidance — not a reason to panic, and not a reason to accept undefined transfers. Get the written backup, transfer time, MCS inventory, and case-selection limits before you take the activation phone.",
    intro:
      "Search this phrase and Google returns SCAI, ACC, and NIH — not Weatherby ads. Job boards still staff these labs every week and rarely say “no CT surgery” in the title. Interventionalists who have done locums already know: the cath lab is a cath lab until the perforation is not.",
    relatedLinks: coreLinks([
      { href: "/guides/stemi-call-locums", title: "STEMI call locums" },
      { href: "/guides/rural-stemi-coverage-locums", title: "Rural STEMI coverage" },
    ]),
    sections: [
      S(
        "This is the default community STEMI locum",
        "On-site cardiac surgery is not how most US PCI hospitals are built. SCAI’s 2023 expert consensus treats PCI without on-site surgery as a capability question: operator experience, rescue resources, and which lesions belong somewhere else. Locum weeks inherit that reality.",
        "A Western Pennsylvania listing in 2026 said it plainly: diagnostic and PCI, no cardiac surgery backup, 30-minute STEMI response. That is not a fringe ad. It is the community product. Rural STEMI coverage is often the same job with a longer transfer.",
      ),
      S(
        "What you are actually underwriting",
        "You underwrite acute vessel closure, tamponade, shock, and the minutes to a surgical hospital. Ask who runs the balloon pump or Impella, whether anesthesia and ICU are real at 2 a.m., and the documented transfer agreement — not “we usually call the university.”",
        "Reddit IC MDs who hire locums stop calling operators who get grouchy in a tight spot. The clinical skill is bailing yourself out with a staff and tray you did not train with. If that sentence bothers you, do not take non-SOS primary call.",
      ),
      S(
        "Case selection is the privilege set",
        "SCAI does not hand you a banned-lesion list for every non-SOS lab. It does say complex work — unprotected left main, last remaining conduit, high-risk CTO, heavy calcium — belongs where rescue matches the lesion. A locum who treats every community activation like a shock-team night is a risk. A locum who refuses every STEMI because there is no CT surgeon next door is also a mismatch.",
        "Get the lab’s written case-selection policy. If they do not have one, you are writing it in real time on someone else’s table. That is not a rate problem. That is a no.",
      ),
      S(
        "How this changes pay — and how it does not",
        "Non-SOS nights can sit in or above the usual IC daily band because the operator list is short. They can also sit at the same number as a surgical-backup lab with quieter call. Read included hours and callback. Do not invent a premium because the transfer is 45 minutes.",
        "Compare the Ohio mixed week and the Kentucky lab-only block the same way: activation, backup, inventory, included hours. Surgical backup is one line on that list, not the whole offer.",
      ),
      S(
        "What to put on the match request",
        "Say whether you take primary PCI without on-site surgery. Say whether you want community STEMI, or only labs with CT surgery in the building. We will not present you into a New Castle-style panel if you said no.",
        "This page is not a 50-hospital directory. Northeastern Kansas inpatient cardiology is a different job and is not an inpatient general cardiology stand-in for non-SOS PCI.",
      ),
    ],
    faqs: [
      faq(
        "Is PCI without on-site surgery below standard of care?",
        "No. SCAI treats it as a common US model when operator, facility rescue, and case selection match. Undefined rescue is the problem, not the absence of a CT surgeon in the next OR.",
      ),
      faq(
        "Will I see this on the job title?",
        "Often no. Ask. Listings bury it under “community hospital” or “STEMI call.” Direct questions save a wasted credentialing file.",
      ),
      faq(
        "Do I need Impella experience?",
        "Some non-SOS labs expect MCS comfort. Some have a balloon pump and a prayer. Ask what is on the shelf and who inserts it at night.",
      ),
      faq(
        "Is this the same as rural STEMI locums?",
        "Overlap is large. Rural pages cover geography and solo call. This page is the surgical-backup question, including suburban labs that still transfer out.",
      ),
    ],
  },
  {
    slug: "call-only-interventional-locums",
    pageDef: {
      category: "subspecialty",
      h1: "Call-Only Interventional Locums",
      title: "Call-Only Interventional Locums | STEMI Nights Without Clinic",
      description:
        "Call-only IC locums: 24-hour STEMI coverage without a clinic panel. How that differs from cath-lab-only scheduled PCI and mixed rounding weeks.",
      topic: "call-only interventional locums",
      keywords: [
        "call only interventional locum",
        "STEMI call only locum",
        "24 hour interventional cardiology locum",
      ],
    },
    directAnswer:
      "Call-only interventional locums are STEMI and emergency PCI coverage without a scheduled clinic panel. They are not the same as cath-lab-only weekday PCI, and they are not a mixed Ohio-style week with afternoon clinic. Confirm whether rounding and consults hitchhike onto the call block before you treat it as nights-only.",
    intro:
      "LocumTenens.com’s live IC board is heavy on 24-hour call. Idaho, Washington, and Kentucky listings advertise call-only or EMTALA call. Physicians search that constraint because they already have a weekday job — or because they refuse clinic. Agencies still mix the products in one specialty filter.",
    relatedLinks: coreLinks([
      { href: "/guides/cath-lab-only-locum-jobs", title: "Cath-lab-only IC locums" },
      { href: "/guides/weekend-interventional-cardiology-locums", title: "Weekend IC locums" },
    ]),
    sections: [
      S(
        "Call-only is a coverage product, not a lifestyle brand",
        "The hospital needs someone on the activation list. You may sleep, or you may run two STEMIs and a tamponade. A quiet 24-hour shift and a brutal one pay from the same written guarantee plus callback — if callback is written.",
        "Paducah-style 24-hour call listings still sneak in general cardiology consults and study reads. “Call-only” on a recruiter email is not the same as “no rounding, no clinic, no echo pile.” Get the inbox in writing.",
      ),
      S(
        "How it differs from cath-lab-only",
        "Cath-lab-only, as we use it for the Kentucky featured job, means scheduled lab work with no general cardiology clinic, rounding, or consult census. It may or may not include STEMI. Call-only means the night and the pager are the job. Daytime elective PCI may be zero.",
        "If you want weekday stents and no nights, you want lab-only. If you want nights and no clinic, you want call-only. If you want both plus afternoon clinic, you want the Ohio mixed week. Mixing those three in one search is how you get angry on day two.",
      ),
      S(
        "Weekend call-only is the employed door",
        "Georgia and Illinois public ads price weekend 24-hour STEMI in the $3,250–$3,750/day and callback-after-gratis bands. That is moonlighting math if your employer allows it. It is also a fatigue product. Friday 5 p.m. to Monday 7 a.m. is not “a couple of extra cases.”",
        "Read employed IC moonlighting and weekend IC locums before you stack this onto a full-time lab. The non-compete and the next Monday’s cases are part of the rate.",
      ),
      S(
        "Response time is the hidden scope",
        "Thirty-minute STEMI response is common. That is a radius, a hotel, and a car — not a vibe. If you cannot make the door, you are not on the list. Call-only jobs that require you to stay in-house are a different sleep and a different rate than beeper call from a hotel.",
        "Ask where you are expected to be, who first-calls the lab team, and whether you take floor consults between activations. Those three answers change the night more than the specialty name.",
      ),
      S(
        "What we will match",
        "Tell us call-only, lab-only, or mixed. Tell us primary versus backup STEMI. Kentucky’s public job is lab-only, not a pure call shift. Ohio’s public job is mixed. Exclusive call-only blocks are matched after the form, not invented as city pages.",
        "Northeastern Kansas inpatient cardiology is a different job. It is not an inpatient general cardiology call-only IC week.",
      ),
    ],
    faqs: [
      faq(
        "Is call-only easier than a mixed IC week?",
        "It can be quieter. It can also be worse. A mixed week has daytime structure. Call-only is the pager. Compare written activations, not the adjective.",
      ),
      faq(
        "Does call-only mean no procedures unless STEMI?",
        "Ask. Some hospitals add urgent inpatients and temp wires. Some are true EMTALA-only. The listing title will not settle it.",
      ),
      faq(
        "Can I do call-only with IMLC?",
        "Compact speed helps the license. The hospital still privileges PCI and STEMI. Call-only does not skip logs.",
      ),
      faq(
        "Is 24-hour call the same as a 24-hour shift?",
        "No. In-house 24-hour coverage and home beeper call are different jobs that both get labeled 24-hour. Ask where you sleep.",
      ),
    ],
  },
  {
    slug: "primary-pci-vs-diagnostic-cath-locums",
    pageDef: {
      category: "subspecialty",
      h1: "Primary PCI vs Diagnostic-Only Cath Locums",
      title: "Primary PCI vs Diagnostic Cath Locums | Privilege Sets",
      description:
        "Diagnostic-only cath locums are not independent primary PCI. How privilege sets, logs, and STEMI panels differ before you accept an IC week.",
      topic: "primary PCI vs diagnostic cath locums",
      keywords: [
        "diagnostic only cath locum",
        "primary PCI locum",
        "invasive vs interventional locum",
      ],
    },
    directAnswer:
      "Diagnostic catheterization privileges are not independent primary PCI privileges. A locum week that needs STEMI coverage wants recent PCI volume, not a lifetime of diagnostics. Confirm whether you are the primary operator, a diagnostic-only backup, or a mixed invasive/interventional body before you hold the dates.",
    intro:
      "Job boards collapse “invasive” and “interventional” into one filter. Hospitals do not. Credentials committees privilege procedure families. Showing up ready to stent when the file only cleared diagnostics — or the reverse — is how a week collapses on Monday orientation.",
    relatedLinks: coreLinks([
      { href: "/guides/pci-logs-and-privileging-for-locums", title: "PCI logs and privileging" },
      { href: "/guides/structural-vs-pci-locums", title: "Structural vs PCI locums" },
    ]),
    sections: [
      S(
        "Three jobs that share a specialty name",
        "Diagnostic-only: left and right heart cath, ventriculography, maybe temp wires, no independent PCI. Invasive plus PCI: you stent when the lesion is yours. Primary STEMI: you are on the activation list as the operator, not the phone-a-friend.",
        "A listing that says interventional and then asks for TEE, nukes, and clinic is a mixed body. A listing that says interventional and then forbids PCI without a partner in-house is diagnostic-with-backup. Read the privilege form, not the emoji in the DocCafe title.",
      ),
      S(
        "Logs have to match the request",
        "Independent PCI locums typically want 12 months of operator PCI volume the committee can count. STEMI panels often want recent primary PCI, not “I used to take call in 2019.” Diagnostic-only weeks can accept a thinner PCI log and still be useful work — if that is what you want.",
        "Do not pad. Committees compare logs to NSQIP-style honesty and to the last hospital’s FPPE. A clean diagnostic file that gets you a diagnostic week is better than a stretched PCI file that gets you declined at two labs.",
      ),
      S(
        "Why this matters for ASAP",
        "ASAP IC starts fail when the hospital asked for primary PCI and the file supports diagnostics. Temporary privileges, when they exist, still follow the requested privilege set. You cannot temp-privilege your way into a STEMI panel with diagnostic-only volume.",
        "If you are rebuilding PCI volume after a diagnostic-heavy employed job, say so. There are mixed weeks and partnered labs. There are also hospitals that will not use you until the log looks like an operator again.",
      ),
      S(
        "Pay follows the privilege, not the word interventional",
        "Diagnostic-only days often sit below independent PCI/STEMI days. Primary STEMI with callback sits in the attending IC band we publish on the pay arcade — a starting range, not your number. Compare written scope. A $3,200 guarantee for diagnostic call is not a bargain if you thought you were the STEMI operator.",
        "Kentucky’s featured job is interventional lab work, not a diagnostic-only week. Ohio’s mixed week expects procedures plus clinic. Ask which privilege set you are being presented onto.",
      ),
      S(
        "How to inquire without wasting a committee",
        "Write diagnostic-only, independent PCI, or primary STEMI on the form. Add Impella or MCS only if you actually insert. We will not upgrade your title to win a listing.",
        "Structural versus PCI is a further split. TAVR is not implied by a diagnostic or PCI file. Keep that on its own page.",
      ),
    ],
    faqs: [
      faq(
        "Can an invasive non-interventionalist take these jobs?",
        "Diagnostic-only, sometimes. STEMI and independent PCI, no. Do not let a recruiter blur that to fill a hole.",
      ),
      faq(
        "I am BC interventional but my recent volume is mostly diagnostics. Can I locum?",
        "Yes, on the right privilege set. Tell us the true mix. Partnered labs exist. Solo primary STEMI may not until volume returns.",
      ),
      faq(
        "Does “interventional” on LocumTenens.com always mean PCI?",
        "No. Read procedures. Some weeks are STEMI. Some are clinic plus occasional cath. Some want TEE more than stents.",
      ),
      faq(
        "Is this the Kansas inpatient job?",
        "No. Northeastern Kansas inpatient cardiology is a different job and is not an inpatient general cardiology PCI week.",
      ),
    ],
  },
  {
    slug: "board-eligible-interventional-locums",
    pageDef: {
      category: "career",
      h1: "Board-Eligible Interventional Locums",
      title: "Board-Eligible Interventional Locums | BE vs BC",
      description:
        "When board-eligible interventional cardiologists can take locums, when hospitals require ABIM BC, and what to put in the file before a STEMI panel.",
      topic: "board eligible interventional locums",
      keywords: [
        "board eligible interventional locum",
        "BE interventional cardiology locums",
        "BC vs BE locum cardiologist",
      ],
    },
    directAnswer:
      "Board-eligible interventional cardiologists can take some locum weeks. Many STEMI panels and public listings still require ABIM board certification in interventional cardiology, not BE. Treat BE as a filter you disclose on day one, not a surprise after the credentials committee opens the file.",
    intro:
      "Live IC ads swing between “BC/BE” and “ABIM board certification required.” Fellowship graduates searching locums hit that wall after they already sent a CV. This page is the honest split so you do not burn a reference on a panel that will never privilege BE solo nights.",
    relatedLinks: coreLinks([
      { href: "/guides/how-to-start-interventional-cardiology-locums", title: "How to start IC locums" },
      { href: "/guides/pci-logs-and-privileging-for-locums", title: "PCI logs and privileging" },
    ]),
    sections: [
      S(
        "BE is a status, not a workaround",
        "Board-eligible means you finished accredited interventional training and are in the exam window. It does not mean every medical staff office will let you take primary STEMI alone. Bylaws win. Some hospitals write BC only. Some write BC/BE with a named proctor. Some will wait for the exam date.",
        "A Pennsylvania Aya listing in 2026 required ABIM BC in interventional cardiology and two years of IC experience. That is a different product than “BE welcome, partner always in-house.” Ask which one you are being sent to.",
      ),
      S(
        "What actually gets you privileged as BE",
        "Recent fellowship logs, a program-director letter that matches the privilege request, clean malpractice, and a hospital that already uses BE operators. Temporary privileges, when they exist, still follow bylaws. BE does not create a temp STEMI card.",
        "If your exam is months away, target mixed or partnered labs, not solo community nights. If you already passed cards and are waiting on the interventional exam, say both dates. Committees care about the interventional certificate, not the general cards plaque on your wall.",
      ),
      S(
        "Employed BE moonlighting",
        "Your home hospital may already privilege you as BE. A locum hospital is a new bylaw. Do not assume the employed privilege set travels. Weekend moonlighting as BE is possible where the host lab proctors or restricts you to diagnostics. It is not automatic.",
        "Read the employed contract. Some groups forbid outside STEMI. Some allow it after the boards. Get that in writing before we present you.",
      ),
      S(
        "How we present BE candidates",
        "We disclose BE on the first call to the facility. We do not hide it behind “interventional trained.” Facilities that require BC are filtered out. Facilities that take BE with logs get a complete file, not a teaser.",
        "Kentucky and Ohio public jobs prefer interventional certification. We will tell you when a live order can take BE instead of burning a week of credentialing for a no.",
      ),
      S(
        "What to send with the inquiry",
        "Training end date, exam date or result, PCI and STEMI counts, licenses, and whether you will take solo primary call. If you will only work with a partner on-site, say that. It is a feature for the right lab, not a defect.",
        "Do not apply to every BC-only DocCafe card to “get in the system.” You will spend references. One complete BE file is enough.",
      ),
    ],
    faqs: [
      faq(
        "Can I locum before I sit the interventional boards?",
        "At some hospitals, with a proctor or restricted privileges. Many STEMI panels will wait. Disclose BE immediately.",
      ),
      faq(
        "Does BC/BE in the ad mean they will take me?",
        "It means they might. Bylaws and the department chair still decide. Ask before you complete a 40-page application.",
      ),
      faq(
        "I am BC in cardiovascular disease but BE interventional. Which jobs?",
        "General cardiology locums, maybe diagnostic cath. Independent PCI and STEMI usually want the interventional certificate or a written BE exception.",
      ),
      faq(
        "Will IMLC fix BE?",
        "No. Compact licensing is a state license pathway. Boards and privileges are separate.",
      ),
    ],
  },
  {
    slug: "temporary-privileges-for-ic-locums",
    pageDef: {
      category: "licensing",
      h1: "Temporary Privileges for Interventional Locums",
      title: "Temporary Privileges for IC Locums | Not a STEMI Shortcut",
      description:
        "When cath-lab temporary privileges exist for IC locums, what files they still require, and why ASAP STEMI weeks fail when temp privileges are treated as a plan.",
      topic: "temporary privileges interventional locums",
      keywords: [
        "temporary privileges cath lab locum",
        "temp privileges interventional cardiology",
        "ASAP STEMI locum credentialing",
      ],
    },
    directAnswer:
      "Temporary privileges can let an interventionalist start before the full credentials committee meets — only when the hospital’s bylaws allow it and the PCI/STEMI file is already clean. They are not a nationwide shortcut, not a substitute for logs, and not a reason to book a flight on a recruiter’s optimism.",
    intro:
      "Our glossary page on temporary privileges already converted a lead. Interventionalists need the cath-lab version: FPPE, primary PCI, and the difference between “temp privileges available” on a DocCafe card and a chair who will actually put you on the activation list this weekend.",
    relatedLinks: coreLinks([
      { href: "/glossary/temporary-privileges", title: "Temporary privileges glossary" },
      { href: "/guides/pci-logs-and-privileging-for-locums", title: "PCI logs and privileging" },
    ]),
    sections: [
      S(
        "Temp privileges are a bylaw, not a personality trait",
        "Some medical staffs grant temporary privileges with a clean NPDB, current logs, and department-chair sign-off. Some never do for STEMI. “Temp privileges available” in a listing is a maybe. The chair’s email is the answer.",
        "Interventional temp privileges are narrower than hospitalist temp privileges. You are asking to operate. That file is thicker. Plan 30–120 days unless the hospital has already named a temp path for your dates.",
      ),
      S(
        "What the file still has to contain",
        "Recent PCI and STEMI logs, licenses, DEA, ACLS, malpractice history including tail, references who will answer the phone, and the exact privilege checklist the lab uses. A CV with “interventional” in the header is not a temp packet.",
        "Hospitals that offer temp privileges for a quiet diagnostic week may refuse them for primary STEMI. Ask which privilege set the temp covers. Diagnostic-only temp is not a STEMI weekend.",
      ),
      S(
        "ASAP is a file date",
        "Ohio’s public job wants coverage as soon as someone can start. That sentence is true and also incomplete. Start equals privileges, not wheels down. If the committee meets monthly and temps are off the table, ASAP is next month.",
        "We will not tell you to buy a refundable flight on a maybe. If temps are the only way a date works, we get that in writing from the facility before you hold the calendar.",
      ),
      S(
        "IMLC does not create temps",
        "A compact license can finish while privileging is in motion. It cannot force a chair to grant temporary STEMI privileges. Sequence: eligible compact application, complete privilege packet, then dates. Reverse that and you get a hotel reservation and a closed lab.",
        "California and other non-compact boards add license lag on top. Sacramento-area IC coverage is not a temp-privilege story for most out-of-state physicians.",
      ),
      S(
        "How to inquire",
        "Put your earliest realistic start, licenses, and whether you have used temp privileges before. We will say when a live order can temp and when it cannot. Exclusive ASAP holes are matched; they are not posted as city shells.",
        "Read the glossary for the generic definition, then use this page for the cath-lab stakes. The form on this page defaults to Interventional Cardiology.",
      ),
    ],
    faqs: [
      faq(
        "Can temp privileges get me on a STEMI panel this weekend?",
        "Only if that hospital’s bylaws and chair already said yes for your file. Most will not. Do not plan income on it.",
      ),
      faq(
        "Do all IC locums offer temps?",
        "No. Many community labs wait for the full committee. Listings that advertise temps still have to perform.",
      ),
      faq(
        "Is a clean file enough?",
        "It is required, not sufficient. Bylaws, chair availability, and the privilege set decide.",
      ),
      faq(
        "Did someone already convert from the temp-privileges glossary?",
        "Yes — that URL produced a generate_lead in GA4. This page exists so interventionalists land on cath-lab specifics instead of a generic definition.",
      ),
    ],
  },
  {
    slug: "interventional-locums-gratis-hours-and-callback",
    pageDef: {
      category: "career",
      h1: "Gratis Hours and Callback on Interventional Locums",
      title: "IC Locums Gratis Hours and Callback | Read the Guarantee",
      description:
        "How 4-hour gratis, daily guarantees, and hourly callback change interventional locum pay. Why two $3,200 days are not the same job.",
      topic: "interventional locums gratis hours callback",
      keywords: [
        "locum gratis hours interventional",
        "STEMI callback pay locum",
        "interventional locum 4 hour gratis",
      ],
    },
    directAnswer:
      "Interventional locum pay is usually a daily guarantee that already covers a block of hours, then hourly callback after that. Four-hour gratis is common. A quiet night stays near the guarantee. A busy STEMI night adds callback — it does not pay you twice for the same hour. Compare the written split, not the headline daily number.",
    intro:
      "People also search “interventional cardiology locum rates” from the paid jobs SERP. The agencies buying those ads do not explain gratis. Illinois public listings do: $2,200 per 24 hours with 4 hours gratis, then $375/hour. Ohio’s featured job is a $3,200 guarantee for 0–4 hours, then $400/hour. This page is that math without retitling the pay arcade.",
    relatedLinks: coreLinks([
      { href: PAY, title: "Interventional locums pay arcade" },
      { href: "/guides/stemi-call-locums", title: "STEMI call locums" },
    ]),
    sections: [
      S(
        "The guarantee already bought some of your night",
        "A daily number is not a salary. It is usually coverage for a defined first block — often four hours, sometimes a weekday 8–5. After that, callback or overtime is hourly. If you work eight hours on an Ohio-style 0–4 + $400/hour deal, that is $3,200 plus four hours of callback, about $4,800. A quiet night with one hour of work stays near $3,200.",
        "Gratis means those first hours are included, not unpaid charity. You already billed them inside the guarantee. Asking to stack full hourly on top of the guarantee for the same hours is how conversations die.",
      ),
      S(
        "Why two $3,200 days feel different",
        "Weekday lab-only with no call and 24-hour STEMI with 4-hour gratis are different jobs that can share a daily headline. The first is a shift. The second is an option on your sleep. Read activation, backup, and whether post-call relief is real.",
        "Public boards also post one-off numbers under the attending band. One AMN card near $2,993/day is one opening, not the market. Our pay arcade still starts many independent attendings around $3,200–$3,500 a day. That range is not your offer.",
      ),
      S(
        "Weekend math without weekly-salary theater",
        "A weekend is two or three of those days, not a made-up weekly salary. Reddit moonlighting threads quote $10,000 for Friday 5 p.m. to Monday 7 a.m. as a negotiation opener, not a posted rate. We will not invent a weekend salary to win a click. We will read the written days, gratis, and callback.",
        "If you want weekend-only, say so. If you want weekday lab-only, say so. Mixing them on one rate card is how you get underpaid on nights or overcommitted on clinic.",
      ),
      S(
        "What to demand in writing",
        "Included hours. Callback start. Night versus weekend multipliers if any. Whether consults during call are extra. Whether you are paid when the hospital cancels inside the notice window. Weatherby-style stories about getting paid for a cancelled weekend exist because it was contracted, not because locums is magic.",
        "Bring that list to the pay arcade and to the form. We confirm current written terms on Ohio and Kentucky before we present you. We do not quote a formula on a blog as your number.",
      ),
      S(
        "What this page will not do",
        "It will not change the IC pay SERP title. It will not divide a daily rate by eight and call it an hourly career. It will not treat northeastern Kansas inpatient cardiology as an IC callback example. That featured job is a different job.",
        "If you want a live example with callback written down, read the Ohio interventional locum. If you want lab-only without a general-cards census, read Kentucky.",
      ),
    ],
    faqs: [
      faq(
        "Does callback mean I get paid twice?",
        "No. The guarantee already covers a block of hours. Callback is extra time after that block.",
      ),
      faq(
        "Is 4-hour gratis standard?",
        "It is common, not a law. Some weeks include more hours. Some weekday lab days include the whole shift and pay callback only after hours.",
      ),
      faq(
        "Why is the pay arcade still titled $3,200/Day?",
        "That is the SERP title for the attending starting band. This page explains the split underneath it. We do not retitle IC pay.",
      ),
      faq(
        "Can you quote my weekend rate here?",
        "No. We confirm written terms on a specific job after we know your licenses, logs, and STEMI comfort.",
      ),
    ],
  },
  {
    slug: "questions-before-ic-locum-contract",
    pageDef: {
      category: "career",
      h1: "Questions to Ask Before an Interventional Locum Contract",
      title: "Questions Before an IC Locum Contract | STEMI, Backup, Logs",
      description:
        "The interventional-specific questions to ask before you sign: activation, backup, gratis hours, privilege set, cancellation, and EMR. Not a generic locums checklist.",
      topic: "questions before interventional locum contract",
      keywords: [
        "questions to ask locum interventional cardiology",
        "STEMI locum contract questions",
        "cath lab locum red flags",
      ],
    },
    directAnswer:
      "Before you sign an IC locum contract, get written answers for STEMI activation, primary versus backup, surgical backup and transfer, included hours and callback, the exact privilege set, cancellation notice, and which EMR you will learn at 2 a.m. Rate headlines do not replace those seven.",
    intro:
      "Generic locums checklists ask about travel and malpractice. Interventional weeks fail on lab politics and undefined nights. This list is the one IC MDs who hire locums actually use — including the grouchy-in-the-lab rule that ends callbacks.",
    relatedLinks: coreLinks([
      { href: "/guides/stemi-call-locums", title: "STEMI call locums" },
      { href: "/guides/pci-without-surgical-backup-locums", title: "PCI without surgical backup" },
    ]),
    sections: [
      S(
        "The seven that are not optional",
        "1) Who activates you, and in what window? 2) Are you primary or backup? 3) Where is surgical backup, and what is the transfer time? 4) What hours sit inside the guarantee, and what is callback? 5) Which privilege set — diagnostic, PCI, primary STEMI, MCS? 6) Cancellation notice, and who pays if they cancel inside it? 7) EMR, and whether you get a real orientation before the first night.",
        "If a recruiter cannot get those in writing, you do not have a job. You have a vibe. Walk.",
      ),
      S(
        "Lab questions that prevent day-two rage",
        "Who first-calls the team. What is on the shelf — Impella, balloon pump, covered stents. Who takes the next activation when you are post-procedure. Whether clinic or rounding is bolted onto a “lab” week. Whether echo and nuclear reads hitchhike onto call.",
        "Kentucky’s public job is written lab-only, no general cardiology census. Ohio’s is mixed. If a contract later adds clinic, that is a different job. Treat it as a new negotiation, not a favor.",
      ),
      S(
        "Red flags IC directors already filter",
        "Pressure to start before privileges clear. Refusal to name backup. “You’ll love the town” instead of census. A rate that only appears after you agree to a harder geography. Duplicate CVs already in their VMS from three agencies.",
        "Directors stop calling locums who are grouchy with lab staff or ED. Professionalism is a clinical skill on a strange team. If that sounds preachy, it is also how you get invited back to the 1–2 week rotation.",
      ),
      S(
        "Contract mechanics that are still IC-specific",
        "Malpractice with tail for procedures, not a hospitalist policy. Radiation badge and fluoro credential. Whether you can refuse a lesion that exceeds the non-SOS policy. What happens if the hospital adds TAVR marketing to your PCI week without logs.",
        "We are a recruiting service, not your attorney. For non-competes and entity setup, use a physician contract lawyer and a CPA. We will still refuse to present you into a week that cannot answer the seven questions.",
      ),
      S(
        "Use the list on the form",
        "Paste the constraints you will not move on: no solo non-SOS, lab-only only, BE with a partner, whatever is true. We match against live orders instead of blasting your CV at every STEMI emoji on DocCafe.",
        "Northeastern Kansas inpatient cardiology is a different job. Do not use this IC checklist on that featured page and expect a cath lab.",
      ),
    ],
    faqs: [
      faq(
        "Can I skip written backup if the rate is high?",
        "No. Undefined nights are how IC locums becomes the worst week of your year. Rate does not buy a CT surgeon.",
      ),
      faq(
        "Who should send these questions — me or the recruiter?",
        "Both. We ask them before presentation. You should still see the written answers before you sign.",
      ),
      faq(
        "What if the hospital answers “it depends”?",
        "Then the job is not ready. Wait, or decline. “It depends” is how you inherit someone else’s unwritten policy.",
      ),
      faq(
        "Is this legal advice?",
        "No. It is a recruiting filter for interventional blocks. Contracts still need your own counsel.",
      ),
    ],
  },
  {
    slug: "first-interventional-locum-assignment",
    pageDef: {
      category: "career",
      h1: "Your First Interventional Locum Assignment",
      title: "First Interventional Locum Assignment | Orientation Before STEMI",
      description:
        "How to pick and survive a first IC locum week: partnered labs over solo non-SOS, orientation before nights, EMR, and what not to prove on day one.",
      topic: "first interventional locum assignment",
      keywords: [
        "first interventional locum assignment",
        "first IC locum week",
        "new to locums interventional cardiology",
      ],
    },
    directAnswer:
      "A first interventional locum week should be a partnered or mixed lab with orientation before you take the pager, not a solo community STEMI night in an EMR you have never seen. Prove you are safe and easy to work with. Save the heroics for a hospital that already knows your name.",
    intro:
      "The first week is where locums gets a reputation. IC MDs who hire locums remember the operator who learned Epic during a shock case. They also remember the one who treated staff well and took straightforward lesions. Pick a first assignment that lets you be the second person.",
    relatedLinks: coreLinks([
      { href: "/guides/how-to-start-interventional-cardiology-locums", title: "How to start IC locums" },
      { href: "/guides/questions-before-ic-locum-contract", title: "Questions before an IC contract" },
    ]),
    sections: [
      S(
        "Do not make week one a solo non-SOS STEMI",
        "You can do community PCI without surgery on-site. You should not do it as your introduction to locums unless you already live that life at home. A first week with another interventionalist on-site, or backup named and close, is how you learn the tray and the politics.",
        "If the only open week is solo primary call at a lab you cannot describe, wait. There will be another week. There may not be another reputation.",
      ),
      S(
        "Orientation is a clinical requirement",
        "EMR is the part IC locums actually complain about. Epic Cupid, Cerner, Meditech — none of them are “you’ll pick it up.” Demand a login, a super-user, and a daytime first shift before overnight STEMI. If they cannot give you that, they are using you as a patch, not a colleague.",
        "Walk the lab. Find the covered stents, the balloon pump, the pacemaker drawer, the transfer number. Do this before the pager. It looks obsessive. It is how you avoid a scavenger hunt at 3 a.m.",
      ),
      S(
        "Case selection on someone else’s table",
        "Take the bread-and-butter PCI. Leave the ego CTO for home if the inventory and backup are unknown. First-week locums who swing for the fences in a strange lab become stories. You want to be invited back to the 1–2 week rotation, not discussed in the charge-nurse huddle.",
        "That is the same filter directors use when they stop calling grouchy operators. Kind and competent beats impressive and chaotic.",
      ),
      S(
        "Pick a shape you already understand",
        "If you already do mixed weeks, Ohio’s public 1–2 week block is a closer first assignment than a pure call-only radius you have never slept in. If you already hate clinic, Kentucky lab-only is closer. Do not use your first locum week to become a different kind of interventionalist.",
        "BE operators should add a partner or proctor constraint. Fellowship-new operators should not advertise themselves as solo STEMI coverage. The first assignment is a proof of file, not a personality reboot.",
      ),
      S(
        "After the week",
        "Write down what was true: activation, census, staff, EMR, whether they paid callback as written. That note is how your second week gets easier. Send dates you can hold next. Recurring blocks are how locums stops feeling like gambling.",
        "If the week was a mismatch, say so. We will not send you back to look flexible. Flexible is a calendar. It is not a willingness to repeat a bad lab.",
      ),
    ],
    faqs: [
      faq(
        "Should my first IC locum be local?",
        "If you can, yes. A license you already hold and a drive-in orientation beat a new compact state plus a new EMR plus STEMI.",
      ),
      faq(
        "What if the only opening is ASAP solo call?",
        "Decline unless your home practice is already that job. ASAP is a file date, not a dare.",
      ),
      faq(
        "Do I need a locums company for the first week?",
        "A cardiology recruiter who already places IC is useful for credentialing and for filtering. Direct hospital deals exist later. Do not skip malpractice and a written scope to “cut out the middleman” on week one.",
      ),
      faq(
        "Is the Kansas inpatient job a gentle first locum?",
        "It is not an IC week. Northeastern Kansas inpatient cardiology is a different job. Do not use it as interventional practice.",
      ),
    ],
  },
  {
    slug: "impella-mcs-locum-jobs",
    pageDef: {
      category: "subspecialty",
      h1: "Impella and MCS Locum Jobs for Interventionalists",
      title: "Impella and MCS Locum Jobs | Skill Premium, Not a Listing",
      description:
        "When Impella, IABP, and mechanical support change an IC locum — and when hospitals only want PCI. We do not invent shock-team jobs.",
      topic: "Impella MCS locum interventional",
      keywords: [
        "Impella locum jobs",
        "MCS locum interventional cardiology",
        "shock team locum cardiologist",
      ],
    },
    directAnswer:
      "Mechanical circulatory support is a privilege set, not a job title. Some IC locums want Impella or balloon-pump comfort because the lab actually inserts. Many community STEMI weeks want PCI and a transfer. Disclose true MCS volume. We will not advertise shock-team locums we do not have.",
    intro:
      "Agency pages list Impella in the procedure salad to look tertiary. Community labs then hand you a balloon pump and a phone number. This page splits skill premium from inventory so you neither oversell nor undersell the file.",
    relatedLinks: coreLinks([
      { href: "/guides/pci-without-surgical-backup-locums", title: "PCI without surgical backup" },
      { href: "/guides/structural-vs-pci-locums", title: "Structural vs PCI locums" },
    ]),
    sections: [
      S(
        "MCS is a log, like PCI",
        "If a hospital privileges Impella, they will ask how many you have inserted, not whether you have seen one. Balloon pumps are still common. LVAD explant and ECMO cannulation are not implied. Match the device to the log.",
        "SCAI non-SOS guidance expects MCS competence at labs that use it. It does not require every locum to be a shock-team director. Honesty about volume keeps you off a table you should transfer.",
      ),
      S(
        "When it moves the rate",
        "High-volume shock, unprotected left main, and real Impella nights can sit above the usual attending IC band. Diagnostic weeks with a balloon pump in a closet do not. We will not quote a shock premium on a community STEMI that transfers out.",
        "The pay arcade still starts many independent PCI attendings around $3,200–$3,500 a day. MCS is a mover, not a new specialty. Confirm written terms on the actual order.",
      ),
      S(
        "What we will not invent",
        "We do not have a public Impella-only locum to send you to. Kentucky’s featured job is cath-lab-only PCI scope as written. Ohio’s mixed week is rounding, clinic, and 24-hour call — confirm MCS on that file before you assume a shock program.",
        "If a hospital needs MCS-capable coverage, that comes through as an exclusive or a specific privilege add-on. It does not become a 50-city MCS directory.",
      ),
      S(
        "How to put it on the inquiry",
        "List devices you independently insert and approximate 12-month volume. List devices you will not touch. If you want only labs with on-site surgery and a shock team, say that — it shrinks geography and that is fine.",
        "If you want community PCI without MCS heroics, say that too. Both are employable locum products. Mixing them in one CV is how a chair gets the wrong person at 2 a.m.",
      ),
      S(
        "Related privilege splits",
        "Structural heart is separate. Impella during high-risk PCI is not TAVR. Peripheral intervention is separate again. Keep the file in columns so privileging does not merge them into “complex.”",
        "Northeastern Kansas inpatient cardiology is a different job and is not an MCS week.",
      ),
    ],
    faqs: [
      faq(
        "Do I need Impella to take IC locums?",
        "No. Many STEMI weeks want independent PCI. MCS is extra when the lab uses it.",
      ),
      faq(
        "Will Impella experience raise every offer?",
        "No. Only when the hospital’s privilege set and inventory match. Otherwise it is unused.",
      ),
      faq(
        "Is balloon-pump experience enough?",
        "For some community labs, yes. For a marketed shock program, no. Ask what they insert at night.",
      ),
      faq(
        "Do you have an Impella locum posted?",
        "Not as a public featured job. Request a match with true MCS volume if that is the work you want.",
      ),
    ],
  },
];
