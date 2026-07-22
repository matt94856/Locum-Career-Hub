import type { Metadata } from "next";
import Link from "next/link";
import { buildOgImageUrl } from "@/lib/share";
import { SITE } from "@/lib/site";

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
  const image = buildOgImageUrl({
    title,
    stat,
    subtitle,
    eyebrow: one(params.k) === "calc" ? "Earnings profile" : "Cardiology tool",
  });

  return {
    title: `${stat} | ${title}`,
    description: subtitle,
    robots: { index: false, follow: true },
    openGraph: {
      title: `${stat} · ${title}`,
      description: subtitle,
      url: `${SITE.url}/share/r`,
      siteName: SITE.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${stat} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${stat} · ${title}`,
      description: subtitle,
      images: [image],
    },
  };
}

export default async function ShareResultLandingPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const title = one(params.t) || "Cardiologist locums planning";
  const stat = one(params.s) || "See your range";
  const subtitle = one(params.d) || "Directional estimate for planning conversations.";
  const path = one(params.p) || "/cardiologist-locums-calculator";
  const href = path.startsWith("/") ? path : `/${path}`;

  return (
    <main className="min-h-[70vh] bg-slate-950 text-white">
      <section className="container-site flex max-w-3xl flex-col items-start gap-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Shared cardiology result</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="font-display text-5xl font-semibold text-brand-300 sm:text-6xl">{stat}</p>
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
