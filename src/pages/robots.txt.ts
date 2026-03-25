import { absoluteUrl } from "../utils/url";

export const prerender = true;

const allowedBots = [
  "Googlebot",
  "Google-Extended",
  "bingbot",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "ClaudeBot",
  "Claude-User"
];

export function GET() {
  const site = import.meta.env.SITE ? new URL(import.meta.env.SITE) : undefined;
  const sitemapUrl = site ? absoluteUrl("/sitemap.xml", site) : undefined;

  const lines = [
    "User-agent: *",
    "Disallow: /",
    ""
  ];

  for (const bot of allowedBots) {
    lines.push(`User-agent: ${bot}`);
    lines.push("Allow: /");
    lines.push("");
  }

  if (sitemapUrl) {
    lines.push(`Sitemap: ${sitemapUrl}`);
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
