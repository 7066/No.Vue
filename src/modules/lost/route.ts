export default [
  {
    path: "/404",
    component: () => import("@/lost/views/index.vue"),
  },
  {
    path: "/:error*",
    redirect: "/404",
  },
];
