export type NavItem = {
  id: string;
  label: string;
};

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  context: string;
};

export type Capability = {
  title: string;
  description: string;
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
    positioning: string;
    headline: string;
    intro: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    tertiaryCtaLabel: string;
    profile: {
      location: string;
      workStyle: string;
      languageNote: string;
      targetRoles: string[];
    };
  };
  impactMetrics: Metric[];
  domains: string[];
  about: {
    title: string;
    paragraphs: string[];
    strengths: string[];
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  capabilities: {
    title: string;
    items: Capability[];
  };
  contact: {
    title: string;
    description: string;
    email: string;
    linkedinUrl: string;
    resumePath: string;
    availability: string;
    location: string;
    languageNote: string;
    footerNote: string;
  };
};

export const siteData = {
  seo: {
    title: "Pierre Derval | Product, Platform & AI Executive",
    description:
      "Executive one-page profile for Pierre Derval, a Product, Platform and AI leader focused on enterprise SaaS, data platforms, and measurable business outcomes.",
    siteName: "Pierre Derval",
    locale: "en_BE",
    ogImage: "/og-image.svg",
    favicon: "/favicon.svg"
  },
  navigation: [
    { id: "impact", label: "Impact" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "capabilities", label: "What I Help Do" },
    { id: "contact", label: "Contact" }
  ],
  hero: {
    name: "Pierre Derval",
    positioning: "Product, Platform & AI Executive",
    headline:
      "Engineering, Product & Platform Leader | AI, Data Platforms, Enterprise SaaS | From strategy to delivery",
    intro: [
      "I work at the intersection of product, engineering, platform, and AI in enterprise SaaS and data-intensive environments.",
      "My focus is helping organizations turn technical complexity into clearer execution, stronger products, and measurable business outcomes.",
      "I am most effective where the product is complex, the organization is evolving, and leadership needs more clarity, speed, and alignment."
    ],
    primaryCtaLabel: "Get in touch",
    secondaryCtaLabel: "View LinkedIn",
    tertiaryCtaLabel: "Download resume",
    profile: {
      location: "Based in Belgium",
      workStyle: "Open to Brussels, Paris, hybrid, or remote",
      languageNote: "Open to conversations in English and French.",
      targetRoles: [
        "VP Product",
        "Head of Product",
        "CPO",
        "Product / Platform leadership",
        "AI-native product leadership"
      ]
    }
  },
  impactMetrics: [
    {
      value: "20 years",
      label: "Across product, platform, engineering, and enterprise software",
      detail: "Built depth across strategy, delivery, and product modernization."
    },
    {
      value: "40 people",
      label: "Cross-functional organization led",
      detail: "Directed product, engineering, UX, delivery, and adjacent functions."
    },
    {
      value: "~6M ARR",
      label: "Enterprise platform scaled",
      detail: "Helped grow and stabilize a data-intensive platform business."
    },
    {
      value: "4 months",
      label: "Multi-tenant SaaS transformation delivered",
      detail: "Moved quickly under real operating constraints."
    },
    {
      value: "3 months to days",
      label: "Installation and onboarding reduced",
      detail: "Compressed time-to-value for enterprise customers."
    },
    {
      value: "Weeks to hours",
      label: "Time-to-AI-agent reduced",
      detail: "Introduced AI workflows with guardrails, auditability, and governance."
    }
  ],
  domains: [
    "AI",
    "Data Platforms",
    "Enterprise SaaS",
    "Platform Product",
    "Regulated Environments"
  ],
  about: {
    title: "A leadership profile shaped by complexity, clarity, and execution.",
    paragraphs: [
      "My work sits between product strategy, platform thinking, engineering credibility, and executive decision-making. That combination is most useful when a company has strong technical depth but needs a clearer product direction, tighter operating rhythm, or a safer path to bringing AI capabilities to market.",
      "I have worked across enterprise software, data platforms, and regulated environments where governance matters as much as velocity. I am comfortable moving from strategic framing to operating model design to delivery oversight when the goal is to create better alignment and better outcomes.",
      "I work best with founders, CEOs, boards, and senior teams who need a calm operator to turn complexity into a sharper plan and a more executable product organization."
    ],
    strengths: [
      "Product strategy",
      "Platform strategy",
      "AI-native product leadership",
      "Enterprise SaaS",
      "Data platforms",
      "Product operations",
      "Cross-functional leadership",
      "Governance and execution",
      "Pricing and packaging",
      "Complex product modernization"
    ]
  },
  experience: {
    title: "Selected career path",
    items: [
      {
        role: "Chief Product Officer",
        company: "CluedIn",
        context:
          "Led product direction in AI and data platform work with a strong enterprise lens."
      },
      {
        role: "Product Architect",
        company: "Adform",
        context:
          "Worked across platform architecture, product complexity, and large-scale delivery."
      },
      {
        role: "Lead Software Developer (UI/UX)",
        company: "Sitecore",
        context:
          "Built deep engineering and experience design credibility in enterprise software."
      },
      {
        role: "VP Product Development",
        company: "Amilia",
        context:
          "Connected product leadership and execution across a growing SaaS organization."
      }
    ]
  },
  capabilities: {
    title: "What I help companies do",
    items: [
      {
        title: "Turn complex platforms into clearer product strategy",
        description:
          "Create sharper portfolio direction, better product boundaries, and decisions leaders can act on."
      },
      {
        title: "Align product and engineering",
        description:
          "Improve operating rhythm, prioritization, and execution quality across senior teams."
      },
      {
        title: "Bring AI features to market safely",
        description:
          "Introduce useful AI workflows with guardrails, auditability, and enterprise-grade governance."
      },
      {
        title: "Reduce time-to-value in enterprise SaaS",
        description:
          "Shorten onboarding, simplify adoption, and remove friction in high-consideration products."
      },
      {
        title: "Improve product operating cadence",
        description:
          "Strengthen planning, product operations, cross-functional visibility, and decision quality."
      },
      {
        title: "Lead transformation under constraints",
        description:
          "Move modernization forward without losing control of execution, compliance, or customer trust."
      }
    ]
  },
  contact: {
    title: "If you are hiring for product, platform, or AI leadership, I would be glad to talk.",
    description:
      "I am open to conversations with recruiters, founders, CEOs, boards, and senior hiring managers looking for calm, outcome-oriented leadership in enterprise SaaS and data-intensive environments.",
    email: "dervalp@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/replace-this-linkedin-profile",
    resumePath: "/Pierre_Derval_Resume.pdf",
    availability: "Open to permanent roles and advisory conversations.",
    location: "Brussels, Paris, hybrid, or remote.",
    languageNote: "English / French",
    footerNote: "Senior executive landing page built with Astro and Tailwind CSS."
  }
} satisfies SiteData;

