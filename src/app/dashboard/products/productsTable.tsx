"use client";
import React, { useState, useRef, useEffect } from "react";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, InputNumber } from "antd";
import { Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { Product } from "@/app/types";
import api, { fetchProducts } from "@/app/api";

// interface ProductItem {
//   name: string;
//   price: number;
//   quantity: number;
//   inventory_id: number;
// }

// type DataIndex = keyof ProductItem;

// const data: ProductItem[] = [
//   {
//     name: "Spaghetti Bolognese",
//     price: 12.99,
//     quantity: 30,
//     inventory_id: 3,
//   },
//   {
//     name: "Cheeseburger",
//     price: 8.49,
//     quantity: 40,
//     inventory_id: 4,
//   },
//   {
//     name: "Chicken Caesar Salad",
//     price: 9.99,
//     quantity: 20,
//     inventory_id: 5,
//   },
//   {
//     name: "Chocolate Cake",
//     price: 6.99,
//     quantity: 15,
//     inventory_id: 6,
//   },
//   {
//     name: "French Fries",
//     price: 3.49,
//     quantity: 50,
//     inventory_id: 7,
//   },
//   {
//     name: "Green Smoothie",
//     price: 5.99,
//     quantity: 35,
//     inventory_id: 8,
//   },
//   {
//     name: "Margarita Cocktail",
//     price: 7.99,
//     quantity: 10,
//     inventory_id: 9,
//   },
//   {
//     name: "Pepperoni Pizza",
//     price: 14.99,
//     quantity: 28,
//     inventory_id: 10,
//   },
//   {
//     name: "Chicken Tenders",
//     price: 11.49,
//     quantity: 22,
//     inventory_id: 11,
//   },
//   {
//     name: "Vegetable Sushi Roll",
//     price: 10.99,
//     quantity: 18,
//     inventory_id: 12,
//   },
// ];

type DataIndex = keyof Product;

export default function ProductsTableComp() {
  const [data, setData] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const searchInput = useRef<InputRef>(null);

  // Add form values and form functions
  const [form] = Form.useForm();

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleAddProductItem = () => {
    form
      .validateFields()
      .then((values) => {
        setModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Product> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Product> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
  ];

  useEffect(() => {
    fetchProducts().then((response) => {
      // console.log(response);
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <Button type="primary" className="bg-blue-500" onClick={showModal}>
        Add Product Item
      </Button>
      <Table
        pagination={{
          position: ["topLeft"],
          pageSize: 5,
          pageSizeOptions: ["5", "10", "20", "30", "40"],
          showSizeChanger: true,
        }}
        scroll={{ y: 240 }}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Add Product Item"
        visible={modalVisible}
        onOk={handleAddProductItem}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#1677ff" } }}
      >
        <Form form={form} name="addProductItemForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter the name of the Product item",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please enter the quantity" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="inventory_id"
            label="Inventory ID"
            rules={[
              { required: true, message: "Please enter the inventory ID" },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
