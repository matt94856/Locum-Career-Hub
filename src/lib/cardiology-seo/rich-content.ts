import type { CardiologySeoCategory, ContentSection } from "@/lib/cardiology-seo/types";

export function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function pick<T>(items: T[], seed: number, offset = 0): T {
  return items[(seed + offset) % items.length]!;
}

/** Trust copy for inquiry forms — used on state, city, and conversion pages. */
export const RECRUITER_FOLLOW_UP_PROMISE =
  "After you submit an inquiry, a cardiology recruiter from Locum Career Hub will review your subspecialty, license states, and preferred locations. If there are realistic locum opportunities that match your criteria, we will reach out—typically within one business day. If nothing fits right now, we will tell you plainly rather than sending unrelated blast emails.";

export function recruiterTrustSection(geoLabel?: string): ContentSection {
  const where = geoLabel ? ` in ${geoLabel}` : "";
  return {
    h2: "What happens after you submit an inquiry",
    paragraphs: [
      RECRUITER_FOLLOW_UP_PROMISE,
      `We are a physician recruiting service${where}, not a hospital employer. Your information is used only to evaluate fit for cardiology locum roles you might actually want—not sold as a generic lead list.`,
      "You can include hard boundaries (STEMI call, consult census, clinic panel, travel radius) in the form. The more specific you are, the more useful our follow-up will be.",
    ],
  };
}

export function buildCoreSections(input: {
  seed: string;
  topic: string;
  geoLabel?: string;
  category: CardiologySeoCategory;
}): ContentSection[] {
  const seed = hashSeed(input.seed);
  const geo = input.geoLabel ?? "your target markets";
  const topic = input.topic;

  const market = pick(
    [
      `Cardiology staffing${input.geoLabel ? ` in ${input.geoLabel}` : ""} often tightens when employed cardiologists take leave, programs expand cath lab hours, or seasonal volume shifts. Locums can help—but only when call, privileging, and malpractice are documented.`,
      `Hospitals exploring ${topic} usually need coverage that matches their actual workflow: STEMI pathways, consult census, clinic templates, or imaging turnaround—not a generic “cardiologist wanted” line.`,
      `For ${geo}, the best locum fits start with subspecialty truth (interventional vs clinic-heavy general) and licensing reality, not headline weekly rates.`,
    ],
    seed,
  );

  const credentialing = pick(
    [
      "Cardiology privileging often requires procedure logs for interventional and structural roles, echo privileges for generalists, and device clinic scope for EP. Hospital committee calendars—not recruiter slogans—set the pace.",
      "Share your active licenses, board status, and whether you need temporary privileges. We align introductions with sites that can support your timeline.",
      "Malpractice structure (claims-made vs occurrence, tail, limits) should be resolved before you commit—especially for cath lab and STEMI coverage.",
    ],
    seed,
    1,
  );

  const pay = pick(
    [
      "Pay reflects call burden, STEMI responsibility, clinic panel size, imaging read volumes, and subspecialty—we discuss ranges in context and do not guarantee income.",
      "Travel stipends, lodging, cancellation terms, and orientation days belong in the contract. Compare total package and lifestyle load, not a single number.",
      "Use our salary tools as directional models; your contract may differ based on acuity and site expectations.",
    ],
    seed,
    2,
  );

  const sections: ContentSection[] = [
    {
      h2: pick([`About ${topic}`, `${topic}: what matters`, `Understanding ${topic}`], seed, 3),
      paragraphs: [market, credentialing],
    },
    {
      h2: pick(["Rate drivers (not guarantees)", "How cardiology locum pay is structured", "Compensation context"], seed, 4),
      paragraphs: [pay],
    },
  ];

  if (input.category === "state" || input.category === "city") {
    sections.push(recruiterTrustSection(input.geoLabel));
  }

  if (input.category === "employer") {
    sections.push({
      h2: "Important disclosure",
      paragraphs: [
        "Locum Career Hub is not affiliated with, endorsed by, or employed by the health systems named on this page. We help cardiologists explore independent locum opportunities that may exist at similar facility types nationwide.",
        "We do not imply you will work directly for a branded employer by submitting an inquiry—we introduce cardiologists to hiring organizations when mutual fit exists.",
      ],
    });
  }

  sections.push({
    h2: "Next step: cardiologist-only matching",
    paragraphs: [
      "Locum Career Hub recruits cardiologists (MD/DO) only. Submit your subspecialty, preferred states, and availability—a recruiter will follow up if realistic opportunities exist in the areas you selected.",
    ],
  });

  return sections;
}

export function buildFaqs(input: {
  seed: string;
  geoLabel?: string;
  topic: string;
}): { q: string; a: string }[] {
  const seed = hashSeed(input.seed);
  const geo = input.geoLabel ?? "your selected states";

  return [
    {
      q: pick(
        [
          `Will a recruiter contact me after I inquire about ${geo}?`,
          "What happens after I submit the cardiology inquiry form?",
          "How soon will someone follow up?",
        ],
        seed,
      ),
      a: "Yes—a cardiology recruiter reviews submissions personally. If there are plausible locum opportunities in the states and subspecialty you listed, we will reach out, usually within one business day. If nothing fits, we will say so clearly.",
    },
    {
      q: "Are you the hospital employer?",
      a: "No. Locum Career Hub is a recruiting service. Your clinical contract would be with the hiring hospital or group if you accept an assignment.",
    },
    {
      q: pick(
        [`Do I need a license in ${geo} before inquiring?`, "Can I inquire while licensed elsewhere?", "How does licensing work?"],
        seed,
        1,
      ),
      a: "Requirements vary by assignment. Share current licenses and target dates—we map compact eligibility, full licenses, and realistic privileging timelines.",
    },
    {
      q: `How does this page relate to ${input.topic}?`,
      a: "This page is educational context for cardiologists exploring locum tenens—not individualized medical, legal, or tax advice. Submit an inquiry when you want recruiter-led matching.",
    },
    {
      q: "Do you recruit non-cardiologists?",
      a: "No. We work with cardiologists only—general, interventional, EP, heart failure, imaging, structural, preventive, and pediatric cardiology.",
    },
  ];
}
