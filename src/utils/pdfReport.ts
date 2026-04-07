/**
 * Branded PDF report generator using jsPDF.
 * Produces clean, professional single-page reports for each diagnostic tool.
 */
import { jsPDF } from "jspdf";

// ── Brand constants ──
const COLORS = {
  ink950: "#0e1110",
  ink600: "#3a4640",
  ink400: "#6b7a70",
  accent: "#4a5c3c",
  canvas: "#faf9f5",
  white: "#ffffff",
  line: "#d4d4d0",
};

const PAGE_W = 210; // A4 mm
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;

// ── Helpers ──

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
}

function addHeader(doc: jsPDF, toolName: string) {
  doc.setFontSize(8);
  doc.setTextColor(...hexToRgb(COLORS.ink400));
  doc.text("PIERRE DERVAL", MARGIN, 14);
  doc.text(toolName.toUpperCase(), PAGE_W - MARGIN, 14, { align: "right" });
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, 17, PAGE_W - MARGIN, 17);
}

function addFooter(doc: jsPDF) {
  const y = 282;
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  doc.setFontSize(7);
  doc.setTextColor(...hexToRgb(COLORS.ink400));
  doc.text("Generated at dervalp.github.io/dervalp", MARGIN, y + 5);
  doc.text(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), PAGE_W - MARGIN, y + 5, { align: "right" });
}

function drawBar(doc: jsPDF, x: number, y: number, w: number, pct: number, color: string) {
  // Track
  doc.setFillColor(230, 230, 226);
  doc.roundedRect(x, y, w, 4, 2, 2, "F");
  // Fill
  if (pct > 0) {
    const [r, g, b] = hexToRgb(color);
    doc.setFillColor(r, g, b);
    doc.roundedRect(x, y, Math.max(w * (pct / 100), 4), 4, 2, 2, "F");
  }
}

function drawVerdictBadge(doc: jsPDF, x: number, y: number, label: string, bg: string, fg: string) {
  const [br, bg2, bb] = hexToRgb(bg);
  const [fr, fg2, fb] = hexToRgb(fg);
  const tw = doc.getTextWidth(label) + 8;
  doc.setFillColor(br, bg2, bb);
  doc.roundedRect(x, y - 3.5, tw, 6, 3, 3, "F");
  doc.setFontSize(7.5);
  doc.setTextColor(fr, fg2, fb);
  doc.text(label, x + 4, y + 0.5);
}

// ── Shared Q&A appendix ──

export interface QAItem {
  question: string;
  answer: string;
  section?: string;
}

function addQAPages(doc: jsPDF, toolName: string, qaItems: QAItem[]): void {
  if (!qaItems || qaItems.length === 0) return;

  doc.addPage();
  addHeader(doc, toolName);
  let y = 28;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Your Responses", MARGIN, y);
  y += 12;

  let lastSection = "";

  for (const item of qaItems) {
    // Estimate space needed
    const needsSection = item.section && item.section !== lastSection;
    const estimatedHeight = needsSection ? 28 : 16;

    if (y + estimatedHeight > 272) {
      addFooter(doc);
      doc.addPage();
      addHeader(doc, toolName);
      y = 28;
    }

    // Section header
    if (needsSection) {
      lastSection = item.section!;
      y += 3;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...hexToRgb(COLORS.accent));
      doc.text(item.section!, MARGIN, y);
      y += 2;
      doc.setDrawColor(...hexToRgb(COLORS.line));
      doc.line(MARGIN, y, PAGE_W - MARGIN, y);
      y += 6;
    }

    // Question
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hexToRgb(COLORS.ink600));
    const qLines = doc.splitTextToSize(item.question, CONTENT_W);
    doc.text(qLines, MARGIN, y);
    y += qLines.length * 3.5 + 2;

    // Page break check before answer
    if (y > 272) {
      addFooter(doc);
      doc.addPage();
      addHeader(doc, toolName);
      y = 28;
    }

    // Answer
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hexToRgb(COLORS.ink950));
    const aLines = doc.splitTextToSize(item.answer, CONTENT_W - 4);
    doc.text(aLines, MARGIN + 4, y);
    y += aLines.length * 3.5 + 5;
  }

  addFooter(doc);
}

// ── Checklist Report (AI Readiness & Data Readiness) ──

export interface ChecklistScores {
  title: string;
  dimensions: { label: string; checked: number; total: number; pct: number; color: string }[];
  totalPct: number;
  verdict: { label: string; bg: string; text: string };
  qaItems?: QAItem[];
}

