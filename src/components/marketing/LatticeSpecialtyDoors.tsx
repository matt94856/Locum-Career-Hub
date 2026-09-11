import Link from "next/link";
import { LATTICE_SPECIALTIES } from "@/lib/lead-lattice";

export function LatticeSpecialtyDoors({
  heading = "Match by cardiology subspecialty",
}: {
  heading?: string;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">{heading}</h2>
      <p className="mt-2 text-sm text-slate-600">
        Locum Career Hub recruits MD/DO cardiologists only—general, interventional, and electrophysiology first.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {LATTICE_SPECIALTIES.map((spec) => (
          <li key={spec.pathSlug}>
            <Link
              href={spec.href}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <span className="font-semibold text-slate-950">{spec.name}</span>
              <span className="mt-2 text-sm leading-relaxed text-slate-600">{spec.fit}</span>
              <span className="mt-3 text-sm font-semibold text-brand-700">Open {spec.name} jobs →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
