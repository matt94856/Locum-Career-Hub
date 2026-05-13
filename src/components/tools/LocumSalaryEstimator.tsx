"use client";

import { useMemo, useState } from "react";

/** Educational ranges only—not a quote, offer, or tax advice. */
export function LocumSalaryEstimator() {
  const [hoursPerShift, setHoursPerShift] = useState(10);
  const [shiftsPerWeek, setShiftsPerWeek] = useState(4);
  const [weeks, setWeeks] = useState(8);
  const [hourlyLow, setHourlyLow] = useState(200);
  const [hourlyHigh, setHourlyHigh] = useState(320);

  const { low, high } = useMemo(() => {
    const h = hoursPerShift * shiftsPerWeek * weeks;
    return { low: Math.round(h * hourlyLow), high: Math.round(h * hourlyHigh) };
  }, [hoursPerShift, shiftsPerWeek, weeks, hourlyLow, hourlyHigh]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-slate-900">Estimated gross range (illustrative)</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">
        Adjust hours and blended hourly assumptions. Real locum offers depend on specialty, call, site acuity, stipends,
        malpractice, and market season.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Hours / shift</span>
          <input
            type="number"
            min={4}
            max={14}
            value={hoursPerShift}
            onChange={(e) => setHoursPerShift(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Shifts / week</span>
          <input
            type="number"
            min={1}
            max={7}
            value={shiftsPerWeek}
            onChange={(e) => setShiftsPerWeek(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Weeks on assignment</span>
          <input
            type="number"
            min={1}
            max={52}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900"
          />
        </label>
        <div className="block text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Blended hourly assumption (USD)</span>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-600">
              Low
              <input
                type="number"
                min={80}
                max={600}
                value={hourlyLow}
                onChange={(e) => setHourlyLow(Number(e.target.value))}
                className="w-24 rounded-lg border border-slate-200 px-2 py-1"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-600">
              High
              <input
                type="number"
                min={80}
                max={800}
                value={hourlyHigh}
                onChange={(e) => setHourlyHigh(Number(e.target.value))}
                className="w-24 rounded-lg border border-slate-200 px-2 py-1"
              />
            </label>
          </div>
        </div>
      </div>
      <p className="mt-8 font-display text-3xl font-semibold text-slate-950">
        ${low.toLocaleString()} – ${high.toLocaleString()}
      </p>
      <p className="mt-2 text-xs text-slate-500">Gross only. No taxes, benefits, or deductions modeled.</p>
    </div>
  );
}
