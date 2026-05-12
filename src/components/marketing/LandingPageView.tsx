import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLanding, type LandingPage } from "@/lib/landings";
import { BRAND_LOGO_URL, SITE } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/schema";

function webPageJsonLd(page: LandingPage) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: `${SITE.url}/${page.slug}`,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };
}

export function buildLandingMetadata(page: LandingPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE.url}/${page.slug}`,
      siteName: SITE.name,
      type: "website",
      images: [{ url: BRAND_LOGO_URL, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [BRAND_LOGO_URL],
    },
  };
}

export function LandingPageView({ page }: { page: LandingPage }) {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: page.h1, path: `/${page.slug}` },
  ]);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={webPageJsonLd(page)} />
      <JsonLd data={crumbs} />

      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_0%,rgba(37,99,235,0.16),transparent_55%)]" />
        <div className="container-site relative">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Physician opportunities</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {page.h1}
            </h1>
            <h2 className="mt-4 text-lg font-medium text-slate-700 sm:text-xl">{page.h2}</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/physician-opportunities#lead-form"
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              >
                Find Opportunities
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
              >
                Talk to a Recruiter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">What you can expect</h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
              {page.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Keyword focus (for humans and search engines)</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                This page clusters intent around:{" "}
                <span className="font-semibold text-slate-900">{page.keywords.join(", ")}</span>. Explore related hubs
                below to compare models, geographies, and scheduling strategies.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LeadCaptureForm
              title="Request matches for this intent"
              subtitle="Tell us your specialty and availability. We will respond with realistic options aligned to this page’s focus."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-14 sm:py-16">
        <div className="container-site">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">Related guides</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.relatedSlugs.map((slug) => {
              const related = getLanding(slug);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:shadow-card"
                >
                  {related?.h1 ?? slug}
                </Link>
              );
            })}
            <Link
              href="/blog"
              className="rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:shadow-card"
            >
              Physician insights library →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
