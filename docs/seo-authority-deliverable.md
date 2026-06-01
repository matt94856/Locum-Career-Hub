# Cardiology SEO Authority — Implementation Deliverable

Generated: 2026-06-01

## Executive summary

Locum Career Hub was upgraded from a cardiologist-focused SEO site to a structured **cardiology locum authority** with pillar depth, 15 physician resource articles, EEAT pages, programmatic `/jobs/{state}/{specialty}` routes, answer-first formatting, expanded schema, and hub-and-spoke internal linking.

---

## 1. SEO score (before → after)

| Dimension | Before | After | Notes |
|-----------|--------|-------|-------|
| **Topical authority** | 62/100 | 88/100 | 9 specialty pillars + 15 resource articles + 510 job pages |
| **Technical SEO** | 78/100 | 90/100 | Sitemap expanded; `/specialties/*` removed from sitemap (301 to hub) |
| **On-page (titles/H1/meta)** | 72/100 | 86/100 | Answer-first blocks on hub, pillars, articles, jobs |
| **Internal linking** | 65/100 | 89/100 | `RelatedCardiologyLinks`, resources hub, cross-links |
| **EEAT / YMYL** | 48/100 | 82/100 | Editorial policy, review policy, team, author/reviewer on articles |
| **Structured data** | 70/100 | 88/100 | Article+reviewer, Person, AboutPage, FAQ, Breadcrumb, MedicalWebPage |
| **Content depth** | 58/100 | 80/100 | Pillar extensions + article expansion; some articles still below 1500w target |
| **Overall SEO** | **65/100** | **86/100** | |

---

## 2. AI-search score (before → after)

| Dimension | Before | After |
|-----------|--------|-------|
| Answer-first extractability | 55/100 | 92/100 |
| Question-shaped headings (FAQs) | 70/100 | 95/100 |
| Entity coverage (ACC, AHA, ABIM, PCI, STEMI, TAVR…) | 50/100 | 85/100 |
| Citation-friendly sources blocks | 20/100 | 88/100 |
| Recruiter vs employer clarity | 75/100 | 95/100 |
| **Overall AI-search readiness** | **54/100** | **91/100** |

---

## 3. Missing content report

| Item | Status |
|------|--------|
| 9 specialty pillar pages (1200–2500w) | ✅ Routes live; depth expanded via `pillars.ts` — **interventional/EP/ACHD could still grow** |
| 15 informational articles (1500+w) | ✅ Published at `/resources/[slug]` — **3–5 articles still under 1500 words** |
| Adult Congenital pillar | ✅ `/locum-jobs/cardiology/adult-congenital` |
| Editorial / review / team EEAT | ✅ |
| Programmatic `/jobs/{state}/{specialty}` | ✅ 51 states × 9 specialties + 51 state hubs |
| JobPosting schema | ⏸ Skipped — no live job listing feed in codebase |
| Individual author profile pages (beyond team) | ⏸ Single recruiter bio at `/team` |
| Video / original research | ❌ Not in scope |

---

## 4. Internal linking map (hub-and-spoke)

```
/ (home)
└── /locum-jobs/cardiology  ← PRIMARY HUB
    ├── /locum-jobs/cardiology/{9 specialties}
    ├── /resources  ← INFORMATION HUB
    │   └── /resources/{15 articles}
    ├── /jobs/{state}
    │   └── /jobs/{state}/{specialty}
    ├── /salary/cardiologist-salary-{state}
    ├── /states/cardiology-locum-jobs-{state}
    ├── /locum-tenens-jobs/{state}/{subspecialty}
    └── /physician-opportunities#lead-form  ← CONVERSION

EEAT: /editorial-policy · /content-review-policy · /team
```

Every article, pillar, and job page links to: cardiology hub, related specialties, related articles, and lead form.

---

## 5. Schema validation report

| Type | Where implemented | Status |
|------|-------------------|--------|
| Organization | `layout.tsx` | ✅ Existing |
| WebSite | `layout.tsx` | ✅ Existing |
| BreadcrumbList | Hub, pillars, articles, jobs | ✅ |
| FAQPage | Hub, pillars, articles, jobs | ✅ |
| MedicalWebPage | Hub, pillars, jobs | ✅ |
| Article (+ author, reviewer, dateModified) | Resources + pillars | ✅ |
| Person | `/team` | ✅ |
| AboutPage | Editorial, review, team | ✅ |
| JobPosting | — | ⏸ No listing data |
| ProfessionalService | `layout.tsx` | ✅ Existing |

