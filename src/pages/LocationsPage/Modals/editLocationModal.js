import React from "react";
import { Modal, Form, Input, notification } from "antd";

import { updateLocations } from "../../../api/locations";

const EditLocationModal = ({ closeModal, visible, form, selectedLocation }) => {
  form.setFieldsValue({
    locationName: selectedLocation.locationName,
    postCode: selectedLocation.postCode,
    color: selectedLocation.color,
  });
  return (
    <Modal
      className="editLocationModal"
      title="Edytuj lokalizację"
      visible={visible}
      onOk={() =>
        form.validateFields().then(async (values) => {
          try {
            await updateLocations(selectedLocation.id, values);
            closeModal();
            notification.success({
              message: "Lokalizacja została zaktualizowana pomyślnie.",
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
      okText="Aktualizuj lokalizację"
      cancelText="Anuluj"
      destroyOnClose
    >
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        layout="horizontal"
        name="add-location"
      >
        <Form.Item name="locationName">
          <Input placeholder="Miejscowość" />
        </Form.Item>
        <Form.Item name="postCode">
          <Input placeholder="Kod pocztowy" />
        </Form.Item>
        <p>Kolor lokalizacji:</p>
        <Form.Item name="color">
          <Input type="color" placeholder="Kolor lokalizacji" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditLocationModal;
