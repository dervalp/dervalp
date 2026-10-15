---
form: testing
form-version: 1
state: filled
points-to: null
evidence:
  - package.json@ebb9ff0
  - contact-worker/package.json@6c33394
  - .github/workflows/deploy.yml@687cb41
invaded: 2026-10-15
---

# Testing

Use this page when adding, changing, or choosing tests.

## Commands
<!-- slot: commands · required · by: invade · verified: 2026-10-15 -->
No automated test command is defined in either package manifest. The verified `npm run build` compiles and renders the static site; it does not exercise contact delivery or diagnostic interactions.

TODO(human): which test runner and initial behavior suite should a separate change introduce?

## Where tests live
<!-- slot: layout · required · by: invade -->
No tracked unit, integration or browser tests were found. There is no existing test whose style a new test can copy.

## Choosing the level
<!-- slot: levels · optional -->

## Never
<!-- slot: never · required · by: invade -->
The recorded register entries describe implementation behavior, not regression-test coverage. No existing mutation runner or coverage floor is configured.

## Test data
<!-- slot: data · optional -->
