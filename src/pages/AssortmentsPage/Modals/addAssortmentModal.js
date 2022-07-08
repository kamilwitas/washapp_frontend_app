import React, { useState, useEffect } from "react";
import { Modal, Form, Input, notification, Select } from "antd";

import { getCategory } from "../../../api/category";
import { addAssortments } from "../../../api/assortments";

const AddAssortmentModal = ({ closeModal, visible, form, customerId }) => {
  const { Option } = Select;
  const [category, setCategory] = useState([]);
  const [assortmentCategoryId, setAssortmentCategoryId] = useState();

  const getAllCategory = async () => {
    const response = await getCategory();
    setCategory(response);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Modal
      className="addAssortmentModal"
      title="Dodaj nowy asortyment"
      visible={visible}
      onOk={() =>
        form.validateFields().then(async (values) => {
          try {
            await addAssortments(values, customerId, assortmentCategoryId);
            closeModal();
            notification.success({
              message: "Asortyment został dodany pomyślnie.",
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
      okText="Dodaj asortyment"
      cancelText="Anuluj"
      destroyOnClose
    >
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        layout="horizontal"
        name="add-assortment"
      >
        <Form.Item
          name="assortmentName"
          rules={[{ required: true, message: "Wprowadź nazwę klienta" }]}
        >
          <Input placeholder="Nazwa asortymentu" />
        </Form.Item>
        <Form.Item name="width">
          <Input type="number" placeholder="Szerokość" />
        </Form.Item>
        <Form.Item name="height">
          <Input type="number" placeholder="Długość" />
        </Form.Item>
        <Form.Item name="weigth">
          <Input type="number" placeholder="Waga" />
        </Form.Item>
        <Form.Item>
          <Select
            onChange={(value) => {
              setAssortmentCategoryId(value);
            }}
            defaultValue="Proszę wybrać kategorię"
            style={{ fontSize: "17px" }}
          >
            {category.map((category) => (
              <Option
                key={category.id}
                value={category.id}
                style={{ fontSize: "17px" }}
              >{`${category.categoryName}`}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAssortmentModal;
