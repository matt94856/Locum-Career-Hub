import Link from "next/link";
import { FeaturedStates } from "@/components/sections/FeaturedStates";
import { Hero } from "@/components/sections/Hero";
import { InternalTopicGrid } from "@/components/sections/InternalTopicGrid";
import { Process } from "@/components/sections/Process";
import { RecruiterCta } from "@/components/sections/RecruiterCta";
import { Segments } from "@/components/sections/Segments";
import { SpecialtiesSection } from "@/components/sections/SpecialtiesSection";
import { StatsAnimated } from "@/components/sections/StatsAnimated";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HOME_FAQ } from "@/lib/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import type { Metadata } from "next";
import { BRAND_LOGO_URL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flexible Locum Tenens Opportunities for Modern Physicians",
  description:
    "Connect with high-paying locum tenens opportunities built around your schedule, lifestyle, and career goals. Physician-first recruiting with nationwide coverage.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Flexible Locum Tenens Opportunities for Modern Physicians",
    description:
      "Connect with high-paying locum tenens opportunities built around your schedule, lifestyle, and career goals.",
    url: SITE.url,
    images: [{ url: BRAND_LOGO_URL, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexible Locum Tenens Opportunities for Modern Physicians",
    description:
      "Connect with high-paying locum tenens opportunities built around your schedule, lifestyle, and career goals.",
    images: [BRAND_LOGO_URL],
  },
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={faqJsonLd(HOME_FAQ)} />

      <Hero />
      <TrustBar />
      <Segments />
      <SpecialtiesSection />
      <StatsAnimated />
      <Testimonials />
      <Process />
      <FeaturedStates />

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Answers physicians ask before their first locums block"
              subtitle="Still exploring? Start here—then talk with a recruiter for specifics tied to your specialty and timeline."
            />
            <div className="mt-8 space-y-4">
              <Button href="/faq" variant="secondary" className="w-full sm:w-auto">
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
          <div className="lg:col-span-7">
            <FaqAccordion items={HOME_FAQ} />
          </div>
        </div>
      </section>

      <RecruiterCta />

      <section className="py-16 sm:py-20">
        <div className="container-site">
          <LeadCaptureForm />
        </div>
      </section>

      <InternalTopicGrid />
    </main>
  );
}
