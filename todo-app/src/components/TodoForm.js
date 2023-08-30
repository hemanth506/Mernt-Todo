import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function TodoForm() {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [todos, edit]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!edit) {
      addTodo(item);
    } else {
      todos.map((todo) => {
        if (todo.id === currentItemId) {
          todo.item = item;
          return;
        }
      });
      console.log(currentItemId);
    }
    setEdit(false);
    setCurrentItemId(null);
    // console.log("🚀 ~ file: TodoForm.js:18 ~ submitHandler ~ edit:", edit);
    setItem("");
  };

  const addTodo = (item) => {
    setTodos([...todos, { id: Math.floor(Math.random() * 100000), item }]);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const updateTodo = (id) => {
    const updateTodo = todos.filter((todo) => todo.id === id);
    // console.log("🚀 ~ ", updateTodo, updateTodo[0].item);
    setItem(updateTodo[0].item);
    setCurrentItemId(updateTodo[0].id);
    setEdit(true);
    // console.log(todos);
  };

  return (
    <Box component="span" sx={{ display: "block" }} m="auto">
      <form onSubmit={submitHandler}>
        <TextField
          id="standard-basic"
          label="What is your plan today?"
          variant="standard"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          inputRef={inputRef}
        />
        <Button variant="contained" type="submit">
          Add todos
        </Button>
        <div>
          {todos.map((todo) => (
            <h3 key={todo.id}>
              {todo.item}
              <DeleteIcon onClick={() => deleteTodo(todo.id)} />
              <EditIcon onClick={() => updateTodo(todo.id)} />
            </h3>
          ))}
        </div>
      </form>
    </Box>
  );
}

export default TodoForm;
