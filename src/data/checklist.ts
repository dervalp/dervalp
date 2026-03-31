export const SECTIONS = [
  {
    id: "biz",
    label: "Business priority",
    icon: "◎",
    color: "#534AB7",
    bg: "#EEEDFE",
    darkBg: "#26215C",
    desc: "The starting point. If there's no clear problem tied to business value, and no one senior enough to own it, everything else is irrelevant. GenAI enthusiasm is not a use case.",
    items: [
      { q: "Is there a named, specific use case — not just 'we want AI'?", hint: "The use case should reference a concrete problem, a measurable cost, and an owner.", flag: "critical" },
      { q: "Does the use case have a senior sponsor with budget and authority?", hint: "Projects without exec sponsorship rarely survive prioritisation battles.", flag: "critical" },
      { q: "Is there a clear definition of success — not just 'better'?", hint: "Think: time saved, error rate reduced, revenue influenced. Something you can measure in 3 months.", flag: "important" },
      { q: "Is AI genuinely the right solution — or would a simpler tool do the job?", hint: "Challenge the assumption early. LLMs are expensive, complex, and often overkill.", flag: "important" },
      { q: "Are the key business stakeholders aligned on scope and expectations?", hint: "Misaligned expectations are the most common cause of 'failure' that isn't actually a technical failure.", flag: "watch" },
    ]
  },
  {
    id: "data",
    label: "Data readiness",
    icon: "▤",
    color: "#0F6E56",
    bg: "#E1F5EE",
    darkBg: "#04342C",
    desc: "Probably the dimension most underestimated by clients. AI doesn't improve data quality — it amplifies whatever quality exists. Inaccessible or untrustworthy data kills more AI projects than bad models do.",
    items: [
      { q: "Is the relevant data actually accessible — not trapped in legacy systems or behind red tape?", hint: "Access issues often surface only mid-project. Map this before signing off on any timeline.", flag: "critical" },
      { q: "Is data quality understood and documented?", hint: "Completeness, accuracy, freshness, consistency. If no one knows, assume the worst.", flag: "critical" },
      { q: "Is there a clear owner for the data that will feed the AI system?", hint: "Ownerless data drifts. You need someone responsible for its ongoing quality.", flag: "important" },
      { q: "Are there PII, sensitivity, or compliance constraints on the data?", hint: "GDPR, sector-specific regulation, internal classification policies. Surface these early.", flag: "important" },
      { q: "Is there enough labelled or historical data to train, fine-tune, or evaluate the model?", hint: "For GenAI use cases this bar is lower — but not zero. Know what you have.", flag: "watch" },
      { q: "Can the data be refreshed reliably once the system is live?", hint: "A model trained on stale data will degrade. Who refreshes it, how often, and at what cost?", flag: "watch" },
    ]
  },
  {
    id: "arch",
    label: "Architecture maturity",
    icon: "⬡",
    color: "#185FA5",
    bg: "#E6F1FB",
    darkBg: "#042C53",
    desc: "A demo that works on a laptop is not a production system. The question is whether the underlying platform can host, integrate, and scale a solution that real users will depend on.",
    items: [
      { q: "Is there a cloud or on-prem environment capable of hosting the AI workload at scale?", hint: "Evaluate compute, storage, and latency requirements against what's available.", flag: "critical" },
      { q: "Can the target system integrate with existing data sources and downstream tools via APIs?", hint: "Integration debt is where projects stall after the PoC. Check this before the PoC.", flag: "important" },
      { q: "Is the current tech stack stable enough to build on — or is there significant underlying technical debt?", hint: "Building AI on a fragile foundation just shifts the problem downstream.", flag: "important" },
      { q: "Are there existing ML/AI platform components that can be reused (vector stores, embedding pipelines, orchestration)?", hint: "Reuse reduces time-to-value and lowers maintenance burden.", flag: "watch" },
      { q: "Is the architecture observable — can you monitor model behaviour and system health in production?", hint: "You can't manage what you can't see. Logging, tracing, and alerting must be designed in.", flag: "watch" },
    ]
  },
  {
    id: "gov",
    label: "Governance maturity",
    icon: "◻",
    color: "#BA7517",
    bg: "#FAEEDA",
    darkBg: "#412402",
    desc: "Governance isn't compliance theatre. It's the operational structure that lets you deploy AI without it becoming a liability. Most organisations skip this until something goes wrong.",
    items: [
      { q: "Is there a defined owner responsible for AI outputs in production — not just IT?", hint: "Business ownership of AI outputs is non-negotiable. IT can run the model; they can't own the decisions it informs.", flag: "critical" },
      { q: "Is there a process for reviewing AI outputs before they affect customers, staff, or decisions?", hint: "Human-in-the-loop is not optional for high-stakes use cases. Define the review triggers now.", flag: "critical" },
      { q: "Are the risks of this specific use case understood and accepted by the right people?", hint: "Hallucination risk, bias risk, regulatory risk. Has the relevant risk function signed off?", flag: "important" },
      { q: "Does the organisation have an AI or data ethics policy — or at minimum, working principles?", hint: "If not, you'll need to establish guardrails for this project specifically.", flag: "important" },
      { q: "Is there a process for handling failures or unexpected model behaviour once live?", hint: "What happens when it gets something wrong? Who decides, who escalates, who fixes it?", flag: "watch" },
      { q: "Are there audit or explainability requirements for this use case?", hint: "Regulated industries and internal audit functions often require traceable decisions. Know this upfront.", flag: "watch" },
    ]
  },
  {
    id: "delivery",
    label: "Delivery capability",
    icon: "▷",
    color: "#993C1D",
    bg: "#FAECE7",
    darkBg: "#4A1B0C",
    desc: "Can the organisation build it, and — critically — sustain it after go-live? Many AI projects get delivered and then orphaned. Delivery capability includes the people and change management, not just the technical skills.",
    items: [
      { q: "Does the team have the technical skills to build and operate the solution — or is there a realistic plan to acquire them?", hint: "ML engineering, prompt engineering, platform ops. Know the gap before you scope.", flag: "critical" },
      { q: "Is there a realistic plan for who owns and maintains the solution after go-live?", hint: "The most common failure mode: project team disbands, no one retrains the model, quality degrades silently.", flag: "critical" },
      { q: "Has the end-user change management been planned — not just the technical rollout?", hint: "Adoption fails when users aren't brought along. Training, communication, and feedback loops must be designed.", flag: "important" },
      { q: "Is the project scope realistic given available time, budget, and team capacity?", hint: "AI projects routinely underestimate data prep and integration work. Build in contingency.", flag: "important" },
      { q: "Is there a plan for retraining or updating the model as data and requirements evolve?", hint: "Models degrade as the world changes. Drift detection and retraining cadence should be agreed upfront.", flag: "watch" },
      { q: "Are there dependencies on third parties (model providers, data vendors) that introduce delivery or continuity risk?", hint: "API pricing changes, vendor lock-in, terms of service restrictions. Surface early.", flag: "watch" },
    ]
  }
] as const;

export type FlagType = "critical" | "important" | "watch";

export const FLAG_CONFIG: Record<FlagType, { label: string; textColor: string; bgColor: string }> = {
  critical:  { label: "Critical",  textColor: "#712B13", bgColor: "#F5C4B3" },
  important: { label: "Important", textColor: "#0C447C", bgColor: "#B5D4F4" },
  watch:     { label: "Watch",     textColor: "#444441", bgColor: "#D3D1C7" },
};
