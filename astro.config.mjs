import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const repository = process.env.GITHUB_REPOSITORY;
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? repository?.split("/")[0];
const repoName = repository?.split("/")[1];
const customDomain = process.env.CUSTOM_DOMAIN
  ?.replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const isUserPagesRepo =
  !!owner &&
  !!repoName &&
  repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const site = customDomain
  ? `https://${customDomain}`
  : owner
    ? `https://${owner}.github.io`
    : "https://example.com";

const base =
  customDomain || !repoName || isUserPagesRepo ? undefined : `/${repoName}`;

export default defineConfig({
  output: "static",
  site,
  base,
  vite: {
    plugins: [tailwindcss()]
  }
});

