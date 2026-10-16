---
prd: 29
title: Executive-builder website refresh and name-search discoverability
blocked-by: none
spec: file
areas: [professional-site, site-foundation, editorial, diagnostics, contact-and-leads]
---

## Problem

Pierre Derval wants CEOs and CTOs of SaaS companies and large enterprises to consider him for AI/product leadership and paid consulting. The current site opens with the abstract headline “AI. Shipped.”, gives diagnostic tools the next major section, and describes him on About primarily as a consultant after CluedIn. It does not present his current Vertuoza role or Omni-loop prominently. Its muted palette and repeated cards do not communicate the executive-builder identity he wants.

Pierre also reports weak visibility for searches of his name. Search sampling found his LinkedIn and other profiles, but it did not establish a ranking baseline, indexation status or cause. The source already includes a title, canonical URLs and Person/WebSite structured data: this PRD improves and validates them rather than assuming SEO is absent. The sitemap currently omits important public pages. GitHub Pages serves the project at https://dervalp.github.io/dervalp/ with no custom domain configured at discovery.

## Solution

One coordinated refresh of the existing Astro site: lead with the person and current work, show credible proof, make the consulting invitation clear, and expose a consistent professional identity in crawlable page content and metadata.

### Experience and visual direction

Use a warm ivory canvas, near-black project sections, large editorial typography, a prominent existing portrait, one vivid accent and restrained motion. Retain a usable dark theme. Replace generic repeated card grids on the marketing surfaces with deliberate hierarchy, project narratives and editorial rows. The five existing diagnostic tools remain available with their calculations and export/contact behavior intact.

Homepage order:

1. Name, portrait and “From AI ambition to shipped products.” Headline/supporting text identifies Pierre as an AI & Product Executive and Head of AI at Vertuoza. Primary action “Discuss your challenge” links to the existing Contact route; the downloadable CV remains a secondary action.
2. Two prominent current-work stories: Vertuoza (AI Advisor and MCP capabilities brought into production in partnership with the Platform team) and Omni-loop (the framework Pierre created for AI-assisted software development and iterative delivery). Link the latter to https://www.omni-loop.xyz/.
3. Selected prior-career outcomes and existing testimonials. The CV explicitly puts the quantified adoption, delivery and onboarding outcomes before Vertuoza; label this group accordingly and do not imply those numbers measure Vertuoza or Omni-loop. Use specific company attribution only when the source explicitly supports it.
4. Three consulting engagement themes: AI/product direction; platform and delivery assessment; hands-on executive advisory. Explain the problem each helps a CEO/CTO address without inventing fixed packages, prices, delivery promises, client names or availability.
5. Selected articles and a compact gateway to all five diagnostic tools, followed by a clear contact invitation.

Bring About, Services, How I help and Contact into the same hierarchy and voice. About starts with the current Vertuoza role (2026–present), then the CluedIn timeline, and gives Omni-loop a current-work section. Existing Ikary material may remain a secondary project; it must not displace the two approved current-work stories. Keep existing public URLs and blog content.

### Technical search discoverability

- Keep the current GitHub Pages URL/base path for this PRD. A custom-domain migration is a separate decision, not a prerequisite or an assumed purchase.
- Make Pierre’s full name and current role readable in rendered HTML, with distinct page titles/descriptions and semantic headings. Use the actual name and role naturally, not repeated keyword blocks.
- Keep one canonical identity and absolute, base-aware URLs across canonical tags, social metadata, structured data and sitemap. Retain stable Person/WebSite identifiers, enrich the Person with accurate current job/employer, portrait and verified sameAs links. The About page can be represented as ProfilePage with the same Person main entity; never invent qualifications, ratings or endorsements.
- Include the homepage, About, Services, How I help, Contact, tool index, all five tool pages, blog index and every published blog article in the sitemap. Retain functioning existing archives/category/tag links; archive indexation policy is unchanged. Draft articles remain excluded.
- Review generated robots policy without claiming that wildcard rules currently block Google: Googlebot is explicitly allowed in the source. The project-generated /dervalp/robots.txt is not an authoritative host-root robots.txt. Document and check the actual host-root policy at deployment only when access is available; modifying that separate host-root deployment is not part of this repository change. A local project file must never be presented as having fixed root-level crawling.
- Preserve the existing public CV URL while updating its downloadable document from Pierre’s supplied 2026 v5 CV; review the public document as part of the feature PR. Do not publish the source attachment elsewhere or copy its phone/email into new page copy.
- Add a deployment/Search Console checklist: verify the URL-prefix property, submit the final sitemap, inspect the canonical/indexing status of home/About/Services, and record a branded-query baseline for “Pierre Derval” after access is granted. These are human/external follow-up steps, not reasons to fabricate evidence or hold the repository change indefinitely.

