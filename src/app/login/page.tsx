"use client";
import React from "react";
import { Form, Input, Button } from "antd";

export default function Page() {
  const onFinish = (values: string) => {
    console.log("Received values:", values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="bg-blue-500"
    >
      <Form
        className=" bg-white p-10 rounded-xl shadow-xl"
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="Username"
          rules={[
            {
              required: true,
              message: "Please enter your Username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="bg-blue-600" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
