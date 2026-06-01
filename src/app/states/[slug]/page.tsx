import { notFound } from "next/navigation";
import { buildCardiologySeoMetadata, CardiologySeoPageView } from "@/components/marketing/CardiologySeoPageView";
import { getPageByStateSlug, getStateSlugs } from "@/lib/cardiology-seo/registry";

export function generateStaticParams() {
  return getStateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByStateSlug(slug);
  if (!page) return {};
  return buildCardiologySeoMetadata(page);
}

export default async function StateCardiologySeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageByStateSlug(slug);
  if (!page) notFound();
  return <CardiologySeoPageView page={page} />;
}
