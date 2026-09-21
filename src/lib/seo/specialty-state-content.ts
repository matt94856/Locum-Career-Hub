import { getSpecialtyProfile } from "@/lib/seo/specialty-profiles";
import { getStateProfile } from "@/lib/seo/state-profiles";

export type ContentSection = { h2: string; paragraphs: string[] };

export type SpecialtyStatePageContent = {
  metaDescription: string;
  heroSubhead: string;
  directAnswer: string;
  intro: string;
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
};

function hashPair(stateSlug: string, specialtySlug: string): number {
  let h = 0;
  const s = `${stateSlug}:${specialtySlug}`;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(items: T[], seed: number, offset = 0): T {
  return items[(seed + offset) % items.length]!;
}

/** High-impression GSC combos that need unique depth beyond the Mad Libs template. */
function applyPrioritySpecialtyStateEnrichment(
  content: SpecialtyStatePageContent,
  input: {
    stateSlug: string;
    stateName: string;
    specialtySlug: string;
    specialtyName: string;
  },
): SpecialtyStatePageContent {
  if (input.stateSlug === "new-york" && input.specialtySlug === "electrophysiology") {
    return {
      ...content,
      heroSubhead: "Ablation, devices, and arrhythmia call — written before you start",
      directAnswer:
        "Electrophysiology locum tenens jobs in New York are contract-based EP lab and device-clinic blocks where a full NY license, facility privileging, and written ablation/device scope must align before your start date. Demand clusters in NYC, Buffalo, Rochester, and Albany systems, but fit depends on lab capabilities, device clinic load, and after-hours arrhythmia call—not headline weekly rates.",
      intro:
        "New York EP locums sit at the intersection of dense metro privileging timelines and high-acuity arrhythmia programs. Whether you want ablation-heavy weeks in NYC, device clinic coverage upstate, or hybrid travel blocks, insist on written EP lab staffing, mapping systems, and call boundaries before you accept.",
      sections: [
        {
          h2: "What NY electrophysiology locum assignments look like",
          paragraphs: [
            "Typical New York EP blocks mix ablation days, device implants/revisions, and device clinic or remote monitoring coverage. Confirm whether you cover inpatient arrhythmia consults, weekend device interrogations, and STEMI-adjacent backup when labs share cath resources.",
            "Metro programs (NYC, Long Island, Westchester) often move slower on privileging; regional systems in Buffalo, Rochester, and Albany can start faster when your case logs and device credentials are current.",
          ],
        },
        {
          h2: "Licensing and privileging for EP in New York",
          paragraphs: [
            "New York is not an IMLC shortcut for most physicians—plan a full NY license early if you are expanding footprint. EP privileges are separate: labs usually want ablation and device case volume documented within a recent window.",
            "Sequence license → hospital credentialing → EP lab privileges. Share target start dates with a cardiology recruiter so privileging owners and temporary privilege options are mapped before you book travel.",
          ],
        },
        {
          h2: "Pay drivers specific to NY EP locums",
          paragraphs: [
            "Rates move with ablation complexity, device mix, after-hours arrhythmia call, remote monitoring burden, and whether you cover solo vs backed-up lab days. Compare offers using the same variables—not weekly headlines alone.",
            "Use the EP cardiology locums pay guide and the cardiologist locums calculator to set a directional range before you negotiate stipends and call differentials.",
          ],
        },
        {
          h2: "Documentation to insist on before you sign",
          paragraphs: [
            "Require written EP lab capabilities (mapping systems, anesthesia support), device clinic volume, after-hours call frequency, backup layers, malpractice structure, and cancellation terms.",
            "Strong fit signals: clear ablation vs device split, protected reporting time for remote monitoring, and named credentialing owners with realistic NY timelines.",
          ],
        },
        {
          h2: "Avoidable pitfalls for EP locums in New York",
          paragraphs: [
            "Verbal promises about “light call” or “mostly devices” that never make the deal memo. Underestimating NY privileging lead time. Accepting shared-lab schedules without backup language when cath and EP compete for rooms.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Do I need a New York license before applying for EP locums?",
          a: "For on-site New York EP work, yes—plan a full NY license early. Privileging and payer enrollment are separate steps. Share licenses and target dates so we can map a realistic start.",
        },
        {
          q: "What should NY electrophysiology contracts specify?",
          a: "Ablation vs device scope, EP lab systems, device clinic or remote monitoring load, arrhythmia call frequency, backup coverage, malpractice, stipends, and cancellation terms—in writing.",
        },
        {
          q: "Where are EP locum jobs concentrated in New York?",
          a: "NYC and surrounding metros see steady EP lab demand; Buffalo, Rochester, and Albany systems often need leave coverage and device clinic support. We match site type to your boundaries.",
        },
        {
          q: "How is Locum Career Hub different from a national job board?",
          a: "You still choose what to pursue—but you get cardiologist-only context on NY licensing, EP lab fit, and credentialing pacing instead of generic blasts.",
        },
        ...content.faqs.slice(0, 2),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "tennessee" && input.specialtySlug === "electrophysiology") {
    return {
      ...content,
      heroSubhead: "Ablation, devices, and arrhythmia call across a high-intent EP market",
      directAnswer:
        "Electrophysiology locum tenens jobs in Tennessee are contract-based EP lab and device-clinic blocks. A Tennessee license, facility privileging, and written ablation versus device scope should be clear before you start. Demand sits in Nashville, Memphis, Knoxville, Chattanooga, and regional systems in between.",
      intro:
        "Tennessee EP locums often move faster than dense Northeast privileging, but lab capabilities still decide fit. Whether you want ablation-heavy weeks, device clinic coverage, or hybrid travel blocks, insist on mapping systems, anesthesia support, and after-hours arrhythmia call in writing.",
      sections: [
        {
          h2: "What Tennessee electrophysiology locum assignments look like",
          paragraphs: [
            "Typical Tennessee EP blocks mix ablation days, device implants or revisions, and device clinic or remote monitoring. Confirm inpatient arrhythmia consults, weekend interrogations, and whether you share cath resources with interventional coverage.",
            "Nashville and Memphis programs can be higher volume; Knoxville, Chattanooga, and community labs often need leave coverage with a clearer start once logs are current.",
          ],
        },
        {
          h2: "Licensing and privileging for EP in Tennessee",
          paragraphs: [
            "Tennessee is IMLC-eligible for many physicians, which can shorten the license path compared with New York. EP privileges are still separate: labs usually want recent ablation and device volume.",
            "Sequence license → hospital credentialing → EP lab privileges. Share target dates so temporary privilege options are mapped before you book travel.",
          ],
        },
        {
          h2: "Pay drivers specific to Tennessee EP locums",
          paragraphs: [
            "Rates move with ablation complexity, device mix, after-hours arrhythmia call, remote monitoring burden, and solo versus backed-up lab days. Compare offers using the same variables.",
            "Use the EP cardiology locums pay guide and the cardiologist locums calculator before you negotiate stipends and call differentials.",
          ],
        },
        {
          h2: "Who this market fits",
          paragraphs: [
            "Employed electrophysiologists adding income, locums-primary EP physicians, and new attendings with independent logs. Semi-retired EP physicians can sometimes drop ablation and keep devices—only if the lab agrees in writing.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Do I need a Tennessee license before applying for EP locums?",
          a: "For on-site Tennessee EP work, yes—or a realistic IMLC path with a documented start. Privileging and payer enrollment are separate. Share licenses and dates so we can map timing.",
        },
        {
          q: "What should Tennessee electrophysiology contracts specify?",
          a: "Ablation vs device scope, EP lab systems, device clinic or remote monitoring load, arrhythmia call frequency, backup coverage, malpractice, stipends, and cancellation terms—in writing.",
        },
        {
          q: "Where are EP locum jobs concentrated in Tennessee?",
          a: "Nashville and Memphis see steady EP lab demand; Knoxville, Chattanooga, and regional systems often need leave coverage and device clinic support.",
        },
        ...content.faqs.slice(0, 3),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "ohio" && input.specialtySlug === "interventional-cardiology") {
    return {
      ...content,
      heroSubhead: "STEMI, cath lab, and 1–2 weeks/month blocks with written pay",
      directAnswer:
        "Interventional cardiology locum tenens jobs in Ohio are cath-lab and STEMI-coverage blocks that require an Ohio license or a realistic IMLC path, current PCI logs, and written activation, backup, and call rules. We are currently recruiting a 1–2 weeks/month Ohio interventional locum with a $3,200 daily guarantee plus $400/hour callback.",
      intro:
        "Ohio interventional locums range from recurring part-month coverage to full STEMI call. Whether you want extra income around an employed job, locums-primary work, or a schedule change, insist on activation windows, surgical backup, and callback math in writing—not a verbal weekly headline.",
      sections: [
        {
          h2: "What Ohio interventional locum assignments look like",
          paragraphs: [
            "Typical blocks mix elective PCI, STEMI call, rounding, consults, and sometimes afternoon clinic. Confirm whether you are the primary STEMI operator, backup, or diagnostic-only coverage.",
            "One current opening is ASAP coverage, 1–2 weeks per month, 24-hour call, 7 a.m. rounding and procedures, then afternoon clinic. Pay is $3,200 guaranteed for 0–4 hours and $400/hour callback after—about $4,800 on an 8-hour day.",
          ],
        },
        {
          h2: "Licensing and privileging for interventional work in Ohio",
          paragraphs: [
            "Ohio is IMLC-eligible for many physicians. An existing Ohio license is still the fastest start. Cath-lab privileges need recent PCI volume; general cardiology privileges are not interchangeable.",
            "Sequence license → hospital credentialing → cath-lab privileges. Share target dates so temporary privilege options are mapped before you travel.",
          ],
        },
        {
          h2: "Pay drivers specific to Ohio interventional locums",
          paragraphs: [
            "Compare guaranteed coverage pay, callback or procedure pay, expected activations, and post-call relief. A $3,200/0–4 hour guarantee plus $400/hour callback is not the same as an all-in weekly number.",
            "See the interventional cardiology locums pay guide and the featured Ohio interventional locum for a live example, then run the cardiologist locums calculator.",
          ],
        },
        {
          h2: "Who this market fits",
          paragraphs: [
            "Ohio-licensed interventionalists, IMLC-eligible IC physicians, moonlighters with employer approval, and locums-primary operators who want 1–2 weeks/month instead of an always-on employed calendar.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Is there a current Ohio interventional locum opening?",
          a: "Yes—a 1–2 weeks/month interventional block with 24-hour call and a written daily guarantee. Open the featured Ohio interventional locum page to review schedule and pay, then inquire.",
        },
        {
          q: "Do Ohio interventional locums always include STEMI call?",
          a: "Not always. Some labs need elective PCI or diagnostic coverage without primary STEMI. Require call scope in writing before you accept.",
        },
        {
          q: "Can I moonlight interventional locums in Ohio while employed?",
          a: "Sometimes, with employer moonlighting approval, malpractice that covers PCI, and recovery rules so you are not stacking two STEMI schedules.",
        },
        ...content.faqs.slice(0, 3),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "new-jersey" && input.specialtySlug === "interventional-cardiology") {
    return {
      ...content,
      heroSubhead: "STEMI networks, cath lab backup, and written activation rules",
      directAnswer:
        "Interventional cardiology locum tenens jobs in New Jersey are cath-lab and STEMI-coverage blocks that require a NJ license, current PCI logs, and written activation, backup-surgery, and call rules before you start. Demand sits in the NYC-adjacent corridor, shore hospitals, and inland community PCI programs—not in a single metro.",
      intro:
        "New Jersey interventional locums are often about STEMI network density and how labs share backup, not headline weekly rates. Whether you want primary STEMI, diagnostic-only PCI, or weekend moonlighting around an employed job, insist on activation windows, transport patterns, and complication pathways in writing.",
      sections: [
        {
          h2: "What NJ interventional locum assignments look like",
          paragraphs: [
            "Typical blocks mix elective PCI days with STEMI call, inpatient rounding, and sometimes clinic. Confirm whether you are the primary STEMI operator, backup, or diagnostic-only coverage. Shore and community labs can be 24/7 activation with thinner surgical backup than academic NYC affiliates.",
            "Employed interventionalists adding income should treat NJ weekend STEMI as extra call—not light moonlighting—unless the contract excludes nights.",
          ],
        },
        {
          h2: "Licensing and privileging for interventional work in New Jersey",
          paragraphs: [
            "New Jersey is not an IMLC shortcut for most physicians. Plan a full NJ license early. Cath-lab privileges need recent PCI volume; hospitals will not treat general cardiology privileges as interchangeable.",
            "Sequence license → hospital credentialing → cath-lab privileges. Share target start dates so temporary privilege options are mapped before you book travel.",
          ],
        },
        {
          h2: "Pay drivers specific to NJ interventional locums",
          paragraphs: [
            "Rates move with STEMI frequency, night coverage, add-on emergency cases, and whether you cover a solo lab. Compare offers using the same variables—see the interventional cardiology locums pay guide.",
          ],
        },
        {
          h2: "Who this market fits",
          paragraphs: [
            "New interventional graduates need independent operator logs and a written STEMI vs diagnostic split. Semi-retired interventionalists can sometimes drop STEMI and keep diagnostic cath—only if the lab agrees in writing.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Do NJ interventional locums always include STEMI call?",
          a: "No. Some labs need elective PCI or diagnostic coverage without primary STEMI. Require call scope in writing before you accept.",
        },
        {
          q: "Can I moonlight interventional locums in New Jersey while employed?",
          a: "Sometimes, with employer moonlighting approval, malpractice that covers PCI, and recovery rules so you are not stacking two STEMI schedules.",
        },
        ...content.faqs.slice(0, 3),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "texas" && input.specialtySlug === "general-cardiology") {
    return {
      ...content,
      heroSubhead: "Consult, clinic, and imaging blocks across a high-volume market",
      directAnswer:
        "General cardiology locum tenens jobs in Texas are contract-based consult, clinic, and imaging blocks. Texas licensing, hospital privileging, and written census or clinic-panel rules should be clear before you start. Demand spans Houston, Dallas–Fort Worth, Austin, San Antonio, and large community systems in between.",
      intro:
        "Texas general cardiology locums work for new attendings sampling markets, employed cardiologists adding local income, locums-primary travel physicians, and late-career cardiologists who want clinic without STEMI. The useful split is inpatient consult vs outpatient clinic vs nuclear/echo—not “Texas cardiology” as one job.",
      sections: [
        {
          h2: "What Texas general cardiology locum assignments look like",
          paragraphs: [
            "Inpatient consult services, 7-on/7-off hospitalist-style cardiology, outpatient clinic panels, and imaging supervision all appear. Confirm ICU consults, weekend coverage, and whether nuclear or TEE is required.",
            "Metro systems can be slower to privilege; community hospitals often start faster when licenses and logs are current.",
          ],
        },
        {
          h2: "Licensing for general cardiology locums in Texas",
          paragraphs: [
            "Texas is IMLC-eligible for many physicians, which can shorten a license once the compact application is complete. Privileging and payer enrollment still take their own time. Do not treat compact eligibility as a two-week start.",
          ],
        },
        {
          h2: "Who this market fits",
          paragraphs: [
            "Fellowship graduates can use Texas as a locums-first sample of large-system vs community culture. Semi-retired cardiologists often prefer clinic or defined consult caps. Moonlighting works best as local or regional blocks so credentialing cost is worth the extra days.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Is Texas a good first locum state after cardiology fellowship?",
          a: "Often yes if you start licensing early. Compact eligibility can help, but hospital privileging still needs completed fellowship and documented consult or imaging scope.",
        },
        ...content.faqs.slice(0, 4),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "ohio" && input.specialtySlug === "electrophysiology") {
    return {
      ...content,
      heroSubhead: "Ablation weeks, device clinic, and community EP lab coverage",
      directAnswer:
        "Electrophysiology locum tenens jobs in Ohio are EP-lab, device-clinic, and arrhythmia-consult blocks. Ohio licensing or IMLC, mapping-system familiarity, and a written ablation vs device split must align before you start. Community programs often need device and clinic coverage more than complex ablation days.",
      intro:
        "Ohio EP locums split between ablation-capable labs and device-heavy community programs. Semi-retired electrophysiologists and moonlighting EPs often fit 2-day lab or device-clinic coverage; full locums-primary physicians more often take ablation weeks with defined call.",
      sections: [
        {
          h2: "What Ohio EP locum assignments look like",
          paragraphs: [
            "Expect some mix of ablation, implants, device clinic, and inpatient arrhythmia consults. Confirm mapping systems, EP tech staffing, vendor support, and whether remote monitoring alerts travel with you between blocks.",
            "No-call weekday coverage exists in this market type—only if the contract says so. Verbal “light call” is not a deal memo.",
          ],
        },
        {
          h2: "Licensing and privileging for EP in Ohio",
          paragraphs: [
            "Ohio is IMLC-eligible for many physicians. EP lab privileges still need recent ablation and/or device logs. Sequence license, credentialing, and lab privileges; do not assume compact speed equals a next-month start.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Can Ohio EP locums be device-clinic only?",
          a: "Yes. Some community programs need implants and clinic more than complex ablation. Confirm case mix in writing.",
        },
        ...content.faqs.slice(0, 4),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "kansas" && input.specialtySlug === "general-cardiology") {
    return {
      ...content,
      heroSubhead: "Inpatient blocks, nuclear coverage, and 7-on/7-off schedules",
      directAnswer:
        "General cardiology locum tenens jobs in Kansas are often inpatient consult and rounding blocks, including 7-on/7-off coverage, with nuclear competency required on some assignments. Kansas licensing assistance, travel, lodging, and malpractice are commonly covered when a site is actively recruiting.",
      intro:
        "Kansas general cardiology locums fit travel-ready locums-primary physicians and block-schedule cardiologists more than local weekend moonlighting. Nuclear coverage and facility-specific eligibility rules can matter as much as the schedule. Review the featured Kansas inpatient opportunity if you want a current example of that model.",
      sections: [
        {
          h2: "What Kansas general cardiology locum assignments look like",
          paragraphs: [
            "Inpatient consults, rounding, and non-invasive coverage are the core. Some sites require nuclear cardiology; TEE may be preferred. Confirm 24-hour call expectations even when after-hours volume is described as rare.",
            "7-on/7-off is a common block shape here. It works for physicians who want concentrated clinical weeks and protected time away—not for anyone expecting a no-call clinic job.",
          ],
        },
        {
          h2: "Licensing and eligibility in Kansas",
          paragraphs: [
            "Kansas licensing support is often available for out-of-state cardiologists. Some facilities have additional professional-liability eligibility rules that must be verified before presentation. Share prior Kansas practice history early so we do not waste a credentialing cycle.",
          ],
        },
        {
          h2: "Currently recruiting",
          paragraphs: [
            "When a Kansas inpatient non-invasive locum is open, it is listed on the featured cardiology jobs page with schedule, nuclear, and screening questions. That is the fastest path if you already know you want this model.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Is nuclear cardiology required for Kansas general locums?",
          a: "It is required on some inpatient assignments, including the featured Kansas opportunity. Ask before you invest in licensing.",
        },
        ...content.faqs.slice(0, 4),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "north-carolina" && input.specialtySlug === "general-cardiology") {
    return {
      ...content,
      heroSubhead: "Outpatient clinic blocks and 2-weeks-per-month schedules",
      directAnswer:
        "General cardiology locum tenens jobs in North Carolina include outpatient clinic coverage, hybrid consult work, and recurring 2-weeks-per-month blocks. Board certification, licensing, and written clinic-panel expectations should be clear before you start. This market is a strong fit for part-time, semi-retired, and locums-primary cardiologists who do not want STEMI.",
      intro:
        "North Carolina general cardiology locums often look like clinic days rather than 24-hour inpatient call. If you want a current example, see the featured North Carolina outpatient locum: two weeks per month, outpatient only, with travel, lodging, and malpractice covered.",
      sections: [
        {
          h2: "What NC general cardiology locum assignments look like",
          paragraphs: [
            "Outpatient clinic, occasional hospital coverage, and recurring part-month blocks are common. Confirm inbox, callbacks, and whether you cover stress tests or imaging on site.",
            "This shape fits scale-down cardiologists and employed physicians adding income more than full-time STEMI operators.",
          ],
        },
        {
          h2: "Licensing in North Carolina",
          paragraphs: [
            "North Carolina is IMLC-eligible for many physicians. Clinic privileges still take time. Recurring 2-weeks/month blocks make the unpaid onboarding cost more rational than a one-off weekend.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Are North Carolina cardiology locums outpatient only?",
          a: "Some are, including the featured 2-weeks/month clinic assignment. Others include hospital coverage. Require setting in writing.",
        },
        ...content.faqs.slice(0, 4),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "alaska" && input.specialtySlug === "electrophysiology") {
    return {
      ...content,
      heroSubhead: "Travel EP coverage in a shortage market",
      directAnswer:
        "Electrophysiology locum tenens jobs in Alaska are travel-heavy EP-lab and device-coverage blocks in a workforce-shortage market. A full Alaska license, travel logistics, and a written ablation vs device split must be planned before you fly. This is locums-primary or defined-block work more than local moonlighting.",
      intro:
        "Alaska EP locums exist because programs cannot staff every ablation and device clinic locally. If you will travel, the assignment has to pay for licensing, weather delays, and time away. Device-clinic and consult coverage can fit late-career EPs; complex ablation weeks fit physicians who still want lab volume.",
      sections: [
        {
          h2: "What Alaska EP locum assignments look like",
          paragraphs: [
            "Expect travel, lodging, and concentrated lab or clinic weeks rather than a commute. Confirm mapping systems, device vendors, and after-hours arrhythmia coverage before you accept a winter block.",
          ],
        },
        {
          h2: "Licensing and logistics",
          paragraphs: [
            "Alaska is not a typical compact shortcut for most physicians. Start the license early. Travel and weather can move start dates; cancellation and lodging terms should be written.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Is Alaska EP locums realistic for part-time work?",
          a: "Usually as defined travel blocks, not weekend moonlighting. Credentialing cost needs enough assignment days to be worth it.",
        },
        ...content.faqs.slice(0, 4),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "ohio" && input.specialtySlug === "interventional-cardiology") {
    return {
      ...content,
      heroSubhead: "ASAP 1–2 week blocks with 24-hour call and a written daily guarantee",
      directAnswer:
        "Interventional cardiology locum tenens jobs in Ohio include cath-lab coverage, consults, and clinic. A current featured assignment needs 1–2 weeks per month as soon as an eligible interventionalist can start, with 24-hour call, a $3,200 guarantee for 0–4 hours, and $400/hour callback after that.",
      intro:
        "Ohio IC locums can fit physicians who already live or hold a license in Ohio, plus out-of-state interventionalists who can license (often via IMLC). Confirm STEMI backup, census, and clinic volume in writing. Compact licensing is not the same as hospital privileges.",
      sections: [
        {
          h2: "Current Ohio interventional coverage",
          paragraphs: [
            "One live assignment is recruiting for one to two weeks per month. Days start at 7 a.m. with rounding, consults, and procedures, then afternoon clinic, plus 24-hour call.",
            "Current pay terms are $3,200 guaranteed for 0–4 hours and $400 per hour of callback. An 8-hour day is about $4,800. Hours vary; we confirm written terms before presentation.",
          ],
        },
        {
          h2: "Licensing for Ohio interventional locums",
          paragraphs: [
            "An Ohio license is the fastest path to an ASAP start. Many out-of-state physicians can use IMLC, but cath-lab privileging still needs current case logs.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Is there a current Ohio interventional locum opening?",
          a: "Yes. We are recruiting 1–2 weeks per month with 24-hour call and ASAP coverage. See the featured Ohio interventional locum page for schedule and pay terms.",
        },
        ...content.faqs.slice(0, 4),
      ].slice(0, 7),
    };
  }

  if (input.stateSlug === "nevada" && input.specialtySlug === "interventional-cardiology") {
    return {
      ...content,
      heroSubhead: "Western shortage STEMI coverage and IMLC licensing paths",
      directAnswer:
        "Interventional cardiology locum tenens jobs in Nevada are cath-lab and STEMI-coverage blocks in a state with documented cardiologist shortage. Nevada is IMLC-eligible for many physicians, but PCI privileges still need current logs and written activation rules. This market fits locums-primary travel interventionalists more than local clinic moonlighting.",
      intro:
        "Nevada interventional locums are a nationwide-niche play: shortage, STEMI need, and compact licensing for physicians who will travel. Confirm whether the lab wants primary STEMI, diagnostic-only PCI, or both. Do not treat IMLC speed as a next-week start—privileging still sits on the critical path.",
      sections: [
        {
          h2: "What Nevada interventional locum assignments look like",
          paragraphs: [
            "Community PCI programs and regional STEMI coverage dominate. Las Vegas and Reno systems differ from rural or resort coverage. Backup surgery, activation windows, and night volume must be in the deal memo.",
          ],
        },
        {
          h2: "Licensing via IMLC",
          paragraphs: [
            "Many physicians can use the Interstate Medical Licensure Compact for Nevada. Compact eligibility does not replace cath-lab privileging or DEA. Start both tracks before you resign from an employed role.",
          ],
        },
        {
          h2: "Who this market fits",
          paragraphs: [
            "Travel-ready interventionalists, new IC graduates with independent logs, and employed physicians who can take defined STEMI blocks without stacking two call schedules.",
          ],
        },
        ...content.sections.filter((s) => /timing|seasonality/i.test(s.h2)),
      ],
      faqs: [
        {
          q: "Does IMLC mean I can start interventional locums in Nevada quickly?",
          a: "It can shorten the license. Cath-lab privileging, PCI logs, and payer enrollment still take additional time.",
        },
        ...content.faqs.slice(0, 4),
      ].slice(0, 7),
    };
  }

  return content;
}

export function buildSpecialtyStatePageContent(input: {
  stateSlug: string;
  stateName: string;
  specialtySlug: string;
  specialtyName: string;
}): SpecialtyStatePageContent | null {
  const state = getStateProfile(input.stateSlug);
  const specialty = getSpecialtyProfile(input.specialtySlug);
  if (!state || !specialty) return null;

  const seed = hashPair(input.stateSlug, input.specialtySlug);
  const metros = state.majorMetros.slice(0, 3).join(", ");

  const introVariants = [
    `${input.stateName} ${input.specialtyName} locum roles sit at the intersection of ${state.region} market dynamics and ${specialty.settings[0]?.toLowerCase() ?? "clinical"} workflow realities. ${specialty.assignmentSnapshot}`,
    `Physicians searching for ${input.specialtyName} locum tenens jobs in ${input.stateName} are usually comparing more than pay—they want ${specialty.documentationFocus.toLowerCase()} before they commit. ${state.marketSnapshot}`,
    `Whether you are open to travel physician jobs or a local block near ${metros || input.stateName}, ${input.specialtyName} coverage in ${input.stateName} should be documented with the same rigor you use for any high-stakes contract.`,
  ];

  const directAnswer = `${input.specialtyName} locum tenens jobs in ${input.stateName} are contract-based assignments where licensing (${state.imlcEligible ? "often compact-eligible" : "typically a full state license"}), privileging, and written workload rules must align before start dates. Demand clusters around ${metros || "metro and community sites"}, but fit depends on ${specialty.documentationFocus.toLowerCase()}.`;

  const sections: ContentSection[] = [
    {
      h2: `${input.specialtyName} assignments in ${input.stateName}: what is different here`,
      paragraphs: [
        `${specialty.workflowNotes} In ${input.stateName}, facilities range from major hubs like ${metros || input.stateName} to community sites where backup and transfer agreements matter more.`,
        pick(
          [
            `${state.locumDemandNotes} For ${input.specialtyName}, prioritize contracts that name credentialing owners and realistic privileging timelines.`,
            `Across ${state.region}, ${input.specialtyName} locums succeed when ${specialty.documentationFocus.toLowerCase()} is attached to the deal memo—not discussed verbally after arrival.`,
          ],
          seed,
        ),
      ],
    },
    {
      h2: `Licensing ${input.stateName} for ${input.specialtyName} locums`,
      paragraphs: [
        state.licensingPath,
        specialty.credentialingChecklist.length > 0
          ? `Credentialing checklist highlights: ${specialty.credentialingChecklist.slice(0, 3).join("; ")}.`
          : "",
        state.imlcEligible
          ? `Even with compact eligibility, ${input.specialtyName} privileges and payer enrollment are separate from licensure—sequence both early.`
          : `Because ${input.stateName} is not a typical compact shortcut for most physicians, build your start-date plan backward from licensing and privileging milestones.`,
      ].filter(Boolean),
    },
    {
      h2: `Settings, metros, and ${input.specialtyName} workflow`,
      paragraphs: [
        `Common settings: ${specialty.settings.join(", ")}.`,
        state.travelVsLocal,
        `${pick(specialty.payDrivers, seed, 1)} are frequent rate drivers for ${input.specialtyName} in ${input.stateName}—compare offers using the same variables, not headline weekly rates alone.`,
      ],
    },
    {
      h2: `Documentation to insist on before you sign`,
      paragraphs: [
        specialty.documentationFocus,
        `Ask how ${input.stateName} facilities document ${pick(["call coverage", "backup layers", "holiday staffing", "weekend handoffs"], seed)} for ${input.specialtyName} roles.`,
        `Strong fit signals: ${specialty.fitSignals.join(" ")}`,
      ],
    },
    {
      h2: `Avoidable pitfalls for ${input.specialtyName} in ${input.stateName}`,
      paragraphs: [
        specialty.pitfalls.join(" "),
        pick(state.credentialingTips, seed, 2),
      ],
    },
  ];

  if (state.seasonalNotes) {
    sections.push({
      h2: `${input.stateName} timing and seasonality`,
      paragraphs: [state.seasonalNotes, `Layer seasonal planning on top of ${specialty.assignmentSnapshot}`],
    });
  }

  const faqs: { q: string; a: string }[] = [
    {
      q: `Do I need a ${input.stateName} license before applying for ${input.specialtyName} locums?`,
      a: state.imlcEligible
        ? `Not always. Many physicians use IMLC or an existing footprint, but ${input.specialtyName} assignments still require facility privileging. Share your licenses and target dates—we map realistic paths.`
        : `${input.stateName} usually requires a full license for on-site ${input.specialtyName} work. Start early; telehealth-only roles may still have separate rules.`,
    },
    {
      q: `What should ${input.specialtyName} contracts specify in ${input.stateName}?`,
      a: `${specialty.documentationFocus} Add malpractice structure, stipends, cancellation terms, and ${pick(["call frequency", "backup coverage", "panel pace", "RVU targets"], seed)}.`,
    },
    {
      q: `Where are ${input.specialtyName} locum jobs concentrated in ${input.stateName}?`,
      a: `Demand appears across ${metros || input.stateName}, but community hospitals and regional systems often have the fastest need. We match site type to your boundaries—not just geography.`,
    },
    ...specialty.faqs.map((f) => ({
      q: `${f.q} (${input.stateName})`,
      a: `${f.a} Apply the same standard to ${input.stateName} contracts and privileging.`,
    })),
    {
      q: `How is this different from a national job board posting?`,
      a: `You still choose what to pursue—but you get recruiter-led context on ${input.stateName} licensing, ${input.specialtyName} fit, and credentialing pacing instead of generic blasts.`,
    },
  ];

  const metaDescription = `${input.stateName} ${input.specialtyName} locum tenens jobs: ${state.region} licensing context, ${specialty.settings[0]?.toLowerCase() ?? "clinical"} settings, credentialing checklist, and recruiter advocacy—transparent expectations for physicians.`;

  return applyPrioritySpecialtyStateEnrichment(
    {
      metaDescription,
      heroSubhead: pick(
        [
          `${state.region} · ${specialty.name} · licensing & workload clarity`,
          `${input.stateName} metros & community sites · ${input.specialtyName} blocks`,
          `Credentialing-first ${input.specialtyName} locums in ${input.stateName}`,
        ],
        seed,
      ),
      directAnswer,
      intro: pick(introVariants, seed),
      sections,
      faqs: faqs.slice(0, 7),
    },
    input,
  );
}
