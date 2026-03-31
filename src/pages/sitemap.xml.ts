import { getCollection } from "astro:content";
import { absoluteUrl } from "../utils/url";

export const prerender = true;

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

  const lastmod = new Date().toISOString();

  const staticEntries = [
    { path: "/",                                changefreq: "monthly", priority: "1.0", lastmod },
    { path: "/blog/",                           changefreq: "weekly",  priority: "0.8", lastmod },
    { path: "/tools/",                          changefreq: "monthly", priority: "0.8", lastmod },
    { path: "/tools/ai-readiness-checklist/",   changefreq: "monthly", priority: "0.9", lastmod },
  ];

  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const postEntries = posts.map((p) => ({
    path: `/blog/${p.slug}/`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: (p.data.updatedDate ?? p.data.publishDate).toISOString()
  }));

  const allEntries = [...staticEntries, ...postEntries];

  const urls = allEntries
    .map(
      (entry) => `  <url>
    <loc>${absoluteUrl(entry.path, site)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
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
