import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/lib/site";

const AGENT_LINKS = [
  { href: "/", label: "Home" },
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/locum-jobs/cardiology", label: "Cardiology locum jobs" },
] as const;

export default function NotFound() {
  return (
    <main className="container-site py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950">Page not found</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
        This URL is not a live Locum Career Hub page. Start with cardiology locum jobs, the machine-readable index, or
        the sitemap.
      </p>
      <div className="mt-8 flex max-w-xl flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button href="/locum-jobs/cardiology" className="w-full justify-center">
            {CTA.explore}
          </Button>
          <Button href="/" variant="secondary" className="w-full justify-center">
            Return home
          </Button>
        </div>
        <ul className="space-y-2 text-sm">
          {AGENT_LINKS.map((link) => (
            <li key={link.href}>
              <Link className="font-semibold text-brand-700 hover:underline" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="inline-flex text-sm font-semibold text-brand-700 hover:underline" href="/contact">
          Contact
        </Link>
      </div>
    </main>
  );
}
