import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  site: "https://bomun.dev",
  base: "/",
  trailingSlash: "ignore",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [rehypeSlug],
  },
  integrations: [
    expressiveCode({
      themes: ["github-light", "github-dark"],
      styleOverrides: { borderRadius: "0.5rem" },
    }),
    mdx(),
    react(),
    sitemap(),
  ],
});
