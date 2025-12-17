"use client";

import { useState } from "react";
import { Input, Button, Checkbox, Typography, Card, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TodoListUI from "./components/TodoListUI";
import AddTodoUI from "./components/AddTodoUI";
import useTodoList from "./hooks/useTodoList";
const { Text } = Typography;

interface TodoItem {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

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
