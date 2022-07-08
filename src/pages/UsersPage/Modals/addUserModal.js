import React from "react";
import { Modal, Form, Input, notification } from "antd";
// import axios from "axios";

import { addNewUser } from "../../../api/user";

const AddUserModal = ({ closeModal, visible, form }) => {
  return (
    <Modal
      className="addUserModal"
      title="Dodaj nowego użytkownika systemu"
      visible={visible}
      onOk={() =>
        form.validateFields().then(async (values) => {
          try {
            await addNewUser(values);
            closeModal();
            notification.success({
              message: "Użytkownik został dodany pomyślnie.",
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
      okText="Dodaj użytkownika"
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
        <Form.Item name="firstName">
          <Input placeholder="Imię" />
        </Form.Item>
        <Form.Item name="lastName">
          <Input placeholder="Nazwisko" />
        </Form.Item>
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Wprowadź adres email" }]}
        >
          <Input placeholder="Login" />
        </Form.Item>
        <Form.Item name="password">
          <Input type="password" placeholder="Hasło" />
        </Form.Item>
        <Form.Item name="passwordConfirmation">
          <Input type="password" placeholder="Potwierdź hasło" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
