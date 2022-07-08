import React from "react";
import { Modal, Form, Input, notification } from "antd";

import { editCustomers } from "../../../api/clients";

const EditCustomerModal = ({ closeModal, visible, form, selectedCustomer }) => {
  form.setFieldsValue({
    companyName: selectedCustomer.companyName,
    customerColor: selectedCustomer.customerColor,
    firstName: selectedCustomer.firstName,
    lastName: selectedCustomer.lastName,
    street: selectedCustomer.street,
    localNumber: selectedCustomer.localNumber,
    locationName: selectedCustomer.location.locationName,
    postCode: selectedCustomer.location.postCode,
    locationColor: selectedCustomer.location.color,
  });
  return (
    <Modal
      className="editCustomerModal"
      title="Edytuj klienta"
      visible={visible}
      onOk={() =>
        form.validateFields().then(async (values) => {
          try {
            await editCustomers(selectedCustomer.id, values);
            closeModal();
            notification.success({
              message: "Klient został dodany pomyślnie.",
            });
            form.resetFields();
          } catch (error) {
            notification.error({
              message: `${error.response.data}`,
            });
          }
        })
      }
      onCancel={closeModal}
      okText="Aktualizuj klienta"
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
        <p>Kolor klienta:</p>
        <Form.Item name="customerColor">
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
        <p>
          Ustawienie koloru lokalizacji możliwe jest wyłącznie przy dodawaniu
          miejscowości po raz pierwszy do bazy danych.
        </p>
        <hr style={{ backgroundColor: "grey", fontColor: "grey" }} />
        <p>Kolor lokalizacji:</p>
        <Form.Item name="locationColor">
          <Input type="color" placeholder="Kolor lokalizacji" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCustomerModal;
