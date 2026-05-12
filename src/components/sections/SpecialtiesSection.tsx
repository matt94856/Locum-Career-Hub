import { SPECIALTIES } from "@/lib/specialties";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpecialtiesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Specialties"
          title="High-intent coverage across the specialties physicians search most"
          subtitle="Whether you are inpatient-heavy, procedural, or hybrid—our recruiting team maps you to teams that respect scope, support, and sustainable pacing."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((s) => (
            <Link
              key={s}
              href="/specialties"
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Explore openings, stipend norms, and scheduling patterns.
                  </p>
                </div>
                <span className="mt-1 text-brand-700 transition group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
