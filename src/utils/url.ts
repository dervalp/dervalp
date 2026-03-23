export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}${path.replace(/^\/+/, "")}`;
}

export function absoluteUrl(path: string, site?: URL) {
  const relativePath = withBase(path);
  return site ? new URL(relativePath, site).toString() : relativePath;
}

