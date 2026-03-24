export type NavItem = {
  id: string;
  label: string;
};

export type Capability = {
  title: string;
  description: string;
};

export type CapabilityGroup = {
  label: string;
  items: Capability[];
};

export type Transformation = {
  eyebrow?: string;
  title: string;
  description: string[];
};

export type LogoItem = {
  name: string;
  logoPath: string;
  slug: string;
};

export type CredibilityItem = {
  company: string;
  relevance?: string;
  logoAlt: string;
  logoPath: string;
  slug: string;
};

export type SiteData = {
  seo: {
    title: string;
    description: string;
    siteName: string;
    locale: string;
    ogImage: string;
    favicon: string;
  };
  navigation: NavItem[];
  hero: {
    name: string;
    brandLine: string;
    eyebrow: string;
    headline: string;
    supportingText: string[];
    focusAreas: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    quaternaryCtaLabel: string;
    tertiaryCtaLabel: string;
  };
  pointOfView: {
    titleLines: string[];
    paragraphs: string[];
    closing: string;
    workWithLabel: string;
    workWith: LogoItem[];
  };
  capabilities: {
    title: string;
    description: string;
    groups: CapabilityGroup[];
  };
  transformations: {
    title: string;
    description: string;
    items: Transformation[];
  };
  credibility: {
    title: string;
    description?: string;
    note?: string;
    items: CredibilityItem[];
  };
  contact: {
    title: string;
    description: string;
    directMessage: string;
    secondaryMessage?: string;
    formTitle: string;
    formDescription: string;
    directTitle: string;
    directDescription: string;
    privacyNote?: string;
    unavailableMessage?: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
    footerNote: string;
  };
  socials: {
    linkedinUrl: string;
    githubUrl: string;
    resumePath: string;
  };
};

