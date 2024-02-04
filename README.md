## 开始

```bash
# 按照依赖
yarn

# 运行项目
yarn dev

# 打包项目
yarn build

# 启动交互, 添加模块, 添加公共组件, 提交代码信息
yarn p
```

## 目录结构

> 目录整体结构

```text

├─build
    │   脚本命令
    │
    ├─husky 增加提交信息的修饰
    │
    ├─plop 命令行交互指令 (yarn p)
    │   templates       模版存放位置
    │   commit.js       交互式提及Commit
    │   component.js    交互式添加组件
    │   module.js       交互式添加模块
    └─vite 项目打包配置
├─public
    │   静态资源
    │
    ├─iconfont
    │
    └─themes 主题CSS文件
├─src
    │   main.ts 入口
    │
    ├─assets 图片和样式
    │
    ├─components 公共组件(无需引入,可全局使用)
    │
    ├─hooks 全局封装函数(直接使用,无需引入)
    │   i18n        国际化集成(useLocale)-[const locale = useLocale();]
    │   request     Axios二次封装及请求拦截(request)
    │   router      路由动态集成(router)
    │   theme       主题动态加载(useTheme,getThemes,INIT_THEME)
    ├─modules 模块
    │
    └─utils 工具函数
```

## Modules 结构说明

> 位于 src/modules 下，模块命名应与接口保持一致

```text
├─settings
    │   route.js        路由
    │   service.js      接口(文件内直接使用 request, 模块间使用 @ 跨模块引入)
    │   store.js        Pinia State
    ├─components 模块内不同页面间常用的公共组件
    │
    ├─images 图片
    │
    ├─locales 翻译文件
    │  en.json
    │  zh.json
    └─view 页面
       - index.vue  (无子路由)
       - page1.vue  (有子路由简单页面)
       - page2      (有子路由复杂页面)
          - index.vue
          - Popup1.vue(组件1)
          - Popup2.vue(组件2)
```

> route.js 说明

```js
// route.js
const meta = {
  code: "S001",     // 权限码
  icon: "settings", // 图标
};

const route = [
  {
    ...meta,
    path: "/settings",
    component: () => import("./views/index.vue"),
    children: [
      {
        path: "",
        component: () => import("./view/logs/index.vue"),
      },
      ...
    ],
  },
];

export { route, meta };
```

## Alias 别称

```js
{
  "@": resolve("src/modules"),
  "~": resolve("src/assets"),
  "#": resolve("src/utils"),
}
```

## 代码规范检查

> 统一代码风格

> 使用 ESLint, Prettier 规范JS代码, Stylelint 规范样式代码, Commitlint 规范提交信息, 借助 Lint-Staged 同样会在提交时再次检查代码。
