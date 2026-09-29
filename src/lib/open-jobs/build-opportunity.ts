import type { FeaturedCardiologyOpportunity } from "@/lib/featured-cardiology-opportunities";
import type { OpenJobDraft, OpenJobTrack } from "./types";

const NON_IMLC_STATES = new Set([
  "California",
  "Oregon",
  "Minnesota",
  "Massachusetts",
  "Michigan",
  "Vermont",
  "Nevada",
  "New York",
  "New Jersey",
  "Rhode Island",
  "Connecticut",
]);

const TRACK_COPY: Record<
  OpenJobTrack,
  {
    noun: string;
    formSpecialty: string;
    specialtySlug: string;
    relatedSpecialtySlugs: string[];
    eyebrowDirect: string;
    eyebrowVms: string;
    hubPath: string;
    hubLabel: string;
  }
> = {
  "non-invasive": {
    noun: "Non-Invasive Cardiology",
    formSpecialty: "Non-Invasive Cardiology",
    specialtySlug: "general-cardiology",
    relatedSpecialtySlugs: ["general-cardiology"],
    eyebrowDirect: "Featured non-invasive cardiology opportunity",
    eyebrowVms: "Non-invasive cardiology assignment",
    hubPath: "/locum-jobs/cardiology/general",
    hubLabel: "General cardiology locum jobs",
  },
  interventional: {
    noun: "Interventional Cardiology",
    formSpecialty: "Interventional Cardiology",
    specialtySlug: "interventional-cardiology",
    relatedSpecialtySlugs: ["interventional-cardiology"],
    eyebrowDirect: "Featured interventional cardiology opportunity",
    eyebrowVms: "Interventional cardiology assignment",
    hubPath: "/locum-jobs/cardiology/interventional",
    hubLabel: "Interventional cardiology locum jobs",
  },
  electrophysiology: {
    noun: "Electrophysiology",
    formSpecialty: "Electrophysiology",
    specialtySlug: "electrophysiology",
    relatedSpecialtySlugs: ["electrophysiology"],
    eyebrowDirect: "Featured electrophysiology opportunity",
    eyebrowVms: "Electrophysiology assignment",
    hubPath: "/locum-jobs/cardiology/electrophysiology",
    hubLabel: "Electrophysiology locum jobs",
  },
};

function licenseParagraph(state: string, track: OpenJobTrack): string {
  const specialty =
    track === "interventional"
      ? "cath-lab privileges and recent PCI volume"
      : track === "electrophysiology"
        ? "EP lab privileges and recent ablation or device volume"
        : "non-invasive privileges and the diagnostic mix the facility actually uses";
  if (NON_IMLC_STATES.has(state)) {
    return `${state} is not an Interstate Medical Licensure Compact shortcut for most physicians. Plan a full ${state} license (or confirm you already hold one) before treating a start date as real. Privileging for ${specialty} is a separate hospital process.`;
  }
  return `${state} is IMLC-eligible for many physicians, which can shorten a new license compared with non-compact states. An existing ${state} license is still faster than compact paperwork. Privileging for ${specialty} remains a separate hospital process.`;
}

function screeningQuestions(draft: OpenJobDraft): FeaturedCardiologyOpportunity["screeningQuestions"] {
  const questions: FeaturedCardiologyOpportunity["screeningQuestions"] = [
    {
      id: "license",
      label: `Do you currently hold a ${draft.state} medical license?`,
      options: ["Yes", "No—would need to license", "Not sure"],
    },
    {
      id: "availability",
      label: "Could you cover the dates if this assignment is still open?",
      options: ["Yes", "Possibly—depending on dates", "Exploring only"],
    },
  ];
  if (draft.track === "interventional") {
    questions.push({
      id: "pci",
      label: "Are you currently performing PCI with logs you can share for privileging?",
      options: ["Yes", "Need to review my recent volume", "No"],
    });
  }
  if (draft.track === "electrophysiology") {
    questions.push({
      id: "epScope",
      label: "Is your current EP scope ablation, devices, or both?",
      options: ["Ablation and devices", "Devices-focused", "Ablation-focused", "Need to review"],
    });
  }
  if (draft.kind === "vms") {
    questions.push({
      id: "vmsOk",
      label: "Are you comfortable with limited public details until a consultant confirms the current order?",
      options: ["Yes", "I need more first", "Not sure"],
    });
  }
  return questions;
}

