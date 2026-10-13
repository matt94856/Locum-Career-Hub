"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CALL_PAY_BANDS,
  compareCallPay,
  type CallPaySpecialty,
  type StructureSnapshot,
} from "@/lib/call-pay/model";

const HOUR_PRESETS = [
  { hours: 2, label: "Quiet night" },
  { hours: 4, label: "Only the included 4" },
  { hours: 6, label: "Six hours" },
  { hours: 9, label: "Busy, 9 hours" },
  { hours: 12, label: "Very busy" },
] as const;

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function range(low: number, high: number) {
  return `${money(low)}–${money(high)}`;
}

function StructureCard({
  snapshot,
  winner,
}: {
  snapshot: StructureSnapshot;
  winner: boolean;
}) {
  return (
    <article className={`rounded-3xl border p-5 sm:p-6 ${winner ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{winner ? "Pays more at these hours" : "The other quote"}</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-slate-950">{snapshot.name}</h3>
      <p className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950">{range(snapshot.low.total, snapshot.high.total)}</p>
      <p className="mt-1 text-sm text-slate-600">Total for this 24-hour day, low end to high end.</p>
      <dl className="mt-5 space-y-2 text-sm text-slate-700">
        <div className="flex justify-between gap-4">
          <dt>Daily rate</dt>
          <dd className="font-semibold text-slate-950">{range(snapshot.low.dailyRate, snapshot.high.dailyRate)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Hours already included (gratis)</dt>
          <dd className="font-semibold text-slate-950">{snapshot.includedHours}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Callback hours</dt>
          <dd className="font-semibold text-slate-950">{snapshot.low.callbackHours}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Callback added</dt>
          <dd className="font-semibold text-slate-950">{range(snapshot.low.callbackPay, snapshot.high.callbackPay)}</dd>
        </div>
      </dl>
    </article>
  );
}

export function CallPayStructureTool() {
  const [specialty, setSpecialty] = useState<CallPaySpecialty>("interventional");
  const [hours, setHours] = useState(9);
  const band = CALL_PAY_BANDS[specialty];
  const comparison = useMemo(() => compareCallPay(specialty, hours), [specialty, hours]);
  const flexibleWins = comparison.winnerAtLowEnd === "included-4";

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-sm font-semibold text-slate-950">Which assignment is this?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(["interventional", "general"] as const).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={specialty === id}
              onClick={() => setSpecialty(id)}
              className={`min-h-16 rounded-2xl border px-4 py-3 text-left text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                specialty === id ? "border-brand-500 bg-brand-50 text-brand-950" : "border-slate-200 bg-white text-slate-800 hover:border-brand-200"
              }`}
            >
              {CALL_PAY_BANDS[id].label}
              <span className="mt-1 block font-normal text-slate-600">
                0–4 hour call rate {range(CALL_PAY_BANDS[id].flexibleDailyLow, CALL_PAY_BANDS[id].flexibleDailyHigh)}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <label htmlFor="hours-worked" className="text-sm font-semibold text-slate-950">
            Hours you actually work on that 24-hour call day
          </label>
          <p className="font-display text-3xl font-semibold text-slate-950">{hours} hours</p>
        </div>
        <input
          id="hours-worked"
          type="range"
          min={0}
          max={14}
          step={1}
          value={hours}
          onChange={(event) => setHours(Number(event.target.value))}
          className="mt-4 w-full accent-brand-700"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {HOUR_PRESETS.map((preset) => (
            <button
              key={preset.hours}
              type="button"
              onClick={() => setHours(preset.hours)}
              className={`rounded-full border px-3 py-2 text-xs font-semibold ${
                hours === preset.hours ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-brand-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Volume is the whole decision. A quiet night and a consistent 9-hour day are different jobs, even when the daily rate looks the same.
        </p>
      </div>

      <p className="rounded-2xl bg-slate-950 px-5 py-4 text-sm leading-6 text-white" aria-live="polite">
        {flexibleWins
          ? `At ${hours} hours, the lower 0–4 hour rate pays more because callback starts sooner. On the low ${band.label.toLowerCase()} quote that is ${money(comparison.flexible.low.total)} versus ${money(comparison.guaranteed.low.total)} for the higher guarantee.`
          : `At ${hours} hours, the higher 0–6 hour guarantee pays more. You are not working enough callback hours to beat the extra ${money(comparison.guaranteed.low.dailyRate - comparison.flexible.low.dailyRate)} in the daily rate.`}
        {specialty === "interventional" && hours === 9
          ? " $3,200 with 0–4 hours included and $400 callback is $5,200. That is the low end, not a ceiling."
          : ""}
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <StructureCard snapshot={comparison.flexible} winner={flexibleWins} />
        <StructureCard snapshot={comparison.guaranteed} winner={!flexibleWins} />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-2xl font-semibold text-slate-950">Why the 0–4 hour gratis is the advantage</h3>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Gratis means hours already paid inside the daily rate. A 24-hour call quote of {range(band.flexibleDailyLow, band.flexibleDailyHigh)} with 0–4 hours included is often the same number as an 8-hour day. It can look like you are covering the night for free. You are not, once the work goes past 4 hours. Callback for {band.label.toLowerCase()} is often {range(band.callbackLow, band.callbackHigh)} per hour.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          If you want more money guaranteed and less dependence on volume, ask for {range(band.guaranteedDailyLow, band.guaranteedDailyHigh)} with 0–6 hours included. That daily rate is higher. The upside is lower, because callback does not start until hour 7. On a consistently busy day, the 0–4 structure plus callback is usually the larger check.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button href="/physician-opportunities#lead-form">Ask a recruiter to review a quote</Button>
        <Button href="/cardiologist-locums-calculator" variant="secondary">Estimate a full block</Button>
      </div>
    </div>
  );
}
