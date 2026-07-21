import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioToolPage } from "@/components/tools/PortfolioToolPage";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { DYNAMIC_PORTFOLIO_TOOL_SLUGS, PORTFOLIO_TOOL_BY_SLUG } from "@/lib/tools/portfolio-tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return DYNAMIC_PORTFOLIO_TOOL_SLUGS.map((portfolioTool) => ({ portfolioTool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ portfolioTool: string }>;
}): Promise<Metadata> {
  const { portfolioTool } = await params;
  const definition = PORTFOLIO_TOOL_BY_SLUG[portfolioTool];
  if (!definition) return {};
  const metadata = buildSerpMetadata({
    title: definition.name,
    description: definition.description,
    path: definition.path,
    keywords: definition.keywords,
  });
  return {
    ...metadata,
    robots: definition.risk === "expert-review" ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function DynamicPortfolioToolPage({
  params,
}: {
  params: Promise<{ portfolioTool: string }>;
}) {
  const { portfolioTool } = await params;
  const definition = PORTFOLIO_TOOL_BY_SLUG[portfolioTool];
  if (!definition) notFound();
  return <PortfolioToolPage definition={definition} />;
}
