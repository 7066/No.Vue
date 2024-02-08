import { defineStore } from "pinia";
export const useExample1Store = defineStore("example1", {
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {},
  actions: {},
});
