# Contact and leads: invariants

## N-CONTACTANDLEADS-1
Contact delivery keeps the private recipient and provider API key out of the website bundle.
Source: contact-worker/README.md#contact-worker
Enforced by: contact-worker/src/index.ts
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-CONTACTANDLEADS-2
The deployed Worker URL is configured for both local and production frontend builds.
Source: contact-worker/README.md#deploy
Enforced by: unenforced
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-CONTACTANDLEADS-3
Contact submissions use the request and response contract documented for the Worker.
Source: contact-worker/README.md#request-contract
Enforced by: contact-worker/src/index.ts
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-CONTACTANDLEADS-4
The Worker rejects other origins and accepts actual submissions only through POST; allowed-origin preflight requests receive an empty 204 response.
Source: contact-worker/src/index.ts
Enforced by: contact-worker/src/index.ts
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-CONTACTANDLEADS-5
The Worker requires a trimmed name of at most 120 characters, a matching email of at most 160, and a message of at most 4000; optional company is limited to 160.
Source: contact-worker/src/index.ts
Enforced by: contact-worker/src/index.ts
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-CONTACTANDLEADS-6
A filled website honeypot receives apparent success without sending email; valid messages use the configured recipient and the submitter as reply-to.
Source: contact-worker/src/index.ts
Enforced by: contact-worker/src/index.ts
Stated: 2026-10-15
Proposed: invade 2026-10-15