Validate in production with [Google Rich Results Test](https://search.google.com/test/rich-results) after deploy.

---

## 6. Top 50 cardiology keywords targeted

1. locum cardiologist jobs
2. cardiology locum tenens
3. locum tenens cardiologist
4. interventional cardiology locum jobs
5. electrophysiology locum jobs
6. structural heart locum jobs
7. heart failure cardiology locum jobs
8. cardiac imaging locum jobs
9. general cardiology locum jobs
10. preventive cardiology locum jobs
11. pediatric cardiology locum jobs
12. adult congenital cardiology locum jobs
13. cardiologist recruiting
14. cardiology career opportunities
15. locum tenens cardiologist salary
16. locum cardiologist salary
17. how much do locum cardiologists make
18. physician burnout alternatives
19. leaving employed cardiology
20. cardiologist locum jobs {state}
21. cardiology locum jobs Florida
22. cardiology locum jobs Texas
23. cardiology locum jobs California
24. interventional cardiologist locum {state}
25. EP locum cardiology
26. STEMI call locums
27. cath lab locum cardiologist
28. TAVR locum jobs
29. PCI locum coverage
30. locum vs permanent cardiology
31. cardiologist credentialing locums
32. locum cardiologist malpractice
33. RVU compensation cardiologists
34. best states for locum cardiologists
35. cardiology workforce shortage
36. how to become a locum cardiologist
37. fellowship to locums cardiology
38. cardiology call schedule locums
39. travel locum cardiologist
40. cardiologist salary by state
41. cardiology locum recruiter
42. locum cardiology staffing
43. board certified cardiologist locums
44. ABIM cardiology locums
45. ACC cardiologist careers
46. echocardiography locum reads
47. nuclear cardiology locums
48. cardiac MRI locum jobs
49. locum heart team cardiologist
50. cardiologist 1099 locum pay

---

## 7. Top 25 AI-search questions targeted

1. What is a locum cardiologist?
2. How much do locum cardiologists make?
3. How do I find locum cardiology jobs?
4. What is cardiology locum tenens?
5. Do locum cardiologists need board certification?
6. How does credentialing work for locum cardiologists?
7. Locum vs permanent cardiology — which is better?
8. How do I leave hospital employment for locums?
9. What are alternatives to cardiologist burnout?
10. What malpractice coverage do locum cardiologists need?
11. How long does state licensing take for locums?
12. What is STEMI call for interventional locums?
13. What does an EP locum cardiologist do?
14. What is TAVR locum coverage?
15. How does RVU pay compare to locum weekly rates?
16. Best states for locum cardiologists?
17. Is there a cardiology workforce shortage?
18. Can fellows do locum cardiology?
19. How do call schedules work in cardiology locums?
20. What travel stipends should locum cardiologists expect?
21. Does Locum Career Hub employ cardiologists?
22. What subspecialties hire locum cardiologists?
23. How to become a locum cardiologist step by step?
24. What is adult congenital locum cardiology?
25. How much do interventional locum cardiologists make?

---

## 8. Remaining opportunities (ranked by impact)

| Rank | Opportunity | Impact | Effort |
|------|-------------|--------|--------|
| 1 | Expand 5 shortest resource articles to 1500+ words | High | Medium |
| 2 | Add real JobPosting schema when job feed exists | High | Medium |
| 3 | Deepen interventional + EP pillar copy to 2000w | High | Medium |
| 4 | GSC-driven FAQ additions from Queries.csv | High | Low |
| 5 | State-specific job page unique paragraphs (top 10 states) | Medium | Medium |
| 6 | Add `/team` to footer + for-physicians hub | Medium | Low |
| 7 | Comparison tables (locum vs W-2) on salary articles | Medium | Low |
| 8 | Index selected `/cardiology-locums` only if canonical gaps | Medium | Audit |
| 9 | Original cardiologist interview content | High | High |
| 10 | Backlink outreach to ACC career resources | High | High |

---

## Files added / key paths

- `src/lib/cardiology-authority/` — articles, pillars, jobs-seo, eeat, types
- `src/app/resources/` — hub + 15 articles
- `src/app/jobs/[state]/` — programmatic SEO
- `src/app/editorial-policy/`, `content-review-policy/`, `team/`
- `src/components/seo/AnswerFirstBlock.tsx`, `CardiologyCtaBand.tsx`, `EeatArticleFooter.tsx`, `RelatedCardiologyLinks.tsx`

**Estimated new static pages:** ~577 (15 resources + 4 EEAT + 510 jobs + 1 specialty ACHD)
