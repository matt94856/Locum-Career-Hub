"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-slate-100 rounded-3xl border border-slate-100 bg-white shadow-sm">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={item.q} className="p-2">
            <button
              type="button"
              onClick={() => setOpen(idx)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-4 text-left hover:bg-slate-50"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-slate-950">{item.q}</span>
              <span className="text-brand-700">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{item.a}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
