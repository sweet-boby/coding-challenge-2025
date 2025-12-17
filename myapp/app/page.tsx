"use client";

import TodoListUI from "./components/TodoListUI";
import AddTodoUI from "./components/AddTodoUI";
import useTodoList from "./hooks/useTodoList";

export default function Home() {
  const {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    filteredTodos,
    allTags,
    selectedTag,
    setSelectedTag,
    sortOrder, // 新增
    setSortOrder, // 新增
    searchTodo,
  } = useTodoList();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">待办列表</h1>

      <TodoListUI
        searchTodo={searchTodo}
        extra={<AddTodoUI addTodo={addTodo} />}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        filteredTodos={filteredTodos}
        allTags={allTags}
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        sortOrder={sortOrder} // 新增
        setSortOrder={setSortOrder} // 新增
      />
    </div>
  );
}
