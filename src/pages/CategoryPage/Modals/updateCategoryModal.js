import React from "react";
import { Modal, Form, Input, notification } from "antd";
import { updateCategory } from "../../../api/category";

const UpdateCategoryModal = ({
  closeModal,
  visible,
  form,
  selectedCategory,
}) => {
  form.setFieldsValue({
    categoryName: selectedCategory.categoryName,
  });

  return (
    <Modal
      className="updateCategoryModal"
      title="Edytuj kategorię"
      visible={visible}
      onOk={() =>
        form.validateFields().then(async (values) => {
          try {
            await updateCategory(selectedCategory.id, values);

            closeModal();
            notification.success({
              message: "Kategoria została zaktualizowana pomyślnie.",
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
      okText="Aktualizuj kategorię"
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

export default UpdateCategoryModal;
