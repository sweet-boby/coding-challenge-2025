export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  tags?: string[];
  // 优先级
  priority?: number;
  // 截止日期
  deadline?: Date;
}
