module.exports = {
  /** @表示最高级别 */
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended", // https://eslint.vuejs.org/user-guide/
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended" // 可以一次性设置 eslint-plugin-prettier 并且配置 eslint-config-prettier
  ],
  parser: "vue-eslint-parser", // 主要解析
  parserOptions: {
    parser: "@typescript-eslint/parser", // @babel/eslint-parser
    ecmaVersion: 2021,
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {}
};
