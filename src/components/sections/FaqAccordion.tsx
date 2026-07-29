"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-w-0 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        const panelId = `faq-panel-${idx}`;
        const buttonId = `faq-button-${idx}`;
        return (
          <div key={item.q} className="p-1 sm:p-2">
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full min-w-0 items-start justify-between gap-4 rounded-xl px-3 py-3.5 text-left transition hover:bg-slate-50 sm:px-4 sm:py-4"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-950 [overflow-wrap:anywhere]">
                {item.q}
              </span>
              <span className="mt-0.5 shrink-0 text-base font-semibold tabular-nums text-brand-700" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={isOpen ? "px-3 pb-3 text-sm leading-relaxed text-slate-600 sm:px-4 sm:pb-4" : undefined}
            >
              {isOpen ? item.a : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
