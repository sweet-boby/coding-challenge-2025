"use client";

import { useState } from "react";
import { Input, Button, Checkbox, Typography, Card, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface TodoItem {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const addTodo = () => {
    if (newTodoTitle.trim() === "") return;
    const newTodo: TodoItem = {
      id: Date.now(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
    setNewTodoDescription("");
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">待办列表</h1>
      <Card title="添加一个待办" className="w-full max-w-md mb-6">
        <Space vertical className="w-full">
          <Input
            placeholder="待办标题"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="描述（可选）"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
          <Button
            type="primary"
            onClick={addTodo}
            block
            icon={<PlusOutlined />}
          >
            Add Todo
          </Button>
        </Space>
      </Card>

      <Card title="我的待办" className="w-full max-w-md">
        {todos.length === 0 ? (
          <Text type="secondary">还没有待办事项。在上面添加一个!</Text>
        ) : (
          <ul className="list-none p-0 m-0">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex items-center">
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="mr-3"
                  />
                  <div>
                    <Text
                      delete={todo.completed}
                      strong={!todo.completed}
                      className={todo.completed ? "text-gray-500" : ""}
                    >
                      {todo.title}
                    </Text>
                    {todo.description && (
                      <Text
                        delete={todo.completed}
                        type="secondary"
                        className="block text-sm"
                      >
                        {todo.description}
                      </Text>
                    )}
                  </div>
                </div>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => deleteTodo(todo.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
