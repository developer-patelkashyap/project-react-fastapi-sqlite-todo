// utils
import { setToken } from "../../utils/token";

export const login = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify(
      `grant_type=&username=${data?.email}&password=${data?.password}&scope=&client_id=&client_secret=`
    ),
  };

  const response = await fetch(
    "http://localhost:8000/api/v1/login",
    requestOptions
  );
  const responseData = await response.json();

  if (!response.ok) {
    console.error(responseData?.detail);
    return response.status;
  } else {
    setToken(responseData);
    return response.status;
  }
};

export const register = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    "http://localhost:8000/api/v1/users",
    requestOptions
  );
  const responseData = await response.json();

  if (!response.ok) {
    console.error(responseData?.detail);
    return response.status;
  } else {
    setToken(responseData);
    return response.status;
  }
};
