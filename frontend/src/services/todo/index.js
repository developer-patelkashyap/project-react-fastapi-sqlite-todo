// utils
import { getToken } from "../../utils/token";

export const getTodos = async () => {
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

export const createTodo = async (todoData) => {
  const token = getToken();

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.token_type + " " + token.access_token,
    },
    body: JSON.stringify(todoData),
  };

  const response = await fetch(
    `http://localhost:8000/api/v1/todos/`,
    requestOptions
  );
  const responseData = await response.json();

  if (!response.ok) {
    return { status: response.status, detail: responseData?.detail };
  } else {
    return { status: response.status };
  }
};

export const completeTodo = async (todoId) => {
  const token = getToken();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.token_type + " " + token.access_token,
    },
    body: JSON.stringify({ title: "", description: "", completed: true }),
  };

  const response = await fetch(
    `http://localhost:8000/api/v1/todos/${todoId}`,
    requestOptions
  );
  const responseData = await response.json();

  if (!response.ok) {
    return { status: response.status, detail: responseData?.detail };
  } else {
    return { status: response.status };
  }
};

export const deleteTodo = async (todoId) => {
  const token = getToken();

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.token_type + " " + token.access_token,
    },
  };

  const response = await fetch(
    `http://localhost:8000/api/v1/todos/${todoId}`,
    requestOptions
  );
  const responseData = await response.json();

  if (!response.ok) {
    return { status: response.status, detail: responseData?.detail };
  } else {
    return { status: response.status };
  }
};
