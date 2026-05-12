import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { socialShareMetadata } from "@/lib/social-metadata";

const BLOG_INDEX_DESC =
  "Physician-focused articles on burnout, compensation, travel, taxes, and transitioning into locum tenens—written for clinicians, not corporate jargon.";

export const metadata: Metadata = {
  title: "Physician Insights | Locum Tenens Blog",
  description: BLOG_INDEX_DESC,
  alternates: { canonical: "/blog" },
  ...socialShareMetadata({
    title: "Physician Insights | Locum Tenens Blog",
    description: BLOG_INDEX_DESC,
    path: "/blog",
  }),
};

export default function BlogIndexPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Insights</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Practical articles for physicians evaluating locums
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Straightforward guides on burnout signals, pay structures, travel stamina, and career transitions—written to
            be CMS-ready when you connect a headless blog later.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
        <div className="grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((p) => (
            <article
              key={p.slug}
              className="flex min-w-0 flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-brand-100 hover:shadow-md sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-800 ring-1 ring-brand-100">
                  {p.category}
                </span>
                <span className="text-slate-500">{p.date}</span>
                <span className="text-slate-500">{p.readMinutes} min</span>
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-slate-950 sm:text-xl">
                <Link className="hover:text-brand-800 [overflow-wrap:anywhere]" href={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 min-h-0 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{p.description}</p>
              <Link
                className="mt-5 inline-flex text-sm font-semibold text-brand-700 hover:underline"
                href={`/blog/${p.slug}`}
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
        </div>
      </section>
    </main>
  );
}
