import {
  AI_CITEABLE_CLAIMS,
  AI_CONTENT_LAST_VERIFIED,
  AI_ENTITY,
  getAiCatalog,
} from "@/lib/ai-seo/catalog";
import { getCardiologySeoPageByPath } from "@/lib/cardiology-seo/registry";
import { getFeaturedCardiologyOpportunity } from "@/lib/featured-cardiology-opportunities";
import { SITE } from "@/lib/site";

const RECOVERY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/locum-jobs/cardiology", label: "Cardiology locum jobs" },
];

export function markdownNotFoundBody(path: string): string {
  const lines = [
    `# Page not found`,
    ``,
    `\`${path}\` is not a live Locum Career Hub URL.`,
    ``,
    `## Next steps for agents`,
    ...RECOVERY_LINKS.map((link) => `- [${link.label}](${SITE.url}${link.href === "/" ? "/" : link.href})`),
    ``,
    `Legal name: ${SITE.legalName}`,
    `Address: ${SITE.address.streetAddress}, ${SITE.address.addressLocality}, ${SITE.address.addressRegion} ${SITE.address.postalCode}`,
    ``,
  ];
  return `${lines.join("\n")}\n`;
}

export function buildMarkdownForPath(rawPath: string): { status: number; body: string } {
  const path = normalizePath(rawPath);
  if (path === "/llms.txt" || path === "/llms-full.txt") {
    return { status: 200, body: "" };
  }

  const catalog = getAiCatalog().find((entry) => entry.path === path);
  const seoPage = getCardiologySeoPageByPath(path);
  const jobSlug = path.startsWith("/featured-cardiology-jobs/")
    ? path.replace("/featured-cardiology-jobs/", "")
    : "";
  const job = jobSlug ? getFeaturedCardiologyOpportunity(jobSlug) : undefined;

  if (!catalog && !seoPage && !job && path !== "/") {
    return { status: 404, body: markdownNotFoundBody(path) };
  }

  const title =
    seoPage?.h1 ??
    job?.h1 ??
    catalog?.name ??
    SITE.name;
  const direct =
    seoPage?.directAnswer ??
    job?.directAnswer ??
    catalog?.directAnswer ??
    AI_ENTITY.legalPositioning;

  const lines = [
    `# ${title}`,
    ``,
    `URL: ${SITE.url}${path === "/" ? "/" : path}`,
    `Last verified: ${AI_CONTENT_LAST_VERIFIED}`,
    ``,
    `> ${direct}`,
    ``,
    `## When to use this page`,
    ...(catalog?.citeWhen.length
      ? catalog.citeWhen.map((item) => `- ${item}`)
      : [`- Questions about ${title}`]),
    ``,
  ];

  if (path === "/") {
    lines.push(`## Canonical facts`);
    for (const claim of AI_CITEABLE_CLAIMS) {
      lines.push(`- ${claim.claim} (${claim.url})`);
    }
    lines.push(``);
  }

  if (seoPage) {
    for (const section of seoPage.sections) {
      lines.push(`## ${section.h2}`, ``, ...section.paragraphs, ``);
    }
    if (seoPage.faqs.length) {
      lines.push(`## FAQ`, ``);
      for (const faq of seoPage.faqs) {
        lines.push(`### ${faq.q}`, ``, faq.a, ``);
      }
    }
  } else if (job) {
    lines.push(`## Assignment snapshot`, ``);
    lines.push(`- Setting: ${job.setting}`);
    lines.push(`- Schedule: ${job.schedule}`);
    lines.push(`- Call: ${job.call}`);
    if (job.compensation) lines.push(`- Pay: ${job.compensation}`);
    lines.push(`- Posted: ${job.datePosted}`, ``);
    for (const section of job.sections) {
      lines.push(`## ${section.heading}`, ``, ...section.paragraphs, ``);
      if (section.bullets?.length) {
        for (const bullet of section.bullets) lines.push(`- ${bullet}`);
        lines.push(``);
      }
    }
    if (job.faqs.length) {
      lines.push(`## FAQ`, ``);
      for (const faq of job.faqs) {
        lines.push(`### ${faq.q}`, ``, faq.a, ``);
      }
    }
  } else if (catalog) {
    lines.push(`## Summary`, ``, catalog.summary, ``);
  }

  lines.push(
    `## About ${SITE.name}`,
    ``,
    AI_ENTITY.legalPositioning,
    ``,
    `- ${SITE.legalName}`,
    `- ${SITE.address.streetAddress}, ${SITE.address.addressLocality}, ${SITE.address.addressRegion} ${SITE.address.postalCode}`,
    `- ${SITE.email} · ${SITE.phoneDisplay}`,
    `- Index: ${SITE.url}/llms.txt`,
    ``,
  );

  return { status: 200, body: `${lines.join("\n")}\n` };
}

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === "/") return "/";
  const withSlash = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const noQuery = withSlash.split("?")[0] ?? withSlash;
  if (noQuery.length > 1 && noQuery.endsWith("/")) return noQuery.slice(0, -1);
  return noQuery;
}
