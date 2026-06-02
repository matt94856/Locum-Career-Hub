import { HomeCardiologistGuides } from "@/components/sections/HomeCardiologistGuides";
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
import { LeadFormStandaloneSection } from "@/components/forms/LeadFormStandaloneSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Tier1DiscoveryHub } from "@/components/sections/Tier1DiscoveryHub";
import Link from "next/link";
import type { Metadata } from "next";
import { HOME_FAQ } from "@/lib/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import { HOME_LEAD_ANCHOR } from "@/lib/seo/tier1-discovery";
import { buildHomeSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildHomeSerpMetadata();

export default function HomePage() {
  return (
    <main>
      <JsonLd data={faqJsonLd(HOME_FAQ)} />

      <Hero />

      <Tier1DiscoveryHub leadHref={HOME_LEAD_ANCHOR} />

      <HomeCardiologistGuides />

      <section id="get-matched" className="scroll-mt-24 border-y border-slate-100 bg-slate-50/40 py-16 sm:py-20">
        <LeadFormStandaloneSection>
          <LeadCaptureForm
            id="lead-form"
            title="Request cardiologist locum matches"
            subtitle="Cardiologists only—share subspecialty, states, and timeline. We respond with realistic options, not a generic blast."
            defaultSpecialty="General Cardiology"
          />
        </LeadFormStandaloneSection>
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
              title="Questions cardiologists ask about locum tenens"
              subtitle="Still exploring? Start here—then submit an inquiry when you want specifics for your subspecialty and timeline."
            />
            <div className="mt-8 space-y-4">
              <Button href={HOME_LEAD_ANCHOR} className="w-full justify-center sm:w-auto sm:min-w-0">
                Request matches
              </Button>
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
