import React, { useState, useEffect } from "react";

interface ITodo {
  text: string;
  isEditing: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, isEditing: false }]);
    setNewTodo("");
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const startEditing = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isEditing: true } : todo
    );
    setTodos(updatedTodos);
  };

  const saveEdit = (index: number, newText: string) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: newText, isEditing: false } : todo
    );
    setTodos(updatedTodos);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    value: string
  ) => {
    if (e.key === "Enter") {
      saveEdit(index, value);
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo} className="add-button">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo.isEditing ? (
              <input
                type="text"
                defaultValue={todo.text}
                onBlur={(e) => saveEdit(index, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, index, e.currentTarget.value)}
                autoFocus
              />
            ) : (
              <span className="todo-text">{todo.text}</span>
            )}
            <button
              onClick={() => startEditing(index)}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(index)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;