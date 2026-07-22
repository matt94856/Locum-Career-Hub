# Cardiologist-only SEO relaunch

## Positioning

Locum Career Hub recruits **cardiologists (MD/DO) only** for locum tenens assignments. We are a physician recruiting service connecting cardiologists with hospitals and groups—we are not the hiring employer.

## Sitemap

- Production URL: `https://www.locumcareerhub.com/sitemap.xml`
- Includes: static pages, landings, cardiology subspecialty hubs, legacy `/locum-tenens-jobs` hubs, state × subspecialty pages, **new SEO structure** (`/cardiology-locum-jobs`, `/states`, `/cities`, `/salary`, `/guides`), legacy `/cardiology-locums`, glossary, and blog.

## New SEO URL structure

| Hub | Example |
|-----|---------|
| Money pages | `/cardiology-locum-jobs/interventional-cardiology-locum-jobs` |
| States (51) | `/states/florida-cardiology-locum-jobs` |
| Cities (~180) | `/cities/miami-cardiology-locum-jobs` |
| Salary | `/salary/locum-cardiologist-salary` |
| Guides | `/guides/how-to-become-a-locum-cardiologist` |

Root shortcuts (301): `/interventional-cardiology-locum-jobs` → `/cardiology-locum-jobs/...`

## Lead form & Supabase

- Project: **Locum Career Hub** (`brvpiiwixvzzbjtuiudh`)
- Table: `physician_leads`
- API: `POST /api/lead` (main form, calculator, decision tools) and `POST /api/newsletter`
- `source` examples: `lead_form`, `newsletter`, `cardiologist_locums_calculator`, `decision_tool_{toolId}`
- Tool/calculator payloads, attribution, and page path are stored in `metadata` jsonb; generated columns `form_mode`, `page_path`, `home_state`, `tool_id` make filtering easier in the Table Editor
- Env required in production (Netlify → Environment variables, scope All): `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) + `SUPABASE_SERVICE_ROLE_KEY`
- Inserts use the service role only; anon/authenticated have no table privileges

## Google Search Console steps

1. Deploy the build to production (Netlify).
2. Open **URL inspection** on the homepage and request indexing.
3. Go to **Sitemaps** → submit `sitemap.xml` (or full URL above).
4. Monitor **Pages** for redirect coverage on removed multi-specialty URLs (`/specialties/hospitalist-medicine`, etc.).
5. Review **Queries** for cardiologist-intent terms; tune titles in `src/lib/serp-ctr.ts` as data accrues.

## Redirects

Removed specialty hubs and state×specialty URLs 301 to `general-cardiology` equivalents. Removed landings (`hospitalist-locum-jobs`, `emergency-medicine-locum-jobs`, `crna-locum-jobs`) redirect to cardiology hubs.
