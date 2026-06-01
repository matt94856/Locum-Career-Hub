import { specialtyToSlug } from "@/lib/specialty-seo";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";

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

const CARDIOLOGY_PROFILE_DATA: Omit<SpecialtyProfile, "slug" | "name">[] = [
  {
    settings: ["Inpatient consult services", "Outpatient clinic blocks", "Telecardiology reads", "Weekend hospital coverage"],
    assignmentSnapshot:
      "General cardiology locums often blend inpatient consults, outpatient continuity gaps, and stress testing oversight. Blocks may run 7-on/7-off, weekday clinic weeks, or hybrid models with echo interpretation.",
    workflowNotes:
      "Confirm stress test supervision, nuclear read expectations, call frequency, and whether you cover ICU consults or only cardiology service patients. Document PCI backup if you are non-invasive.",
    credentialingChecklist: [
      "Hospital privileges with echo and stress lab scope",
      "Board certification or eligibility per facility policy",
      "State license and DEA where applicable",
      "Malpractice limits aligned with procedural vs consult-only scope",
    ],
    documentationFocus: "Daily consult volume, outpatient panel expectations, echo read turnaround, and call backup.",
    payDrivers: ["Call burden", "Outpatient panel size", "Echo/stress volume", "Geographic demand"],
    fitSignals: [
      "You want consult-heavy blocks with documented backup",
      "You prefer written stress test and echo supervision rules",
    ],
    pitfalls: [
      "Accepting consult volume without documented cross-cover on nights",
      "Assuming outpatient blocks exclude inpatient callbacks",
    ],
    faqs: [
      {
        q: "What should be documented for general cardiology locums?",
        a: "Consult caps, call schedule, echo/stress scope, ICU involvement, and who covers nights when the service is busy.",
      },
      {
        q: "Can general cardiologists do locums without cath lab privileges?",
        a: "Yes—many assignments are consult and clinic focused. Confirm procedural expectations before signing.",
      },
    ],
  },
  {
    settings: ["Cath labs", "PCI-capable hospitals", "Structural programs", "Hybrid OR suites"],
    assignmentSnapshot:
      "Interventional cardiology locums center on cath lab coverage, STEMI call, and sometimes structural cases. Case mix, activation times, and backup surgery pathways drive fit.",
    workflowNotes:
      "Define STEMI activation role, on-call PCI expectations, complication backup, and whether you cover peripheral interventions. Clarify TAVR/structural scope if advertised.",
    credentialingChecklist: [
      "Cath lab privileges with documented case types",
      "Current procedural logs if required by the facility",
      "STEMI call expectations in writing",
      "Malpractice appropriate to PCI and structural scope",
    ],
    documentationFocus: "STEMI activation, case mix, call frequency, and complication backup pathways.",
    payDrivers: ["STEMI call", "Case mix complexity", "Night and weekend coverage", "Lab throughput pressure"],
    fitSignals: ["You need STEMI and call rules before committing", "You want case mix and backup surgery documented"],
    pitfalls: ["Solo STEMI coverage without documented surgical backup", "Unclear add-on case compensation"],
    faqs: [
      {
        q: "How do STEMI call expectations affect interventional locums?",
        a: "Activation windows, transport patterns, and whether you are primary operator vs backup should be explicit—they change lifestyle and liability.",
      },
    ],
  },
  {
    settings: ["EP labs", "Device clinics", "Arrhythmia hospitals", "Outpatient ablation programs"],
    assignmentSnapshot:
      "Electrophysiology locums cover device clinics, ablations, and inpatient arrhythmia consults. Lab access, mapping systems, and device rep support vary by site.",
    workflowNotes:
      "Confirm device implant volume, ablation case types, overnight arrhythmia coverage, and whether you read remote monitoring between blocks.",
    credentialingChecklist: [
      "EP lab privileges and device implant scope",
      "Credentialing for ablation modalities you will use",
      "Overnight arrhythmia call clarity",
      "Malpractice aligned with device and ablation work",
    ],
    documentationFocus: "Ablation case mix, device clinic load, call, and remote monitoring expectations.",
    payDrivers: ["Ablation volume", "Device clinic panels", "Call", "Lab technology constraints"],
    fitSignals: ["You want lab capabilities and case mix confirmed before travel", "You need device clinic load in writing"],
    pitfalls: ["Assuming lab tech and mapping support without verification", "Remote monitoring load added informally"],
    faqs: [
      {
        q: "Are EP locums different from general cardiology call?",
        a: "Yes—device clinics, ablation labs, and arrhythmia call are separate workloads. Contracts should separate each.",
      },
    ],
  },
  {
    settings: ["Advanced heart failure programs", "Transplant-adjacent centers", "LVAD hospitals", "Inpatient HF units"],
    assignmentSnapshot:
      "Heart failure locums often involve advanced therapies, transplant-adjacent consults, and complex diuresis pathways. Team structure and APP support matter.",
    workflowNotes:
      "Clarify LVAD and transplant consult scope, weekend rounding expectations, and whether you manage drips and temporary MCS decisions.",
    credentialingChecklist: [
      "Privileges for advanced HF and transplant-adjacent consults if applicable",
      "Team-based coverage documentation",
      "Ultrasound or RHC scope if required",
      "Malpractice aligned with advanced therapy exposure",
    ],
    documentationFocus: "Census on HF service, transplant-adjacent scope, weekend coverage, and therapy protocols.",
    payDrivers: ["Advanced therapy exposure", "Weekend census", "Transplant program intensity", "APP support"],
    fitSignals: ["You want HF census and therapy scope documented", "You need clarity on transplant-adjacent calls"],
    pitfalls: ["Transplant-adjacent scope without backup attending coverage", "Unclear weekend rounding expectations"],
    faqs: [
      {
        q: "What makes heart failure locums uniquely demanding?",
        a: "Complex patients, weekend census, and advanced therapy decisions—document team backup and consult scope before you start.",
      },
    ],
  },
  {
    settings: ["Echo labs", "CMR programs", "Nuclear cardiology", "Multimodality read pools"],
    assignmentSnapshot:
      "Advanced imaging locums focus on echo, nuclear, CMR, or CT reads with turnaround expectations. Remote read pools and on-site hybrid models both exist.",
    workflowNotes:
      "Define daily read volumes, critical value callbacks, stress test supervision, and whether you interpret only or also perform studies.",
    credentialingChecklist: [
      "Modalities you will read or perform",
      "Turnaround time expectations",
      "Stress test supervision agreements",
      "Malpractice for interpretive vs procedural imaging",
    ],
    documentationFocus: "Daily read volume, modalities, turnaround SLAs, and supervision rules.",
    payDrivers: ["Modalities covered", "Turnaround pressure", "Weekend read pools", "On-site vs remote"],
    fitSignals: ["You want daily read counts and SLA in the contract", "You need modality scope limited to what you practice"],
    pitfalls: ["Read volume assumptions without SLA", "Stress supervision added without compensation"],
    faqs: [
      {
        q: "Can imaging cardiologists locum remotely?",
        a: "Sometimes—licensure, hospital affiliation, and callback rules still apply. Document states and turnaround before accepting.",
      },
    ],
  },
  {
    settings: ["Structural heart programs", "TAVR centers", "Watchman programs", "Hybrid cath/OR suites"],
    assignmentSnapshot:
      "Structural heart locums may include TAVR, MitraClip, and complex valve conferences. Multidisciplinary heart teams and imaging requirements are central.",
    workflowNotes:
      "Confirm case types, heart team meeting load, imaging requirements, and call for structural emergencies. Clarify partnership with interventional colleagues.",
    credentialingChecklist: [
      "Structural procedure privileges and case logs",
      "Heart team and imaging prerequisites",
      "Call for structural emergencies",
      "Malpractice aligned with structural procedures",
    ],
    documentationFocus: "Case mix, heart team time, imaging prerequisites, and emergency call.",
    payDrivers: ["Case complexity", "Heart team load", "Call", "Program maturity"],
    fitSignals: ["You want heart team time and case mix documented", "You need imaging prerequisites confirmed"],
    pitfalls: ["TAVR coverage without defined imaging support", "Heart team meetings uncompensated"],
    faqs: [
      {
        q: "How is structural heart locums different from standard cath lab work?",
        a: "Multidisciplinary planning, imaging depth, and valve program logistics add time beyond PCI—document heart team expectations.",
      },
    ],
  },
  {
    settings: ["Preventive clinics", "Lipid programs", "Cardiac rehab partnerships", "Corporate wellness cardiology"],
    assignmentSnapshot:
      "Preventive cardiology locums emphasize outpatient risk reduction, lipid management, and sometimes cardio-oncology or sports cardiology niches. Panel size and prior auth load matter.",
    workflowNotes:
      "Define daily patient volume, prior auth support, and whether you cover inpatient consults. Clarify imaging and stress test ordering pathways.",
    credentialingChecklist: [
      "Outpatient privileging",
      "Scope for advanced lipid therapies",
      "Consult vs clinic-only expectations",
      "Malpractice for outpatient-focused practice",
    ],
    documentationFocus: "Panel size, visit length, prior auth support, and inpatient consult scope.",
    payDrivers: ["Panel size", "Visit complexity", "Prior auth burden", "Subspecialty niche demand"],
    fitSignals: ["You want panel size and visit length documented", "You prefer clinic-only scope if avoiding call"],
    pitfalls: ["Clinic panels with hidden inpatient callbacks", "Prior auth load without support staff"],
    faqs: [
      {
        q: "Is preventive cardiology locums mostly outpatient?",
        a: "Often yes—but confirm consult and call expectations. Some programs add inpatient lipid or cardio-oncology consults.",
      },
    ],
  },
  {
    settings: ["Children's hospitals", "Pediatric heart centers", "Adult congenital programs", "Outpatient peds cardiology clinics"],
    assignmentSnapshot:
      "Pediatric cardiology locums cover congenital heart disease, fetal cardiology consults, and ICU co-management with explicit age ranges and surgical backup.",
    workflowNotes:
      "Confirm patient age range, cath lab case types, call into the CV ICU, and relationship with pediatric cardiac surgery. Echo and fetal scope should be listed in privileges.",
    credentialingChecklist: [
      "Pediatric cardiology board certification or eligibility",
      "Privileges aligned to congenital and ICU scope",
      "Malpractice appropriate to pediatric procedural work",
      "Transfer agreements for surgical backup documented",
    ],
    documentationFocus: "Patient age range, ICU census, call, and surgical backup pathways.",
    payDrivers: ["ICU call", "Congenital case mix", "Clinic volume", "Geographic pediatric supply"],
    fitSignals: ["You want age range and surgical backup in writing", "You need clarity on fetal and cath lab scope"],
    pitfalls: ["Adult cardiology locum ads mislabeled as peds-friendly", "ICU call without documented surgical coverage"],
    faqs: [
      {
        q: "Are pediatric cardiology locums different from adult general cardiology locums?",
        a: "Yes—privileges, call, and backup pathways are distinct. Confirm you are matched to true pediatric programs.",
      },
    ],
  },
];

const PROFILES: SpecialtyProfile[] = CARDIOLOGY_SUBSPECIALTIES.map((name, i) => ({
  slug: specialtyToSlug(name),
  name,
  ...CARDIOLOGY_PROFILE_DATA[i]!,
}));

const bySlug = new Map(PROFILES.map((p) => [p.slug, p]));

export function getSpecialtyProfile(slug: string): SpecialtyProfile | undefined {
  return bySlug.get(slug);
}

export function getAllSpecialtyProfiles(): SpecialtyProfile[] {
  return PROFILES;
}
