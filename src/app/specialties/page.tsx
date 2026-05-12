import type { Metadata } from "next";
import Link from "next/link";
import { SPECIALTIES } from "@/lib/specialties";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Medical Specialties | Locum Tenens Coverage",
  description:
    "Explore locum tenens recruiting across hospital medicine, emergency medicine, anesthesia, outpatient specialties, and more. Built for schedule control and transparent expectations.",
  alternates: { canonical: "/specialties" },
};

export default function SpecialtiesPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Specialties</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Specialty coverage designed for real-world staffing realities
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            We recruit across high-demand inpatient and outpatient models. Each specialty has different volume, backup,
            and documentation norms—your recruiter should speak that language fluently.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="Explore"
            title="Choose a specialty to see how we approach matching"
            subtitle="These pages are structured for semantic SEO and physician clarity—not generic job-board noise."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.map((s) => (
              <div key={s} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-950">{s}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We map expectations for staffing layers, backup, and scheduling patterns before you interview.
                </p>
                <div className="mt-5 flex flex-col gap-2 text-sm font-semibold">
                  <Link className="text-brand-700 hover:underline" href="/physician-opportunities#lead-form">
                    Submit an inquiry →
                  </Link>
                  <Link className="text-slate-700 hover:underline" href="/locum-tenens-jobs">
                    Explore locum hubs →
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
