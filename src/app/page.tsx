import Link from "next/link";
import type { Metadata } from "next";
import { FeaturedStates } from "@/components/sections/FeaturedStates";
import { Hero } from "@/components/sections/Hero";
import { InternalTopicGrid } from "@/components/sections/InternalTopicGrid";
import { Process } from "@/components/sections/Process";
import { RecruiterCta } from "@/components/sections/RecruiterCta";
import { Segments } from "@/components/sections/Segments";
import { SpecialtiesSection } from "@/components/sections/SpecialtiesSection";
import { StatsAnimated } from "@/components/sections/StatsAnimated";
import { TrustBar } from "@/components/sections/TrustBar";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HOME_FAQ } from "@/lib/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import { Tier1DiscoveryHub } from "@/components/sections/Tier1DiscoveryHub";
import { HOME_LEAD_ANCHOR } from "@/lib/seo/tier1-discovery";
import { buildHomeSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildHomeSerpMetadata();

export default function HomePage() {
  return (
    <main>
      <JsonLd data={faqJsonLd(HOME_FAQ)} />

      <Hero />

      <Tier1DiscoveryHub leadHref={HOME_LEAD_ANCHOR} />

      <section id="get-matched" className="scroll-mt-24 border-b border-slate-100 bg-slate-50/40 py-16 sm:py-20">
        <div className="container-site">
          <LeadCaptureForm
            title="Request locum matches"
            subtitle="Most visitors start here—share specialty, states, and timeline. We respond with realistic options, not a generic blast."
          />
        </div>
      </section>

      <TrustBar />
      <Segments />
      <SpecialtiesSection />
      <StatsAnimated />
      <Process />
      <FeaturedStates />

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions physicians ask when the week feels unsustainable"
              subtitle="Still exploring? Start here—then connect when you want specifics for your specialty and timeline."
            />
            <div className="mt-8 space-y-4">
              <Button href="/faq" variant="secondary" className="w-full justify-center sm:w-auto sm:min-w-0">
                View all FAQs
              </Button>
              <p className="text-sm text-slate-600">
                Prefer a downloadable primer? Grab{" "}
                <Link className="font-semibold text-brand-700 hover:underline" href="/physicians-guide-to-locum-tenens">
                  The Physician’s Guide to Locum Tenens
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <FaqAccordion items={HOME_FAQ} />
          </div>
        </div>
      </section>

      <RecruiterCta />

      <InternalTopicGrid />
    </main>
  );
}
