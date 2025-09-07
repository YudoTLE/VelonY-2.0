import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import securityPlugin from 'eslint-plugin-security';

export default [
  // Base configurations
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Security rules for backend
  securityPlugin.configs.recommended,

  // Import plugin for consistent module imports
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'off', // Let TypeScript handle this
      'import/prefer-default-export': 'off',
    },
  },

  // Rules for all TypeScript files in the NestJS project
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Shows Prettier formatting issues as ESLint errors
  prettierPlugin,

  // Ignores
  {
    ignores: ['node_modules/', 'dist/', '.eslintrc.js', 'eslint.config.mjs'],
  },

  // This MUST be the last item. It disables any ESLint rules that might conflict with Prettier.
  prettierConfig,
];
