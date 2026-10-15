---
form: setup
form-version: 1
state: filled
points-to: null
evidence:
  - package.json@ebb9ff0
  - package-lock.json@be5ce11
  - pnpm-lock.yaml@25c2f0b
  - contact-worker/package.json@6c33394
  - contact-worker/README.md@be51814
  - .env.example@b391508
  - .github/workflows/deploy.yml@687cb41
  - astro.config.mjs@7828146
  - contact-worker/.dev.vars.example@518fbcc
invaded: 2026-10-15
---

# Setup

Use this page when getting a checkout ready to build, test, and run locally.

## Prerequisites
<!-- slot: prerequisites · required · by: invade -->
CI uses Node.js 24; the contact Worker guide requires Node.js 24 or later. The root package does not pin a package-manager version. Both npm and pnpm lockfiles are tracked.

## Install
<!-- slot: install · required · by: invade · verified: 2026-10-15 -->
`npm ci` completed successfully from the repository root, matching CI and leaving the npm lockfile unchanged.

The originally detected pnpm setup exited with ERR_PNPM_IGNORED_BUILDS.

TODO(human): should npm be the canonical package manager and the second lockfile be retired in a separate change?

## Run
<!-- slot: run · optional · by: invade -->
The root scripts expose Astro development and preview servers; the separate contact-worker package exposes Wrangler development. See package.json and contact-worker/package.json for those definitions.

TODO(human): confirm the local ports for the website and Worker; neither manifest pins them.

## Environment
<!-- slot: env · optional · by: invade -->
The frontend reads PUBLIC_CONTACT_FORM_ENDPOINT from the root .env (see .env.example); production builds receive it from the repository Actions variable. CUSTOM_DOMAIN is an optional Actions variable read by astro.config.mjs. The Worker reads RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL and ALLOWED_ORIGIN; contact-worker/.dev.vars.example lists local placeholders, and contact-worker/README.md documents secret setup. Values are not copied into this playbook.
