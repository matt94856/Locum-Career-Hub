import type { Metadata } from "next";
import { CredentialingTimelineTool } from "@/components/tools/CredentialingTimelineTool";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Locum Credentialing Timeline | State Estimator",
  description:
    "Estimate medical license and hospital privileging timelines by state before your first cardiology locum block—educational, not legal advice.",
  path: "/tools/credentialing-timeline",
  keywords: ["cardiology locum credentialing", "physician licensing timeline", "hospital privileging cardiologist"],
});

export default function CredentialingTimelinePage() {
  return (
    <main className="pb-24 sm:pb-0">
      <CredentialingTimelineTool />
    </main>
  );
}
