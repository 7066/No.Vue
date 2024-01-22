import { defineStore } from "pinia";
export const useGlobalStore = defineStore("global", {
  state: (): State => ({
    title: "home",
  }),
});

interface State {
  title: string;
}
