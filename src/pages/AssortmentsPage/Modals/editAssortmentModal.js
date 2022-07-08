import React, { useState, useEffect } from "react";
import { Modal, Form, Input, notification, Select } from "antd";

import { getCategory } from "../../../api/category";
import { editAssortments } from "../../../api/assortments";

const EditAssortmentModal = ({
  closeModal,
  visible,
  form,
  customerId,
  selectedAssortment,
}) => {
  form.setFieldsValue({
    newAssortmentName: selectedAssortment.assortmentName,
    newWidth: selectedAssortment.width,
    newHeight: selectedAssortment.height,
    newWeigth: selectedAssortment.weigth,
  });

  const { Option } = Select;
  const [category, setCategory] = useState([]);
  const [newCategoryId, setNewCategoryId] = useState();

  const getAllCategory = async () => {
    const response = await getCategory();
    setCategory(response);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Modal
      className="editAssortmentModal"
      title="Edytuj asortyment"
      visible={visible}
      onOk={() =>
        form.validateFields().then(async (values) => {
          try {
            await editAssortments(
              customerId,
              selectedAssortment.id,
              newCategoryId,
              values
            );
            closeModal();
            notification.success({
              message: "Asortyment został zaktualizowany pomyślnie.",
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
      okText="Aktualizuj asortyment"
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
          name="newAssortmentName"
          rules={[{ required: true, message: "Wprowadź nazwę klienta" }]}
        >
          <Input placeholder="Nazwa asortymentu" />
        </Form.Item>
        <Form.Item name="newWidth">
          <Input type="number" placeholder="Szerokość" />
        </Form.Item>
        <Form.Item name="newHeight">
          <Input type="number" placeholder="Długość" />
        </Form.Item>
        <Form.Item name="newWeigth">
          <Input type="number" placeholder="Waga" />
        </Form.Item>
        <Form.Item>
          <Select
            onChange={(value) => {
              setNewCategoryId(value);
            }}
            defaultValue={selectedAssortment.assortmentCategory.categoryName}
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

export default EditAssortmentModal;
