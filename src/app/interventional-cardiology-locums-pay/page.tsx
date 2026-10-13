import type { Metadata } from "next";
import Link from "next/link";
import { CardiologyCompensationGuide } from "@/components/marketing/CardiologyCompensationGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/interventional-cardiology-locums-pay";
const FAQS = [
  { q: "What drives interventional cardiology locums pay?", a: "PCI scope, STEMI activation, night and weekend call, callback frequency, backup, transfer pathways, procedural volume, urgency, and travel requirements are major drivers." },
  { q: "Are 24-hour call rates directly comparable with hourly clinic rates?", a: "No. Compare guaranteed coverage pay, callback or procedure pay, expected activations, post-call relief, and uncompensated handoff time before calculating an effective hourly rate." },
  { q: "What credentials are commonly required?", a: "Requirements vary, but hospitals commonly review board status, active licenses, recent case logs, cath lab privileges, ACLS, malpractice history, references, and facility-specific STEMI competencies." },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Interventional Cardiology Locums Pay | $3,200/Day",
  description: "IC locums typically $3,200–$3,500/day plus callback. STEMI, cath lab scope, and an Ohio 1–2 weeks/month example—then calculate your range.",
  path: PATH,
  keywords: ["interventional cardiology locums pay", "interventional cardiologist locum rates", "STEMI call pay"],
});

export default function InterventionalCardiologyLocumsPayPage() {
  return (
    <>
      <JsonLd data={medicalWebPageJsonLd({ name: "Interventional Cardiology Locums Pay", description: String(metadata.description), path: PATH, keywords: ["interventional cardiology locums pay", "STEMI call pay"], aboutTopics: ["Interventional cardiology", "Locum tenens compensation", "Cath lab coverage"] })} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Interventional cardiology locums pay", path: PATH }])} />
      <CardiologyCompensationGuide
        eyebrow="Interventional cardiology market intelligence"
        title="Interventional Cardiology Locums Pay"
        directAnswer="Interventional locums are typically $3,200–$3,500 per day. 24-hour STEMI call usually includes 0–4 hours; extra callback is daily ÷ 8 and can add more at a busy facility. A weekend is 2–3 of those days—not a $19k–$28k week."
        sections={[
          { heading: "Directional daily benchmark", paragraphs: ["Interventional locums are modeled at $3,200–$3,500 per day. A 24-hour call day typically includes 0–4 hours of work; extra callback is usually that daily rate divided by 8. If the assignment is not 24-hour call, the same daily rate applies, plus a one-time pager fee of daily ÷ 8 when night call is required. A weekend is 2–3 call days—not a 7-day coverage week.", "October 2026 public posts are single openings, not this band. AMN listed some interventional locum assignments near $2,993 per day. Compare that headline with STEMI activation and callback before you treat it as a higher offer. The citeable chart is on the cardiologist locums pay report. Use the beginner call-pay tool to see when a $3,200–$3,600 rate with 0–4 hours included beats a $3,800–$4,200 rate with 0–6 hours included."], bullets: ["Confirm guaranteed coverage pay and callback terms", "Document STEMI activation and backup", "Ask whether post-call relief is protected", "Separate travel/housing from clinical compensation"] },
          { heading: "Cath lab and STEMI scope", paragraphs: ["Two assignments with the same headline rate can have very different effective economics. Primary PCI call with frequent activation, no post-call relief, and multi-site responsibility is not equivalent to scheduled cath lab coverage with backup.", "Request written details on case mix, support staff, transfer rules, surgical backup, activation responsibility, census, and handoff expectations before comparing offers."] },
          { heading: "Credentialing affects opportunity access", paragraphs: ["Recent case logs, privilege delineation, active licenses, malpractice history, and facility-specific proctoring can determine whether an assignment is feasible. A high headline rate has little value if the requested start date cannot be credentialed safely."] },
          { heading: "Compare to general cardiology carefully", paragraphs: ["IC premiums often reflect nights and activation risk—not a free raise. Model recoverability and malpractice alignment the same way you would for employed STEMI call.", "See the interventional locums hub and career guide for scope and lifestyle framing beyond pay bands."] },
        ]}
        faqs={FAQS}
        path={PATH}
      />
      <p className="container-site max-w-3xl pb-16 text-sm leading-7 text-slate-600">
        Run the numbers for your own hours in the{" "}
        <Link href="/tools/cardiology-call-pay" className="font-semibold text-brand-700 hover:underline">
          beginner call-pay tool
        </Link>
        . It keeps interventional rates separate from general cardiology.
      </p>
    </>
  );
}
