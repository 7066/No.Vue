import { defineStore } from "pinia";
export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      text: "login.text",
    };
  },
  getters: {},
  actions: {},
});
