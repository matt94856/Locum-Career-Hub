"use client";

import { DistributionStrip } from "@/components/share/DistributionStrip";
import { ViralShareKit } from "@/components/share/ViralShareKit";
import { buildResultShareLandingUrl } from "@/lib/share";
import { SITE } from "@/lib/site";

export function ResourceViralKit({
  title,
  path,
  hook,
  toolId,
}: {
  title: string;
  path: string;
  hook: string;
  toolId: string;
}) {
  const shareUrl = buildResultShareLandingUrl({
    kind: "guide",
    title,
    stat: "Cardiology guide",
    subtitle: hook,
    path,
  });

  return (
    <div className="space-y-6">
      <ViralShareKit
        payload={{
          title,
          text: hook,
          url: shareUrl,
          toolId,
        }}
        linkedInPost={[title, "", hook, "", `${SITE.url}${path}`].join("\n")}
      />
      <DistributionStrip
        shareUrl={shareUrl}
        hook={hook}
        toolId={toolId}
        creatorPitch={`Hi — sharing a cardiologist-focused locums resource that may help your audience: ${title}. ${SITE.url}${path}`}
      />
    </div>
  );
}
