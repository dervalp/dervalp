export interface Approach {
  id: string;
  name: string;
  fill: string;
  section: 'brain' | 'arch';
}

export interface Option {
  label: string;
  sub?: string;
  scores: Record<string, number>;
}

export interface Question {
  id: string;
  text: string;
  hint: string;
  options: Option[];
}

export interface Description {
  short: string;
  long: string;
  when: string;
}

export const BRAIN_TYPES: Approach[] = [
  { id: 'rules', name: 'Business Rules',  fill: '#A68B6B', section: 'brain' },
  { id: 'ml',    name: 'Machine Learning', fill: '#507a80', section: 'brain' },
  { id: 'dl',    name: 'Deep Learning',    fill: '#2e5d63', section: 'brain' },
  { id: 'genai', name: 'Generative AI',    fill: '#6b9fa6', section: 'brain' },
];

export const ARCH_TYPES: Approach[] = [
  { id: 'direct', name: 'Direct Integration', fill: '#B8956A', section: 'arch' },
  { id: 'rag',    name: 'RAG',                fill: '#6B7C5E', section: 'arch' },
  { id: 'agents', name: 'Agents',             fill: '#5E6B7C', section: 'arch' },
];

export const ALL_APPROACHES: Approach[] = [...BRAIN_TYPES, ...ARCH_TYPES];

