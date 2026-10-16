"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { guessBankForLength, searchGuessBank } from "@/lib/cardiology-wordle/words";

type Props = {
  open: boolean;
  length: number;
  guessed: readonly string[];
  canFill: boolean;
  onClose: () => void;
  onPick: (word: string) => void;
};

export function HeartleHintSheet({ open, length, guessed, canFill, onClose, onPick }: Props) {
  const titleId = useId();
  const searchId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const guessedSet = useMemo(() => new Set(guessed), [guessed]);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  const bank = useMemo(() => guessBankForLength(length), [length]);
  const results = useMemo(() => searchGuessBank(bank, query), [bank, query]);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setQuery("");
      const frame = window.requestAnimationFrame(() => setShown(true));
      return () => window.cancelAnimationFrame(frame);
    }
    setShown(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setMounted(false), reduce ? 0 : 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open || !shown) return;
    searchRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, shown]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || typeof document === "undefined") return null;

  function pick(word: string) {
    if (!canFill) {
      onClose();
      return;
    }
    onPick(word);
  }

  function onSearchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const first = results.find((entry) => !guessedSet.has(entry.word));
    if (first) pick(first.word);
  }

  return createPortal(
    <div
      className={`heartle-hint-overlay ${shown ? "is-open" : ""}`}
      onClick={onClose}
      role="presentation"
    >
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
            <p id={titleId} className="font-display text-xl font-semibold text-slate-950 sm:text-2xl">
              Word bank
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {length}-letter guesses only. Search, then tap a word to fill the board.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 hover:border-slate-300 hover:text-slate-900"
            aria-label="Close word bank"
          >
            ×
          </button>
        </div>

        <div className="sticky top-0 z-10 border-b border-slate-100 bg-white px-5 py-3 sm:px-6">
          <label htmlFor={searchId} className="sr-only">
            Search the word bank
          </label>
          <input
            ref={searchRef}
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onSearchKey}
            placeholder="Search words"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none ring-rose-200 placeholder:text-slate-400 focus:border-rose-300 focus:bg-white focus:ring-4"
          />
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {results.length} {results.length === 1 ? "word" : "words"}
          </p>
        </div>

        <ul className="heartle-hint-list" role="listbox" aria-label={`${length}-letter cardiology words`}>
          {results.length === 0 ? (
            <li className="px-5 py-10 text-center text-sm text-slate-500 sm:px-6">
              No words match “{query.trim()}”.
            </li>
          ) : (
            results.map((entry) => {
              const used = guessedSet.has(entry.word);
              return (
                <li key={entry.word}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={used}
                    disabled={used}
                    onClick={() => pick(entry.word)}
                    className={`heartle-hint-word ${used ? "is-used" : ""}`}
                  >
                    <span className="heartle-hint-term">{entry.word}</span>
                    {entry.gloss ? <span className="heartle-hint-gloss">{entry.gloss}</span> : null}
                    {used ? <span className="heartle-hint-used">Guessed</span> : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
