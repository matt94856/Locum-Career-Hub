import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { LANDING_PAGES } from "@/lib/landings";
import { SPECIALTIES } from "@/lib/specialties";
import { FEATURED_STATES } from "@/lib/states";

export const metadata: Metadata = {
  title: "Physician Opportunities | Locum Tenens Jobs Nationwide",
  description:
    "Browse physician locum tenens opportunities: hospitalist, emergency medicine, CRNA, and more. Transparent expectations, credentialing support, and recruiter advocacy.",
  alternates: { canonical: "/physician-opportunities" },
};

export default function OpportunitiesPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Opportunities</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Physician locum tenens opportunities built for flexibility and income
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Explore curated intent hubs below—from travel roles to moonlighting, burnout resets, and state-specific
            demand. When you are ready, submit a complete inquiry for faster matching.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Popular physician searches</h2>
            <div className="mt-6 columns-1 gap-4 sm:columns-2">
              {LANDING_PAGES.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="mb-4 break-inside-avoid rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200"
                >
                  {p.h1}
                </Link>
              ))}
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold text-slate-950">Specialties we recruit</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => (
                <Link
                  key={s}
                  href="/specialties"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 hover:border-brand-200 hover:bg-brand-50"
                >
                  {s}
                </Link>
              ))}
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold text-slate-950">Featured states</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {FEATURED_STATES.map((s) => (
                <Link
                  key={s.code}
                  href="/locations"
                  className="rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200"
                >
                  {s.name} ({s.code})
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <LeadCaptureForm id="lead-form" />
          </div>
        </div>
      </section>
    </main>
  );
}
