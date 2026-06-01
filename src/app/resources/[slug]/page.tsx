import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardiologyAuthorityPageView } from "@/components/marketing/CardiologyAuthorityPageView";
import { getAllArticleSlugs, getCardiologyArticle } from "@/lib/cardiology-authority/articles";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getCardiologyArticle(slug);
  if (!article) return {};
  return buildSerpMetadata({
    title: article.title,
    description: article.metaDescription,
    path: article.path,
    keywords: article.keywords,
  });
}

export default async function ResourceArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getCardiologyArticle(slug);
  if (!article) notFound();
  return <CardiologyAuthorityPageView article={article} />;
}
