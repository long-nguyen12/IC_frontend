import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox } from "antd";

const roleOptions = ["admin", "edit", "upload"]; 

const UserEditModal = ({ visible, onUpdate, onCancel }) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onUpdate({...values });
      form.resetFields();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal title="Thêm tài khoản" open={visible} onCancel={handleCancel} onOk={handleOk}>
     
      <Form form={form} layout="vertical">
        <Form.Item name="userName" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Vui lòng nhập Email!" }, { type: "email", message: 'Email không đúng định dạng' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Vui lòng nhập password!" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="roles" label="Quyền">
          <Checkbox.Group options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
