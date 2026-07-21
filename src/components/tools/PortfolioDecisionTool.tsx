"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { readLeadAttribution } from "@/lib/attribution";
import { trackDecisionToolEvent, trackGenerateLead } from "@/lib/analytics-events";
import { calculatePortfolioTool, type ToolResult, type ToolValues } from "@/lib/tools/calculate-portfolio-tool";
import type { PortfolioToolDefinition, ToolField } from "@/lib/tools/portfolio-tools";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { US_STATES } from "@/lib/states";

function fieldSteps(fields: ToolField[]) {
  const groups = [...new Set(fields.map((field) => field.group).filter(Boolean))];
  if (groups.length > 1) {
    const grouped = groups.map((group) => fields.filter((field) => field.group === group));
    const ungrouped = fields.filter((field) => !field.group);
    return ungrouped.length ? [ungrouped, ...grouped] : grouped;
  }
  const result: ToolField[][] = [];
  for (let index = 0; index < fields.length; index += 4) result.push(fields.slice(index, index + 4));
  return result;
}

function initialValues(definition: PortfolioToolDefinition): ToolValues {
  return Object.fromEntries(definition.fields.map((field) => [field.key, field.defaultValue]));
}

function Field({
  field,
  value,
  onChange,
}: {
  field: ToolField;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
}) {
  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-950 shadow-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

  return (
    <label className="block">
      <span className="text-sm font-semibold leading-6 text-slate-900">{field.label}</span>
      {field.help ? <span className="mt-1 block text-xs leading-5 text-slate-500">{field.help}</span> : null}
      {field.type === "select" ? (
        <select className={inputClass} value={String(value)} onChange={(event) => onChange(event.target.value)}>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <input className="mt-3 size-5 accent-brand-600" type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
      ) : (
        <div className="relative">
          {field.prefix ? <span className="pointer-events-none absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-sm text-slate-500">{field.prefix}</span> : null}
          <input
            className={`${inputClass} ${field.prefix ? "pl-7" : ""} ${field.suffix ? "pr-16" : ""}`}
            type="number"
            inputMode="decimal"
            min={field.min}
            max={field.max}
            step={field.step ?? 1}
            value={Number(value)}
            onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))}
          />
          {field.suffix ? <span className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-xs text-slate-500">{field.suffix}</span> : null}
        </div>
      )}
    </label>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className="mt-2 font-display text-2xl font-semibold text-slate-950">{value}</dd>
      {note ? <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p> : null}
    </div>
  );
}

function Results({ definition, result }: { definition: PortfolioToolDefinition; result: ToolResult }) {
  return (
    <section aria-live="polite" className="mt-8 rounded-3xl border border-brand-100 bg-gradient-to-b from-brand-50/70 to-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Your scenario</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-slate-950">{result.headline}</h2>
        </div>
        {typeof result.score === "number" ? (
          <div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">{result.score}/100</div>
        ) : null}
      </div>
      <p className="mt-4 max-w-3xl leading-7 text-slate-700">{result.summary}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Confidence: {result.confidence}</p>
      <dl className="mt-7 grid gap-4 sm:grid-cols-2">
        {result.metrics.map((metric) => <Metric key={metric.label} {...metric} />)}
      </dl>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-xl font-semibold text-slate-950">Recommended next steps</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {result.actions.map((action) => <li key={action} className="flex gap-2"><span aria-hidden="true" className="text-brand-600">✓</span><span>{action}</span></li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-950">Important limitations</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950/80">
            {result.warnings.map((warning) => <li key={warning}>• {warning}</li>)}
          </ul>
        </div>
      </div>
      <div className="mt-7 flex flex-wrap gap-3 print:hidden">
        <button
          type="button"
          onClick={async () => {
            trackDecisionToolEvent(definition.id, "share", { source_version: definition.sourceIds.join(",") });
            const data = { title: definition.name, text: result.headline, url: window.location.href };
            if (navigator.share) await navigator.share(data).catch(() => undefined);
            else await navigator.clipboard?.writeText(window.location.href);
          }}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
        >
          Share this tool
        </button>
        <button
          type="button"
          onClick={() => {
            trackDecisionToolEvent(definition.id, "print", { source_version: definition.sourceIds.join(",") });
            window.print();
          }}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
        >
          Print / save PDF
        </button>
      </div>
    </section>
  );
}

