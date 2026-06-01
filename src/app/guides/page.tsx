import type { Metadata } from "next";
import Link from "next/link";
import { getCardiologySeoPagesByCategory } from "@/lib/cardiology-seo/registry";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Locum Guides | Licensing, Tax, Career",
  description: "Cardiologist locum guides—licensing by state, taxes, career paths, comparisons, FAQs, and pillar content.",
  path: "/guides",
  keywords: ["cardiology locum guide", "cardiologist licensing guide", "locum cardiology career"],
});

const GROUPS = [
  { label: "Licensing", category: "licensing" as const },
  { label: "Tax", category: "tax" as const },
  { label: "Career", category: "career" as const },
  { label: "Subspecialty", category: "subspecialty" as const },
  { label: "Employers (educational)", category: "employer" as const },
  { label: "Comparisons", category: "comparison" as const },
  { label: "FAQ", category: "faq" as const },
  { label: "Data", category: "data" as const },
  { label: "Pillar guides", category: "pillar" as const },
];

export default function GuidesHubPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="container-site py-14 sm:py-16">
        <h1 className="font-display text-4xl font-semibold text-slate-950">Cardiology locum guides</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Educational resources for cardiologists—licensing, taxes, career paths, and locum decision-making.
        </p>
        <div className="mt-12 space-y-12">
          {GROUPS.map((g) => {
            const pages = getCardiologySeoPagesByCategory(g.category);
            return (
              <div key={g.category}>
                <h2 className="font-display text-xl font-semibold text-slate-900">{g.label}</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {pages.map((p) => (
                    <li key={p.slug}>
                      <Link href={p.path} className="text-sm font-medium text-brand-700 hover:underline">
                        {p.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
