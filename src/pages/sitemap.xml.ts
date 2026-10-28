import { getCollection } from "astro:content";
import { absoluteUrl } from "../utils/url";

export const prerender = true;

// Google Search Console rejects lastmod values that include a time or
// fractional seconds (for example 2026-10-28T11:57:02.543Z). The sitemap
// protocol's W3C date-only form is YYYY-MM-DD.
function w3cDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absolutePageUrl(path: string, site: URL): string {
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  const loc = absoluteUrl(withSlash, site);
  if (loc.endsWith("/") || loc.includes("?") || loc.includes("#")) return loc;
  return `${loc}/`;
}

export async function GET() {
  const site = import.meta.env.SITE ? new URL(import.meta.env.SITE) : undefined;

  if (!site) {
    return new Response("Missing site URL", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }

  const lastmod = w3cDate(new Date());

  const staticEntries = [
    { path: "/",                                      changefreq: "monthly", priority: "1.0", lastmod },
    { path: "/about/",                                changefreq: "monthly", priority: "0.8", lastmod },
    { path: "/services/",                             changefreq: "monthly", priority: "0.8", lastmod },
    { path: "/how-i-help/",                           changefreq: "monthly", priority: "0.8", lastmod },
    { path: "/contact/",                              changefreq: "monthly", priority: "0.8", lastmod },
    { path: "/blog/",                                 changefreq: "weekly",  priority: "0.8", lastmod },
    { path: "/tools/",                                changefreq: "monthly", priority: "0.8", lastmod },
    { path: "/tools/ai-project-scoper/",              changefreq: "monthly", priority: "0.9", lastmod },
    { path: "/tools/ai-business-case-scorecard/",     changefreq: "monthly", priority: "0.9", lastmod },
    { path: "/tools/ai-approach-finder/",             changefreq: "monthly", priority: "0.9", lastmod },
    { path: "/tools/ai-readiness-checklist/",         changefreq: "monthly", priority: "0.9", lastmod },
    { path: "/tools/data-readiness/",                 changefreq: "monthly", priority: "0.9", lastmod },
  ];

  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const postEntries = posts.map((p) => ({
    path: `/blog/${p.slug}/`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: w3cDate(p.data.updatedDate ?? p.data.publishDate)
  }));

  const allEntries = [...staticEntries, ...postEntries];

  const urls = allEntries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(absolutePageUrl(entry.path, site))}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
