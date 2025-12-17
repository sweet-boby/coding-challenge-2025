import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Space,
  Select,
  DatePicker,
  InputNumber,
  Form, // 导入 Form 组件
} from "antd";
import { useState } from "react";
import { TodoItem } from "../types";
import moment from "moment";

export default (props: { addTodo: (newTodo: TodoItem) => void }) => {
  const [form] = Form.useForm(); // 使用 Form 的 useForm 钩子

  const onFinish = (values: any) => {
    if (values.title) {
      props.addTodo({
        id: Date.now(),
        title: values.title,
        description: values.description,
        completed: false,
        tags: values.tags || [],
        priority: values.priority,
        deadline: values.deadline ? values.deadline.toDate() : undefined,
      });
      form.resetFields(); // 提交后清空表单
    }
  };

  return (
    <>
      <Card title="添加一个待办" className="w-full max-w-md mb-6">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            tags: [],
            priority: undefined,
            deadline: null,
          }}
        >
          <Form.Item
            name="title"
            label="待办标题"
            rules={[{ required: true, message: "请输入待办标题!" }]}
          >
            <Input placeholder="待办标题" />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea
              placeholder="描述（可选）"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item label="标签" name="tags">
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
            />
          </Form.Item>
          <Form.Item label="优先级" name="priority">
            <InputNumber
              min={1}
              max={5}
              placeholder="优先级 (1-5, 5最高)"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="截止日期" name="deadline">
            <DatePicker
              style={{ width: "100%" }}
              placeholder="截止日期（可选）"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              icon={<PlusOutlined />}
            >
              添加待办
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
