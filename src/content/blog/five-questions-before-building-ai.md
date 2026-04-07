---
title: "Before You Build AI, Ask These Five Questions"
excerpt: "Most AI projects don't fail because of the technology. They fail because no one asked the right questions before starting. Here is how I assess readiness — and why each dimension matters."
author: "Pierre Derval"
publishDate: 2026-03-31
category: "AI Strategy"
tags: ["ai", "readiness", "strategy", "enterprise", "consulting"]
image: "/blog/readiness-risk.webp"
imageAlt: "AI readiness risk assessment framework diagram"
cta: "ai-readiness"
draft: false
---

Most AI projects do not fail because the technology was wrong. They fail because the organisation was not ready for it, and nobody checked before the build started.

I have seen this pattern enough times to stop treating it as an exception. A client arrives with real enthusiasm, a genuine budget, and a use case that sounds solid on paper. Six months later the project is stalled. The data turned out to be a problem nobody had mapped, governance was never decided, and the people who were supposed to use the solution were never brought along.

None of that is a technology failure. It is a readiness failure. And readiness failures are, almost without exception, diagnosable before a single line of code gets written.

Here is how I structure that diagnosis, across five dimensions.

## 01 — Business priority: Is there a real problem with a real owner?

> *My take: The most dangerous words in an AI engagement are "we want to explore GenAI opportunities." That sentence feels like a starting point. It is not. It is a signal that the hard thinking has not happened yet. And if you start building before that thinking is done, you will have to redo it mid-project, at much higher cost.*

A genuine use case is specific. It names a problem, connects it to something measurable, and has a person with budget and authority who is accountable for fixing it. Without those three things, scope will drift, stakeholders will disagree on what success looks like, and the project will eventually be judged against expectations that were never aligned.

> **What to check:** Ask the client to describe the use case in one sentence without using the words "AI", "automation", or "efficiency." If they struggle, the problem definition needs more work before anything else does. Then ask who, by name, owns this initiative and what their actual mandate is. If the answer is a steering committee, note it and probe further.

One more question worth asking: is AI actually the right answer here? Many problems that get framed as AI opportunities are better addressed with cleaner processes, better data foundations, or simpler tools. Saying that clearly and early is one of the most responsible things an adviser can do for a client.

## 02 — Data readiness: Is the data accessible, trustworthy, and fit for the job?

> *My take: This is the dimension that kills more AI projects than any other, and it is consistently the one clients underestimate. AI does not fix data quality problems. It amplifies them. Feed a model inconsistent or incomplete data and you get inconsistent, incomplete outputs, served with confidence, at scale.*

The question is not whether data exists. It almost always does somewhere. The questions are whether you can access it, whether anyone trusts it, and whether it actually maps to the problem you are trying to solve.

In many organisations, getting honest answers to these questions takes two to three weeks. That is information in itself. If the data foundation needs work, that is often the real first project. The AI layer comes second.

> **What to check:** Where does the relevant data live, and what is required to access it? Who owns it, and are they actively maintaining its quality? Have completeness, accuracy, and freshness been assessed recently, or is everyone assuming it is fine? Are there PII or compliance constraints that would restrict how it can be used in a model?

## 03 — Architecture maturity: Can the platform support this in production, not just in a demo?

> *My take: A demo that works on a laptop tells you almost nothing about production readiness. The gap between the two is where schedules slip and budgets expand. I treat architecture assessment as non-negotiable before scope sign-off, because finding architectural constraints mid-delivery is one of the most expensive discoveries a project can make.*

Architecture maturity is not only about whether there is enough compute. It is about whether the environment can integrate cleanly with the data sources the solution depends on, whether it can be properly monitored once live, and whether the underlying platform is stable enough to build on without becoming a project in its own right.

> **What to check:** Integration work typically accounts for 40 to 60 percent of delivery effort on AI projects. Map API connectivity, existing platform components that can be reused, and the current state of technical debt early. If the organisation is still mid-journey on cloud adoption or API standardisation, put that in the timeline as a real factor, not an optimistic assumption.

## 04 — Governance maturity: Who owns the outputs, and what happens when something goes wrong?

> *My take: Governance is the dimension people treat as an afterthought right up until something goes wrong in production. Then it becomes the only conversation that matters. I would rather have an uncomfortable conversation about ownership and accountability at the start than be in that room six months after launch.*

The core of governance is not a policy document. It is a clear answer to a simple question: who is accountable for what this AI produces, and what do they do when it gets something wrong? That needs a named person, not a team. And it needs to be a business owner, not an IT owner. The people who run the model cannot be the same people responsible for the decisions it informs.

For regulated industries there is more to consider: explainability requirements, audit trails, documented risk acceptance. These need to be designed into the architecture from the beginning. Retrofitting them into a live system is painful and often only partially achievable.

> **What to check:** Is there a review process for AI outputs before they affect customers or employees? Have the specific risks of this use case been understood and formally accepted by the right people? Does the organisation have working AI principles, or does this project need to establish its own guardrails? Are there regulatory requirements that constrain what the solution can do or how it must document its decisions?

## 05 — Delivery capability: Can the organisation build it, adopt it, and keep it running?

> *My take: Delivery capability is the most honest test of whether a project will actually generate value. A lot of AI solutions get built and then quietly abandoned. The model degrades, nobody retrains it, the project team has moved on, and the investment delivers nothing meaningful after go-live. That is not a technology failure. It is a capability and ownership failure, and it is entirely preventable.*

This dimension covers three things: the technical capability to build the solution, the organisational capability to absorb and use it, and the operational plan to sustain it after the project closes.

The second one is the most frequently underscoped. Change management is not a soft add-on to an AI delivery. It is the mechanism by which the investment generates returns. A solution that nobody uses has a return of zero, regardless of how well it was built.

> **What to check:** Who owns the solution after go-live? Is there a plan for retraining and drift monitoring? Has end-user change management been scoped as seriously as the technical delivery? Are there third-party dependencies — model providers, data vendors — that introduce continuity or pricing risk that needs to be actively managed?

---

## The assessment is not a barrier. It is the work.

Running through these five dimensions before scoping any engagement typically takes a week. Skipping them and discovering the gaps mid-delivery typically costs months.

The goal is not to find reasons to slow things down. It is to make sure that when something gets built, it is built on honest foundations, with a clear-eyed view of what comes after launch.

If business priority is vague, sharpen the use case before anything else. If data is a problem, treat it as the first project. If architecture is fragile, put that in the timeline honestly. If governance is absent, design it in before the first line of code. If delivery capability is thin, either staff for it or reduce the scope.

None of these findings are blockers. They are information. Having that information early is the difference between a project that delivers and one that gets a difficult budget review in eighteen months.

A rigorous readiness assessment is one of the most responsible things you can offer a client. It gives them an honest picture of where they actually are, before the commitments are made and the expectations are locked in.