export const QUESTIONS: Question[] = [
  {
    id: 'task',
    text: 'What is the core task you need to solve?',
    hint: 'Think about what the system actually needs to produce or do.',
    options: [
      {
        label: 'Apply fixed business logic or validation rules',
        sub: 'If-then conditions, compliance checks, routing',
        scores: { rules: 10, ml: 1, dl: 0, genai: 0, direct: 8, rag: 0, agents: 0 },
      },
      {
        label: 'Predict a number, classify, or score data',
        sub: 'Forecasts, churn, fraud detection, recommendations',
        scores: { rules: 2, ml: 9, dl: 5, genai: 1, direct: 8, rag: 0, agents: 0 },
      },
      {
        label: 'Recognise patterns in images, audio, or video',
        sub: 'Object detection, transcription, medical imaging',
        scores: { rules: 0, ml: 2, dl: 10, genai: 3, direct: 7, rag: 0, agents: 1 },
      },
      {
        label: 'Generate text, summarise, or answer questions',
        sub: 'Writing, Q&A, chat, translation, code generation',
        scores: { rules: 0, ml: 0, dl: 1, genai: 9, direct: 6, rag: 5, agents: 3 },
      },
      {
        label: 'Execute multi-step tasks autonomously',
        sub: 'Browse the web, call APIs, orchestrate workflows',
        scores: { rules: 0, ml: 0, dl: 1, genai: 3, direct: 1, rag: 2, agents: 10 },
      },
    ],
  },
  {
    id: 'data',
    text: 'How much labelled training data do you have?',
    hint: 'Labelled means data paired with correct answers or known outcomes.',
    options: [
      {
        label: 'None: we have no labelled data',
        sub: 'Starting from scratch',
        scores: { rules: 7, ml: 1, dl: 0, genai: 9, direct: 7, rag: 7, agents: 6 },
      },
      {
        label: 'A small amount: hundreds to a few thousand examples',
        scores: { rules: 5, ml: 6, dl: 2, genai: 5, direct: 5, rag: 5, agents: 4 },
      },
      {
        label: 'Moderate: tens of thousands of examples',
        scores: { rules: 3, ml: 8, dl: 6, genai: 3, direct: 5, rag: 3, agents: 2 },
      },
      {
        label: 'Large: millions of examples or more',
        scores: { rules: 1, ml: 5, dl: 10, genai: 2, direct: 4, rag: 1, agents: 0 },
      },
    ],
  },
  {
    id: 'context',
    text: 'Does the system need access to your private or real-time data?',
    hint: 'Internal documents, live databases, proprietary knowledge a public model would not know.',
    options: [
      {
        label: 'Yes: private documents or knowledge base',
        sub: 'Policy docs, wikis, product manuals, contracts',
        scores: { rules: 1, ml: 0, dl: 0, genai: 2, direct: 1, rag: 10, agents: 5 },
      },
      {
        label: 'Yes: live APIs or real-time data feeds',
        sub: 'CRM records, stock prices, IoT sensors',
        scores: { rules: 3, ml: 3, dl: 2, genai: 2, direct: 2, rag: 4, agents: 10 },
      },
      {
        label: 'No: general world knowledge is sufficient',
        scores: { rules: 5, ml: 2, dl: 2, genai: 9, direct: 10, rag: 1, agents: 3 },
      },
      {
        label: 'No: we have structured historical data to train on',
        sub: 'CSV, SQL, spreadsheets with outcomes',
        scores: { rules: 4, ml: 10, dl: 7, genai: 0, direct: 8, rag: 0, agents: 0 },
      },
    ],
  },
  {
    id: 'autonomy',
    text: 'How much autonomy should the system have to take actions?',
    hint: 'Actions include writing files, calling APIs, sending emails, making decisions.',
    options: [
      {
        label: 'None: it only needs to respond or predict',
        sub: 'No external side-effects',
        scores: { rules: 8, ml: 7, dl: 6, genai: 8, direct: 10, rag: 5, agents: 0 },
      },
      {
        label: 'Limited: one or two tool calls at most',
        sub: 'Search then answer, lookup then respond',
        scores: { rules: 2, ml: 2, dl: 1, genai: 6, direct: 3, rag: 8, agents: 4 },
      },
      {
        label: 'High: plan and execute multi-step workflows',
        sub: 'Full agentic loop with decision-making',
        scores: { rules: 0, ml: 0, dl: 0, genai: 2, direct: 0, rag: 1, agents: 10 },
      },
    ],
  },
  {
    id: 'interpretability',
    text: 'How important is it to explain why the system made a decision?',
    hint: 'Regulated industries, legal, medical, and finance often require full auditability.',
    options: [
      {
        label: 'Critical: we need full auditability and traceability',
        sub: 'Regulatory, compliance, legal contexts',
        scores: { rules: 10, ml: 8, dl: 2, genai: 1, direct: 5, rag: 2, agents: 1 },
      },
      {
        label: 'Moderate: helpful but not mandatory',
        scores: { rules: 6, ml: 7, dl: 4, genai: 4, direct: 5, rag: 5, agents: 3 },
      },
      {
        label: 'Low: results matter more than explainability',
        scores: { rules: 2, ml: 4, dl: 9, genai: 8, direct: 5, rag: 6, agents: 7 },
      },
    ],
  },
  {
    id: 'latency',
    text: 'What are your latency and cost constraints?',
    hint: 'Real-time systems have very different trade-offs than batch processing.',
    options: [
      {
        label: 'Real-time: response must be sub-second',
        sub: 'User-facing UX, embedded systems, trading',
        scores: { rules: 10, ml: 9, dl: 5, genai: 3, direct: 8, rag: 3, agents: 1 },
      },
      {
        label: 'Near real-time: a few seconds is acceptable',
        sub: 'Chat apps, search, interactive tools',
        scores: { rules: 6, ml: 6, dl: 5, genai: 8, direct: 7, rag: 8, agents: 4 },
      },
      {
        label: 'Batch or async: minutes to hours is fine',
        sub: 'Reports, pipelines, research, back-office',
        scores: { rules: 3, ml: 7, dl: 8, genai: 4, direct: 4, rag: 5, agents: 9 },
      },
    ],
  },
  {
    id: 'complexity',
    text: 'How complex and unstructured is your input data?',
    hint: 'Think about what goes into the system, not what comes out.',
    options: [
      {
        label: 'Structured tables or numbers',
        sub: 'CSV, SQL, spreadsheets, numeric feeds',
        scores: { rules: 8, ml: 10, dl: 5, genai: 1, direct: 8, rag: 0, agents: 2 },
      },
      {
        label: 'Plain text or natural language',
        sub: 'Documents, emails, chat logs, contracts',
        scores: { rules: 2, ml: 2, dl: 3, genai: 9, direct: 6, rag: 8, agents: 5 },
      },
      {
        label: 'Images, audio, or video',
        sub: 'Unstructured media files',
        scores: { rules: 0, ml: 2, dl: 10, genai: 3, direct: 7, rag: 1, agents: 2 },
      },
      {
        label: 'Mixed: multiple data types combined',
        sub: 'Text + images + structured data',
        scores: { rules: 1, ml: 3, dl: 7, genai: 6, direct: 3, rag: 5, agents: 8 },
      },
    ],
  },
  {
    id: 'build',
    text: "What is your team's primary constraint?",
    hint: 'This helps weigh build vs. buy trade-offs.',
    options: [
      {
        label: 'Speed: we need to ship something fast',
        sub: 'MVP, prototype, demo, proof of concept',
        scores: { rules: 7, ml: 3, dl: 1, genai: 9, direct: 9, rag: 7, agents: 6 },
      },
      {
        label: 'Cost: we need to minimise ongoing expenses',
        sub: 'Tight budget, high volume, no per-call pricing',
        scores: { rules: 10, ml: 9, dl: 5, genai: 3, direct: 7, rag: 4, agents: 2 },
      },
      {
        label: 'Control: we want full ownership of the model',
        sub: 'On-premise, compliance, IP concerns',
        scores: { rules: 8, ml: 8, dl: 8, genai: 3, direct: 6, rag: 5, agents: 2 },
      },
      {
        label: 'Capability: we need the most powerful result',
        sub: 'Accuracy, creativity, and flexibility matter most',
        scores: { rules: 1, ml: 4, dl: 8, genai: 7, direct: 3, rag: 6, agents: 9 },
      },
    ],
  },
];

