import React from "react";

// components
import TodoTable from "../../components/todo-table";
import Copyright from "../../components/copyright";

export default function TodoPage() {
  return (
    <>
      <TodoTable />
      <Copyright sx={{ mt: 8, mb: 4 }}></Copyright>
    </>
  );
}
