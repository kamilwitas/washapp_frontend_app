import React, { useState, useEffect } from "react";
import { Layout, Table, Tag, Tooltip, Button, Form, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { getCustomers, removeCustomer } from "../../api/clients";
import AddCustomerModal from "./Modals/addCustomerModal";
import EditCustomerModal from "./Modals/editCustomerModal";

import "../../styles/App.less";
import "antd/dist/antd.less";

const CustomerPage = () => {
  const { Content, Footer } = Layout;

  const [newCustomerModal] = Form.useForm();
  const [editCustomerModal] = Form.useForm();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();

  const [isNewCustomerModalVisible, setIsNewCustomerModalVisible] =
    useState(false);

  const [isEditCustomerModalVisible, setIsEditCustomerModalVisible] =
    useState(false);

  const getAllCustomers = async () => {
    const response = await getCustomers();
    setCustomers(response);
  };

  const openNewCustomerModal = () => {
    setIsNewCustomerModalVisible(true);
  };
  const closeNewCustomerModal = async () => {
    setIsNewCustomerModalVisible(false);
    await getAllCustomers();
  };

  const openEditCustomerModal = () => {
    setIsEditCustomerModalVisible(true);
  };
  const closeEditCustomerModal = async () => {
    setIsEditCustomerModalVisible(false);
    await getAllCustomers();
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const columns = [
    {
      title: "Nazwa klienta",
      dataIndex: "companyName",
      sorter: (a, b) => a.companyName.length - b.companyName.length,
      key: "Nazwa klienta",
      defaultSortOrder: ["descend"],
      fixed: "left",
    },
    {
      title: "Ulica",
      dataIndex: "street",
      defaultSortOrder: "descend",
      key: "Ulica",
    },
    {
      title: "Numer lokalu",
      dataIndex: "localNumber",
      key: "Numer lokalu",
    },
    {
      title: "Miejscowość",
      dataIndex: ["location", "locationName"],
      defaultSortOrder: "descend",
      key: "Miejscowość",
      render: (record, props) => (
        <span style={{ whiteSpace: "nowrap" }}>
          <Tag color={props.location.color} style={{  padding: "0.5rem", fontSize: "15px"}}>
            {record}
          </Tag>
        </span>
      ),
    },
    {
      title: "Kod pocztowy",
      dataIndex: ["location", "postCode"],
      key: "Kod pocztowy",
    },
    {
      title: "Kolor klienta",
      dataIndex: "customerColor",
      key: "Kolor klienta",
      render: (record, props) => (
        <span style={{ whiteSpace: "nowrap" }}>
          <Tag color={record} style={{ padding: "0.5rem", fontSize: "15px" }}>
            {props.companyName}
          </Tag>
        </span>
      ),
    },
    {
      title: "Opcje",
      key: "Opcje",
      width: 50,
      fixed: "right",
      render(record) {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Tooltip title="Edytuj klienta">
              <Button
                onClick={() => {
                  setSelectedCustomer(record);
                  console.log(record);
                  openEditCustomerModal();
                }}
                type="text"
              >
                <EditOutlined
                  className="actionIcon"
                  style={{ color: "black", fontSize: "22px" }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="Usuń klienta">
              <Button
                onClick={async () => {
                  await removeCustomer(record.id);
                  getAllCustomers();
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
  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <h2 style={{ textAlign: "left" }}>Nasi klienci</h2>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Button
            onClick={openNewCustomerModal}
            style={{
              width: "100%",
              marginBottom: "1rem",
              height: "4rem",
              fontSize: "17px",
            }}
            type="dashed"
          >
            + Dodaj klienta
          </Button>
          {customers.length !== 0 ? (
            <Table
              columns={columns}
              dataSource={customers}
              rowKey={(record) => record.id}
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
      <AddCustomerModal
        closeModal={closeNewCustomerModal}
        visible={isNewCustomerModalVisible}
        form={newCustomerModal}
      />
      {selectedCustomer && (
        <EditCustomerModal
          closeModal={closeEditCustomerModal}
          visible={isEditCustomerModalVisible}
          form={editCustomerModal}
          selectedCustomer={selectedCustomer}
        />
      )}
    </>
  );
};

export default CustomerPage;
