import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CARDIOLOGY_RECRUITER } from "@/lib/cardiology-authority/eeat";
import { aboutPageJsonLd, breadcrumbJsonLd, personJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { CTA, SITE } from "@/lib/site";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Recruiter Team",
  description: CARDIOLOGY_RECRUITER.bio,
  path: "/team",
  keywords: ["cardiology recruiter", "locum tenens recruiter"],
});

export default function TeamPage() {
  const path = "/team";
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Team", path },
  ]);
  const about = aboutPageJsonLd({
    name: "Locum Career Hub Team",
    description: CARDIOLOGY_RECRUITER.bio,
    path,
  });
  const person = personJsonLd({
    name: CARDIOLOGY_RECRUITER.name,
    jobTitle: CARDIOLOGY_RECRUITER.role,
    description: CARDIOLOGY_RECRUITER.bio,
    url: `${SITE.url}${path}`,
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={about} />
      <JsonLd data={person} />
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Team" }]} />
          <h1 className="mt-4 font-display text-4xl font-semibold text-slate-950">Cardiology recruiting team</h1>
        </div>
      </section>
      <section className="container-site max-w-3xl py-14">
        <article className="surface-card p-8">
          <h2 className="font-display text-2xl font-semibold text-slate-950">{CARDIOLOGY_RECRUITER.name}</h2>
          <p className="mt-1 text-sm font-semibold text-brand-700">{CARDIOLOGY_RECRUITER.role}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">{CARDIOLOGY_RECRUITER.bio}</p>
          <p className="mt-3 text-sm text-slate-600">{CARDIOLOGY_RECRUITER.credentials}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form">{CTA.recruiter}</Button>
            <Button href="/resources" variant="secondary">
              Cardiology resources →
            </Button>
          </div>
        </article>
        <p className="mt-8 text-sm text-slate-600">
          <Link href="/editorial-policy" className="font-semibold text-brand-700 hover:underline">
            Editorial Policy
          </Link>{" "}
          ·{" "}
          <Link href="/content-review-policy" className="font-semibold text-brand-700 hover:underline">
            Content Review Policy
          </Link>
        </p>
      </section>
    </main>
  );
}
