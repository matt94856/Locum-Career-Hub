import type { Metadata } from "next";
import { CardiologyCompensationGuide } from "@/components/marketing/CardiologyCompensationGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/part-time-cardiologist-jobs";
const DESCRIPTION = "Explore part-time cardiologist jobs, recurring locum blocks, local coverage, weekend schedules, and semi-retirement options by subspecialty.";
const FAQS = [
  { q: "Can an employed cardiologist work part-time locums?", a: "Often, but you must review employer moonlighting, conflict, malpractice, fatigue, and scheduling policies before accepting outside work." },
  { q: "What part-time schedules are common in cardiology locums?", a: "Models can include weekends, one week per month, recurring clinic blocks, inpatient rounding, reads, call, or defined procedural coverage. Availability varies by facility." },
  { q: "Does limited availability make credentialing worthwhile?", a: "It depends on assignment length, recurrence, privileges, licensing, and unpaid onboarding time. Recurring blocks can make the administrative investment more practical." },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Part-Time Cardiologist Jobs and Flexible Locum Schedules",
  description: DESCRIPTION,
  path: PATH,
  keywords: ["part-time cardiologist jobs", "part-time cardiology locums", "weekend cardiology jobs"],
});

export default function PartTimeCardiologistJobsPage() {
  return (
    <>
      <JsonLd data={medicalWebPageJsonLd({ name: "Part-Time Cardiologist Jobs", description: DESCRIPTION, path: PATH, keywords: ["part-time cardiologist jobs", "flexible cardiology work"], aboutTopics: ["Part-time cardiology", "Locum tenens", "Physician schedule flexibility"] })} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Part-time cardiologist jobs", path: PATH }])} />
      <CardiologyCompensationGuide
        eyebrow="Flexible cardiology work"
        title="Part-Time Cardiologist Jobs"
        directAnswer="Part-time cardiology can include local shifts, recurring locum blocks, weekend call, clinic, rounding, reads, or lower-frequency semi-retirement coverage. The best model is the one that fits your existing obligations and makes credentialing worthwhile."
        sections={[
          { heading: "Part-time models built around real availability", paragraphs: ["Keep your current career and add flexibility rather than treating every inquiry as a full-time job search. One weekend per month, one week per month, and recurring seasonal blocks require different matching strategies."], bullets: ["Weekend call or rounding", "Recurring clinic blocks", "Imaging and read coverage", "Cath or EP lab coverage", "Semi-retirement schedules"] },
          { heading: "Protect your primary role and recovery time", paragraphs: ["Review moonlighting approval, non-compete language, malpractice, fatigue, post-call recovery, travel, and conflicts before committing. A feasible schedule on paper may not be sustainable after a full clinical week."] },
          { heading: "Compare administrative cost with recurring value", paragraphs: ["Licensing, privileging, payer enrollment, EHR training, and orientation take time. Ask whether the site expects repeat blocks, guarantees dates, pays orientation, and defines cancellation terms."] },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
