export const api_search = () => {
  return request.get("github/search/users", {
    params: {
      q: "7066",
    },
  });
};

export const api_search2 = () => {
  return request.get("github/search/users2", {
    params: {
      q: "7066",
    },
  });
};
