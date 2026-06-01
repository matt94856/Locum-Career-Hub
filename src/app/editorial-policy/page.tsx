import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPageJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { EDITORIAL_POLICY } from "@/lib/cardiology-authority/eeat";

export const metadata: Metadata = buildSerpMetadata({
  title: EDITORIAL_POLICY.title,
  description: EDITORIAL_POLICY.description,
  path: EDITORIAL_POLICY.path,
  keywords: ["editorial policy", "YMYL", "cardiology content"],
});

export default function EditorialPolicyPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Editorial Policy", path: EDITORIAL_POLICY.path },
  ]);
  const about = aboutPageJsonLd({
    name: EDITORIAL_POLICY.title,
    description: EDITORIAL_POLICY.description,
    path: EDITORIAL_POLICY.path,
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={about} />
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Editorial Policy" }]} />
          <h1 className="mt-4 font-display text-4xl font-semibold text-slate-950">Editorial Policy</h1>
          <p className="mt-6 text-lg text-slate-600">
            Locum Career Hub publishes cardiologist-focused locum tenens career content. We are a recruiting service—not
            a hospital, medical practice, or clinical advice provider.
          </p>
        </div>
      </section>
      <section className="container-site max-w-3xl space-y-6 py-14 text-sm leading-relaxed text-slate-700">
        <h2 className="font-display text-2xl font-semibold text-slate-950">Who we write for</h2>
        <p>Board-certified cardiologists and cardiology fellows considering locum tenens work in the United States.</p>
        <h2 className="font-display text-2xl font-semibold text-slate-950">Accuracy and YMYL</h2>
        <p>
          Compensation figures are directional market context—not guaranteed offers. Clinical statements reference ACC,
          AHA, and ABIM publicly available standards where relevant; they are not patient care instructions.
        </p>
        <h2 className="font-display text-2xl font-semibold text-slate-950">Recruiter disclosure</h2>
        <p>
          Locum Career Hub may benefit when matched cardiologists accept assignments. We disclose our recruiting role on
          conversion pages and avoid implying employment relationships we do not have.
        </p>
        <p>
          See also{" "}
          <Link href="/content-review-policy" className="font-semibold text-brand-700 hover:underline">
            Content Review Policy
          </Link>{" "}
          and{" "}
          <Link href="/team" className="font-semibold text-brand-700 hover:underline">
            Team
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
