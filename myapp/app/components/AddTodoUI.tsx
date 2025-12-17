import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Space,
  Select,
  DatePicker,
  InputNumber,
} from "antd"; // 导入 DatePicker 和 InputNumber
import { useState } from "react";
import { TodoItem } from "../types";
import moment from "moment";

export default (props: { addTodo: (newTodo: TodoItem) => void }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [newTodoTags, setNewTodoTags] = useState<string[]>([]); // 添加 tags 状态
  const [newTodoPriority, setNewTodoPriority] = useState<number | undefined>(
    undefined
  ); // 添加 priority 状态
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | undefined>(
    undefined
  ); // 添加 deadline 状态

  return (
    <>
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
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="添加标签（可选）"
            options={[
              { value: "工作", label: "工作" },
              { value: "学习", label: "学习" },
              { value: "生活", label: "生活" },
              { value: "其他", label: "其他" },
            ]}
            onChange={(value) => setNewTodoTags(value)}
            value={newTodoTags}
          />
          <InputNumber
            min={1}
            max={5}
            placeholder="优先级 (1-5, 5最高)"
            style={{ width: "100%" }}
            value={newTodoPriority}
            onChange={(value) => setNewTodoPriority(value || undefined)}
          />
          <DatePicker
            style={{ width: "100%" }}
            placeholder="截止日期（可选）"
            onChange={(date, dateString) =>
              setNewTodoDeadline(date ? date.toDate() : undefined)
            }
            value={newTodoDeadline ? moment(newTodoDeadline) : null}
          />
          <Button
            type="primary"
            onClick={() => {
              if (newTodoTitle) {
                props.addTodo({
                  id: Date.now(),
                  title: newTodoTitle,
                  description: newTodoDescription,
                  completed: false,
                  tags: newTodoTags,
                  priority: newTodoPriority, // 添加 priority 属性
                  deadline: newTodoDeadline, // 添加 deadline 属性
                });
                setNewTodoTitle("");
                setNewTodoDescription("");
                setNewTodoTags([]);
                setNewTodoPriority(undefined); // 清空 priority 状态
                setNewTodoDeadline(undefined); // 清空 deadline 状态
              }
            }}
            block
            icon={<PlusOutlined />}
          >
            添加待办
          </Button>
        </Space>
      </Card>
    </>
  );
};
