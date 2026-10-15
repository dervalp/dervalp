---
form: releasing
form-version: 1
state: filled
points-to: null
evidence:
  - .github/workflows/deploy.yml@687cb41
  - contact-worker/README.md@be51814
  - contact-worker/package.json@6c33394
invaded: 2026-10-15
---

# Releasing

Use this page when you need to know what a merge publishes.

## What a merge publishes
<!-- slot: publishes · required · by: invade -->
A push to main triggers the website build and GitHub Pages deployment, including documentation-only merges. The workflow uploads dist. The contact Worker is a separately deployed service.

## How a release happens
<!-- slot: how · optional · by: invade -->
See: .github/workflows/deploy.yml

## Rollback
<!-- slot: rollback · optional · by: invade -->
The tree does not document how to restore a prior Pages deployment or Worker version.

TODO(human): confirm the approved rollback procedure for each service.

## Release notes
<!-- slot: notes · optional · by: invade -->
No tracked changelog, release-note workflow or changeset configuration was found. Kit release notes are disabled in the current configuration.
