import { defineStore } from "pinia";
export const useHomeStore = defineStore("home", {
  state: (): State => ({
    title: "home",
  }),
});

interface State {
  title: string;
}
