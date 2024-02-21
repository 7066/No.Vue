export default [
  {
    meta: {
      code: "home",
      icon: "Operation",
    },
    path: "/home",
    component: () => import("@/home/views/index.vue"),
  },
];
