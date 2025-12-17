import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Typography, Tag, Space, Select } from "antd"; // 导入 Tag 和 Space
import { TodoItem } from "../types";
const { Text } = Typography;
export default (props: {
  todos: TodoItem[];
  filteredTodos: TodoItem[];
  allTags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}) => {
  return (
    <>
      <Card title="我的待办" className="w-full max-w-md">
        <Space className="mb-4">
          <Text>按标签过滤：</Text>
          <Select
            placeholder="选择标签"
            value={props.selectedTag}
            onChange={(value) => props.setSelectedTag(value || null)}
            options={[
              {
                label: "全部任务",
                value: null,
              },
              ...props.allTags.map((tag) => ({
                label: tag,
                value: tag,
              })),
            ]}
            style={{ width: 180 }}
          />
        </Space>
        {props.filteredTodos.length === 0 ? (
          <Text type="secondary">还没有待办事项。在上面添加一个!</Text>
        ) : (
          <ul className="list-none p-0 m-0">
            {props.filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex items-center">
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => props.toggleComplete(todo.id)}
                    className="mr-5"
                  />
                  <div className="pl-3">
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
                    {todo.tags && todo.tags.length > 0 && (
                      <Space size={[0, 8]} wrap className="mt-2">
                        {todo.tags.map((tag, index) => (
                          <Tag key={index} color="blue">
                            {tag}
                          </Tag>
                        ))}
                      </Space>
                    )}
                  </div>
                </div>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => props.deleteTodo(todo.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
};
