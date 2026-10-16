# Executive-builder website refresh: delivery plan

PRD #29; specification: `spec.md` beside this plan. Feature branch `feat/executive-website-refresh` targets `main` with `Closes #29`. Slice branches `feat/executive-website-refresh--s1` through `--s4` target that feature branch, each with `Part of #29`. No source has been implemented in phase 0. Every slice follows the approved before/after and preserves existing public routes, diagnostic behavior and contact contracts.

## Slices

| id | slice | territory | blocked by | wave | tier |
| --- | --- | --- | --- | --- | --- |
| s1 | A visitor reads an accurate current career story and can download the latest CV | `src/data/site.ts` `src/pages/about.astro` `public/Pierre_Derval_Resume.pdf` | — | 1 | build |
| s2 | A CEO or CTO sees the executive-builder homepage and a coherent accessible shared shell | `src/pages/index.astro` `src/styles/global.css` `src/layouts/BaseLayout.astro` `src/layouts/BlogLayout.astro` `src/components/HeaderNav.astro` `src/components/ThemeToggle.astro` `src/components/IconLink.astro` `src/data/site.ts` `src/pages/about.astro` | s1 | 2 | build |
| s3 | Prospective clients understand the three engagement themes and reach the existing contact flow | `src/pages/services.astro` `src/pages/how-i-help.astro` `src/pages/contact.astro` `src/components/ContactPanel.astro` `src/data/site.ts` `src/styles/global.css` | s2 | 3 | build |
| s4 | Crawlers receive complete consistent identity signals with verified output and a search follow-up checklist | `src/layouts/BaseLayout.astro` `src/layouts/BlogLayout.astro` `src/pages/index.astro` `src/pages/about.astro` `src/pages/services.astro` `src/pages/how-i-help.astro` `src/pages/contact.astro` `src/pages/tools/` `src/pages/sitemap.xml.ts` `src/pages/robots.txt.ts` `src/utils/url.ts` `src/data/site.ts` `astro.config.mjs` `public/og-image*` `package.json` `package-lock.json` `tests/seo*` `tests/fixtures/seo/` `docs/seo.md` | s3 | 4 | build |

Shared ground:

- `src/data/site.ts`: all four slices. Waves 1–4 serialize copy, presentation and metadata edits.
- `src/pages/about.astro`: s1, s2 and s4; waves 1, 2 and 4 separate current-career content, presentation and metadata.
- `src/styles/global.css`: s2 and s3; waves 2 and 3 keep homepage/shared styling and commercial-page refinements apart.
- `src/layouts/BaseLayout.astro`, `src/layouts/BlogLayout.astro`, `src/pages/index.astro`: s2 and s4; waves 2 and 4 separate the shared-shell refresh from SEO integration.
- Services, How I help and Contact: s3 and s4; waves 3 and 4 separate readable commercial content from page-specific metadata/output checks.
- No existing tests import these files: the repository has no tracked tests. The generated-output suite and any output fixtures belong solely to s4, so no future slice is implicitly assigned an undeclared shared test. Expand territory before editing any new shared file, rather than treating it as incidental.
- No generated output is committed or declared as territory. Build output in `dist/` and Astro caches are verification artifacts only.

## Per slice: done when

### s1

- About begins with Vertuoza, Head of AI, 2026–present, and credits collaboration with the Platform team for AI Advisor/MCP production work.
- Omni-loop’s current description and Pierre’s authorship are clear, with the official URL. Existing Ikary work stays secondary if retained.
- Chronology and current-role wording are checked against the supplied two-page v5 CV. The source PDF is available in the current chat; if a new session cannot access it locally, request that same source rather than inventing or reconstructing a CV.
- Earlier 80% adoption, weeks-to-hours delivery and onboarding/SaaS outcomes remain labelled before Vertuoza; unsupported current-role metrics and availability claims are absent.
- The public resume URL is unchanged and its PDF is the supplied latest version; inspect it for accidental corruption and include the exact changed document in feature review. Do not add its phone/email into new HTML or analytics.
- `npm ci` then `npm run build` pass. This is content/CV work: source comparison and rendered review provide appropriate evidence, not tests that merely duplicate prose.

### s2

- Homepage follows the approved order: personal identity/portrait/contact action; Vertuoza and Omni-loop; attributed prior outcomes/testimonials; engagements; writing/tools; closing contact invitation.
- The warm ivory/near-black/accent direction, editorial hierarchy and existing portrait match `before-after.html`; the schematic portrait is never shipped. Dark mode stays usable and essential copy is present without reveal scripts.
- Shared navigation/footer and About presentation belong to the same visual system. Existing links/base paths and route names remain intact; all five tools remain reachable.
- Review actual local feature pages at 1440, 768 and 390 CSS pixels, light/dark themes, keyboard focus and reduced motion. Inspect a representative article and every tool entrypoint for global-style regressions; record screenshots/observations in the sub-PR and feature PR. Mock comparison controls are not production UI.
- `npm run build` passes; no contact or scoring implementation changes are present in the diff.

### s3

- Services and How I help explain AI/product direction, platform/delivery assessment and hands-on executive advisory for CEOs/CTOs, with the existing Contact route as the next step.
- Contact presentation is consistent with the approved identity. It makes no claims of fixed prices, deadlines, guaranteed outcomes or inferred job availability.
- Existing contact form attributes, client payload, endpoint handling and success/error behavior remain compatible; do not send test messages to production. No Worker or provider change is needed.
- Check commercial-page desktop/mobile layouts in both themes and keyboard navigation; the homepage/shared shell has no regression from any global-style refinement.
- `npm run build` passes; report actual manual evidence and avoid creating tests that mirror static copy.

### s4

- A small Node built-in generated-output check suite proves required sitemap coverage, correctly based canonical/social URLs and a consistent parseable Person/WebSite/ProfilePage identity. It also proves draft article exclusion and essential identity copy in static output, without exact-copy or CSS-class snapshots.
- Before fixing SEO output, capture failing evidence for an existing real gap (for example omitted About/Services/tool sitemap routes). Test the suite’s discrimination using a temporary output fixture with a required route removed or canonical changed, see red, restore and see green. Add an HTML parser dependency only if it is necessary for robust inspection; do not install a broad UI harness.
- Every public primary route and published article listed by the spec is present in the sitemap with the correct origin and `/dervalp/` base. Validate a local custom-origin configuration too, without changing the deployed domain or publishing test output. Drafts and `example.com`/double-base URLs are absent.
- Page titles/descriptions, one clear H1 per page, JSON-LD Person role/employer/portrait and verified profile links agree with readable content. Website/ProfilePage references reuse the same Person ID. Metadata changes do not break the source-derived accessibility/layout review.
- Crawl-policy review distinguishes project output from the authoritative host-root file. Existing Googlebot allow rules are interpreted accurately. `docs/seo.md` names the exact production property/sitemap and human-only Search Console tasks, baseline fields and all live checks not run.
- The follow-up checklist separates repository acceptance from post-deployment ranking outcomes; no ranking guarantee or invented Search Console evidence appears.
- `npm run build` and the documented targeted output-check command pass. Repeat the actual browser sanity check on the finished homepage, About, commercial pages, one article and five tool entrypoints. The feature PR reports red/green evidence, responsive review, skipped checks and rollback before it can become ready.
