import { defineStore } from "pinia";
export const usePermissionsStore = defineStore("permissions", {
  state: () => {
    return {
      modules: [
        {
          label: "角色管理",
          code: "role",
          path: "/role",
          url: "role/views/index",
        },
        {
          label: "用户管理",
          code: "user",
          path: "/user",
          url: "user/views/index",
        },
        {
          label: "系统设置",
          code: "system-settings",
          path: "/system-settings",
          url: "system-settings/views/index",
        },
        {
          label: "系统日志",
          code: "system-log",
          path: "/system-log",
          url: "system-log/views/index",
          children: [
            {
              superior: "system-log-home",
              redirect: true,
              label: "日志首页",
              code: "system-log-home",
              path: "/system-log/home",
              url: "system-log/views/home",
              permission: ["view"],
            },
            {
              superior: "system-log",
              label: "日志详情",
              code: "system-log-details",
              path: "/system-log/details/:id",
              url: "system-log/views/details",
              permission: ["view"],
            },
          ],
        },
      ] as any[],
    };
  },
});
