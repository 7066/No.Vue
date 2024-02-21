export default {
  description: "创建组件",
  prompts: [
    {
      type: "input",
      name: "code",
      message: "请输入组件代码(如: image)\n",
      validate: (_) => {
        if (_) return true;
        return "请输入组件名称!";
      },
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/components/No{{pascalCase code}}/index.vue",
      templateFile: "./.plop/templates/component/index.hbs",
    },
  ],
};
