/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:functional/recommended'],
  plugins: ['functional'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },

  rules: {
    'no-var': ['error'],
    'no-unused-expressions': ['error'],
    'no-use-before-define': ['error'],
    'max-depth': [
      'error',
      {
        max: 1,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
  },
};
