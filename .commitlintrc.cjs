/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "component", "fix", "format", "style", "refactor"],
    ],
    "type-empty": [2, "never"],
    "type-case": [2, "always", "lower-case"],
    "header-max-length": [2, "never", 72],
  },
  prompt: {
    // 常用 commit
    alias: { cp: "component: 新增组件" , style: "style: 样式还原" },
    // 关掉issue相关
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: false,
    // 过滤的问题
    skipQuestions: [
      "scope",
      "customScope",
      // "subject",
      // "body",
      "breaking",
      "footerPrefixesSelect",
      "customFooterPrefix",
      "footer",
      "generatingByAI",
      "generatedSelectByAI",
      "confirmCommit",
    ],
    messages: {
      type: "选择你要提交的类型 :",
      subject: "本次提交概要 :\n",
      body: '是否添加详细描述（可选）使用 "|" 换行, 回车提交 commit :\n',
    },
    types: [
      {
        value: "feat",
        name: "feat:✨ 新增功能",
        emoji: ":sparkles:",
      },
      {
        value: "component",
        name: "component:📦 新增组件",
        emoji: ":package:",
      },
      { value: "fix", name: "fix:🐛 修复缺陷", emoji: ":bug:" },
      {
        value: "format",
        name: "format: 🎨 代码格式化",
        emoji: ":art:",
      },
      {
        value: "style",
        name: "style:💄 更新 UI 和样式文件",
        emoji: ":lipstick:",
      },
      {
        value: "refactor",
        name: "refactor:💥 代码重构",
        emoji: ":boom:",
      },
    ],
    useEmoji: true,
  },
};
