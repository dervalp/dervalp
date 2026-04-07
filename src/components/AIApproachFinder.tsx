import { useState } from 'react';
import styles from './AIApproachFinder.module.css';
import {
  BRAIN_TYPES,
  ARCH_TYPES,
  ALL_APPROACHES,
  QUESTIONS,
  DESCRIPTIONS,
  type Approach,
  type Question,
} from '../data/aiApproachFinder';
import { showExportDialog } from '../utils/exportDialog';

// ─── Pure scoring utilities (identical logic to the original HTML) ──────────

function calcScores(answers: Record<string, number>): Record<string, number> {
  const scores: Record<string, number> = {};
  ALL_APPROACHES.forEach(a => (scores[a.id] = 0));
  QUESTIONS.forEach(q => {
    const idx = answers[q.id];
    if (idx === undefined) return;
    const opt = q.options[idx];
    ALL_APPROACHES.forEach(a => {
      scores[a.id] += opt.scores[a.id] ?? 0;
    });
  });
  return scores;
}

function normaliseScores(scores: Record<string, number>): Record<string, number> {
  const maxPossible: Record<string, number> = {};
  ALL_APPROACHES.forEach(a => (maxPossible[a.id] = 0));
  QUESTIONS.forEach(q => {
    ALL_APPROACHES.forEach(a => {
      const best = Math.max(...q.options.map(o => o.scores[a.id] ?? 0));
      maxPossible[a.id] += best;
    });
  });
  const pcts: Record<string, number> = {};
  ALL_APPROACHES.forEach(a => {
    pcts[a.id] =
      maxPossible[a.id] > 0
        ? Math.round((scores[a.id] / maxPossible[a.id]) * 100)
        : 0;
  });
  return pcts;
}

function getQualitativeLabel(
  rawScore: number,
  topScore: number,
): { text: string; css: string } {
  if (topScore === 0) return { text: 'No Signal', css: styles.unlikely };
  const ratio = rawScore / topScore;
  if (ratio >= 0.92) return { text: 'Strong Fit',        css: styles.strongFit };
  if (ratio >= 0.65) return { text: 'Worth Considering', css: styles.worthConsidering };
  if (ratio >= 0.40) return { text: 'Possible',          css: styles.possible };
  return { text: 'Unlikely Fit', css: styles.unlikely };
}

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function buildReasoning(
  topBrain: Approach,
  topArch: Approach,
  brainSorted: Approach[],
  _archSorted: Approach[],
  rawScores: Record<string, number>,
): string {
  const lines: string[] = [];

  lines.push(
    `Based on your answers, <strong>${topBrain.name}</strong> is the strongest fit as your core AI approach.`,
  );

  if (topBrain.id === 'rules') {
    lines.push(
      'Your problem has deterministic logic, strict auditability requirements, and structured inputs. This is a case where traditional software engineering delivers better than any AI model.',
    );
  } else if (topBrain.id === 'ml') {
    lines.push(
      'Your data is structured, your outcomes are measurable, and explainability matters. Classic ML gives you the best balance of accuracy, cost, and transparency.',
    );
  } else if (topBrain.id === 'dl') {
    lines.push(
      'Your inputs are complex and unstructured: images, audio, or high-dimensional data. Deep learning architectures are purpose-built for this class of problem.',
    );
  } else if (topBrain.id === 'genai') {
    lines.push(
      'You need language understanding, content generation, or reasoning over text. Generative AI is the fastest path from zero to a working prototype.',
    );
  }

  lines.push(
    `<br><br>On the architecture layer, <strong>${topArch.name}</strong> is the strongest deployment pattern.`,
  );

  if (topArch.id === 'direct') {
    lines.push(
      'Your use case does not require retrieval from private data or multi-step orchestration. A direct API call to the model is the simplest, fastest, and most maintainable path. Start here and add complexity only when the requirements demand it.',
    );
  } else if (topArch.id === 'rag') {
    lines.push(
      "You have private or time-sensitive knowledge that a public model won't know. RAG retrieves that context at query time, grounding the model in your data and reducing hallucination.",
    );
  } else if (topArch.id === 'agents') {
    lines.push(
      'Your problem requires multi-step execution, tool use, and autonomous decision-making. An agentic architecture gives the AI the ability to plan and act, but requires strong governance guardrails.',
    );
  }

  const second = brainSorted[1];
  const topBrainRaw = rawScores[topBrain.id];
  const secondRatio = topBrainRaw > 0 ? rawScores[second.id] / topBrainRaw : 0;
  if (secondRatio >= 0.65) {
    lines.push(
      `<br><br><strong>${second.name}</strong> is also worth considering, particularly if your constraints shift or you want to compare approaches in a prototype phase.`,
    );
  }

  return lines.join(' ');
}

