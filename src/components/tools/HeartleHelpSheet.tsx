"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function HeartleHelpSheet({ open, onClose }: Props) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

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
    return () => {
      document.body.style.overflow = previousOverflow;
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

  return createPortal(
    <div className={`heartle-hint-overlay ${shown ? "is-open" : ""}`} onClick={onClose} role="presentation">
      <div
        className="heartle-hint-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="heartle-hint-handle" aria-hidden="true" />
        <div className="flex items-start justify-between gap-3 px-5 pt-2 sm:px-6 sm:pt-1">
          <div>
            <p id={titleId} className="text-xl font-bold uppercase tracking-wide text-slate-950">
              How to play
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="heartle-icon-btn"
            aria-label="Close how to play"
          >
            ×
          </button>
        </div>

        <div className="heartle-hint-list space-y-5 px-5 pb-6 text-sm leading-6 text-slate-600 sm:px-6">
          <p>
            Guess a cardiology term in six tries. Length matches today&apos;s word. The answer is always a real heart
            term — not a random dictionary word.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="heartle-help-swatch is-green" aria-hidden="true">
                A
              </span>
              <span>Green is the right letter in the right spot.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="heartle-help-swatch is-yellow" aria-hidden="true">
                O
              </span>
              <span>Yellow is the right letter, wrong spot.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="heartle-help-swatch is-gray" aria-hidden="true">
                X
              </span>
              <span>Gray is not in the word. Duplicate letters score the Wordle way.</span>
            </li>
          </ul>
          <p>
            A category chip shows before you guess so a 4-letter day like TAVR and a 6-letter day like NSTEMI still feel
            fair. A new word lands every midnight Eastern.
          </p>
          <p>
            Stuck? Open the hint list, search the word bank, and tap a word to fill the board. After you finish, share
            the emoji grid and dare a colleague to beat it.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
