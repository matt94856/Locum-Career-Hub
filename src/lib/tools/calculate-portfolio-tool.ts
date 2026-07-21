import type { PortfolioToolId } from "./portfolio-tools";

export type ToolValues = Record<string, string | number | boolean>;
export type ToolResult = {
  headline: string;
  summary: string;
  score?: number;
  confidence: "High" | "Moderate" | "Scenario";
  metrics: { label: string; value: string; note?: string }[];
  actions: string[];
  warnings: string[];
};

const n = (values: ToolValues, key: string) => Number(values[key] ?? 0);
const yes = (values: ToolValues, key: string) => values[key] === "yes" || values[key] === true;
const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const pct = (value: number) => `${value.toFixed(0)}%`;
const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

function calculateImlc(v: ToolValues): ToolResult {
  const requirements = ["fullLicense", "splConnection", "boardCertified", "examAttempts", "cleanHistory"];
  const failed = requirements.filter((key) => !yes(v, key));
  const cost = 700 + n(v, "targetLicenses") * n(v, "averageStateFee");
  const eligible = failed.length === 0;
  return {
    headline: eligible ? "You appear to meet the core IMLC prequalification screen" : "At least one core IMLC criterion needs verification",
    summary: eligible
      ? "This is a strong pre-screen, but your State of Principal License and the IMLCC make the official determination."
      : "A direct state application may still be available even if the Compact pathway is not.",
    score: Math.round(((requirements.length - failed.length) / requirements.length) * 100),
    confidence: "High",
    metrics: [
      { label: "Estimated Compact + state fees", value: money(cost), note: "Uses $700 Compact fee plus your state-fee input." },
      { label: "Separate state licenses", value: String(n(v, "targetLicenses")) },
      { label: "Planning range", value: eligible ? "4–12+ weeks" : "Direct-board path", note: "Not an approval or start-date promise." },
    ],
    actions: eligible
      ? ["Confirm your State of Principal License connection.", "Verify each target-state fee on the IMLCC fee page.", "Prepare primary-source and background-check materials."]
      : ["Review each failed criterion with the IMLCC eligibility page.", "Ask the target board about direct licensure.", "Do not pay fees until the correct pathway is confirmed."],
    warnings: ["The Compact is an expedited application pathway, not a multistate license.", "Hospital privileging is separate from state licensure."],
  };
}

function calculateLicenseRoi(v: ToolValues): ToolResult {
  const directCost = n(v, "applicationCost") + n(v, "renewalCost");
  const timeCost = n(v, "adminHours") * n(v, "hourValue");
  const expectedIncome = n(v, "assignmentDays") * n(v, "netDaily") * clamp(n(v, "probability")) / 100;
  const net = expectedIncome - directCost - timeCost;
  const totalCost = directCost + timeCost;
  const roi = totalCost > 0 ? (net / totalCost) * 100 : 0;
  const breakEvenDays = n(v, "netDaily") > 0 && n(v, "probability") > 0
    ? totalCost / (n(v, "netDaily") * n(v, "probability") / 100)
    : 0;
  return {
    headline: net >= 0 ? `${String(v.state)} shows positive scenario value` : `${String(v.state)} does not break even under these assumptions`,
    summary: "This result is probability-weighted. Change the assignment probability to stress-test demand uncertainty.",
    confidence: "Scenario",
    metrics: [
      { label: "Expected net value", value: money(net) },
      { label: "Modeled ROI", value: pct(roi) },
      { label: "Break-even paid days", value: breakEvenDays.toFixed(1) },
      { label: "Total license + time cost", value: money(totalCost) },
    ],
    actions: ["Confirm official application and renewal costs.", "Validate real assignment demand before applying.", "Compare the IMLC and direct-board pathways if both are available."],
    warnings: ["A license creates access, not guaranteed work.", "The probability and daily net income are user estimates."],
  };
}

