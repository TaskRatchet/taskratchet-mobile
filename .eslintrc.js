module.exports = {
  root: true,
  extends: '@react-native',
  extends: ['plugin:@typescript-eslint/recommended-type-checked'],

  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
