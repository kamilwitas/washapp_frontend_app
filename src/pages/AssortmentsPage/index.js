import React, { useState, useEffect } from "react";
import { Layout, Table, Tooltip, Button, Form, Select, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { getCustomers } from "../../api/clients";
import { getAssortments, deleteAssortments } from "../../api/assortments";

import AddAssortmentModal from "./Modals/addAssortmentModal";
import EditAssortmentModal from "./Modals/editAssortmentModal";

import "../../styles/App.less";
import "antd/dist/antd.less";

const AssortmentsPage = () => {
  const { Content, Footer } = Layout;
  const [newAssortmentModal] = Form.useForm();
  const [editAssortmentModal] = Form.useForm();

  const { Option } = Select;

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [customerAssortments, setCustomerAssortments] = useState();
  // const [assortmentId, setAssortmentId] = useState();
  const [selectedAssortment, setSelectedAssortment] = useState();

  const [isNewAssortmentModalVisible, setIsNewAssortmentModalVisible] =
    useState(false);

  const [isEditAssortmentModalVisible, setIsEditAssortmentModalVisible] =
    useState(false);

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      getCustomerAssortments(selectedCustomer);
    }
  }, [selectedCustomer, isNewAssortmentModalVisible]);

  const getCustomerAssortments = async (id) => {
    const resp = await getAssortments(id);
    setCustomerAssortments(resp);
  };

  const getAllCustomers = async () => {
    const response = await getCustomers();
    setCustomers(response);
  };

  const openNewAssortmentModal = () => {
    setIsNewAssortmentModalVisible(true);
  };
  const closeNewAssortmentModal = async () => {
    setIsNewAssortmentModalVisible(false);
    await getAllCustomers();
  };

  const openEditAssortmentModal = () => {
    setIsEditAssortmentModalVisible(true);
  };
  const closeEditAssortmentModal = async () => {
    setIsEditAssortmentModalVisible(false);
    await getAllCustomers();
  };

  const columns = [
    {
      title: "Nazwa asortymentu",
      dataIndex: "assortmentName",
      sorter: (a, b) => a.assortmentName.length - b.assortmentName.length,
      key: "assortmentName",
      defaultSortOrder: ["descend"],
      fixed: "left",
    },
    {
      title: "Kategoria",
      dataIndex: ["assortmentCategory", "categoryName"],
      key: "width",
      sorter: (a, b) =>
        a.assortmentCategory.categoryName.length -
        b.assortmentCategory.categoryName.length,
    },
    {
      title: "Szerokość (cm)",
      dataIndex: "width",
      key: "width",
    },
    {
      title: "Długość (cm)",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Waga (kg)",
      dataIndex: "weigth",
      key: "weigth",
    },
    {
      title: "Opcje",
      key: "Opcje",
      width: 50,
      fixed: "right",
      render(record) {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Tooltip title="Edytuj asortyment">
              <Button
                onClick={async () => {
                  openEditAssortmentModal();
                  // setAssortmentId(record.id);
                  setSelectedAssortment(record);
                  console.log(record);
                }}
                type="text"
              >
                <EditOutlined
                  className="actionIcon"
                  style={{ color: "black", fontSize: "22px" }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="Usuń asortyment">
              <Button
                onClick={async () => {
                  await deleteAssortments(selectedCustomer, record.id);
                  getCustomerAssortments(selectedCustomer);
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
  // console.log(customerAssortments, selectedCustomer);
  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <h2 style={{ textAlign: "left" }}>Asortyment klienta</h2>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <h3 style={{textAlign: "center", padding: "1rem 0 2rem 0"}}>W celu utworzenia lub edycji asortymentu w pierwszej kolejności należy dokonać wyboru klienta którego tyczy się operacja.</h3>
          <Select
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "25px",
              color: "#225896",
            }}
            onChange={(value) => {
              setSelectedCustomer(value);
            }}
            defaultValue="Proszę wybrać klienta"
          >
            {customers.map((customers) => (
              <Option
                key={customers.id}
                value={customers.id}
                style={{
                  fontSize: "25px",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >{`${customers.companyName}`}</Option>
            ))}
          </Select>
          {selectedCustomer && (
            <>
              <Button
                onClick={openNewAssortmentModal}
                type="dashed"
                style={{
                  width: "100%",
                  height: "4rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  fontSize: "17px",
                }}
              >
                + Dodaj asortyment
              </Button>
              {customerAssortments ? <Table
                columns={columns}
                dataSource={customerAssortments}
                rowKey={(record) => record.id}
                locale={{ emptyText: "Brak danych" }}
              /> : <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
                flexDirection: "column",
              }}
            >
              <Spin size="large" tip="Ładowanie danych" />
            </div>}
            </>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        AQUA LUX ©2022 Created by DevT
      </Footer>
      <AddAssortmentModal
        closeModal={closeNewAssortmentModal}
        visible={isNewAssortmentModalVisible}
        form={newAssortmentModal}
        customerId={selectedCustomer}
      />
      {selectedAssortment && (
        <EditAssortmentModal
          closeModal={closeEditAssortmentModal}
          visible={isEditAssortmentModalVisible}
          form={editAssortmentModal}
          customerId={selectedCustomer}
          selectedAssortment={selectedAssortment}
        />
      )}
    </>
  );
};

export default AssortmentsPage;
