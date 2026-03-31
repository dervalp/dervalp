import type { CollectionEntry } from "astro:content";

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function groupByCategory(
  posts: CollectionEntry<"blog">[]
): Record<string, number> {
  return posts.reduce(
    (acc, p) => ({
      ...acc,
      [p.data.category]: (acc[p.data.category] ?? 0) + 1,
    }),
    {} as Record<string, number>
  );
}

export function groupByYear(
  posts: CollectionEntry<"blog">[]
): Record<string, number> {
  return posts.reduce((acc, p) => {
    const y = p.data.publishDate.getFullYear().toString();
    return { ...acc, [y]: (acc[y] ?? 0) + 1 };
  }, {} as Record<string, number>);
}

export function uniqueTags(posts: CollectionEntry<"blog">[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))].sort();
}

export function sortedPosts(
  posts: CollectionEntry<"blog">[]
): CollectionEntry<"blog">[] {
  return [...posts].sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
}
