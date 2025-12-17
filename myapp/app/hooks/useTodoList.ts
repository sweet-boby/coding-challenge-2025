import { useState } from "react";
import { TodoItem } from "../types";
export default () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (newTodo: TodoItem) => {
    if (newTodo.title.trim() === "") return;
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  return {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
  };
};
