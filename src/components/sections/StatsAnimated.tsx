"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Stat({
  label,
  value,
  suffix,
  detail,
  reduceMotion,
}: {
  label: string;
  value: number;
  suffix: string;
  detail: string;
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <div ref={ref} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{label}</p>
      <div className="mt-3 flex items-end gap-1">
        <p className="font-display text-4xl font-semibold tracking-tight text-slate-950">{Math.round(display)}</p>
        <p className="pb-1 text-lg font-semibold text-brand-800">{suffix}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{detail}</p>
    </div>
  );
}

export function StatsAnimated() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Impact"
          title="A modern recruiting experience physicians actually respond to"
          subtitle="Numbers are directional and vary by market—but the goal is consistent: fewer surprises, faster clarity, and schedules that respect your life outside the hospital."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Stat
            label="Avg. recruiter response"
            value={24}
            suffix="hrs*"
            detail="For complete inquiries during business days."
            reduceMotion={reduceMotion}
          />
          <Stat
            label="Physician satisfaction"
            value={96}
            suffix="%*"
            detail="Based on post-placement feedback surveys."
            reduceMotion={reduceMotion}
          />
          <Stat
            label="Markets actively staffed"
            value={42}
            suffix="+"
            detail="Nationwide footprint across inpatient and procedural models."
            reduceMotion={reduceMotion}
          />
        </div>

        <p className="mt-4 text-xs text-slate-500">
          *Illustrative metrics for marketing purposes; not a guarantee of timing or outcomes. Ask your recruiter for
          current market conditions.
        </p>
      </div>
    </section>
  );
}
