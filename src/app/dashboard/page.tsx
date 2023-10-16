"use client";
import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

import DashboardTableComp from "./dashboardTableComp";
import ProductsTableComp from "./products/productsTable";

const { Header, Sider, Content } = Layout;

export default function Page() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const routes = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Dashboard",
      component: DashboardTableComp,
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Products",
      component: ProductsTableComp,
    },
    // Add more routes as needed
  ];

  return (
    <Layout className="h-screen max-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onMouseEnter={() => setCollapsed(!collapsed)}
        onMouseLeave={() => setCollapsed(!collapsed)}
      >
        <div className="demo-logo-vertical my-10 h-5 w-full bg-black " />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {routes.map((route) => (
            <Menu.Item
              key={route.key}
              icon={route.icon}
              onClick={() => {
                setSelectedKey(route.key);
              }}
            >
              {route.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {routes
            .filter((route) => route.key === selectedKey)
            .map((selectedRoute) => (
              <selectedRoute.component />
            ))}
        </Content>
      </Layout>
    </Layout>
  );
}
