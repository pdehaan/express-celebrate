module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["jest"],
  root: true
};
