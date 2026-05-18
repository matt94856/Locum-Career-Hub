import Link from "next/link";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
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

function PriorityCard({ link }: { link: Tier1Link }) {
  return (
    <GuideCardLink
      href={link.href}
      title={link.title}
      description={link.description}
      ctaLabel={link.ctaLabel ?? "Open ?"}
      className={link.badge ? "ring-1 ring-brand-100" : ""}
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
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{group.subtitle}</p>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
        {group.links.map((link) => (
          <li key={link.href} className="relative min-w-0">
            {link.badge ? (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                {link.badge}
              </span>
            ) : null}
            <PriorityCard link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Tier1DiscoveryHub({ variant = "full", leadHref = LEAD_FORM_HREF }: Props) {
  const groups = variant === "compact" ? TIER1_HUB_GROUPS.slice(0, 2) : TIER1_HUB_GROUPS;

  return (
    <section className="border-b border-slate-100 bg-white py-16 sm:py-20" aria-labelledby="tier1-discovery-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="Popular in search"
          title="Guides and tools physicians click before they inquire"
          subtitle="We surface our strongest pages here?better for visitors, internal links, and the URLs already earning impressions in Google."
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
                Get locum matches?not a generic blast
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">
                Most physicians who convert tell us specialty, states, and hard boundaries first. We respond with
                realistic options and credentialing timelines from {SITE.name}.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="text-brand-300" aria-hidden>
                    ?
                  </span>
                  <span>2-minute inquiry?no obligation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-300" aria-hidden>
                    ?
                  </span>
                  <span>Physician recruiter, not a call center</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-300" aria-hidden>
                    ?
                  </span>
                  <span>Call {SITE.phoneDisplay} if you prefer voice</span>
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
                    {link.badge ? (
                      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                        {link.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Browsing on mobile?{" "}
              <Link href={leadHref} className="font-semibold text-brand-700 hover:underline">
                Jump to the lead form ?
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
              We will not spam you?share dates, license footprint, and boundaries for a realistic follow-up.
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
