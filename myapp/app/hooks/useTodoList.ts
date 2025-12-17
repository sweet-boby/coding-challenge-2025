import { useEffect, useState } from "react";
import { TodoItem } from "../types";
import {
  addTodoItem,
  getAllTodos,
  deleteTodoItem,
  toggleTodoStatus,
} from "../db/operation";

export default () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // 添加过滤标签状态
  const [sortOrder, setSortOrder] = useState<"priority" | "deadline" | null>(
    null
  ); // 添加排序状态

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const addTodo = (newTodo: TodoItem) => {
    if (newTodo.title.trim() === "") return;
    setTodos([...todos, newTodo]);
    addTodoItem(newTodo);
  };

  const deleteTodo = (id: number) => {
    deleteTodoItem(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          toggleTodoStatus(id, !todo.completed);
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  // 计算过滤后的待办列表
  const filteredTodos = selectedTag
    ? todos.filter((todo) => todo.tags?.includes(selectedTag))
    : todos;

  // 对过滤后的待办列表进行排序
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOrder === "priority") {
      // 优先级高的排在前面，没有优先级的排在后面
      if (a.priority === undefined && b.priority === undefined) return 0;
      if (a.priority === undefined) return 1;
      if (b.priority === undefined) return -1;
      return b.priority - a.priority;
    } else if (sortOrder === "deadline") {
      // 截止日期早的排在前面，没有截止日期的排在后面
      if (a.deadline === undefined && b.deadline === undefined) return 0;
      if (a.deadline === undefined) return 1;
      if (b.deadline === undefined) return -1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  });

  // 获取所有唯一标签用于过滤选择
  const allTags = Array.from(new Set(todos.flatMap((todo) => todo.tags || [])));

  return {
    todos,
    filteredTodos: sortedTodos, // 返回排序后的列表
    allTags,
    selectedTag,
    setSelectedTag,
    sortOrder, // 暴露排序状态
    setSortOrder, // 暴露设置排序状态的函数
    addTodo,
    deleteTodo,
    toggleComplete,
  };
};
