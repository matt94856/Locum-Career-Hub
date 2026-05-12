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

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_STATES.map((s) => {
            const href =
              s.slug === "florida"
                ? "/locum-tenens-florida"
                : s.slug === "texas"
                  ? "/locum-tenens-texas"
                  : s.slug === "california"
                    ? "/locum-tenens-california"
                    : "/locations";

            return (
              <Link
                key={s.code}
                href={href}
                className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-semibold text-slate-950">{s.name}</p>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">{s.code}</span>
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
