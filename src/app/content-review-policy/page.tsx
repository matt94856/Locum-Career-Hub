import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPageJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { CONTENT_REVIEW_POLICY, MEDICAL_REVIEWER } from "@/lib/cardiology-authority/eeat";

export const metadata: Metadata = buildSerpMetadata({
  title: CONTENT_REVIEW_POLICY.title,
  description: CONTENT_REVIEW_POLICY.description,
  path: CONTENT_REVIEW_POLICY.path,
  keywords: ["content review", "medical reviewer", "EEAT"],
});

export default function ContentReviewPolicyPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Content Review Policy", path: CONTENT_REVIEW_POLICY.path },
  ]);
  const about = aboutPageJsonLd({
    name: CONTENT_REVIEW_POLICY.title,
    description: CONTENT_REVIEW_POLICY.description,
    path: CONTENT_REVIEW_POLICY.path,
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={about} />
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Content Review Policy" }]} />
          <h1 className="mt-4 font-display text-4xl font-semibold text-slate-950">Content Review Policy</h1>
        </div>
      </section>
      <section className="container-site max-w-3xl space-y-6 py-14 text-sm leading-relaxed text-slate-700">
        <h2 className="font-display text-2xl font-semibold text-slate-950">Review framework</h2>
        <p>
          Cardiology career articles receive editorial review for physician-facing accuracy, recruiter-disclosure clarity,
          and removal of generic staffing language. {MEDICAL_REVIEWER.name} validates that content does not present
          medical advice or guaranteed compensation.
        </p>
        <h2 className="font-display text-2xl font-semibold text-slate-950">What each article includes</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Named author (cardiology recruiter)</li>
          <li>Review attribution and last updated date</li>
          <li>Sources linking to ACC, AHA, and ABIM where applicable</li>
          <li>FAQ schema and answer-first summaries for clarity</li>
        </ul>
        <p>
          <Link href="/editorial-policy" className="font-semibold text-brand-700 hover:underline">
            Editorial Policy
          </Link>{" "}
          ·{" "}
          <Link href="/resources" className="font-semibold text-brand-700 hover:underline">
            Resources
          </Link>
        </p>
      </section>
    </main>
  );
}
