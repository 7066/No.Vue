export default [
  {
    path: "/permissions",
    label: "权限管理",
    icon: "permissions",
    code: "permissions",
    component: () => import("@/permissions/views/index.vue"),
    redirect: "/permissions/module",
    children: [
      {
        label: "模块管理",
        icon: "permissions",
        code: "module",
        path: "/permissions/module",
        component: () => import("@/permissions/views/module.vue"),
      },
      {
        label: "菜单管理",
        icon: "menu",
        code: "menu",
        path: "/permissions/menu",
        component: () => import("@/permissions/views/menu.vue"),
      },
    ],
  },
];
