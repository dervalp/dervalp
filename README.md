# Pierre Derval Executive One-Page Site

Premium one-page personal website for Pierre Derval, built with Astro and Tailwind CSS for GitHub Pages deployment.

## Stack

- Astro static site
- Tailwind CSS v4 via `@tailwindcss/vite`
- Self-hosted `Manrope` variable font
- GitHub Pages via GitHub Actions
- Optional Cloudflare Worker + Resend contact backend

## Local development

### Prerequisites

- Node.js 24+
- npm 11+

### Commands

```bash
npm install
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project structure

```text
.
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── contact-worker/
├── public/
├── src/
│   ├── components/
│   ├── data/site.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro
│   ├── styles/global.css
│   └── utils/url.ts
└── tailwind.config.mjs
```

## Main edit points

- `src/data/site.ts`
  Central content contract for hero copy, point of view, capabilities, transformations, credibility strip, contact copy, and public links.
- `src/pages/index.astro`
  One-page composition for the executive site.
- `src/components/`
  Reusable building blocks for navigation, capability blocks, transformations, theme toggle, and contact handling.
- `src/styles/global.css`
  Design tokens, layout rhythm, typography, theme handling, and shared UI styles.
- `public/og-image.svg`
  Social preview artwork.

## Public links and resume

The site uses these public links from `src/data/site.ts`:

- LinkedIn
- GitHub
- Resume path

Replace the resume PDF by overwriting:

```text
public/Pierre_Derval_Resume.pdf
```

## Contact form behavior

The contact section supports two states:

- If `PUBLIC_CONTACT_FORM_ENDPOINT` is set, the form is rendered and posts to that endpoint.
- If `PUBLIC_CONTACT_FORM_ENDPOINT` is not set, no broken or disabled form is shown; visitors see direct contact links instead.

### Local environment

Copy the example file and set the public endpoint only if you want the form enabled locally:

```bash
cp .env.example .env
```

Example:

```text
PUBLIC_CONTACT_FORM_ENDPOINT=https://your-worker-subdomain.workers.dev
```

## Optional backend

The repository includes an optional Cloudflare Worker in `contact-worker/` for private form handling with Resend.

See:

- `contact-worker/README.md`

## GitHub Pages deployment

The repository ships with a GitHub Actions deployment workflow.

Important notes:

- Project repositories build with the correct repo base path automatically.
- Root `username.github.io` repositories build without a repo base path.
- `CUSTOM_DOMAIN` can be set later if you move to a custom domain.
- `PUBLIC_CONTACT_FORM_ENDPOINT` should be added as an Actions variable only if you want the form enabled in production.
