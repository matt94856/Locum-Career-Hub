import type { Metadata } from "next";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact a Physician Recruiter",
  description:
    "Contact Locum Career Hub for locum tenens opportunities, credentialing questions, and schedule planning. Fast responses from physician-first recruiters.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Talk with a recruiter who respects your time
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Share your goals, availability, and non-negotiables. We will respond with realistic pathways—not a generic
            blast.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={SITE.calendlyUrl}>Book a calendar call</Button>
            <Button href={`tel:${SITE.phoneTel}`} variant="secondary">
              Call {SITE.phoneDisplay}
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Email:{" "}
            <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-4xl">
          <LeadCaptureForm
            id="lead-form"
            title="Physician inquiry"
            subtitle="Complete the form and we will route you to the right recruiting pod for your specialty and states."
          />
        </div>
      </section>
    </main>
  );
}
