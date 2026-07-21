import type { Metadata } from "next";
import { CardiologyCompensationGuide } from "@/components/marketing/CardiologyCompensationGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/cardiologist-burnout-solutions";
const DESCRIPTION = "Practical cardiologist burnout solutions: workload boundaries, schedule redesign, professional support, part-time work, and locums as one possible career option.";
const FAQS = [
  { q: "Can locum tenens cure cardiologist burnout?", a: "No. Burnout can have personal, organizational, and clinical causes. Locums may offer clearer schedule or scope boundaries for some physicians, but it is a career model—not mental-health treatment." },
  { q: "What should a cardiologist change before leaving a role?", a: "Identify the actual strain: call, census, inbox, staffing, culture, commute, procedures, administration, or loss of control. Consider schedule and workload changes, time off, professional support, or a different practice model." },
  { q: "What if burnout feels like an urgent mental-health crisis?", a: "Seek immediate help from a licensed clinician or emergency service. In the U.S., call or text 988 for the Suicide & Crisis Lifeline if you may be in danger or need urgent support." },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiologist Burnout Solutions and Flexible Career Options",
  description: DESCRIPTION,
  path: PATH,
  keywords: ["cardiologist burnout solutions", "cardiology work life balance", "flexible cardiology careers"],
});

export default function CardiologistBurnoutSolutionsPage() {
  return (
    <>
      <JsonLd data={medicalWebPageJsonLd({ name: "Cardiologist Burnout Solutions", description: DESCRIPTION, path: PATH, keywords: ["cardiologist burnout solutions", "cardiology work life balance"], aboutTopics: ["Physician burnout", "Cardiologist wellbeing", "Flexible cardiology careers"] })} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cardiologist burnout solutions", path: PATH }])} />
      <CardiologyCompensationGuide
        eyebrow="Career-health guidance"
        title="Cardiologist Burnout Solutions"
        directAnswer="Start by identifying the source of strain—call, census, inbox, staffing, culture, commute, administration, or lack of control. Locums is one possible schedule model, not a cure or substitute for licensed medical and mental-health support."
        sections={[
          { heading: "Name the pressure before changing jobs", paragraphs: ["A different employer will not fix every problem. Separate workload, schedule, culture, clinical scope, support staffing, and personal-health concerns so the next decision addresses the real source."], bullets: ["Call frequency and post-call recovery", "Consult census, clinic panels, and inbox", "Cath/EP staffing and backup", "Administrative and committee load", "Control over dates, travel, and time off"] },
          { heading: "Consider the full range of options", paragraphs: ["Possible steps include workload negotiation, protected recovery, leave, coaching or clinical support, part-time employment, local moonlighting, a different permanent role, or defined locum blocks. The right answer may be a combination rather than a dramatic exit."] },
          { heading: "Use locums with explicit boundaries", paragraphs: ["If locums fits, document dates, call, census, procedures, support, travel, cancellation, and handoff before committing. A temporary assignment with vague scope can reproduce the same strain in a new location."] },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
