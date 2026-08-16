import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (data) setTodos(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (editTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text } : todo
        )
      );
      setEditTodo(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text,
          completed: false,
        },
      ]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="container">
      <h1>CRUD Todo App</h1>

      <TodoForm addTodo={addTodo} editTodo={editTodo} />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        setEditTodo={setEditTodo}
      />
    </div>
  );
}

export default App;