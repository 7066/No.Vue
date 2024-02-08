import { defineStore } from "pinia";
export const useLoginStore = defineStore("login", {
  state: (): State => ({
    user: "7066",
    id: 4454545,
  }),
});

interface State {
  user: string;
  id: number;
}
