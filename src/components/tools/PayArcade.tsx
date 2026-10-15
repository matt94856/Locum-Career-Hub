"use client";

import { Press_Start_2P } from "next/font/google";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackDecisionToolEvent, trackViralShare } from "@/lib/analytics-events";
import { payArcadeRangeLabel, payArcadeSharePayload } from "@/lib/pay-arcade/share";
import type { PayArcadeEstimate, PayArcadeRound } from "@/lib/pay-arcade/types";
import { linkedInShareUrl, smsShareUrl } from "@/lib/share";
import { SITE } from "@/lib/site";
import "./ic-pay-arcade.css";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type Screen = "attract" | "play" | "compute" | "score";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PayArcade({
  toolId,
  specialty,
  effectiveDate,
  computeNote,
  matchLabel,
  jobsLabel,
  jobsHref,
  sharePath,
  rounds,
  estimateFor,
}: {
  toolId: string;
  specialty: string;
  effectiveDate: string;
  computeNote: string;
  matchLabel: string;
  jobsLabel: string;
  jobsHref: string;
  sharePath: string;
  rounds: PayArcadeRound[];
  estimateFor: (answers: Record<string, string>) => PayArcadeEstimate;
}) {
  const [screen, setScreen] = useState<Screen>("attract");
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<"post" | "link" | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const complete = rounds.every((item) => Boolean(answers[item.key]));
  const estimate = useMemo(() => (complete ? estimateFor(answers) : null), [answers, complete, estimateFor]);
  const share = estimate ? payArcadeSharePayload({ specialty, path: sharePath, estimate }) : null;
  const current = rounds[round];

  useEffect(() => {
    if (screen === "play" || screen === "score") headingRef.current?.focus();
  }, [screen, round]);

  useEffect(() => {
    if (screen !== "compute" || !estimate) return;
    trackDecisionToolEvent(toolId, "result", {
      daily_low: estimate.dailyLow,
      daily_high: estimate.dailyHigh,
      rank: estimate.rank,
    });
    const wait = prefersReducedMotion() ? 0 : 900;
    const timer = window.setTimeout(() => setScreen("score"), wait);
    return () => window.clearTimeout(timer);
  }, [screen, estimate, toolId]);

  function startGame() {
    if (!started.current) {
      started.current = true;
      trackDecisionToolEvent(toolId, "start");
    }
    setAnswers({});
    setRound(0);
    setScreen("play");
  }

  function pick(id: string) {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [current.key]: id }));
    trackDecisionToolEvent(toolId, "step_complete", { step: round + 1, step_name: current.key });
    const wait = prefersReducedMotion() ? 0 : 280;
    window.setTimeout(() => {
      if (round >= rounds.length - 1) {
        setScreen("compute");
        return;
      }
      setRound((value) => value + 1);
    }, wait);
  }

  async function ticketFile() {
    if (!share?.imagePath) return null;
    try {
      const response = await fetch(share.imagePath);
      if (!response.ok) return null;
      const blob = await response.blob();
      return new File([blob], "pay-arcade-ticket.png", { type: blob.type || "image/png" });
    } catch {
      return null;
    }
  }

  async function nativeShare() {
    if (!share) return;
    trackViralShare("native_share", toolId);
    const file = await ticketFile();
    if (file && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: share.title, text: share.text, url: share.url, files: [file] }).catch(() => undefined);
      return;
    }
    if (navigator.share) {
      await navigator.share({ title: share.title, text: share.text, url: share.url }).catch(() => undefined);
      return;
    }
    window.location.href = smsShareUrl(share.post);
  }

  function openLinkedIn() {
    if (!share) return;
    trackViralShare("linkedin", toolId);
    window.open(linkedInShareUrl(share.url), "_blank", "noopener,noreferrer");
  }

  function openMessages() {
    if (!share) return;
    trackViralShare("messages", toolId);
    void nativeShare();
  }

  async function copy() {
    if (!share) return;
    try {
      await navigator.clipboard.writeText(share.post);
      setCopied("post");
      trackViralShare("copy_linkedin_post", toolId);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  async function saveTicket() {
    const file = await ticketFile();
    if (!file) return;
    const href = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = href;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(href);
    trackViralShare("download_ticket", toolId);
  }

  return (
    <div className="ic-arcade">
      <div className="ic-arcade__lights" aria-hidden>
        <span /><span /><span /><span /><span /><span /><span />
      </div>
      <div className="px-4 pb-1 text-center sm:px-6">
        <p className={`${pixel.className} text-[10px] leading-5 text-[#ffe08a]`}>Locum Career Hub</p>
        <p className="mt-1 font-display text-3xl text-[#ffe08a] sm:text-4xl">Pay Arcade</p>
      </div>

      <div className="ic-arcade__bezel">
        <div className="ic-arcade__screen p-4 pb-24 sm:p-7 sm:pb-7">
          {screen === "attract" ? (
            <div className="ic-arcade__enter relative z-10 py-6 text-center sm:py-10">
              <p className={`${pixel.className} text-[10px] leading-6 text-[#f3d98a]`}>Player one</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#f6ecd4] sm:text-4xl">{specialty}</h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#e8d8b0] sm:text-base">
                Five quick rounds. We return a directional daily range from the mix hospitals actually pay for — not a
                posted salary.
              </p>
              <button type="button" className={`${pixel.className} ic-arcade__cta mt-8 px-6 text-[11px]`} onClick={startGame}>
                Press start
              </button>
            </div>
          ) : null}

          {screen === "play" ? (
            <div className="ic-arcade__enter relative z-10">
              <div className="flex items-center justify-between gap-3">
                <p className={`${pixel.className} text-[10px] leading-5 text-[#f3d98a]`}>
                  Round {round + 1}/{rounds.length}
                </p>
                <div className="flex gap-1.5" aria-hidden>
                  {rounds.map((item, index) => (
                    <span
                      key={item.key}
                      className={`h-2 w-6 rounded-full ${index <= round ? "bg-[#f3d98a]" : "bg-white/15"}`}
                    />
                  ))}
                </div>
              </div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-5 font-display text-2xl leading-tight text-[#f6ecd4] sm:text-3xl"
              >
                {current.title}
              </h2>
              <div className="mt-5 grid gap-2">
                {current.options.map((option) => {
                  const selected = answers[current.key] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => pick(option.id)}
                      className={`ic-arcade__option ${selected ? "is-on" : ""}`}
                    >
                      <span className="block text-sm font-semibold">{option.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-[#d8c7a0]">{option.hint}</span>
                    </button>
                  );
                })}
              </div>
              {round > 0 ? (
                <button type="button" className="ic-arcade__ghost mt-4 text-sm" onClick={() => setRound((value) => value - 1)}>
                  Previous round
                </button>
              ) : null}
            </div>
          ) : null}

          {screen === "compute" ? (
            <div className="ic-arcade__enter relative z-10 py-16 text-center" aria-live="polite">
              <p className={`${pixel.className} text-[11px] leading-6 text-[#f3d98a]`}>Reading your mix</p>
              <p className="mt-4 font-display text-2xl text-[#f6ecd4]">{computeNote}</p>
            </div>
          ) : null}

          {screen === "score" && estimate && share ? (
            <div className="ic-arcade__enter relative z-10">
              <p className={`${pixel.className} text-[10px] leading-5 text-[#f3d98a]`}>Final score</p>
              <div className="ic-arcade__ticket mt-4 px-4 py-5 sm:px-6 sm:py-6">
                <div className="flex items-start justify-between gap-3 border-b border-dashed border-amber-800/40 pb-3">
                  <p className={`${pixel.className} text-[9px] leading-4 text-amber-900`}>Pay ticket</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-900">{SITE.domain}</p>
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-800">Specialty</p>
                <h2 ref={headingRef} tabIndex={-1} className="mt-1 font-display text-2xl text-amber-950 sm:text-3xl">
                  {specialty}
                </h2>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-800">Pay expectation</p>
                <p className="mt-1 font-display text-3xl leading-none text-amber-950 sm:text-5xl" aria-live="polite">
                  {payArcadeRangeLabel(estimate)}
                </p>
                <p className="mt-2 text-sm font-semibold text-amber-900">a day · {estimate.rankLabel}</p>
                <p className="mt-4 text-sm leading-6 text-amber-950/80">{estimate.headline}</p>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <button type="button" className="ic-arcade__cta text-sm" onClick={openLinkedIn}>
                  Share on LinkedIn
                </button>
                <button type="button" className="ic-arcade__cta text-sm" onClick={() => void nativeShare()}>
                  Share via messages
                </button>
                <button type="button" className="ic-arcade__ghost text-sm" onClick={openMessages}>
                  Open Messages
                </button>
                <button type="button" className="ic-arcade__ghost text-sm" onClick={() => void copy()}>
                  {copied === "post" ? "Post copied" : "Copy post"}
                </button>
                <button type="button" className="ic-arcade__ghost text-sm" onClick={() => void saveTicket()}>
                  Save card
                </button>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#e8d8b0]">{estimate.summary}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#e8d8b0]">
                {estimate.why.slice(0, 3).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6 text-[#e8d8b0]">
                Your locums range should be somewhere between {payArcadeRangeLabel(estimate)} depending on the
                facility and volume.
              </p>
              <p className="mt-4 text-xs leading-5 text-[#cbb892]">
                Educational range, effective {effectiveDate}. Screenshot the ticket or share the score.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/physician-opportunities#lead-form" className="ic-arcade__cta inline-flex items-center text-sm">
                  {matchLabel}
                </Link>
                <Link href={jobsHref} className="ic-arcade__ghost inline-flex items-center text-sm">
                  {jobsLabel}
                </Link>
                <button type="button" className="ic-arcade__ghost text-sm" onClick={startGame}>
                  Play again
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
