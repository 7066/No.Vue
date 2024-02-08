export default [
  {
    meta: {
      code: "home",
      icon: "menu",
    },
    path: "/home",
    component: () => import("./views/index.vue"),
  },
];
