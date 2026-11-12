import type { EditorialGuideBody } from "./types";
import { IC_DECISION_NAV } from "./wave-ic-unpaid";

const S = (h2: string, ...paragraphs: string[]) => ({ h2, paragraphs });
const faq = (q: string, a: string) => ({ q, a });

const HUB = "/locum-jobs/cardiology/interventional";
const JOBS = "/interventional-cardiologist-locum-jobs";
const PAY = "/interventional-cardiology-locums-pay";
const KY = "/featured-cardiology-jobs/kentucky-cath-lab-only-interventional-cardiology-locum";
const OH = "/featured-cardiology-jobs/ohio-interventional-cardiology-locum";
const SAC = "/featured-cardiology-jobs/california-sacramento-area-interventional-vms-locum";
const IMLC_TOOL = "/tools/imlc-eligibility-calculator";
const CALC = "/cardiologist-locums-calculator";

export const IC_CLUSTER_NAV: { href: string; title: string }[] = [
  { href: "/guides/imlc-for-interventional-cardiology-locums", title: "IMLC for interventional locums" },
  { href: "/guides/cath-lab-only-locum-jobs", title: "Cath-lab-only IC locums" },
  { href: "/guides/stemi-call-locums", title: "STEMI call locums" },
  { href: "/guides/weekend-interventional-cardiology-locums", title: "Weekend IC locums" },
  { href: "/guides/one-week-a-month-interventional-locums", title: "One week a month IC locums" },
  { href: "/guides/pci-logs-and-privileging-for-locums", title: "PCI logs and privileging" },
  { href: "/guides/structural-vs-pci-locums", title: "Structural vs PCI locums" },
  { href: "/guides/moonlighting-as-an-employed-interventional-cardiologist", title: "Employed IC moonlighting" },
  { href: "/guides/kentucky-interventional-cardiology-locums", title: "Kentucky IC locums" },
  { href: "/guides/ohio-interventional-cardiology-locums", title: "Ohio IC locums" },
  { href: "/guides/sacramento-interventional-cardiology-locums", title: "Sacramento-area IC locums" },
  { href: "/guides/rural-stemi-coverage-locums", title: "Rural STEMI coverage locums" },
];

export const IC_CLUSTER_SLUGS = new Set(IC_CLUSTER_NAV.map((item) => item.href.replace("/guides/", "")));

/** Schedule cluster + unpaid decision pages — used for IC lead-form defaulting. */
export const IC_ALL_SLUGS = new Set(
  [...IC_CLUSTER_NAV, ...IC_DECISION_NAV].map((item) => item.href.replace("/guides/", "")),
);

function coreLinks(
  extra: { href: string; title: string }[] = [],
): { href: string; title: string }[] {
  const seen = new Set<string>();
  const merged = [
    { href: "/physician-opportunities#lead-form", title: "Submit cardiologist inquiry" },
    { href: HUB, title: "Interventional locum jobs hub" },
    ...extra,
    { href: JOBS, title: "Interventional cardiologist locum jobs" },
    { href: PAY, title: "Interventional locums pay" },
    { href: KY, title: "Kentucky cath-lab-only IC locum" },
    { href: OH, title: "Ohio interventional locum" },
    { href: IMLC_TOOL, title: "IMLC eligibility calculator" },
    { href: CALC, title: "Cardiologist locums calculator" },
  ];
  return merged.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  }).slice(0, 8);
}

