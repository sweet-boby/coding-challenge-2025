import { useState } from "react";

interface TodoItem {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export default () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (newTodoTitle: string, newTodoDescription: string) => {
    if (newTodoTitle.trim() === "") return;
    const newTodo: TodoItem = {
      id: Date.now(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
    };
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
