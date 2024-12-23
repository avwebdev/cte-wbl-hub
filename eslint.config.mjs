import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
  ),
  {
    plugins: ["only-warn"],
    rules: {
      quotes: ["warn", "double", { avoidEscape: true }],
      semi: ["warn", "always"],
      indent: ["warn", 2, { SwitchCase: 1 }],
      "eol-last": ["warn", "always"],
      "max-len": ["warn", { code: 120 }],
      "no-trailing-spaces": "warn",
      "no-var": "warn",
      "prefer-const": "warn",
      "no-undef": "warn",
      "no-unused-vars": "off",
      "sort-imports": ["warn", { ignoreCase: true, ignoreDeclarationSort: true }],
      "import/order": [
        "warn",
        {
          groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
          pathGroupsExcludedImportTypes: ["internal"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/first": "warn",
      "import/newline-after-import": "warn",
      "import/no-duplicates": "warn",
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "warn",
      "tailwindcss/no-custom-classname": "off",
      "react/self-closing-comp": "warn",
    },
    parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
  {
    files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
    parser: "@typescript-eslint/parser",
  },
];

export default eslintConfig;