## Decisions

- Audience, stated by Pierre: CEOs and CTOs of SaaS and large companies considering him for hiring and well-paid consulting.
- Visual direction chosen by Pierre: executive builder — bold editorial typography, warm light background, dark project sections and restrained vivid accents.
- Complete bounded design approved in chat on 2026-10-16. This is an existing-site refresh; it adds no application subsystem, contact service or diagnostic scoring model.
- Phase 0 uses a review PR: the server flag returned `phase 0: pr · the flag could not be read: refused (403)` at the start of the brainstorm. No server birthplace is declared.
- Design craft is currently off in repository configuration; keep it off in this PRD. The approved mockup guides delivery, but no screen or law is locked. No personas or confirmed business claims were available from the refused business read; none are invented.
- Proof video and optional e2e workflow are not requested because their configuration is unset/disabled. Observable acceptance criteria below still require responsive browser review and meaningful technical output checks.
- Career source: the user-supplied `Pierre_Derval_CV_AI_Product_Executive_2026_v5.pdf`, read in full (two pages). Preserve its attribution and dates. Product-description source: https://www.omni-loop.xyz/, inspected 2026-10-15. Its current public description calls Omni Loop a delivery framework for coding agents; do not reuse unrelated products with similar names or claim a personal ownership/legal relationship beyond Pierre’s stated authorship.
- The before/after is a source-derived schematic of current page structure beside the proposed layout, not a screenshot of the live website. The portrait area is a schematic; implementation uses the existing Pierre photograph, not generated likenesses. Live browser inspection of the GitHub Pages site was declined; do not claim it was completed.
- No ranking position is promised. Success is correct, observable technical signals plus a better presentation and a measurement plan; changes in Google ranking are an external outcome.

## User stories

- As a CEO/CTO, I can identify Pierre, his current role and the problems he helps address within the opening viewport.
- As a prospective client, I can distinguish his recent work from earlier outcomes and judge whether to discuss a mandate.
- As a visitor on a phone or using a keyboard, I can read the story and reach Contact, the CV, Omni-loop, articles and tools.
- As a search crawler, I receive consistent public identity information, canonical URLs and a complete sitemap without JavaScript-only essential copy.
- As Pierre, I can measure indexation and branded-search performance once Search Console access is available.

## Scope

Included: marketing copy/structure, existing portrait placement, shared typography/colour/layout/motion, homepage, About, Services, How I help, Contact presentation, navigation/footer, CV replacement at its existing URL, page/social metadata, Person/WebSite/ProfilePage data where appropriate, sitemap, base-path correctness, crawl-policy review and a small SEO output-check suite plus external validation checklist.

Excluded: custom-domain purchase/migration, changing the Omni Loop product/app, publishing new editorial articles, translating the site, changing diagnostic questions/calculations/exports, changing contact payload/Worker/Resend routing, a new CRM or booking service, prices or inferred availability, invented testimonials/results, an external-profile editing campaign, analytics/account permissions, and promises of a first-place ranking. Existing analytics configuration is preserved; sensitive contact data is not added to it.

## Test seams

The current repository has no automated test runner scripts. Both configured preflights are `npm run build`; that builds static pages but is not behavioral or full type analysis. Keep that distinction explicit.

Use the existing npm lockfile and `npm ci` before local checks. Add a small Node built-in test-runner suite for generated public output, with a single stable script documented in the feature PR. It should fail on omitted required sitemap routes, wrong base paths/canonicals, inconsistent Person identity or malformed JSON-LD, and draft article leakage. Derive draft/public article expectations from the content source; do not add a new published article solely as a fixture. Tests exercise output contracts rather than exact copy, CSS class names or snapshotting the implementation. Demonstrate meaningful failure by removing a required route or changing a canonical in a temporary generated-output fixture, then restore it and verify green; never commit build output. A parser dependency is optional only if needed for robust output inspection; do not add a broad UI test framework for text/style changes.

