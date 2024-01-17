import { RouteRecordRaw, Router } from "vue-router";
/**
 * @loading 加载方式
 * @asynchronous 异步
 * @synchronous 同步
 */
const loading = "synchronous";
export const init = (router: Router) => {
  /**
   * @开发环境不进行鉴权
   */
  if (import.meta.env.MODE === "development") {
    return handle.get("development")!(router, []);
  }
  /**
   * @初始化白名单
   */
  initWhitelist();
  /**
   * @动态权限及菜单
   */
  return handle.get(loading)!(router, []);
};

/**
 * @实际项目只需要确定一种加载方式
 */
const handle = new Map([
  /**
   * @同步 - 根据后端返回的模块code, 进行路由拦截
   */
  [
    "synchronous",
    (
      router: Router,
      resp: {
        label: string;
        code: string;
        permissions: string[];
      }[]
    ) => {
      // 后端返回的平铺权限表,
      resp = [
        {
          label: "自定义", // 动态模块名称, 当然也可以用前端定义好的 这里使用定义好的
          code: "helloworld", // 这里要和前端code 保持一致
          permissions: ["use"], // 动态按钮权限
        },
      ];
      // 收集权限
      const authority = new Map();
      resp.forEach(({ code, permissions }) => {
        authority.set(code, new Set(permissions));
      });

      // 前端应该会有 多(级)菜单 的需求,
      // 一二级菜单名称由前端定义
      const menu: {
        [key: string]: Array<{
          label: string;
          children: { label?: string; code?: string; children?: any[] }[];
        }>;
      } = {
        // 头部菜单
        headbar: [
          {
            label: "A",
            children: [{ code: "A1" }],
          },
          {
            label: "B",
            children: [
              { code: "B1" },
              { label: "B2", children: [{ code: "helloworld" }] },
            ],
          },
        ],
        // 侧边菜单
        sidebar: [
          {
            label: "C",
            children: [{ label: "C1", children: [{ code: "helloworld" }] }],
          },
          {
            label: "D",
            children: [{ code: "helloworld" }],
          },
        ],
      };

      const rt = (m: any[]) => {
        return m.filter((v) => {
          if (v.children) {
            v.children = rt(v.children);
            return v.children.length;
          }
          // 前后端数据合并 v = authority.get(v.code)
          return authority.has(v.code);
        });
      };

      Object.keys(menu).forEach((bar) => {
        menu[bar] = rt(menu[bar]);
      });

      /**
       * @到这里基本就可以了 可采用前端路由全量集成, 动态鉴权
       * 下面采用的是动态集成
       */

      // 读取文件
      const modules = import.meta.glob("../modules/*/route.ts", {
        eager: true,
        import: "default",
      }) as {
        [key: string]: Array<RouteRecordRaw & { label: string }>;
      };
      // 解析文件
      Object.entries(modules).forEach(([url, routes]) => {
        routes.forEach((route) => {
          const code = url.replace(/modules|route|\.ts|\.?\/?/g, ""); // 以文件名称为模块code
          if (authority.has(code)) {
            router.addRoute(route);
          }
        });
      });

      // 进行数据持久化
      const store = useGlobalStore();
      store.setAuthority(authority);
      return Promise.resolve();
    },
  ],
  /**
   * @异步 - 根据后端返回的代码位置等, 进行路由处理
   * 返回格式如下, 当然也可能是平铺的, 也可能有 show 这种, 按需定制好了
   */
  [
    "asynchronous",
    (router: Router, resp: any) => {
      resp = [
        {
          label: "A",
          children: [
            {
              code: "helloworld",
              label: "菜单名称",
              path: "/helloworld",
              component: "helloworld/views/index",
              operate: ["view"],
              children: [
                {
                  code: "bb1",
                  label: "sss",
                  path: "/helloworld/details/:id",
                  component: "helloworld/views/details",
                  operate: ["view"],
                },
              ],
            },
          ],
        },
        {
          label: "B",
          children: [
            {
              label: "B1",
              children: [
                {
                  code: "bb1",
                  label: "菜单名称",
                  path: "/bb1",
                  component: "helloworld/views/index",
                  operate: ["view"],
                },
              ],
            },
            {
              code: "b2",
              label: "菜单名称",
              path: "/b2",
              component: "helloworld/views/index",
              operate: ["view"],
            },
          ],
        },
      ];

      // 读取文件 建议 view 只存放页面, 页面组件放到 views 同级的 components 中
      const modules = import.meta.glob("../modules/*/views/*.vue");
      const authority = new Map();
      const loadModules = (route: any, isModule = false) => {
        const url = `../modules/${route.component}.vue`;
        if (url in modules) {
          const children = route.children
            ? route.children.map((e: any) => loadModules(e))
            : [];
          const config = {
            path: route.path,
            component: modules[url],
            children,
          };

          if (isModule) {
            authority.set(
              route.code, // 以文件名称为模块code
              new Set(route.operate)
            );

            router.addRoute(config);
          }
          return config;
        }
        return [];
      };
      // 设置菜单
      const menu = resp;

      const rt = (v: any[]) => {
        v.forEach((element: any) => {
          if (element.component) {
            loadModules(element, true);
          } else {
            rt(element.children);
          }
        });
      };

      // 处理路由
      rt(resp);

      // 进行数据持久化
      const store = useGlobalStore();
      store.setAuthority(authority);

      return Promise.resolve();
    },
  ],
  /**
   * @开发环境 - 不进行鉴权
   */
  [
    "development",
    (router: Router) => {
      // 菜单 依赖初始化模块的 label
      const menu: any[] = [];
      // 权限 默认拥有 use 权限, 还有如 view edit export
      const authority = new Map();
      // 读取文件
      const modules = import.meta.glob("../modules/*/route.ts", {
        eager: true,
        import: "default",
      }) as {
        [key: string]: Array<RouteRecordRaw & { code: string }>;
      };
      // 解析文件
      Object.entries(modules).forEach(([url, routes]) => {
        routes.forEach((route) => {
          if (route.code) {
            menu.push(route);
            authority.set(
              url.replace(/modules|route|\.ts|\.?\/?/g, ""), // 以文件名称为模块code
              new Set(["use"])
            );
          }
          router.addRoute(route);
        });
      });
      // 进行数据持久化
      const store = useGlobalStore();
      store.setAuthority(authority);

      store.menu = menu;
      return Promise.resolve();
    },
  ],
]);

/**
 * @加载白名单
 */
const initWhitelist = () => {
  const whitelist = import.meta.glob(
    [
      "../modules/global/route.ts",
      "../modules/login/route.ts",
      "../modules/lost/route.ts",
    ],
    {
      eager: true,
      import: "default",
    }
  ) as {
    [key: string]: Array<RouteRecordRaw & { label: string }>;
  };

  Object.values(whitelist).forEach((routes) => {
    routes.forEach((route) => {
      router.addRoute(route);
    });
  });
};
