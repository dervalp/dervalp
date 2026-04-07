---
title: "You Might Not Need AI"
excerpt: "A practical essay on when AI creates value, when it creates unnecessary complexity, and why deterministic problems often deserve deterministic solutions."
author: "Pierre Derval"
publishDate: 2026-04-03
category: "AI Strategy"
tags: ["ai", "strategy", "enterprise", "decision-making", "consulting"]
image: "/blog/from-infrastructure-to-ai-progression.webp"
imageAlt: "A visual progression from infrastructure and data foundations through to AI and predictive systems"
cta: "ai-readiness"
draft: false
---

Every week I see the same pattern.

A team has a problem. Someone suggests AI. The conversation accelerates because it feels like the modern answer. Six months later, the solution is fragile, more expensive than expected, harder to maintain, and often solving the wrong problem.

This is not an argument against AI. It is an argument against using AI where it does not belong. AI is powerful. But it is not universal. And one of the most expensive mistakes companies are making right now is treating it as if it were.

> **If you can solve it without AI, solve it without AI.**

## 1. Today's token price is not a business model

A surprising number of AI business cases are built on one quiet assumption: that inference will stay cheap enough for the economics to work.

That assumption is weak.

> *My take: I have seen product business cases built entirely around current inference pricing. They treat it like a fixed input. That is a mistake. Pricing today reflects a land-grab moment, not a settled market. When the infrastructure bill comes due, someone will pay it.*

> *The facts: AI inference does not run in abstraction. Every token your application processes at runtime runs on a GPU or equivalent accelerator, in a data centre, drawing continuous power from an electricity grid. When that infrastructure tightens, costs move upstream.*

This is no longer theoretical. The IEA projects that global data centre electricity consumption will more than double to around 945 TWh by 2030, with AI inference as the primary driver of that growth.[1] In Europe the constraint is already visible. The European Commission is pushing to triple EU data centre capacity within five to seven years, while acknowledging that permitting alone can take more than 48 months and that energy access is a genuine bottleneck.[2] Some markets are at breaking point already. Data centres consume close to 80% of all electricity used in Dublin. The Irish grid operator has effectively paused new connections in parts of the country as a result.[3]

More adoption, more inference, more GPU-hours, more pressure on grids that were not built for this. When supply cannot keep pace, energy gets rationed. When energy gets rationed, prices spike. That is not a forecast. It is how constrained infrastructure markets work.

If your product requires dozens or hundreds of model calls per workflow, do not validate the business case at one price point. Stress-test it against worse conditions. Infrastructure markets do not care about product demos.

## 2. Most automation problems are not AI problems

A large share of what companies label as AI projects are, in reality, automation projects.

Moving data between systems. Triggering actions when a condition is met. Routing requests. Applying rules. Synchronising records. Escalating exceptions. None of that requires a language model.

> *My take: I have watched teams spend weeks integrating an LLM into workflows where a rules engine or five lines of Python would have solved the problem in an afternoon. The AI part was 10 percent of the actual problem. The other 90 percent was plumbing that nobody wanted to call plumbing, because plumbing is not exciting.*

> **What to check:** Automation tooling is mature, cheap, observable, testable, and deterministic. In enterprise environments, those properties are not boring details. They are the reason systems survive contact with reality.

Before asking "how do we apply AI here?", ask a sharper question: what part of this problem actually requires inference from ambiguous input? If the honest answer is not much, then AI is probably not the engine. At best it is a small component. At worst it is an expensive distraction wrapped in a good demo.

## 3. Deterministic problems deserve deterministic solutions

This is the rule I come back to most often: if the problem is deterministic, the solution should be too.

> *My take: AI is genuinely strong in specific categories: generating content, extracting meaning from unstructured input, interpreting language or images, identifying patterns in historical data. Outside those categories, it introduces variability into systems that should behave predictably. The technical word for the output is slop. The business word is risk.*

> *The facts: If a problem can be solved with a lookup table, a business rule, a conditional branch, a regex, or a standard classifier with stable behaviour, classical code is the right tool. These approaches are testable, auditable, debuggable. They fail in ways engineers can reason about. They do not hallucinate. They do not need a system prompt or a temperature parameter.*

The moment you apply a stochastic tool to a deterministic problem, you are not adding intelligence. You are adding uncertainty. And uncertainty is not free. It shows up in QA, in support tickets, in incident response, in governance, and in user trust.

One important nuance: tools like Claude Code or Codex CLI are good examples of AI used correctly in this context. The model handles the hard generation problem. The output is code. The code is then deterministic, reviewable, and testable. AI at its best: solving the generation challenge, then handing off to something you can rely on.

## 4. Use AI where it earns the complexity

AI absolutely has a place.

It belongs when the problem involves ambiguity, language, perception, soft signals, or prediction from messy data. When the alternative is genuinely impossible, not when the alternative is merely less fashionable.

> *My take: The best AI systems I have seen are not the ones that insert a model into every step. They are the ones that are deliberate about where the model sits, what it does, how it is bounded, and what deterministic systems surround it. That is what production-grade AI actually looks like.*

> **What good looks like:** AI where judgment or generation is needed. Rules where rules are enough. Workflows where workflows are enough. Code where code is enough. Design the system around the nature of the problem, not around the excitement of the tool.

## The question to ask instead

The default question in many organisations is: how do we use AI for this?

The better question is: does this problem actually need AI?

That shift sounds small. It is not. It changes how you scope work, how you model costs, how you assess risk, and whether the thing you ship will still make sense a year later when inference pricing looks different.

> **My rule of thumb is simple: if you can solve it without AI, solve it without AI. Reserve it for the problems only AI handles well.**

That is not conservatism. That is engineering discipline applied to a tool that has been marketed as universal.

If you are mapping where AI genuinely fits in your organisation, the AI Readiness Checklist is designed to help you think through that across five dimensions: business priority, data readiness, architecture, governance, and delivery.

---

## Sources

[1] International Energy Agency, *Energy and AI* (2025). Global data centre electricity demand projected to reach ~945 TWh by 2030.
https://www.iea.org/reports/energy-and-ai/executive-summary

[2] European Commission, *AI Continent Action Plan* (2025). Goal to triple EU data centre capacity within 5–7 years; permitting often exceeds 48 months.
https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52025DC0165

[3] Ember, *Grids for Data Centres* (2025). European data centre demand expected to reach 168 TWh by 2030; Dublin data centres consume ~80% of the city's electricity.
https://ember-energy.org/latest-insights/grids-for-data-centres-ambitious-grid-planning-can-win-europes-ai-race/grids-for-data-centres/
