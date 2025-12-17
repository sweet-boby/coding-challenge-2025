"use client";

import TodoListUI from "./components/TodoListUI";
import AddTodoUI from "./components/AddTodoUI";
import useTodoList from "./hooks/useTodoList";

export default function Home() {
  const { todos, addTodo, toggleComplete, deleteTodo } = useTodoList();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">待办列表</h1>
      <AddTodoUI addTodo={addTodo} />

      <TodoListUI
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