function ReportGate({
  definition,
  values,
  result,
}: {
  definition: PortfolioToolDefinition;
  values: ToolValues;
  result: ToolResult;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("Florida");
  const [specialty, setSpecialty] = useState<(typeof CARDIOLOGY_SUBSPECIALTIES)[number]>("General Cardiology");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("name") ?? "").trim().split(/\s+/);
    const payload = {
      firstName: fullName[0] ?? "",
      lastName: fullName.slice(1).join(" ") || "Not provided",
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      specialty,
      preferredStates: [state],
      homeState: state,
      availability: "Exploring / no firm date",
      formMode: "quick",
      source: `decision_tool_${definition.id}`,
      pagePath: window.location.pathname,
      attribution: readLeadAttribution(),
      calculatorProfile: {
        toolId: definition.id,
        sourceVersions: definition.sourceIds,
        inputs: values,
        result,
      },
    };
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Could not save your request.");
      setStatus("success");
      trackDecisionToolEvent(definition.id, "lead_success", { source_version: definition.sourceIds.join(",") });
      trackGenerateLead(`decision_tool_${definition.id}`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not save your request.");
      trackDecisionToolEvent(definition.id, "lead_error", { source_version: definition.sourceIds.join(",") });
    }
  }

  useEffect(() => {
    trackDecisionToolEvent(definition.id, "report_gate", { source_version: definition.sourceIds.join(",") });
  }, [definition.id, definition.sourceIds]);

  return (
    <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8 print:hidden">
      {status === "success" ? (
        <div role="status">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Request received</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Your scenario is saved with your inquiry.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">A cardiology specialist can use these assumptions to help you pressure-test a real opportunity.</p>
        </div>
      ) : (
        <>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Optional, after your result</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Get a cardiology-specific opportunity review</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Your calculation remains visible without submitting. Share your scenario only if you want a human follow-up.</p>
          <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">Name<input required name="name" autoComplete="name" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none focus:border-brand-400" /></label>
            <label className="text-sm font-semibold">Email<input required type="email" name="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none focus:border-brand-400" /></label>
            <label className="text-sm font-semibold">Phone<input required type="tel" name="phone" autoComplete="tel" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none focus:border-brand-400" /></label>
            <label className="text-sm font-semibold">Cardiology focus<select value={specialty} onChange={(event) => setSpecialty(event.target.value as typeof specialty)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none focus:border-brand-400">{CARDIOLOGY_SUBSPECIALTIES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="text-sm font-semibold sm:col-span-2">Home or preferred state<select value={state} onChange={(event) => setState(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none focus:border-brand-400">{US_STATES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <div className="sm:col-span-2">
              <button disabled={status === "sending"} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400 disabled:opacity-60">
                {status === "sending" ? "Saving…" : "Request a personalized review"}
              </button>
              {status === "error" ? <p role="alert" className="mt-3 text-sm text-rose-300">{message}</p> : null}
              <p className="mt-3 text-xs leading-5 text-slate-400">No PHI. By submitting, you consent to follow-up about cardiology opportunities. Standard messaging rates may apply only if you later opt into SMS.</p>
            </div>
          </form>
        </>
      )}
    </section>
  );
}

export function PortfolioDecisionTool({ definition }: { definition: PortfolioToolDefinition }) {
  const steps = useMemo(() => fieldSteps(definition.fields), [definition.fields]);
  const [values, setValues] = useState<ToolValues>(() => initialValues(definition));
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const started = useRef(false);
  const result = useMemo(() => calculatePortfolioTool(definition.id, values), [definition.id, values]);

  function update(key: string, value: string | number | boolean) {
    if (!started.current) {
      started.current = true;
      trackDecisionToolEvent(definition.id, "start", { source_version: definition.sourceIds.join(",") });
    }
    setValues((current) => ({ ...current, [key]: value }));
  }

  function next() {
    trackDecisionToolEvent(definition.id, "step_complete", { step: step + 1, source_version: definition.sourceIds.join(",") });
    if (step < steps.length - 1) setStep((current) => current + 1);
    else {
      setComplete(true);
      trackDecisionToolEvent(definition.id, "result", { source_version: definition.sourceIds.join(",") });
      requestAnimationFrame(() => document.getElementById("tool-results")?.focus());
    }
  }

  return (
    <div>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-slate-800">Step {step + 1} of {steps.length}</p>
          <p className="text-xs text-slate-500">About 2 minutes</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps[step].map((field) => <Field key={field.key} field={field} value={values[field.key]} onChange={(value) => update(field.key, value)} />)}
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 disabled:opacity-40">Back</button>
          <button type="button" onClick={next} className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">{step === steps.length - 1 ? "Calculate my result" : "Continue"}</button>
        </div>
      </section>
      {complete ? (
        <div id="tool-results" tabIndex={-1} className="outline-none">
          <Results definition={definition} result={result} />
          <ReportGate definition={definition} values={values} result={result} />
        </div>
      ) : null}
    </div>
  );
}
