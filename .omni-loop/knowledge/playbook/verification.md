---
form: verification
form-version: 1
state: filled
points-to: null
evidence:
  - package.json@ebb9ff0
  - contact-worker/package.json@6c33394
  - .github/workflows/deploy.yml@687cb41
invaded: 2026-10-15
---

# Verification

Use this page when handing off changes: what must be green before a pull request, and before a push.

## The preflight
<!-- slot: preflight · required · by: invade · verified: 2026-10-15 -->
`npm run build` passed after npm ci, rendering 29 static pages. It is both the slice and feature preflight. It is a build check, not a full TypeScript analysis or behavioral test suite.

## Before every push
<!-- slot: before-push · optional · by: invade · verified: 2026-10-15 -->
The available local preflight is `npm run build`. No tracked pre-commit or pre-push hook is configured. The Pages deployment workflow does not run on pull requests.

## Checks
<!-- slot: checks · optional · by: invade -->
Neither manifest defines lint, typecheck or test scripts. No extra checks are claimed. This discovery also ran the kit’s knowledge, playbook and aggregate checks; their results are recorded in the pull request.
