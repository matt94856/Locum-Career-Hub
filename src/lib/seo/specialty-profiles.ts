import { specialtyToSlug } from "@/lib/specialty-seo";
import type { Specialty } from "@/lib/specialties";

export type SpecialtyProfile = {
  slug: string;
  name: string;
  settings: string[];
  assignmentSnapshot: string;
  workflowNotes: string;
  credentialingChecklist: string[];
  documentationFocus: string;
  payDrivers: string[];
  fitSignals: string[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
};

const PROFILES: SpecialtyProfile[] = [
  {
    slug: specialtyToSlug("Hospitalist Medicine"),
    name: "Hospitalist Medicine",
    settings: ["Community hospitals", "Academic medical centers", "Critical access hospitals", "Nocturnist programs"],
    assignmentSnapshot:
      "Hospitalist locums are usually shift-based inpatient coverage with explicit census targets, cross-cover rules, and admission caps. Blocks often run 7-on/7-off, 5-on/5-off, or nocturnist-only lanes.",
    workflowNotes:
      "Clarify who handles admissions after cutoff, how cross-cover works for rapid responses, and whether procedures (lines, intubations) are in scope. Handoff quality and chart closure windows should be written—not assumed.",
    credentialingChecklist: [
      "Hospital privileges and FPPE/OPPE expectations",
      "ACLS/BLS (and ATLS if trauma-adjacent)",
      "EHR proficiency for the host system",
      "Coverage for cross-cover and rapid response scope",
    ],
    documentationFocus:
      "Daily census caps, backup hospitalist layers, nocturnist ratios, and expected daily notes per patient.",
    payDrivers: ["Census burden", "Night vs day differentials", "Procedure expectations", "Geographic demand"],
    fitSignals: [
      "You want defined inpatient blocks with a clear end date",
      "You prefer teams that document backup and cross-cover in writing",
    ],
    pitfalls: [
      "Accepting a rate without a documented census target",
      "Assuming cross-cover exists when nights are solo",
    ],
    faqs: [
      {
        q: "What census should be documented for hospitalist locums?",
        a: "A sustainable target range (not a vague ‘manageable’ note), who backs you up, and what happens when the unit is over cap.",
      },
      {
        q: "Are nocturnist locums different from day hospitalist blocks?",
        a: "Yes—night roles often have different cross-cover, rapid response expectations, and pay structures. Treat them as separate contract types.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Emergency Medicine"),
    name: "Emergency Medicine",
    settings: ["Level I–III trauma centers", "Freestanding EDs", "Critical access EDs", "Urgent care overflow sites"],
    assignmentSnapshot:
      "Emergency medicine locums center on hourly or shift coverage with volume bands, acuity mix, and coverage model (single vs double coverage). Peak seasons can change triage pressure quickly.",
    workflowNotes:
      "Confirm ultrasound scope, sedation privileges, tele-psych availability, and inpatient hold policies. Ask how boarding affects your shift and whether mid-level support is guaranteed on busy nights.",
    credentialingChecklist: [
      "Board certification or eligibility (per facility policy)",
      "ATLS/ACLS and state DEA where applicable",
      "Privileging for procedures you will actually perform",
      "Malpractice tail or claims-made conversion clarity",
    ],
    documentationFocus: "Patients per hour bands, acuity mix, boarding policies, and on-call obligations outside scheduled shifts.",
    payDrivers: ["Volume bands", "Night/weekend differentials", "Trauma level", "Boarding burden"],
    fitSignals: ["You want shift work with hard stop times", "You need boarding and coverage rules defined upfront"],
    pitfalls: ["Unsigned volume assumptions", "Solo coverage on nights advertised as ‘team-based’"],
    faqs: [
      {
        q: "How do boarding hours affect ED locum fit?",
        a: "Heavy boarding can turn a 10-hour shift into de facto 12+ hours of cognitive load. Document hold policies and whether compensation adjusts.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Anesthesiology & CRNA"),
    name: "Anesthesiology & CRNA",
    settings: ["OR suites", "Ambulatory surgery centers", "Obstetric units", "Cardiac programs", "Locum CRNA coverage"],
    assignmentSnapshot:
      "Anesthesia locums may be MD-only, CRNA-led with supervision, or mixed models. Case mix (general, regional, cardiac, OB) and call structure drive both lifestyle and liability exposure.",
    workflowNotes:
      "Define supervision ratios, first-case start times, add-on case rules, and who handles OB epidural coverage. Clarify whether you cover ICU airways or only OR.",
    credentialingChecklist: [
      "OR privileging and case-type permissions",
      "State license and DEA alignment",
      "Malpractice limits appropriate to procedural scope",
      "Supervision agreements when CRNAs are primary deliverers",
    ],
    documentationFocus: "Case mix, call frequency, add-on expectations, and OB coverage responsibilities.",
    payDrivers: ["Call burden", "Case complexity", "Supervision load", "Rural vs metro access"],
    fitSignals: ["You want predictable OR blocks", "You need call schedules and add-on rules in the contract"],
    pitfalls: ["Assuming CRNA coverage without a signed supervision agreement", "Unclear add-on compensation"],
    faqs: [
      {
        q: "Do CRNA and physician anesthesia locums differ contractually?",
        a: "Yes—supervision, billing, and malpractice structures differ. Match the contract to the actual care model at the site.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Family Medicine"),
    name: "Family Medicine",
    settings: ["Outpatient clinics", "Rural health centers", "Urgent care hybrids", "SNF or light inpatient"],
    assignmentSnapshot:
      "Family medicine locums span pure outpatient panels, walk-in heavy clinics, and hybrid inpatient/outpatient roles. Panel size, telehealth mix, and MA support define sustainable pace.",
    workflowNotes:
      "Document patients per day, same-day add-ons, prior-auth load, and whether you cover nursing homes or hospital follow-ups.",
    credentialingChecklist: [
      "Clinic privileging and e-prescribing setup",
      "DEA and state controlled-substance rules",
      "Telehealth licensure if virtual blocks are included",
    ],
    documentationFocus: "Daily visit volume, support staff ratios, and scope (peds, OB, procedures).",
    payDrivers: ["Panel pace", "Procedure add-ons", "Rural incentives", "Telehealth share"],
    fitSignals: ["You want outpatient rhythm with clear visit caps", "You prefer clinics with MA/LPN support documented"],
    pitfalls: ["Open-ended ‘as needed’ visit volumes", "Telehealth across states without licensure plan"],
    faqs: [
      {
        q: "Can family medicine locums include OB or procedures?",
        a: "Sometimes—privileges must match scope. Do not assume OB or scopes beyond clinic norms without written privileging.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Internal Medicine"),
    name: "Internal Medicine",
    settings: ["Outpatient IM clinics", "Hospitalist-adjacent IM", "SNF coverage", "Telemedicine panels"],
    assignmentSnapshot:
      "Internal medicine locums range from ambulatory chronic-care panels to consult-heavy inpatient roles. Complexity mix (diabetes, CHF, renal) affects sustainable daily volume.",
    workflowNotes:
      "Clarify whether you manage acute admits, SNF weeks, or clinic-only. Ask about infusion suites, anticoag clinics, and prior-auth support.",
    credentialingChecklist: [
      "Clinic or hospital privileges aligned to scope",
      "EHR inbox expectations if extending beyond shifts",
      "Telehealth licenses for multi-state virtual panels",
    ],
    documentationFocus: "Visit volume, inbox coverage rules, and inpatient vs outpatient boundaries.",
    payDrivers: ["Acuity mix", "Inbox obligations", "Call for clinic patients", "Subspecialty backup availability"],
    fitSignals: ["You want chronic-care depth with support", "You need inbox rules defined for part-time blocks"],
    pitfalls: ["Unlimited inbox work after locum week ends", "SNF volume without travel or stipend clarity"],
    faqs: [
      {
        q: "How is IM locum work different from hospitalist locums?",
        a: "IM locums may be outpatient-forward with lighter or no inpatient duty. Read privileges and schedules—titles alone are not enough.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Psychiatry"),
    name: "Psychiatry",
    settings: ["Inpatient psych units", "ED consult services", "Outpatient telepsych", "Community mental health centers"],
    assignmentSnapshot:
      "Psychiatry locums include inpatient rounding, consult-liaison, and telehealth outpatient. Coverage for involuntary holds, seclusion/restraint policies, and teleprescribing rules varies by state.",
    workflowNotes:
      "Confirm census, consult-only vs primary attending roles, and whether you cover nights/weekends on-call for admissions.",
    credentialingChecklist: [
      "DEA and state controlled-substance registration",
      "Telepsych licensure and platform compliance",
      "Hospital policies for holds and involuntary treatment",
    ],
    documentationFocus: "Census caps, consult turnaround expectations, and telehealth prescribing rules.",
    payDrivers: ["Inpatient vs outpatient mix", "Call for admissions", "Telehealth panel size", "Rural need"],
    fitSignals: ["You want defined census on inpatient units", "You need telehealth rules aligned to state law"],
    pitfalls: ["Solo inpatient coverage without backup", "Telepsych across states without licenses"],
    faqs: [
      {
        q: "Are telepsychiatry locums licensed per state?",
        a: "Yes—patients’ location usually governs licensure. Map states before accepting virtual blocks.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Radiology"),
    name: "Radiology",
    settings: ["Teleradiology hubs", "On-site diagnostic suites", "Night nighthawk coverage", "MSK or breast subspecialty reads"],
    assignmentSnapshot:
      "Radiology locums may be on-site or remote with RVU-based expectations. Turnaround times, subspecialty mix, and contrast reaction coverage must be explicit.",
    workflowNotes:
      "Define RVU targets, critical result escalation paths, and whether you cover procedures (biopsies, drains). Clarify IT setup for remote reads.",
    credentialingChecklist: [
      "State licenses for where images are interpreted (site-dependent)",
      "PACS access and credentialing for telerad platforms",
      "Malpractice appropriate to read volume and procedures",
    ],
    documentationFocus: "RVU or study volume targets, subspecialty exclusions, and procedure coverage.",
    payDrivers: ["RVU pace", "Night/weekend differential", "Subspecialty mix", "Remote vs on-site"],
    fitSignals: ["You want RVU targets with realistic study mix", "You need IT and licensure clarity for telerad"],
    pitfalls: ["Open-ended RVU clauses without study-type ranges", "Remote reads without multi-state license plan"],
    faqs: [
      {
        q: "Do teleradiology locums need a license in every state?",
        a: "Often yes—requirements depend on where patients are located and facility policy. Confirm before starting reads.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Surgery & Orthopedics"),
    name: "Surgery & Orthopedics",
    settings: ["General surgery call pools", "Orthopedic trauma", "ASC elective blocks", "Rural broad-spectrum surgery"],
    assignmentSnapshot:
      "Surgical locums range from elective block OR days to full trauma call. Clarify consult vs primary surgeon roles, clinic days, and rounding expectations.",
    workflowNotes:
      "Document call frequency, first-assist vs primary, and equipment availability for your case mix. Malpractice limits should match procedural scope.",
    credentialingChecklist: [
      "Privileging for specific procedures you will perform",
      "Trauma activation level alignment",
      "Assistant availability and OR block guarantees",
    ],
    documentationFocus: "Call schedule, case mix, clinic load, and backup for complications.",
    payDrivers: ["Call burden", "Case mix complexity", "Clinic days added", "Rural breadth premium"],
    fitSignals: ["You want call schedules with backup documented", "You need privileging aligned to actual cases"],
    pitfalls: ["Broad ‘general surgery’ posts without procedure lists", "Call without post-call protection"],
    faqs: [
      {
        q: "Should orthopedic and general surgery locums be treated the same?",
        a: "No—privileging, call, and equipment differ. Use specialty-specific contracts and site visits when possible.",
      },
    ],
  },
  {
    slug: specialtyToSlug("OB/GYN"),
    name: "OB/GYN",
    settings: ["Labor & delivery units", "Outpatient OB clinics", "GYN-only locums", "Rural full-scope OB"],
    assignmentSnapshot:
      "OB/GYN locums may be laborist-only, clinic-heavy, or full-scope with call. Delivery volume, nursery level, and anesthesia backup define safety and pace.",
    workflowNotes:
      "Confirm backup from MFMs, anesthesia, and NICU levels. Clarify GYN OR days vs pure L&D shifts.",
    credentialingChecklist: [
      "Delivery volume expectations and backup pathways",
      "Privileges for operative GYN if applicable",
      "Malpractice tail given obstetric exposure",
    ],
    documentationFocus: "Deliveries per shift/month, clinic load, and call frequency.",
    payDrivers: ["Call and delivery volume", "Clinic add-ons", "Rural full-scope premiums", "Malpractice environment"],
    fitSignals: ["You want L&D backup documented", "You need clinic vs laborist scope clear"],
    pitfalls: ["Solo rural OB without anesthesia/NICU clarity", "Unlimited clinic plus heavy call"],
    faqs: [
      {
        q: "What is a laborist locum vs full-scope OB/GYN locum?",
        a: "Laborists focus on L&D coverage; full-scope includes clinic and GYN surgery. Contracts and malpractice should match the role.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Pediatrics"),
    name: "Pediatrics",
    settings: ["Children’s hospitals", "Community peds wards", "Outpatient pediatrics", "NICU-adjacent roles"],
    assignmentSnapshot:
      "Pediatric locums include inpatient ward attending, urgent pediatrics, and outpatient clinics. Nursery level, PICU backup, and telehealth rules should be explicit.",
    workflowNotes:
      "Define age ranges, procedure scope, and night call expectations. Confirm whether you cover newborns, adolescents, or both.",
    credentialingChecklist: [
      "PALS/BLS and hospital privileges for peds units",
      "NICU/PICU backup pathways",
      "Telehealth consent rules for minors if virtual",
    ],
    documentationFocus: "Census, age range, nursery level, and outpatient panel pace if hybrid.",
    payDrivers: ["Inpatient vs outpatient", "Call for deliveries or NICU", "Subspecialty backup", "Seasonal URI volume"],
    fitSignals: ["You want age range and census defined", "You need PICU backup for inpatient roles"],
    pitfalls: ["Adult-overflow units without pediatric support", "Outpatient pace without MA support"],
    faqs: [
      {
        q: "Do pediatric hospitalist locums differ from outpatient pediatrics locums?",
        a: "Yes—inpatient roles need ward census, PICU backup, and night coverage clarity. Outpatient roles hinge on visit volume and telehealth policy.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Cardiology"),
    name: "Cardiology",
    settings: ["Inpatient consult services", "Non-invasive cardiology clinics", "Stress lab coverage", "Telecardiology"],
    assignmentSnapshot:
      "Cardiology locums may be consult-only, imaging-heavy, or include procedures depending on privileges. Clarify cath lab call, echo volume, and weekend rounding.",
    workflowNotes:
      "Document whether you interpret studies only or manage active inpatient ACS pathways. Confirm telemetry coverage and mid-level support.",
    credentialingChecklist: [
      "Privileging for echo, nuclear, cath as applicable",
      "Call for STEMI/cath lab if required",
      "Telecardiology licensure for remote reads",
    ],
    documentationFocus: "Consult volume, imaging expectations, and procedural call.",
    payDrivers: ["Procedure call", "Imaging RVUs", "Weekend rounding", "Tele vs on-site"],
    fitSignals: ["You want consult caps and imaging volumes documented", "You need cath call frequency explicit"],
    pitfalls: ["Consult-only posts with hidden procedure call", "Imaging RVUs without study mix"],
    faqs: [
      {
        q: "Can cardiology locums be non-invasive only?",
        a: "Yes—many assignments are consult and imaging focused. Match privileges and malpractice to the actual scope.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Urgent Care"),
    name: "Urgent Care",
    settings: ["Retail urgent care", "Hospital-affiliated UC", "Occupational health hybrids", "Evening/weekend walk-in"],
    assignmentSnapshot:
      "Urgent care locums are shift-based with patients-per-hour targets and procedure scope (sutures, splints, minor procedures). Imaging and lab turnaround affect pace.",
    workflowNotes:
      "Clarify site labs, X-ray, and referral pathways. Ask about occupational health add-ons and prescription monitoring rules.",
    credentialingChecklist: [
      "DEA and state UC regulations",
      "Radiation safety if reading your own films",
      "Telehealth UC rules if hybrid",
    ],
    documentationFocus: "Hourly volume bands, procedures in scope, and staffing (MA/RN) per shift.",
    payDrivers: ["Shift differentials", "Volume bands", "Procedure mix", "Holiday/weekend rates"],
    fitSignals: ["You want hourly volume in writing", "You prefer sites with on-shift imaging and lab"],
    pitfalls: ["Volume targets without staffing support", "Broad procedure scope without training/privileges"],
    faqs: [
      {
        q: "How is urgent care locums different from ED locums?",
        a: "UC is typically lower acuity with faster throughput targets; ED has boarding and higher acuity. Contracts and malpractice differ—do not interchange them.",
      },
    ],
  },
  {
    slug: specialtyToSlug("Telehealth"),
    name: "Telehealth",
    settings: [
      "Multi-state virtual clinics",
      "After-hours telemedicine",
      "Specialty teleconsults",
      "Employer-sponsored virtual care",
    ],
    assignmentSnapshot:
      "Telehealth locums depend on licensure footprint, platform compliance, and panel pacing. Pay may be per visit, per hour, or salaried shift blocks.",
    workflowNotes:
      "Map patient location rules, prescribing constraints, and malpractice covering virtual care. Confirm IT onboarding and documentation time outside live visits.",
    credentialingChecklist: [
      "Licenses where patients are located",
      "Platform training and privacy compliance",
      "Prescribing rules for controlled substances via telehealth",
    ],
    documentationFocus: "Visits per hour, on-call expectations, and cross-state licensure plan.",
    payDrivers: ["Licensed states count", "After-hours coverage", "Specialty-specific visit complexity", "Panel size"],
    fitSignals: ["You want licensure plan before signing", "You need per-visit vs per-hour pay explicit"],
    pitfalls: ["Practicing where you are not licensed", "Unpaid charting time outside visit blocks"],
    faqs: [
      {
        q: "Which license matters for telehealth locums?",
        a: "Usually the patient’s location. Build a multi-state plan or limit assignments to states where you are already licensed.",
      },
    ],
  },
];

const bySlug = new Map(PROFILES.map((p) => [p.slug, p]));

export function getSpecialtyProfile(slug: string): SpecialtyProfile | undefined {
  return bySlug.get(slug);
}

export function getSpecialtyProfileByName(name: Specialty): SpecialtyProfile | undefined {
  return bySlug.get(specialtyToSlug(name));
}
