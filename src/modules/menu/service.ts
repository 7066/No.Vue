export const fetchMenu = (params: any) => {
  return request.post("/api/menu", params);
};
