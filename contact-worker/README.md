# Contact Worker

Minimal Cloudflare Worker that receives contact form submissions from the GitHub Pages frontend and sends them through Resend without exposing a private email address or API key in the website bundle.

## Prerequisites

- A free Cloudflare account
- A free Resend account
- A verified sending domain in Resend
- Node.js 24+

## Local setup

```bash
cd contact-worker
npm install
cp .dev.vars.example .dev.vars
```

Fill `.dev.vars` with real local values.

## Local development

```bash
npm run dev
```

The Worker will start locally through Wrangler.

## Required secrets

Set these secrets in Cloudflare before deploying:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_FROM_EMAIL
npx wrangler secret put RESEND_TO_EMAIL
npx wrangler secret put ALLOWED_ORIGIN
```

Use your GitHub Pages site origin for `ALLOWED_ORIGIN`, for example:

```text
https://dervalp.github.io
```

For local development you can temporarily use:

```text
http://localhost:4321
```

## Deploy

```bash
npm run deploy
```

After deployment, copy the Worker URL and set it as `PUBLIC_CONTACT_FORM_ENDPOINT` in:

- your local root `.env`
- your GitHub repository Actions variable for production builds

## Request contract

The frontend sends:

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Company",
  "message": "Hello",
  "website": ""
}
```

The Worker responds with:

```json
{ "ok": true }
```

or

```json
{ "ok": false, "message": "Readable error message" }
```
