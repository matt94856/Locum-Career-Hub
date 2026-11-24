import Link from "next/link";
import { AI_CONTENT_LAST_VERIFIED } from "@/lib/ai-seo/catalog";

type Props = {
  lastVerified?: string;
  sources?: string;
  className?: string;
};

const DEFAULT_SOURCES =
  "Directional locums pay bands are Locum Career Hub educational benchmarks, not offers. IMLC is an expedited path to separate state licenses (IMLC.org). Community PCI without on-site surgery follows SCAI non-SOS context, not invented hospital lists.";

export function ContentProvenance({
  lastVerified = AI_CONTENT_LAST_VERIFIED,
  sources = DEFAULT_SOURCES,
  className = "",
}: Props) {
  return (
    <p className={`text-xs leading-5 text-slate-500 ${className}`.trim()}>
      Last verified {lastVerified}. {sources}{" "}
      <Link className="font-semibold text-brand-700 hover:underline" href="/editorial-policy">
        Editorial policy
      </Link>
      .
    </p>
  );
}
