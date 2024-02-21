export default [
  {
    meta: {
      code: "example1",
      icon: "PieChart",
    },
    path: "/example1",
    component: () => import("@/example1/views/index.vue"),
  },
];
