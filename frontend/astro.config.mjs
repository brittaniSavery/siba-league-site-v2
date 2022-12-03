import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [remarkDefinitionList],
    remarkRehype: { handlers: { ...defListHastHandlers } },
  },
  site: "https://siba.averyincorporated.com",
});
