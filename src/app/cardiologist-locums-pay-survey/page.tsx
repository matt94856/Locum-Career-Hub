import type { Metadata } from "next";
import Link from "next/link";
import { DistributionStrip } from "@/components/share/DistributionStrip";
import { PaySurveyForm } from "@/components/share/PaySurveyForm";
import { ViralShareKit } from "@/components/share/ViralShareKit";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { buildResultShareLandingUrl } from "@/lib/share";
import { SITE } from "@/lib/site";

const PATH = "/cardiologist-locums-pay-survey";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiologist Locums Pay Survey (Anonymous)",
  description:
    "Contribute anonymized cardiologist locum weekly pay ranges by subspecialty and region. Aggregates power a citeable public chart.",
  path: PATH,
});

export default function CardiologistLocumsPaySurveyPage() {
  const shareUrl = buildResultShareLandingUrl({
    kind: "survey",
    title: "Cardiologist locums pay survey",
    stat: "90 seconds",
    subtitle: "Anonymous weekly ranges → citeable public chart",
    path: PATH,
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pay survey", path: PATH }])} />
      <section className="border-b border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Original data moat</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Anonymous cardiologist locums pay survey
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Staffing sites quote ranges. We are collecting cardiologist-only, assignment-aware weekly gross ranges so the
            field finally has a citeable chart. Forward this to colleagues — sample size is the product.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/cardiologist-locums-pay-report" className="font-semibold text-brand-700 hover:underline">
              View the public chart →
            </Link>
            <Link href="/cardiologist-locums-calculator" className="font-semibold text-brand-700 hover:underline">
              Run the earnings calculator →
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="container-site max-w-3xl space-y-8">
          <PaySurveyForm />
          <ViralShareKit
            payload={{
              title: "Cardiologist locums pay survey",
              text: "Help build a citeable cardiologist-only locums pay chart — anonymous, 90 seconds.",
              url: shareUrl,
              headlineStat: "90 sec",
              toolId: "pay_survey",
            }}
            linkedInPost={[
              "Cardiologists: if you've done locums, this anonymous 90-second pay survey is worth it.",
              "",
              "Aggregates only — building a citeable cardiology locums pay chart.",
              shareUrl,
            ].join("\n")}
          />
          <DistributionStrip
            shareUrl={shareUrl}
            hook="this anonymous cardiologist locums pay survey (90 seconds, aggregates only)"
            toolId="pay_survey"
            creatorPitch={`Hi — we're collecting anonymous cardiologist locums weekly pay ranges for a public citeable chart (no individual rows published). Would you share with your audience/fellowship? ${SITE.url}${PATH}`}
          />
        </div>
      </section>
    </main>
  );
}