export function buildOpenJobOpportunity(draft: OpenJobDraft): FeaturedCardiologyOpportunity {
  const track = TRACK_COPY[draft.track];
  const isVms = draft.kind === "vms";
  const title = `${draft.region} ${track.noun} Locum Opportunity`;
  const h1 = isVms
    ? `${track.noun} Locum Assignment in ${draft.region}`
    : `${track.noun} Locum Job in ${draft.region}`;
  const shortLabel = `${draft.region} ${track.noun.toLowerCase()}${isVms ? " · limited details" : ""}`;
  const supportLine = isVms
    ? "Limited public details. A consultant confirms whether this assignment is still available."
    : "Confirm travel, lodging, and malpractice terms in writing before you accept.";
  const metaDescription = isVms
    ? `${track.noun} locum in ${draft.region}. Posted ${draft.datePosted}. Details are limited—contact Locum Career Hub to see if this is still available.`
    : `${track.noun} locum in ${draft.region}: ${draft.need} Posted ${draft.datePosted}. Contact Locum Career Hub to see if this is still available.`;

  const requirements = [
    `Board certification appropriate for ${track.noun.toLowerCase()} locum work`,
    `Comfort with the posted ${draft.region} scope: ${draft.need.replace(/\.$/, "")}`,
    `${draft.state} license, or a realistic path to licensure before the needed dates`,
    ...(draft.extraRequirements ?? []),
  ];

  const benefits = isVms
    ? [
        "A consultant checks live vendor availability after you inquire",
        `Region-level ${draft.state} ${track.noun.toLowerCase()} match without a public facility name`,
        "Same private inquiry form as our direct cardiology jobs",
        ...(draft.extraBenefits ?? []),
      ]
    : [
        `Posted need: ${draft.need}`,
        `${draft.schedule}. ${draft.call}.`,
        "Private inquiry so we can confirm whether the opening is still available",
        ...(draft.compensation ? [draft.compensation] : []),
        ...(draft.extraBenefits ?? []),
      ];

  const directAnswer = isVms
    ? `Locum Career Hub is recruiting a ${track.noun.toLowerCase()} locum in ${draft.region}. This listing came through a vendor system, so the public page names specialty and region only. Posted ${draft.datePosted}. Contact Locum Career Hub to see if this is still available—we confirm current dates and scope with a consultant after you inquire. ${draft.angle}`
    : `Locum Career Hub is recruiting a ${track.noun.toLowerCase()} locum in ${draft.region}. ${draft.need} Schedule: ${draft.schedule}. ${draft.call}.${draft.compensation ? ` ${draft.compensation}.` : ""} Posted ${draft.datePosted}. Contact Locum Career Hub to see if this is still available. ${draft.angle}`;

  const idealFits: FeaturedCardiologyOpportunity["idealFits"] = [
    {
      title: `${draft.state}-licensed ${track.noun.toLowerCase()} physicians`,
      detail: `An existing ${draft.state} license is usually the fastest path into ${draft.region} coverage.`,
    },
    {
      title: `Out-of-state ${track.noun.toLowerCase()} physicians who can license`,
      detail: licenseParagraph(draft.state, draft.track),
    },
    {
      title: "Physicians who want this schedule pattern",
      detail: `${draft.schedule}. ${draft.call}. Share dates you can actually hold so we do not present you for a window you cannot cover.`,
    },
    {
      title: isVms ? "Physicians comfortable with limited public detail" : "Physicians comparing a specific open job",
      detail: isVms
        ? "VMS orders often cannot publish the facility. If you need a named hospital on a webpage before inquiring, this page will feel thin by design."
        : "This page is one posted assignment, not a nationwide job board. Inquire if the region and specialty match; we confirm it is still open before you travel.",
    },
    {
      title: "Employed cardiologists with approval to take locum work",
      detail:
        "Review moonlighting rules, restrictive covenants, fatigue, and malpractice before you take outside coverage. We do not treat inquiry as a commitment.",
    },
    {
      title: "Locums-primary cardiologists filling a regional calendar",
      detail: `Use this ${draft.region} row as one block among others. Tell us overlapping states so we do not double-book you.`,
    },
  ];

  const sections: FeaturedCardiologyOpportunity["sections"] = isVms
    ? [
        {
          heading: `What we can say about this ${draft.region} ${track.noun.toLowerCase()} locum`,
          paragraphs: [
            draft.need,
            "Vendor postings usually hide facility identity, exact census, and pay until a recruiter checks the live order. That is not a tease—it is how those systems work.",
            "Contact Locum Career Hub to see if this is still available. Leave an email or mobile number on this page so we can attach your inquiry to this assignment.",
          ],
        },
        {
          heading: `Why ${draft.region} still has a dedicated page`,
          paragraphs: [
            draft.angle,
            `Search demand for ${track.noun.toLowerCase()} locum jobs in ${draft.state} is real. A unique URL with region, specialty, posted date, and a private form is more honest than a thin city page that invents a hospital.`,
          ],
        },
        {
          heading: `Licensing for ${track.noun.toLowerCase()} work in ${draft.state}`,
          paragraphs: [
            licenseParagraph(draft.state, draft.track),
            "Share active licenses and earliest dates when you inquire. We will not present you until the live order still exists.",
          ],
        },
      ]
    : [
        {
          heading: `The ${draft.region} assignment as posted`,
          paragraphs: [
            draft.need,
            `${draft.setting}. ${draft.schedule}. ${draft.call}.`,
            draft.compensation
              ? `${draft.compensation} We confirm written terms before presenting a candidate.`
              : "Pay, travel, and malpractice are confirmed in writing for eligible physicians. This page does not invent a daily rate.",
          ],
        },
        {
          heading: `How this ${draft.state} ${track.noun.toLowerCase()} job is different`,
          paragraphs: [
            draft.angle,
            "City names are omitted on purpose. The region is enough for search and for physicians deciding whether the travel radius is realistic.",
          ],
        },
        {
          heading: `Licensing and privileging in ${draft.state}`,
          paragraphs: [
            licenseParagraph(draft.state, draft.track),
            "Credentialing still depends on case logs, references, and the facility’s calendar. An ASAP preference on your side does not override that.",
          ],
        },
        {
          heading: "Confirm this opening is still available",
          paragraphs: [
            `Posted ${draft.datePosted}. Locum needs move. Contact Locum Career Hub on this page to see if this ${draft.region} assignment is still available.`,
            "The inquiry is private. We use it to contact you about this job—not a general mailing list.",
          ],
        },
      ];

  const faqs: FeaturedCardiologyOpportunity["faqs"] = [
    {
      q: `Is this ${draft.region} ${track.noun.toLowerCase()} locum still available?`,
      a: `It was posted ${draft.datePosted}. Availability changes. Use the form on this page—Contact Locum Career Hub to see if this is still available—and we will check the current status.`,
    },
    {
      q: `What is the posted need for this ${draft.state} ${track.noun.toLowerCase()} job?`,
      a: draft.need,
    },
    {
      q: `Is this ${draft.region} role ${track.noun.toLowerCase()} or a different cardiology subspecialty?`,
      a: `This opening is ${track.noun.toLowerCase()} coverage. General, interventional, and EP privileges are not interchangeable.`,
    },
    {
      q: `Do I need a ${draft.state} license already?`,
      a: licenseParagraph(draft.state, draft.track),
    },
    {
      q: isVms
        ? "Why isn’t the hospital named on this page?"
        : "Will you publish the city or hospital on this page?",
      a: isVms
        ? "Vendor listings typically withhold the facility until a recruiter verifies the live order and your eligibility. That keeps the page accurate instead of guessing."
        : "No. We describe the general region in the state, not the city, so the page stays accurate and does not over-identify the client.",
    },
    {
      q: "How do I ask about this specific assignment?",
      a: "Use the form on this page with an email or mobile number. We route the inquiry to this job so a consultant can tell you whether it is still open.",
    },
    ...(draft.extraFaqs ?? []),
  ];

  const relatedLinks = [
    {
      href: `/locum-tenens-jobs/${draft.stateSlug}/${track.specialtySlug}`,
      label: `${draft.state} ${track.noun.toLowerCase()} locum jobs`,
    },
    { href: track.hubPath, label: track.hubLabel },
    { href: "/physician-opportunities", label: "All current cardiology opportunities" },
    { href: "/cardiologist-locums-calculator", label: "Estimate locum compensation" },
    ...(draft.track === "interventional"
      ? [{ href: "/interventional-cardiology-locums-pay", label: "Interventional locums pay" }]
      : []),
    ...(draft.track === "electrophysiology"
      ? [{ href: "/salary/electrophysiologist-salary", label: "Electrophysiologist salary guide" }]
      : []),
    ...(draft.track === "non-invasive"
      ? [{ href: "/guides/non-invasive-cardiology-locums", label: "Non-invasive locums guide" }]
      : []),
  ];

  const keywords = [
    `${draft.state} ${track.noun.toLowerCase()} locum`,
    `${track.noun.toLowerCase()} locum jobs ${draft.state}`,
    `${draft.region} cardiology locum`,
    `cardiologist locum ${draft.state}`,
    isVms ? `${draft.state} locum tenens ${track.noun.toLowerCase()}` : `${draft.need.slice(0, 48)}`,
  ];

  return {
    slug: draft.slug,
    state: draft.state,
    stateSlug: draft.stateSlug,
    title,
    metaTitle: draft.metaTitle,
    metaDescription,
    h1,
    shortLabel,
    setting: draft.setting,
    schedule: draft.schedule,
    call: draft.call,
    compensation: draft.compensation,
    supportLine,
    eyebrow: isVms ? track.eyebrowVms : track.eyebrowDirect,
    formSpecialty: track.formSpecialty,
    specialtySlug: track.specialtySlug,
    relatedLinks,
    requirements,
    benefits,
    directAnswer,
    idealFits,
    sections,
    faqs,
    keywords,
    datePosted: draft.datePosted,
    relatedSpecialtySlugs: track.relatedSpecialtySlugs,
    screeningQuestions: screeningQuestions(draft),
    listingKind: draft.kind,
    region: draft.region,
  };
}
