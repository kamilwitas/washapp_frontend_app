import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Tag,
  Tooltip,
  Button,
  Form,
  Spin,
  notification,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { getLocations, removeLocation } from "../../api/locations";
import AddLocationModal from "./Modals/addLocationModal";
import EditLocationModal from "./Modals/editLocationModal";

import "../../styles/App.less";
import "antd/dist/antd.less";

const LocationsPage = () => {
  const { Content, Footer } = Layout;

  const [newLocationModal] = Form.useForm();
  const [editLocationModal] = Form.useForm();

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();

  const [isNewLocationModalVisible, setIsNewLocationModalVisible] =
    useState(false);

  const [isEditLocationModalVisible, setIsEditLocationModalVisible] =
    useState(false);

  const getAllLocations = async () => {
    const response = await getLocations();
    setLocations(response);
  };

  // const openNewLocationModal = () => {
  //   setIsNewLocationModalVisible(true);
  // };
  const closeNewLocationModal = async () => {
    setIsNewLocationModalVisible(false);
    await getAllLocations();
  };

  const openEditLocationModal = () => {
    setIsEditLocationModalVisible(true);
  };
  const closeEditLocationModal = async () => {
    setIsEditLocationModalVisible(false);
    await getAllLocations();
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  const columns = [
    {
      title: "Miejscowość",
      dataIndex: "locationName",
      sorter: (a, b) => a.locationName.length - b.locationName.length,
      key: "Nazwa klienta",
      defaultSortOrder: ["descend"],
      fixed: "left",
    },
    {
      title: "Ulica",
      dataIndex: "postCode",
      defaultSortOrder: "descend",
      key: "Ulica",
    },
    {
      title: "Kolor lokalizacji",
      dataIndex: "color",
      key: "Kolor lokalizacji",
      render: (record, props) => (
        <span style={{ whiteSpace: "nowrap" }}>
          <Tag color={record} style={{  padding: "0.5rem", fontSize: "15px" }}>
            {props.locationName}
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
                  setSelectedLocation(record);
                  console.log(record);
                  openEditLocationModal();
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
                  try {
                    await removeLocation(record.id);
                  } catch (error) {
                    if (
                      error.response.data ===
                      "There are users assigned to selected location"
                    )
                      notification.error({
                        message:
                          "Do wybranej lokalizacji przypisani są klienci.",
                      });
                    else {
                      notification.error({
                        message: `${error.response.data}`,
                      });
                    }
                  }
                  getAllLocations();
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
        <h2 style={{ textAlign: "left" }}>Wszystkie lokalizacje</h2>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {/* <Button
            onClick={openNewLocationModal}
            style={{
              width: "100%",
              marginBottom: "1rem",
              height: "4rem",
              fontSize: "17px",
            }}
            type="dashed"
          >
            + Dodaj nową lokalizację
          </Button> */}
          {locations.length !== 0 ? (
            <Table
              columns={columns}
              dataSource={locations}
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
      <AddLocationModal
        closeModal={closeNewLocationModal}
        visible={isNewLocationModalVisible}
        form={newLocationModal}
      />
      {selectedLocation && (
        <EditLocationModal
          closeModal={closeEditLocationModal}
          visible={isEditLocationModalVisible}
          form={editLocationModal}
          selectedLocation={selectedLocation}
        />
      )}
    </>
  );
};

export default LocationsPage;
