export const SECTIONS = [
  {
    id: "access",
    label: "Accessibility",
    icon: "🔓",
    color: "#0F6E56",
    bg: "#E1F5EE",
    darkBg: "#04342C",
    desc: "Can the data actually be extracted, moved, and used by the system you are building?",
    items: [
      { q: "Is there a documented path to extract this data from its source system?", hint: "Confirm the extraction method works end to end, including all system boundaries and transformations.", flag: "critical" },
      { q: "Have all approval and access permissions been mapped and confirmed?", hint: "Approval chains, IT security reviews, and legal sign-offs can each add weeks to a timeline.", flag: "critical" },
      { q: "Is there a stable, automated extraction method — not a manual export?", hint: "A manual spreadsheet export or one-time extract is not a reliable production data source.", flag: "important" },
      { q: "Can all required data sources be accessed from the target environment?", hint: "Firewalls, on-premise systems, and cloud boundaries all require explicit connectivity planning.", flag: "critical" },
      { q: "Are join keys available and validated across all source systems?", hint: "Cross-system joins without a reliable shared key often require significant data engineering work.", flag: "important" },
      { q: "Has integration effort been estimated and included in the project timeline?", hint: "Integration typically accounts for 40–60% of delivery effort on AI projects.", flag: "important" },
    ]
  },
  {
    id: "quality",
    label: "Quality",
    icon: "📊",
    color: "#185FA5",
    bg: "#E6F1FB",
    darkBg: "#042C53",
    desc: "Is the data complete, accurate, consistent, and sufficient in volume for AI use?",
    items: [
      { q: "Has a formal data profile been run against all sources in scope?", hint: "Null rates, format consistency, outliers, duplicates, and value distributions should all be documented.", flag: "critical" },
      { q: "Are known data quality issues documented with remediation plans — not just flagged?", hint: "Parked issues become project risks. Each known problem needs an owner and a fix date.", flag: "important" },
      { q: "Is there sufficient historical volume to train, fine-tune, or evaluate a model?", hint: "AI models require more historical examples than most teams assume; too little data means the model cannot generalise.", flag: "critical" },
      { q: "Is the data accurate — does it reflect what it claims to represent?", hint: "Data that has drifted from what it was supposed to represent will produce outputs that reflect that drift.", flag: "critical" },
      { q: "Are values consistent across the dataset — same things described the same way?", hint: "Inconsistent labelling or classification within the same field creates unpredictable model behaviour.", flag: "important" },
      { q: "Has a bias review been conducted for any use case that affects people?", hint: "Historical data reflects historical decisions. If the use case affects people, systematic bias must be assessed.", flag: "important" },
    ]
  },
  {
    id: "ownership",
    label: "Ownership",
    icon: "👤",
    color: "#BA7517",
    bg: "#FAEEDA",
    darkBg: "#412402",
    desc: "Is there a named individual accountable for each data source — not a team?",
    items: [
      { q: "Is there a named individual — not a team — accountable for each data source?", hint: "Team ownership distributes accountability so broadly that nobody acts on it. Each source needs a named person.", flag: "critical" },
      { q: "Does that person know the AI project will depend on their data?", hint: "Owners who do not know AI depends on their data will not flag changes, delays, or quality degradation.", flag: "important" },
      { q: "Is the data documented in an actively maintained data dictionary?", hint: "An undocumented data source is a risk. If the owner leaves, institutional knowledge leaves with them.", flag: "important" },
      { q: "Will the data owner remain in role for the duration of the project?", hint: "A data owner who changes mid-project creates a gap in accountability at the worst possible time.", flag: "watch" },
      { q: "Is there a handover plan if the data owner changes during delivery?", hint: "Without a documented handover plan, a departure creates an unowned data source in production.", flag: "watch" },
    ]
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: "⚖️",
    color: "#993C1D",
    bg: "#FAECE7",
    darkBg: "#4A1B0C",
    desc: "Is using this data in an AI model legally and ethically sound?",
    items: [
      { q: "Has legal and data protection been involved at the start — not as a final sign-off?", hint: "Legal involvement at the end is sign-off. Legal involvement at the start is architecture guidance.", flag: "critical" },
      { q: "Does the original consent or collection basis cover AI training and inference use?", hint: "Consent for reporting or analytics does not automatically extend to AI training or inference.", flag: "critical" },
      { q: "Have data residency requirements been mapped before platform selection?", hint: "Selecting a cloud platform before mapping residency requirements can force costly architectural changes.", flag: "important" },
      { q: "For regulated industries, have applicable frameworks been identified and confirmed?", hint: "GDPR, HIPAA, financial services, and public sector frameworks each impose specific constraints on AI use.", flag: "important" },
      { q: "Is PII handling in training data, inference calls, and stored outputs compliant?", hint: "Passing personal data through a third-party API or storing AI-inferred data carries specific GDPR obligations.", flag: "critical" },
    ]
  },
  {
    id: "currency",
    label: "Currency",
    icon: "🕐",
    color: "#534AB7",
    bg: "#EEEDFE",
    darkBg: "#26215C",
    desc: "Is the data fresh enough today, and is there a plan to keep it that way after go-live?",
    items: [
      { q: "Is the training data recent enough to represent current conditions?", hint: "The age of training data relative to current conditions determines whether the model reflects reality.", flag: "important" },
      { q: "Is there an automated refresh process — not a manual one — for ongoing data supply?", hint: "Manual refresh processes get deprioritised, forgotten, or orphaned when the responsible person moves on.", flag: "important" },
      { q: "Is drift monitoring planned so degradation is detected before users notice it?", hint: "Model degradation is gradual and invisible without monitoring — users notice before teams do.", flag: "important" },
      { q: "Has a retraining trigger and cadence been agreed with the data owner?", hint: "A retraining trigger without a cadence leaves the model drifting until someone remembers to update it.", flag: "watch" },
      { q: "Are there named operational owners for refresh, monitoring, and retraining after go-live?", hint: "Operational ownership of refresh and monitoring must be defined before go-live, not after.", flag: "important" },
    ]
  }
] as const;

export type FlagType = "critical" | "important" | "watch";

export const FLAG_CONFIG: Record<FlagType, { label: string; textColor: string; bgColor: string }> = {
  critical:  { label: "Critical",  textColor: "#712B13", bgColor: "#F5C4B3" },
  important: { label: "Important", textColor: "#0C447C", bgColor: "#B5D4F4" },
  watch:     { label: "Watch",     textColor: "#444441", bgColor: "#D3D1C7" },
};
