import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCardiologySeoPagesByCategory } from "@/lib/cardiology-seo/registry";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Locum Jobs by City | Metro Guides",
  description: "Cardiologist locum jobs in major US metros—Miami, Dallas, Houston, Chicago, and more.",
  path: "/cities",
  keywords: ["cardiology locum jobs by city", "cardiologist locum Miami", "cardiology locum Dallas"],
});

export default function CitiesHubPage() {
  const cities = getCardiologySeoPagesByCategory("city");

  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 py-14 sm:py-16">
        <div className="container-site">
          <h1 className="font-display text-4xl font-semibold text-slate-950 sm:text-5xl">Cardiology locum jobs by city</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            {cities.length} metro pages with localized context. Submit an inquiry with your preferred states—a recruiter
            will contact you if opportunities exist in the areas you selected.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="container-site">
          <SectionHeading eyebrow="Metros" title="Major cities" />
          <ul className="mt-8 columns-2 gap-x-8 text-sm sm:columns-3 lg:columns-4">
            {cities.map((p) => (
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
