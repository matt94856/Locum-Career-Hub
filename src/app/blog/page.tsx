import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Physician Insights | Locum Tenens Blog",
  description:
    "Physician-focused articles on burnout, compensation, travel, taxes, and transitioning into locum tenens—written for clinicians, not corporate jargon.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Insights</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A blog built for physicians exploring locums
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            This library is designed to be CMS-ready: migrate these posts to your headless CMS without changing routes
            or SEO structure.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-4">
          {BLOG_POSTS.map((p) => (
            <article key={p.slug} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-800 ring-1 ring-brand-100">
                  {p.category}
                </span>
                <span>{p.date}</span>
                <span>{p.readMinutes} min read</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-slate-950">
                <Link className="hover:text-brand-800" href={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.description}</p>
              <Link className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:underline" href={`/blog/${p.slug}`}>
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
