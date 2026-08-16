import { useState, useEffect } from "react";

function TodoForm({ addTodo, editTodo }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editTodo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setText(editTodo.text);
    } else {
      setText("");
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      alert("Please enter a task");
      return;
    }

    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">
        {editTodo ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default TodoForm;