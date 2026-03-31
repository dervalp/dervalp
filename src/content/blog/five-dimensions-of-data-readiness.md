---
title: "Five Dimensions of Data Readiness — and Why Each One Matters"
excerpt: "Before any AI project starts, five questions about your data need honest answers. Access, quality, ownership, compliance, and currency. Here is what each one reveals — and what happens when you skip it."
author: "Pierre Derval"
publishDate: 2026-03-31
category: "Data Strategy"
tags: ["data", "readiness", "ai", "strategy", "enterprise"]
cta: "data-readiness"
draft: false
---

When I ask a client whether their data is ready for an AI project, the answer is almost always yes. The assessment almost always says otherwise.

This is not dishonesty. It is a gap between what people believe about their data and what the data actually is. Most organisations have never had a reason to look closely. Reports run. Dashboards refresh. Everything seems fine.

AI changes that. A model does not tolerate the ambiguity a spreadsheet hides. It surfaces every inconsistency, every gap, every field that was documented once and never updated. The problems that were invisible become visible, loudly, at the worst possible time.

I assess data readiness across five dimensions. Each one tests a different category of risk. Missing any one of them has consequences that are entirely predictable in hindsight and entirely avoidable if you look early enough.

## 01 — Accessibility: Can you actually reach the data — not just in theory?

> *My take: Access is the most practical dimension and the one that catches people most off guard. Everyone knows where the data lives. Fewer people know what it actually takes to get to it. Approval chains, legal review, IT security processes, and system compatibility issues all sit between "the data exists" and "we can use it." I have seen projects lose two months to access processes that nobody had mapped before the build started.*

The question is not whether the data is accessible in principle. It is whether there is a stable, repeatable, automated way to extract it for the use case at hand. A manual export via spreadsheet is not a data pipeline. A one-time extract for a pilot is not a production data source.

Connectivity matters too. Data that lives in a legacy on-premise system, behind a firewall with no API, requires significant integration work before a model can touch it. If multiple sources need to be joined, there has to be a reliable key across systems. Organisations often assume that key exists. Often it does not.

> **What to check:** Map the extraction process end to end before committing to a timeline. Identify every approval required, every system boundary to cross, and every transformation needed to get from raw source to usable input. If any step takes more than a day to clarify, factor that into the project plan explicitly, not as an assumption that it will sort itself out.

## 02 — Quality: Is the data fit for the specific job, not just good enough in general?

> *My take: Data quality is not a binary. Every dataset has known issues that have been tolerated because the downstream impact was acceptable. For a monthly report, a five percent null rate in a field might be fine. For an AI model that makes decisions based on that field, it is not. The bar for AI is higher than for almost any other use of the same data, and most organisations have not calibrated for that.*

Quality has several components that need to be assessed separately. Completeness: are the fields that matter actually populated? Accuracy: does the data reflect what it claims to represent? Consistency: are the same things described the same way across the dataset? Freshness: is it current enough to be meaningful for the use case?

Beyond those basics, AI introduces two quality requirements that traditional data work rarely considers. The first is sufficient volume: enough historical examples to train, fine-tune, or meaningfully evaluate a model. The second is bias: historical data reflects historical decisions, including ones that should not be replicated. If the use case affects people, a bias review is not optional.

> **What to check:** Run a formal data profile against the sources in scope before scoping the model. Null rates, format consistency, outliers, duplicates, and value distributions should all be documented. Known issues should be listed with a remediation plan, not flagged and parked. If the data has never been formally profiled, that is the first piece of work.

## 03 — Ownership: Is there a named person accountable for this data — not a team, a person?

> *My take: Ownerless data is one of the most reliable predictors of project problems I have seen. When something goes wrong in production — and something always does — the first question is whether the data changed. If nobody owns the data, nobody can answer that question. You end up with a model producing degraded outputs and no clear path to understanding why.*

Ownership means accountability for quality, availability, and documentation. It means someone who knows what the fields actually represent, who can flag when the source system changes, and who can be called when the pipeline breaks at 11pm on a Tuesday.

Team ownership is not ownership. It distributes accountability so broadly that nobody acts on it. Every data source in scope for an AI project needs a named individual. That person needs to know the system is depending on their data, and they need to understand how it will be used.

> **What to check:** For each data source, identify the named owner and brief them on the intended use case before the build starts. Confirm they will be in role for the duration of the project and have a plan for handover if they are not. Ask whether the data is documented in a data dictionary that is actively maintained. If it is not, treat that as a gap to close, not a detail to address later.

## 04 — Compliance: Is using this data in an AI model legally and ethically sound?

> *My take: Compliance constraints do not prevent AI projects. But they do shape what can be built, how it must be built, and what has to be documented along the way. Finding a hard compliance constraint after the architecture is designed is one of the most expensive discoveries a project can make. I have seen systems have to be partially rebuilt because data residency requirements were not mapped before the platform was selected.*

Using data in an AI model is a different legal context than using the same data in a report. Training a model on personal data, passing it through a third-party inference API, or storing outputs that contain inferred personal information all carry specific obligations under GDPR and equivalent frameworks. The consent basis under which data was originally collected may not cover these uses.

Regulated industries carry additional complexity. Financial services, healthcare, and public sector each have frameworks that govern how data can be used in automated decision-making. These need to be identified and worked through before architectural decisions are made, not after.

> **What to check:** Involve legal and data protection at the start, not as a sign-off at the end. Review the original consent or collection basis for each data source against the intended AI use. Map data residency requirements before selecting a platform. For regulated sectors, identify the specific frameworks that apply and confirm the intended architecture satisfies them.

## 05 — Currency: Is the data fresh enough now — and will it stay that way?

> *My take: Currency is the dimension people most often treat as an afterthought, because at launch the data is usually current. The problem surfaces six months later when the model is quietly producing worse outputs because the world has changed and nobody updated it. I have never seen a model degrade dramatically overnight. It happens gradually, and without monitoring in place, it is invisible until users notice.*

Currency covers two distinct things. The first is the training data: is it recent enough to represent current conditions, or has the domain shifted since it was collected? For some use cases twelve months of historical data is perfectly adequate. For others it is dangerously stale.

The second is the ongoing refresh: once the system is live, how does the data stay current? Manual refresh processes fail. They get deprioritised, forgotten, or orphaned when the person responsible moves on. Automation is the only answer that holds up over time.

> **What to check:** Define the required freshness window for this use case before the build starts. Design an automated refresh process as part of the architecture, not as something to add later. Plan for drift monitoring so degradation is detected before users notice it. Agree a retraining trigger and cadence with the data owner before go-live. These are operational decisions, and they belong in the project scope.

---

## Knowing where your data stands is not optional. It is the prerequisite.

Every one of these dimensions is assessable before a project starts. None of them requires a long engagement. What they require is the willingness to ask honest questions and accept the answers.

Organisations that skip this work do not avoid data problems. They find them later, in circumstances that are harder to address and more expensive to fix. A data readiness assessment is not a barrier to getting started. It is what makes getting started worth doing.

If accessibility is unclear, map the extraction path before anything else. If quality is unknown, profile the data before scoping the model. If ownership is diffuse, name an owner before the build begins. If compliance is unreviewed, involve legal before the architecture is locked. If currency is unmanaged, design refresh and monitoring in from the start.

None of these steps are long. All of them are cheaper now than they will be in three months.
