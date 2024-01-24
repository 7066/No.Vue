export default {
  description: "添加模块",
  prompts: [
    {
      type: "input",
      name: "module",
      message: "请输入模块/文件夹名称(如: user)\n",
      validate: (_) => {
        if (_) return true;
        return "请输入模块名称!";
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
      name: "hasLocales",
      message: "是否添加国际化配置?\n",
    },
    {
      type: "input",
      name: "text",
      message: "请设置模块的中文转换(如: 用户管理)\n",
      when: (data) => {
        return data.hasLocales;
      },
    },
  ],
  actions: (data) => {
    const _L = [
      {
        type: "add",
        path: "src/modules/{{lowerCase module}}/views/index.vue",
        templateFile: "plop-templates/module/views/index.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{lowerCase module}}/route.ts",
        templateFile: "plop-templates/module/route.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{lowerCase module}}/service.ts",
        templateFile: "plop-templates/module/service.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{lowerCase module}}/store.ts",
        templateFile: "plop-templates/module/store.hbs",
      },
    ];
    if (data.hasLocales) {
      [].push.apply(_L, [
        {
          type: "add",
          path: "src/modules/{{lowerCase module}}/locales/zh.ts",
          templateFile: "plop-templates/module/locales/zh.hbs",
        },
        {
          type: "add",
          path: "src/modules/{{lowerCase module}}/locales/en.ts",
          templateFile: "plop-templates/module/locales/en.hbs",
        },
      ]);
    }
    return _L;
  },
};
