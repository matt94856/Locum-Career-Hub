import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPost } from "@/lib/blog-posts";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { BRAND_LOGO_URL, SITE } from "@/lib/site";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE.url}/blog/${post.slug}`,
      siteName: SITE.name,
      images: [{ url: BRAND_LOGO_URL, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [BRAND_LOGO_URL],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.date,
          keywords: post.keywords,
        })}
      />
      <JsonLd data={crumbs} />

      <article>
        <header className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
          <div className="container-prose">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-800 ring-1 ring-brand-100">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>{post.readMinutes} min read</span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">{post.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/physician-opportunities#lead-form"
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              >
                Request opportunities
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
              >
                Back to insights
              </Link>
            </div>
          </div>
        </header>

        <div className="container-prose py-14 sm:py-16">
          <div className="max-w-none">
            {post.body.map((para, idx) => (
              <p key={idx} className="mt-6 text-sm leading-relaxed text-slate-700 first:mt-0 sm:text-base">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <h2 className="font-display text-xl font-semibold text-slate-950">Related hubs</h2>
            <div className="mt-4 flex flex-col gap-2 text-sm font-semibold">
              <Link className="text-brand-700 hover:underline" href="/locum-tenens-jobs">
                Locum tenens jobs
              </Link>
              <Link className="text-brand-700 hover:underline" href="/physician-burnout-alternatives">
                Physician burnout alternatives
              </Link>
              <Link className="text-brand-700 hover:underline" href="/flexible-physician-careers">
                Flexible physician careers
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