Run desktop/mobile browser review of the actual feature build, at 1440, 768 and 390 CSS-pixel widths, and both themes. Check keyboard traversal, focus visibility, readable contrast, reduced-motion behavior, no horizontal overflow, navigation/base links, CV download, Omni-loop link and preserved form/tool interfaces. The existing portrait must load at appropriate dimensions without layout shifts. Keep essential content visible if JavaScript or reveal observers fail. Check a representative blog page and all five tool entrypoints for shared-style regressions. Review current-work wording against the supplied CV. Any unavailable live crawl/Search Console check is explicitly marked not run, with the human checklist supplied.

## Risks

The locked laws: none touched. All discovered register entries are proposals, not confirmed laws.

The approved work preserves the contact-and-leads, editorial and diagnostic invariants; no scoring or delivery contracts change. Global styling can affect existing tools and blog pages, so each shared-style change requires representative regression review. The CV contains professional contact information and becomes the public download at its existing location; reviewers must inspect that exact document before feature merge. Public HTML must not acquire additional private contact details.

The repository has no PR-triggered build workflow: do not treat an empty checks list as proof of a passing build. Local build/output checks and browser evidence must be reported. Third-party search sampling is not equivalent to Search Console data. Root-host robots configuration and indexing require checks outside this repository, and remain explicit follow-up when access is unavailable.

Merging the feature PR triggers GitHub Pages deployment on main. Roll back with a revert PR restoring prior site assets/copy/metadata/CV and redeploy through the existing workflow; no stored data migration or Worker deployment is required. Merging this docs-only phase-0 PR also triggers the existing build but changes no public source page.

## Acceptance criteria

1. The opening viewport identifies Pierre Derval as an AI & Product Executive and Head of AI at Vertuoza, contains the approved headline, shows his existing portrait, and offers “Discuss your challenge” linking to Contact plus access to the CV.
2. The homepage presents Vertuoza and Omni-loop before the prior-career outcomes and before the diagnostic-tool/article sections. Vertuoza credits the Platform team for AI Advisor/MCP production work; Omni-loop links to the official site and identifies Pierre’s authorship without unsupported ownership claims.
3. The outcome group is explicitly labelled as prior to Vertuoza. About starts its timeline with Vertuoza (2026–present) and preserves the supplied CV’s earlier role chronology. No new quantitative claim or testimonial is invented.
4. Services and How I help present the three approved consulting themes in language for CEOs/CTOs, with Contact as the next step and no fabricated package prices, deadlines or employment availability.
5. At 390, 768 and 1440 CSS pixels, in light and dark themes, the homepage and About remain readable, primary controls are reachable by keyboard, visible focus remains clear and the viewport has no horizontal overflow. Reduced-motion preference removes nonessential motion. Existing blog/tool pages remain usable after shared styling changes.
6. Navigation, current article/tool URLs and contact/export interfaces retain their existing destinations and contracts. The public CV URL serves the supplied latest document; private details are not newly added to the page or analytics.
7. Each affected marketing page has a distinct descriptive title/meta description, one clear semantic H1, a canonical URL with the correct deployed origin/base path, and consistent absolute social URLs. Essential name/role copy is present in built HTML even without JavaScript.
8. JSON-LD parses and uses one stable Person identifier with accurate name, current role, Vertuoza employer, portrait and verified profile links. WebSite and any ProfilePage refer consistently to that identity.
9. The sitemap contains all named primary/marketing/tool pages and every published blog article under the configured base; it excludes draft articles and contains no example.com or doubled base path. Existing canonical/base behavior is checked in both the project-subpath configuration and a local custom-origin test configuration without migrating hosting.
10. The crawl-policy checklist distinguishes project robots output from the host-root authority, does not assert that Google was blocked by the explicit allowlist, and records any unavailable host/live checks honestly.
11. `npm run build` and the new targeted output checks pass. The feature PR records meaningful red/green evidence for the SEO checks and actual responsive browser-review results; absent full behavioral/typecheck coverage is not represented as passing.
12. A versioned SEO follow-up checklist gives the exact deployed URL-prefix/sitemap, Search Console inspection steps and baseline fields for the branded query. It explicitly states which require Pierre’s access and that rankings are measured after deployment, not guaranteed by this change.
