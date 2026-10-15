import type { Metadata } from "next";
import Link from "next/link";
import { buildOgImageUrl, expandShareKind, expandSharePath, isArcadeSharePath } from "@/lib/share";
import { SITE } from "@/lib/site";
import "@/components/tools/ic-pay-arcade.css";

type Search = Promise<Record<string, string | string[] | undefined>>;

function one(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const params = await searchParams;
  const title = one(params.t) || "Cardiologist locums result";
  const stat = one(params.s) || "Locum Career Hub";
  const subtitle = one(params.d) || "Directional planning estimate — not a quote.";
  const path = expandSharePath(one(params.p));
  const arcade = isArcadeSharePath(path);
  const image = buildOgImageUrl({
    title,
    stat,
    subtitle,
    eyebrow: arcade ? "Pay Arcade" : expandShareKind(one(params.k)) === "calc" ? "Earnings profile" : "Cardiology tool",
    style: arcade ? "arcade" : "default",
  });
  const query = new URLSearchParams();
  for (const key of ["k", "t", "s", "d", "p"] as const) {
    const value = one(params[key]);
    if (value) query.set(key, value);
  }
  const shareUrl = `${SITE.url}/s${query.size ? `?${query.toString()}` : ""}`;

  return {
    title: `${stat} | ${title}`,
    description: subtitle,
    robots: { index: false, follow: true },
    openGraph: {
      title: arcade ? `${title} pay ticket` : `${stat} · ${title}`,
      description: arcade ? `${stat} · ${subtitle}` : subtitle,
      url: shareUrl,
      siteName: SITE.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} ${stat} pay ticket` }],
    },
    twitter: {
      card: "summary_large_image",
      title: arcade ? `${title} pay ticket` : `${stat} · ${title}`,
      description: arcade ? `${stat} · ${subtitle}` : subtitle,
      images: [image],
    },
  };
}

export default async function ShortShareLandingPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const title = one(params.t) || "Cardiologist locums planning";
  const stat = one(params.s) || "See your range";
  const subtitle = one(params.d) || "Directional estimate for planning conversations.";
  const href = expandSharePath(one(params.p));
  const arcade = isArcadeSharePath(href);
  const range = stat.replace(/\/day$/i, "");

  if (arcade) {
    return (
      <main className="min-h-[70vh] bg-[#1a0e07] pb-24 text-[#fff4d6]">
        <section className="container-site max-w-3xl py-12 sm:py-16">
          <div className="ic-arcade">
            <div className="ic-arcade__lights" aria-hidden>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="px-4 pb-1 text-center sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffe08a]">Locum Career Hub</p>
              <p className="mt-1 font-display text-3xl text-[#ffe08a] sm:text-4xl">Pay Arcade</p>
            </div>
            <div className="ic-arcade__bezel">
              <div className="ic-arcade__screen p-4 sm:p-7">
                <div className="ic-arcade__ticket px-4 py-5 sm:px-6 sm:py-6">
                  <div className="flex items-start justify-between gap-3 border-b border-dashed border-amber-800/40 pb-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-900">Pay ticket</p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-900">{SITE.domain}</p>
                  </div>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-800">Specialty</p>
                  <h1 className="mt-1 font-display text-3xl text-amber-950 sm:text-4xl">{title}</h1>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-800">Pay expectation</p>
                  <p className="mt-1 font-display text-4xl leading-none text-amber-950 sm:text-5xl">{range}</p>
                  <p className="mt-2 text-sm font-semibold text-amber-900">a day · {subtitle}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-[#e8d8b0]">
            Educational range only — not a guaranteed offer. Run the arcade for your own mix.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href={href} className="rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-[#2b160b] hover:brightness-110">
              Play the pay arcade
            </Link>
            <Link
              href="/physician-opportunities#lead-form"
              className="rounded-xl border border-[#d4af37]/60 px-5 py-3 text-sm font-semibold text-[#fff4d6] hover:border-[#ffe08a]"
            >
              Request matches
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-slate-950 text-white">
      <section className="container-site flex max-w-3xl flex-col items-start gap-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Shared cardiology result</p>
        <h1 className="break-words font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="break-words font-display text-4xl font-semibold text-brand-300 sm:text-6xl">{stat}</p>
        <p className="max-w-2xl text-lg leading-8 text-slate-300">{subtitle}</p>
        <p className="text-sm text-slate-400">
          Educational range only — not a guaranteed offer. Run your own profile or explore matching decision tools.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={href} className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400">
            Open the full tool
          </Link>
          <Link
            href="/cardiologist-locums-calculator"
            className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:border-brand-400"
          >
            Run the earnings calculator
          </Link>
        </div>
      </section>
    </main>
  );
}
