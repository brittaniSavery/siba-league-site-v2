import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  integrations: [react(), mdx()],
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },
  site: "https://siba.averyincorporated.com",
});
