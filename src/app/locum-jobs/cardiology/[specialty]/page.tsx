import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardiologySpecialtyLocumView } from "@/components/marketing/CardiologySpecialtyLocumView";
import {
  CARDIOLOGY_PATH_SLUGS,
  cardiologySpecialtyPath,
  getCardiologySpecialtyByPathSlug,
  specialtyPageTitle,
} from "@/lib/seo/cardiology-locum-jobs-config";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export function generateStaticParams() {
  return CARDIOLOGY_PATH_SLUGS.map((specialty) => ({ specialty }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ specialty: string }>;
}): Promise<Metadata> {
  const { specialty: pathSlug } = await params;
  const spec = getCardiologySpecialtyByPathSlug(pathSlug);
  if (!spec) return {};
  return buildSerpMetadata({
    title: specialtyPageTitle(spec.titleKeyword),
    description: spec.metaDescription,
    path: cardiologySpecialtyPath(pathSlug),
    keywords: [spec.titleKeyword, "locum cardiologist jobs", "cardiology locum tenens"],
  });
}

export default async function CardiologySpecialtyLocumPage({
  params,
}: {
  params: Promise<{ specialty: string }>;
}) {
  const { specialty: pathSlug } = await params;
  const spec = getCardiologySpecialtyByPathSlug(pathSlug);
  if (!spec) notFound();
  return <CardiologySpecialtyLocumView specialty={spec} />;
}
