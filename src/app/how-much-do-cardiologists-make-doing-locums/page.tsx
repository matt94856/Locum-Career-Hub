import type { Metadata } from "next";
import { CardiologyCompensationGuide } from "@/components/marketing/CardiologyCompensationGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/how-much-do-cardiologists-make-doing-locums";
const DESCRIPTION = "Learn how much cardiologists can make doing locums and how specialty, availability, call, procedures, geography, and assignment terms affect earnings.";
const FAQS = [
  { q: "How much additional income can a cardiologist earn doing locums?", a: "The answer depends on realistic availability and assignment scope. A weekend each month, one week each month, and full-time locums should not be annualized the same way. Use the calculator for a profile-based gross range." },
  { q: "Which cardiology subspecialties tend to command higher locums rates?", a: "Procedural and highly specialized assignments may carry higher directional ranges, but call burden, urgency, backup, credentialing, and local constraints can matter more than the specialty label alone." },
  { q: "Are travel and housing included in locums pay?", a: "Contract structures differ. Compare clinical compensation separately from travel, housing, mileage, malpractice, orientation, and other reimbursed expenses." },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "How Much Do Cardiologists Make Doing Locums?",
  description: DESCRIPTION,
  path: PATH,
  keywords: ["how much do cardiologists make doing locums", "locum cardiologist salary", "cardiology locum pay"],
});

export default function HowMuchDoCardiologistsMakeDoingLocumsPage() {
  return (
    <>
      <JsonLd data={medicalWebPageJsonLd({ name: "How Much Do Cardiologists Make Doing Locums?", description: DESCRIPTION, path: PATH, keywords: ["locum cardiologist salary", "cardiology locum pay"], aboutTopics: ["Cardiologist compensation", "Locum tenens", "Flexible physician careers"] })} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How much cardiologists make doing locums", path: PATH }])} />
      <CardiologyCompensationGuide
        eyebrow="Cardiologist compensation guide"
        title="How Much Do Cardiologists Make Doing Locums?"
        directAnswer="Cardiologists can model meaningful supplemental or full-time gross income through locums, but a credible estimate must combine subspecialty, written assignment scope, call, realistic weeks worked, licensing, and travel—not multiply one urgent weekly rate by 52."
        sections={[
          { heading: "Availability changes the answer", paragraphs: ["One weekend per month is a different financial and lifestyle decision from two weeks per month or full-time travel. The calculator converts each availability choice into a bounded annual schedule rather than assuming continuous utilization."], bullets: ["Weekend coverage: model the actual recurring weekends", "One week per month: approximately 12 working weeks", "Two weeks per month: approximately 24 working weeks", "Full-time locums: leave room for credentialing, transitions, and time off"] },
          { heading: "Specialty and scope drive the benchmark", paragraphs: ["General consult and clinic coverage, imaging, advanced heart failure, EP, interventional, and structural work have different privilege sets and economics. Call, callbacks, census, procedures, support, and urgency can move an assignment within or outside a directional band."] },
          { heading: "Compare total economics, not gross pay alone", paragraphs: ["Review taxes, benefits, retirement contributions, malpractice, travel, housing, cancellation language, unpaid credentialing, orientation, and schedule recovery. A higher gross number may not be the better assignment if the scope or unpaid time is materially heavier."] },
        ]}
        faqs={FAQS}
        path={PATH}
      />
    </>
  );
}
