import { notFound } from "next/navigation";
import { buildCardiologySeoMetadata, CardiologySeoPageView } from "@/components/marketing/CardiologySeoPageView";
import { getMoneySlugs, getPageByMoneySlug } from "@/lib/cardiology-seo/registry";

export function generateStaticParams() {
  return getMoneySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByMoneySlug(slug);
  if (!page) return {};
  return buildCardiologySeoMetadata(page);
}

export default async function CardiologyLocumJobsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByMoneySlug(slug);
  if (!page) notFound();
  return <CardiologySeoPageView page={page} />;
}
