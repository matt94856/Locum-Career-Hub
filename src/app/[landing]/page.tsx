import { notFound } from "next/navigation";
import { buildLandingMetadata, LandingPageView } from "@/components/marketing/LandingPageView";
import { getLanding, LANDING_SLUGS } from "@/lib/landings";

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ landing: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params;
  const page = getLanding(landing);
  if (!page) return {};
  return buildLandingMetadata(page);
}

export default async function LandingRoute({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params;
  const page = getLanding(landing);
  if (!page) notFound();
  return <LandingPageView page={page} />;
}
