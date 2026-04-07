import { useState, useEffect } from 'react';
import styles from './AIBusinessCaseScorecard.module.css';
import {
  DIMENSIONS,
  QUESTIONS,
  STRENGTH_THRESHOLDS,
  VERDICT_TIERS,
  DIM_DESCRIPTIONS,
  DIM_ACTIONS,
  type DimId,
  type StrengthKey,
} from '../data/aiBusinessCaseScorecard';
import { showExportDialog } from '../utils/exportDialog';

// ─── Scoring ───────────────────────────────────────────────────────────────

function calcRaw(answers: Record<string, number>): Record<DimId, number> {
  const raw = Object.fromEntries(DIMENSIONS.map(d => [d.id, 0])) as Record<DimId, number>;
  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx === undefined) continue;
    const opt = q.options[idx];
    for (const d of DIMENSIONS) {
      raw[d.id] += opt.scores[d.id] ?? 0;
    }
  }
  return raw;
}

const MAX_RAW: Record<DimId, number> = (() => {
  const max = Object.fromEntries(DIMENSIONS.map(d => [d.id, 0])) as Record<DimId, number>;
  for (const q of QUESTIONS) {
    for (const d of DIMENSIONS) {
      max[d.id] += Math.max(...q.options.map(o => o.scores[d.id]));
    }
  }
  return max;
})();

function calcPcts(answers: Record<string, number>): Record<DimId, number> {
  const raw = calcRaw(answers);
  return Object.fromEntries(
    DIMENSIONS.map(d => [
      d.id,
      MAX_RAW[d.id] > 0 ? Math.round((raw[d.id] / MAX_RAW[d.id]) * 100) : 0,
    ]),
  ) as Record<DimId, number>;
}

function getStrength(pct: number) {
  return STRENGTH_THRESHOLDS.find(t => pct >= t.min)!;
}

function getVerdict(pcts: Record<DimId, number>) {
  const vals = Object.values(pcts);
  const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  const min = Math.min(...vals);
  return { tier: VERDICT_TIERS.find(t => t.test(avg, min))!, avg };
}

const badgeClassMap: Record<StrengthKey, string> = {
  strong:  styles.badgeStrong,
  solid:   styles.badgeSolid,
  partial: styles.badgePartial,
  weak:    styles.badgeWeak,
};

// ─── OptionItem ────────────────────────────────────────────────────────────

interface OptionItemProps {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}

function OptionItem({ label, sub, selected, onClick }: OptionItemProps) {
  return (
    <button
      type="button"
      className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span
        className={`${styles.radio} ${selected ? styles.radioFilled : ''}`}
        aria-hidden="true"
      />
      <span className={styles.optionContent}>
        <span className={styles.optionLabel}>{label}</span>
        {sub && <span className={styles.optionSub}>{sub}</span>}
      </span>
    </button>
  );
}

// ─── QuestionStep ──────────────────────────────────────────────────────────

interface QuestionStepProps {
  question: (typeof QUESTIONS)[number];
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
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const hasAnswer = selected !== undefined;
  const progress = ((index + 1) / total) * 100;

