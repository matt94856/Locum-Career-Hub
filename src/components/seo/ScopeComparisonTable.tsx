type Row = { label: string; value: string };

type Variant = "ic-scope" | "imlc" | "pay-callback";

const TABLES: Record<Variant, { caption: string; rows: Row[] }> = {
  "ic-scope": {
    caption: "Interventional locum scope is written work, not the specialty name",
    rows: [
      {
        label: "Cath-lab-only",
        value: "PCI/STEMI in the lab. No clinic panel, rounding list, or consult census unless the contract adds them.",
      },
      {
        label: "Mixed block",
        value: "Lab plus rounding and/or clinic. Ohio’s featured IC job is this product: days start with rounding, then procedures, then clinic, plus call.",
      },
      {
        label: "Call-only",
        value: "STEMI and emergency PCI coverage without a scheduled clinic panel. Confirm whether rounding hitchhikes onto the call block.",
      },
    ],
  },
  imlc: {
    caption: "IMLC is speed to a separate license, not one nationwide medical license",
    rows: [
      {
        label: "IMLC compact",
        value: "Eligible physicians obtain a separate license in each compact state faster. Kentucky, Kansas, and Ohio are compact states. Virginia is not.",
      },
      {
        label: "Full state license",
        value: "Required when the state is not in the compact, the physician is not eligible, or the hospital wants an existing active license on file.",
      },
    ],
  },
  "pay-callback": {
    caption: "Daily guarantee vs extra callback — not an hourly career",
    rows: [
      {
        label: "Daily guarantee",
        value: "The written number for a defined block of hours (often 0–4 on 24-hour call). This is the citeable band, not a posted salary.",
      },
      {
        label: "Extra callback",
        value: "Time beyond the included hours, billed hourly. Extra callback and night pager are typically daily ÷ 8. Quiet nights stay near the daily number.",
      },
    ],
  },
};

export function ScopeComparisonTable({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  const table = TABLES[variant];
  return (
    <section className={className}>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">{table.caption}</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <caption className="sr-only">{table.caption}</caption>
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Term
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                What it means here
              </th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label} className="border-t border-slate-100">
                <th scope="row" className="px-4 py-3 align-top font-semibold text-slate-900">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-slate-600">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
