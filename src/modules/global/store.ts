import { defineStore } from "pinia";
export const useGlobalStore = defineStore("global", {
  state: (): State => ({
    title: "home",
    ins: new Map(),
    menu: [],
  }),
});

interface State {
  title: string;
  // 指令 模块-按钮权限
  ins: Map<string, Set<"edit" | "export">>;
  // 菜单
  menu: Array<any>;
}
