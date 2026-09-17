import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturedCardiologyOpportunityView } from "@/components/marketing/FeaturedCardiologyOpportunityView";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  FEATURED_CARDIOLOGY_OPPORTUNITIES,
  featuredOpportunityPath,
  getFeaturedCardiologyOpportunity,
} from "@/lib/featured-cardiology-opportunities";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jobPostingJsonLd,
  medicalWebPageJsonLd,
} from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FEATURED_CARDIOLOGY_OPPORTUNITIES.map((opportunity) => ({
    slug: opportunity.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = getFeaturedCardiologyOpportunity(slug);

  if (!opportunity) {
    return {};
  }

  return buildSerpMetadata({
    title: opportunity.metaTitle,
    description: opportunity.metaDescription,
    path: featuredOpportunityPath(opportunity.slug),
    keywords: opportunity.keywords,
  });
}

export default async function FeaturedCardiologyOpportunityPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const opportunity = getFeaturedCardiologyOpportunity(slug);

  if (!opportunity) {
    notFound();
  }

  const path = featuredOpportunityPath(opportunity.slug);
  const structuredDescription = [
    opportunity.directAnswer,
    `Schedule: ${opportunity.schedule}.`,
    opportunity.compensation ? `Pay: ${opportunity.compensation}` : "",
    `Qualifications: ${opportunity.requirements.join("; ")}.`,
    `Assignment support: ${opportunity.benefits.join("; ")}.`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <JsonLd
        data={jobPostingJsonLd({
          title: opportunity.title,
          description: structuredDescription,
          path,
          datePosted: opportunity.datePosted,
          state: opportunity.state,
          ...(opportunity.baseSalaryMinUsdPerDay
            ? { baseSalaryMinUsdPerDay: opportunity.baseSalaryMinUsdPerDay }
            : {}),
        })}
      />
      <JsonLd data={faqJsonLd(opportunity.faqs)} />
      <JsonLd
        data={medicalWebPageJsonLd({
          name: opportunity.title,
          description: opportunity.metaDescription,
          path,
          keywords: opportunity.keywords,
          aboutTopics: [
            "Cardiology locum tenens",
            opportunity.setting,
            `${opportunity.state} physician jobs`,
          ],
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Physician opportunities", path: "/physician-opportunities" },
          { name: opportunity.shortLabel, path },
        ])}
      />
      <FeaturedCardiologyOpportunityView opportunity={opportunity} />
    </>
  );
}
