export type EvidenceSource = {
  id: string;
  publisher: string;
  title: string;
  url: string;
  effectiveDate: string;
  retrievedAt: string;
  updateCadenceDays: number;
  use: string;
};

export const TOOL_EVIDENCE_SOURCES: Record<string, EvidenceSource> = {
  imlccEligibility: {
    id: "imlcc-eligibility-2026",
    publisher: "Interstate Medical Licensure Compact Commission",
    title: "Information for Physicians and Compact Eligibility",
    url: "https://imlcc.com/information-for-physicians/",
    effectiveDate: "2026-07-09",
    retrievedAt: "2026-07-21",
    updateCadenceDays: 30,
    use: "IMLC prequalification rules and the separate-state-license limitation.",
  },
  imlccCosts: {
    id: "imlcc-costs-2026",
    publisher: "Interstate Medical Licensure Compact Commission",
    title: "Application Cost",
    url: "https://imlcc.com/what-does-it-cost/",
    effectiveDate: "2026-07-09",
    retrievedAt: "2026-07-21",
    updateCadenceDays: 30,
    use: "The $700 Compact application fee and official state fee references.",
  },
  naltoCredentialing: {
    id: "nalto-credentialing-2024",
    publisher: "National Association of Locum Tenens Organizations",
    title: "Best Practices in Credentialing",
    url: "https://www.nalto.org/about/credentialing-guidelines/",
    effectiveDate: "2024-10-01",
    retrievedAt: "2026-07-21",
    updateCadenceDays: 180,
    use: "Credentialing document and verification checklist structure.",
  },
  cmsRvu: {
    id: "cms-rvu26b",
    publisher: "Centers for Medicare & Medicaid Services",
    title: "2026 Physician Fee Schedule Relative Value Files",
    url: "https://www.cms.gov/medicare/payment/fee-schedules/physician/pfs-relative-value-files/rvu26b",
    effectiveDate: "2026-05-01",
    retrievedAt: "2026-07-21",
    updateCadenceDays: 90,
    use: "Official explanation of work, practice-expense, and malpractice RVUs; not a compensation benchmark.",
  },
  irsEstimatedTax: {
    id: "irs-pub505-2026",
    publisher: "Internal Revenue Service",
    title: "Publication 505: Tax Withholding and Estimated Tax",
    url: "https://www.irs.gov/publications/p505",
    effectiveDate: "2026-01-01",
    retrievedAt: "2026-07-21",
    updateCadenceDays: 90,
    use: "Self-employment and estimated-tax framework; user-entered effective rates remain estimates.",
  },
  gsaPerDiem: {
    id: "gsa-perdiem-fy2026",
    publisher: "U.S. General Services Administration",
    title: "FY 2026 CONUS Per Diem Rates",
    url: "https://open.gsa.gov/api/perdiem/",
    effectiveDate: "2025-10-01",
    retrievedAt: "2026-07-21",
    updateCadenceDays: 90,
    use: "Travel-cost comparison context; not an automatic contractor deduction.",
  },
  amaContracts: {
    id: "ama-contract-checklist",
    publisher: "American Medical Association",
    title: "Physician Negotiation Checklist",
    url: "https://www.ama-assn.org/system/files/physician-negotiation-checklist.pdf",
    effectiveDate: "2025-01-01",
    retrievedAt: "2026-07-21",
    updateCadenceDays: 180,
    use: "Structured contract discussion topics; not legal conclusions.",
  },
  fsmbLicensing: {
    id: "fsmb-pdc-2026",
    publisher: "Federation of State Medical Boards",
    title: "Physician Data Center",
    url: "https://www.fsmb.org/pdc/",
    effectiveDate: "2026-01-01",
    retrievedAt: "2026-07-21",
    updateCadenceDays: 90,
    use: "Official verification pathway context. User-entered license status is not independently verified.",
  },
};

export function sourceIsStale(source: EvidenceSource, asOf = new Date()): boolean {
  const retrieved = new Date(`${source.retrievedAt}T00:00:00Z`);
  const ageDays = (asOf.getTime() - retrieved.getTime()) / 86_400_000;
  return ageDays > source.updateCadenceDays;
}
