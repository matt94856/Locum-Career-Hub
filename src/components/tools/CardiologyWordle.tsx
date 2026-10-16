"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackCtaClick, trackDecisionToolEvent, trackViralShare } from "@/lib/analytics-events";
import {
  CARDIOLOGY_WORDLE_MAX_GUESSES,
  CARDIOLOGY_WORDLE_PATH,
  CARDIOLOGY_WORDLE_TOOL_ID,
  getDailyPuzzle,
  type DailyPuzzle,
} from "@/lib/cardiology-wordle/daily";
import {
  bestLetterColors,
  scoreGuess,
  shareResult,
  type TileColor,
} from "@/lib/cardiology-wordle/engine";
import { isAllowedGuess } from "@/lib/cardiology-wordle/words";
import { linkedInShareUrl, smsShareUrl } from "@/lib/share";
import { SITE } from "@/lib/site";
import "./cardiology-wordle.css";

const STORAGE_KEY = "lch-cardiology-wordle";
const KEYBOARD = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
] as const;

const ARCADE_LINKS = [
  { href: "/", label: "Locum Career Hub" },
  { href: "/interventional-cardiology-locums-pay", label: "IC pay arcade" },
  { href: "/ep-cardiology-locums-pay", label: "EP pay arcade" },
  { href: "/non-invasive-cardiology-locums-pay", label: "Non-invasive pay arcade" },
] as const;

type Status = "playing" | "won" | "lost";

type Persisted = {
  dateKey: string;
  guesses: string[];
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function loadGuesses(dateKey: string) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as Persisted;
    if (data.dateKey !== dateKey || !Array.isArray(data.guesses)) return [];
    return data.guesses.filter((guess) => typeof guess === "string" && /^[A-Z]+$/.test(guess));
  } catch {
    return [];
  }
}

function saveGuesses(dateKey: string, guesses: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ dateKey, guesses } satisfies Persisted));
  } catch {
    // Private mode can block storage; the board still works for this visit.
  }
}

function statusFromGuesses(guesses: string[], answer: string): Status {
  if (guesses.some((guess) => guess === answer)) return "won";
  if (guesses.length >= CARDIOLOGY_WORDLE_MAX_GUESSES) return "lost";
  return "playing";
}

function tileClass(color?: TileColor, filled?: boolean, flipping?: boolean) {
  const classes = ["heartle-tile"];
  if (color) classes.push(`is-${color}`);
  else if (filled) classes.push("is-filled");
  if (flipping) classes.push("is-flip");
  return classes.join(" ");
}

