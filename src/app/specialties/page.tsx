import type { Metadata } from "next";
import Link from "next/link";
import { specialtyToSlug } from "@/lib/specialty-seo";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialShareMetadata } from "@/lib/social-metadata";

const SPEC_DESC =
  "Cardiologist locum tenens subspecialties—general, interventional, EP, heart failure, imaging, structural, and preventive. Locum Career Hub recruits cardiologists only.";

export const metadata: Metadata = {
  title: "Cardiology Locum Subspecialties | Cardiologist-Only Recruiting",
  description: SPEC_DESC,
  alternates: { canonical: "/specialties" },
  ...socialShareMetadata({
    title: "Cardiology Locum Subspecialties | Locum Career Hub",
    description: SPEC_DESC,
    path: "/specialties",
  }),
};

export default function SpecialtiesPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiologist-only</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiology subspecialty locum coverage
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Cath lab, consult, clinic, and imaging roles each carry different call and privileging rules. We recruit MD/DO
            cardiologists only—and we document expectations before you interview.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="Explore"
            title="Choose a cardiology subspecialty"
            subtitle="Each hub explains credentialing, call, and workflow norms for that discipline—not generic physician job-board copy."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
            {CARDIOLOGY_SUBSPECIALTIES.map((s) => (
              <div key={s} className="surface-card flex min-h-full min-w-0 flex-col p-5 sm:p-6">
                <h2 className="text-base font-semibold leading-snug text-slate-950 [overflow-wrap:anywhere]">{s}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We map cath lab, consult census, clinic panel, and call expectations before you commit to a block.
                </p>
                <div className="mt-5 flex flex-col gap-2 text-sm font-semibold">
                  <Link className="text-brand-700 hover:underline" href="/physician-opportunities#lead-form">
                    Submit cardiologist inquiry →
                  </Link>
                  <Link className="text-brand-700 hover:underline" href={`/specialties/${specialtyToSlug(s)}`}>
                    {s} guide →
                  </Link>
                  <Link className="text-slate-700 hover:underline" href="/locum-tenens-jobs">
                    Browse by state →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
