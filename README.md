# Pierre Derval Executive Landing Page

Premium one-page personal website built with Astro and Tailwind CSS, designed for GitHub Pages deployment.

## Stack

- Astro
- Tailwind CSS v4 via `@tailwindcss/vite`
- Static output for GitHub Pages
- GitHub Actions deployment workflow

## Local development

### Prerequisites

- Node.js 24 or newer
- npm 11 or newer

### Commands

```bash
npm install
npm run dev
```

The local dev server usually starts at `http://localhost:4321`.

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
.
├── .github/workflows/deploy.yml
├── astro.config.mjs
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

### What lives where

- `src/data/site.ts`
  Main content file. Edit name, summary, metrics, role history, contact details, LinkedIn URL, and target roles here.
- `src/pages/index.astro`
  Page composition and section ordering.
- `src/components/`
  Reusable building blocks for the nav, cards, timeline, and CTA panel.
- `src/styles/global.css`
  Global design tokens, typography, colors, motion, and shared visual styles.
- `public/`
  Static assets such as the favicon, Open Graph image, and placeholder resume PDF.

## Editing content and links

### Update the page content

Edit `src/data/site.ts`.

This is the central place for:

- Hero headline and executive summary
- Selected impact metrics
- About copy
- Experience snapshot
- Capability blocks
- Email address
- LinkedIn profile URL
- Resume file path
- Footer note

### Replace the LinkedIn URL

In `src/data/site.ts`, update:

```ts
linkedinUrl: "https://www.linkedin.com/in/replace-this-linkedin-profile"
```

### Replace the resume

Overwrite this file in `public/`:

```text
public/Pierre_Derval_Resume.pdf
```

If you want a different filename, update `resumePath` in `src/data/site.ts`.

### Replace the favicon or social image

Swap these files in `public/`:

- `public/favicon.svg`
- `public/og-image.svg`

If you rename them, also update the matching values in `src/data/site.ts`.

## GitHub Pages deployment

This repository includes `.github/workflows/deploy.yml`, which builds the Astro site and deploys it to GitHub Pages automatically on every push to `main`.

### Exact steps

1. Create a GitHub repository and push this project to the `main` branch.
2. Open the repository on GitHub.
3. Go to `Settings` -> `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Push to `main` again if needed, or run the workflow manually from the `Actions` tab.
6. Wait for the `Deploy to GitHub Pages` workflow to finish.
7. Open the published GitHub Pages URL shown in the deployment summary.

### Required repository setting

- GitHub Pages source must be `GitHub Actions`.

No `gh-pages` branch is required.

## How the GitHub Pages config works

- For a normal project repository such as `username/my-site`, the Astro config automatically uses `/my-site` as the base path during GitHub Actions builds.
- For a special root repository such as `username/username.github.io`, the base path is omitted automatically.
- This means the site can be published from a repository without manually editing `astro.config.mjs` first.

## Custom domain later

When you are ready to use a custom domain:

1. Add a `public/CNAME` file containing your domain name on a single line, for example:

```text
example.com
```

2. In GitHub, go to `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`.
3. Create a repository variable named `CUSTOM_DOMAIN`.
4. Set its value to your domain, for example:

```text
example.com
```

5. Configure the DNS records required by GitHub Pages.
6. Push a new commit so the workflow rebuilds the site with the custom domain metadata.

## Design notes

The page is intentionally restrained: warm light surfaces, deep charcoal typography, a muted petrol accent, thin borders, generous spacing, and understated motion. The overall goal is to feel calm, senior, and credible for enterprise product, platform, and AI leadership rather than portfolio-like or overly designed.
