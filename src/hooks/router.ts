import { createRouter, createWebHashHistory } from "vue-router";
import { load, initWhitelist } from "#/router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
});

/** @加载白名单 */
initWhitelist(router);

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    localStorage.clear();
    next();
  } else {
    // 判断当前是否已加载权限对照表
    const _gs = useGlobalStore();
    if (_gs.ins.size) {
      next();
    } else {
      /** @加载用户路由 */
      load().then(() => {
        // 重新加载当前路由地址缓存的路由 location.hash -> #/path
        router.replace(location.hash.replace("#", ""));
      });
    }
  }
});

// 鉴权函数
export const isAllowed = (code: string, type: "edit" | "export") => {
  const _gs = useGlobalStore();
  console.log(_gs.ins, "??");
  if (!_gs.ins.has(code)) return false;
  if (_gs.ins.get(code)?.has(type)) return true;
  return false;
};

export default router;