function offer(v: ToolValues, prefix: "a" | "b") {
  const gross = n(v, `${prefix}Rate`) * n(v, `${prefix}PaidHours`) + n(v, `${prefix}CallPay`);
  const net = gross - n(v, `${prefix}Costs`);
  const riskAdjusted = net * (1 - clamp(n(v, `${prefix}CancelRisk`)) / 100);
  const hours = n(v, `${prefix}PaidHours`) + n(v, `${prefix}UnpaidHours`);
  return { gross, net, riskAdjusted, hours, hourly: hours > 0 ? riskAdjusted / hours : 0 };
}

function calculateOfferComparison(v: ToolValues): ToolResult {
  const a = offer(v, "a");
  const b = offer(v, "b");
  const winner = a.hourly >= b.hourly ? "Offer A" : "Offer B";
  const delta = Math.abs(a.hourly - b.hourly);
  return {
    headline: `${winner} has the higher risk-adjusted effective hourly value`,
    summary: `${winner} leads by ${money(delta)} per total committed hour under your travel, unpaid-time, and cancellation assumptions.`,
    confidence: "Scenario",
    metrics: [
      { label: "Offer A effective value", value: `${money(a.hourly)}/hr`, note: `${money(a.riskAdjusted)} risk-adjusted assignment value` },
      { label: "Offer B effective value", value: `${money(b.hourly)}/hr`, note: `${money(b.riskAdjusted)} risk-adjusted assignment value` },
      { label: "Offer A headline gross", value: money(a.gross) },
      { label: "Offer B headline gross", value: money(b.gross) },
    ],
    actions: ["Confirm cancellation pay in writing.", "Ask which travel and administrative hours are reimbursed.", "Compare malpractice, tail, scope, and post-call expectations before choosing."],
    warnings: ["This comparison excludes taxes and replacement benefits.", "Cancellation probabilities are user-entered scenarios."],
  };
}

function calculateCall(v: ToolValues): ToolResult {
  const totalPay = n(v, "stipend") + n(v, "procedurePay");
  const burdenHours = n(v, "activeHours") + n(v, "recoveryHours") + n(v, "restrictedHours") * clamp(n(v, "restrictionWeight")) / 100;
  const hourly = burdenHours > 0 ? totalPay / burdenHours : 0;
  const annual = totalPay * n(v, "callsPerMonth") * 12;
  const annualBurden = burdenHours * n(v, "callsPerMonth") * 12;
  return {
    headline: `Your modeled call value is ${money(hourly)} per burden hour`,
    summary: "Burden hours combine active work, recovery time, and the share of restricted pager time you believe meaningfully limits personal use.",
    confidence: "Scenario",
    metrics: [
      { label: "Pay per call period", value: money(totalPay) },
      { label: "Burden hours per period", value: `${burdenHours.toFixed(1)} hrs` },
      { label: "Annualized call pay", value: money(annual) },
      { label: "Annualized burden", value: `${annualBurden.toFixed(0)} hrs` },
    ],
    actions: ["Ask for historical callback and procedure volume.", "Define response radius, simultaneous coverage, and post-call relief.", "Compare the call-adjusted rate with a clinic-only assignment."],
    warnings: ["This is not a clinical fatigue assessment.", "Protect patient safety and adequate rest regardless of economics."],
  };
}

