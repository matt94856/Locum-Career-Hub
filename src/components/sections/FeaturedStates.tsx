import Link from "next/link";
import { FEATURED_STATES } from "@/lib/states";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedStates() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Locations"
          title="Featured states where locums demand stays strong"
          subtitle="We staff nationwide—but these markets consistently offer compelling mix of volume, stipends, and lifestyle optionality."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_STATES.map((s) => {
            const href = `/locum-tenens-jobs/${s.slug}`;

            return (
              <Link
                key={s.code}
                href={href}
                className="group surface-card flex min-h-full min-w-0 flex-col p-5 sm:p-6"
              >
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <p className="min-w-0 font-display text-lg font-semibold leading-snug text-slate-950 [overflow-wrap:anywhere]">
                    {s.name}
                  </p>
                  <span className="shrink-0 rounded-full bg-slate-950 px-2.5 py-1 text-xs font-bold text-white">
                    {s.code}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.note}</p>
                <p className="mt-4 text-sm font-semibold text-brand-700 group-hover:underline">View opportunities</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
