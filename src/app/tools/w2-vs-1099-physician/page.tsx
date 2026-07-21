import type { Metadata } from "next";
import { PortfolioToolPage } from "@/components/tools/PortfolioToolPage";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { PORTFOLIO_TOOL_BY_ID } from "@/lib/tools/portfolio-tools";

const definition = PORTFOLIO_TOOL_BY_ID["w2-1099"];

export const metadata: Metadata = {
  ...buildSerpMetadata({
    title: definition.name,
    description: definition.description,
    path: definition.path,
    keywords: definition.keywords,
  }),
  robots: { index: false, follow: true },
};

export default function W2Vs1099Page() {
  return <PortfolioToolPage definition={definition} />;
}
