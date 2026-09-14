"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics-events";
import { composeShareCopy, linkedInShareUrl, xShareUrl, type SharePayload } from "@/lib/share";
import { ShareLinkChip } from "@/components/share/ShareLinkChip";

type Props = {
  payload: SharePayload;
  linkedInPost?: string;
  className?: string;
};

export function ViralShareKit({ payload, linkedInPost, className = "" }: Props) {
  const [copied, setCopied] = useState<"link" | "post" | null>(null);
  const postBody = linkedInPost?.trim() ?? payload.text;
  const postWithLink = composeShareCopy(postBody, payload.url);

  async function copy(text: string, kind: "link" | "post") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      trackEvent("viral_share", {
        method: kind === "link" ? "copy_link" : "copy_linkedin_post",
        tool_id: payload.toolId ?? "unknown",
        page_path: window.location.pathname,
      });
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  async function nativeShare() {
    trackEvent("viral_share", {
      method: "native_share",
      tool_id: payload.toolId ?? "unknown",
      page_path: window.location.pathname,
    });
    if (navigator.share) {
      await navigator.share({ title: payload.title, text: payload.text, url: payload.url }).catch(() => undefined);
      return;
    }
    await copy(postWithLink, "link");
  }

  function openLinkedIn() {
    trackEvent("viral_share", {
      method: "linkedin",
      tool_id: payload.toolId ?? "unknown",
      page_path: window.location.pathname,
    });
    window.open(linkedInShareUrl(payload.url), "_blank", "noopener,noreferrer");
  }

  function openX() {
    trackEvent("viral_share", {
      method: "x",
      tool_id: payload.toolId ?? "unknown",
      page_path: window.location.pathname,
    });
    window.open(xShareUrl(payload.text, payload.url), "_blank", "noopener,noreferrer");
  }

  return (
    <div className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm print:hidden ${className}`}>
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 px-5 py-5 text-white sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">Ready to share</p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
          A short preview for LinkedIn, texts, and DMs. The link wraps on a phone instead of running off the screen.
        </p>
        {payload.headlineStat ? (
          <p className="mt-3 inline-flex max-w-full break-words rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-200">
            {payload.headlineStat}
          </p>
        ) : null}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openLinkedIn}
            className="min-h-11 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
          >
            Share on LinkedIn
          </button>
          <button
            type="button"
            onClick={() => void nativeShare()}
            className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
          >
            Share / copy
          </button>
          <button
            type="button"
            onClick={openX}
            className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
          >
            Post on X
          </button>
          <button
            type="button"
            onClick={() => void copy(payload.url, "link")}
            className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
          >
            {copied === "link" ? "Link copied" : "Copy short link"}
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Post preview</p>
            <button
              type="button"
              onClick={() => void copy(postWithLink, "post")}
              className="shrink-0 text-xs font-semibold text-brand-700 hover:underline"
            >
              {copied === "post" ? "Copied" : "Copy post"}
            </button>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-800">{postBody}</p>
          <div className="mt-3 max-w-full">
            <ShareLinkChip url={payload.url} />
          </div>
        </div>
      </div>
    </div>
  );
}