// ─── Sub-components ─────────────────────────────────────────────────────────

interface OptionItemProps {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}

function OptionItem({ label, sub, selected, onClick }: OptionItemProps) {
  return (
    <div
      className={`${styles.option}${selected ? ' ' + styles.selected : ''}`}
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={styles.optionDot} />
      <div className={styles.optionLabel}>
        <strong>{label}</strong>
        {sub && <span className={styles.sub}>{sub}</span>}
      </div>
    </div>
  );
}

interface QuestionStepProps {
  question: Question;
  index: number;
  total: number;
  selected: number | undefined;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onBack: () => void;
}

function QuestionStep({
  question,
  index,
  total,
  selected,
  onSelect,
  onNext,
  onBack,
}: QuestionStepProps) {
  const progress = (index / total) * 100;
  const isLast = index === total - 1;

  return (
    <>
      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.progressLabel}>
          {index + 1} / {total}
        </div>
      </div>

      <div className={styles.questionCard}>
        <div className={styles.qNumber}>Question {index + 1}</div>
        <div className={styles.qText}>{question.text}</div>
        <div className={styles.qHint}>{question.hint}</div>
        <div className={styles.options} role="radiogroup" aria-label={question.text}>
          {question.options.map((opt, i) => (
            <OptionItem
              key={i}
              label={opt.label}
              sub={opt.sub}
              selected={selected === i}
              onClick={() => onSelect(i)}
            />
          ))}
        </div>
      </div>

      <div className={styles.nav}>
        <button
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={onBack}
          disabled={index === 0}
          aria-label="Go to previous question"
        >
          ← Back
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={onNext}
          disabled={selected === undefined}
          aria-label={isLast ? 'See results' : 'Go to next question'}
        >
          {isLast ? 'See Results →' : 'Next →'}
        </button>
      </div>
    </>
  );
}

interface ScoreCardProps {
  approach: Approach;
  rawScores: Record<string, number>;
  index: number;
  topRaw: number;
}

function ScoreCard({ approach, rawScores, index, topRaw }: ScoreCardProps) {
  const isTop = index === 0;
  const raw = rawScores[approach.id];
  const barWidth = topRaw > 0 ? Math.round((raw / topRaw) * 100) : 0;
  const desc = DESCRIPTIONS[approach.id];
  const label = isTop
    ? { text: 'Strong Fit', css: styles.strongFit }
    : getQualitativeLabel(raw, topRaw);

  return (
    <div className={`${styles.scoreCard}${isTop ? ' ' + styles.top : ''}`}>
      <div className={styles.scoreTopRow}>
        <div className={styles.scoreName}>{approach.name}</div>
        <div className={styles.scoreRank}>
          <span className={`${styles.rankLabel} ${label.css}`}>{label.text}</span>
          <span className={styles.rankOrdinal}>{getOrdinal(index + 1)}</span>
        </div>
      </div>
      <div className={styles.scoreBarBg}>
        <div
          className={styles.scoreBarFill}
          style={{ width: `${barWidth}%`, background: approach.fill }}
        />
      </div>
      <div className={styles.scoreWhy}>
        <strong>{desc.short}.</strong> {desc.long}
        {isTop && (
          <>
            <br />
            <br />
            <span style={{ fontWeight: 500 }}>Recommended {desc.when}.</span>
          </>
        )}
      </div>
    </div>
  );
}

interface ResultsViewProps {
  answers: Record<string, number>;
  onRestart: () => void;
}

