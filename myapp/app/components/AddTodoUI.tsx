import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Select } from "antd"; // 导入 Select
import { useState } from "react";
import { TodoItem } from "../types";

export default (props: { addTodo: (newTodo: TodoItem) => void }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [newTodoTags, setNewTodoTags] = useState<string[]>([]); // 添加 tags 状态
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
          <Button
            type="primary"
            onClick={() => {
              if (newTodoTitle) {
                props.addTodo({
                  id: Date.now(),
                  title: newTodoTitle,
                  description: newTodoDescription,
                  completed: false,
                  tags: newTodoTags, // 添加 tags 属性
                });
                setNewTodoTitle("");
                setNewTodoDescription("");
                setNewTodoTags([]); // 清空 tags 状态
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
