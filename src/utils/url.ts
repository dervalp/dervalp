export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}${path.replace(/^\/+/, "")}`;
}

export function withTrailingSlash(pathname: string) {
  if (!pathname) return "/";

  const cut = pathname.search(/[?#]/);
  const path = cut === -1 ? pathname : pathname.slice(0, cut);
  const suffix = cut === -1 ? "" : pathname.slice(cut);

  if (path.endsWith("/")) return `${path}${suffix}`;

  const segment = path.split("/").pop() ?? "";
  if (segment.includes(".")) return `${path}${suffix}`;

  return `${path}/${suffix}`;
}

export function absoluteUrl(path: string, site?: URL) {
  const relativePath = withBase(path);
  return site ? new URL(relativePath, site).toString() : relativePath;
}

export function absolutePageUrl(path: string, site?: URL) {
  return absoluteUrl(withTrailingSlash(path), site);
}

export function canonicalHref(pathname: string, site: URL) {
  return new URL(withTrailingSlash(pathname), site).toString();
}

