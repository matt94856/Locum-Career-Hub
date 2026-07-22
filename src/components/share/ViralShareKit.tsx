"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics-events";
import {
  linkedInShareUrl,
  xShareUrl,
  type SharePayload,
} from "@/lib/share";

type Props = {
  payload: SharePayload;
  linkedInPost?: string;
  /** Extra class on the outer wrapper */
  className?: string;
};

export function ViralShareKit({ payload, linkedInPost, className = "" }: Props) {
  const [copied, setCopied] = useState<"link" | "post" | null>(null);

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
    await copy(`${payload.text}\n${payload.url}`, "link");
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
    <div className={`rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 print:hidden ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Share this result</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Numbers stay visible — screenshot the card above, or post with a LinkedIn preview that includes your range.
          </p>
        </div>
        {payload.headlineStat ? (
          <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white">{payload.headlineStat}</span>
        ) : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={openLinkedIn}
          className="rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
        >
          Share on LinkedIn
        </button>
        <button
          type="button"
          onClick={() => void nativeShare()}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
        >
          Share / copy
        </button>
        <button
          type="button"
          onClick={openX}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
        >
          Post on X
        </button>
        <button
          type="button"
          onClick={() => void copy(payload.url, "link")}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
        >
          {copied === "link" ? "Link copied" : "Copy share link"}
        </button>
      </div>
      {linkedInPost ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Ready-to-post LinkedIn copy</p>
            <button
              type="button"
              onClick={() => void copy(linkedInPost, "post")}
              className="text-xs font-semibold text-brand-700 hover:underline"
            >
              {copied === "post" ? "Copied" : "Copy post"}
            </button>
          </div>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">{linkedInPost}</pre>
        </div>
      ) : null}
    </div>
  );
}
