import type { Metadata } from "next";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { LeadFormStandaloneSection } from "@/components/forms/LeadFormStandaloneSection";
import { socialShareMetadata } from "@/lib/social-metadata";

const CONTACT_DESC =
  "Talk with a Locum Career Hub physician recruiter about locum tenens jobs, credentialing timelines, and schedule planning—fast, physician-first responses.";

export const metadata: Metadata = {
  title: "Contact a Physician Recruiter | Locum Tenens Staffing",
  description: CONTACT_DESC,
  alternates: { canonical: "/contact" },
  ...socialShareMetadata({
    title: "Contact a Physician Recruiter | Locum Tenens Staffing",
    description: CONTACT_DESC,
    path: "/contact",
  }),
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
            Start with the form. Tell us the schedule you want—we’ll look for work that pays well and still leaves you
            room.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <LeadFormStandaloneSection>
          <LeadCaptureForm id="lead-form" showEmailFallback />
        </LeadFormStandaloneSection>
      </section>
    </main>
  );
}
