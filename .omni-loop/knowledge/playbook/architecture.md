---
form: architecture
form-version: 1
state: filled
points-to: null
evidence:
  - astro.config.mjs@7828146
  - package.json@ebb9ff0
  - contact-worker/src/index.ts@2e369a2
  - src/content/config.ts@28d4032
  - src/utils/url.ts@725a0cc
  - src/utils/leadCapture.ts@ffd190e
invaded: 2026-10-15
---

# Architecture

Use this page when deciding where code goes, and what it may depend on.

## Layout
<!-- slot: layout · required · by: invade -->
The root is an Astro static website with React interactive components and Tailwind styling. src/pages owns routes, src/layouts shared shells, src/components UI, src/data static content and scoring definitions, src/content/blog editorial articles, and src/utils shared helpers. contact-worker is a separate Cloudflare Worker package. The five proposed domain folders describe ownership; the source remains in shared directories.

## Boundaries
<!-- slot: boundaries · required · by: invade -->
Static pages and browser code send contact and diagnostic leads to PUBLIC_CONTACT_FORM_ENDPOINT. Only contact-worker reads Resend secrets and sends provider requests. There is no database or workspace package graph in the tracked tree. No lint rule enforces the proposed domain boundaries.

## Patterns
<!-- slot: patterns · optional · by: invade -->
Blog metadata is validated by the Astro content schema. The Worker performs field checks after asserting the JSON type; this is not a general runtime object schema. Shared URL helpers account for the configured Astro base path.
