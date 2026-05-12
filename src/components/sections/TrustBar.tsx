const items = [
  { title: "Hospital-grade rigor", detail: "Credentialing and expectations handled with care" },
  { title: "Malpractice clarity", detail: "Coverage confirmed in writing before you sign" },
  { title: "Physician-first tone", detail: "Supportive guidance—not corporate recruiting theater" },
  { title: "Nationwide footprint", detail: "Metro, community, academic, and rural access" },
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-gradient-to-b from-white to-slate-50 py-10">
      <div className="container-site grid gap-5 lg:grid-cols-4">
        {items.map((x) => (
          <div key={x.title} className="min-w-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
            <p className="text-sm font-semibold text-slate-900">{x.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
