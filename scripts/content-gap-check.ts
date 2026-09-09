import { readFileSync, writeFileSync } from "fs";
import { ALL_EDITORIAL_GUIDES, ALL_EDITORIAL_RESOURCES, getEditorialPageDefs } from "../src/lib/cardiology-content/index";
import { getAllArticleSlugs } from "../src/lib/cardiology-authority/articles";
import { getGuideSlugs, getAllCardiologySeoPages } from "../src/lib/cardiology-seo/registry";

const canvas = readFileSync(
  "C:/Users/matt9/.cursor/projects/c-Users-matt9-Desktop-MPLT-Health/canvases/cardiology-100-page-content-strategy.canvas.tsx",
  "utf8",
);
const urls = [...canvas.matchAll(/url: "([^"]+)"/g)].map((m) => m[1]);
const plannedSlugs = urls
  .map((u) => u.replace(/\/$/, "").split("/").filter(Boolean).pop()!)
  .filter(Boolean);

const have = new Set([
  ...ALL_EDITORIAL_GUIDES.map((g) => g.slug),
  ...ALL_EDITORIAL_RESOURCES.map((r) => r.slug),
  ...getAllArticleSlugs(),
  ...getGuideSlugs(),
  ...getAllCardiologySeoPages().map((p) => p.slug),
]);

// also path tails for static pages
const staticHints = [
  "how-much-do-cardiologists-make-doing-locums",
  "cardiologist-burnout-solutions",
  "w2-vs-1099-physician",
  "best-states-for-cardiology-locums",
  "interventional-cardiology-locums-pay",
  "ep-cardiology-locums-pay",
  "part-time-cardiologist-jobs",
  "leaving-employed-cardiology",
  "interventional",
  "electrophysiology",
  "physicians-guide-to-locum-tenens",
  "what-physicians-wish-they-knew-about-locums-earlier",
  "complete-guide-to-locum-cardiology",
  "things-nobody-tells-you-cardiology-fellowship",
];
for (const s of staticHints) have.add(s);

const missing = plannedSlugs.filter((s) => !have.has(s));
const uniqueMissing = [...new Set(missing)];

console.log(
  JSON.stringify(
    {
      planned: plannedSlugs.length,
      uniquePlanned: new Set(plannedSlugs).size,
      editorialGuides: ALL_EDITORIAL_GUIDES.length,
      newRoutes: getEditorialPageDefs().length,
      resources: ALL_EDITORIAL_RESOURCES.length + getAllArticleSlugs().length,
      missingCount: uniqueMissing.length,
      missing: uniqueMissing,
    },
    null,
    2,
  ),
);

writeFileSync("tmp-content-gaps.json", JSON.stringify(uniqueMissing, null, 2));
