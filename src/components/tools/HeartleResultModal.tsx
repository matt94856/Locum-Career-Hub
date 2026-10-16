"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  formatCountdown,
  heartleHeadline,
  heartleWinTitle,
  msUntilNextEasternMidnight,
  winPercent,
  type HeartleStats,
} from "@/lib/cardiology-wordle/stats";

const ARCADE_LINKS = [
  { href: "/", label: "Locum Career Hub" },
  { href: "/interventional-cardiology-locums-pay", label: "IC pay arcade" },
  { href: "/ep-cardiology-locums-pay", label: "EP pay arcade" },
  { href: "/non-invasive-cardiology-locums-pay", label: "Non-invasive pay arcade" },
] as const;

type Props = {
  open: boolean;
  status: "playing" | "won" | "lost";
  guesses: number;
  answer: string;
  gloss: string;
  copied: boolean;
  stats: HeartleStats;
  onClose: () => void;
  onShare: () => void;
  onShareLinkedIn: () => void;
  showLinkedIn: boolean;
  onArcadeClick: (href: string, label: string) => void;
};

export function HeartleResultModal({
  open,
  status,
  guesses,
  answer,
  gloss,
  copied,
  stats,
  onClose,
  onShare,
  onShareLinkedIn,
  showLinkedIn,
  onArcadeClick,
}: Props) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [remainMs, setRemainMs] = useState(() => msUntilNextEasternMidnight());

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = window.requestAnimationFrame(() => setShown(true));
      return () => window.cancelAnimationFrame(frame);
    }
    setShown(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setMounted(false), reduce ? 0 : 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setRemainMs(msUntilNextEasternMidnight());
    const tick = window.setInterval(() => setRemainMs(msUntilNextEasternMidnight()), 1000);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearInterval(tick);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || typeof document === "undefined") return null;

  const finished = status !== "playing";
  const won = status === "won";
  const title = !finished ? "Statistics" : won ? heartleWinTitle(guesses) : "Nice try";
  const headline = !finished ? "Your Heartle stats" : heartleHeadline(won, guesses);
  const maxBar = Math.max(1, ...stats.distribution);

  return createPortal(
    <div className={`heartle-hint-overlay ${shown ? "is-open" : ""}`} onClick={onClose} role="presentation">
      <div
        className="heartle-hint-sheet heartle-result-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="heartle-hint-handle" aria-hidden="true" />
        <div className="flex items-start justify-between gap-3 px-5 pt-2 sm:px-6 sm:pt-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-900">{title}</p>
            <p id={titleId} className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-[28px]">
              {headline}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {!finished
                ? "Finish today’s puzzle to unlock your share grid."
                : won
                  ? "Share the grid and dare a colleague to beat it."
                  : `Today’s word was ${answer}.`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 hover:border-slate-300 hover:text-slate-900"
            aria-label="Close results"
          >
            ×
          </button>
        </div>

        <div className="heartle-hint-list px-5 pb-5 sm:px-6">
          {finished ? (
            <>
              <p className="mt-1 font-mono text-lg font-extrabold tracking-[0.18em] text-slate-950">{answer}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{gloss}</p>
              <button type="button" className="heartle-share-btn" onClick={onShare}>
                {copied ? (
                  "Copied results to clipboard"
                ) : (
                  <>
                    Share
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                      <path d="M14 5.5a.75.75 0 0 1 .75.75v2.07c4.16.43 6.75 2.9 6.75 7.18 0 .41-.34.75-.75.75a.76.76 0 0 1-.68-.44c-1.18-2.5-3.17-3.29-5.32-3.47v2.16a.75.75 0 0 1-1.24.57l-6.5-5.25a.75.75 0 0 1 0-1.14l6.5-5.25A.75.75 0 0 1 14 5.5Z" />
                    </svg>
                  </>
                )}
              </button>
              {showLinkedIn ? (
                <button type="button" className="heartle-linkedin-btn" onClick={onShareLinkedIn}>
                  Share to LinkedIn
                </button>
              ) : null}
            </>
          ) : null}

          <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Statistics
          </p>
          <dl className="mt-3 grid grid-cols-4 gap-2 text-center">
            {[
              { label: "Played", value: String(stats.played) },
              { label: "Win %", value: String(winPercent(stats)) },
              { label: "Current streak", value: String(stats.currentStreak) },
              { label: "Max streak", value: String(stats.maxStreak) },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt>
                <dd className="mt-1 text-[36px] font-bold leading-none text-slate-950">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Guess distribution</p>
          <ul className="mt-3 space-y-1.5">
            {stats.distribution.map((count, index) => {
              const guess = index + 1;
              const today = won && guesses === guess;
              const width = `${Math.max(8, Math.round((count / maxBar) * 100))}%`;
              return (
                <li key={guess} className="flex items-center gap-2">
                  <span className="w-4 text-sm font-semibold text-slate-600">{guess}</span>
                  <span className={`heartle-dist-bar ${today ? "is-today" : ""}`} style={{ width }}>
                    {count}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Next Heartle</p>
              <p className="mt-1 font-mono text-lg font-semibold text-slate-950">{formatCountdown(remainMs)}</p>
            </div>
            <p className="max-w-[10rem] text-right text-xs leading-5 text-slate-500">
              New word at midnight Eastern
            </p>
          </div>

          <p className="mt-6 text-center text-xs font-semibold text-slate-500">See what locums actually pay</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {ARCADE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onArcadeClick(link.href, link.label)}
                className="min-h-10 rounded-xl px-3 py-2 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
