import React, { useState, useEffect } from "react";
import { Layout, Table, Tooltip, Button, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { getCategory, removeCategory } from "../../api/category";
import AddCategoryModal from "./Modals/addCategoryModal";
import UpdateCategoryModal from "./Modals/updateCategoryModal";

import "../../styles/App.less";
import "antd/dist/antd.less";

const CategoryPage = () => {
  const { Content, Footer } = Layout;
  const [newCategoryModal] = Form.useForm();
  const [updateCategoryModal] = Form.useForm();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] =
    useState(false);

  const [isUpdateCategoryModalVisible, setIsUpdateCategoryModalVisible] =
    useState(false);

  const columns = [
    {
      title: "Nazwa kategori",
      dataIndex: "categoryName",
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      key: "Nazwa kategori",
      defaultSortOrder: ["descend"],
    },
    {
      title: "Opcje",
      key: "Opcje",
      width: 50,
      render(record) {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Tooltip title="Edytuj kategorię">
              <Button
                onClick={async () => {
                  setSelectedCategory(record);
                  openUpdateCategoryModal();
                }}
                type="text"
              >
                <EditOutlined
                  className="actionIcon"
                  style={{ color: "black", fontSize: "22px" }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="Usuń kategorię">
              <Button
                onClick={async () => {
                  await removeCategory(record.id);
                  getAllCategory();
                }}
                type="text"
              >
                <DeleteOutlined
                  className="actionIcon"
                  style={{ color: "red", fontSize: "22px" }}
                />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const getAllCategory = async () => {
    const response = await getCategory();
    setCategory(response);
  };

  const openNewCategoryModal = () => {
    setIsNewCategoryModalVisible(true);
  };

  const closeNewCategoryModal = async () => {
    setIsNewCategoryModalVisible(false);
    await getAllCategory();
  };

  const openUpdateCategoryModal = () => {
    setIsUpdateCategoryModalVisible(true);
  };

  const closeUpdateCategoryModal = async () => {
    setIsUpdateCategoryModalVisible(false);
    await getAllCategory();
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <h2 style={{ textAlign: "left" }}>Wszystkie kategorie</h2>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Button
            onClick={openNewCategoryModal}
            style={{ width: "100%", marginBottom: "1rem", height: "4rem", fontSize: "17px" }}
            type="dashed"
          >
            + Dodaj kategorię asortymentów
          </Button>
          <Table
            columns={columns}
            dataSource={category}
            rowKey={(record) => record.id}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        AQUA LUX ©2022 Created by DevT
      </Footer>
      <AddCategoryModal
        closeModal={closeNewCategoryModal}
        visible={isNewCategoryModalVisible}
        form={newCategoryModal}
      />
      {selectedCategory && (
        <UpdateCategoryModal
          selectedCategory={selectedCategory}
          closeModal={closeUpdateCategoryModal}
          visible={isUpdateCategoryModalVisible}
          form={updateCategoryModal}
        />
      )}
    </>
  );
};

export default CategoryPage;