export const siteData = {
  seo: {
    title: "Pierre Derval | AI Product Leadership for Complex Enterprise Software",
    description:
      "Executive one-page site for Pierre Derval, focused on AI product leadership, platform strategy, and governed delivery in complex enterprise software.",
    siteName: "Pierre Derval",
    locale: "en_BE",
    ogImage: "/og-image.svg",
    favicon: "/favicon.svg"
  },
  navigation: [
    { id: "point-of-view", label: "Point of View" },
    { id: "capabilities", label: "Focus" },
    { id: "transformations", label: "Work" },
    { id: "credibility", label: "Experience" },
    { id: "contact", label: "Contact" }
  ],
  hero: {
    name: "Pierre Derval",
    brandLine: "AI → shipped",
    eyebrow: "AI • Product Leadership • Platform Strategy",
    headline: "AI. Shipped.",
    supportingText: [
      "AI doesn't fail in the lab. It fails in production.",
      "I help enterprise teams turn AI ambition into shipped, governed products - by treating AI as a platform capability, not a feature.",
      "Built and scaled AI and data platforms in complex, regulated environments."
    ],
    focusAreas: [
      "Enterprise AI productization",
      "Platform modernization",
      "Executive alignment"
    ],
    primaryCtaLabel: "Start a conversation",
    secondaryCtaLabel: "View LinkedIn",
    quaternaryCtaLabel: "View GitHub",
    tertiaryCtaLabel: "Download resume"
  },
  pointOfView: {
    titleLines: ["AI is not", "a feature."],
    paragraphs: [
      "AI changes how a product behaves, how decisions are made, and how trust is built.",
      "The challenge is not adding AI. It is deciding where it belongs and how to ship it without breaking the system around it.",
      "Most teams treat AI as an add-on. That creates complexity, not value."
    ],
    closing:
      "I work with leaders to turn that into clear decisions and shipped outcomes.",
    workWithLabel: "Work with",
    workWith: [
      {
        name: "Anthropic",
        logoPath: "/logos/providers/anthropic.svg",
        slug: "anthropic"
      },
      {
        name: "OpenAI",
        logoPath: "/logos/providers/openai.svg",
        slug: "openai"
      },
      {
        name: "Gemini",
        logoPath: "/logos/providers/gemini.svg",
        slug: "gemini"
      }
    ]
  },
  capabilities: {
    title: "What I focus on",
    description:
      "Structured around what matters most in complex software environments.",
    groups: [
      {
        label: "Strategy",
        items: [
          {
            title: "Platform clarity",
            description:
              "Turn platform complexity into product decisions teams can execute."
          },
          {
            title: "AI productization",
            description:
              "Move AI from isolated experiments to reusable, governed product capabilities."
          }
        ]
      },
      {
        label: "Execution",
        items: [
          {
            title: "Leadership alignment",
            description:
              "Align product, platform, and engineering around one clear execution path."
          },
          {
            title: "Execution quality",
            description:
              "Drive faster decisions, cleaner prioritization, and stronger delivery in complex teams."
          }
        ]
      },
      {
        label: "AI",
        items: [
          {
            title: "Time to value",
            description:
              "Reduce time to value in complex SaaS environments."
          },
          {
            title: "Product structure",
            description:
              "Bring clarity to complex product landscapes so teams can scale without fragmentation."
          }
        ]
      }
    ]
  },
  transformations: {
    title: "What I've led",
    description:
      "A few of the operating shifts I’m most often asked to lead in complex software environments.",
    items: [
      {
        eyebrow: "AI",
        title: "From AI experiments to shipped product capabilities",
        description: [
          "Turned isolated AI work into reusable, governed product capabilities integrated into the platform.",
          "Reduced time to launch from weeks to hours and enabled consistent delivery across teams."
        ]
      },
      {
        eyebrow: "Platform",
        title: "From platform sprawl to scalable product structure",
        description: [
          "Reshaped complex SaaS and data platforms into clearer product structures with stronger boundaries and ownership.",
          "Enabled faster execution and reduced long-term fragmentation."
        ]
      },
      {
        eyebrow: "Adoption",
        title: "From slow onboarding to fast adoption",
        description: [
          "Reduced onboarding friction and shortened time to value from months to days.",
          "Made complex enterprise products easier to implement, use, and expand."
        ]
      },
      {
        eyebrow: "Alignment",
        title: "From misalignment to decisive execution",
        description: [
          "Aligned founders, executives, product, and engineering around clear priorities and tradeoffs.",
          "Improved decision speed and ensured plans held up in delivery."
        ]
      }
    ]
  },
  credibility: {
    title: "Proven in Enterprise",
    description: "20+ years building and scaling product, platform, and AI systems in complex B2B environments.",
    note: "Worked across data platforms, adtech, and enterprise SaaS in complex and regulated environments.",
    items: [
      {
        company: "Ikary",
        logoAlt: "Ikary logo",
        logoPath: "/logos/ikary.svg",
        slug: "ikary"
      },
      {
        company: "CluedIn",
        logoAlt: "CluedIn logo",
        logoPath: "/logos/cluedin.png",
        slug: "cluedin"
      },
      {
        company: "Adform",
        logoAlt: "Adform logo",
        logoPath: "/logos/adform.svg",
        slug: "adform"
      },
      {
        company: "Sitecore",
        logoAlt: "Sitecore logo",
        logoPath: "/logos/sitecore.svg",
        slug: "sitecore"
      },
      {
        company: "Amilia",
        logoAlt: "Amilia logo",
        logoPath: "/logos/amilia.svg",
        slug: "amilia"
      }
    ]
  },
  contact: {
    title: "Building AI products in complex environments?",
    description:
      "If product, platform, and AI need to move together, I can help make that real.",
    directMessage:
      "I work with founders, CEOs, and senior leaders where AI, product, platform, and execution need to move together.",
    secondaryMessage:
      "I take on a small number of roles, advisory relationships, and selected conversations.",
    formTitle: "Start a conversation",
    formDescription:
      "A few lines of context are enough.",
    directTitle: "Start a conversation",
    directDescription:
      "LinkedIn is the simplest place to begin.",
    privacyNote: "Selected conversations only.",
    unavailableMessage: "",
    submitLabel: "Send message",
    successMessage: "Your message has been sent. I will review it and respond through the details you provided.",
    errorMessage:
      "The message could not be sent right now. Please try again in a moment or reach out on LinkedIn instead.",
    footerNote: "AI → shipped"
  },
  socials: {
    linkedinUrl: "https://be.linkedin.com/in/pierrederval",
    githubUrl: "https://github.com/dervalp",
    resumePath: "/Pierre_Derval_Resume.pdf"
  }
} satisfies SiteData;
