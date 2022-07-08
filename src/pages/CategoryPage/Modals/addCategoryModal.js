import React from "react";
import { Modal, Form, Input, notification } from "antd";
// import axios from "axios";

import { addCategory } from "../../../api/category";

const AddCategoryModal = ({ closeModal, visible, form }) => {
  return (
    <Modal
      className="addCustomerModal"
      title="Dodaj nową kategorię"
      visible={visible}
      onOk={() =>
        form.validateFields().then(async (values) => {
          try {
            await addCategory(values);
            closeModal();
            notification.success({
              message: "Kategoria została utworzona pomyślnie.",
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
      okText="Dodaj kategorię"
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
          name="categoryName"
          rules={[{ required: true, message: "Wprowadź nazwę kategori" }]}
        >
          <Input placeholder="Nazwa kategori" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
