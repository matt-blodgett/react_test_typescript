module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'semi': 2,
    'comma-dangle': 2,
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-useless-constructor': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
