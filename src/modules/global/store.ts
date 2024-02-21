import { defineStore } from "pinia";
export const useGlobalStore = defineStore("global", {
  state: (): State => ({
    ins: new Map(),
    menu: [],
    mode: "staticMatch",
  }),
});

interface State {
  // 指令 模块-按钮权限
  ins: Map<string, Set<"edit" | "export">>;
  // 菜单
  menu: Array<any>;
  // 路由加载模式 staticMatch - 前端静态匹配路由; dynamicLoad - 后端动态加载路由
  mode: "staticMatch" | "dynamicLoad";
}
