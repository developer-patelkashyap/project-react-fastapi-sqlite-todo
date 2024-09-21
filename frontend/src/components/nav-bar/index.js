// react router
import { useNavigate } from "react-router-dom";

// styles
import "./styles.css";

// forms
import AddTodoForm from "../../forms/add-todo";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

// utils
import { setToken } from "../../utils/token";

export default function NavBar({ fetchTodos }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken({ token_type: "", access_token: "" });
    navigate("/");
  };
  return (
    <nav>
      <div id="NavContainer">
        <div id="NavHeading">
          <Typography variant="h5">Your Todos</Typography>
        </div>
        <div id="NavAddTodo">
          <AddTodoForm fetchTodos={fetchTodos} />
        </div>
        <div id="NavLogout">
          <Button variant="text" onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
