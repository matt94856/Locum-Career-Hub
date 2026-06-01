import { notFound } from "next/navigation";
import { buildCardiologySeoMetadata, CardiologySeoPageView } from "@/components/marketing/CardiologySeoPageView";
import { getCitySlugs, getPageByCitySlug } from "@/lib/cardiology-seo/registry";

export function generateStaticParams() {
  return getCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByCitySlug(slug);
  if (!page) return {};
  return buildCardiologySeoMetadata(page);
}

export default async function CityCardiologySeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByCitySlug(slug);
  if (!page) notFound();
  return <CardiologySeoPageView page={page} />;
}
