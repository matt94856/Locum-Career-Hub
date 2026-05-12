import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="container-site py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950">Page not found</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
        The page you are looking for does not exist. If you are trying to find locum tenens opportunities, start with
        our opportunities hub or talk with a recruiter.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/physician-opportunities">Find Opportunities</Button>
        <Button href="/" variant="secondary">
          Return home
        </Button>
        <Link className="inline-flex items-center justify-center text-sm font-semibold text-brand-700 hover:underline" href="/contact">
          Contact
        </Link>
      </div>
    </main>
  );
}
