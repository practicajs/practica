module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['**/dist/*', '**/node_modules/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2021',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'consistent-return': 'warn',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'warn',
    'no-param-reassign': 'warn',
    'no-shadow': 'warn',
    'import/prefer-default-export': 'warn',
    'import/no-import-module-exports': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/tests/**', '**/test/**'] },
    ],
    'no-console': ['error', { allow: ['time', 'timeEnd'] }],

    // not sure why we need this if Typescript already enforce it.
    // If we want to enable these rules, we need use: eslint-import-resolver-typescript
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    // https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/returningpromises.md
    'no-return-await': 'off',
  },
};
