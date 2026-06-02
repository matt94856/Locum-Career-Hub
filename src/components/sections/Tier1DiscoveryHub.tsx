import Link from "next/link";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  HOME_LEAD_ANCHOR,
  LEAD_FORM_HREF,
  TIER1_HUB_GROUPS,
  TIER1_PRIORITY_LINKS,
  type Tier1Group,
  type Tier1Link,
} from "@/lib/seo/tier1-discovery";
import { CTA, SITE } from "@/lib/site";

type Props = {
  variant?: "full" | "compact";
  leadHref?: string;
};

function ListCheck() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/30 text-brand-100">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PriorityCard({ link }: { link: Tier1Link }) {
  return (
    <GuideCardLink
      href={link.href}
      title={link.title}
      description={link.description}
      ctaLabel={link.ctaLabel ?? "Open guide →"}
    />
  );
}

function GroupBlock({ group }: { group: Tier1Group }) {
  return (
    <div className="mt-14 first:mt-0">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{group.eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          {group.title}
        </h3>
        {group.subtitle ? (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{group.subtitle}</p>
        ) : null}
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
        {group.links.map((link) => (
          <li key={link.href} className="min-w-0">
            <PriorityCard link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Tier1DiscoveryHub({ variant = "full", leadHref = LEAD_FORM_HREF }: Props) {
  const groups = variant === "compact" ? TIER1_HUB_GROUPS.slice(0, 2) : TIER1_HUB_GROUPS;
  const inquiryHref = leadHref === LEAD_FORM_HREF ? HOME_LEAD_ANCHOR : leadHref;

  return (
    <section className="border-b border-slate-100 bg-white py-16 sm:py-20" aria-labelledby="tier1-discovery-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="Popular in search"
          title="Guides and tools physicians click before they inquire"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-8 lg:col-span-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_circle_at_0%_0%,rgba(37,99,235,0.5),transparent_55%)]" />
            <div className="relative flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">Ready to talk?</p>
              <h3
                id="tier1-discovery-heading"
                className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Get locum matches, not a generic blast
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">
                Most physicians who convert tell us specialty, states, and hard boundaries first. We respond with
                realistic options and credentialing timelines from {SITE.name}.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <ListCheck />
                  <span>2-minute inquiry, no obligation</span>
                </li>
                <li className="flex gap-3">
                  <ListCheck />
                  <span>Physician recruiter, not a call center</span>
                </li>
                <li className="flex gap-3">
                  <ListCheck />
                  <span>
                    Call{" "}
                    <a href={`tel:${SITE.phoneTel}`} className="font-semibold text-white hover:underline">
                      {SITE.phoneDisplay}
                    </a>{" "}
                    if you prefer voice
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={leadHref} className="w-full justify-center sm:flex-1">
                  {CTA.explore}
                </Button>
                <Button
                  href={`tel:${SITE.phoneTel}`}
                  variant="secondary"
                  className="w-full justify-center border-white/25 bg-white/10 !text-white hover:border-white/40 hover:bg-white/20 sm:flex-1"
                >
                  Call now
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Fast paths</p>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TIER1_PRIORITY_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-[4.5rem] flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-brand-200 hover:bg-brand-50/50"
                  >
                    <span className="text-sm font-semibold text-slate-900 [overflow-wrap:anywhere]">
                      {link.shortTitle ?? link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              <Link href={inquiryHref} className="font-semibold text-brand-700 hover:underline">
                Make an inquiry
              </Link>
            </p>
          </div>
        </div>

        {groups.map((group) => (
          <GroupBlock key={group.id} group={group} />
        ))}

        {variant === "full" ? (
          <div className="mt-14 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-6 text-center sm:p-8">
            <p className="font-display text-lg font-semibold text-slate-950">Done reading? Tell us what you need.</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              We will not spam you. Share dates, license footprint, and boundaries for a realistic follow-up.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={leadHref}>{CTA.explore}</Button>
              <Button href="/contact" variant="secondary">
                {CTA.recruiter}
              </Button>
              <Button href="/tools" variant="secondary">
                Free calculators
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
