import { createRouter, createWebHashHistory } from "vue-router";
import { Load_Route, initWhitelist } from "./hook";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
});

/** @加载白名单 */
initWhitelist(router);

// @ts-ignore
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    const _gs = useGlobalStore();
    _gs.$reset();
    next();
  } else {
    const TOKEN = localStorage.getItem("TOKEN");
    if (!TOKEN) {
      ElMessage.error("登录状态失效, 即将退出登录!");
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    } else {
      // 判断当前是否已加载权限对照表
      const _gs = useGlobalStore();
      if (_gs.ins.size) {
        next();
      } else {
        /** @加载用户路由 */
        NProgress.start();
        Load_Route().then(() => {
          const path = location.hash.replace("#", "");
          router.replace(path === "/login" ? "/" : path);
          NProgress.done();
        });
      }
    }
  }
});

export default router;
