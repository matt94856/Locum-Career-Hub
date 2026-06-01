import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardiologyJobsSeoView } from "@/components/marketing/CardiologyJobsSeoView";
import {
  JOB_SPECIALTY_SLUGS,
  buildJobStateSpecialtyPage,
  getJobSpecialtyDef,
} from "@/lib/cardiology-authority/jobs-seo";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { US_STATE_SLUGS } from "@/lib/us-state-slugs";

export function generateStaticParams() {
  return US_STATE_SLUGS.flatMap((state) =>
    JOB_SPECIALTY_SLUGS.map((specialtySlug) => ({ state, specialtySlug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; specialtySlug: string }>;
}): Promise<Metadata> {
  const { state, specialtySlug } = await params;
  const page = buildJobStateSpecialtyPage(state, specialtySlug);
  if (!page) return {};
  return buildSerpMetadata({
    title: page.title.replace(` | Locum Career Hub`, ""),
    description: page.metaDescription,
    path: `/jobs/${state}/${specialtySlug}`,
    keywords: [page.title, "locum cardiologist jobs"],
  });
}

export default async function JobStateSpecialtyPage({
  params,
}: {
  params: Promise<{ state: string; specialtySlug: string }>;
}) {
  const { state, specialtySlug } = await params;
  const page = buildJobStateSpecialtyPage(state, specialtySlug);
  const specialty = getJobSpecialtyDef(specialtySlug);
  if (!page || !specialty) notFound();
  return <CardiologyJobsSeoView page={page} specialty={specialty} />;
}
