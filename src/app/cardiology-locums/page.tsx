import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { LeadFormStandaloneSection } from "@/components/forms/LeadFormStandaloneSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCardiologyProgrammaticPageCount } from "@/lib/cardiology-programmatic";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { specialtyToSlug } from "@/lib/specialty-seo";
import { US_STATE_SLUGS, getStateNameBySlug } from "@/lib/us-state-slugs";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Locum Jobs Hub | Cardiologist-Only Recruiting",
  description:
    "Browse cardiologist locum tenens resources by subspecialty, state, and metro. Locum Career Hub recruits cardiologists only—documented expectations and recruiter advocacy.",
  path: "/cardiology-locums",
  keywords: ["cardiologist locum jobs", "cardiology locum tenens", "cardiologist recruiter"],
});

export default function CardiologyLocumsHubPage() {
  const pageCount = getCardiologyProgrammaticPageCount();

  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiologist-only</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiology locum jobs & guides
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Locum Career Hub recruits <strong className="font-semibold text-slate-800">cardiologists only</strong>—general,
            interventional, EP, heart failure, imaging, structural, and preventive. Explore {pageCount}+ localized pages for
            metros, settings, and career intent—then submit preferences for recruiter-led matching.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form">{CTA.explore}</Button>
            <Button href="/locum-tenens-jobs" variant="secondary">
              Browse by state
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="Subspecialties"
            title="Cardiology subspecialty locum hubs"
            subtitle="Each subspecialty has distinct credentialing, call, and lab expectations—we match accordingly."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CARDIOLOGY_SUBSPECIALTIES.map((name) => (
              <li key={name}>
                <Link
                  href={`/specialties/${specialtyToSlug(name)}`}
                  className="surface-card block p-4 text-sm font-semibold text-brand-800 hover:text-brand-950"
                >
                  {name} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="States"
            title="Cardiologist locums by state"
            subtitle="State hubs include credentialing context and links to subspecialty pages."
          />
          <ul className="mt-8 columns-2 gap-x-8 text-sm sm:columns-3 lg:columns-4">
            {US_STATE_SLUGS.map((slug) => (
              <li key={slug} className="mb-2 break-inside-avoid">
                <Link href={`/locum-tenens-jobs/${slug}`} className="text-brand-700 hover:text-brand-900">
                  {getStateNameBySlug(slug)} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/50 py-14 sm:py-16">
        <LeadFormStandaloneSection withTrustPanel={false}>
          <LeadCaptureForm
            title="Cardiologist inquiry"
            subtitle="We recruit cardiologists only. Share subspecialty, states, and availability."
            defaultSpecialty="General Cardiology"
          />
        </LeadFormStandaloneSection>
      </section>
    </main>
  );
}
