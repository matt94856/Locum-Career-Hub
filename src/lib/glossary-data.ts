import { glossaryRichParagraphs } from "@/lib/seo/glossary-rich-content";
import { stateNameToSlug } from "@/lib/us-state-slugs";

/** Programmatic glossary — educational definitions (not individualized legal/tax/medical advice). */
const GLOSSARY_TITLES = [
  "Locum tenens",
  "Privileging",
  "Credentialing",
  "IMLC compact for physicians",
  "Malpractice tail coverage",
  "Claims-made malpractice",
  "Occurrence malpractice",
  "1099 income",
  "W-2 employment",
  "Locum tenens pay",
  "Weekly locum rate",
  "Stipend",
  "Housing stipend",
  "Travel stipend",
  "Moonlighting",
  "Per diem physician work",
  "Block schedule",
  "Cardiology locums",
  "Interventional cardiology locums",
  "Electrophysiology locums",
  "Heart failure locums",
  "Cath lab privileges",
  "STEMI activation",
  "TAVR locum coverage",
  "Structural heart call",
  "EP ablation locums",
  "Nuclear cardiology reads",
  "Stress test supervision",
  "Echo read turnaround",
  "Cardiology consult census",
  "PCI case mix",
  "Cardiac device clinic locums",
  "Telecardiology locums",
  "General cardiology locums",
  "Preventive cardiology locums",
  "Locum staffing agency",
  "Cardiologist recruiter",
  "VMS vendor management system",
  "MSO management services organization",
  "Locums contract",
  "Independent contractor physician",
  "Backup physician coverage",
  "Call pay",
  "Supervision agreements",
  "APP supervision",
  "Census cap",
  "Patient volume expectations",
  "Chart closure expectations",
  "RVU productivity",
  "Cancellation clause",
  "Non-compete clause",
  "Locum malpractice insurance",
  "Federal malpractice reform",
  "State medical board",
  "DEA registration",
  "State controlled substance license",
  "BLS ACLS certification",
  "ATLS certification",
  "Fellowship-trained physician",
  "Board certification",
  "Maintenance of certification",
  "Locum tenens taxes",
  "Quarterly estimated taxes",
  "S corporation physician",
  "LLC for locums",
  "Business expenses for locums",
  "CME allowance",
  "Travel day pay",
  "Orientation day",
  "Handoff expectations",
  "Sign-out quality",
  "Moral injury in medicine",
  "Physician burnout",
  "Schedule flexibility",
  "Work-life balance for doctors",
  "Semi-retirement for physicians",
  "Bridge employment",
  "Credentialing packet",
  "Primary source verification",
  "NPDB query",
  "OIG exclusion check",
  "SAM exclusion check",
  "Locum tenens housing",
  "Corporate housing",
  "Air travel for locums",
  "Rental car for locums",
  "Shift differential",
  "Holiday pay locums",
  "Overtime for physicians",
  "Locum tenens credentialing timeline",
  "Privileging timeline",
  "Temporary privileges",
  "Disaster privileges",
  "Telemedicine licensure",
  "Multi-state licensing strategy",
  "Locum tenens interview",
  "Site visit expectations",
  "Supervision ratio",
  "Cardiology call schedule",
  "Cath lab staffing model",
  "Locum tenens FAQ",
  "Travel cardiologist jobs",
  "Per diem vs locums",
  "Locums vs per diem",
  "Agency bill rate",
  "Locum tenens transparency",
  "Physician autonomy",
  "Clinical documentation integrity",
  "Peer review",
  "Cardiology quality metrics",
] as const;

export type GlossaryItem = { slug: string; title: string };

const glossarySlugSeen = new Set<string>();
export const GLOSSARY_ITEMS: GlossaryItem[] = GLOSSARY_TITLES.map((title) => {
  let slug = stateNameToSlug(title);
  if (glossarySlugSeen.has(slug)) {
    slug = `${slug}-glossary`;
  }
  glossarySlugSeen.add(slug);
  return { slug, title };
});

export const GLOSSARY_SLUGS = GLOSSARY_ITEMS.map((g) => g.slug);

const bySlug = new Map(GLOSSARY_ITEMS.map((g) => [g.slug, g]));

export function getGlossaryItem(slug: string): GlossaryItem | undefined {
  return bySlug.get(slug);
}

export function glossaryBodyParagraphs(slug: string, title: string): string[] {
  return glossaryRichParagraphs(slug, title);
}
