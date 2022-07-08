import React from "react";
import { Modal, Form, Input, notification } from "antd";
// import axios from "axios";

import { addCustomer } from "../../../api/clients";

const AddCustomerModal = ({ closeModal, visible, form }) => {
  const token = sessionStorage.getItem("accessToken");

  return (
    <Modal
      className="addCustomerModal"
      title="Dodaj nowego klienta"
      visible={visible}
      onOk={() =>
        form.validateFields().then(async (values) => {
          try {
            await addCustomer(values, token);
            closeModal();
            notification.success({
              message: "Klient został dodany pomyślnie.",
            });
            form.resetFields();
          } catch (error) {
            if (error) console.log(error);
          }
        })
      }
      onCancel={closeModal}
      okText="Dodaj klienta"
      cancelText="Anuluj"
      destroyOnClose
    >
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        layout="horizontal"
        name="add-organization"
      >
        <Form.Item
          name="companyName"
          rules={[{ required: true, message: "Wprowadź nazwę klienta" }]}
        >
          <Input placeholder="Nazwa klienta" />
        </Form.Item>
        <p>Kolor klienta:</p><Form.Item name="customerColor">
          <Input type="color" placeholder="Kolor klienta" />
        </Form.Item>
        <Form.Item name="firstName">
          <Input placeholder="Imię" />
        </Form.Item>
        <Form.Item name="lastName">
          <Input placeholder="Nazwisko" />
        </Form.Item>
        <Form.Item name="street">
          <Input placeholder="Ulica" />
        </Form.Item>
        <Form.Item name="localNumber">
          <Input placeholder="Numer lokalu" />
        </Form.Item>
        <Form.Item
          name="locationName"
          rules={[{ required: true, message: "Wprowadź nazwę lokalizacji" }]}
        >
          <Input placeholder="Miasto" />
        </Form.Item>
        <Form.Item name="postCode">
          <Input placeholder="Kod pocztowy" />
        </Form.Item>
        <p>Ustawienie koloru lokalizacji możliwe jest wyłącznie przy dodawaniu miejscowości po raz pierwszy do bazy danych.</p><hr style={{backgroundColor: "grey", fontColor: "grey"}}/>
        <p>Kolor lokalizacji:</p><Form.Item name="locationColor">
          <Input type="color" placeholder="Kolor lokalizacji" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
