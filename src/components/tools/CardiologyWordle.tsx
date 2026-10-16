"use client";

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
import {
  EMPTY_HEARTLE_STATS,
  HEARTLE_WIN_TITLES,
  heartleWinTitle,
  loadHeartleStats,
  recordHeartleResult,
} from "@/lib/cardiology-wordle/stats";
import { isAllowedGuess } from "@/lib/cardiology-wordle/words";
import { linkedInShareUrl, smsShareUrl } from "@/lib/share";
import { SITE } from "@/lib/site";
import { HeartleHelpSheet } from "./HeartleHelpSheet";
import { HeartleHintSheet } from "./HeartleHintSheet";
import { HeartleResultModal } from "./HeartleResultModal";
import "./cardiology-wordle.css";

const STORAGE_KEY = "lch-cardiology-wordle";
const KEYBOARD = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
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
  const [hintOpen, setHintOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [stats, setStats] = useState(EMPTY_HEARTLE_STATS);
  const started = useRef(false);
  const finished = useRef(false);
  const openedResultFor = useRef<string | null>(null);
  const currentRef = useRef("");
  const statusRef = useRef<Status>("playing");
  const revealTimer = useRef<number | undefined>(undefined);
  const flashTimer = useRef<number | undefined>(undefined);

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
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    setMessage(text);
    flashTimer.current = window.setTimeout(() => setMessage(""), 1600);
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
    setStats(loadHeartleStats());
    if (nextStatus !== "playing") finished.current = true;
  }, []);

  useEffect(() => {
    if (!puzzle || !showResult) return;
    setStats(
      recordHeartleResult({
        dateKey: puzzle.dateKey,
        won: status === "won",
        guesses: guesses.length,
      }),
    );
    if (openedResultFor.current === puzzle.dateKey) return;
    openedResultFor.current = puzzle.dateKey;
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    setMessage(status === "won" ? heartleWinTitle(guesses.length) : puzzle.word);
    const wait = prefersReducedMotion() ? 80 : 1100;
    const timer = window.setTimeout(() => {
      setResultOpen(true);
      setMessage("");
    }, wait);
    return () => window.clearTimeout(timer);
  }, [guesses.length, puzzle, showResult, status]);

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
      if (hintOpen || helpOpen || resultOpen) return;
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
  }, [addLetter, backspace, helpOpen, hintOpen, resultOpen, submit]);

  async function copyShare() {
    if (!shareText) return false;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "share", { method: "copy" });
      trackViralShare("copy", CARDIOLOGY_WORDLE_TOOL_ID);
      window.setTimeout(() => setCopied(false), 1800);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }

  async function shareLinkedIn() {
    await copyShare();
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
    const preferNative =
      typeof navigator.share === "function" &&
      (/\b(Mobile|Android|iPhone|iPad)\b/i.test(navigator.userAgent) ||
        window.matchMedia("(pointer: coarse)").matches);
    if (preferNative) {
      trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "share", { method: "native_share" });
      trackViralShare("native_share", CARDIOLOGY_WORDLE_TOOL_ID);
      try {
        await navigator.share({ title: "Heartle", text: shareText });
        return;
      } catch {
        // User cancelled the sheet; fall through to copy.
      }
    }
    await copyShare();
  }

  if (!puzzle) {
    return (
      <div className="heartle-board">
        <p className="p-6 text-sm text-slate-500">Loading today&apos;s Heartle…</p>
      </div>
    );
  }

  const emptyRows = Math.max(0, CARDIOLOGY_WORDLE_MAX_GUESSES - guesses.length - (status === "playing" ? 1 : 0));
  const currentRowActive = status === "playing" && guesses.length < CARDIOLOGY_WORDLE_MAX_GUESSES;
  const revealing = currentRowActive && guesses.length > 0 && revealCount < puzzle.length;

  return (
    <div className="heartle-board">
      <div className="heartle-topbar">
        <div className="heartle-topbar-side">
          <button type="button" className="heartle-icon-btn" onClick={() => setHelpOpen(true)} aria-label="How to play">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 21h6M10 17h4M12 3a6 6 0 0 0-3.4 10.9c.7.6 1.1 1.4 1.2 2.3h4.4c.1-.9.5-1.7 1.2-2.3A6 6 0 0 0 12 3Z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="heartle-icon-btn"
            aria-label="Need a hint"
            onClick={() => {
              setHintOpen(true);
              trackCtaClick("wordle_hint", `${CARDIOLOGY_WORDLE_PATH}#word-bank`);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M10.5 3a7.5 7.5 0 0 1 5.9 12.1l3.7 3.8-1.4 1.4-3.8-3.7A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
            </svg>
          </button>
        </div>
        <div className="heartle-topbar-title">
          <p className="heartle-brand">Heartle</p>
          <p className="heartle-sub">
            {puzzle.category} · #{puzzle.puzzleNumber}
          </p>
        </div>
        <div className="heartle-topbar-side is-end">
          <button
            type="button"
            className="heartle-icon-btn"
            aria-label="Statistics"
            onClick={() => {
              setStats(loadHeartleStats());
              setResultOpen(true);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <rect x="4" y="13" width="3.2" height="7" rx="0.6" />
              <rect x="10.4" y="8" width="3.2" height="12" rx="0.6" />
              <rect x="16.8" y="4" width="3.2" height="16" rx="0.6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="heartle-play">
        <p className="heartle-status" role="status" aria-live="polite">
          {message ? (
            <span
              className={
                HEARTLE_WIN_TITLES.includes(message as (typeof HEARTLE_WIN_TITLES)[number]) || message === puzzle.word
                  ? "heartle-toast"
                  : "text-sm font-semibold text-slate-800"
              }
            >
              {message}
            </span>
          ) : null}
        </p>

        <div className="heartle-grid-wrap">
        <div
          className="heartle-grid"
          role="grid"
          aria-label="Heartle board"
          style={{ ["--heartle-cols" as string]: String(puzzle.length) }}
        >
          {rows.map((row, rowIndex) => {
            const isLast = rowIndex === rows.length - 1;
            const shown = !isLast || revealCount >= puzzle.length ? puzzle.length : revealCount;
            return (
              <div key={`${row.guess}-${rowIndex}`} className="heartle-row" role="row">
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
            <div className={`heartle-row ${shake ? "is-shake" : ""}`} role="row">
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
            <div key={`empty-${rowIndex}`} className="heartle-row" role="row">
              {Array.from({ length: puzzle.length }, (_, index) => (
                <span key={`empty-${rowIndex}-${index}`} role="gridcell" className="heartle-tile" />
              ))}
            </div>
          ))}
        </div>
        </div>

        {showResult && !resultOpen ? (
          <div className="heartle-inline-share mx-auto w-full max-w-md px-4">
            <button type="button" className="heartle-share-btn" onClick={() => setResultOpen(true)}>
              {copied ? "Copied results to clipboard" : "Share"}
            </button>
          </div>
        ) : null}

        <div className="heartle-keyboard" aria-label="Keyboard">
          {KEYBOARD.map((row) => (
            <div key={row.join("")} className="heartle-key-row">
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
      <HeartleHelpSheet open={helpOpen} onClose={() => setHelpOpen(false)} />
      <HeartleHintSheet
        open={hintOpen}
        length={puzzle.length}
        guessed={guesses}
        canFill={status === "playing"}
        onClose={() => setHintOpen(false)}
        onPick={(word) => {
          if (guesses.includes(word)) {
            flash("Already guessed");
            return;
          }
          setCurrent(word);
          setHintOpen(false);
          flash("Press Enter to guess");
        }}
      />
      <HeartleResultModal
        open={resultOpen}
        status={status}
        guesses={guesses.length}
        answer={puzzle.word}
        gloss={puzzle.gloss}
        shareText={shareText}
        copied={copied}
        stats={stats}
        onClose={() => setResultOpen(false)}
        onShare={() => void shareNative()}
        onShareLinkedIn={() => void shareLinkedIn()}
        onShareSms={shareSms}
        onArcadeClick={(href, label) => {
          trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "related_tool_click", { link_url: href });
          trackCtaClick(`wordle_${label}`, href);
        }}
      />
    </div>
  );
}
