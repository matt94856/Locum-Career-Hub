import type { Metadata } from "next";
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
  title: "Interventional Cardiology Locums Pay and Rate Drivers",
  description: "Understand interventional cardiology locums pay, STEMI call, cath lab scope, and assignment economics. Calculate your personalized earning potential.",
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
        directAnswer="Interventional locums often carry premium weekly economics because PCI privileges, STEMI call, callback frequency, and backup requirements add complexity. A defensible comparison must normalize the entire written scope—not annualize one urgent assignment."
        sections={[
          { heading: "Directional weekly benchmark", paragraphs: ["The calculator currently uses a transparent directional benchmark of $19,000–$28,000 per week before bounded adjustments for experience, assignment style, and geographic flexibility. This is educational—not a quote or a claim that every market pays within the range."], bullets: ["Confirm guaranteed coverage pay and callback terms", "Document STEMI activation and backup", "Ask whether post-call relief is protected", "Separate travel/housing from clinical compensation"] },
          { heading: "Cath lab and STEMI scope", paragraphs: ["Two assignments with the same headline rate can have very different effective economics. Primary PCI call with frequent activation, no post-call relief, and multi-site responsibility is not equivalent to scheduled cath lab coverage with backup.", "Request written details on case mix, support staff, transfer rules, surgical backup, activation responsibility, census, and handoff expectations before comparing offers."] },
          { heading: "Credentialing affects opportunity access", paragraphs: ["Recent case logs, privilege delineation, active licenses, malpractice history, and facility-specific proctoring can determine whether an assignment is feasible. A high headline rate has little value if the requested start date cannot be credentialed safely."] },
        ]}
        faqs={FAQS}
        path={PATH}
      />
    </>
  );
}
