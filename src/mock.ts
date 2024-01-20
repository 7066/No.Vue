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
    data: ["light", "dark", "red"],
    code: 200,
    message: "success",
  };
});
