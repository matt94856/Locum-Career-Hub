import type { Metadata } from "next";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { LeadFormStandaloneSection } from "@/components/forms/LeadFormStandaloneSection";
import { CalendlyBookButton } from "@/components/cta/CalendlyBookButton";
import { socialShareMetadata } from "@/lib/social-metadata";
import { Button } from "@/components/ui/Button";
import { SITE, CTA } from "@/lib/site";

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
            Tell us the schedule you want. We’ll look for work that pays well and still leaves you room.
          </p>
          <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <CalendlyBookButton source="contact_hero" className="w-full justify-center">
              {CTA.bookCall}
            </CalendlyBookButton>
            <Button href={`tel:${SITE.phoneTel}`} variant="secondary" className="w-full justify-center">
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
        <LeadFormStandaloneSection>
          <LeadCaptureForm id="lead-form" />
        </LeadFormStandaloneSection>
      </section>
    </main>
  );
}
