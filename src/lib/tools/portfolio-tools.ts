export type PortfolioToolId =
  | "w2-1099"
  | "credentialing"
  | "imlc"
  | "offer-comparison"
  | "call-burden"
  | "license-roi"
  | "contract-checker"
  | "rvu"
  | "retirement"
  | "license-cme";

export type ToolField = {
  key: string;
  label: string;
  type: "number" | "select" | "checkbox";
  defaultValue: number | string | boolean;
  help?: string;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  options?: { label: string; value: string }[];
  group?: string;
};

export type PortfolioToolDefinition = {
  id: PortfolioToolId;
  slug: string;
  path: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  directAnswer: string;
  keywords: string[];
  risk: "standard" | "expert-review";
  reviewLabel: string;
  sourceIds: string[];
  fields: ToolField[];
  methodology: string[];
  limitations: string[];
  faqs: { q: string; a: string }[];
};

const yesNo = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
].map((state) => ({ label: state, value: state }));

const definitions: PortfolioToolDefinition[] = [
  {
    id: "imlc",
    slug: "imlc-eligibility-calculator",
    path: "/tools/imlc-eligibility-calculator",
    name: "IMLC Eligibility, Cost, and Timeline Calculator",
    shortName: "IMLC eligibility calculator",
    eyebrow: "Medical licensing planner",
    description: "Pre-screen common IMLC eligibility requirements and estimate Compact application costs for additional physician licenses.",
    directAnswer: "The IMLC is an expedited pathway to separate state medical licenses—not one multistate license. This tool checks the published core requirements and estimates the $700 Compact fee plus user-entered state fees.",
    keywords: ["IMLC eligibility calculator", "IMLC cost calculator", "interstate medical licensure compact physician"],
    risk: "standard",
    reviewLabel: "Source-verified public beta",
    sourceIds: ["imlccEligibility", "imlccCosts"],
    fields: [
      { key: "fullLicense", label: "Full, unrestricted license in an eligible SPL state", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "splConnection", label: "Residence, 25% practice, employer, or federal tax connection to that SPL", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "boardCertified", label: "Current ABMS/AOABOS certification or qualifying time-unlimited certificate", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "examAttempts", label: "Each licensing exam component passed in no more than three attempts", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "cleanHistory", label: "No disqualifying criminal, disciplinary, or controlled-substance history", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "targetLicenses", label: "Additional state licenses requested", type: "number", defaultValue: 2, min: 1, max: 20, step: 1 },
      { key: "averageStateFee", label: "Average state fee from official IMLCC list", type: "number", defaultValue: 450, min: 0, max: 2000, prefix: "$" },
    ],
    methodology: ["Eligibility is a pre-screen against published IMLCC criteria.", "Cost equals the current $700 Compact fee plus the state-license fees entered by the user.", "Timeline is shown as a planning range and never as an approval promise."],
    limitations: ["Only the IMLCC and participating boards determine eligibility.", "State implementation and fees change.", "Hospital privileging remains separate."],
    faqs: [
      { q: "Does IMLC give one license for every member state?", a: "No. Eligible physicians receive separate licenses from each selected state." },
      { q: "Is the $700 fee refundable?", a: "The IMLCC states that Compact fees are non-refundable. Verify current terms before applying." },
    ],
  },
  {
    id: "license-roi",
    slug: "medical-license-roi-calculator",
    path: "/tools/medical-license-roi-calculator",
    name: "Medical License ROI Calculator for Cardiologist Locums",
    shortName: "State-license ROI",
    eyebrow: "Opportunity access planner",
    description: "Compare the expected assignment value of a new state license with application, renewal, and credentialing costs.",
    directAnswer: "A state license has positive modeled ROI only when the probability-weighted income you enter exceeds application, renewal, and unpaid administrative costs. The tool does not assume that a license guarantees an assignment.",
    keywords: ["medical license cost calculator", "physician license ROI", "best state licenses for locums"],
    risk: "standard",
    reviewLabel: "Source-verified public beta",
    sourceIds: ["imlccCosts", "fsmbLicensing"],
    fields: [
      { key: "state", label: "Target state", type: "select", options: states, defaultValue: "Texas" },
      { key: "applicationCost", label: "Application and verification costs", type: "number", defaultValue: 1200, min: 0, max: 10000, prefix: "$" },
      { key: "renewalCost", label: "Renewal and CME cost over your horizon", type: "number", defaultValue: 800, min: 0, max: 10000, prefix: "$" },
      { key: "adminHours", label: "Unpaid application/credentialing hours", type: "number", defaultValue: 12, min: 0, max: 200, suffix: " hrs" },
      { key: "hourValue", label: "Value of your administrative time", type: "number", defaultValue: 250, min: 0, max: 2000, prefix: "$", suffix: "/hr" },
      { key: "assignmentDays", label: "Potential paid assignment days", type: "number", defaultValue: 10, min: 0, max: 365, suffix: " days" },
      { key: "netDaily", label: "Expected net clinical income per day", type: "number", defaultValue: 2500, min: 0, max: 20000, prefix: "$" },
      { key: "probability", label: "Your estimated probability of securing that work", type: "number", defaultValue: 50, min: 0, max: 100, suffix: "%" },
    ],
    methodology: ["Expected value equals potential net assignment income multiplied by the user-entered probability.", "Total cost includes direct fees plus the value of unpaid administrative time.", "The break-even assignment-day count uses the same user inputs."],
    limitations: ["No assignment inventory or placement is guaranteed.", "User-entered probability drives the result.", "Verify fees and status with the state board."],
    faqs: [{ q: "Does holding more licenses always create more income?", a: "No. Licenses improve access, but actual assignments, dates, scope, and credentialing determine value." }],
  },
  {
    id: "offer-comparison",
    slug: "cardiology-locum-offer-comparison",
    path: "/tools/cardiology-locum-offer-comparison",
    name: "Cardiology Locum Offer Comparison Tool",
    shortName: "Offer comparison",
    eyebrow: "Assignment economics",
    description: "Compare two cardiology locum offers using effective hourly value after call, unpaid time, travel costs, and cancellation exposure.",
    directAnswer: "The best locum offer is not necessarily the highest headline rate. This tool normalizes two offers into risk-adjusted effective hourly value using the exact pay, workload, travel, and cancellation assumptions you enter.",
    keywords: ["compare locum tenens offers", "cardiology locum rate calculator", "locum effective hourly rate"],
    risk: "standard",
    reviewLabel: "Source-verified public beta",
    sourceIds: ["gsaPerDiem", "naltoCredentialing"],
    fields: [
      { key: "aRate", label: "Offer A clinical rate", group: "Offer A", type: "number", defaultValue: 350, min: 0, max: 5000, prefix: "$", suffix: "/hr" },
      { key: "aPaidHours", label: "Offer A paid hours", group: "Offer A", type: "number", defaultValue: 40, min: 1, max: 168, suffix: " hrs" },
      { key: "aCallPay", label: "Offer A call/procedure pay", group: "Offer A", type: "number", defaultValue: 2000, min: 0, max: 50000, prefix: "$" },
      { key: "aUnpaidHours", label: "Offer A travel/admin/recovery hours", group: "Offer A", type: "number", defaultValue: 12, min: 0, max: 168, suffix: " hrs" },
      { key: "aCosts", label: "Offer A unreimbursed costs", group: "Offer A", type: "number", defaultValue: 1200, min: 0, max: 50000, prefix: "$" },
      { key: "aCancelRisk", label: "Offer A cancellation probability", group: "Offer A", type: "number", defaultValue: 10, min: 0, max: 100, suffix: "%" },
      { key: "bRate", label: "Offer B clinical rate", group: "Offer B", type: "number", defaultValue: 325, min: 0, max: 5000, prefix: "$", suffix: "/hr" },
      { key: "bPaidHours", label: "Offer B paid hours", group: "Offer B", type: "number", defaultValue: 45, min: 1, max: 168, suffix: " hrs" },
      { key: "bCallPay", label: "Offer B call/procedure pay", group: "Offer B", type: "number", defaultValue: 3500, min: 0, max: 50000, prefix: "$" },
      { key: "bUnpaidHours", label: "Offer B travel/admin/recovery hours", group: "Offer B", type: "number", defaultValue: 18, min: 0, max: 168, suffix: " hrs" },
      { key: "bCosts", label: "Offer B unreimbursed costs", group: "Offer B", type: "number", defaultValue: 600, min: 0, max: 50000, prefix: "$" },
      { key: "bCancelRisk", label: "Offer B cancellation probability", group: "Offer B", type: "number", defaultValue: 20, min: 0, max: 100, suffix: "%" },
    ],
    methodology: ["Gross value equals rate × paid hours + separate call/procedure pay.", "Risk-adjusted value reduces net assignment value by the user-entered cancellation probability.", "Effective hourly value divides by paid plus unpaid travel, administrative, and recovery time."],
    limitations: ["Cancellation probability is subjective.", "Taxes and replacement benefits are not included here.", "Confirm every term in the written agreement."],
    faqs: [{ q: "Why include unpaid recovery time?", a: "Post-call recovery and travel consume time even when the contract does not compensate it." }],
  },
  {
    id: "call-burden",
    slug: "cardiology-call-burden-calculator",
    path: "/tools/cardiology-call-burden-calculator",
    name: "Cardiology Call Burden and Effective Pay Calculator",
    shortName: "Call-burden calculator",
    eyebrow: "STEMI, EP, and weekend call",
    description: "Convert pager coverage, callbacks, procedures, rounding, and post-call recovery into an effective cardiology call rate.",
    directAnswer: "A 24-hour call stipend is not a 24-hour work rate. Effective value depends on restricted time, expected callbacks, active work, rounding, and post-call schedule loss.",
    keywords: ["cardiology call pay calculator", "STEMI call compensation", "cardiologist call burden"],
    risk: "standard",
    reviewLabel: "Source-verified public beta",
    sourceIds: ["amaContracts"],
    fields: [
      { key: "stipend", label: "Call stipend", type: "number", defaultValue: 2500, min: 0, max: 50000, prefix: "$" },
      { key: "procedurePay", label: "Expected callback/procedure pay", type: "number", defaultValue: 1200, min: 0, max: 50000, prefix: "$" },
      { key: "restrictedHours", label: "Restricted pager/response-window hours", type: "number", defaultValue: 24, min: 0, max: 168, suffix: " hrs" },
      { key: "restrictionWeight", label: "Percent of restricted time treated as burden", type: "number", defaultValue: 20, min: 0, max: 100, suffix: "%" },
      { key: "activeHours", label: "Expected callback/procedure/rounding hours", type: "number", defaultValue: 6, min: 0, max: 48, suffix: " hrs" },
      { key: "recoveryHours", label: "Post-call recovery or lost clinic hours", type: "number", defaultValue: 5, min: 0, max: 24, suffix: " hrs" },
      { key: "callsPerMonth", label: "Call periods per month", type: "number", defaultValue: 4, min: 0, max: 31, step: 1 },
    ],
    methodology: ["Burden hours equal active work + recovery time + a user-selected share of restricted pager time.", "Effective rate equals total call compensation divided by burden hours.", "Annualized value uses the entered monthly frequency only."],
    limitations: ["This is not a fatigue or safety clearance tool.", "Callback volume can vary materially.", "Clinical safety and adequate rest override financial optimization."],
    faqs: [{ q: "Should every pager hour count as a worked hour?", a: "Not necessarily. The adjustable restriction weight lets you show how much the response radius and activity limits affect your life." }],
  },
  {
    id: "contract-checker",
    slug: "cardiology-locum-contract-checker",
    path: "/tools/cardiology-locum-contract-checker",
    name: "Cardiology Locum Contract Red-Flag Checker",
    shortName: "Contract checker",
    eyebrow: "Expert review required",
    description: "Screen structured cardiology locum terms for questions about cancellation, payment, scope, malpractice, exclusivity, and termination.",
    directAnswer: "This educational screener identifies contract topics that deserve clarification; it does not interpret uploaded documents, determine enforceability, or replace a healthcare attorney.",
    keywords: ["cardiology locum contract checklist", "locum contract red flags", "physician contract checker"],
    risk: "expert-review",
    reviewLabel: "Staged pending healthcare-attorney review",
    sourceIds: ["amaContracts", "naltoCredentialing"],
    fields: [
      { key: "writtenScope", label: "Clinical scope and call duties are written", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "cancelProtection", label: "Cancellation notice or guaranteed payment is defined", type: "select", options: yesNo, defaultValue: "no" },
      { key: "malpracticeClear", label: "Policy type, limits, and tail responsibility are clear", type: "select", options: yesNo, defaultValue: "no" },
      { key: "paymentClear", label: "Rate, invoicing, payment timing, and disputed hours are clear", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "travelClear", label: "Travel, housing, cancellation, and reimbursement terms are clear", type: "select", options: yesNo, defaultValue: "no" },
      { key: "exclusivity", label: "Agreement includes exclusivity, presentation, or anti-circumvention language", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "indemnity", label: "Agreement includes physician indemnification obligations", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "terminationDays", label: "Without-cause termination notice", type: "number", defaultValue: 30, min: 0, max: 365, suffix: " days" },
      { key: "paymentDays", label: "Payment deadline after invoice", type: "number", defaultValue: 45, min: 0, max: 180, suffix: " days" },
    ],
    methodology: ["Each unanswered protection creates a discussion flag.", "Potentially restrictive clauses are surfaced for attorney review, not labeled enforceable or invalid.", "Severity is based on practical financial and operational exposure, not state-law advice."],
    limitations: ["No legal advice.", "No document upload or clause interpretation.", "State law and exact wording control."],
    faqs: [{ q: "Can this tell me whether a noncompete is enforceable?", a: "No. A qualified attorney must review the exact language and current state law." }],
  },
  {
    id: "rvu",
    slug: "cardiology-rvu-compensation-calculator",
    path: "/tools/cardiology-rvu-compensation-calculator",
    name: "Cardiology wRVU Compensation Calculator",
    shortName: "Cardiology RVU simulator",
    eyebrow: "Expert review required",
    description: "Model base salary, productivity thresholds, conversion rates, quality bonuses, and call pay using your contract terms.",
    directAnswer: "CMS publishes work RVUs, but it does not publish cardiologist compensation rates. This calculator applies your own annual wRVUs, threshold, and dollars-per-wRVU terms without inventing market percentiles.",
    keywords: ["cardiology RVU calculator", "cardiologist wRVU compensation", "RVU salary calculator physician"],
    risk: "expert-review",
    reviewLabel: "Staged pending compensation-review approval",
    sourceIds: ["cmsRvu", "amaContracts"],
    fields: [
      { key: "annualWrvu", label: "Expected annual work RVUs", type: "number", defaultValue: 8000, min: 0, max: 50000, suffix: " wRVUs" },
      { key: "baseSalary", label: "Guaranteed base salary", type: "number", defaultValue: 500000, min: 0, max: 3000000, prefix: "$" },
      { key: "threshold", label: "Productivity threshold", type: "number", defaultValue: 7000, min: 0, max: 50000, suffix: " wRVUs" },
      { key: "conversionRate", label: "Contracted conversion rate above threshold", type: "number", defaultValue: 55, min: 0, max: 500, prefix: "$", suffix: "/wRVU" },
      { key: "qualityBonus", label: "Expected quality/other bonus", type: "number", defaultValue: 25000, min: 0, max: 1000000, prefix: "$" },
      { key: "callPay", label: "Annual separate call/medical-director pay", type: "number", defaultValue: 50000, min: 0, max: 1000000, prefix: "$" },
      { key: "fte", label: "Clinical FTE", type: "number", defaultValue: 1, min: 0.1, max: 1.5, step: 0.1 },
    ],
    methodology: ["Productivity bonus equals work RVUs above the contract threshold multiplied by the user-entered conversion rate.", "Total modeled compensation adds base, productivity, quality, and call pay.", "FTE-normalized values are displayed for comparison only."],
    limitations: ["CMS RVUs are reimbursement inputs, not salary benchmarks.", "Contract definitions may credit or exclude services differently.", "Licensed MGMA/AMGA/MedAxiom percentiles are not reproduced."],
    faqs: [{ q: "Does a CMS conversion factor equal my dollars per wRVU?", a: "No. The Medicare conversion factor determines reimbursement. Your employment conversion rate is a contract term." }],
  },
  {
    id: "retirement",
    slug: "cardiologist-retirement-glidepath-calculator",
    path: "/tools/cardiologist-retirement-glidepath-calculator",
    name: "Cardiologist Retirement Glidepath Calculator",
    shortName: "Retirement glidepath",
    eyebrow: "Expert review required",
    description: "Model a gradual transition from full-time cardiology into part-time or locum blocks using transparent portfolio assumptions.",
    directAnswer: "A retirement glidepath compares annual spending with portfolio growth and after-tax locum income. It is a scenario model, not an investment recommendation or guarantee.",
    keywords: ["cardiologist retirement calculator", "physician retirement glidepath", "semi retired cardiologist locums"],
    risk: "expert-review",
    reviewLabel: "Staged pending financial-planner review",
    sourceIds: ["irsEstimatedTax"],
    fields: [
      { key: "currentAge", label: "Current age", type: "number", defaultValue: 60, min: 25, max: 85 },
      { key: "endAge", label: "End of modeled locum bridge", type: "number", defaultValue: 67, min: 26, max: 90 },
      { key: "portfolio", label: "Current investable portfolio", type: "number", defaultValue: 2500000, min: 0, max: 50000000, prefix: "$" },
      { key: "annualSpending", label: "Annual household spending", type: "number", defaultValue: 180000, min: 0, max: 2000000, prefix: "$" },
      { key: "locumGross", label: "Annual locum gross income", type: "number", defaultValue: 200000, min: 0, max: 3000000, prefix: "$" },
      { key: "effectiveTax", label: "Estimated effective tax on locum income", type: "number", defaultValue: 35, min: 0, max: 70, suffix: "%" },
      { key: "returnRate", label: "Assumed annual portfolio return", type: "number", defaultValue: 5, min: -20, max: 20, step: 0.1, suffix: "%" },
      { key: "inflation", label: "Assumed annual spending inflation", type: "number", defaultValue: 2.5, min: 0, max: 15, step: 0.1, suffix: "%" },
    ],
    methodology: ["Each year applies the user-entered return, adds after-tax locum income, and subtracts inflation-adjusted spending.", "The model compares a locum bridge with a no-locum scenario.", "No Social Security, pension, healthcare subsidy, or required-distribution optimization is assumed."],
    limitations: ["Not investment, tax, or retirement advice.", "Returns are not smooth in real markets.", "Healthcare and insurance costs require separate planning."],
    faqs: [{ q: "Does this determine whether I can retire?", a: "No. It illustrates a limited scenario and should be reviewed with qualified financial and tax professionals." }],
  },
  {
    id: "license-cme",
    slug: "physician-license-cme-planner",
    path: "/tools/physician-license-cme-planner",
    name: "Physician License and CME Readiness Planner",
    shortName: "License/CME planner",
    eyebrow: "Expert review required",
    description: "Create a renewal-readiness score for state licenses, CME, DEA, board certification, and controlled-substance registrations.",
    directAnswer: "This planner organizes user-entered deadlines and completion totals. It does not verify a license, replace state-board rules, or certify compliance.",
    keywords: ["physician license renewal tracker", "medical license CME planner", "doctor credential expiration tracker"],
    risk: "expert-review",
    reviewLabel: "Staged pending compliance-review approval",
    sourceIds: ["fsmbLicensing", "naltoCredentialing"],
    fields: [
      { key: "licenses", label: "Active state licenses", type: "number", defaultValue: 3, min: 1, max: 30, step: 1 },
      { key: "renewals12m", label: "License renewals due in 12 months", type: "number", defaultValue: 1, min: 0, max: 30, step: 1 },
      { key: "cmeRequired", label: "Known CME hours required in current cycles", type: "number", defaultValue: 100, min: 0, max: 1000, suffix: " hrs" },
      { key: "cmeComplete", label: "Documented CME hours completed", type: "number", defaultValue: 70, min: 0, max: 1000, suffix: " hrs" },
      { key: "deaMonths", label: "Months until DEA expiration", type: "number", defaultValue: 18, min: 0, max: 60, suffix: " months" },
      { key: "boardMonths", label: "Months until board/certification action", type: "number", defaultValue: 24, min: 0, max: 120, suffix: " months" },
      { key: "controlledSubstance", label: "State controlled-substance registrations reviewed", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "sourceVerified", label: "Every requirement checked against the official board", type: "select", options: yesNo, defaultValue: "no" },
    ],
    methodology: ["Readiness starts at 100 and deducts for near-term renewals, incomplete CME, approaching expirations, and unverified requirements.", "The output prioritizes the next actions rather than asserting compliance.", "No credentials or documents are uploaded or stored."],
    limitations: ["Every state has different rules.", "The planner does not verify data.", "Controlled-substance and board requirements can change."],
    faqs: [{ q: "Can I rely on this as proof of compliance?", a: "No. Verify each requirement and status with the issuing board or agency." }],
  },
  {
    id: "w2-1099",
    slug: "w2-vs-1099-physician",
    path: "/tools/w2-vs-1099-physician",
    name: "W-2 vs 1099 Physician Take-Home Calculator",
    shortName: "W-2 vs 1099",
    eyebrow: "Expert review required",
    description: "Compare employed, contractor, and hybrid physician income after user-entered effective tax rates, expenses, benefits, and self-employment tax.",
    directAnswer: "A fair W-2 versus 1099 comparison includes benefits, business expenses, unpaid time, and self-employment tax—not just gross compensation. This model uses your effective tax assumptions and shows every formula.",
    keywords: ["W-2 vs 1099 physician calculator", "locum vs employed calculator", "1099 physician take home pay"],
    risk: "expert-review",
    reviewLabel: "Staged pending CPA review",
    sourceIds: ["irsEstimatedTax"],
    fields: [
      { key: "w2Salary", label: "Annual W-2 salary", type: "number", defaultValue: 550000, min: 0, max: 5000000, prefix: "$" },
      { key: "w2Benefits", label: "Employer-paid benefits and retirement value", type: "number", defaultValue: 70000, min: 0, max: 500000, prefix: "$" },
      { key: "w2WithholdingRate", label: "Estimated effective federal + state income-tax rate", type: "number", defaultValue: 32, min: 0, max: 70, suffix: "%" },
      { key: "contractRevenue", label: "Annual 1099 gross revenue", type: "number", defaultValue: 700000, min: 0, max: 5000000, prefix: "$" },
      { key: "businessExpenses", label: "Unreimbursed ordinary business expenses", type: "number", defaultValue: 60000, min: 0, max: 1000000, prefix: "$" },
      { key: "replacementBenefits", label: "Health, disability, retirement admin, and other replacement costs", type: "number", defaultValue: 60000, min: 0, max: 500000, prefix: "$" },
      { key: "contractTaxRate", label: "Estimated effective federal + state income-tax rate", type: "number", defaultValue: 32, min: 0, max: 70, suffix: "%" },
      { key: "otherW2Wages", label: "Other wages already subject to Social Security tax", type: "number", defaultValue: 0, min: 0, max: 5000000, prefix: "$" },
      { key: "hybridLocumRevenue", label: "Hybrid scenario: locum revenue added to the W-2 job", type: "number", defaultValue: 150000, min: 0, max: 3000000, prefix: "$" },
      { key: "hybridExpenses", label: "Hybrid scenario: locum business expenses", type: "number", defaultValue: 20000, min: 0, max: 500000, prefix: "$" },
    ],
    methodology: ["W-2 spendable value subtracts the user-entered income-tax estimate and employee payroll tax, then adds employer benefits.", "1099 spendable value subtracts expenses, estimated self-employment tax, income tax, and replacement benefits; the hybrid adds after-tax locum profit to W-2 value.", "The Social Security portion is capped using the 2026 wage base and reduced by W-2 wages entered."],
    limitations: ["Simplified estimate only; no AMT, QBI, credits, spouse income, or detailed state rules.", "Worker classification is a legal determination.", "Use a CPA for decisions and quarterly payments."],
    faqs: [{ q: "Is the higher gross option always better?", a: "No. Benefits, expenses, taxes, risk, and unpaid administrative time can change the comparison." }],
  },
  {
    id: "credentialing",
    slug: "credentialing-timeline",
    path: "/tools/credentialing-timeline",
    name: "Cardiology Credentialing Readiness and Timeline Planner",
    shortName: "Credentialing readiness",
    eyebrow: "Credentialing planner",
    description: "Estimate a cardiology licensing and privileging range from license pathway, file completeness, procedure logs, disclosures, and committee timing.",
    directAnswer: "Hospital credentialing timelines depend on file completeness, primary-source verification, references, committee cadence, licensing, and requested privileges. This tool shows a range and blockers—not a guaranteed start date.",
    keywords: ["cardiology credentialing timeline", "locum credentialing checklist", "hospital privileging timeline"],
    risk: "standard",
    reviewLabel: "Source-verified public beta",
    sourceIds: ["naltoCredentialing", "imlccEligibility"],
    fields: [
      { key: "state", label: "Assignment state", type: "select", options: states, defaultValue: "Florida" },
      { key: "activeLicense", label: "Active unrestricted license in assignment state", type: "select", options: yesNo, defaultValue: "no" },
      { key: "imlcEligible", label: "Likely IMLC eligible if a new license is needed", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "documentsReady", label: "Core credentialing items ready (0–10)", type: "number", defaultValue: 8, min: 0, max: 10, step: 1 },
      { key: "procedureLogs", label: "Required recent cardiology procedure logs are ready", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "references", label: "Current peer references are ready", type: "select", options: yesNo, defaultValue: "yes" },
      { key: "disclosures", label: "Any claims, gaps, sanctions, or other disclosures need review", type: "select", options: yesNo, defaultValue: "no" },
      { key: "committeeWeeks", label: "Weeks until next medical-staff committee", type: "number", defaultValue: 3, min: 0, max: 12, suffix: " weeks" },
    ],
    methodology: ["Licensing and privileging are modeled as parallel workstreams.", "Missing documents, procedure logs, references, disclosures, and committee timing widen the range.", "The readiness score reflects only user-entered preparation."],
    limitations: ["Facility bylaws control.", "Temporary privileges are never assumed.", "Payer enrollment and state-specific checks may add time."],
    faqs: [{ q: "Can a complete file guarantee a start date?", a: "No. Boards, primary sources, committees, and the facility retain control." }],
  },
];

export const PORTFOLIO_TOOLS = definitions;
export const PORTFOLIO_TOOL_BY_ID = Object.fromEntries(definitions.map((tool) => [tool.id, tool])) as Record<PortfolioToolId, PortfolioToolDefinition>;
export const PORTFOLIO_TOOL_BY_SLUG = Object.fromEntries(definitions.map((tool) => [tool.slug, tool])) as Record<string, PortfolioToolDefinition>;
export const INDEXABLE_PORTFOLIO_TOOL_PATHS = definitions.filter((tool) => tool.risk === "standard").map((tool) => tool.path);
export const DYNAMIC_PORTFOLIO_TOOL_SLUGS = definitions
  .filter((tool) => !["w2-1099", "credentialing"].includes(tool.id))
  .map((tool) => tool.slug);
