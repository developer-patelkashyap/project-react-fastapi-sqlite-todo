// utils
import { getToken } from "../../utils/token";

export const getTodos = async (data) => {
  const token = getToken();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.token_type + " " + token.access_token,
    },
  };

  const response = await fetch(
    `http://localhost:8000/api/v1/todos/user`,
    requestOptions
  );
  const responseData = await response.json();

  if (!response.ok) {
    return { status: response.status, detail: responseData?.detail };
  } else {
    return responseData;
  }
};
