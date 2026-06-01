import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLanding, type LandingPage } from "@/lib/landings";
import { CTA } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata, landingSerpOverride } from "@/lib/serp-ctr";
import { stripBrandFromTitle } from "@/lib/seo-title";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { Button } from "@/components/ui/Button";

export function buildLandingMetadata(page: LandingPage): Metadata {
  const override = landingSerpOverride(page.slug);
  const titlePart = override?.title ?? stripBrandFromTitle(page.title);
  const description = override?.description ?? page.description;
  return buildSerpMetadata({
    title: titlePart,
    description,
    path: `/${page.slug}`,
    keywords: page.keywords,
  });
}

export function LandingPageView({ page }: { page: LandingPage }) {
  const path = `/${page.slug}`;
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: page.h1, path },
  ]);
  const medical = medicalWebPageJsonLd({
    name: page.title,
    description: page.description,
    path,
    keywords: page.keywords,
    aboutTopics: [
      "Cardiologist careers",
      "Cardiologist burnout",
      "Cardiology locum tenens",
      "Locum tenens",
    ],
  });
  const faqLd = page.faqs?.length ? faqJsonLd(page.faqs) : null;

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <JsonLd data={crumbs} />

      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_0%,rgba(37,99,235,0.16),transparent_55%)]" />
        <div className="container-site relative">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiologist-only recruiting</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl">
              {page.h1}
            </h1>
            <h2 className="mt-4 text-lg font-medium text-slate-700 sm:text-xl">{page.h2}</h2>
            {page.answer ? (
              <p className="mt-6 rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:p-5 sm:text-lg">
                <span className="text-brand-800">Direct answer: </span>
                {page.answer}
              </p>
            ) : null}
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">{page.intro}</p>
            <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              <Button href="/physician-opportunities#lead-form" className="w-full justify-center">
                {CTA.explore}
              </Button>
              <Button href="/contact" variant="secondary" className="w-full justify-center">
                {CTA.recruiter}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            {page.whoFor?.length ? (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-950">Who should read this</h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                  {page.whoFor.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">What you can expect</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
                {page.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {page.sections?.length ? (
              <div className="space-y-10">
                {page.sections.map((sec) => (
                  <section key={sec.h2}>
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">{sec.h2}</h2>
                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                      {sec.paragraphs.map((p, i) => (
                        <p key={`${sec.h2}-${i}`}>{p}</p>
                      ))}
                    </div>
                    {sec.bullets?.length ? (
                      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                        {sec.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            ) : null}

            {page.faqs?.length ? (
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">FAQs</h2>
                <dl className="mt-6 space-y-6">
                  {page.faqs.map((f) => (
                    <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                      <dt className="font-semibold text-slate-900">{f.q}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-sm font-semibold text-slate-900">Topics covered on this page</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Related searches include{" "}
                <span className="font-semibold text-slate-900">{page.keywords.join(" · ")}</span>. Use the related guides
                below to compare models, geographies, and scheduling strategies.
              </p>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
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
          <div className="mt-6 grid grid-cols-1 gap-3 auto-rows-fr sm:grid-cols-2">
            {page.relatedSlugs.map((slug) => {
              const related = getLanding(slug);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="flex min-h-[4.5rem] min-w-0 flex-col justify-center rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold leading-snug text-slate-900 shadow-sm transition hover:border-brand-200 hover:shadow-md [overflow-wrap:anywhere] sm:p-5"
                >
                  {related?.h1 ?? slug}
                </Link>
              );
            })}
            {page.relatedLinks?.map((rl) => (
              <Link
                key={rl.href}
                href={rl.href}
                className="flex min-h-[4.5rem] min-w-0 flex-col justify-center rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold leading-snug text-slate-900 shadow-sm transition hover:border-brand-200 hover:shadow-md [overflow-wrap:anywhere] sm:p-5"
              >
                {rl.title} →
              </Link>
            ))}
            <Link
              href="/physician-opportunities#lead-form"
              className="flex min-h-[4.5rem] min-w-0 flex-col justify-center rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm font-semibold leading-snug text-brand-900 shadow-sm transition hover:border-brand-300 hover:shadow-md sm:p-5"
            >
              Physician opportunities &amp; lead form →
            </Link>
            <Link
              href="/blog"
              className="flex min-h-[4.5rem] min-w-0 flex-col justify-center rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-brand-200 hover:shadow-md sm:p-5"
            >
              Physician insights library →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/50 py-12 sm:py-14">
        <div className="container-site max-w-3xl">
          <LeadConversionBand headline="Read enough—want matches for your situation?" />
        </div>
      </section>
    </main>
  );
}
