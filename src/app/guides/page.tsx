import type { Metadata } from "next";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { LANDING_PAGES } from "@/lib/landings";
import { breadcrumbJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { socialShareMetadata } from "@/lib/social-metadata";

const PAGE_TITLE = "Locum Tenens Guides | Burnout, Travel Jobs & Flexible Careers";
const PAGE_DESCRIPTION =
  "Locum tenens guides for physicians: burnout alternatives, travel physician jobs, side income, schedule flexibility, and credentialing—skimmable resources without pressure.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/guides" },
  keywords: [
    "physician career guides",
    "locum tenens guide",
    "physician flexibility",
    "physician burnout resources",
    "travel physician jobs guide",
  ],
  ...socialShareMetadata({
    title: "Locum Tenens Guides | Burnout, Travel Jobs & Flexible Careers",
    description: PAGE_DESCRIPTION,
    path: "/guides",
  }),
};

export default function GuidesIndexPage() {
  const path = "/guides";
  const medical = medicalWebPageJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path,
    keywords: [
      "physician career guides",
      "locum tenens",
      "flexible physician work",
      "physician recruiting",
    ],
    aboutTopics: ["Physician careers", "Locum tenens", "Physician work-life balance"],
  });
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Guides", path },
  ]);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={crumbs} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Guides</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Topic guides for physicians exploring flexible work
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Each page is built to be skimmable: direct answers first, FAQs where they help, and a clear path to talk with
            our team when you want human guidance—not a hard sell.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <ul className="grid list-none grid-cols-1 gap-4 p-0 auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
            {LANDING_PAGES.map((p) => (
              <li key={p.slug} className="min-w-0">
                <GuideCardLink href={`/${p.slug}`} title={p.h1} description={p.description} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
