// mockjs拦截代码
import Mock from "mockjs";

// 用户信息
Mock.mock("/api/user/info", "get", () => {
  return {
    data: {
      name: Mock.Random.csentence(2),
      region: Mock.mock("@region"),
    },
    code: 200,
    message: "success",
  };
});

// 支持的主题
Mock.mock("/api/themes", "get", () => {
  return {
    data: ["light", "dark", "crazy"],
    code: 200,
    message: "success",
  };
});

// 前端路由 后端返回格式
interface M1 {
  [key: string]: Array<"edit" | "export">;
}
const M1JSON: M1 = {
  home: ["edit", "export"],
  example1: ["edit"],
  example2: ["export"],
};
Mock.mock("/api/user/menu1", "get", () => {
  return {
    data: M1JSON,
    code: 200,
    message: "success",
  };
});