export function CardiologyWordle() {
  const [puzzle, setPuzzle] = useState<DailyPuzzle | null>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState<Status>("playing");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [revealCount, setRevealCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const started = useRef(false);
  const finished = useRef(false);
  const currentRef = useRef("");
  const statusRef = useRef<Status>("playing");
  const revealTimer = useRef<number | undefined>(undefined);

  currentRef.current = current;
  statusRef.current = status;

  const rows = useMemo(() => {
    if (!puzzle) return [];
    return guesses.map((guess) => ({ guess, colors: scoreGuess(guess, puzzle.word) }));
  }, [guesses, puzzle]);

  const letterColors = useMemo(() => bestLetterColors(rows), [rows]);
  const pageUrl = `${SITE.url}${CARDIOLOGY_WORDLE_PATH}`;
  const shareText = puzzle
    ? shareResult({
        puzzleNumber: puzzle.puzzleNumber,
        guesses: guesses.length,
        maxGuesses: CARDIOLOGY_WORDLE_MAX_GUESSES,
        won: status === "won",
        rows: rows.map((row) => row.colors),
        url: pageUrl,
      })
    : "";

  const showResult = status !== "playing" && revealCount >= (puzzle?.length ?? 0);

  const flash = useCallback((text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 1600);
  }, []);

  const finishIfNeeded = useCallback((nextGuesses: string[], answer: string, length: number) => {
    const next = statusFromGuesses(nextGuesses, answer);
    if (next === "playing" || finished.current) return;
    finished.current = true;
    const wait = prefersReducedMotion() ? 0 : length * 280 + 80;
    window.setTimeout(() => {
      setStatus(next);
      trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "result", {
        outcome: next,
        guesses: nextGuesses.length,
      });
    }, wait);
  }, []);

  useEffect(() => {
    document.body.dataset.heartle = "1";
    return () => {
      delete document.body.dataset.heartle;
    };
  }, []);

  useEffect(() => {
    const daily = getDailyPuzzle();
    const saved = loadGuesses(daily.dateKey).filter((guess) => guess.length === daily.length);
    setPuzzle(daily);
    setGuesses(saved);
    const nextStatus = statusFromGuesses(saved, daily.word);
    setStatus(nextStatus);
    setRevealCount(daily.length);
    if (nextStatus !== "playing") finished.current = true;
  }, []);

  useEffect(() => {
    return () => {
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
    };
  }, []);

  const revealRow = useCallback((length: number) => {
    if (prefersReducedMotion()) {
      setRevealCount(length);
      return;
    }
    setRevealCount(0);
    let step = 0;
    const tick = () => {
      step += 1;
      setRevealCount(step);
      if (step < length) {
        revealTimer.current = window.setTimeout(tick, 280);
      }
    };
    revealTimer.current = window.setTimeout(tick, 40);
  }, []);

  const submit = useCallback(() => {
    if (!puzzle || statusRef.current !== "playing") return;
    const guess = currentRef.current.toUpperCase();
    if (guess.length !== puzzle.length) {
      setShake(true);
      flash("Not enough letters");
      window.setTimeout(() => setShake(false), 450);
      return;
    }
    if (!isAllowedGuess(guess, puzzle.length)) {
      setShake(true);
      flash("Not in word list");
      window.setTimeout(() => setShake(false), 450);
      return;
    }
    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);
    setCurrent("");
    saveGuesses(puzzle.dateKey, nextGuesses);
    revealRow(puzzle.length);
    trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "step_complete", {
      step: nextGuesses.length,
    });
    finishIfNeeded(nextGuesses, puzzle.word, puzzle.length);
  }, [finishIfNeeded, flash, guesses, puzzle, revealRow]);

  const addLetter = useCallback(
    (letter: string) => {
      if (!puzzle || statusRef.current !== "playing") return;
      if (revealCount < puzzle.length && guesses.length > 0) return;
      if (!started.current) {
        started.current = true;
        trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "start");
      }
      setCurrent((value) => (value.length < puzzle.length ? `${value}${letter}` : value));
    },
    [guesses.length, puzzle, revealCount],
  );

  const backspace = useCallback(() => {
    if (!puzzle || statusRef.current !== "playing") return;
    if (revealCount < puzzle.length && guesses.length > 0) return;
    setCurrent((value) => value.slice(0, -1));
  }, [guesses.length, puzzle, revealCount]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        submit();
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        backspace();
        return;
      }
      if (/^[a-zA-Z]$/.test(event.key)) {
        event.preventDefault();
        addLetter(event.key.toUpperCase());
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [addLetter, backspace, submit]);

  async function copyShare() {
    if (!shareText) return;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "share", { method: "copy" });
      trackViralShare("copy", CARDIOLOGY_WORDLE_TOOL_ID);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function shareLinkedIn() {
    trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "share", { method: "linkedin" });
    trackViralShare("linkedin", CARDIOLOGY_WORDLE_TOOL_ID);
    window.open(linkedInShareUrl(pageUrl), "_blank", "noopener,noreferrer");
  }

  function shareSms() {
    trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "share", { method: "sms" });
    trackViralShare("sms", CARDIOLOGY_WORDLE_TOOL_ID);
    window.location.href = smsShareUrl(shareText);
  }

  async function shareNative() {
    trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "share", { method: "native_share" });
    trackViralShare("native_share", CARDIOLOGY_WORDLE_TOOL_ID);
    if (navigator.share) {
      await navigator.share({ title: "Cardiology Wordle", text: shareText, url: pageUrl }).catch(() => undefined);
      return;
    }
    await copyShare();
  }

  if (!puzzle) {
    return (
      <div className="heartle-board rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Loading today&apos;s Heartle…</p>
      </div>
    );
  }

  const emptyRows = Math.max(0, CARDIOLOGY_WORDLE_MAX_GUESSES - guesses.length - (status === "playing" ? 1 : 0));
  const currentRowActive = status === "playing" && guesses.length < CARDIOLOGY_WORDLE_MAX_GUESSES;
  const revealing = currentRowActive && guesses.length > 0 && revealCount < puzzle.length;

  return (
    <div className="heartle-board overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">
      <div className="border-b border-rose-100 bg-gradient-to-br from-rose-50 via-white to-slate-50 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-700">Heartle</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Cardiology Wordle #{puzzle.puzzleNumber}
            </p>
          </div>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-800">
            {puzzle.category}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {puzzle.length} letters · six guesses · new word at midnight Eastern
        </p>
      </div>

      <div className="px-4 py-6 sm:px-6">
        <p className="mb-4 min-h-6 text-center text-sm font-semibold text-slate-800" role="status" aria-live="polite">
          {message}
        </p>

        <div
          className="mx-auto grid justify-items-center gap-1.5"
          role="grid"
          aria-label="Cardiology Wordle board"
          style={{ ["--heartle-tile" as string]: puzzle.length === 6 ? "2.7rem" : "3.25rem" }}
        >
          {rows.map((row, rowIndex) => {
            const isLast = rowIndex === rows.length - 1;
            const shown = !isLast || revealCount >= puzzle.length ? puzzle.length : revealCount;
            return (
              <div key={`${row.guess}-${rowIndex}`} className="flex gap-1.5" role="row">
                {row.guess.split("").map((letter, index) => (
                  <span
                    key={`${row.guess}-${index}`}
                    role="gridcell"
                    className={tileClass(
                      index < shown ? row.colors[index] : undefined,
                      true,
                      isLast && index === revealCount - 1,
                    )}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            );
          })}

          {currentRowActive ? (
            <div className={`flex gap-1.5 ${shake ? "heartle-row is-shake" : ""}`} role="row">
              {Array.from({ length: puzzle.length }, (_, index) => (
                <span
                  key={`current-${index}`}
                  role="gridcell"
                  className={tileClass(undefined, Boolean(current[index]))}
                >
                  {current[index] ?? ""}
                </span>
              ))}
            </div>
          ) : null}

          {Array.from({ length: emptyRows }, (_, rowIndex) => (
            <div key={`empty-${rowIndex}`} className="flex gap-1.5" role="row">
              {Array.from({ length: puzzle.length }, (_, index) => (
                <span key={`empty-${rowIndex}-${index}`} role="gridcell" className="heartle-tile" />
              ))}
            </div>
          ))}
        </div>

        {showResult ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
              {status === "won" ? "Solved" : "Out of guesses"}
            </p>
            <p className="mt-2 font-display text-3xl text-slate-950">{puzzle.word}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{puzzle.gloss}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void copyShare()}
                className="min-h-11 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                {copied ? "Copied" : "Copy result"}
              </button>
              <button
                type="button"
                onClick={shareLinkedIn}
                className="min-h-11 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
              >
                LinkedIn
              </button>
              <button
                type="button"
                onClick={shareSms}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
              >
                Messages
              </button>
              <button
                type="button"
                onClick={() => void shareNative()}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
              >
                Share
              </button>
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-900">See what locums actually pay</p>
            <div className="mt-3 flex flex-col gap-2">
              {ARCADE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "related_tool_click", {
                      link_url: link.href,
                    });
                    trackCtaClick(`wordle_${link.label}`, link.href);
                  }}
                  className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-6 flex max-w-lg flex-col gap-1.5 pb-20 sm:pb-0" aria-label="Keyboard">
          {KEYBOARD.map((row) => (
            <div key={row.join("")} className="flex justify-center gap-1">
              {row.map((key) => {
                const color = key.length === 1 ? letterColors[key] : undefined;
                const wide = key === "ENTER" || key === "BACK";
                return (
                  <button
                    key={key}
                    type="button"
                    className={`heartle-key ${wide ? "is-wide" : ""} ${color ? `is-${color}` : ""}`}
                    disabled={status !== "playing" || revealing}
                    onClick={() => {
                      if (key === "ENTER") submit();
                      else if (key === "BACK") backspace();
                      else addLetter(key);
                    }}
                  >
                    {key === "BACK" ? "⌫" : key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