function ResultsView({ answers, onRestart }: ResultsViewProps) {
  const raw = calcScores(answers);
  const pcts = normaliseScores(raw);

  const brainSorted = [...BRAIN_TYPES].sort((a, b) => raw[b.id] - raw[a.id]);
  const archSorted  = [...ARCH_TYPES].sort((a, b) => raw[b.id] - raw[a.id]);

  const topBrain    = brainSorted[0];
  const topArch     = archSorted[0];
  const topBrainRaw = raw[topBrain.id];
  const topArchRaw  = raw[topArch.id];

  const reasoning = buildReasoning(topBrain, topArch, brainSorted, archSorted, raw);

  const handleDownloadPDF = async () => {
    const result = await showExportDialog("AI Approach Finder");
    if (!result) return;
    const topRaw = Math.max(...Object.values(raw));
    const brainRanking = brainSorted.map(a => ({ name: a.name, pct: pcts[a.id], label: getQualitativeLabel(raw[a.id], topRaw).text, color: a.fill }));
    const archRanking = archSorted.map(a => ({ name: a.name, pct: pcts[a.id], label: getQualitativeLabel(raw[a.id], topRaw).text, color: a.fill }));
    const scores: Record<string, number> = {};
    [...brainSorted, ...archSorted].forEach(a => { scores[a.name] = pcts[a.id]; });
    import("../utils/leadCapture").then(m => m.captureLead({
      email: result.email, name: result.name, tool: "AI Approach Finder", scores,
      verdict: `${brainSorted[0].name} + ${archSorted[0].name}`,
    }));
    const qaItems = QUESTIONS.map(q => ({
      question: q.text,
      answer: answers[q.id] !== undefined ? q.options[answers[q.id]].label : "Not answered",
    }));
    const { generateApproachPDF } = await import("../utils/pdfReport");
    generateApproachPDF({
      brainRanking, archRanking,
      topBrain: { name: brainSorted[0].name, description: DESCRIPTIONS[brainSorted[0].id].long },
      topArch: { name: archSorted[0].name, description: DESCRIPTIONS[archSorted[0].id].long },
      qaItems,
    }).save("AI-Approach-Report.pdf");
  };

  return (
    <div className={styles.results}>
      <div className={styles.resultsHeader}>
        <div className={styles.tag}>Results</div>
        <h2>Your AI Approach Profile</h2>
        <p>Ranked by fit across {QUESTIONS.length} dimensions, split into two layers</p>
      </div>

      <div className={styles.sectionHeader}>
        <div className={`${styles.sectionIcon} ${styles.brain}`} aria-hidden="true">
          ◉
        </div>
        <div className={`${styles.sectionLabel} ${styles.brain}`}>The Right AI Brain</div>
        <div className={styles.sectionSublabel}>Which core technology fits</div>
      </div>

      {brainSorted.map((a, i) => (
        <ScoreCard key={a.id} approach={a} rawScores={raw} index={i} topRaw={topBrainRaw} />
      ))}

      <div className={styles.sectionHeader} style={{ marginTop: 36 }}>
        <div className={`${styles.sectionIcon} ${styles.arch}`} aria-hidden="true">
          △
        </div>
        <div className={`${styles.sectionLabel} ${styles.arch}`}>The Right Architecture</div>
        <div className={styles.sectionSublabel}>How to deploy it</div>
      </div>

      {archSorted.map((a, i) => (
        <ScoreCard key={a.id} approach={a} rawScores={raw} index={i} topRaw={topArchRaw} />
      ))}

      <div className={styles.reasoningCard}>
        <h3>Why this recommendation</h3>
        {/*
          Safe: `reasoning` is generated entirely by our own buildReasoning()
          function above from static DESCRIPTIONS and approach names — never
          from user input — so dangerouslySetInnerHTML is acceptable here.
        */}
        <p dangerouslySetInnerHTML={{ __html: reasoning }} />
      </div>

      <button onClick={handleDownloadPDF} style={{
        width: "100%", padding: "12px", fontSize: "0.9rem", fontWeight: 600,
        background: "#161c20", color: "#f7f4ef", border: "none", borderRadius: "8px",
        cursor: "pointer", fontFamily: "inherit", marginTop: "1.5rem",
      }}>Download PDF report</button>

      <div className={styles.restartWrap}>
        <button
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={onRestart}
          aria-label="Restart the quiz"
        >
          ← Start over
        </button>
      </div>

      <p className={styles.disclaimer}>
        This tool provides directional guidance only. It is not a substitute for a
        professional assessment of your organisation's data, infrastructure, and
        delivery readiness. Consult a qualified advisor before committing to an AI
        approach or making investment decisions.
      </p>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function AIApproachFinder() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelect = (idx: number) => {
    const q = QUESTIONS[currentQ];
    setAnswers(prev => ({ ...prev, [q.id]: idx }));
  };

  const handleNext = () => {
    if (answers[QUESTIONS[currentQ].id] === undefined) return;
    setCurrentQ(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(prev => prev - 1);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrap}>
      {currentQ < QUESTIONS.length ? (
        <QuestionStep
          question={QUESTIONS[currentQ]}
          index={currentQ}
          total={QUESTIONS.length}
          selected={answers[QUESTIONS[currentQ].id]}
          onSelect={handleSelect}
          onNext={handleNext}
          onBack={handleBack}
        />
      ) : (
        <ResultsView answers={answers} onRestart={handleRestart} />
      )}
    </div>
  );
}
