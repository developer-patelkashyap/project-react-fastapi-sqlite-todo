import { useState, useEffect } from "react";

// components
import TodoTable from "../../components/todo-table";
import Copyright from "../../components/copyright";
import NavBar from "../../components/nav-bar";

// services
import { getTodos } from "../../services/todo";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const responseData = await getTodos();
      setTodos(responseData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <>
      <NavBar fetchTodos={fetchTodos} />
      <TodoTable todos={todos} fetchTodos={fetchTodos} />
      <Copyright
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, mt: 8, mb: 4 }}
      ></Copyright>
    </>
  );
}
