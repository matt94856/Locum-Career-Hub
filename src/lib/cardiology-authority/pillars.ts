import type { CardiologyPillarExtension } from "@/lib/cardiology-authority/types";
import { defaultEeatMeta } from "@/lib/cardiology-authority/eeat";

/** Deep pillar content merged into `/locum-jobs/cardiology/[specialty]` pages (Phase 2). */
export const CARDIOLOGY_PILLAR_EXTENSIONS: CardiologyPillarExtension[] = [
  {
    pathSlug: "general",
    directAnswer:
      "General cardiology locum tenens covers inpatient consults, outpatient clinic, echo and stress supervision, and selective call—without primary cath lab operator responsibility unless explicitly contracted. ABIM cardiovascular disease certification and documented consult scope are standard hospital expectations.",
    eeat: defaultEeatMeta(),
    entityNotes: ["ACC", "ABIM", "Echocardiography", "Nuclear Cardiology"],
    sections: [
      {
        h2: "What does a locum general cardiologist do?",
        paragraphs: [
          "General cardiology locums span inpatient consult services, outpatient continuity or block clinic, stress test supervision, transthoracic echo interpretation, and occasional nuclear cardiology oversight. Unlike interventional locums, PCI and STEMI primary operator roles are usually out of scope unless the contract explicitly adds cath lab privileges.",
          "The American College of Cardiology (ACC) emphasizes team-based cardiovascular care—locum general cardiologists often anchor consult census while hospital-employed interventionalists cover STEMI activation. Document whether you cover ICU consults, telemetry oversight, and weekend hospital coverage.",
        ],
      },
      {
        h2: "Credentialing for general cardiology locums",
        paragraphs: [
          "Hospital privileging typically requires ABIM board certification or eligibility in cardiovascular disease, active state medical license, malpractice verification, and FPPE for consult scope. Echo supervision may require Level II training documentation; nuclear reads may require separate privileging.",
          "Locum Career Hub is a recruiting service—not your employer. We help you compare written privileging timelines before you resign from employed roles.",
        ],
      },
      {
        h2: "Compensation drivers for general cardiology locums",
        paragraphs: [
          "Weekly rates move with call frequency, consult census caps, clinic panel pace, echo read pools, and travel requirements—not geography alone. A clinic-heavy block without nights differs materially from a consult service with 1:4 weekend call.",
          "Compare locum offers to employed packages using total compensation: benefits, retirement, tail coverage, and admin time. See our salary guide and state salary pages for directional context—not guaranteed offers.",
        ],
      },
      {
        h2: "When general cardiology locums fits your career",
        paragraphs: [
          "Cardiologists explore general locums when employed call, inbox load, or committee burden outpaces recovery. Contract blocks can sample health systems, bridge between jobs, or create part-time flexibility while maintaining procedural subspecialty elsewhere.",
          "If your pain point is unsustainable STEMI or cath lab call, interventional or EP locums may not fix the problem—general consult roles with documented boundaries often do.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do general cardiology locums require cath lab privileges?",
        a: "Most general locum contracts are consult, clinic, and imaging focused. Confirm any procedural expectations in writing before signing.",
      },
      {
        q: "Can general cardiologists do locums while employed?",
        a: "Many do, with employer moonlighting approval. Malpractice tail and call stacking must be managed carefully.",
      },
    ],
  },
  {
    pathSlug: "interventional",
    directAnswer:
      "Interventional cardiology locum jobs center on cath lab coverage, diagnostic and PCI cases, and STEMI activation when documented in the contract. Operators need interventional training, cath lab privileges, and malpractice aligned with PCI scope—not generic consult coverage.",
    eeat: defaultEeatMeta(),
    entityNotes: ["PCI", "STEMI", "Cath Lab", "ACC", "ABIM"],
    sections: [
      {
        h2: "Scope: cath lab, PCI, and STEMI call",
        paragraphs: [
          "Interventional locum cardiologists work in PCI-capable cath labs, STEMI receiving centers, and sometimes hybrid OR settings. Define activation windows, transport patterns, surgical backup, and complication pathways before accepting. Primary STEMI operator vs backup interventionalist roles change liability and lifestyle materially.",
          "Peripheral and structural overlap may appear on smaller programs—confirm case mix, device inventory, and support staff experience.",
        ],
      },
      {
        h2: "Privileging and procedural logs",
        paragraphs: [
          "Hospitals request interventional board certification or equivalent experience, current PCI logs, and cath lab privileges with FPPE. The ABIM interventional cardiology pathway is the standard credential hospitals reference.",
          "Malpractice for PCI scope must be occurrence or claims-made with tail addressed—see our malpractice guide for locum cardiologists.",
        ],
      },
      {
        h2: "Pay drivers for interventional locums",
        paragraphs: [
          "STEMI call, night coverage, case volume, and add-on emergency cases drive weekly rates. A lab with strong backup and predictable block schedules differs from a solo interventionalist covering 24/7 activation.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a typical interventional locum block length?",
        a: "Blocks range from one to four weeks or longer—match length to privileging lead time and recovery needs.",
      },
    ],
  },
  {
    pathSlug: "electrophysiology",
    directAnswer:
      "Electrophysiology locum jobs include ablation procedures, device implants and clinics, and inpatient arrhythmia consults in EP labs. EP locums need electrophysiology training, device logs where required, and documented call for arrhythmia emergencies.",
    eeat: defaultEeatMeta(),
    entityNotes: ["EP Lab", "ACC", "ABIM"],
    sections: [
      {
        h2: "EP lab workflow and device clinics",
        paragraphs: [
          "EP locums may cover ablation days, device implant cases, and device clinic panels with remote monitoring responsibilities between blocks. Mapping system familiarity, EP tech staffing, and vendor support vary by site—confirm before travel blocks.",
        ],
      },
      {
        h2: "Credentialing for EP locums",
        paragraphs: [
          "Hospitals expect EP fellowship training or documented ablation and device experience, cath/EP lab privileges, and malpractice aligned with procedural scope.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do EP locums cover both ablation and devices?",
        a: "Most assignments include a mix—define weekly targets for each before starting.",
      },
    ],
  },
  {
    pathSlug: "structural-heart",
    directAnswer:
      "Structural heart locum jobs cover TAVR, mitral repair devices, and hybrid OR heart-team procedures when privileges and case logs match program requirements. Imaging requirements, valve types, and heart-team meeting load must be documented.",
    eeat: defaultEeatMeta(),
    entityNotes: ["TAVR", "PCI", "ACC", "Cath Lab"],
    sections: [
      {
        h2: "TAVR and structural program coverage",
        paragraphs: [
          "Growing TAVR programs use locum structural cardiologists for case backlog, proctoring requirements, and leave coverage. Confirm CT/TTE/TEE imaging pathways, valve platforms, and surgical backup for complications.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do structural locums require TAVR-specific credentialing?",
        a: "Yes—confirm annual volume requirements, valve types, and proctoring rules with the program.",
      },
    ],
  },
  {
    pathSlug: "heart-failure",
    directAnswer:
      "Heart failure cardiology locums span advanced HF consults, transplant-adjacent clinics, LVAD programs, and heart-team coordination. High-acuity census and weekend coverage should be compensated or explicitly excluded in the contract.",
    eeat: defaultEeatMeta(),
    entityNotes: ["ACC", "AHA"],
    sections: [
      {
        h2: "Advanced heart failure and MCS scope",
        paragraphs: [
          "Assignments may include inpatient advanced HF census, outpatient transplant clinic, and device management. Clarify LVAD and MCS operator scope if advertised—the American Heart Association (AHA) highlights growing HF burden driving hospital demand.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do HF locums require transplant experience?",
        a: "Not always—confirm consult-only vs transplant clinic vs LVAD scope before signing.",
      },
    ],
  },
  {
    pathSlug: "cardiac-imaging",
    directAnswer:
      "Advanced cardiac imaging locums include echocardiography, nuclear cardiology, cardiac MRI, and CT interpretation with defined turnaround SLAs. On-site vs remote read rules depend on state licensure and facility policy.",
    eeat: defaultEeatMeta(),
    entityNotes: ["Echocardiography", "Nuclear Cardiology", "Cardiac MRI", "ACC"],
    sections: [
      {
        h2: "Multimodality imaging locums",
        paragraphs: [
          "Imaging locums may combine inpatient echo reads, outpatient stress/nuclear supervision, and structured reporting windows. Confirm PACS access, study volume, and Level II/III echo or nuclear credentials required for privileging.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can imaging locums be remote?",
        a: "Some read pools are remote; on-site stress supervision may still require travel—confirm in the contract.",
      },
    ],
  },
  {
    pathSlug: "preventive-cardiology",
    directAnswer:
      "Preventive cardiology locum jobs focus on lipid clinics, cardio-metabolic risk, hypertension programs, and lifestyle medicine—typically outpatient-heavy with fewer nights than procedural subspecialties.",
    eeat: defaultEeatMeta(),
    entityNotes: ["ACC", "AHA", "ABIM"],
    sections: [
      {
        h2: "Preventive clinic models",
        paragraphs: [
          "Assignments are often clinic-based with lipid and risk assessment panels. Confirm inpatient consult expectations and whether you cover cardio-oncology or sports cardiology overlap.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are preventive locums lower call?",
        a: "Typically yes—still document any inpatient consult or call before committing.",
      },
    ],
  },
  {
    pathSlug: "pediatric-cardiology",
    directAnswer:
      "Pediatric cardiology locums cover congenital heart disease consults, fetal cardiology, pediatric cath and EP, and ICU co-management at children's hospitals. Pediatric cardiology board certification is standard.",
    eeat: defaultEeatMeta(),
    entityNotes: ["ACC", "AHA"],
    sections: [
      {
        h2: "Pediatric and congenital programs",
        paragraphs: [
          "Children's hospitals and pediatric programs within adult systems need locum pediatric cardiologists for subspecialty clinic and inpatient coverage. Define echo and cath lab pediatric scope; confirm adult congenital overlap if applicable.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do pediatric locums require pediatric fellowship?",
        a: "Facilities typically require pediatric cardiology board certification or equivalent documented training.",
      },
    ],
  },
  {
    pathSlug: "adult-congenital",
    directAnswer:
      "Adult congenital cardiology locums serve ACHD patients transitioning from pediatric care—complex echo, cath, EP, and heart-team coordination. ACHD fellowship training or documented ACHD experience is typically required.",
    eeat: defaultEeatMeta(),
    entityNotes: ["ACC", "AHA", "Echocardiography", "Cath Lab", "EP Lab"],
    sections: [
      {
        h2: "ACHD locum scope",
        paragraphs: [
          "Adult congenital locums may span ACHD clinic, complex echo interpretation, catheterization, and arrhythmia management in specialized centers. Programs often sit within academic or regional congenital networks—confirm surgical backup and MRI/congenital imaging resources.",
          "Overlap with pediatric cardiology and general adult cardiology is common—document whether the role is ACHD-only or includes general consult coverage.",
        ],
      },
      {
        h2: "Credentialing for ACHD locums",
        paragraphs: [
          "Hospitals typically require ACHD fellowship or equivalent case logs, state license, and privileges aligned with congenital cath and device scope. Malpractice must cover complex congenital interventions when applicable.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is adult congenital different from pediatric cardiology locums?",
        a: "ACHD focuses on adults with congenital heart disease; pediatric locums focus on children. Some contracts blend both—confirm patient population upfront.",
      },
    ],
  },
];

export function getPillarExtension(pathSlug: string): CardiologyPillarExtension | undefined {
  return CARDIOLOGY_PILLAR_EXTENSIONS.find((p) => p.pathSlug === pathSlug);
}
