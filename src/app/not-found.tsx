import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="container-site py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950">Page not found</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
        The page you are looking for does not exist. If you were exploring flexible physician careers, start with our
        opportunities hub—or connect with our team.
      </p>
      <div className="mt-8 flex max-w-xl flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button href="/physician-opportunities" className="w-full justify-center">
            {CTA.explore}
          </Button>
          <Button href="/" variant="secondary" className="w-full justify-center">
            Return home
          </Button>
        </div>
        <Link
          className="inline-flex text-sm font-semibold text-brand-700 hover:underline sm:justify-center"
          href="/contact"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
