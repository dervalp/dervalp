# Diagnostics: invariants

## N-DIAGNOSTICS-1
The business-case verdict requires both average and weakest-dimension thresholds: strong at 72/50, promising at 55/35, and early at an average of 35.
Source: src/data/aiBusinessCaseScorecard.ts
Enforced by: src/data/aiBusinessCaseScorecard.ts, src/components/AIBusinessCaseScorecard.tsx
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-DIAGNOSTICS-2
Both readiness checklists round checked items divided by total items to a percentage and use verdict boundaries at 80, 55 and 30 percent.
Source: src/components/AIReadinessChecklist.astro
Enforced by: src/components/AIReadinessChecklist.astro, src/components/DataReadinessChecklist.astro
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-DIAGNOSTICS-3
Approach fit normalizes each approach against its own possible maximum and compares relative fit using boundaries at 0.92, 0.65 and 0.40.
Source: src/components/AIApproachFinder.tsx
Enforced by: src/components/AIApproachFinder.tsx
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-DIAGNOSTICS-4
The project scoper classifies dimension totals up to 4 as critical and up to 6 as needing attention; selected approach and score conditions determine which tasks appear.
Source: src/components/AIProjectScoper.astro
Enforced by: src/components/AIProjectScoper.astro
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-DIAGNOSTICS-5
Report export requires a syntactically valid email; a failed lead transmission does not prevent the report download.
Source: src/utils/exportDialog.ts
Enforced by: src/utils/exportDialog.ts, src/utils/leadCapture.ts
Stated: 2026-10-15
Proposed: invade 2026-10-15
