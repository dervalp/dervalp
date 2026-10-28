import { absoluteUrl } from "../utils/url";

export const prerender = true;

export function GET() {
  const site = import.meta.env.SITE ? new URL(import.meta.env.SITE) : undefined;
  const sitemapUrl = site ? absoluteUrl("/sitemap.xml", site) : undefined;

  const lines = ["User-agent: *", "Allow: /", ""];

  if (sitemapUrl) {
    lines.push(`Sitemap: ${sitemapUrl}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
