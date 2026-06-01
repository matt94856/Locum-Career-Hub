import { notFound } from "next/navigation";
import { buildCardiologySeoMetadata, CardiologySeoPageView } from "@/components/marketing/CardiologySeoPageView";
import { getPageBySalarySlug, getSalarySlugs } from "@/lib/cardiology-seo/registry";

export function generateStaticParams() {
  return getSalarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySalarySlug(slug);
  if (!page) return {};
  return buildCardiologySeoMetadata(page);
}

export default async function SalaryGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySalarySlug(slug);
  if (!page) notFound();
  return <CardiologySeoPageView page={page} />;
}
