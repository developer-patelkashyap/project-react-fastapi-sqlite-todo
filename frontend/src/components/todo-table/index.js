import { useState, useEffect } from "react";

// services
import { getTodos, completeTodo, deleteTodo } from "../../services/todo";

// material ui
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TodoTable({ todos, fetchTodos }) {
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const todoComplete = async (todoId) => {
    const response = await completeTodo(todoId);
    if (response.status === 200) {
      fetchTodos();
    } else {
      setError(response.detail);
      setOpen(true);
    }
  };

  const todoDelete = async (todoId) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this ToDo?"
    );

    if (confirmDelete) {
      const response = await deleteTodo(todoId);

      if (response.status === 200) {
        fetchTodos();
      } else {
        setError(response?.detail);
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>
          <span
            style={{ color: "red", fontSize: "xx-large", fontWeight: "bold" }}
          >
            Issue While Updating Todo
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="right">Update Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <StyledTableRow
                key={todo.id}
                style={{
                  backgroundColor: todo.completed ? "lightgreen" : "inherit",
                }}
              >
                <StyledTableCell>{todo.title}</StyledTableCell>
                <StyledTableCell>{todo.description}</StyledTableCell>
                <StyledTableCell align="right">
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        todoComplete(todo.id);
                      }}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        todoDelete(todo.id);
                      }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
