import globals from "globals";

import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
export default tseslint.config(
  {
    ignores: ["dist"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  prettierConfig,
);
