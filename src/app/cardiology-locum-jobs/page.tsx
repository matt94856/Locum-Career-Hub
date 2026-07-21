import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCardiologySeoPageCount, getCardiologySeoPagesByCategory } from "@/lib/cardiology-seo/registry";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Locum Jobs | Core Cardiologist Money Pages",
  description:
    "Hub for cardiologist locum jobs—interventional, general, EP, heart failure, telecardiology, and more. Cardiologist-only recruiter.",
  path: "/cardiology-locum-jobs",
  keywords: ["cardiology locum jobs", "locum cardiologist jobs", "cardiologist locum tenens"],
});

export default function CardiologyLocumJobsHubPage() {
  const money = getCardiologySeoPagesByCategory("money");
  const total = getCardiologySeoPageCount();

  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Core money pages</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiology locum jobs
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Locum Career Hub recruits <strong className="font-semibold text-slate-800">cardiologists only</strong>. Browse{" "}
            {money.length} high-intent job-type pages—or explore {total}+ total cardiology SEO resources across states,
            cities, salary, licensing, and guides.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form">{CTA.explore}</Button>
            <Button href="/locum-tenens-jobs" variant="secondary">
              Browse by state
            </Button>
            <Button href="/cities" variant="secondary">
              Browse by city
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading eyebrow="Job types" title="Cardiology locum job pages" subtitle="Each page includes educational context and a path to recruiter-led matching." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {money.map((p) => (
              <li key={p.slug}>
                <Link href={p.path} className="surface-card block p-4 text-sm font-semibold text-brand-800 hover:text-brand-950">
                  {p.h1} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
