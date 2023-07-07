/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "airbnb-base",
    "prettier",
    'eslint:recommended', 'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  plugins: ["pretier", "@typescript-eslint"],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "error",
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
};
