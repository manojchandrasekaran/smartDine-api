import globals from 'globals';
import eslint from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        ecmaVersion: 2020, // Update to a suitable ECMAScript version
        sourceType: 'module', // For ES Modules
      }
    },
    ignores: ['node_modules','package*'],
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': 'off',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-console': 'warn'
    }
  },
  eslint.configs.recommended,
];