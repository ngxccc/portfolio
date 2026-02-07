import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked, // Check cả type
  tseslint.configs.stylisticTypeChecked, // Check type để quyết định phong cách
  nextVitals,
  nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "dist/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),

  // Đặt ở cuối để tự động tắt các rule xung đột và bật rule prettier
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...eslintConfigPrettier.rules,

      "@typescript-eslint/no-explicit-any": "off", // Disable 'no-explicit-any'
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              // Chỉ được import modules/blog
              // modules/blog/* chặn
              group: ["**/modules/*/*"],
              message:
                "Private internal access! Please import from the public interface (index.ts) of the module.",
            },
            {
              // Ngăn import ngược gây Circular Dependency
              group: ["@/app/**"],
              message: "Modules should not import from App layer.",
            },
          ],
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports", // Bắt buộc dùng import type
          fixStyle: "separate-type-imports", // Tự động fix thành: import type { Metadata } ...
        },
      ],

      "prettier/prettier": "warn",
    },
  },
]);

export default eslintConfig;
