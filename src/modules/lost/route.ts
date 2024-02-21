export default [
  {
    meta: {
      code: "auto",
      icon: "",
    },
    path: "/404",
    component: () => import("@/lost/views/index.vue"),
  },
  {
    meta: {
      code: "auto",
      icon: "",
    },
    path: "/:error*",
    redirect: "/404",
  },
];
