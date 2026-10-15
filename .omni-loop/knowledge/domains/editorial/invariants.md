# Editorial: invariants

## N-EDITORIAL-1
Blog entries require title, excerpt, author, publish date and category; tags default to an empty list and draft defaults to false.
Source: src/content/config.ts
Enforced by: src/content/config.ts
Stated: 2026-10-15
Proposed: invade 2026-10-15

## N-EDITORIAL-2
Draft posts are excluded from generated blog routes, the homepage and the sitemap.
Source: src/pages/index.astro
Enforced by: src/pages/blog/[slug].astro, src/pages/blog/[...page].astro, src/pages/blog/archive/[year].astro, src/pages/blog/category/[category].astro, src/pages/blog/tag/[tag].astro, src/pages/index.astro, src/pages/sitemap.xml.ts
Stated: 2026-10-15
Proposed: invade 2026-10-15
