export interface CtaBlock {
  eyebrow: string;
  title: string;
  description: string;
  pills: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const CTA_BLOCKS: Record<string, CtaBlock> = {
  "data-readiness": {
    eyebrow: "Interactive tool",
    title: "Run the assessment on your own data",
    description:
      "A structured checklist across accessibility, quality, ownership, compliance, and freshness — 27 questions with a live readiness score.",
    pills: [
      "Accessibility",
      "Quality",
      "Ownership",
      "Compliance",
      "Freshness",
    ],
    ctaLabel: "Open the data readiness checklist",
    ctaHref: "/tools/data-readiness",
  },
  "ai-readiness": {
    eyebrow: "Interactive tool",
    title: "Ready to run the assessment?",
    description:
      "Work through all five dimensions with a structured checklist — questions, guidance, and a live readiness score.",
    pills: [
      "Business priority",
      "Data readiness",
      "Architecture maturity",
      "Governance",
      "Delivery capability",
    ],
    ctaLabel: "Open the checklist",
    ctaHref: "/tools/ai-readiness-checklist",
  },
};
