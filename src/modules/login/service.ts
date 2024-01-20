/**
 * @服务
 * 可以把复杂的数据处理逻辑放到这里
 * */

export const getUserInfo = () => {
  return request.get("/api/user/info");
};

export const history = () => {
  return request.get("/oioweb/common/history");
};
