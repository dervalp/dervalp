import { absoluteUrl } from "../utils/url";

export const prerender = true;

const urlEntries = [
  {
    path: "/",
    changefreq: "monthly",
    priority: "1.0"
  }
];

export function GET() {
  const site = import.meta.env.SITE ? new URL(import.meta.env.SITE) : undefined;

  if (!site) {
    return new Response("Missing site URL", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }

  const lastmod = new Date().toISOString();
  const urls = urlEntries
    .map(
      (entry) => `  <url>
    <loc>${absoluteUrl(entry.path, site)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
