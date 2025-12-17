import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space } from "antd";
import { useState } from "react";
import { TodoItem } from "../types";

export default (props: { addTodo: (newTodo: TodoItem) => void }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
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
          <Button
            type="primary"
            onClick={() => {
              if (newTodoTitle) {
                props.addTodo({
                  id: Date.now(),
                  title: newTodoTitle,
                  description: newTodoDescription,
                  completed: false,
                });
                setNewTodoTitle("");
                setNewTodoDescription("");
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
