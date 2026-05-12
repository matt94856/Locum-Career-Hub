import type { Metadata } from "next";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { FAQ_PAGE } from "@/lib/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ | Locum Tenens for Physicians",
  description:
    "Answers to common locum tenens questions: credentialing, malpractice, scheduling, compensation, and how to start without getting spammed.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={faqJsonLd(FAQ_PAGE)} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">FAQ</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Frequently asked questions about locum tenens
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Straight answers for physicians evaluating flexibility, income, travel, and burnout recovery pathways.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <FaqAccordion items={FAQ_PAGE} />
          </div>
          <div className="lg:col-span-5">
            <LeadCaptureForm
              title="Still have questions?"
              subtitle="Submit a complete inquiry and a recruiter will respond with specifics for your specialty, states, and timeline."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
