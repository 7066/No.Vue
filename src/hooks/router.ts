import { createRouter, createWebHashHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
});

// 白名单
const whitelist = import.meta.glob(
  ["../modules/home/route.ts", "../modules/login/route.ts"],
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
export default router;
