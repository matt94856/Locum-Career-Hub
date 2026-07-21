import type { Metadata } from "next";
import { PortfolioToolPage } from "@/components/tools/PortfolioToolPage";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { PORTFOLIO_TOOL_BY_ID } from "@/lib/tools/portfolio-tools";

const definition = PORTFOLIO_TOOL_BY_ID.credentialing;

export const metadata: Metadata = {
  ...buildSerpMetadata({
    title: definition.name,
    description: definition.description,
    path: definition.path,
    keywords: definition.keywords,
  }),
  robots: { index: true, follow: true },
};

export default function CredentialingTimelinePage() {
  return <PortfolioToolPage definition={definition} />;
}
