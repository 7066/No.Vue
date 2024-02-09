import { defineStore } from "pinia";
export const useGlobalStore = defineStore("global", {
  state: (): State => ({
    ins: new Map(),
    menu: [],
    mode: "url",
  }),
});

interface State {
  // 指令 模块-按钮权限
  ins: Map<string, Set<"edit" | "export">>;
  // 菜单
  menu: Array<any>;
  // 路由加载模式 code - 前端路由，url - 后端路由
  mode: "code" | "url";
}
