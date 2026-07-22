"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics-events";
import { colleagueForwardBlurb } from "@/lib/share";

type Props = {
  shareUrl: string;
  hook: string;
  toolId?: string;
  /** Extra outreach / creator pitch */
  creatorPitch?: string;
};

export function DistributionStrip({
  shareUrl,
  hook,
  toolId = "resource",
  creatorPitch = "Happy to offer a free cardiology locums pay/fit walkthrough for your audience or fellowship cohort — no job-board spam.",
}: Props) {
  const [copied, setCopied] = useState<"colleague" | "creator" | null>(null);
  const colleague = colleagueForwardBlurb(shareUrl, hook);

  async function copy(text: string, kind: "colleague" | "creator") {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    trackEvent("viral_share", {
      method: kind === "colleague" ? "forward_colleague" : "creator_pitch",
      tool_id: toolId,
      page_path: window.location.pathname,
    });
    window.setTimeout(() => setCopied(null), 2000);
  }

  return (
    <section className="rounded-3xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6 print:hidden">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Force distribution</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-slate-950">Don’t wait for Google</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Forward to a cardiology colleague, or paste a short creator / fellowship outreach note. One personal share beats a month of thin pages.
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-900">Colleague forward</p>
            <button type="button" onClick={() => void copy(colleague, "colleague")} className="text-xs font-semibold text-brand-700 hover:underline">
              {copied === "colleague" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-600">{colleague}</pre>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-900">Creator / ACC / fellowship DM</p>
            <button type="button" onClick={() => void copy(creatorPitch, "creator")} className="text-xs font-semibold text-brand-700 hover:underline">
              {copied === "creator" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-600">{creatorPitch}</pre>
        </div>
      </div>
    </section>
  );
}