export function generateChecklistPDF(data: ChecklistScores): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  addHeader(doc, data.title);

  let y = 28;

  // Title
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text(data.title, MARGIN, y);
  y += 10;

  // Overall score + verdict
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.totalPct}%`, MARGIN, y + 10);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.ink400));
  doc.text("overall readiness", MARGIN + doc.getTextWidth(`${data.totalPct}%  `) + 2, y + 10);

  if (data.totalPct > 0) {
    drawVerdictBadge(doc, MARGIN, y + 18, data.verdict.label, data.verdict.bg, data.verdict.text);
  }
  y += 30;

  // Dimension breakdown
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Dimension Breakdown", MARGIN, y);
  y += 10;

  const labelW = 50;
  const barX = MARGIN + labelW + 4;
  const barW = CONTENT_W - labelW - 30;

  data.dimensions.forEach((dim) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hexToRgb(COLORS.ink600));
    doc.text(dim.label, MARGIN, y + 2.5);

    drawBar(doc, barX, y, barW, dim.pct, dim.color);

    doc.setFontSize(8);
    doc.setTextColor(...hexToRgb(COLORS.ink400));
    doc.text(`${dim.checked}/${dim.total}`, barX + barW + 4, y + 3);

    y += 10;
  });

  // CTA
  y += 10;
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Want to discuss your results?", MARGIN, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.accent));
  doc.text("Book a free diagnostic call at calendly.com/dervalp/30min", MARGIN, y);

  addFooter(doc);
  if (data.qaItems?.length) addQAPages(doc, data.title, data.qaItems);
  return doc;
}

// ── Business Case Scorecard Report ──

export interface ScorecardScores {
  dimensions: { label: string; pct: number; color: string; strength: string }[];
  avg: number;
  verdict: { title: string; description: string };
  weakDims: { label: string; action: string }[];
  qaItems?: QAItem[];
}

export function generateScorecardPDF(data: ScorecardScores): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  addHeader(doc, "AI Business Case Scorecard");

  let y = 28;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("AI Business Case Scorecard", MARGIN, y);
  y += 12;

  // Verdict
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text(data.verdict.title, MARGIN, y);
  y += 7;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.ink600));
  const descLines = doc.splitTextToSize(data.verdict.description, CONTENT_W);
  doc.text(descLines, MARGIN, y);
  y += descLines.length * 5 + 8;

  // Average
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text(`${data.avg}%`, MARGIN, y);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.ink400));
  doc.text("average score", MARGIN + 22, y);
  y += 12;

  // Dimensions
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Dimension Breakdown", MARGIN, y);
  y += 10;

  const labelW = 55;
  const barX = MARGIN + labelW + 4;
  const barW = CONTENT_W - labelW - 30;

  data.dimensions.forEach((dim) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hexToRgb(COLORS.ink600));
    doc.text(dim.label, MARGIN, y + 2.5);
    drawBar(doc, barX, y, barW, dim.pct, dim.color);
    doc.setFontSize(8);
    doc.setTextColor(...hexToRgb(COLORS.ink400));
    doc.text(`${dim.pct}% ${dim.strength}`, barX + barW + 4, y + 3);
    y += 10;
  });

  // Weak dimensions & actions
  if (data.weakDims.length > 0) {
    y += 6;
    doc.setDrawColor(...hexToRgb(COLORS.line));
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hexToRgb(COLORS.ink950));
    doc.text("Recommended Actions", MARGIN, y);
    y += 8;

    data.weakDims.forEach((wd) => {
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...hexToRgb(COLORS.ink600));
      doc.text(`${wd.label}:`, MARGIN, y);
      doc.setFont("helvetica", "normal");
      const actionLines = doc.splitTextToSize(wd.action, CONTENT_W - 4);
      doc.text(actionLines, MARGIN + 2, y + 5);
      y += 5 + actionLines.length * 4.5 + 4;
    });
  }

  // CTA
  y += 8;
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Want to discuss your results?", MARGIN, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.accent));
  doc.text("Book a free diagnostic call at calendly.com/dervalp/30min", MARGIN, y);

  addFooter(doc);
  if (data.qaItems?.length) addQAPages(doc, "AI Business Case Scorecard", data.qaItems);
  return doc;
}

// ── Approach Finder Report ──

export interface ApproachScores {
  brainRanking: { name: string; pct: number; label: string; color: string }[];
  archRanking: { name: string; pct: number; label: string; color: string }[];
  topBrain: { name: string; description: string };
  topArch: { name: string; description: string };
  qaItems?: QAItem[];
}

export function generateApproachPDF(data: ApproachScores): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  addHeader(doc, "AI Approach Finder");

  let y = 28;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("AI Approach Finder", MARGIN, y);
  y += 12;

  // Top recommendation
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Recommended Approach", MARGIN, y);
  y += 7;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(data.topBrain.name, MARGIN, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.ink600));
  const brainDesc = doc.splitTextToSize(data.topBrain.description, CONTENT_W);
  doc.text(brainDesc, MARGIN, y);
  y += brainDesc.length * 4.5 + 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Recommended Architecture", MARGIN, y);
  y += 7;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(data.topArch.name, MARGIN, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.ink600));
  const archDesc = doc.splitTextToSize(data.topArch.description, CONTENT_W);
  doc.text(archDesc, MARGIN, y);
  y += archDesc.length * 4.5 + 10;

  // Rankings
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Full Rankings — Brain Layer", MARGIN, y);
  y += 8;

  const labelW = 45;
  const barX = MARGIN + labelW + 4;
  const barW = CONTENT_W - labelW - 40;

  data.brainRanking.forEach((item) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hexToRgb(COLORS.ink600));
    doc.text(item.name, MARGIN, y + 2.5);
    drawBar(doc, barX, y, barW, item.pct, item.color);
    doc.setFontSize(7.5);
    doc.setTextColor(...hexToRgb(COLORS.ink400));
    doc.text(item.label, barX + barW + 4, y + 3);
    y += 9;
  });

  y += 6;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Full Rankings — Architecture Layer", MARGIN, y);
  y += 8;

  data.archRanking.forEach((item) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hexToRgb(COLORS.ink600));
    doc.text(item.name, MARGIN, y + 2.5);
    drawBar(doc, barX, y, barW, item.pct, item.color);
    doc.setFontSize(7.5);
    doc.setTextColor(...hexToRgb(COLORS.ink400));
    doc.text(item.label, barX + barW + 4, y + 3);
    y += 9;
  });

  // CTA
  y += 10;
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Want to discuss your results?", MARGIN, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.accent));
  doc.text("Book a free diagnostic call at calendly.com/dervalp/30min", MARGIN, y);

  addFooter(doc);
  if (data.qaItems?.length) addQAPages(doc, "AI Approach Finder", data.qaItems);
  return doc;
}

// ── Project Scoper Summary Report ──

export interface ScoperScores {
  projectName: string;
  approach: string;
  domain: string;
  teamSize: string;
  timeline: string;
  dimensions: { label: string; score: number; maxScore: number; level: string; color: string }[];
  overallPct: number;
  taskCount: number;
  riskCount: number;
  topRisks: { title: string; impact: string; mitigation: string }[];
  qaItems?: QAItem[];
}

export function generateScoperPDF(data: ScoperScores): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  addHeader(doc, "AI Project Scoper");

  let y = 28;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("AI Project Scope", MARGIN, y);
  y += 8;
  doc.setFontSize(13);
  doc.setTextColor(...hexToRgb(COLORS.ink600));
  doc.text(data.projectName || "Untitled Project", MARGIN, y);
  y += 12;

  // Profile
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.ink400));
  const profileItems = [
    `Approach: ${data.approach}`,
    `Domain: ${data.domain}`,
    `Team: ${data.teamSize}`,
    `Timeline: ${data.timeline}`,
  ].filter(Boolean);
  doc.text(profileItems.join("   |   "), MARGIN, y);
  y += 10;

  // Overall readiness
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text(`${data.overallPct}%`, MARGIN, y);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.ink400));
  doc.text(`readiness   |   ${data.taskCount} tasks   |   ${data.riskCount} risks`, MARGIN + 22, y);
  y += 12;

  // Dimensions
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Dimension Scores", MARGIN, y);
  y += 10;

  const labelW = 55;
  const barX = MARGIN + labelW + 4;
  const barW = CONTENT_W - labelW - 30;

  data.dimensions.forEach((dim) => {
    const pct = Math.round((dim.score / dim.maxScore) * 100);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hexToRgb(COLORS.ink600));
    doc.text(dim.label, MARGIN, y + 2.5);
    drawBar(doc, barX, y, barW, pct, dim.color);
    doc.setFontSize(8);
    doc.setTextColor(...hexToRgb(COLORS.ink400));
    doc.text(`${dim.score}/${dim.maxScore} ${dim.level}`, barX + barW + 4, y + 3);
    y += 10;
  });

  // Top risks
  if (data.topRisks.length > 0) {
    y += 6;
    doc.setDrawColor(...hexToRgb(COLORS.line));
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hexToRgb(COLORS.ink950));
    doc.text("Top Risks", MARGIN, y);
    y += 8;

    data.topRisks.slice(0, 5).forEach((risk) => {
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...hexToRgb(COLORS.ink600));
      doc.text(`${risk.title} (${risk.impact} impact)`, MARGIN, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      const mitLines = doc.splitTextToSize(risk.mitigation, CONTENT_W - 4);
      doc.text(mitLines, MARGIN + 2, y);
      y += mitLines.length * 4.5 + 4;
    });
  }

  // CTA
  y += 8;
  doc.setDrawColor(...hexToRgb(COLORS.line));
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(COLORS.ink950));
  doc.text("Want to discuss your results?", MARGIN, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hexToRgb(COLORS.accent));
  doc.text("Book a free diagnostic call at calendly.com/dervalp/30min", MARGIN, y);

  addFooter(doc);
  if (data.qaItems?.length) addQAPages(doc, "AI Project Scoper", data.qaItems);
  return doc;
}
