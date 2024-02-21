## 简介

`基于 Vite 搭建的 Vue3 TypeScript ElementPlus Pinia 项目`

> 项目按模块化的方式划分, 每个模块内都有独立的路由、服务、国际化、数据共享文件

> 项目中集成了请求代理拦截、打包配置、路由动态加载、按钮权限、主题动态加载、国际化、分辨率自适应、 Vue Api 自动导入、ElementPlus Components 与 Icon 自动导入

## 开始

`同样可以使用 pnpm yarn2 等方式`

```bash
# 按照依赖
yarn

# 运行项目
yarn dev

# 打包项目
yarn build

# 启动交互, 添加模块、添加公共组件、提交 Commit 信息
yarn p
```

## 目录结构

> 目录整体结构

```text

├─build
    │   脚本命令存放
    │
    ├─husky 钩子执行脚本
    │ commit-msg.js 拦截 git commit 进行提交信息的修饰
    ├─plop 命令行交互指令 (yarn p)
    │   templates       模版存放位置
    │   commit.js       交互式提交Commit（当然 cz-git 与 czg 同样可以实现, 但自己定制更方便）
    │   component.js    交互式添加组件
    │   module.js       交互式添加模块
    └─vite 项目打包配置
├─public
    │   静态资源存放
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
    ├─hooks 全局封装函数(导出的 api 直接使用, 无需引入)
    │   i18n        国际化集成(useLocale)
    │   request     Axios二次封装及请求拦截(request) 过滤了 open 接口以及判断 TOKEN 不存在登出
    │   router      路由动态集成(router、isAllowed) 内置前端动态与后端动态两种路由加载方式及按钮鉴权
    │   theme       主题动态加载(useTheme、getThemes[这里通过接口获取主题文件列表]、INIT_THEME)
    ├─modules 模块
    │
    ├─utils 工具函数
    │   router.ts 路由加载及处理
```

## Modules 结构说明

> 位于 src/modules 下，模块命名应与接口保持一致

```text
├─example
    │   route.js        路由
    │   service.js      接口(文件内直接使用 request, 模块间使用 @ 跨模块引入)
    │   store.js        Pinia State(通过 yarn p 生成的模块自动导出 useExampleStore)
    ├─components  页面 views 中涉及的组件都应放置在此文件夹中, 模块内可以通过 @/example/components 使用
    │
    ├─images 图片, 模块内可以通过  @/example/images 使用
    │
    ├─locales 翻译文件
    │  en.json
    │  zh.json
    └─views 页面
       - index.vue  (主页面)
       - page1.vue  (子路由页面)
```

> route.js 说明

```js
// route.js
export default [
  {
    meta: {
      code: "S001",     // 权限码
      icon: "example",  // 图标
    },
    path: "/example",
    component: () => import("./views/index.vue"),
    children: [
      {
        meta: {
          label: "日志", // 子路由标题, 面包屑导航需要, 也可以做成国际化的方式
        },
        path: "",
        component: () => import("./view/logs.vue"),
      },
      ...
    ],
  },
];
```

## Alias 别称

```js
{
  "@": resolve("src/modules"),
  "~": resolve("src/assets"),
  "#": resolve("src/utils"),
}
```

## 代码规范

> 使用 husky、commitlint、lint-staged 规范提交信息及检查与处理提交的文件

> 集成 ESLint、Prettier 进行JS代码的自动格式化和规范检查

> 使用 stylelint 检查与格式化样式代码
