import { Router } from "vue-router";
import { init } from "utils/InitializeRouting";

export const InitializeRouting = (router: Router) => {
  // TODO 接口返回权限表
  return init(router);
};