function calculateContract(v: ToolValues): ToolResult {
  const flags: { condition: boolean; text: string; severe?: boolean }[] = [
    { condition: !yes(v, "writtenScope"), text: "Write clinical scope, facilities, supervision, and call duties into the agreement.", severe: true },
    { condition: !yes(v, "cancelProtection"), text: "Clarify notice, cancellation pay, and nonrefundable travel exposure.", severe: true },
    { condition: !yes(v, "malpracticeClear"), text: "Confirm policy type, limits, covered acts, and tail responsibility.", severe: true },
    { condition: !yes(v, "paymentClear"), text: "Define rates, timekeeping, invoicing, disputed hours, and payment deadlines." },
    { condition: !yes(v, "travelClear"), text: "Define booking authority, reimbursement, and cancellation treatment." },
    { condition: yes(v, "exclusivity"), text: "Have counsel review exclusivity, presentation, and anti-circumvention language." },
    { condition: yes(v, "indemnity"), text: "Have counsel review indemnity scope, defense duties, and insurance alignment.", severe: true },
    { condition: n(v, "terminationDays") > 60, text: "Assess whether the without-cause notice period limits flexibility." },
    { condition: n(v, "paymentDays") > 45, text: "Ask whether payment timing can be shortened or late-payment rights added." },
  ];
  const active = flags.filter((flag) => flag.condition);
  const severe = active.filter((flag) => flag.severe).length;
  const score = clamp(100 - active.length * 8 - severe * 7);
  return {
    headline: active.length === 0 ? "No checklist gaps appeared in your structured answers" : `${active.length} contract topics deserve clarification`,
    summary: "A flag means “ask and review,” not that a provision is unlawful or unacceptable.",
    score,
    confidence: "Moderate",
    metrics: [
      { label: "Discussion flags", value: String(active.length) },
      { label: "Higher-exposure topics", value: String(severe) },
      { label: "Readiness score", value: `${score}/100` },
    ],
    actions: active.map((flag) => flag.text),
    warnings: ["Educational checklist only—not legal advice.", "A healthcare attorney must review exact wording and applicable law."],
  };
}

function calculateRvu(v: ToolValues): ToolResult {
  const excess = Math.max(0, n(v, "annualWrvu") - n(v, "threshold"));
  const productivity = excess * n(v, "conversionRate");
  const total = n(v, "baseSalary") + productivity + n(v, "qualityBonus") + n(v, "callPay");
  const wrvu = n(v, "annualWrvu");
  const fte = Math.max(0.1, n(v, "fte"));
  return {
    headline: `Modeled total compensation: ${money(total)}`,
    summary: `${excess.toLocaleString()} work RVUs are above your entered threshold and generate ${money(productivity)} in modeled productivity pay.`,
    confidence: "High",
    metrics: [
      { label: "Productivity bonus", value: money(productivity) },
      { label: "Effective compensation per wRVU", value: wrvu > 0 ? money(total / wrvu) : "—" },
      { label: "FTE-normalized compensation", value: money(total / fte) },
      { label: "Total compensation", value: money(total) },
    ],
    actions: ["Confirm which services receive work-RVU credit.", "Check whether the threshold and rate reset by month, quarter, or year.", "Model downside volume and quality-bonus attainment."],
    warnings: ["CMS work RVUs are not compensation benchmarks.", "Verify all contract definitions and licensed benchmark comparisons independently."],
  };
}

function calculateRetirement(v: ToolValues): ToolResult {
  const years = Math.max(0, Math.floor(n(v, "endAge") - n(v, "currentAge")));
  const afterTaxLocum = n(v, "locumGross") * (1 - clamp(n(v, "effectiveTax"), 0, 100) / 100);
  let withLocums = n(v, "portfolio");
  let withoutLocums = n(v, "portfolio");
  let spending = n(v, "annualSpending");
  for (let year = 0; year < years; year += 1) {
    withLocums = withLocums * (1 + n(v, "returnRate") / 100) + afterTaxLocum - spending;
    withoutLocums = withoutLocums * (1 + n(v, "returnRate") / 100) - spending;
    spending *= 1 + n(v, "inflation") / 100;
  }
  const bridgeValue = withLocums - withoutLocums;
  return {
    headline: `${years}-year locum bridge adds ${money(bridgeValue)} in this smooth-return scenario`,
    summary: `At age ${n(v, "endAge")}, the modeled portfolio is ${money(withLocums)} with locums versus ${money(withoutLocums)} without locums.`,
    confidence: "Scenario",
    metrics: [
      { label: "After-tax annual locum income", value: money(afterTaxLocum) },
      { label: "Portfolio with locums", value: money(withLocums) },
      { label: "Portfolio without locums", value: money(withoutLocums) },
      { label: "Modeled bridge value", value: money(bridgeValue) },
    ],
    actions: ["Stress-test lower returns and higher healthcare costs.", "Confirm insurance, tail, disability, and tax assumptions.", "Review the complete plan with fiduciary financial and tax professionals."],
    warnings: ["Not financial, investment, or tax advice.", "Smooth annual returns understate real sequence-of-returns risk."],
  };
}

