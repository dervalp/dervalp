export const DIMENSIONS = [
  { id: 'strategic',   label: 'Strategic Alignment',  fill: '#C8553A' },
  { id: 'value',       label: 'Value Clarity',         fill: '#D4714E' },
  { id: 'feasibility', label: 'Feasibility',           fill: '#6B7C5E' },
  { id: 'stakeholder', label: 'Stakeholder Readiness', fill: '#7C6340' },
  { id: 'risk',        label: 'Risk Awareness',        fill: '#5E6B7C' },
] as const;

export type DimId = typeof DIMENSIONS[number]['id'];
export type StrengthKey = 'strong' | 'solid' | 'partial' | 'weak';

export interface Option {
  label: string;
  sub?: string;
  scores: Record<DimId, number>;
}

export interface Question {
  id: string;
  text: string;
  hint: string;
  options: Option[];
}

export interface VerdictTier {
  id: string;
  title: string;
  test: (avg: number, min: number) => boolean;
  description: string;
}

// ─── Questions ─────────────────────────────────────────────────────────────

export const QUESTIONS: Question[] = [
  {
    id: 'objective',
    text: 'What is the primary business objective this AI initiative serves?',
    hint: 'Think about what the business is trying to achieve, not what the technology does.',
    options: [
      {
        label: 'Reduce costs or improve operational efficiency',
        sub: 'Automation, faster processing, fewer errors',
        scores: { strategic: 8, value: 7, feasibility: 5, stakeholder: 5, risk: 5 },
      },
      {
        label: 'Grow revenue or create new products',
        sub: 'New capabilities, better conversion, market expansion',
        scores: { strategic: 8, value: 5, feasibility: 4, stakeholder: 4, risk: 3 },
      },
      {
        label: 'Reduce risk, improve compliance, or strengthen controls',
        sub: 'Regulatory, fraud, safety, audit',
        scores: { strategic: 7, value: 6, feasibility: 5, stakeholder: 6, risk: 7 },
      },
      {
        label: 'Improve customer or employee experience',
        sub: 'Satisfaction, engagement, retention, NPS',
        scores: { strategic: 6, value: 4, feasibility: 5, stakeholder: 5, risk: 5 },
      },
      {
        label: 'Explore and learn, no specific outcome yet',
        sub: 'Innovation sprint, R&D, capability building',
        scores: { strategic: 2, value: 1, feasibility: 2, stakeholder: 2, risk: 2 },
      },
    ],
  },
  {
    id: 'metrics',
    text: 'How will you measure whether this initiative succeeded?',
    hint: 'The clearer the metric, the easier it is to defend the investment.',
    options: [
      {
        label: 'A clear financial metric',
        sub: 'Cost saved, revenue gained, margin improved, with a number attached',
        scores: { strategic: 5, value: 10, feasibility: 3, stakeholder: 6, risk: 5 },
      },
      {
        label: 'An operational KPI',
        sub: 'Processing time, error rate, throughput, SLA improvement',
        scores: { strategic: 5, value: 7, feasibility: 4, stakeholder: 5, risk: 4 },
      },
      {
        label: 'A qualitative improvement',
        sub: 'User satisfaction, experience quality, team morale',
        scores: { strategic: 4, value: 4, feasibility: 4, stakeholder: 4, risk: 3 },
      },
      {
        label: 'We have not defined success metrics yet',
        scores: { strategic: 0, value: 0, feasibility: 0, stakeholder: 1, risk: 0 },
      },
    ],
  },
  {
    id: 'sponsor',
    text: 'Who is sponsoring this initiative?',
    hint: 'Sponsorship determines whether the project survives its first setback.',
    options: [
      {
        label: 'C-suite or board-level sponsor with budget authority',
        sub: 'CEO, CFO, COO, CTO, or equivalent',
        scores: { strategic: 8, value: 4, feasibility: 6, stakeholder: 10, risk: 6 },
      },
      {
        label: 'VP or senior director with influence',
        sub: 'Can allocate team time but needs upward approval for budget',
        scores: { strategic: 6, value: 3, feasibility: 5, stakeholder: 7, risk: 5 },
      },
      {
        label: 'A middle management champion pushing upward',
        sub: 'Passionate advocate but limited authority',
        scores: { strategic: 3, value: 2, feasibility: 3, stakeholder: 3, risk: 2 },
      },
      {
        label: 'No clear sponsor yet',
        scores: { strategic: 0, value: 0, feasibility: 0, stakeholder: 0, risk: 0 },
      },
    ],
  },
  {
    id: 'confidence',
    text: 'How confident are you in the estimated value?',
    hint: 'Estimates grounded in data survive scrutiny. Gut feelings do not.',
    options: [
      {
        label: 'Data-backed projections',
        sub: 'Benchmarks, pilot results, comparable deployments, analyst data',
        scores: { strategic: 5, value: 10, feasibility: 5, stakeholder: 7, risk: 7 },
      },
      {
        label: 'Reasonable estimates based on similar work',
        sub: 'Informed guesses grounded in experience',
        scores: { strategic: 4, value: 7, feasibility: 4, stakeholder: 5, risk: 5 },
      },
      {
        label: 'Rough directional estimates',
        sub: 'We know the direction but not the magnitude',
        scores: { strategic: 2, value: 3, feasibility: 2, stakeholder: 2, risk: 2 },
      },
      {
        label: 'We have not quantified the value yet',
        scores: { strategic: 0, value: 0, feasibility: 0, stakeholder: 0, risk: 0 },
      },
    ],
  },
  {
    id: 'timeline',
    text: 'When do you expect first measurable value?',
    hint: 'Shorter time-to-value reduces risk and builds momentum.',
    options: [
      {
        label: 'Under 3 months',
        sub: 'Quick win, focused pilot, narrow scope',
        scores: { strategic: 5, value: 6, feasibility: 9, stakeholder: 8, risk: 8 },
      },
      {
        label: '3 to 6 months',
        sub: 'Realistic for a well-scoped first phase',
        scores: { strategic: 5, value: 5, feasibility: 7, stakeholder: 6, risk: 6 },
      },
      {
        label: '6 to 12 months',
        sub: 'Larger scope, more moving parts',
        scores: { strategic: 4, value: 3, feasibility: 3, stakeholder: 3, risk: 3 },
      },
      {
        label: 'Over 12 months or unclear',
        scores: { strategic: 2, value: 1, feasibility: 0, stakeholder: 1, risk: 0 },
      },
    ],
  },
  {
    id: 'complexity',
    text: 'How complex is the expected implementation?',
    hint: 'Complexity drives cost, risk, and the number of things that can go wrong.',
    options: [
      {
        label: 'Simple: single system, small team, known patterns',
        sub: 'API integration, off-the-shelf tool, one data source',
        scores: { strategic: 3, value: 5, feasibility: 10, stakeholder: 7, risk: 8 },
      },
      {
        label: 'Moderate: a few integrations, cross-functional team',
        sub: 'Multiple data sources, some custom development',
        scores: { strategic: 4, value: 4, feasibility: 7, stakeholder: 5, risk: 6 },
      },
      {
        label: 'Complex: multiple systems, org-wide change',
        sub: 'New infrastructure, new processes, training at scale',
        scores: { strategic: 5, value: 3, feasibility: 2, stakeholder: 2, risk: 2 },
      },
      {
        label: 'Unknown: we have not scoped it yet',
        scores: { strategic: 0, value: 0, feasibility: 0, stakeholder: 0, risk: 0 },
      },
    ],
  },
  {
    id: 'risk',
    text: 'What is the single biggest risk to this initiative?',
    hint: 'Every project has a primary risk. Naming it is the first step to managing it.',
    options: [
      {
        label: 'Data: we are not confident the data exists or is usable',
        sub: 'Quality, access, volume, labelling gaps',
        scores: { strategic: 3, value: 3, feasibility: 3, stakeholder: 5, risk: 5 },
      },
      {
        label: 'Technology: we are not sure this can be built reliably',
        sub: 'Untested architecture, accuracy concerns, integration risk',
        scores: { strategic: 3, value: 3, feasibility: 2, stakeholder: 5, risk: 4 },
      },
      {
        label: 'Adoption: people may not use it even if it works',
        sub: 'Workflow disruption, trust, training, resistance to change',
        scores: { strategic: 4, value: 3, feasibility: 5, stakeholder: 2, risk: 4 },
      },
      {
        label: 'Budget: funding could be pulled before results arrive',
        sub: 'Competing priorities, long payback period, leadership changes',
        scores: { strategic: 3, value: 2, feasibility: 3, stakeholder: 3, risk: 3 },
      },
      {
        label: 'Alignment: stakeholder support is fragile or absent',
        sub: 'Political dynamics, conflicting agendas, unclear ownership',
        scores: { strategic: 3, value: 3, feasibility: 3, stakeholder: 1, risk: 2 },
      },
    ],
  },
  {
    id: 'alternatives',
    text: 'How does AI compare to the alternatives?',
    hint: 'A strong case explains why AI is better than doing nothing or something simpler.',
    options: [
      {
        label: 'AI is clearly the best approach, nothing else comes close',
        sub: 'Scale, complexity, or speed rules out manual or rule-based options',
        scores: { strategic: 8, value: 5, feasibility: 4, stakeholder: 6, risk: 5 },
      },
      {
        label: 'AI is one of several options, but looks most promising',
        sub: 'We compared and AI wins on the dimensions that matter',
        scores: { strategic: 6, value: 5, feasibility: 5, stakeholder: 5, risk: 6 },
      },
      {
        label: 'We could solve this without AI, but AI would be faster or better',
        sub: 'Incremental improvement over existing approach',
        scores: { strategic: 5, value: 5, feasibility: 7, stakeholder: 5, risk: 7 },
      },
      {
        label: 'We have not explored alternatives yet',
        scores: { strategic: 1, value: 0, feasibility: 0, stakeholder: 1, risk: 0 },
      },
    ],
  },
  {
    id: 'change',
    text: 'How much will this change the way people work?',
    hint: 'The hardest part of most AI projects is not the model. It is the people.',
    options: [
      {
        label: 'Minimal: it runs in the background, no workflow change',
        sub: 'Automated pipeline, back-office processing',
        scores: { strategic: 3, value: 4, feasibility: 9, stakeholder: 9, risk: 8 },
      },
      {
        label: 'Moderate: people interact with it but their role stays the same',
        sub: 'New tool in existing workflow, AI-assisted decisions',
        scores: { strategic: 5, value: 5, feasibility: 6, stakeholder: 6, risk: 6 },
      },
      {
        label: 'Significant: it changes roles, processes, or team structures',
        sub: 'New workflows, retraining, role redefinition',
        scores: { strategic: 6, value: 5, feasibility: 2, stakeholder: 2, risk: 2 },
      },
      {
        label: 'We have not assessed the people impact yet',
        scores: { strategic: 0, value: 0, feasibility: 0, stakeholder: 0, risk: 0 },
      },
    ],
  },
];

