# Pierre Derval Executive Landing Page

Premium one-page personal website built with Astro and Tailwind CSS, designed for GitHub Pages deployment with a private contact workflow.

## Stack

- Astro static site
- Tailwind CSS v4 via `@tailwindcss/vite`
- GitHub Pages via GitHub Actions
- Optional Cloudflare Worker + Resend contact backend

## Local development

### Prerequisites

- Node.js 24 or newer
- npm 11 or newer

### Commands

```bash
npm install
npm run dev
```

The Astro dev server usually starts at `http://localhost:4321`.

Build the production site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
.
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── contact-worker/
├── package.json
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

## Structure at a glance

- `src/data/site.ts`
  The main content contract. Edit copy, links, metrics, role history, and contact-form messages here.
- `src/pages/index.astro`
  The one-page composition layer that assembles the sections.
- `src/components/`
  Reusable building blocks for navigation, cards, timeline entries, theme toggle, and the contact panel.
- `src/styles/global.css`
  Global design tokens, typography, light/dark theme variables, motion, forms, and shared UI styles.
- `public/`
  Static assets such as the favicon, Open Graph image, and placeholder resume PDF.
- `contact-worker/`
  Optional free backend for the contact form. It keeps the Resend API key and private destination email out of the website bundle.

## Where to edit content and links

Edit [`src/data/site.ts`](./src/data/site.ts).

This is the central place for:

- SEO title and description
- Hero text and CTAs
- Selected impact metrics
- About copy
- Experience snapshot
- Capability blocks
- LinkedIn URL
- Resume file path
- Contact form labels, privacy copy, and success or error messages
- Footer note

## Typography and theme

- Visible titles and headings use Inter.
- Body copy and UI text use a system sans-serif stack.
- Light theme is the default.
- Visitors can switch between light and dark theme with the header toggle.
- The chosen theme is persisted in `localStorage` under `pierre-theme`.

## Replace the LinkedIn URL

In [`src/data/site.ts`](./src/data/site.ts), update:

```ts
linkedinUrl: "https://www.linkedin.com/in/replace-this-linkedin-profile"
```

## Replace the resume

Overwrite this file in [`public`](./public):

```text
public/Pierre_Derval_Resume.pdf
```

If you want a different filename, also update `resumePath` in [`src/data/site.ts`](./src/data/site.ts).

## Replace the favicon or social image

Swap these files in [`public`](./public):

- `public/favicon.svg`
- `public/og-image.svg`

If you rename them, also update the matching values in [`src/data/site.ts`](./src/data/site.ts).

## Contact form configuration

The site no longer exposes a public email address in the HTML. The contact section posts to a configurable public endpoint using the build-time variable `PUBLIC_CONTACT_FORM_ENDPOINT`.

### Local environment

Copy the example file and set your contact endpoint:

```bash
cp .env.example .env
```

Example:

```text
PUBLIC_CONTACT_FORM_ENDPOINT=https://your-worker-subdomain.workers.dev
```

If this variable is not set, the site still builds and deploys. The form renders in a disabled state and visitors can still use LinkedIn.

## Free backend option: Cloudflare Worker + Resend

The repository includes an optional Worker in [`contact-worker`](./contact-worker) so you can keep the Resend API key and your destination inbox private.

### Worker local setup

```bash
cd contact-worker
npm install
cp .dev.vars.example .dev.vars
```

Set local values in `.dev.vars`.

### Worker secrets

Set these secrets in Cloudflare for the deployed Worker:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_FROM_EMAIL
npx wrangler secret put RESEND_TO_EMAIL
npx wrangler secret put ALLOWED_ORIGIN
```

Notes:

- `RESEND_API_KEY` is your private Resend API key.
- `RESEND_FROM_EMAIL` is the verified sender address or alias in Resend.
- `RESEND_TO_EMAIL` is your real private destination inbox.
- `ALLOWED_ORIGIN` should be the site origin, for example `https://dervalp.github.io` or your future custom domain origin.

### Worker deploy

```bash
cd contact-worker
npm run deploy
```

After deployment, copy the Worker URL and use it as `PUBLIC_CONTACT_FORM_ENDPOINT`:

- locally in `.env`
- in GitHub under `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`

Create a repository variable named `PUBLIC_CONTACT_FORM_ENDPOINT` and set it to the Worker URL.

## GitHub Pages deployment

This repository includes [`deploy.yml`](./.github/workflows/deploy.yml), which installs dependencies, builds the Astro site, uploads `dist`, and deploys to GitHub Pages on every push to `main`.

### Exact steps to publish

1. Push this repository to GitHub on the `main` branch.
2. Open the repository on GitHub.
3. Go to `Settings` -> `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Go to `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`.
6. Add `PUBLIC_CONTACT_FORM_ENDPOINT` if you want the contact form enabled in production.
7. Add `CUSTOM_DOMAIN` only if you plan to use a custom domain later.
8. Push a new commit to `main`, or run the workflow manually from the `Actions` tab.
9. Wait for the `Deploy to GitHub Pages` workflow to finish.
10. Open the published Pages URL from the deployment summary.

### Required repository settings

- `Settings` -> `Pages` -> `Source` must be `GitHub Actions`.
- The workflow expects the default deployment branch to be `main`.

No `gh-pages` branch is required.

## How GitHub Pages base-path handling works

The Astro config reads GitHub Actions environment variables to determine the correct `site` and `base` automatically:

- A project repository like `dervalp/pierre-derval` is built with the base path `/pierre-derval`.
- A root repository like `dervalp/dervalp.github.io` is built without a repo base path.
- A custom domain uses the `CUSTOM_DOMAIN` repository variable when present.

This means the site works from a repository without manual edits to `astro.config.mjs`.

## Configure a custom domain later

1. Add a [`public/CNAME`](./public) file containing your domain on one line, for example:

```text
example.com
```

2. In GitHub, create an Actions variable named `CUSTOM_DOMAIN` with the same value.
3. Configure the DNS records required by GitHub Pages.
4. If you use the contact Worker, update `ALLOWED_ORIGIN` in Cloudflare to your custom domain origin.
5. Push a new commit so the site is rebuilt with the custom-domain metadata.

## Design note

The page stays intentionally calm and executive: warm light surfaces by default, a refined dark mode, Inter for visible titles, system sans for body copy, restrained petrol accents, generous spacing, thin borders, and subtle motion that respects reduced-motion preferences. The goal is to feel credible for senior enterprise product, platform, AI, and data leadership rather than like a generic developer portfolio.