import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

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
      "@typescript-eslint/no-explicit-any": "off", // Disable 'no-explicit-any'
      "@typescript-eslint/no-unused-vars": "off", // Disable 'no-unused-vars'

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              // Chỉ được import modules/blog
              // modules/blog/* chặn
              group: ["@/modules/*/*"],
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

      "prettier/prettier": [
        "warn",
        {
          // When you change here, also change sync at .prettierrc
          arrowParens: "always", // Always include parens. Example: (x) => x
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false, // Use space instead of tab
          printWidth: 80,
          semi: true, // Add a semicolon at the end of every statement
        },
      ],
    },
  },
]);

export default eslintConfig;
