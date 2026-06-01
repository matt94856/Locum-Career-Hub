import { notFound } from "next/navigation";
import {
  buildCardiologyProgrammaticMetadata,
  CardiologyProgrammaticView,
} from "@/components/marketing/CardiologyProgrammaticView";
import { CARDIOLOGY_PROGRAMMATIC_SLUGS, getCardiologyProgrammaticPage } from "@/lib/cardiology-programmatic";

export function generateStaticParams() {
  return CARDIOLOGY_PROGRAMMATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getCardiologyProgrammaticPage(slug);
  if (!page) return {};
  return buildCardiologyProgrammaticMetadata(page);
}

export default async function CardiologyLocumsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getCardiologyProgrammaticPage(slug);
  if (!page) notFound();
  return <CardiologyProgrammaticView page={page} />;
}
