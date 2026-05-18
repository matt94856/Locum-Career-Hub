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

  return {
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
  };
}