// ─── Scoring config ─────────────────────────────────────────────────────────

export const STRENGTH_THRESHOLDS: Array<{ min: number; label: string; key: StrengthKey }> = [
  { min: 75, label: 'Strong',  key: 'strong'  },
  { min: 55, label: 'Solid',   key: 'solid'   },
  { min: 35, label: 'Partial', key: 'partial' },
  { min: 0,  label: 'Weak',    key: 'weak'    },
];

export const VERDICT_TIERS: VerdictTier[] = [
  {
    id: 'strong',
    title: 'Strong Business Case',
    test: (avg, min) => avg >= 72 && min >= 50,
    description:
      'Your case is well-structured across all five dimensions. It is ready for leadership review. Focus on refining the narrative and preparing for questions on your weakest dimension.',
  },
  {
    id: 'promising',
    title: 'Promising But Incomplete',
    test: (avg, min) => avg >= 55 && min >= 35,
    description:
      'The foundation is there, but one or more dimensions need work before this case will survive scrutiny. Address the gaps below before presenting to decision-makers.',
  },
  {
    id: 'early',
    title: 'Early Stage, Needs Development',
    test: (avg) => avg >= 35,
    description:
      'Your case has a starting point, but several dimensions are underdeveloped. This is normal for early exploration. Use the actions below to build a stronger case before committing resources.',
  },
  {
    id: 'notyet',
    title: 'Not Yet a Business Case',
    test: () => true,
    description:
      'Most dimensions are unaddressed. Before writing a business case, you need to do the foundational work: define the objective, quantify the value, and secure a sponsor.',
  },
];

