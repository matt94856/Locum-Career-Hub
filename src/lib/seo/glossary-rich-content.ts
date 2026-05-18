/** Richer glossary copy keyed by slug; category fallbacks cover remaining terms. */

const BY_SLUG: Record<string, string[]> = {
  "locum-tenens": [
    "Locum tenens (Latin for “to hold a place”) describes physicians who temporarily fill clinical roles under contract—often for vacations, leave, staffing gaps, or seasonal volume.",
    "For physicians, the practical definition is operational: defined dates, documented workload, malpractice structure, stipends, and credentialing owners—not a vague “travel job” label.",
    "Locum Career Hub helps clinicians compare locum tenens jobs with recruiter-led context on fit, licensing, and contract norms.",
  ],
  privileging: [
    "Privileging is the hospital or facility process that grants you permission to practice specific clinical services at that site—even if you already hold a state license.",
    "Locum assignments usually require both licensure and privileging timelines; the longer pole often determines your real start date.",
    "Before you commit, ask which procedures and settings are included in your privilege set and whether temporary or disaster privileges apply.",
  ],
  credentialing: [
    "Credentialing verifies training, licenses, work history, and references—typically through a hospital committee or centralized credentialing body.",
    "For locum tenens, credentialing runs in parallel with contract negotiation; delays here are the most common reason start dates slip.",
    "Keep a clean primary-source packet (CV, licenses, DEA, malpractice history) to shorten repeats across assignments.",
  ],
  "malpractice-tail-coverage": [
    "Tail coverage protects you after a claims-made malpractice policy ends—critical when leaving an employer or finishing a locums block.",
    "Who pays for tail (you, agency, facility) should be explicit in your contract; gaps can follow you for years.",
    "Ask whether occurrence or claims-made coverage applies and what reporting obligations exist at assignment end.",
  ],
  "1099-income": [
    "1099 income means you are paid as an independent contractor—often with no tax withholding, which shifts estimated tax responsibility to you.",
    "Locum physicians on 1099 should plan quarterly payments, track deductible business expenses, and separate personal vs practice banking.",
    "This overview is educational—not tax advice. Confirm structure with a qualified CPA before signing.",
  ],
  "w-2-employment": [
    "W-2 employment means taxes are withheld and benefits may be offered—some locum-style roles still use W-2 through staffing partners.",
    "Compare W-2 vs 1099 locums on total compensation, benefits, malpractice payer, and schedule control—not just headline rate.",
    "Contract labels matter less than who controls schedule, provides insurance, and owns credentialing tasks.",
  ],
};

type GlossaryCategory =
  | "licensing"
  | "pay"
  | "contract"
  | "clinical"
  | "malpractice"
  | "general";

function categorize(title: string, slug: string): GlossaryCategory {
  const t = `${title} ${slug}`.toLowerCase();
  if (/license|compact|dea|board|privileg|credential|imlc|telemedicine licensure/.test(t)) return "licensing";
  if (/pay|rate|stipend|rvu|1099|w-2|tax|income|holiday pay|overtime/.test(t)) return "pay";
  if (/contract|non-compete|cancellation|agency bill/.test(t)) return "contract";
  if (/malpractice|tail|claims-made|occurrence/.test(t)) return "malpractice";
  if (/hospital|ed |icu|ob |gyn|locums|physician|hospitalist|nocturnist|census|call/.test(t)) return "clinical";
  return "general";
}

const CATEGORY_COPY: Record<GlossaryCategory, (title: string) => string[]> = {
  licensing: (title) => [
    `${title} is a licensing or credentialing term physicians encounter when expanding locum work across states.`,
    "For locums, the actionable question is timeline: when must this be complete relative to privileging, payer enrollment, and your first shift?",
    "Locum Career Hub helps map realistic licensing paths—but state boards and facilities make final determinations.",
  ],
  pay: (title) => [
    `${title} affects how locum compensation is structured, taxed, or compared across offers.`,
    "Never compare assignments on a single weekly rate—document call, stipends, malpractice payer, and cancellation terms alongside pay labels like this.",
    "Use written deal memos; verbal recruiter promises are not enforceable scheduling or pay guarantees.",
  ],
  contract: (title) => [
    `${title} belongs in the contract layer of locum tenens—not informal email threads.`,
    "If a term is not written (cancellation, tail, call, census), assume it is unresolved and negotiate before you arrive on site.",
    "Physicians should read locum contracts with the same rigor as employment agreements, especially for restrictive clauses.",
  ],
  malpractice: (title) => [
    `${title} ties directly to malpractice insurance structure for locum and employed roles.`,
    "Confirm policy type (occurrence vs claims-made), limits, tail responsibility, and whether the facility or agency is the named insured party.",
    "Malpractice gaps are a common post-assignment surprise—clarify them before day one.",
  ],
  clinical: (title) => [
    `${title} appears in clinical operations, staffing models, and locum job descriptions.`,
    "Translate the term into workload questions: who backs you up, what volume is expected, and how handoffs are documented.",
    "Facility policy—not industry slang—defines what you are actually expected to do on shift.",
  ],
  general: (title) => [
    `${title} comes up in physician searches about flexible work, locum tenens, and staffing models.`,
    "Definitions vary by contract and site; separate what the term usually means from what your specific agreement says.",
    "When you are ready for matches, share specialty, states, dates, and boundaries for realistic next steps.",
  ],
};

export function glossaryRichParagraphs(slug: string, title: string): string[] {
  if (BY_SLUG[slug]) return BY_SLUG[slug];
  return CATEGORY_COPY[categorize(title, slug)](title);
}
