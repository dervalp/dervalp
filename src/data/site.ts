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
  description: string;
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
      "I help enterprise teams turn AI ambition into shipped, governed products — by aligning product, platform, and execution.",
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
      "In enterprise software, AI does not sit on top of the product. It reshapes boundaries, workflows, governance, and trust.",
      "Most teams treat AI as an add-on. That is why it creates noise, risk, and complexity instead of value.",
      "The challenge is not technical. It is deciding where AI belongs, how it fits the platform, and how to ship it without breaking execution."
    ],
    closing:
      "I work with CEOs, founders, and senior leaders to turn complexity into clarity and shipped outcomes.",
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
    title: "Focus",
    description:
      "Structured around the work that matters most in complex software businesses: strategy, execution, and AI productization.",
    groups: [
      {
        label: "Strategy",
        items: [
          {
            title: "Turn platform complexity into clear product direction",
            description:
              "Clarify boundaries, remove structural ambiguity, and give leaders a product direction they can execute."
          },
          {
            title: "Align product, platform, and engineering leadership",
            description:
              "Create shared priorities, faster decisions, and cleaner execution across the senior team."
          }
        ]
      },
      {
        label: "Execution",
        items: [
          {
            title: "Strengthen cadence, prioritization, and decision quality",
            description:
              "Tighten the operating rhythm so priorities stay clear and fewer decisions stall between teams."
          },
          {
            title: "Reduce time to value in complex SaaS products",
            description:
              "Shorten onboarding, reduce adoption friction, and make complex products easier to implement and expand."
          }
        ]
      },
      {
        label: "AI",
        items: [
          {
            title: "Ship AI capabilities with clear guardrails",
            description:
              "Move from scattered experiments to reusable AI capabilities, with clear rollout paths and trust built in."
          },
          {
            title: "Turn AI ambition into shipped products",
            description:
              "Translate AI ambition into product choices, delivery plans, and releases that actually make it to market."
          }
        ]
      }
    ]
  },
  transformations: {
    title: "Work",
    description:
      "A few of the operating shifts I’m most often asked to lead inside complex software businesses.",
    items: [
      {
        eyebrow: "AI",
        title: "From AI experiments to shipped product capabilities",
        description:
          "Turned isolated AI work into reusable, governed product capabilities with clear rollout paths, stronger auditability, and delivery moving from weeks to hours."
      },
      {
        eyebrow: "Platform",
        title: "From platform sprawl to scalable product structure",
        description:
          "Reshaped complex SaaS and data platforms into clearer product structures, stronger boundaries, and transformations delivered in months instead of multi-year drift."
      },
      {
        eyebrow: "Adoption",
        title: "From slow onboarding to fast adoption",
        description:
          "Reduced adoption friction, shortened onboarding from months to days, and made complex enterprise products easier to implement and expand."
      },
      {
        eyebrow: "Alignment",
        title: "From misalignment to decisive execution",
        description:
          "Aligned founders, executives, product, and engineering around clear priorities, cleaner tradeoffs, and plans that hold up in delivery."
      }
    ]
  },
  credibility: {
    title: "Proven in Enterprise",
    description: "20+ years of experience in B2B and B2C Enterprise SaaS",
    items: [
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
    title: "For AI, product, and platform leadership conversations.",
    description:
      "If you are building in complex software, reach out.",
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
