import { useState } from "react";

// material ui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// services
import { createTodo } from "../../services/todo";

export default function AddTodoForm({ fetchTodos }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const todoCreate = async (todoData) => {
    const response = await createTodo(todoData);
    if (response.status === 200) {
      setError(false);
      fetchTodos();
      handleClose();
    } else {
      setErrorMsg(response?.detail);
      setError(true);
    }
  };
  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        Add Todo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get("title");
            const description = formData.get("description");
            todoCreate({ title, description });
          },
        }}
      >
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a todo, please enter a title and description.
          </DialogContentText>
          {error && (
            <Alert severity="error" onClose={() => setError(false)}>
              {errorMsg}
            </Alert>
          )}
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
