# Public content and evidence audit

## Purpose

This audit separates statements that are structurally supported by the repository from statements that still need source evidence or owner confirmation. It is a review document, not proof that every published claim is correct.

Status labels:

- **Keep**: safe to retain as structure or neutral description.
- **Confirm**: plausible, but needs Jackie to confirm the wording and scope.
- **Evidence**: should be backed by a source such as a project record, report, analytics screenshot, contract, or calculation method.
- **Revise**: inconsistent, forecast-based, or likely to mislead without qualification.

## High-priority inconsistencies

| Topic | Current public statements | Status | Recommended action |
| --- | --- | --- | --- |
| Zhishu question count | `experience.html` says more than 10,000; the homepage, project index, and case page say 18,000+ | Revise | Select one dated, verifiable figure and use the same wording everywhere. |
| Zhishu year | The homepage lists 2025; the case badge says 2024.05–09 | Confirm | Confirm whether 2025 is a publication year or an incorrect project year. |
| Zhishu participant wording | The experience page says 500+ high-quality experts; the case page says 500+ active experts | Revise | Define whether this means registered, approved, active, or contributing experts. |
| Multi-tenant efficiency | Different pages use `70% faster`, `development cycle reduced 70%`, and `-70%`; the experience page additionally claims backend work reduced 60% and H5 work reduced 40% | Evidence | Document baseline and comparison method, then adopt one consistent expression. |
| Forecast versus outcome | Chuxing and multi-tenant cases display expected coverage and expected uplift beside achieved results | Revise | Visually separate forecasts from measured outcomes, or remove forecasts from result cards. |
| Case ordering | Homepage numbers and individual case badges do not use one stable case order | Revise | Define a single editorial order before redesigning the project index. |

## Identity and experience claims

| Claim | Location | Status | Evidence or decision needed |
| --- | --- | --- | --- |
| Tsinghua University bachelor's and master's degrees | `about.html` | Confirm | Confirm public wording, degree fields, and whether graduation years should be shown. |
| 3+ years of product-related experience | Homepage and `about.html` | Evidence | Define the start date and whether internships or adjacent operational work are included. |
| Product Manager at Beijing Jueguan Technology, 2025–present | Homepage and `experience.html` | Confirm | Confirm company display name, title, start month, and permission to publish current work. |
| China Merchants Shekou / New Voyage trainee, 2023–2024 | Homepage and `experience.html` | Confirm | Confirm official title and dates. |
| Led design and launch of a B2B2C platform covering tens of millions of users | `experience.html` | Evidence | Supply scope definition and a source for the user scale; distinguish addressable users from active or served users. |
| Supported 10+ operator provincial units and professional companies | `experience.html` | Evidence | Provide the list or an internal count that can be safely summarized. |
| Team efficiency +30%, feature penetration 30% to 90% | `experience.html` | Evidence | Preserve the original measurement period, denominator, and report source. |
| In three months: 7 projects, 423 livestreams, 1,108 leads, 5 deals, GMV RMB 31.95m | `experience.html` | Evidence | Confirm attribution, direct/assisted conversion wording, and whether GMV can be publicly disclosed. |

## Project claim matrix

| Project | Public quantitative claims | Status | Recommended treatment |
| --- | --- | --- | --- |
| Operator benefits platform | Tens of millions of distribution users; 10+ operator units | Evidence | Keep the system narrative now; publish scale only after evidence review. |
| Zhishu collaboration platform | 18,000+ questions; 500+ experts | Revise / Evidence | Resolve conflicts above and state the measurement date and quality definition. |
| Chuxing benefits ecosystem | 1 exclusive charging operator; expected 500k+ users; expected redemption +30% | Confirm / Forecast | Label partnership scope precisely and move expected figures out of achieved-results styling. |
| Multi-tenant subscription mall | 5+ tenants; expected 500k+ users; onboarding cycle -70%; backend -60%; H5 -40% | Evidence | Separate measured delivery efficiency from forecast reach; document baseline projects. |
| Physical mall | 500+ products; 99.5% fulfillment accuracy; listing efficiency +60% | Evidence | Confirm time window, order sample size, accuracy formula, and before/after workflow. |
| AI-assisted development workflow | Development cycle reduced 60%+ | Evidence | Define which tasks were compared and avoid presenting a personal estimate as a measured business result. |

## Qualitative contribution wording

The current site alternates among “led,” “responsible for,” “deeply participated,” and neutral system descriptions. Before rewriting cases, classify each project using one of these contribution levels:

1. **Owned**: Jackie had decision authority and end-to-end accountability.
2. **Led a workstream**: Jackie led a defined scope within a larger team project.
3. **Contributed**: Jackie produced or supported specific outputs without owning the overall result.
4. **Portfolio reconstruction**: the artifact demonstrates later analysis or prototyping rather than work delivered in the original project.

Every case should identify team context, Jackie's scope, major collaborators, and which outcomes can reasonably be attributed to that scope.

## Link and artifact audit

### Public portfolio slice

- Checked the homepage, About, Experience, Projects, Contact, and five featured case pages.
- All local links from these pages currently resolve to files in the repository.
- The six representative entry pages tested through the local HTTP server return HTTP 200.
- Three external evidence links require manual review because they repeatedly timed out in automated browser checks:
  - Chuxing Modao prototype
  - Zhishu Modao prototype
  - Zhishu external user-side login

External prototypes should not be the only evidence for a case. Prefer a curated local walkthrough, annotated screenshots with permission, or a short redacted demo that remains under repository control.

### Legacy prototype risks

A broader crawl found missing references outside the main public slice, including:

- starter `vite.svg` references in Vite source and compiled entry files;
- missing management pages linked from `projects/emall/staff-manage.html`;
- missing admin login pages in several `shoppingMall` prototypes;
- a JavaScript template expression misread as a file path in the quality-pricing prototype.

These do not currently break the main portfolio navigation, but each linked legacy prototype should be repaired, replaced, or retired before the final release.

## Recommended first-release scope

Keep the first redesign release intentionally small:

1. Homepage with verified positioning and no unsupported headline metrics.
2. Project index with consistent ordering, dates, and result labels.
3. Operator benefits platform as the first complete case because its current page already emphasizes product decisions without relying on large unsupported result cards.
4. About and Experience pages with confirmed dates, contribution levels, and a reduced set of evidenced outcomes.

Defer the remaining project rewrites until their quantitative claims and public evidence are confirmed.

## Owner confirmation checklist

Jackie should answer these before final public copy is written:

1. What is the correct dated count for Zhishu questions and participating experts?
2. Which year should the Zhishu project display?
3. Which multi-tenant efficiency figures have a documented baseline?
4. Are the Chuxing and multi-tenant coverage numbers forecasts or observed reach?
5. Can the operator/client counts, livestream GMV, and current-company work be disclosed publicly?
6. For each featured project, was Jackie's role owner, workstream lead, contributor, or later portfolio reconstruction?
7. Which external prototypes are still intended to be public and maintained?
