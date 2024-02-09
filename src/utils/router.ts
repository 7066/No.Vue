import { Router, RouteRecordRaw } from "vue-router";

/** @加载白名单 */
export const initWhitelist = (router: Router) => {
  const whitelist = import.meta.glob(
    [
      "../modules/global/route.ts",
      "../modules/login/route.ts",
      "../modules/lost/route.ts",
    ],
    {
      eager: true,
      import: "default",
    },
  ) as {
    [key: string]: Array<RouteRecordRaw & { label: string }>;
  };

  Object.values(whitelist).forEach((routes) => {
    routes.forEach((route) => {
      router.addRoute(route);
    });
  });
};

/** @加载用户路由 */
export const load = () => {
  console.info("请求路由信息");
  const _global = useGlobalStore();
  const MODE = localStorage.getItem("MODE");
  if (MODE) {
    _global.mode = MODE as "code" | "url";
  }
  const mode = _global.mode;

  const API = new Map([
    [
      /**
       * @前端路由 前端定义菜单目录 后端返回模块权限及其按钮权限
       * */
      "code",
      () =>
        request.get("/api/user/menu1").then((resp: any) => {
          const _gs = useGlobalStore();
          /** @模块按钮权限 */
          _gs.ins.clear();
          Object.keys(resp).forEach((key) => {
            _gs.ins.set(key, new Set(resp[key]));
          });

          /** @收集路由表 */
          const modules = import.meta.glob("../modules/*/route.ts", {
            eager: true,
            import: "default",
          }) as {
            [key: string]: Array<RouteRecordRaw & { label: string }>;
          };

          // 收集有权限的路由信息
          const _obj: any = {};
          /** @动态添加路由 */
          Object.values(modules).forEach((routes) => {
            routes.forEach((route: any) => {
              if (_gs.ins.has(route.meta.code)) {
                // 自定义目录, 先收集信息
                const key = route.meta.code;
                _obj[key] = {
                  ...route.meta,
                  path: route.path,
                };
                router.addRoute(route);
              }
            });
          });

          /** @根据前端自定义目录和实际权限确定最终展示 */
          const dp = (arr: Array<any>): any => {
            return arr.filter((item: any) => {
              if (item.children) {
                item.children = dp(item.children);
                return item.children.length;
              } else {
                if (item.code in _obj) {
                  item = Object.assign(item, _obj[item.code]);
                  return true;
                }
                return false;
              }
            });
          };

          // 设置菜单
          _gs.menu = dp(M1MENU);
          return resp;
        }),
    ],
    [
      /**
       * @后端路由 后端确定菜单目录信息 及 文件路径
       * */
      "url",
      () =>
        request.get("/api/user/menu2").then((resp) => {
          const _gs = useGlobalStore();
          /** @模块按钮权限 */
          _gs.ins.clear();
          // 收集文件
          const modules = import.meta.glob("../modules/*/views/*.vue");
          // 加载路由
          const dp = (arr: any, addRoute = true) => {
            return arr.filter((el: any) => {
              if (el.type === "menu") {
                // const config = Object.assign({}, el, {
                const children = dp(el.children || []);
                Object.assign(el, {
                  children,
                });

                return children.length;
              }

              if (el.type === "module") {
                // 文件地址
                const url = `../modules/${el.component}.vue`;
                if (url in modules) {
                  // 设置按钮权限
                  const { code = "", operate = [] } = el.meta || {};

                  if (code && operate.length) {
                    _gs.ins.set(code, new Set(operate));
                  }

                  const config = Object.assign(el, {
                    // const config = Object.assign({}, el, {
                    code, // 为了与前端路由数据规范保持一致, 这样不需要修改二次代码
                    children: dp(el.children || [], false),
                    component: modules[url],
                  });
                  // 子路由不必重复添加
                  if (addRoute) {
                    router.addRoute(config);
                  }
                  return true;
                }
                return false;
              }
            });
          };

          const result = dp(resp);
          _gs.menu = result;
        }),
    ],
  ]);
  return (API.get(mode) as any)();
};

// 调用函数
const M1MENU = [
  {
    type: "module",
    code: "home",
  },
  {
    type: "menu",
    label: "自定义目录1",
    children: [
      {
        type: "menu",
        label: "自定义目录2, 无权限的模块不加载",
        children: [
          {
            type: "module",
            code: "example1",
          },
          {
            type: "module",
            code: "XXX",
          },
        ],
      },
      {
        type: "module",
        code: "example2",
      },
    ],
  },
  {
    type: "menu",
    label: "自定义目录9",
    children: [
      {
        code: "example1",
      },
    ],
  },
];
