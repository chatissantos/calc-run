module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-import-assign': 0,
    'no-trailing-spaces': ['warn', { skipBlankLines: true }],
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    'comma-dangle': 0,
  },
};
