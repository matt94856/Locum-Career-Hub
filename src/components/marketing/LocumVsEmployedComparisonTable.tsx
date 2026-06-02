/** Educational comparison—not individualized advice or guaranteed outcomes. */
export function LocumVsEmployedComparisonTable() {
  const rows = [
    {
      factor: "Schedule control",
      locum: "Defined blocks or weeks; easier to step away between assignments",
      employed: "Ongoing clinic panels, call, and admin—harder to fully disconnect",
    },
    {
      factor: "Compensation shape",
      locum: "Often higher hourly/weekly gross; you manage taxes, benefits, gaps",
      employed: "Salary + bonus (RVU); benefits bundled; steadier paycheck",
    },
    {
      factor: "Malpractice",
      locum: "Must confirm tail, claims-made vs occurrence, and who pays tail",
      employed: "Usually employer-provided structure (still read your contract)",
    },
    {
      factor: "Credentialing",
      locum: "Repeat licensing/privileging per state and site; plan lead time",
      employed: "One-time onboarding at hire (until you change employers)",
    },
    {
      factor: "STEMI / cath lab call",
      locum: "Document activation rules, backup, and lab access before day one",
      employed: "Defined in employed agreement—may be harder to renegotiate mid-year",
    },
    {
      factor: "Best when…",
      locum: "You want optionality, travel, burnout recovery, or bridge income",
      employed: "You want stability, partnership track, or single-community roots",
    },
  ] as const;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <caption className="sr-only">Locum vs employed cardiology comparison</caption>
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
              Factor
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-brand-800">
              Locum cardiology
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-slate-800">
              Employed cardiology
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.factor} className="border-b border-slate-100 last:border-0">
              <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                {row.factor}
              </th>
              <td className="px-4 py-3 leading-relaxed text-slate-600">{row.locum}</td>
              <td className="px-4 py-3 leading-relaxed text-slate-600">{row.employed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
        Educational overview only—not tax, legal, or financial advice. Submit an inquiry for recruiter-led context on your
        states and subspecialty.
      </p>
    </div>
  );
}