export const DESCRIPTIONS: Record<string, Description> = {
  rules: {
    short: 'Deterministic if-then logic',
    long: 'Fixed business rules execute predictable, auditable decisions with zero ambiguity. Best for compliance checks, routing, validation, and any process where the logic can be fully specified upfront. The most cost-effective, fastest, and most transparent approach when the problem fits.',
    when: 'when the decision logic is fully known and does not require learning from data',
  },
  ml: {
    short: 'Statistical models on structured data',
    long: 'Classic Machine Learning (Random Forest, XGBoost, Logistic Regression) learns patterns from structured tabular data with high interpretability. Best for prediction, classification, and regression where data is clean, outcomes are measurable, and auditability matters.',
    when: 'when you have structured data with known outcomes and need explainable predictions',
  },
  dl: {
    short: 'Neural networks for complex perception',
    long: 'Deep Learning trains multi-layer neural architectures on large datasets. Think CNNs for images, transformers for language and audio. Best for complex perceptual tasks (vision, speech, signal processing) where massive labelled data is available and the problem defies hand-crafted rules.',
    when: 'when the input is unstructured media and you have enough labelled data to train on',
  },
  genai: {
    short: 'LLMs for language and content generation',
    long: 'Generative AI covers large language models (Claude, GPT, Gemini) that create new content, reason over text, and handle language tasks with no task-specific training data. Fast to prototype, powerful for generation, summarisation, and Q&A. Harder to productionise reliably at scale.',
    when: 'when you need language understanding or generation and want to move fast',
  },
  direct: {
    short: 'Call the model directly, no extra plumbing',
    long: "Direct Integration means calling the AI model (ML endpoint or LLM API) without retrieval layers, orchestration, or autonomous tooling. The simplest architecture: send input, get output. Lowest operational complexity, fastest to deploy, and easiest to debug. The right default until your requirements prove otherwise.",
    when: 'when the task can be solved with a single model call and no external data injection or multi-step orchestration',
  },
  rag: {
    short: 'Gen AI grounded in your data',
    long: "Retrieval-Augmented Generation connects a Gen AI model to your private documents or database at query time. It retrieves relevant context before generating a response, reducing hallucination and keeping answers grounded in your actual knowledge. Adds architectural complexity but solves the \"it doesn't know our stuff\" problem.",
    when: 'when Gen AI needs access to proprietary, domain-specific, or frequently updated information',
  },
  agents: {
    short: 'Autonomous multi-step AI systems',
    long: 'AI Agents combine a Gen AI brain with tools (web search, APIs, code execution, databases) to plan and execute multi-step goals autonomously. The most capable pattern, and the highest-risk if governance is not designed in from day one. Best when the problem genuinely requires dynamic decision-making and external actions.',
    when: 'when the task requires planning, tool use, and sequential decision-making beyond a single response',
  },
};
