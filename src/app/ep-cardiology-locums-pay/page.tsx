import type { Metadata } from "next";
import { CardiologyCompensationGuide } from "@/components/marketing/CardiologyCompensationGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/ep-cardiology-locums-pay";
const DESCRIPTION = "EP cardiology locums pay, ablation and device scope, lab readiness, call, credentialing, and assignment economics for electrophysiologists.";
const FAQS = [
  { q: "What drives electrophysiology locums pay?", a: "Ablation scope, device procedures, EP call, lab staffing and systems, device-clinic volume, assignment urgency, travel, and credentialing complexity all affect compensation." },
  { q: "Do EP locums always cover ablations and devices?", a: "No. Scope varies. Some assignments emphasize consults or device clinic, while others require ablation, implants, extraction support, or call. Every requested privilege should be documented." },
  { q: "What should an electrophysiologist ask about the EP lab?", a: "Confirm mapping systems, anesthesia support, lab staffing, device vendors, extraction pathway, surgical backup, case mix, turnaround expectations, and who handles remote-monitoring alerts." },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "EP Cardiology Locums Pay | $2,800–$3,200/Day",
  description: "EP locums typically $2,800–$3,200/day. Ablation vs device clinic, NY and Tennessee markets, then calculate your range—not a job-board rate card.",
  path: PATH,
  keywords: ["EP cardiology locums pay", "electrophysiology locum tenens", "EP locum jobs"],
});

export default function EpCardiologyLocumsPayPage() {
  return (
    <>
      <JsonLd data={medicalWebPageJsonLd({ name: "EP Cardiology Locums Pay", description: DESCRIPTION, path: PATH, keywords: ["EP cardiology locums pay", "electrophysiology locums"], aboutTopics: ["Electrophysiology", "Locum tenens compensation", "EP lab coverage"] })} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "EP cardiology locums pay", path: PATH }])} />
      <CardiologyCompensationGuide
        eyebrow="Electrophysiology market intelligence"
        title="EP Cardiology Locums Pay"
        directAnswer="Electrophysiology locums economics depend on whether the assignment covers consults, ablation, device procedures, device clinic, remote alerts, or call. Lab readiness and credentialing can matter as much as the headline rate."
        sections={[
          { heading: "Directional daily benchmark", paragraphs: ["EP locums are modeled at $2,800–$3,200 per day. 24-hour call typically includes 0–4 hours; extra callback is daily ÷ 8. Non-24-hour days use the same daily rate plus a one-time pager of daily ÷ 8 if night call is on. A weekend is 2–3 call days, not a full coverage week."], bullets: ["Separate consult, ablation, device, and call scope", "Confirm mapping systems and anesthesia support", "Document remote-monitoring responsibility", "Compare guaranteed time with procedure-dependent pay"] },
          { heading: "Why EP assignment economics differ", paragraphs: ["An EP consult block, a high-volume ablation service, and combined device-call coverage are different jobs. Effective compensation should account for case volume, procedure mix, after-hours responsibility, staff capability, and whether the physician is expected to troubleshoot systems or workflows.", "Request a privilege list and realistic case schedule before agreeing to an annualized figure."] },
          { heading: "Credentialing and lab readiness", paragraphs: ["Recent procedural logs, board status, vendor familiarity, facility proctoring, and malpractice review influence start timing. Confirm that the site can support the procedures it expects rather than treating every EP physician and lab as interchangeable."] },
          { heading: "Lifestyle filter for EP locums", paragraphs: ["Remote monitoring and device clinic burden can erase the benefit of 'no STEMI.' Bound after-hours expectations in writing the same way you would bound call.", "See the electrophysiology locums hub for workflow and career-design context, the electrophysiologist salary guide for employed vs locum comparison, and New York EP locum jobs for a high-intent market example."] },
        ]}
        faqs={FAQS}
        path={PATH}
      />
    </>
  );
}
