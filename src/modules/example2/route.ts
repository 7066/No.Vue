export default [
  {
    meta: {
      code: "example2",
      icon: "menu",
    },
    path: "/example2",
    component: () => import("@/example2/views/index.vue"),
    children: [
      {
        meta: {
          label: "红",
        },
        path: "",
        component: () => import("@/example2/views/red.vue"),
      },
      {
        meta: {
          label: "金",
        },
        path: "gold",
        component: () => import("@/example2/views/gold.vue"),
      },
      {
        meta: {
          label: "蓝",
        },
        path: "blue",
        component: () => import("@/example2/views/blue.vue"),
      },
    ],
  },
];
