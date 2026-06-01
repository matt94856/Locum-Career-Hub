import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { specialtyToSlug } from "@/lib/specialty-seo";

export function SpecialtiesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Cardiology subspecialties"
          title="Locum coverage across the cardiology roles hospitals search most"
          subtitle="General, interventional, EP, heart failure, imaging, structural, and preventive—matched with documented cath lab, consult, and call expectations."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {CARDIOLOGY_SUBSPECIALTIES.map((s) => (
            <Link
              key={s}
              href={`/specialties/${specialtyToSlug(s)}`}
              className="group surface-card flex min-h-full min-w-0 flex-col p-5"
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug text-slate-900 [overflow-wrap:anywhere]">{s}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Explore cardiologist locum openings, call norms, and privileging patterns.
                  </p>
                </div>
                <span className="mt-0.5 shrink-0 text-brand-700 transition group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
