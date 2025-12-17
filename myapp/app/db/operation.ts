import { db } from "./db";
import { TodoItem } from "../types";

export async function addTodoItem(
  todo: Omit<TodoItem, "id" | "completed">
): Promise<number> {
  return await db.todoList.add({
    ...todo,
    completed: false, // New todos are not completed by default
  });
}

export async function getAllTodos(): Promise<TodoItem[]> {
  return await db.todoList.toArray();
}

export async function updateTodo(
  id: number,
  changes: Partial<TodoItem>
): Promise<number> {
  return await db.todoList.update(id, changes);
}

export async function deleteTodoItem(id: number): Promise<void> {
  await db.todoList.delete(id);
}

export async function getTodoById(id: number): Promise<TodoItem | undefined> {
  return await db.todoList.get(id);
}

export async function toggleTodoStatus(
  id: number,
  completed: boolean
): Promise<number> {
  return await db.todoList.update(id, { completed });
}

export async function getTodosByPriority(
  priority: number
): Promise<TodoItem[]> {
  return await db.todoList.where("priority").equals(priority).toArray();
}

export async function getTodosByTag(tag: string): Promise<TodoItem[]> {
  return await db.todoList.where("tags").anyOf(tag).toArray();
}

export async function getCompletedTodos(): Promise<TodoItem[]> {
  return await db.todoList
    .where({
      completed: true,
    })
    .toArray();
}

export async function getIncompleteTodos(): Promise<TodoItem[]> {
  return await db.todoList
    .where({
      completed: false,
    })
    .toArray();
}

export async function clearCompletedTodos(): Promise<void> {
  const completedTodos = await db.todoList
    .where({
      completed: true,
    })
    .toArray();
  const idsToDelete = completedTodos.map((todo) => todo.id!);
  await db.todoList.bulkDelete(idsToDelete);
}

// 对todolist进行模糊搜索
export async function searchTodos(query: string): Promise<TodoItem[]> {
  return await db.todoList
    .where("title")
    .startsWithIgnoreCase(query)
    .or("description")
    .startsWithIgnoreCase(query)
    .toArray();
}
