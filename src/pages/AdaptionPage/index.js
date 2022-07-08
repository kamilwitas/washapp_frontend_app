import React, { useState, useEffect, useContext } from "react";
import {
  Layout,
  Button,
  Steps,
  Select,
  Input,
  message,
  Form,
  Spin,
} from "antd";

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
  DotChartOutlined,
} from "@ant-design/icons";

import "../../styles/App.less";
import "antd/dist/antd.less";

import { getCustomerLocations, getLocations } from "../../api/locations";
import { OrderContext } from "../../context/orderContext";
import { getAssortments } from "../../api/assortments";

const AdaptionPage = () => {
  const { Content, Footer } = Layout;
  const { activeLocation, activeCustomer, setActiveCustomer, setActiveLocation } = useContext(OrderContext);

  const steps = [
    {
      title: "Wybierz miejscowość",
      content: <ChooseCity />,
    },
    {
      title: "Wybierz hotel",
      content: <ChooseHotel />,
    },
    {
      title: "Dodaj asortyment",
      content: <ChooseAssortment />,
    },
    {
      title: "Podsumowanie",
      content: "Podsumowanie",
    },
  ];

  useEffect(() => {
    activeLocation && next();
    // eslint-disable-next-line
  },[activeCustomer, activeLocation])

  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };


console.log(activeCustomer, activeLocation)
  return (
    <Layout className="site-layout">
      <Content style={{ margin: "0 16px" }}>
        <div
          className="site-layout-background"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: 360,
            gap: "1rem",
            padding: "5rem",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Przyjęcie prania</h2>
          <Steps current={current} style={{ paddingBottom: "2rem" }}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content" style={{ justifyContent: "center" }}>
            {steps[current].content}
          </div>
          <div
            className="steps-action"
            style={{ textAlign: "center", paddingTop: "2rem" }}
          >
            {current > 0 && (
              <Button
                type="primary"
                shape="round"
                size="large"
                className="stepButton"
                style={{
                  margin: "0 8px",
                  backgroundColor: "#2e2e2e",
                  border: "1px solid #2e2e2e",
                  height: "5rem",
                  fontSize: "24px",
                }}
                onClick={() => prev()}
              >
                <ArrowLeftOutlined /> Poprzedni krok
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                type="primary"
                shape="round"
                size="large"
                style={{
                  backgroundColor: "#171a19",
                  border: "1px solid #171a19",
                  height: "5rem",
                  fontSize: "24px",
                }}
                onClick={() => {
                  next();
                }}
              >
                Następny krok <ArrowRightOutlined />
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                shape="round"
                size="large"
                style={{
                  backgroundColor: "green",
                  border: "1px solid green",
                  height: "5rem",
                  fontSize: "24px",
                }}
                onClick={() => {
                  message.success("Przyjęto zamówienie prania!");
                  setCurrent(0);
                  setActiveLocation();
                  setActiveCustomer();
                  console.log("Wysłano i wyczyszczono pamięć Context!");
                }}
              >
                <CheckCircleOutlined /> Zakończ dodawanie
              </Button>
            )}
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        AQUA LUX ©2022 Created by DevT
      </Footer>
    </Layout>
  );
};

export default AdaptionPage;

const ChooseCity = () => {
  const [allLocations, setAllLocations] = useState([]);
  const { activeLocation, setActiveLocation } = useContext(OrderContext);


  const getAllLocations = async () => {
    const response = await getLocations();
    setAllLocations(response);
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  console.log(activeLocation);

  return allLocations.length !== 0 ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {allLocations.map((locations) => (
        <Button
          type="primary"
          shape="round"
          size="large"
          key={locations.id}
          value={locations.id}
          style={{
            backgroundColor: `${locations.color}`,
            border: `1px solid ${locations.color}`,
            height: "5rem",
            fontSize: "24px",
          }}
          onClick={() => {
            setActiveLocation(locations.id);
            console.log(locations.id);
          }}
        >
          {`${locations.locationName}`}
        </Button>
      ))}
    </div>
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
  );
};

const ChooseHotel = () => {
  const [allCustomers, setAllCustomers] = useState([]);

  const { activeLocation, activeCustomer, setActiveCustomer } = useContext(OrderContext);

  const getAllUsers = async () => {
    const response = await getCustomerLocations(activeLocation);
    setAllCustomers(response);
  };

  useEffect(() => {
    getAllUsers();
  },[]);

  useEffect(() => {
    console.log(activeCustomer)
  }, [activeCustomer]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {allCustomers.map((customers) => 
        ( <Button
            type="primary"
            shape="round"
            size="large"
            key={`${customers.companyName}`}
            style={{
              backgroundColor: `${customers.customerColor}`,
              border: `1px solid ${customers.customerColor}`,
              height: "5rem",
              fontSize: "24px",
            }}
            onClick={() => {
              setActiveCustomer(customers.id);
            }}
          >
            {`${customers.companyName}`}
          </Button>
        ))};
    </div>
  )};

const ChooseAssortment = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [customerAssortments, setCustomerAssortments] = useState();
  const [, setPcs] = useState(0);
  const { activeCustomer } = useContext(OrderContext);

  const handlePcs = (e) => {
    setPcs(e.target.value);
    console.log(parseFloat(e.target.value));
  };

  const getCustomerAssortments = async (id) => {
    const resp = await getAssortments(id);
    setCustomerAssortments(resp);
  };

  useEffect(() => {
    activeCustomer && getCustomerAssortments(activeCustomer);
  }, [activeCustomer]);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
console.log(customerAssortments);
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Form
                form={form}
                key={key}
                style={{ display: "flex", width: "100%" }}
                align="baseline"
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: 2,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <DotChartOutlined
                      style={{
                        alignItems: "center",
                        fontSize: "60px",
                        padding: "0 1rem 1rem 1.5rem",
                      }}
                    />
                    <Form.Item
                      {...restField}
                      name={[name, "assortment"]}
                      size="large"
                      rules={[
                        { required: true, message: "Missing assortment" },
                      ]}
                    >
                      <Select
                        defaultValue="Wybierz asortyment"
                        style={{ minWidth: "4rem", fontSize: "16px" }}
                      >
                       {customerAssortments.map((assortment) => (
                        <Option
                          key={assortment.id}
                          value={assortment.id}
                          style={{
                            fontSize: "16px",
                            textAlign: "center",
                            padding: "1rem",
                          }}
                        >{`${assortment.assortmentName}`}</Option>
                      ))}
            
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <Input
                        type="number"
                        placeholder="Ilość"
                        size="large"
                        style={{
                          width: "100%",
                          fontSize: "16px",
                          paddingLeft: "1rem",
                          marginLeft: "1rem",
                        }}
                        addonAfter="szt"
                        onChange={handlePcs}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "weight"]}
                      rules={[{ required: true, message: "Missing weight" }]}
                    >
                      <Input
                        placeholder="Waga"
                        value={name.value}
                        style={{
                          width: "100%",
                          fontSize: "24px",
                          paddingLeft: "1rem",
                          marginLeft: "1rem",
                        }}
                        addonAfter="kg"
                      />
                    </Form.Item>
                    <DeleteOutlined
                      style={{
                        alignItems: "center",
                        fontSize: "20px",
                        padding: "0 1rem 1.5rem 2rem",
                        color: "red",
                      }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </div>
              </Form>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                style={{ fontSize: "17px", height: "4rem" }}
              >
                Dodaj asortyment
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};