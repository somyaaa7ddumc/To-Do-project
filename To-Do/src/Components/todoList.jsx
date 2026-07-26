import TodoItem from "./TodoItem";

function TodoList({
  todos,
  deleteTodo,
  toggleComplete,
  setEditTodo,
}) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p>No Task Found</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            setEditTodo={setEditTodo}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;