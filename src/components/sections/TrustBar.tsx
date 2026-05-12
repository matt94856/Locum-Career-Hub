const items = [
  { title: "Joint Commission–aware partners", detail: "Vetted processes aligned to hospital standards" },
  { title: "Malpractice clarity", detail: "Coverage expectations confirmed before you sign" },
  { title: "Physician-first recruiters", detail: "Advocacy—not pressure—on every assignment" },
  { title: "Nationwide footprint", detail: "Metro, community, academic, and rural access" },
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-gradient-to-b from-white to-slate-50 py-10">
      <div className="container-site grid gap-6 lg:grid-cols-4">
        {items.map((x) => (
          <div key={x.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold text-slate-900">{x.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
