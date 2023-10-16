"use client";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";

interface FoodItem {
  name: string;
  price: number;
  quantity: number;
  inventory_id: number;
}

type DataIndex = keyof FoodItem;

const data: FoodItem[] = [
  {
    name: "Spaghetti Bolognese",
    price: 12.99,
    quantity: 30,
    inventory_id: 3,
  },
  {
    name: "Cheeseburger",
    price: 8.49,
    quantity: 40,
    inventory_id: 4,
  },
  {
    name: "Chicken Caesar Salad",
    price: 9.99,
    quantity: 20,
    inventory_id: 5,
  },
  {
    name: "Chocolate Cake",
    price: 6.99,
    quantity: 15,
    inventory_id: 6,
  },
  {
    name: "French Fries",
    price: 3.49,
    quantity: 50,
    inventory_id: 7,
  },
  {
    name: "Green Smoothie",
    price: 5.99,
    quantity: 35,
    inventory_id: 8,
  },
  {
    name: "Margarita Cocktail",
    price: 7.99,
    quantity: 10,
    inventory_id: 9,
  },
  {
    name: "Pepperoni Pizza",
    price: 14.99,
    quantity: 28,
    inventory_id: 10,
  },
  {
    name: "Chicken Tenders",
    price: 11.49,
    quantity: 22,
    inventory_id: 11,
  },
  {
    name: "Vegetable Sushi Roll",
    price: 10.99,
    quantity: 18,
    inventory_id: 12,
  },
];

export default function ProductsTableComp() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

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

  

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<FoodItem> => ({
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

  const columns: ColumnsType<FoodItem> = [
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

  return (
    <Table
      pagination={{
        position: ["topRight"],
        pageSize: 5,
        pageSizeOptions: ["5", "10", "20", "30", "40"],
        showSizeChanger: true,
      }}
      scroll={{ y: 240 }}
      columns={columns}
      dataSource={data}
    />
  );
}
