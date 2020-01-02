module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'eslint-plugin-import',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-magic-numbers': 2,
    'comma-dangle': [2, 'never'],
    'no-use-before-define': 0,
    semi: [2, 'never'],
    'object-curly-spacing': 0,
    quotes: [1, 'single', { allowTemplateLiterals: true }],
    'func-names': [2, 'never'],
    'prefer-arrow-callback': 0,
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['error', { 'ignoreTrailingComments': true, 'ignoreComments': true }]
  },
};