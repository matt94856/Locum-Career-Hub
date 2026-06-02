import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { NewsletterCapture } from "@/components/forms/NewsletterCapture";
import { getAllArticles, RESOURCES_HUB_PATH } from "@/lib/cardiology-authority/articles";
import { CARDIOLOGY_HUB_PATH } from "@/lib/seo/cardiology-locum-jobs-config";
import { breadcrumbJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { CTA } from "@/lib/site";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Locum Resources for Physicians",
  description:
    "Physician-focused guides on locum cardiologist salary, credentialing, licensing, burnout alternatives, and career transitions. Cardiologists only.",
  path: RESOURCES_HUB_PATH,
  keywords: ["cardiology locum resources", "locum cardiologist guide", "cardiologist career"],
});

export default function ResourcesHubPage() {
  const articles = getAllArticles();
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Resources", path: RESOURCES_HUB_PATH },
  ]);
  const medical = medicalWebPageJsonLd({
    name: "Cardiology Locum Resources",
    description: "Informational guides for cardiologists exploring locum tenens.",
    path: RESOURCES_HUB_PATH,
    keywords: ["cardiology resources", "locum tenens guides"],
    aboutTopics: ["Cardiology", "Locum tenens"],
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={medical} />
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiology Locum Resources for Physicians
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Answer-first guides on salary, credentialing, licensing, burnout alternatives, and career transitions—written
            for board-certified cardiologists. Locum Career Hub recruits cardiologists only; we are not a hospital
            employer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={CARDIOLOGY_HUB_PATH}>{CTA.learn}</Button>
            <Button href="/physician-opportunities#lead-form" variant="secondary">
              {CTA.explore}
            </Button>
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 lg:col-span-8">
          <ul className="grid gap-4 sm:grid-cols-2">
            {articles.map((a) => (
              <li key={a.slug} className="surface-card p-5">
                <Link href={a.path} className="font-display text-lg font-semibold text-brand-800 hover:underline">
                  {a.h1}
                </Link>
                <p className="mt-2 text-sm text-slate-600">{a.metaDescription.slice(0, 120)}…</p>
              </li>
            ))}
          </ul>
          </div>
          <div className="min-w-0 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <NewsletterCapture />
          </div>
        </div>
      </section>
    </main>
  );
}
