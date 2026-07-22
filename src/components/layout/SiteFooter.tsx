import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { TIER1_FOOTER_LINKS } from "@/lib/seo/tier1-discovery";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-slate-950 text-slate-200">
      <div className="container-site grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <BrandLogo className="h-10 w-10 shrink-0 ring-1 ring-white/15" />
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
            <p className="text-xs text-slate-400">{SITE.domain}</p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
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
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resources</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="hover:text-white" href="/locum-jobs/cardiology">
                  Cardiology locum jobs
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/what-is-a-locum-cardiologist">
                  What is a locum cardiologist?
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/locum-cardiologist-salary">
                  Locum cardiologist salary
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/resources">
                  Cardiology resources
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/locum-tenens-jobs">
                  Locum jobs by state
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/national-locum-tenens-jobs-guide">
                  National locum guide
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/cardiologist-locums-pay-report">
                  Citeable pay report
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/llms.txt">
                  AI assistants (llms.txt)
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/ai-catalog.json">
                  AI catalog (JSON)
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/glossary">
                  Glossary
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/tools">
                  Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Popular searches
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {TIER1_FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-white" href={l.href}>
                    {l.shortTitle ?? l.title}
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
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
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
