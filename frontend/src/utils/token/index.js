export const getToken = () => {
  const access_token = localStorage.getItem("access_token");
  const token_type = localStorage.getItem("token_type");
  const token = { access_token, token_type };
  return token;
};

export const setToken = (token) => {
  localStorage.setItem("access_token", token?.access_token);
  localStorage.setItem("token_type", token?.token_type);
};
