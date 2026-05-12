import Link from "next/link";
import { LANDING_PAGES } from "@/lib/landings";
import { NAV_LINKS, SITE } from "@/lib/site";

const footerLandings = LANDING_PAGES.slice(0, 7);

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-slate-950 text-slate-200">
      <div className="container-site grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
              LC
            </span>
            <span className="font-display text-lg font-semibold text-white">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">{SITE.tagline}</p>
          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="text-slate-400">Phone: </span>
              <a className="font-semibold text-white hover:underline" href={`tel:${SITE.phoneTel}`}>
                {SITE.phoneDisplay}
              </a>
            </p>
            <p>
              <span className="text-slate-400">Email: </span>
              <a className="font-semibold text-white hover:underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
            <p className="text-xs text-slate-500">{SITE.domain}</p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-white" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Popular searches
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLandings.map((l) => (
                <li key={l.slug}>
                  <Link className="hover:text-white" href={`/${l.slug}`}>
                    {l.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Compliance</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Locum Career Hub is a physician recruiting partner. Opportunities, rates, and timelines vary
            by facility, specialty, and credentialing requirements. Nothing on this site constitutes medical
            or legal advice.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} {SITE.name}</span>
            <span>·</span>
            <Link className="hover:text-white" href="/faq">
              FAQ
            </Link>
            <span>·</span>
            <Link className="hover:text-white" href="/contact">
              Privacy requests
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
