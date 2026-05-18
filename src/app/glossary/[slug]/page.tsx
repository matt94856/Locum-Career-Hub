import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { GLOSSARY_SLUGS, getGlossaryItem, glossaryBodyParagraphs } from "@/lib/glossary-data";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { Tier1QuickLinks } from "@/components/sections/Tier1QuickLinks";
import { buildGlossarySerpMetadata } from "@/lib/serp-ctr";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return GLOSSARY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getGlossaryItem(slug);
  if (!item) return {};
  return buildGlossarySerpMetadata(item.title, slug);
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getGlossaryItem(slug);
  if (!item) notFound();

  const path = `/glossary/${slug}`;
  const paragraphs = glossaryBodyParagraphs(slug, item.title);

  const medical = medicalWebPageJsonLd({
    name: `${item.title} | Physician glossary | ${SITE.name}`,
    description: `Educational overview of “${item.title}” for physicians exploring locum tenens, credentialing, and staffing language.`,
    path,
    keywords: [item.title, "locum tenens", "physician careers", "physician staffing"],
    aboutTopics: [item.title, "Locum tenens", "Physician careers"],
  });

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Glossary", path: "/glossary" },
    { name: item.title, path },
  ]);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={crumbs} />

      <article className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Glossary</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {item.title}
          </h1>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/physician-opportunities#lead-form"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Request matches
            </Link>
            <Link
              href="/glossary"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
            >
              Back to glossary
            </Link>
          </div>
          <div className="mt-12 space-y-6">
            <LeadConversionBand headline="Definitions are step one—matches are step two." />
            <Tier1QuickLinks />
          </div>
        </div>
      </article>
    </main>
  );
}
