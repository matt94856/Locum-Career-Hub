import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCardiologySeoPagesByCategory } from "@/lib/cardiology-seo/registry";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Locum Jobs by State | All 50 States + DC",
  description: "Cardiologist locum jobs in every US state—rich guides, subspecialty links, and recruiter follow-up when opportunities match.",
  path: "/states",
  keywords: ["cardiology locum jobs by state", "cardiologist locum by state"],
});

export default function StatesHubPage() {
  const states = getCardiologySeoPagesByCategory("state");

  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 py-14 sm:py-16">
        <div className="container-site">
          <h1 className="font-display text-4xl font-semibold text-slate-950 sm:text-5xl">Cardiology locum jobs by state</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            {states.length} state guides with licensing context, subspecialty links, and clear inquiry follow-up from a
            cardiology recruiter.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="container-site">
          <SectionHeading eyebrow="States" title="Select a state" />
          <ul className="mt-8 columns-2 gap-x-8 text-sm sm:columns-3 lg:columns-4">
            {states.map((p) => (
              <li key={p.slug} className="mb-2 break-inside-avoid">
                <Link href={p.path} className="font-medium text-brand-700 hover:text-brand-900">
                  {p.geoLabel} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
