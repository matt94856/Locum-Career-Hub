import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardiologyJobsSeoView } from "@/components/marketing/CardiologyJobsSeoView";
import { buildJobStatePage } from "@/lib/cardiology-authority/jobs-seo";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { US_STATE_SLUGS } from "@/lib/us-state-slugs";

export function generateStaticParams() {
  return US_STATE_SLUGS.map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const page = buildJobStatePage(state);
  if (!page) return {};
  return buildSerpMetadata({
    title: page.title.replace(` | Locum Career Hub`, ""),
    description: page.metaDescription,
    path: `/locum-tenens-jobs/${state}`,
    keywords: [page.title, "locum cardiologist jobs"],
  });
}

export default async function JobStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const page = buildJobStatePage(state);
  if (!page) notFound();
  return <CardiologyJobsSeoView page={page} />;
}
