export default {
  description: "创建一个公共组件",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "请输入组件名称(例: image -> components/NoImage)\n",
      validate: (_) => {
        if (_) return true;
        return "请输入组件名称!";
      },
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/components/No{{pascalCase name}}/index.vue",
      templateFile: "plop-templates/component/index.hbs",
    },
  ],
};
