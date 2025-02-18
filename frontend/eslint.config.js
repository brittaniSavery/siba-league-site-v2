// @ts-check
import react from "eslint-plugin-react";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import * as mdx from "eslint-plugin-mdx";
import * as prettier from "eslint-plugin-prettier/recommended";
import * as react from "eslint-plugin-react";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  ...mdx.flat,
  prettier
);
