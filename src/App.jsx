import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [search, setSearch] = useState("");

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

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="container">
      <h1>To-do List</h1>

      <TodoForm addTodo={addTodo} editTodo={editTodo} />

      <input
        type="text"
        className="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="task-stats">
        <span>{todos.length} tasks</span>
        <span>{completedCount} completed</span>
        <span>{remainingCount} remaining</span>
      </div>

      {completedCount > 0 && (
        <button className="clear-button" onClick={clearCompleted}>
          Clear Completed
        </button>
      )}

      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        setEditTodo={setEditTodo}
      />
    </div>
  );
}

export default App;