---
title: "AI Should Generate Manifests, Not Code"
excerpt: "Generated code is unpredictable, hard to maintain, and expensive to validate. There is a better way: let AI generate structured declarations, and let a deterministic runtime handle the rest."
author: "Pierre Derval"
publishDate: 2026-04-08
category: "AI Strategy"
tags: ["ai", "code-generation", "architecture", "open-source", "enterprise"]
image: "/blog/ai-manifests-not-code.webp"
imageAlt: "A visual progression from infrastructure and data foundations through to AI and predictive systems"
cta: "ai-readiness"
draft: false
---

AI code generation tools are everywhere. Cursor, Claude Code, Copilot. The generation step is fast, often impressive, and getting better every month.

But there is a problem that does not get enough attention: generated code is still code.

Every line must be reviewed, tested, versioned, debugged, and maintained. The generation is fast. Everything after it is not. And in enterprise environments, everything after it is what actually matters.

I have been thinking about this for a while, and I am building an open-source project — Ikary Manifest — that takes a different approach. This post explains why I think the current model is broken, and what a better abstraction looks like.

## 1. The real cost of generated code

The pitch is simple. Describe what you want. Get working code. Ship it. The problem surfaces once the code lands.

> *My take: I have watched teams generate entire backends in a day and then spend weeks cleaning up the output. The model does not know your architecture, your conventions, or what other teams depend on. It generates something plausible. Plausible is not production-grade.*

Generated code is unpredictable. The same prompt can produce different output across runs. Different models produce different structures, different patterns, different bugs. The output looks like code a human wrote, but no human had intent behind it. That makes review harder, not easier.

**What to check:** Ask your team how much the post-generation work actually decreased after adopting AI coding tools. If review time, test coverage requirements, and debugging effort stayed roughly the same, the generation step solved the authoring problem and left everything else untouched.

There are real downstream consequences:

- Review burden stays the same. Engineers still read every line. The model shifts authoring workload; it does not reduce review workload.
- Framework decisions are implicit. Generated code is tied to whatever stack the model chose. Migrating later means rewriting, which is no different from writing by hand.
- Debugging is harder. When something breaks in generated code, there are no design decisions to trace. There is just output.
- Testing is not optional. Generated code needs the same coverage as hand-written code. Often more, because intent is unclear.

None of this means code generation is useless. Tools like Claude Code and Copilot are genuinely helpful for tasks a human then owns and understands. The problem starts when AI generates large volumes of code that goes into production without full review.

## 2. What if AI generated a declaration instead?

There is a different approach. Instead of generating source code, AI generates a structured declaration. A manifest.

A manifest describes what an application should do: the data models, the pages, the roles, the navigation, the validation rules. It is a structured document, readable, validated before anything runs. A deterministic runtime then compiles that manifest into a working application.

> *My take: This is the separation of concerns that code generation is missing. The creative, ambiguous part of describing what you want is handled by AI, where it performs well. The predictable, structural part of turning that into working software is handled by a tested compiler, where determinism matters.*

Here is a simplified example. A manifest for a CRM module might declare: two roles (admin and sales), two data entities (customer and invoice), one list page, and a navigation item pointing to it. That is the full specification. No generated controllers, no scaffolded components, no framework boilerplate. The runtime reads the declaration and produces the application.

**What to check:** If your team is currently asking whether AI-generated code is correct, that is a sign you are operating at the wrong abstraction level. A declaration either validates against a schema or it does not. There is no correctness to debate.

## 3. Why this changes the economics

The differences are practical, not philosophical.

**Deterministic output.** The same manifest always produces the same application. The runtime is tested once, and every manifest benefits from that work. There is no run-to-run variability.

**Lower maintenance.** Updating a business rule means changing a field in a document, not hunting through generated controllers, services, and components. No dead code. No orphaned files.

**Works with smaller models.** Generating a valid structured document is significantly simpler than generating correct, idiomatic, production-grade code across multiple frameworks. Smaller, cheaper models produce valid manifests reliably. That changes the cost model.

**Multi-runtime portability.** One manifest can compile to a React application today and a mobile application tomorrow. Code generation ties you to one framework. A manifest is framework-neutral by design.

> *My take: After helping multiple teams ship AI in production, the same structural problem kept appearing. Generation was getting faster. Maintenance was not getting any easier. The generation step was solving the wrong problem.*

There are honest limitations here. Manifests work well for structured, rule-based applications: data management tools, internal portals, CRUD-heavy systems. They are not the right abstraction for every problem. Highly custom interfaces, complex algorithmic logic, or systems where the edge cases outnumber the happy paths will still need hand-written code. And if the runtime itself has a bug, every application built on it is affected, which concentrates risk in a different place.

## 4. Where this is heading

Ikary Manifest is the open-source project where I am building this out. It defines a declarative manifest language for business applications, a compilation engine that normalises and validates those manifests, and a multi-runtime renderer that turns them into working software.

The project is early. It is research, not a product. But the architectural direction is clear: AI should generate declarations, not source code. The manifest is the right abstraction layer between human intent and running software.

## AI is a strong reasoner. It is a weak author.

AI is very good at understanding intent and producing structured output. It is much less reliable at producing code that is maintainable, portable, and production-ready across all the dimensions that matter in enterprise environments.

The question to ask is not whether AI can generate code. It clearly can. The question is whether code is the right output to generate. For a large class of business applications, I do not think it is.

The manifest is one answer to that gap. Generate the declaration. Let a tested runtime handle the rest.

---

*If you want to follow the work or contribute: [github.com/ikary-platform/ikary-manifest](https://github.com/ikary-platform/ikary-manifest) — documentation at [ikary-platform.github.io/ikary-manifest](https://ikary-platform.github.io/ikary-manifest/).*

