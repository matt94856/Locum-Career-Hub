import type { Metadata } from "next";
import Link from "next/link";
import { getCardiologySeoPagesByCategory } from "@/lib/cardiology-seo/registry";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiologist Salary & Locum Pay Guides",
  description:
    "Cardiologist salary guides—locum rate drivers, subspecialty pay, and state-by-state context. Educational, not guaranteed offers.",
  path: "/salary",
  keywords: ["cardiologist salary", "locum cardiologist salary", "cardiology compensation"],
});

export default function SalaryHubPage() {
  const pages = getCardiologySeoPagesByCategory("salary");
  const stateSalaries = pages
    .filter((p) => p.slug.startsWith("cardiologist-salary-"))
    .sort((a, b) => a.h1.localeCompare(b.h1));
  const topicGuides = pages
    .filter((p) => !p.slug.startsWith("cardiologist-salary-"))
    .sort((a, b) => a.h1.localeCompare(b.h1));

  return (
    <main className="pb-24 sm:pb-0">
      <section className="container-site py-14 sm:py-16">
        <h1 className="font-display text-4xl font-semibold text-slate-950">Cardiology salary guides</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          State salary context, subspecialty pay drivers, and locum rate topics for cardiologists comparing employed and
          locum compensation.
        </p>

        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-950">Cardiologist salary by state</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Fifty-one state guides with licensing context, demand notes, and locum pay drivers—not guaranteed offers.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stateSalaries.map((p) => (
            <li key={p.slug}>
              <Link href={p.path} className="font-semibold text-brand-700 hover:underline">
                {p.h1} →
              </Link>
            </li>
          ))}
        </ul>

        {topicGuides.length > 0 ? (
          <>
            <h2 className="mt-12 font-display text-2xl font-semibold text-slate-950">Pay & subspecialty topics</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {topicGuides.map((p) => (
                <li key={p.slug}>
                  <Link href={p.path} className="font-semibold text-brand-700 hover:underline">
                    {p.h1} →
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>
    </main>
  );
}
