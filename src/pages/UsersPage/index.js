import React, { useState, useEffect } from "react";
import { Layout, Table, Tooltip, Button, Form, Popconfirm, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { getAllUser, removeUser } from "../../api/user";
import AddUserModal from "./Modals/addUserModal";

import "../../styles/App.less";
import "antd/dist/antd.less";

const UsersPage = () => {
  const { Content, Footer } = Layout;
  const [newUserModal] = Form.useForm();

  const [users, setUsers] = useState([]);
  const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);

  const getAllUsers = async () => {
    const response = await getAllUser();
    setUsers(response);
  };

  const columns = [
    {
      title: "Imię",
      dataIndex: "firstName",
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      key: "Nazwa użytkownika",
      fixed: "left",
    },
    {
      title: "Nazwisko",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      key: "Ulica",
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Opcje",
      key: "Opcje",
      width: 50,
      fixed: "right",
      render(record) {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Tooltip title="Usuń użytkownika">
              <Popconfirm
                title="Czy jeteś pewien usunięcia użytkownika ?"
                onConfirm={async () => {
                  await removeUser(record.id);
                  getAllUsers();
                }}
                okText="Usuń użytkownika"
                cancelText="Anuluj"
              >
                <Button type="text">
                  <DeleteOutlined
                    className="actionIcon"
                    style={{ color: "red", fontSize: "22px" }}
                  />
                </Button>
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const openNewUserModal = () => {
    setIsNewUserModalVisible(true);
  };
  const closeNewUserModal = async () => {
    setIsNewUserModalVisible(false);
    await getAllUsers();
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(users.items);
  console.log(users);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <h2 style={{ textAlign: "left" }}>Lista użytkowników</h2>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Button
            onClick={openNewUserModal}
            style={{
              width: "100%",
              marginBottom: "1rem",
              height: "4rem",
              fontSize: "17px",
            }}
            type="dashed"
          >
            + Dodaj nowego użytkownika
          </Button>
          {users ? (
            <Table
              columns={columns}
              dataSource={users}
              rowKey={(record) => record.id}
              size="large"
            />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
                flexDirection: "column",
              }}
            >
              <Spin size="large" tip="Ładowanie danych" />
            </div>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        AQUA LUX ©2022 Created by DevT
      </Footer>
      <AddUserModal
        closeModal={closeNewUserModal}
        visible={isNewUserModalVisible}
        form={newUserModal}
      />
    </>
  );
};

export default UsersPage;
