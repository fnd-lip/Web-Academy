import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  { rules: { "@typescript-eslint/no-explicit-any": "warn", "no-unused-vars": "error", "eqeqeq": "error", "no-console": "off", "no-var": "error", "prefer-const": "error", "no-multiple-empty-lines": ["error"], "semi": "off"}}
]);
