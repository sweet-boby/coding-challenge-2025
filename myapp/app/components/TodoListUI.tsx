import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Typography } from "antd";
const { Text } = Typography;
export default (props: {
  todos: any[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}) => {
  return (
    <>
      <Card title="我的待办" className="w-full max-w-md">
        {props.todos.length === 0 ? (
          <Text type="secondary">还没有待办事项。在上面添加一个!</Text>
        ) : (
          <ul className="list-none p-0 m-0">
            {props.todos.map((todo) => (
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
