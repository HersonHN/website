module.exports = {
  root: true,
  globals: {
    import: true
  },
  env: {
    node: true,
  },
  plugins: ['gridsome'],
  extends: [
    'plugin:vue/strongly-recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'lines-between-class-members': 'off',
    'import/no-cycle': 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/require-default-prop': 'off',
    'no-param-reassign': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
