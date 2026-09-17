"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NAV_LINKS, SITE, CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusables?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
      <div className="container-site grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-4 xl:gap-x-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 lg:max-w-none lg:shrink-0">
          <BrandLogo className="h-9 w-9 shrink-0" priority />
          <span className="min-w-0 font-display text-base font-normal tracking-tight text-slate-950 lg:whitespace-nowrap">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden min-h-0 min-w-0 flex-wrap items-center justify-center gap-x-0.5 gap-y-1 px-1 sm:px-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex xl:gap-x-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-2 py-2 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 xl:px-3 xl:text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 lg:col-start-3 lg:row-start-1">
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Button
              href="/contact"
              variant="ghost"
              size="sm"
              className="max-w-[10.5rem] truncate xl:max-w-none"
              title={CTA.recruiter}
            >
              {CTA.recruiter}
            </Button>
            <Button href="/physician-opportunities#lead-form" variant="primary" size="sm">
              {CTA.requestMatches}
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-sm lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        className={`border-t border-slate-100 bg-white lg:hidden ${open ? "block" : "hidden"}`}
        inert={open ? undefined : true}
        aria-hidden={!open}
      >
        <div className="container-site flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 grid grid-cols-1 gap-2">
            <Button href="/physician-opportunities#lead-form" className="w-full justify-center" size="md">
              {CTA.requestMatches}
            </Button>
            <Button href="/contact" variant="secondary" className="w-full justify-center" size="md">
              {CTA.recruiter}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