  return (
    <div className={styles.wrap}>
      <div className={styles.progressRow}>
        <span className={styles.progressLabel}>
          Question {index + 1} of {total}
        </span>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={`${styles.card} ${styles.slideIn}`} key={question.id}>
        <p className={styles.questionText}>{question.text}</p>
        <p className={styles.questionHint}>{question.hint}</p>

        <div className={styles.options}>
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

        <div className={styles.navRow}>
          <button
            type="button"
            className={styles.btnBack}
            onClick={onBack}
            disabled={isFirst}
          >
            Back
          </button>
          <button
            type="button"
            className={styles.btnNext}
            onClick={onNext}
            disabled={!hasAnswer}
          >
            {isLast ? 'See results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DimensionCard ─────────────────────────────────────────────────────────

interface DimensionCardProps {
  dim: (typeof DIMENSIONS)[number];
  pct: number;
  mounted: boolean;
}

function DimensionCard({ dim, pct, mounted }: DimensionCardProps) {
  const strength = getStrength(pct);
  const desc = DIM_DESCRIPTIONS[dim.id][strength.key];

  return (
    <div className={styles.dimCard}>
      <div className={styles.dimHeader}>
        <span className={styles.dimName}>{dim.label}</span>
        <div className={styles.dimRight}>
          <span className={`${styles.badge} ${badgeClassMap[strength.key]}`}>
            {strength.label}
          </span>
          <span className={styles.dimPct}>{pct}%</span>
        </div>
      </div>
      <div className={styles.dimTrack}>
        <div
          className={styles.dimBar}
          style={{ width: mounted ? `${pct}%` : '0%', backgroundColor: dim.fill }}
        />
      </div>
      <p className={styles.dimDesc}>{desc}</p>
    </div>
  );
}

// ─── ResultsView ───────────────────────────────────────────────────────────

interface ResultsViewProps {
  answers: Record<string, number>;
  onRestart: () => void;
}

function ResultsView({ answers, onRestart }: ResultsViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const pcts = calcPcts(answers);
  const { tier, avg } = getVerdict(pcts);

  const sortedDims = [...DIMENSIONS].sort((a, b) => pcts[b.id] - pcts[a.id]);

  const weakDims = [...DIMENSIONS]
    .filter(d => pcts[d.id] < 55)
    .sort((a, b) => pcts[a.id] - pcts[b.id]);

  const allSolid = weakDims.length === 0;
  const lowestDim = sortedDims[sortedDims.length - 1];

  const handleDownloadPDF = async () => {
    const result = await showExportDialog("AI Business Case Scorecard");
    if (!result) return;
    const dimData = DIMENSIONS.map(d => ({
      label: d.label, pct: pcts[d.id], color: d.fill,
      strength: STRENGTH_THRESHOLDS.find(t => pcts[d.id] >= t.min)?.label ?? "Weak",
    }));
    const wdActions = DIMENSIONS.filter(d => pcts[d.id] < 55).map(d => ({ label: d.label, action: DIM_ACTIONS[d.id] }));
    const scores: Record<string, number> = {};
    DIMENSIONS.forEach(d => { scores[d.label] = pcts[d.id]; });
    import("../utils/leadCapture").then(m => m.captureLead({
      email: result.email, name: result.name, tool: "AI Business Case Scorecard", scores, verdict: tier.title,
    }));
    const qaItems = QUESTIONS.map(q => ({
      question: q.text,
      answer: answers[q.id] !== undefined ? q.options[answers[q.id]].label : "Not answered",
    }));
    const { generateScorecardPDF } = await import("../utils/pdfReport");
    generateScorecardPDF({ dimensions: dimData, avg, verdict: { title: tier.title, description: tier.description }, weakDims: wdActions, qaItems }).save("Business-Case-Scorecard.pdf");
  };

  return (
    <div className={`${styles.wrap} ${styles.slideIn}`}>
      <div className={styles.results}>
        {/* Verdict */}
        <div className={styles.verdictCard}>
          <div className={styles.verdictMeta}>
            <span className={styles.verdictEyebrow}>Overall score</span>
            <span className={styles.verdictPct}>{avg}%</span>
          </div>
          <h2 className={styles.verdictTitle}>{tier.title}</h2>
          <p className={styles.verdictDesc}>{tier.description}</p>
        </div>

        {/* Dimension breakdown */}
        <p className={styles.sectionLabel}>Dimension breakdown</p>
        <div className={styles.dimList}>
          {sortedDims.map(d => (
            <DimensionCard key={d.id} dim={d} pct={pcts[d.id]} mounted={mounted} />
          ))}
        </div>

        {/* Actions or next step */}
        {allSolid ? (
          <div className={styles.nextStepCard}>
            <p className={styles.nextStepTitle}>Your next step</p>
            <p className={styles.nextStepText}>
              Your business case is well-structured across all dimensions. Draft the one-page
              executive summary and pressure-test it with your sponsor before presenting to
              leadership. Focus your preparation on your lowest-scoring dimension:{' '}
              <strong>{lowestDim.label}</strong>.
            </p>
          </div>
        ) : (
          <div className={styles.actionsCard}>
            <p className={styles.actionsTitle}>What to strengthen first</p>
            <ol className={styles.actionList}>
              {weakDims.map((d, i) => (
                <li key={d.id} className={styles.actionItem}>
                  <span className={styles.actionNum}>{i + 1}</span>
                  <div>
                    <strong className={styles.actionDim}>{d.label}</strong>
                    <p className={styles.actionText}>{DIM_ACTIONS[d.id]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <button type="button" onClick={handleDownloadPDF} style={{
          width: "100%", padding: "12px", fontSize: "0.9rem", fontWeight: 600,
          background: "#161c20", color: "#f7f4ef", border: "none", borderRadius: "8px",
          cursor: "pointer", fontFamily: "inherit", marginTop: "1rem",
        }}>Download PDF report</button>
        <button type="button" className={styles.restartBtn} onClick={onRestart}>
          Start over
        </button>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function AIBusinessCaseScorecard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const isResults = step >= QUESTIONS.length;
  const q = !isResults ? QUESTIONS[step] : null;

  function handleSelect(idx: number) {
    if (q) setAnswers(prev => ({ ...prev, [q.id]: idx }));
  }

  function handleNext() {
    setStep(s => s + 1);
  }

  function handleBack() {
    setStep(s => Math.max(0, s - 1));
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
  }

  if (isResults) {
    return <ResultsView answers={answers} onRestart={handleRestart} />;
  }

  return (
    <QuestionStep
      question={q!}
      index={step}
      total={QUESTIONS.length}
      selected={answers[q!.id]}
      onSelect={handleSelect}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
}
