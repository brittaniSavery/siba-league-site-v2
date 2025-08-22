import { defineConfig } from "astro/config";
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react(), mdx()],
  markdown: {
    rehypePlugins: [remarkDefinitionList],
    remarkRehype: {
      handlers: {
        ...defListHastHandlers,
      },
    },
  },
  site: "https://siba.averyincorporated.com",
});
