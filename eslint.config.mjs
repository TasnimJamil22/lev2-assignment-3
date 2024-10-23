// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";

// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
    },
  },

  {
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-unused-expressions': 'warn',
    },
  },
  
  // {
  //   extends: [
  //     'eslint:recommended',
  //     'plugin:@typescript-eslint/recommended',
  //     'prettier',
  //   ],
  // },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