function calculateCme(v: ToolValues): ToolResult {
  const gap = Math.max(0, n(v, "cmeRequired") - n(v, "cmeComplete"));
  let score = 100;
  score -= Math.min(30, n(v, "renewals12m") * 8);
  if (gap > 0) score -= Math.min(30, Math.round((gap / Math.max(1, n(v, "cmeRequired"))) * 30));
  if (n(v, "deaMonths") <= 6) score -= 15;
  if (n(v, "boardMonths") <= 12) score -= 10;
  if (!yes(v, "controlledSubstance")) score -= 8;
  if (!yes(v, "sourceVerified")) score -= 12;
  score = clamp(score);
  const actions = [
    ...(gap > 0 ? [`Document or complete ${gap} remaining CME hours in the cycles you entered.`] : []),
    ...(n(v, "renewals12m") > 0 ? [`Calendar ${n(v, "renewals12m")} license renewal(s) due within 12 months.`] : []),
    ...(n(v, "deaMonths") <= 6 ? ["Begin DEA renewal verification now."] : []),
    ...(!yes(v, "controlledSubstance") ? ["Review every state controlled-substance registration."] : []),
    ...(!yes(v, "sourceVerified") ? ["Verify each requirement on the official board or agency website."] : []),
  ];
  return {
    headline: `Your self-reported renewal readiness is ${score}/100`,
    summary: "The score prioritizes deadlines and verification gaps; it does not certify that any requirement is complete.",
    score,
    confidence: "Moderate",
    metrics: [
      { label: "CME gap entered", value: `${gap} hrs` },
      { label: "Renewals within 12 months", value: String(n(v, "renewals12m")) },
      { label: "DEA runway", value: `${n(v, "deaMonths")} months` },
      { label: "Board runway", value: `${n(v, "boardMonths")} months` },
    ],
    actions: actions.length ? actions : ["Maintain dated source links and completion certificates.", "Recheck official requirements before every renewal."],
    warnings: ["Self-reported planning aid only.", "Rules differ by state and credential type."],
  };
}

function payrollTax(wages: number) {
  const socialSecurity = Math.min(Math.max(0, wages), 184_500) * 0.062;
  return socialSecurity + Math.max(0, wages) * 0.0145;
}

function calculateW2(v: ToolValues): ToolResult {
  const w2Salary = n(v, "w2Salary");
  const w2Cash = w2Salary - w2Salary * clamp(n(v, "w2WithholdingRate")) / 100 - payrollTax(w2Salary);
  const w2Value = w2Cash + n(v, "w2Benefits");
  const contractorProfit = Math.max(0, n(v, "contractRevenue") - n(v, "businessExpenses"));
  const seTaxable = contractorProfit * 0.9235;
  const remainingSsBase = Math.max(0, 184_500 - n(v, "otherW2Wages"));
  const seTax = Math.min(seTaxable, remainingSsBase) * 0.124 + seTaxable * 0.029;
  const contractorValue = contractorProfit - contractorProfit * clamp(n(v, "contractTaxRate")) / 100 - seTax - n(v, "replacementBenefits");
  const hybridProfit = Math.max(0, n(v, "hybridLocumRevenue") - n(v, "hybridExpenses"));
  const hybridTaxable = hybridProfit * 0.9235;
  const hybridRemainingSsBase = Math.max(0, 184_500 - w2Salary);
  const hybridSeTax = Math.min(hybridTaxable, hybridRemainingSsBase) * 0.124 + hybridTaxable * 0.029;
  const hybridValue = w2Value + hybridProfit - hybridProfit * clamp(n(v, "contractTaxRate")) / 100 - hybridSeTax;
  const scenarios = [
    { label: "W-2 scenario", value: w2Value },
    { label: "1099 scenario", value: contractorValue },
    { label: "Hybrid W-2 + locums scenario", value: hybridValue },
  ].sort((a, b) => b.value - a.value);
  const winner = scenarios[0];
  return {
    headline: `${winner.label} has the highest modeled value`,
    summary: `${winner.label} leads the next scenario by ${money(winner.value - scenarios[1].value)} after the inputs and simplified taxes shown.`,
    confidence: "Scenario",
    metrics: [
      { label: "W-2 cash + benefits", value: money(w2Value) },
      { label: "1099 spendable value", value: money(contractorValue) },
      { label: "Hybrid spendable value", value: money(hybridValue) },
      { label: "Estimated self-employment tax", value: money(seTax) },
    ],
    actions: ["Ask a CPA to model filing status, QBI, retirement contributions, state taxes, and deductions.", "Confirm worker classification and malpractice structure.", "Compare unpaid time and assignment volatility separately."],
    warnings: ["Simplified tax estimate; not tax advice.", "Additional Medicare tax, deductions, credits, AMT, and detailed state rules are excluded."],
  };
}

