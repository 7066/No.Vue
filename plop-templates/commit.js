// 需要与 .commitlintrc.cjs 中的 rule 保持一致
import { spawn } from "child_process";
const choices = [
  {
    name: "feat: ✨        新增功能",
    value: "feat: ✨",
  },
  {
    name: "component: 📦   新增组件",
    value: "component: 📦",
  },
  {
    name: "fix: 🐛         修复缺陷",
    value: "fix: 🐛",
  },
  {
    name: "format: 🎨      代码格式化",
    value: "format: 🎨",
  },
  {
    name: "style: 💄       更新 UI 和样式文件",
    value: "style: 💄",
  },
  {
    name: "refactor: 💥    代码重构",
    value: "refactor: 💥",
  },
];

export default {
  description: "提交 commit",
  prompts: [
    {
      type: "list",
      choices,
      default: "feat",
      name: "type",
      message: "请选择提交类型 :\n",
    },
    {
      type: "input",
      name: "describe",
      message: "本次提交简述 :\n",
      validate: (_) => {
        if (_) return true;
        return "请简略叙述本次更改!";
      },
    },
    {
      type: "list",
      choices: [
        {
          name: "是",
          value: true,
        },
        {
          name: "否",
          value: false,
        },
      ],
      default: false,
      name: "hasRemark",
      message: "是否添加(涉及范围/BUG编号)备注 : \n",
    },
    {
      type: "input",
      name: "remark",
      message: "备注:\n",
      when: (data) => {
        return data.hasRemark;
      },
      validate: (_) => {
        if (_) return true;
        return "请添加备注!";
      },
    },
  ],
  actions: (data) => {
    const delayLog = (data) => () => {
      // 类型 + 简述
      let _ms = data.type + " " + data.describe;
      // 备注
      let _rk = "";
      if (data.hasRemark) {
        _rk = "\nREMARK :  " + data.remark;
      }
      spawn("git", ["commit", "-m", _ms + "    " + _rk], {
        stdio: "inherit",
      });

      const _ = "###-------------------------------------------------------###";
      if (data.hasRemark) {
        console.info(`
        \n\x1B[36m${_}\x1B[0m\n\x1B[35m${data.type}\x1B[0m  \x1B[10m${data.describe}\x1B[0m
        \n\x1B[45mREMARK :\x1B[0m  \x1B[10m${data.remark}\x1B[0m
        \n\x1B[36m${_}\x1B[0m`);

        return Promise.resolve("");
      }
      console.info(`
        \n\x1B[36m${_}\x1B[0m\n\x1B[35m${data.type}\x1B[0m  \x1B[10m${data.describe}\x1B[0m\n\x1B[36m${_}\x1B[0m`);
      return Promise.resolve("");
    };
    return [delayLog(data)];
  },
};
