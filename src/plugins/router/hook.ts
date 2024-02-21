import { Router, RouteRecordRaw } from "vue-router";
import M1MENU from "constant/menu.json";
/** @加载白名单 */
export const initWhitelist = (router: Router) => {
  const whitelist = import.meta.glob(
    [
      "../../modules/global/route.ts",
      "../../modules/login/route.ts",
      "../../modules/lost/route.ts",
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
export const Load_Route = () => {
  const _global = useGlobalStore();
  const MODE = localStorage.getItem("MODE");
  if (MODE) {
    _global.mode = MODE as "staticMatch" | "dynamicLoad";
  }
  const mode = _global.mode;

  const API = new Map([
    [
      /**
       * @前端路由 前端定义菜单目录 后端返回模块权限及其按钮权限
       * */
      "staticMatch",
      () =>
        request.get("/api/user/menu1").then((resp: any) => {
          const _gs = useGlobalStore();
          // 防止重复加载
          const ISREADY = new Set();
          // 路由 id
          let id = 0;
          // 按钮权限
          _gs.ins.clear();

          // 直接读取各模块路由表
          const modules = import.meta.glob("../../modules/*/route.ts", {
            eager: true,
            import: "default",
          }) as {
            [key: string]: Array<RouteRecordRaw & { label: string }>;
          };

          // 根据模块名称组成 module: fileUrl 格式
          const keys = Object.keys(modules)
            .map((url) => [url.replace(/\.|\/|modules|route|ts/g, ""), url])
            .reduce((result: any, [key, url]) => {
              result[key] = url;
              return result;
            }, {});

          /** @根据前端自定义目录和实际权限确定最终展示 */
          const dp = (arr: Array<any>): any => {
            return arr.filter((item: any) => {
              // 菜单继续遍历, 根据 children 长度决定是否显示
              if (item.type === "menu") {
                const children = dp(item.children || []);
                Object.assign(item, {
                  children,
                  id: id++ + "",
                });

                return children.length;
              }

              if (item.type === "module") {
                // 判断模块是否有权限
                if (item.code in resp) {
                  // 判断模块是否真实存在
                  if (item.code in keys) {
                    // 收集按钮权限
                    _gs.ins.set(item.code, new Set(resp[item.code]));
                    // 获取模块对应的文件路径
                    const url = keys[item.code];

                    // 读取模块的路由配置信息
                    modules[url].forEach((route: any) => {
                      // 补充菜单中的 meta
                      Object.assign(item, {
                        meta: route.meta,
                        path: route.path,
                        id: id++ + "",
                      });
                      // 防止重复加载
                      if (!ISREADY.has(url)) {
                        // 设置路由信息
                        router.addRoute(route);
                      }
                    });
                    // 标记已加载
                    ISREADY.add(item.code);
                    return true;
                  }
                }
              }

              return false;
            });
          };

          _gs.menu = dp(M1MENU);
          return resp;
        }),
    ],
    [
      /**
       * @后端路由 后端确定菜单目录信息 及 文件路径
       * */
      "dynamicLoad",
      () =>
        request.get("/api/user/menu2").then((resp: any) => {
          const _gs = useGlobalStore();
          // 防止重复加载
          const ISREADY = new Set();
          // 路由 id
          let id = 0;
          // 按钮权限
          _gs.ins.clear();
          // 收集文件
          const modules = import.meta.glob("../../modules/*/views/*.vue");
          // 加载路由
          const dp = (arr: any, SET = true) => {
            return arr.filter((el: any) => {
              if (el.type === "menu") {
                const children = dp(el.children || []);
                Object.assign(el, {
                  children,
                  id: id++ + "",
                });

                return children.length;
              }

              if (el.type === "module") {
                // 文件地址
                const url = `../../modules/${el.component}.vue`;
                if (url in modules) {
                  // 设置按钮权限
                  const { code = "", operate = [] } = el.meta || {};
                  if (code && operate.length) {
                    _gs.ins.set(code, new Set(operate));
                  }

                  // 设置信息
                  const config = Object.assign(el, {
                    code, // 为了与前端路由数据规范保持一致, 这样不需要修改二次代码
                    children: dp(el.children || [], false), // 子路由不必重复添加
                    component: modules[url],
                    id: id++ + "",
                  });

                  // 防止重复加载
                  if (!ISREADY.has(url) && SET) {
                    router.addRoute(config);
                  }

                  // 标记已加载
                  ISREADY.add(url);
                  return true;
                }
                return false;
              }
            });
          };

          _gs.menu = dp(resp);
        }),
    ],
  ]);
  return (API.get(mode) as any)();
};
