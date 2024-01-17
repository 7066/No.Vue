export const fetchPermissions = (params: any) => {
  return request.post("/api/permissions", params);
};