// ─── Dimension descriptions and actions ────────────────────────────────────

export const DIM_DESCRIPTIONS: Record<DimId, Record<StrengthKey, string>> = {
  strategic: {
    strong:
      'This initiative is well-connected to a clear business priority. You can articulate why it matters beyond the technology.',
    solid:
      'There is a reasonable strategic link, but it could be made sharper. Connecting this to a top-three priority for the business would strengthen the case.',
    partial:
      'The strategic link is vague or assumed. Before presenting to leadership, clarify which business priority this serves and why AI is the right lever.',
    weak:
      'There is no clear connection between this initiative and a business priority. Without one, it will struggle to secure and retain funding.',
  },
  value: {
    strong:
      'You have a clear, measurable definition of success with evidence to back up your estimates. This is the foundation leadership needs.',
    solid:
      'Your value estimate is reasonable but not yet airtight. Adding one or two data points from benchmarks or comparable deployments would help.',
    partial:
      'The value story is directional at best. Before committing budget, quantify what success looks like in terms leadership can compare against other investments.',
    weak:
      'There is no quantified value yet. This is the single most common reason AI business cases get rejected or deprioritised.',
  },
  feasibility: {
    strong:
      'The scope is realistic, the implementation path is clear, and the timeline is achievable. This project can actually get done.',
    solid:
      'The implementation is plausible but has some complexity or unknowns. A discovery sprint or proof-of-concept would reduce the remaining uncertainty.',
    partial:
      'There are significant feasibility questions: scope is broad, timeline is long, or the technical path is unclear. Narrow the first phase before committing.',
    weak:
      'The implementation is unscoped or highly complex. You need a scoping exercise before this is a business case: it is still a hypothesis.',
  },
  stakeholder: {
    strong:
      'You have executive sponsorship, clear ownership, and a realistic view of the change required. The organisation can absorb this.',
    solid:
      'Sponsorship exists but could be stronger, or the change management plan is not yet developed. Shore up stakeholder alignment before launch.',
    partial:
      'Stakeholder readiness is a concern. Adoption risk is real: without a deliberate change plan, even a technically successful project can fail in practice.',
    weak:
      'There is no clear sponsor and no plan for how people will adopt this. This is the most underestimated dimension in AI project failures.',
  },
  risk: {
    strong:
      'You have identified the primary risks and have a clear view of what could go wrong. This allows you to build mitigations into the plan.',
    solid:
      'You are aware of the key risks but may not have mitigations in place. Documenting a risk register with owners and triggers would strengthen the case.',
    partial:
      'Risk awareness is superficial. The business case should explicitly name what could kill the project and what you will do about each scenario.',
    weak:
      'Risks are unidentified or unaddressed. A project without a risk plan is a project hoping for the best. Leadership sees through that quickly.',
  },
};

export const DIM_ACTIONS: Record<DimId, string> = {
  strategic:
    'Map this initiative to a specific, named business priority. If you cannot say which quarterly objective it serves, the strategic case is not ready.',
  value:
    'Quantify the expected value. Even a rough estimate with stated assumptions is better than saying you believe this will be valuable. Include a comparison to the cost of doing nothing.',
  feasibility:
    'Run a scoping exercise or time-boxed discovery sprint. Define what a minimal first phase looks like, with a clear boundary around data, systems, and team.',
  stakeholder:
    'Secure an executive sponsor with budget authority and draft a change management plan. Identify the three people whose adoption matters most and talk to them now.',
  risk:
    'Build a risk register with the top three risks, each with an owner, a trigger condition, and a mitigation plan. Present this alongside the business case, not as an afterthought.',
};
