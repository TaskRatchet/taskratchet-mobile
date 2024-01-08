module.exports = {
  root: true,
  extends: ['@react-native'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
  },
  plugins: ['simple-import-sort', 'react-native', 'unused-imports', 'jest'],
  env: {
    jest: true,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-unused-vars': 'error',
    'react-native/no-unused-styles': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended-type-checked'],
    },
    {
      files: ['*.js', '*.jsx'],
      parser: 'espree',
      extends: ['eslint:recommended', 'plugin:react/recommended'],
    },
  ],
};
