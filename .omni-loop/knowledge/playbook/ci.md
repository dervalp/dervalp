---
form: ci
form-version: 1
state: filled
points-to: null
evidence:
  - .github/workflows/deploy.yml@687cb41
  - package.json@ebb9ff0
  - pnpm-lock.yaml@25c2f0b
  - package-lock.json@be5ce11
invaded: 2026-10-15
---

# CI

Use this page when a check on your pull request is red.

## Workflows
<!-- slot: workflows · required · by: invade -->
See: .github/workflows/deploy.yml

## What gates a merge
<!-- slot: gating · required · by: invade -->
The tracked Pages workflow triggers on pushes to main and manual dispatch only. Therefore a mergeable pull request can legitimately report no workflow checks. The branch-rules endpoint returned an empty list; required-status-check protection returned 404.

TODO(human): confirm whether main should require a build check before merge; no required check could be established from these responses.

## Known reds
<!-- slot: known-reds · optional · by: invade -->
No documented known-red check was found. The local pnpm install failed with ERR_PNPM_IGNORED_BUILDS; npm ci and the site build passed. npm ci reported existing dependency audit findings.

TODO(human): schedule dependency review separately; no dependencies were changed in this documentation proposal.

## When to re-run
<!-- slot: rerun · optional -->

## Budgets
<!-- slot: budgets · optional · by: invade -->
Context ceilings are recorded in .omni-loop/budgets/context.json (budgets.context.file). Trim content before raising a ceiling; a necessary increase requires a high outbox item answered by a person. Initial ceilings are measured from this proposal.

TODO(human): the session reads 38735 bytes, over the 24 KiB guideline, chiefly because the four approved blog-context files total 34940 bytes. Which essays should be linked rather than loaded each session?
