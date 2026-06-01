import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardiologySpecialtyLocumView } from "@/components/marketing/CardiologySpecialtyLocumView";
import {
  CARDIOLOGY_PATH_SLUGS,
  getCardiologySpecialtyByPathSlug,
} from "@/lib/seo/cardiology-locum-jobs-config";
import { buildCardiologySpecialtySerpMetadata } from "@/lib/serp-ctr";

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
  return buildCardiologySpecialtySerpMetadata({
    name: spec.name,
    metaDescription: spec.metaDescription,
    pathSlug: pathSlug,
    titleKeyword: spec.titleKeyword,
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
