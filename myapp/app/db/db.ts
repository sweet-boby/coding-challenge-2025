// db.ts
import Dexie, { type Table } from "dexie";
import { TodoItem } from "../types";
// 定义数据库
class TodoListDatabase extends Dexie {
  todoList!: Table<TodoItem, number>; // 表名和主键类型

  constructor() {
    super("TodoListDatabase");
    this.version(1).stores({
      todoList: "++id, title, description, completed, tags, priority, deadline", // 定义表的模式
    });
  }
}

// 实例化数据库
const db = new TodoListDatabase();

// 导出数据库实例和类型
export { db };
