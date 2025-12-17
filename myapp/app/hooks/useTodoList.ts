import { useState } from "react";
import { TodoItem } from "../types";
export default () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // 添加过滤标签状态

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

  // 计算过滤后的待办列表
  const filteredTodos = selectedTag
    ? todos.filter(todo => todo.tags?.includes(selectedTag))
    : todos;

  // 获取所有唯一标签用于过滤选择
  const allTags = Array.from(new Set(todos.flatMap(todo => todo.tags || [])));

  return {
    todos,
    filteredTodos,
    allTags,
    selectedTag,
    setSelectedTag,
    addTodo,
    deleteTodo,
    toggleComplete,
  };
};
