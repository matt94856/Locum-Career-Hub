import { notFound } from "next/navigation";
import { buildCardiologySeoMetadata, CardiologySeoPageView } from "@/components/marketing/CardiologySeoPageView";
import { getGuideSlugs, getPageByGuideSlug } from "@/lib/cardiology-seo/registry";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByGuideSlug(slug);
  if (!page) return {};
  return buildCardiologySeoMetadata(page);
}

export default async function GuideCardiologySeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByGuideSlug(slug);
  if (!page) notFound();
  return <CardiologySeoPageView page={page} />;
}
