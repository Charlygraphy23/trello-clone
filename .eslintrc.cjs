module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  overrides: [{ files: ['*.ts', '*.tsx'], rules: { 'no-undef': 'off' } }],
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    'semi': ['error', 'always'],
    'import/no-unresolved': 0,
    'quotes': ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': 0,
    'import/extensions': 0,
    'react/jsx-props-no-spreading': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'consistent-return': 0,
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' }
    ],
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        semi: true,
        tabWidth: 2,
        singleQuote: true,
        endOfLine: 'auto',
        printWidth: 80,
        quoteProps: 'consistent',
        jsxSingleQuote: true,
        bracketSameLine: false,
        parser: 'typescript'
      }
    ],
    'react/jsx-no-useless-fragment': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/require-default-props': 0
  }
};
