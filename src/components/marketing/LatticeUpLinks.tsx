import Link from "next/link";
import { hubPathForJobSpecialtySlug, LATTICE_DOORS, LATTICE_SPECIALTIES } from "@/lib/lead-lattice";

export function LatticeUpLinks({
  specialtySlug,
  specialtyName,
}: {
  specialtySlug?: string;
  specialtyName?: string;
}) {
  const hub = specialtySlug ? hubPathForJobSpecialtySlug(specialtySlug) : undefined;
  const matchingHub = LATTICE_SPECIALTIES.find((s) => s.href === hub);

  return (
    <section className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
      <h2 className="font-display text-lg font-semibold text-slate-950">Nationwide cardiology matching</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {specialtyName
          ? `This state page is one market. Start from the ${specialtyName} hub or a life-stage door if you are comparing assignments across the U.S.`
          : "Compare subspecialty hubs and life-stage doors, then tell us the states you will actually license in."}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {matchingHub ? (
          <li>
            <Link
              href={matchingHub.href}
              className="inline-block rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-800"
            >
              {matchingHub.name} hub →
            </Link>
          </li>
        ) : (
          LATTICE_SPECIALTIES.map((spec) => (
            <li key={spec.pathSlug}>
              <Link
                href={spec.href}
                className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-brand-200"
              >
                {spec.name}
              </Link>
            </li>
          ))
        )}
        {LATTICE_DOORS.map((door) => (
          <li key={door.id}>
            <Link
              href={door.href}
              className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-brand-200"
            >
              {door.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