function calculateCredentialing(v: ToolValues): ToolResult {
  const licenseLow = yes(v, "activeLicense") ? 0 : yes(v, "imlcEligible") ? 4 : 8;
  const licenseHigh = yes(v, "activeLicense") ? 0 : yes(v, "imlcEligible") ? 12 : 20;
  const missing = Math.max(0, 10 - n(v, "documentsReady"));
  let privilegeLow = 6 + Math.ceil(missing / 3);
  let privilegeHigh = 12 + missing;
  if (!yes(v, "procedureLogs")) { privilegeLow += 2; privilegeHigh += 6; }
  if (!yes(v, "references")) { privilegeLow += 1; privilegeHigh += 4; }
  if (yes(v, "disclosures")) { privilegeLow += 2; privilegeHigh += 10; }
  privilegeLow += Math.min(4, n(v, "committeeWeeks"));
  privilegeHigh += n(v, "committeeWeeks");
  const totalLow = Math.max(licenseLow, privilegeLow);
  const totalHigh = Math.max(licenseHigh, privilegeHigh);
  const score = clamp(100 - missing * 6 - (!yes(v, "procedureLogs") ? 12 : 0) - (!yes(v, "references") ? 8 : 0) - (yes(v, "disclosures") ? 10 : 0) - (!yes(v, "activeLicense") ? 8 : 0));
  return {
    headline: `Plan for roughly ${totalLow}–${totalHigh}+ weeks`,
    summary: "Licensing and hospital privileging can proceed in parallel. The slower workstream usually controls the start date.",
    score,
    confidence: "Moderate",
    metrics: [
      { label: "Readiness score", value: `${score}/100` },
      { label: "License workstream", value: licenseHigh === 0 ? "Active license entered" : `${licenseLow}–${licenseHigh}+ weeks` },
      { label: "Privileging workstream", value: `${privilegeLow}–${privilegeHigh}+ weeks` },
      { label: "Planning range", value: `${totalLow}–${totalHigh}+ weeks` },
    ],
    actions: ["Request the facility's complete privilege list and checklist.", "Gather procedure logs, peer references, claims history, training, and work-history explanations.", "Confirm committee dates and whether temporary privileges are available—never assume them."],
    warnings: ["Facility and board processing times control.", "This is a planning range, not a guaranteed start date."],
  };
}

export function calculatePortfolioTool(id: PortfolioToolId, values: ToolValues): ToolResult {
  switch (id) {
    case "imlc": return calculateImlc(values);
    case "license-roi": return calculateLicenseRoi(values);
    case "offer-comparison": return calculateOfferComparison(values);
    case "call-burden": return calculateCall(values);
    case "contract-checker": return calculateContract(values);
    case "rvu": return calculateRvu(values);
    case "retirement": return calculateRetirement(values);
    case "license-cme": return calculateCme(values);
    case "w2-1099": return calculateW2(values);
    case "credentialing": return calculateCredentialing(values);
  }
}
