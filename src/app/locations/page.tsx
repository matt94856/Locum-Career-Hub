import type { Metadata } from "next";
import Link from "next/link";
import { FEATURED_STATES, US_STATES } from "@/lib/states";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Locations | Nationwide Locum Tenens Physician Staffing",
  description:
    "Locum Career Hub staffs physician locums nationwide. Explore featured states, licensing strategy, and demand hotspots for locum tenens.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Locations</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Nationwide locum tenens placements with state-level strategy
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Demand shifts by specialty, season, and local staffing pipelines. We help you build a licensing footprint
            that expands optionality—not chaos.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="Featured"
            title="High-intent markets many physicians explore first"
            subtitle="These hubs include state-specific context for locums demand and recruiter expectations."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Link
              href="/locum-tenens-florida"
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:border-brand-200"
            >
              <h2 className="font-display text-xl font-semibold text-slate-950">Florida</h2>
              <p className="mt-3 text-sm text-slate-600">Coastal flexibility, seasonal demand, and strong inpatient volume.</p>
            </Link>
            <Link
              href="/locum-tenens-texas"
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:border-brand-200"
            >
              <h2 className="font-display text-xl font-semibold text-slate-950">Texas</h2>
              <p className="mt-3 text-sm text-slate-600">Metro depth, community hospitals, and competitive weekly rates.</p>
            </Link>
            <Link
              href="/locum-tenens-california"
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:border-brand-200"
            >
              <h2 className="font-display text-xl font-semibold text-slate-950">California</h2>
              <p className="mt-3 text-sm text-slate-600">Premium support for compliance-first onboarding and timelines.</p>
            </Link>
          </div>

          <div className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-slate-950">All states (A–Z)</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
              Use this directory for internal linking and programmatic expansion. Your recruiter can prioritize states
              based on compact status, licensing speed, and your specialty’s demand curve.
            </p>
            <div className="mt-6 columns-2 gap-x-8 text-sm text-slate-700 sm:columns-3 lg:columns-4">
              {US_STATES.map((s) => (
                <div key={s} className="break-inside-avoid py-1">
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <h2 className="font-display text-xl font-semibold text-slate-950">Featured state cards</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_STATES.map((s) => (
                <Link
                  key={s.code}
                  href="/physician-opportunities"
                  className="rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-900 hover:border-brand-200"
                >
                  {s.name} ({s.code})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
