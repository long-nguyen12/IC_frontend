import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox } from "antd";

const roleOptions = ["admin", "edit", "upload"]; // Các quyền có thể chọn

const UserEditModal = ({ visible, user, onUpdate, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        roles: Array.isArray(user.roles) ? user.roles : [user.roles], // Chuyển đổi nếu cần
      });
    }
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onUpdate({ ...user, ...values });
      form.resetFields();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal title="Thêm tài khoản" open={visible} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item name="userName" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Vui lòng nhập Email!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Vui lòng nhập password!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="roles" label="Quyền">
          <Checkbox.Group options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