export const IC_CLUSTER_GUIDES: EditorialGuideBody[] = [
  {
    slug: "imlc-for-interventional-cardiology-locums",
    pageDef: {
      category: "licensing",
      h1: "IMLC for Interventional Cardiology Locums",
      title: "IMLC for Interventional Cardiology Locums | Separate Licenses",
      description:
        "How the Interstate Medical Licensure Compact helps interventional cardiologists take locums in other states. Compact speed is not a multistate license or hospital privileges.",
      topic: "IMLC interventional cardiology locums",
      keywords: [
        "IMLC interventional cardiology",
        "compact license locum cardiologist",
        "IMLC STEMI locums",
      ],
    },
    directAnswer:
      "The Interstate Medical Licensure Compact is an expedited path for eligible interventional cardiologists to get a separate license in another compact state. It is not one multistate medical license, and it does not replace cath-lab privileging, PCI logs, or STEMI call rules.",
    intro:
      "Interventional locums die on licensing lag more often than on case mix. A compact application can shorten a second state license. It cannot skip hospital privileges, and it cannot make California or other non-compact boards behave like Kentucky.",
    relatedLinks: coreLinks([
      { href: "/guides/kentucky-interventional-cardiology-locums", title: "Kentucky IC locums" },
      { href: "/guides/how-to-start-interventional-cardiology-locums", title: "How to start IC locums" },
    ]),
    sections: [
      S(
        "What IMLC actually is for an interventionalist",
        "IMLC is a paperwork pathway among participating state medical boards. If you qualify, you can obtain a full license in another compact state faster than a cold application. You still hold a distinct license in each state. There is no wallet card that lets you take STEMI call nationwide.",
        "That distinction matters in recruiting conversations. A hospital in Kentucky can often start a compact-eligible operator while the Kentucky license finishes. A California STEMI week cannot. Compact status is a filter, not a substitute for the board that actually governs the hospital.",
      ),
      S(
        "Why interventional locums care more than clinic cardiology",
        "PCI and STEMI privileges wait on a state license, then on case logs, then on a credentials committee. A two-week clinic locum can sometimes absorb a slow board. A STEMI panel cannot. If the license is still pending, the lab will not put you on the activation list.",
        "That is why compact-eligible interventionalists get presented to more live blocks: Kentucky, Ohio, and other IMLC SPL states can move while non-compact states sit in a full-license queue. Check eligibility on the IMLC calculator before you fall in love with a geography.",
      ),
      S(
        "Compact states versus boards that still take months",
        "Kentucky and Ohio are compact states for many eligible physicians. That is one reason a Kentucky cath-lab-only opening and an Ohio 1–2 week IC block can be realistic for out-of-state operators. Compact speed is still a separate Kentucky or Ohio license, then a separate privileging file.",
        "California is the opposite example. Sacramento-area interventional coverage is a full-license process for most out-of-state physicians. Do not treat IMLC as a shortcut into California, New York, or other non-compact boards. Sequence licenses toward the states you can actually start.",
      ),
      S(
        "What IMLC does not skip",
        "Hospital privileging still wants recent PCI and STEMI logs, references, malpractice history, and FPPE. Temporary privileges are not universal. A compact license with stale volume is a license, not a start date.",
        "Payer enrollment, DEA in the new state, and facility-specific STEMI pathways are also separate. Write those as a checklist beside the compact application so you are not surprised when the board says yes and the cath lab says not yet.",
      ),
      S(
        "A practical sequence for IC locums",
        "Pick two or three compact states you will actually fly to. Confirm IMLC eligibility. Start the compact licenses before you resign or stack a moonlighting week. Keep PCI logs current while the board works. Then ask to be presented to live blocks in those states.",
        "If you already hold Kentucky or Ohio, privileging is usually the remaining gate. If you only hold a non-compact license, start with the IMLC calculator and a match request that lists the compact states you will take. Locum Career Hub recruits interventionalists; we will tell you when a geography cannot start on your timeline.",
      ),
    ],
    faqs: [
      faq(
        "Is IMLC one license I can use in every compact state?",
        "No. It is an expedited path to a separate license in each participating state. You still apply, and the hospital still privileges you.",
      ),
      faq(
        "Does IMLC get me on a STEMI panel faster?",
        "It can shorten the state license. STEMI panels still wait on cath-lab privileges, logs, and written activation rules.",
      ),
      faq(
        "Can I use IMLC for California interventional locums?",
        "Usually no. California is not an IMLC shortcut for most physicians. Treat Sacramento-area IC work as a full-license timeline.",
      ),
      faq(
        "Should I wait to inquire until my compact license arrives?",
        "No. Inquire with the states you want and your eligibility. Presentation can start while compact paperwork is in motion if the hospital’s start date allows it.",
      ),
    ],
  },
  {
    slug: "cath-lab-only-locum-jobs",
    pageDef: {
      category: "subspecialty",
      h1: "Cath Lab Only Locum Jobs for Interventional Cardiologists",
      title: "Cath Lab Only Locum Jobs | No General Cardiology",
      description:
        "Cath-lab-only interventional locums without clinic, rounding, or consult census. How to confirm the written lab-only scope before you accept.",
      topic: "cath lab only locum jobs",
      keywords: [
        "cath lab only locum",
        "PCI only locum jobs",
        "no general cardiology locum",
      ],
    },
    directAnswer:
      "Cath-lab-only locums are interventional blocks that stay in the lab: scheduled PCI, diagnostics, and whatever STEMI rules are written. They are not a general cardiology clinic, rounding list, or consult census unless the contract adds those duties.",
    intro:
      "Plenty of interventionalists want the lab and refuse another inbox. The market does offer that shape of work. It is rarer than recruiter language suggests, and it is easy to lose in a contract that quietly adds clinic in the afternoon.",
    relatedLinks: coreLinks([
      { href: "/guides/kentucky-interventional-cardiology-locums", title: "Kentucky IC locums" },
      { href: "/guides/call-only-interventional-locums", title: "Call-only IC locums" },
    ]),
    sections: [
      S(
        "What cath-lab-only actually means",
        "Lab-only means the day’s work is procedures and the call that belongs to those procedures. There is no clinic panel, no rounding list, and no consult census. If a hospital needs both, that is a mixed IC job, not a lab-only job. Ask which one you are being presented.",
        "A current Kentucky opening is written that way: cath lab only, no general cardiology clinic, rounding, or consult census. Kentucky license or IMLC eligibility to add KY. Confirm STEMI versus scheduled-lab coverage in writing before you treat it as weekday PCI only.",
      ),
      S(
        "Why mixed IC weeks feel like employment",
        "Many interventional locums look like a shortened employed week: morning rounding and consults, afternoon clinic, plus 24-hour call. That can pay well. It is not lab-only. The Ohio 1–2 week block is that mixed shape. If your goal is to escape clinic, do not accept Ohio-shaped work and hope the clinic is light.",
        "The tell is the daily schedule, not the specialty label. “Interventional locum” on a flyer can still include a panel. Read the setting line. If it mentions rounding and clinic, it is not the job you searched for.",
      ),
      S(
        "STEMI still has to be named",
        "Lab-only is not the same as no call. A scheduled PCI week and a primary STEMI week are different jobs that both happen in a cath lab. Ask whether you are primary, backup, or scheduled-lab only. Ask who takes the next activation when you are post-procedure.",
        "If the client cannot write those rules, you do not have a lab-only assignment. You have an undefined interventional week. Decline it or wait for a written revision.",
      ),
      S(
        "Privileging still follows the procedures you will do",
        "Hospitals privilege the work they need. PCI logs, STEMI volume, and complication backup still apply. Lab-only does not mean lighter credentialing. It means the clinical inbox is not part of the bargain.",
        "Bring current operator logs. If your recent volume is diagnostic-heavy, say so. A lab that needs independent primary PCI will not invent that volume from a title.",
      ),
      S(
        "How to ask for this work",
        "Say you want cath-lab-only interventional locums with no general cardiology clinic or rounding. List licenses and IMLC eligibility. Name whether you take primary STEMI. Then request a match. Exclusive lab-only blocks often never appear on a public page.",
        "If you want a public example while we search, read the Kentucky cath-lab-only job. If you want mixed rounding and clinic plus call, read Ohio instead. Do not treat those as interchangeable.",
      ),
    ],
    faqs: [
      faq(
        "Are cath-lab-only locums common?",
        "They exist, but mixed IC weeks are more common. Ask for the written scope. Do not assume “interventional” means no clinic.",
      ),
      faq(
        "Does lab-only mean no STEMI?",
        "No. Confirm STEMI versus scheduled PCI in writing. Lab-only only means no general cardiology clinic, rounding, or consult census.",
      ),
      faq(
        "Is the Kentucky job the only lab-only opening?",
        "It is the public example we can list. Hospitals also send exclusive lab-only coverage that is not posted. Request a match with your licenses and STEMI comfort.",
      ),
      faq(
        "Can I keep an employed clinic and take lab-only locums?",
        "Sometimes, if moonlighting rules and fatigue allow it. Review the employed contract before you stack STEMI weeks.",
      ),
    ],
  },
  {
    slug: "stemi-call-locums",
    pageDef: {
      category: "subspecialty",
      h1: "STEMI Call Locums for Interventional Cardiologists",
      title: "STEMI Call Locums | Activation, Backup, Callback",
      description:
        "What STEMI call locums actually include: primary versus backup, activation windows, surgical backup, and how call changes a written daily guarantee.",
      topic: "STEMI call locums",
      keywords: [
        "STEMI call locums",
        "interventional cardiology call locum",
        "primary PCI locum call",
      ],
    },
    directAnswer:
      "STEMI call locums are interventional blocks where you take activations under written rules. Primary versus backup, included hours, callback, and surgical backup change the job more than the specialty name. A daily number without those terms is incomplete.",
    intro:
      "STEMI nights are the part of interventional locums that either fits or ruins the week. The pay page can show a $3,200 starting band. The night still has to be designed. Read activation, backup, and what hours are already inside the daily guarantee.",
    relatedLinks: coreLinks([
      { href: "/guides/ohio-interventional-cardiology-locums", title: "Ohio IC locums" },
      { href: "/guides/pci-without-surgical-backup-locums", title: "PCI without surgical backup" },
    ]),
    sections: [
      S(
        "Primary, backup, or scheduled lab",
        "Primary STEMI operator means you own activations during the coverage window. Backup means someone else is first, and you come in for complexity or overflow. Scheduled-lab coverage may include no nights at all. Those three jobs should not share a contract paragraph.",
        "Ask who is on the list with you. A solo interventionalist covering a PCI hospital overnight is a different life than a three-person panel. Rural STEMI coverage often looks like the first. Larger Ohio or Kentucky networks may look like the second. Get the count in writing.",
      ),
      S(
        "Activation windows and false activations",
        "Hospitals differ on door-to-device goals, EMS routing, and who calls you. A clean pathway is a reason to take the week. A fuzzy pathway is how you spend nights on non-STEMI chest pain. Ask how often activations are cancelled, and who decides.",
        "Also ask what happens after a case: do you return to a hotel, stay in-house, or keep a pager through clinic the next morning? Post-call clinic is how mixed IC locums recreate employment. If you will not do that, it belongs in the terms.",
      ),
      S(
        "Backup, transfer, and complication pathways",
        "Surgical backup, Impella or MCS availability, and transfer agreements are privileging questions and safety questions. A community PCI hospital can be an excellent locum if the pathway is honest. It is a bad locum if the brochure implies a shock program that is not there.",
        "You are allowed to decline a lab whose backup is a long ambulance ride and a shrug. That is not precious. That is how you keep a license.",
      ),
      S(
        "How call shows up in pay without theater",
        "On the interventional pay page, $3,200–$3,500 is a starting band for many attending operators, not a posted salary. A current Ohio opening writes a $3,200 guarantee for the first block of hours, then hourly callback. Quiet nights stay near the daily number. Busy nights add more. Hours vary.",
        "Do not multiply a daily number into a fake weekly salary. Compare the written included hours and callback to the work. Use the pay arcade and the calculator as directional tools. The signed terms are the source of truth.",
      ),
      S(
        "When STEMI locums fits",
        "It fits operators who still want primary PCI, who have current logs, and who can recover between blocks. It fits poorly if your burnout is the pager itself. Swapping employers without changing call design repeats the same week with a rental car.",
        "If you want STEMI without clinic, look at cath-lab-only language. If you want 1–2 weeks a month of mixed rounding, clinic, and 24-hour call, the Ohio job is the public example. Request a match either way with licenses and whether you take primary STEMI.",
      ),
    ],
    faqs: [
      faq(
        "Do all interventional locums include STEMI call?",
        "No. Some labs need scheduled PCI only. Require the call scope in writing before you travel.",
      ),
      faq(
        "Does a higher daily rate mean worse nights?",
        "Often, but not always. Read included hours, backup, and post-call rules. A lower number with real backup can be the better week.",
      ),
      faq(
        "What should I bring for STEMI privileging?",
        "Recent PCI and STEMI logs, references who can speak to independent operator work, licenses, and a clean malpractice history.",
      ),
      faq(
        "Can I take STEMI locums while employed?",
        "Only if the employed contract allows moonlighting and you can recover. Stacking two pagers is how people get hurt.",
      ),
    ],
  },
  {
    slug: "weekend-interventional-cardiology-locums",
    pageDef: {
      category: "career",
      h1: "Weekend Interventional Cardiology Locums",
      title: "Weekend Interventional Cardiology Locums | STEMI Blocks",
      description:
        "Weekend interventional locums for employed cardiologists: what a Friday–Sunday STEMI block actually includes, and when it is a bad add-on to a full employed week.",
      topic: "weekend interventional cardiology locums",
      keywords: [
        "weekend interventional locums",
        "weekend STEMI locum",
        "cardiologist weekend moonlighting",
      ],
    },
    directAnswer:
      "Weekend interventional locums are short STEMI or lab blocks, usually Friday through Sunday, used by employed interventionalists who want extra days without quitting. They only work when moonlighting rules, recovery, and written call are real. A weekend is two or three daily guarantees, not a made-up weekly salary.",
    intro:
      "Weekend IC locums look efficient on a calendar. They are still nights, activations, and travel. Treat them as designed extra work, not free money on top of an already full employed STEMI panel.",
    relatedLinks: coreLinks([
      { href: "/guides/moonlighting-as-an-employed-interventional-cardiologist", title: "Employed IC moonlighting" },
    ]),
    sections: [
      S(
        "What a weekend IC block usually is",
        "Most weekend interventional locums are call coverage: primary or backup STEMI, plus any add-on cases the lab runs while you are there. Some include Saturday scheduled PCI. Few are clinic. If a weekend listing adds Monday clinic, it is no longer a weekend block.",
        "Travel has to fit the first activation. A Friday afternoon flight into a rural PCI hospital can work. A Sunday-night flight home after a 3 a.m. case is the hidden cost. Ask where you sleep relative to the lab.",
      ),
      S(
        "Pay is days, not a weekend salary",
        "Count the days you are actually covering. A weekend is two or three of those days. The interventional starting band on the pay page is $3,200–$3,500 a day for many attendings. Public one-off posts can sit under that. Compare written included hours, not a screenshot of someone else’s weekend.",
        "Callback after the included block is how busy nights add money. Quiet nights do not. If you need the busy-night number to make the trip worth it, you are gambling on activations. That is a bad reason to fly.",
      ),
      S(
        "Moonlighting rules come first",
        "Your employed contract may forbid outside clinical work, restrict radius, or require written permission. Some groups allow weekend locums if they do not compete. Some will fire you. Read the clause before you inquire.",
        "Fatigue is the other clause nobody writes. An employed STEMI week plus a locum weekend is two jobs. If you are already tired, this is not a career strategy. It is a way to make a mistake in a cath lab that is not your own.",
      ),
      S(
        "When weekends are the wrong product",
        "If you want recoverability, a one-week-a-month block with days off around it is often cleaner than six scattered weekends. If you want no clinic, ask for cath-lab-only language. If you want 1–2 weeks a month of mixed work, Ohio is the public mixed example.",
        "Weekends fit people with a quiet employed schedule, nearby licenses, and a spouse or partners who can absorb the absence. They fit poorly as a burnout patch.",
      ),
      S(
        "How we match weekend IC work",
        "Tell us licenses, IMLC eligibility, whether you take primary STEMI, and which weekends you can actually leave town. We present live blocks that fit those constraints, including exclusive coverage that is not on the public board.",
        "Do not send a CV into a general job blast. Interventional weekends fail when the hospital needed a weekday mixed IC and you needed 48 hours of lab only.",
      ),
    ],
    faqs: [
      faq(
        "How many days is a locum weekend?",
        "Usually two or three daily coverage days. Confirm Friday start and Monday handoff in writing.",
      ),
      faq(
        "Will the hospital pay travel for a weekend?",
        "Often, but not always. Airfare, rental, and lodging should be in the terms. A short drive from a compact-license state is simpler than a coast-to-coast weekend.",
      ),
      faq(
        "Can I do weekends in a non-compact state?",
        "Only if you already hold that license or can wait out a full application. IMLC does not create a 10-day California license.",
      ),
      faq(
        "Are weekend IC locums less intense than weekday blocks?",
        "Nights can be more intense. There is simply less clinic. Intensity follows activations, not the day of the week.",
      ),
    ],
  },
  {
    slug: "one-week-a-month-interventional-locums",
    pageDef: {
      category: "career",
      h1: "One Week a Month Interventional Locums",
      title: "One Week a Month Interventional Locums | Recurring Blocks",
      description:
        "Recurring 1–2 week interventional locum blocks: how privileging, STEMI panels, and mixed clinic versus lab-only schedules change a one-week-a-month model.",
      topic: "one week a month interventional locums",
      keywords: [
        "one week a month locum cardiologist",
        "1-2 weeks month interventional locum",
        "recurring IC locum blocks",
      ],
    },
    directAnswer:
      "One week a month interventional locums are recurring blocks, often 1–2 weeks, that make privileging worth the unpaid setup. The week can be mixed rounding and clinic plus call, or cath-lab-only. Confirm which, then confirm STEMI rules. This is not an inpatient general cardiology shift job.",
    intro:
      "Recurring IC weeks work when the hospital sees the same operator and you see a calendar you can keep. They fail when the “week” is actually an employed schedule compressed into seven days, or when people confuse interventional weeks with general inpatient shift counts.",
    relatedLinks: coreLinks([{ href: "/guides/ohio-interventional-cardiology-locums", title: "Ohio IC locums" }]),
    sections: [
      S(
        "Why recurrence matters more in the cath lab",
        "PCI privileging, FPPE, and STEMI pathways have a fixed cost. A one-off week can be a bad trade if the file takes six weeks. A recurring 1–2 weeks a month amortizes that cost. Hospitals also prefer a known operator on the activation list.",
        "That is the design behind a current Ohio opening: one to two weeks per month, ASAP if credentialing allows, 24-hour call, morning rounding and procedures, afternoon clinic. It is a mixed interventional week, not lab-only, and not a 7–10 shift general inpatient roster.",
      ),
      S(
        "Do not confuse this with inpatient general locums",
        "Northeastern Kansas inpatient cardiology is a different job: 7–10 hospital shifts a month, rounding and consults split among three cardiologists, no interventional requirement. Do not use that page as an IC model. Interventional weeks are lab privilege plus whatever clinic the contract adds.",
        "If you want shift-count hospitalist-style cardiology, say so. If you want PCI weeks, say so. Mixing the two in a search wastes everyone’s time and produces the wrong match.",
      ),
      S(
        "What one week actually contains",
        "Ask for the daily skeleton: first-case time, clinic sessions, night call, weekend overlap, and who covers when you leave. A “week” that starts Thursday and includes two weekends is not the same as Monday–Friday lab.",
        "Also ask how the panel is split. Three interventionalists sharing STEMI is different from you owning the list for seven days. Census and activation math should be numbers, not adjectives.",
      ),
      S(
        "Licensing for a monthly cadence",
        "A monthly block in a compact state is why IMLC exists for locums. Get the license once, keep it active, and return. A monthly block in California is a different bet: full license, then privileging, then you hope the VMS order is still live.",
        "Ohio and Kentucky are compact examples we can discuss publicly. Sacramento-area interventional coverage is the cautionary geography. Sequence licenses toward the cadence you can actually repeat.",
      ),
      S(
        "How to request this shape of work",
        "Tell us you want recurring 1–2 week interventional blocks. Name whether clinic is acceptable. Name primary STEMI yes or no. List licenses. We will not pretend a general inpatient shift job is an IC week.",
        "If Ohio’s mixed schedule is close, read that job. If you refuse clinic, read the Kentucky cath-lab-only job and the lab-only guide. Then submit the form so we can check exclusive blocks with the same cadence.",
      ),
    ],
    faqs: [
      faq(
        "Is 7–10 shifts a month the same as one IC week?",
        "No. Shift-count inpatient cardiology is a different specialty shape. Interventional weeks are defined by lab privileges and call, not a hospitalist roster.",
      ),
      faq(
        "Is one week a month enough to justify privileging?",
        "Often yes if it recurs. A single isolated week may not be worth a six-week file. Ask us to look for ongoing coverage.",
      ),
      faq(
        "Can the week be lab-only?",
        "Yes, when the client writes it that way. Mixed rounding and clinic is more common. Ask which one you are being presented.",
      ),
      faq(
        "Do I have to take the same week every month?",
        "Recurring sites like a pattern, but dates still get scheduled. Share the weeks you can hold.",
      ),
    ],
  },
  {
    slug: "pci-logs-and-privileging-for-locums",
    pageDef: {
      category: "career",
      h1: "PCI Logs and Privileging for Interventional Locums",
      title: "PCI Logs and Privileging for Interventional Locums",
      description:
        "What hospitals ask interventional locums for: recent PCI and STEMI logs, FPPE, temporary privileges, and why a license is not a start date.",
      topic: "PCI logs privileging locums",
      keywords: [
        "PCI logs locum",
        "interventional cardiology privileging",
        "STEMI case logs locum",
      ],
    },
    directAnswer:
      "Interventional locum start dates wait on privileging, not on a signed rate. Hospitals want recent PCI and STEMI logs that match the requested procedures, references, and a complete file. Temporary privileges exist at some sites and are not a plan you should bet income on.",
    intro:
      "The fastest way to miss an ASAP IC block is a thin log. Recruiters can talk about compact licenses all day. The credentials committee still counts cases. Build the file before you want the week.",
    relatedLinks: coreLinks([{ href: "/guides/stemi-call-locums", title: "STEMI call locums" }]),
    sections: [
      S(
        "Logs have to match the privileges you want",
        "If you want independent primary PCI, the log should show it. Diagnostic-heavy years, supervised cases, or a long stretch of clinic-only work will get a narrower privilege set—or a no. Structural, peripheral, and MCS work are usually separate asks with separate numbers.",
        "Bring a clean, dated case list. Hospitals differ on lookback windows. Twenty-four months of honest volume beats a lifetime total you cannot defend. If volume dipped, say so and ask what proctoring the site uses.",
      ),
      S(
        "License, credentialing, privileging, then the lab",
        "A state license proves the board knows you. Credentialing verifies identity, training, and malpractice. Privileging defines what you may do in that cath lab. Temporary privileges can overlap those steps at some hospitals. They are not universal, and they are not implied by IMLC.",
        "Work backward from the start date the hospital wants. Compact licenses can shorten the board step in Kentucky or Ohio. They do nothing for a committee that is waiting on references. Use the credentialing timeline tool as a planning aid, then ask for the site’s real range.",
      ),
      S(
        "What “ASAP” means in interventional locums",
        "ASAP means as soon as the file can clear, not as soon as you can fly. The Ohio IC job is written that way. If your logs, licenses, and references are ready, an ASAP week is possible. If they are in a box in a garage, it is not.",
        "Do not resign an employed job on a verbal ASAP. Plan income on documented approval. Orientation, EHR, and STEMI pathway walkthrough still sit after privileges.",
      ),
      S(
        "FPPE, proctoring, and first-week reality",
        "Many labs will watch the first cases even when your log is strong. That is normal. It becomes a problem when nobody told you, the proctor is on vacation, or the first-week schedule assumes you are already on the STEMI list.",
        "Ask who proctors, how many cases, and whether you are on primary call during FPPE. A week of scheduled PCI while they watch you is a different job than seven nights of unsupervised activations.",
      ),
      S(
        "Build the file once, reuse it",
        "Keep licenses, board letters, malpractice face sheets, procedure logs, and three references who answer the phone. Update the log quarterly if you are locums-primary. Employed operators should export cases before they leave a hospital, not after the badge is shut off.",
        "When you request a match, attach or be ready to send that packet. Exclusive IC blocks move to the person whose file is complete. The public job pages are only part of the book.",
      ),
    ],
    faqs: [
      faq(
        "How recent do PCI logs need to be?",
        "Hospitals set the window. Have the last 12–24 months ready, with STEMI and elective PCI separated if you can.",
      ),
      faq(
        "Can temporary privileges get me on call next week?",
        "Sometimes, if the hospital uses them and your file is complete. Never treat them as a guaranteed start.",
      ),
      faq(
        "What if my structural volume is low?",
        "Ask for PCI and STEMI privileges only. Do not request TAVR or Watchman you cannot support with logs.",
      ),
      faq(
        "Does IMLC replace privileging?",
        "No. Compact speed is a state license pathway. The cath lab still privileges you separately.",
      ),
    ],
  },
  {
    slug: "structural-vs-pci-locums",
    pageDef: {
      category: "comparison",
      h1: "Structural vs PCI Locums",
      title: "Structural vs PCI Locums | TAVR, Watchman, STEMI",
      description:
        "How bread-and-butter PCI and STEMI locums differ from structural heart locums. Most IC locum demand is PCI and call, not TAVR. Do not assume structural privileges follow PCI.",
      topic: "structural vs PCI locums",
      keywords: [
        "structural heart locum vs PCI",
        "TAVR locum cardiologist",
        "PCI locum jobs",
      ],
    },
    directAnswer:
      "Most interventional locum demand is diagnostic cath, PCI, and STEMI call. Structural heart locums—TAVR, Watchman, MitraClip, and similar—are program-specific, separately privileged, and much rarer. PCI privileges do not automatically include structural work.",
    intro:
      "If you are a high-volume structural operator, say so. If you are a bread-and-butter PCI operator, that is the work we can actually present most weeks. Mixing the two on a CV without logs wastes a credentials committee’s time.",
    relatedLinks: coreLinks([{ href: "/locum-jobs/cardiology/structural-heart", title: "Structural heart locum jobs" }]),
    sections: [
      S(
        "PCI locums are the default IC product",
        "Community and regional hospitals hire locum interventionalists to keep a STEMI panel and a scheduled lab alive. The work is PCI, diagnostics, and call. That is the Kentucky lab-only shape and the Ohio mixed shape. It is also most of the exclusive book we cannot post.",
        "This is not a lesser job. Independent primary PCI with honest backup is the scarce skill. If that is what you do, own it. Do not dress a PCI week as a structural week to chase a fantasy rate.",
      ),
      S(
        "Structural locums are a different privilege set",
        "TAVR, left-atrial appendage occlusion, MitraClip, and PFO programs have heart-team meetings, device inventory, anesthesia, and volume rules. Hospitals privilege those procedures separately. A PCI log does not get you on a TAVR list.",
        "We do not invent structural openings. If a site needs structural coverage, we will say so and ask for matching logs. If you want structural locums and we do not have them, we will tell you rather than rebrand a STEMI week.",
      ),
      S(
        "Why the pay conversation gets confused",
        "Skills can move a written daily guarantee. Impella, MCS, or structural experience matter when that hospital needs that mix. They do not magically apply to a community PCI lab that does not do TAVR.",
        "The $3,200–$3,500 starting band on the pay page is for many attending interventionalists doing the work in front of them. Structural scarcity can sit higher where the program is real. Compare the program, not a forum screenshot.",
      ),
      S(
        "How to present yourself without wasting a week",
        "List PCI and STEMI volume first. List structural procedures as a separate line with dates. List whether you will take primary STEMI. Labs that need a STEMI operator will ignore a CV that only talks about valves.",
        "If you will not take STEMI and only want structural days, say that too. The match set gets smaller. Honesty is faster than a declined privilege request on day four.",
      ),
      S(
        "Where to go next on this site",
        "PCI and STEMI operators should read the IC hub, the STEMI call guide, and the live Kentucky or Ohio jobs. Operators who also do structural work can read the structural heart specialty hub without treating it as a hidden TAVR job board.",
        "Request a match with the procedures you actually want this quarter. Exclusive coverage still has to match the lab that exists.",
      ),
    ],
    faqs: [
      faq(
        "Do PCI locums include TAVR?",
        "Not unless the hospital privileges it and the contract says so. Assume PCI and STEMI only until you see the list.",
      ),
      faq(
        "Are structural locums more lucrative?",
        "They can be where the program is real. Most weeks we present are PCI and call. Do not plan income on structural scarcity.",
      ),
      faq(
        "Can I refuse STEMI and only do structural?",
        "You can ask. The number of matching labs is small. We will not relabel a STEMI opening to keep you in process.",
      ),
      faq(
        "Should my CV lead with structural fellowships?",
        "Lead with the work you will do next month. Put structural in a clearly separated skills section with logs.",
      ),
    ],
  },
  {
    slug: "moonlighting-as-an-employed-interventional-cardiologist",
    pageDef: {
      category: "career",
      h1: "Moonlighting as an Employed Interventional Cardiologist",
      title: "Moonlighting as an Employed Interventional Cardiologist",
      description:
        "How employed interventional cardiologists add locum STEMI or lab weeks without violating moonlighting clauses, wrecking recovery, or recreating a second full-time job.",
      topic: "employed interventional cardiologist moonlighting",
      keywords: [
        "employed interventional cardiologist moonlighting",
        "IC locum moonlighting",
        "STEMI moonlighting locums",
      ],
    },
    directAnswer:
      "Employed interventionalists can add locum weeks when the contract allows outside work, licenses are ready, and recovery is real. Moonlighting is extra designed blocks—not a second STEMI panel on top of an already brutal employed schedule.",
    intro:
      "The people who do this well treat locums as a second product with its own rules. The people who do it poorly stack pagers, skip the moonlighting clause, and show up tired in someone else’s lab.",
    relatedLinks: coreLinks([
      { href: "/moonlighting-physician-jobs", title: "Cardiologist moonlighting jobs" },
      { href: "/guides/weekend-interventional-cardiology-locums", title: "Weekend IC locums" },
    ]),
    sections: [
      S(
        "Read the employed clause before you inquire",
        "Moonlighting language varies: banned, allowed with written permission, allowed outside a radius, or silent. Silent is not permission. Get the answer in writing from your group or hospital counsel, not from a hallway rumor.",
        "Non-competes and “conflict of interest” clauses can block nearby PCI hospitals even when moonlighting is otherwise allowed. A compact-license state two flights away is often cleaner than the competing lab across town.",
      ),
      S(
        "Pick a shape of extra work that is actually extra",
        "Cath-lab-only weeks add procedures without another clinic inbox. Weekend STEMI blocks add nights. One week a month mixed IC adds rounding and clinic. Those are different loads. Match the extra work to the hole in your employed life, not to the highest daily number.",
        "If your employed job already includes primary STEMI, adding locum STEMI is rarely a wellness plan. If your employed job is weekday lab plus light call, a compact-state weekend can make sense.",
      ),
      S(
        "Licenses are the gating item, not motivation",
        "Employed operators often hold one state. IMLC can add a second compact license while you keep the day job. That is the entire point of the compact for moonlighting interventionalists. California and other non-compact boards usually are not a side-hustle timeline.",
        "Start the compact application while you are still employed and logs are easy to export. Do not wait until you are angry at a partner meeting.",
      ),
      S(
        "Recovery is part of the ethics",
        "A locum hospital is trusting you with activations. If you landed at 11 p.m. after a full employed week, you are not doing them a favor. Build travel and sleep into the plan. Decline weeks that collide with employed call.",
        "We will ask about employed call when we match you. That is not nosy. That is how we avoid presenting you into a week you cannot safely work.",
      ),
      S(
        "What to send on the inquiry",
        "Specialty: interventional. Employed: yes. Moonlighting allowed: yes/no/unsure. Licenses and IMLC eligibility. Primary STEMI: yes/no. Dates you can leave town. We come back with blocks that fit, including exclusive coverage, or we tell you nothing fits this quarter.",
        "Public examples: Ohio’s 1–2 weeks a month mixed IC, Kentucky’s cath-lab-only job. Neither is a promise that your employed group will bless them. The contract at home still wins.",
      ),
    ],
    faqs: [
      faq(
        "Will Locum Career Hub contact my employer?",
        "Not to ask permission. You are responsible for moonlighting rules. We recruit you as an independent physician for hospital coverage.",
      ),
      faq(
        "Is 1099 locum pay a problem while I am W-2 employed?",
        "It can be a tax and benefits question for your CPA, not a reason to hide the work. This page is not tax advice.",
      ),
      faq(
        "Can I moonlight in the same state I am employed?",
        "Only if the contract allows it and the hospitals are not in conflict. Many employed IC physicians use a second compact state instead.",
      ),
      faq(
        "What if I am unsure about the moonlighting clause?",
        "Say unsure on the form. We can still talk about licenses and dates. Do not accept a week until you have a written answer from your group.",
      ),
    ],
  },
  {
    slug: "kentucky-interventional-cardiology-locums",
    pageDef: {
      category: "subspecialty",
      h1: "Kentucky Interventional Cardiology Locums",
      title: "Kentucky Interventional Cardiology Locums | Cath Lab & IMLC",
      description:
        "Kentucky interventional locums: cath-lab-only coverage, IMLC licensing, and PCI hospitals across Louisville, Lexington, and regional STEMI networks. Not a 50-city job list.",
      topic: "Kentucky interventional cardiology locums",
      keywords: [
        "Kentucky interventional cardiology locum",
        "Kentucky cath lab locum",
        "IMLC Kentucky interventional",
      ],
      geoLabel: "Kentucky",
      stateSlug: "kentucky",
    },
    directAnswer:
      "Kentucky interventional locums are currently led by a cath-lab-only opening with no general cardiology clinic, rounding, or consult census. An active Kentucky license is fastest; IMLC-eligible physicians can add a Kentucky license through the compact. Nearby PCI hospitals are context, not extra invented jobs.",
    intro:
      "Kentucky is a compact state, which is why out-of-state interventionalists actually ask about it. The live public job we can discuss is lab-only. Regional STEMI hospitals from Louisville through Lexington and smaller PCI programs exist around that work. We do not post a fake opening at each of them.",
    relatedLinks: coreLinks([
      { href: "/locum-tenens-jobs/kentucky/interventional-cardiology", title: "Kentucky IC locum jobs" },
      { href: "/guides/cath-lab-only-locum-jobs", title: "Cath-lab-only IC locums" },
    ]),
    sections: [
      S(
        "The live job, not a state brochure",
        "The featured Kentucky assignment is interventional locum work that stays in the cath lab. No clinic panel, no rounding list, no consult census. Confirm STEMI versus scheduled PCI in writing. Posted October 22, 2026. Ask whether it is still available before you rearrange a month.",
        "That scope is the reason the page exists. Mixed IC weeks exist in Kentucky too, but we will not pretend every hospital in the state is hiring a locum this week.",
      ),
      S(
        "Hospitals in the vicinity, as geography",
        "Louisville and Lexington sit on the main PCI corridors. Regional STEMI hospitals in western, southern, and eastern Kentucky feed those corridors. Community labs in that vicinity are why a compact-license operator can often find work without living in the state.",
        "None of those systems is named here as a listing. Vendor and client rules withhold facilities until we verify the order and your eligibility. If a hospital in that vicinity needs coverage, it shows up as a match, not as a directory of logos.",
      ),
      S(
        "Why IMLC matters in Kentucky specifically",
        "Kentucky participates in the Interstate Medical Licensure Compact. Eligible physicians can obtain a separate Kentucky license through that pathway. It is still a Kentucky license. It is not a free pass onto a STEMI panel.",
        "If you already hold KY, privileging and logs are the remaining gate. If you do not, start the compact process and send a match request in parallel. Use the IMLC calculator if you are unsure about eligibility.",
      ),
      S(
        "Who this market is for",
        "Interventionalists who want the lab without general cards. Employed operators whose moonlighting rules allow extra lab weeks. Locums-primary PCI operators who will keep a Kentucky license active. It is a weak fit if you need structural-only days or refuse all call without reading the written STEMI rules.",
        "Compare Ohio if you want mixed rounding, clinic, and 24-hour call on a 1–2 week cadence. Compare Sacramento-area coverage only if you already understand California is not compact.",
      ),
      S(
        "How to be presented",
        "Submit the form from the Kentucky job or from this guide. Specialty interventional. Kentucky license or IMLC eligibility. PCI logs ready. STEMI comfort stated. We follow up when the lab-only block—or exclusive Kentucky coverage—is still live.",
        "Do not expect a city-by-city job grid. That pattern already failed in search. Unique Kentucky IC copy plus a real opening is the honest version of this market.",
      ),
    ],
    faqs: [
      faq(
        "Do I need a Kentucky license to inquire?",
        "No. IMLC-eligible physicians can be discussed while a Kentucky license is in process. An active KY license is still the fastest start.",
      ),
      faq(
        "Is every Kentucky PCI hospital hiring locums?",
        "No. This page explains the market and one live lab-only job. Other coverage is matched privately when it is real.",
      ),
      faq(
        "Will I do clinic in Kentucky?",
        "Not on the featured cath-lab-only job. Other Kentucky IC work might. Ask for the written scope every time.",
      ),
      faq(
        "Is Kentucky faster than Ohio for out-of-state operators?",
        "Both are compact states for many eligible physicians. Speed still depends on your file and the hospital’s committee, not the slogan.",
      ),
    ],
  },
  {
    slug: "ohio-interventional-cardiology-locums",
    pageDef: {
      category: "subspecialty",
      h1: "Ohio Interventional Cardiology Locums",
      title: "Ohio Interventional Cardiology Locums | 1–2 Weeks/Month",
      description:
        "Ohio interventional locums: a live 1–2 week mixed IC block with 24-hour call, IMLC licensing, and PCI hospitals along Ohio STEMI networks. Not a statewide job mill.",
      topic: "Ohio interventional cardiology locums",
      keywords: [
        "Ohio interventional cardiology locum",
        "Ohio STEMI locum",
        "Ohio IC moonlighting",
      ],
      geoLabel: "Ohio",
      stateSlug: "ohio",
    },
    directAnswer:
      "Ohio interventional locums currently include an ASAP 1–2 weeks per month mixed assignment: rounding, procedures, afternoon clinic, and 24-hour call. Written pay on that job is a $3,200 guarantee for the first hours, then hourly callback. Ohio is IMLC-eligible for many physicians. Nearby PCI hospitals are context, not extra listings.",
    intro:
      "Ohio is a compact state with real interventional demand and one public job we can describe in detail. Treat the job as the job. Treat Cleveland-to-Cincinnati PCI geography as the map, not as fifty fake openings.",
    relatedLinks: coreLinks([
      { href: "/locum-tenens-jobs/ohio/interventional-cardiology", title: "Ohio IC locum jobs" },
      { href: "/guides/stemi-call-locums", title: "STEMI call locums" },
    ]),
    sections: [
      S(
        "The live mixed IC week",
        "The featured Ohio assignment is 1–2 weeks per month as soon as an eligible physician can start. Days begin at 7 a.m. with rounding, consults, and procedures, then afternoon clinic, plus 24-hour call. Current written pay is $3,200 guaranteed for 0–4 hours and $400 per hour of callback. Quiet nights stay near the daily number. Busy nights add more.",
        "That is mixed interventional work, not cath-lab-only. If you refuse clinic and rounding, this is the wrong public example. Read Kentucky instead.",
      ),
      S(
        "STEMI networks in the vicinity",
        "Ohio’s PCI hospitals sit on several corridors: northeast, central, southwest, and smaller community STEMI sites between them. Those hospitals are why a monthly Ohio block can be a durable locums habit for someone who will keep an Ohio license.",
        "We will not name a system here as if it were hiring you tomorrow. Facility identity comes after a verified order and your eligibility. Geography is for orientation: you can fly a compact-state week without pretending every cath lab in Ohio is open.",
      ),
      S(
        "Licensing and ASAP reality",
        "An Ohio license is the fastest path. Many out-of-state interventionalists can use IMLC to obtain a separate Ohio license. Compact speed is not hospital privileges. ASAP on the job page means as soon as the file can clear.",
        "If you already hold Ohio, send logs and dates. If you do not, start compact paperwork and inquire anyway so we know you exist when the committee calendar opens.",
      ),
      S(
        "Who should take Ohio-shaped weeks",
        "Employed interventionalists whose contracts allow 1–2 weeks a month away. Locums-primary operators who accept mixed clinic plus call. People who want a written daily guarantee and callback, not a mystery rate.",
        "Skip this market if you need lab-only days, structural-only days, or a no-call scheduled PCI vacation. Those are different products.",
      ),
      S(
        "Cluster, not a duplicate state shell",
        "The state specialty URL already exists. This guide exists to explain the live mixed job, IMLC, and the difference between Ohio weeks and Kentucky lab-only weeks. It is not another thin /locum-tenens-jobs copy.",
        "Request a match from the Ohio job page. Read the pay arcade if you want the $3,200 band in context. Read the STEMI call guide if nights are the part you need to design.",
      ),
    ],
    faqs: [
      faq(
        "Is the $3,200 Ohio rate the market?",
        "It is the written guarantee on that job for the first block of hours, plus callback. It is not a nationwide salary. Compare terms, not headlines.",
      ),
      faq(
        "Does Ohio IC locums include clinic?",
        "The featured job does: afternoon clinic plus morning rounding and procedures. Lab-only is a different scope, currently illustrated in Kentucky.",
      ),
      faq(
        "Do I need an Ohio license to inquire?",
        "No, but an Ohio license or a realistic IMLC path is required to start. Inquire while paperwork moves if the start date allows it.",
      ),
      faq(
        "Are Cleveland Clinic or Ohio State listed here as jobs?",
        "No. Large Ohio systems are geographic context. Listings are verified openings, not a hospital directory.",
      ),
    ],
  },
  {
    slug: "sacramento-interventional-cardiology-locums",
    pageDef: {
      category: "subspecialty",
      h1: "Sacramento-Area Interventional Cardiology Locums",
      title: "Sacramento Interventional Cardiology Locums | Full CA License",
      description:
        "Sacramento-area interventional locums through a vendor order. California is not an IMLC shortcut. PCI hospitals along the I-80 corridor are context, not named listings.",
      topic: "Sacramento interventional cardiology locums",
      keywords: [
        "Sacramento interventional cardiology locum",
        "California IC locum license",
        "Northern California STEMI locum",
      ],
      geoLabel: "Sacramento, California",
      stateSlug: "california",
    },
    directAnswer:
      "Sacramento-area interventional locums currently include a vendor-system opening. Details are confirmed privately because VMS orders withhold the facility. California licensing is a full-license process for most out-of-state physicians—not an IMLC shortcut.",
    intro:
      "Northern California PCI work is real. Compact mythology is not. If you already hold a California license and take STEMI, this geography is worth a conversation. If you hoped IMLC would unlock Sacramento next month, it will not.",
    relatedLinks: coreLinks([
      { href: SAC, title: "Sacramento-area IC locum listing" },
      { href: "/locum-tenens-jobs/california/interventional-cardiology", title: "California IC locum jobs" },
    ]),
    sections: [
      S(
        "The live listing is a VMS row",
        "The public Sacramento-area interventional job is vendor coverage. Setting, schedule, and STEMI rules are confirmed with a consultant after we know you are eligible. That is why the page does not invent a hospital name or a daily rate.",
        "It is a different California geography than northwestern California direct call and San Joaquin Valley interventional VMS coverage. Same state, different order. Ask which one you are being discussed for.",
      ),
      S(
        "Hospitals in the vicinity, not a directory",
        "Sacramento sits on an I-80 PCI corridor with community and regional STEMI hospitals in the metro and the valley edge. Those labs are why locum interventionalists with a California license get asked about this market.",
        "We will not list Sutter, UC, Kaiser, or Dignity as if they had posted a job on this page. Locum Career Hub is not those employers. Facility identity waits on a live order.",
      ),
      S(
        "California licensing is the whole plot",
        "California is not an IMLC pathway for most physicians. An existing CA license—or a realistic full-license timeline—matters more than compact speed. Do not burn a week of hope on Sacramento if your only licenses are compact-state cards.",
        "If you hold CA and want extra STEMI or lab weeks, say so. If you are IMLC-eligible and want faster states, Kentucky and Ohio are the public compact examples. Sequence geography to the board you can actually finish.",
      ),
      S(
        "Who should inquire anyway",
        "California-licensed independent PCI operators. People already privileging in Northern California who can add a locum week. Operators who understand VMS opacity and will wait for a consultant to confirm the order is live.",
        "Skip this page as a primary target if you need a start in 30 days and you do not hold CA. Use the IMLC guide and compact-state jobs instead.",
      ),
      S(
        "How a match works here",
        "Submit from the Sacramento featured job. Tell us you have a California license or that you understand the full-license lag. STEMI comfort and recent PCI logs still apply. We check whether the vendor order is open before we talk like it is a start date.",
        "Exclusive Northern California IC coverage, if it exists that week, still will not be posted with a hospital logo. The form is the path.",
      ),
    ],
    faqs: [
      faq(
        "Can IMLC get me a California interventional locum quickly?",
        "Usually no. Treat California as a full medical license. Compact states are the faster IC path for most out-of-state operators.",
      ),
      faq(
        "Why isn’t the Sacramento hospital named?",
        "It is a vendor listing. The facility is withheld until a recruiter verifies the live order and your eligibility.",
      ),
      faq(
        "Is this the same as other California IC rows?",
        "No. Sacramento-area, northwestern California, and San Joaquin Valley interventional coverage are different geographies and orders.",
      ),
      faq(
        "Should I start a CA application just for this job?",
        "Only if you want California locums as a strategy, not as a reaction to one VMS row. Confirm the order is still live before you pay a board.",
      ),
    ],
  },
  {
    slug: "rural-stemi-coverage-locums",
    pageDef: {
      category: "subspecialty",
      h1: "Rural STEMI Coverage Locums",
      title: "Rural STEMI Coverage Locums | Community PCI Hospitals",
      description:
        "Rural and community STEMI locums for interventional cardiologists: solo call, transfer agreements, surgical backup honesty, and why these weeks pay attention as much as money.",
      topic: "rural STEMI locums",
      keywords: [
        "rural STEMI locum",
        "community PCI locum",
        "rural interventional cardiology locum",
      ],
    },
    directAnswer:
      "Rural STEMI locums are interventional blocks at community PCI hospitals where you may be the primary operator with limited on-site backup. Transfer agreements, device inventory, and activation honesty matter more than a city name. This is not a 50-state list of invented rural jobs.",
    intro:
      "Community STEMI coverage is where a lot of real locum demand lives. It is also where a vague brochure becomes dangerous. If the lab cannot describe backup, you do not have a rural adventure. You have an undefined night.",
    relatedLinks: coreLinks([
      { href: "/guides/stemi-call-locums", title: "STEMI call locums" },
      { href: "/guides/pci-logs-and-privileging-for-locums", title: "PCI logs and privileging" },
    ]),
    sections: [
      S(
        "What rural PCI locums usually look like",
        "A community hospital with a cath lab, a STEMI camera, a small partner panel or a locum filling a gap, and a transfer relationship to a larger center. Days may include scheduled diagnostics and PCI. Nights are activations. Clinic may or may not be attached. Ask.",
        "You might be one of two operators. You might be the only interventionalist in the county for a week. That is a different malpractice and fatigue conversation than a three-person urban panel. Get the count.",
      ),
      S(
        "Backup has to be a protocol, not a vibe",
        "Ask where surgical backup lives, how long a transfer takes, what MCS is on the shelf, and who comes in for a crash. A well-run rural STEMI program with honest limits is excellent locum work. A program that markets itself as a shock center without the inventory is not.",
        "You are allowed to decline. Rural does not mean unsafe, and it does not mean you accept undefined pathways to be a team player.",
      ),
      S(
        "Licensing and geography without city shells",
        "Rural STEMI demand shows up in compact states and in non-compact states. Compact licenses make a last-minute community week more realistic. Non-compact rural weeks require a license you already hold.",
        "We will not generate a thin page for every rural PCI hospital in America. That already failed as city shells. If you want community STEMI work, request a match with the states you will actually license and whether you will take solo primary call.",
      ),
      S(
        "Pay follows nights and scarcity, not romance",
        "Community STEMI weeks can sit in or above the usual IC daily band because the nights are real and the operator list is short. They can also sit lower when the lab is quiet and the hospital is stretching a budget. Read included hours and callback. Do not romanticize a grain silo into a raise.",
        "Compare offers the same way you would in Ohio or Kentucky: written activation, backup, included hours, travel, and whether clinic is bolted on.",
      ),
      S(
        "Who this work fits",
        "Independent PCI operators who still like primary STEMI. People who tolerate smaller towns for a defined week. Operators whose logs match community case mix—bread-and-butter PCI, not a structural showcase.",
        "It fits poorly if you need a hybrid OR, a full heart-team, or guaranteed surgical backup in the next room. Say those constraints on the form so we do not present you into a community lab that cannot offer them.",
      ),
    ],
    faqs: [
      faq(
        "Are rural STEMI locums less credentialed?",
        "No. Privileging still wants PCI and STEMI logs. Some rural labs are stricter because backup is thinner.",
      ),
      faq(
        "Will I be the only interventionalist?",
        "Sometimes. Ask how many operators share the list during your dates. Solo weeks must be a choice.",
      ),
      faq(
        "Do you post every rural PCI hospital?",
        "No. That would be thin city pages. We match community STEMI coverage when a live order exists.",
      ),
      faq(
        "Is rural STEMI the same as the Kansas inpatient job?",
        "No. The northeastern Kansas featured job is general inpatient cardiology, not interventional STEMI coverage.",
      ),
    ],
  },
];
