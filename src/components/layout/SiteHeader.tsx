"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NAV_LINKS, SITE, CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 lg:shrink-0">
          <BrandLogo className="h-9 w-9 shrink-0" />
          <span className="min-w-0 font-display text-base font-semibold tracking-tight text-slate-950 lg:whitespace-nowrap">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 px-2 xl:gap-1 lg:flex">
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

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button href="/contact" variant="ghost" size="sm">
            {CTA.recruiter}
          </Button>
          <Button href="/physician-opportunities" variant="primary" size="sm">
            {CTA.explore}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
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

      {open ? (
        <div id="mobile-nav" className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-1 gap-2">
              <Button href="/physician-opportunities" className="w-full justify-center" size="md">
                {CTA.explore}
              </Button>
              <Button href="/contact" variant="secondary" className="w-full justify-center" size="md">
                {CTA.recruiter}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
