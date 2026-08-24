import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Cloudflare Workers globals (Request, Response, ExportedHandler, ...)
      // come from @cloudflare/workers-types; TypeScript already catches
      // undefined identifiers, so this rule only produces false positives.
      "no-undef": "off",
      // Handler signatures are dictated by ExportedHandler; a parameter
      // this Worker doesn't need yet is still part of the contract.
      // Prefix with _ to mark it as intentionally unused.
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
);
