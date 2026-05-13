import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY_ITEMS } from "@/lib/glossary-data";
import { SITE } from "@/lib/site";
import { socialShareMetadata } from "@/lib/social-metadata";

const DESC =
  "Plain-language glossary for locum tenens, credentialing, malpractice, taxes, and physician staffing terms—built for search clarity and AI-friendly definitions.";

export const metadata: Metadata = {
  title: "Physician Staffing & Locum Glossary",
  description: DESC,
  alternates: { canonical: "/glossary" },
  ...socialShareMetadata({
    title: `Glossary | ${SITE.name}`,
    description: DESC,
    path: "/glossary",
  }),
};

export default function GlossaryIndexPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Glossary</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Locum tenens & physician staffing terms
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Short, factual entries designed for semantic search and AI summaries. For matches and timelines, use the
            inquiry form on{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/physician-opportunities">
              physician opportunities
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <ul className="columns-1 gap-x-10 sm:columns-2 lg:columns-3">
            {GLOSSARY_ITEMS.map((g) => (
              <li key={g.slug} className="mb-2 break-inside-avoid">
                <Link href={`/glossary/${g.slug}`} className="text-sm font-semibold text-brand-700 hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
