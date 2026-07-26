function TodoItem({
  todo,
  deleteTodo,
  toggleComplete,
  setEditTodo,
}) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this?")) {
      deleteTodo(todo.id);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginLeft: "10px",
          flex: 1,
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => setEditTodo(todo)}>
        Edit
      </button>

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;