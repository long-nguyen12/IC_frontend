import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox } from "antd";

const roleOptions = ["admin", "edit", "upload"]; 

const UserEdit = ({ visible, user, onUpdate, onCancel }) => {
  const [form] = Form.useForm(); 

  useEffect(() => {
    if (visible && user) { 
      form.setFieldsValue({
        userName: user.userName || "",
        email: user.email || "",
        password: "",
        roles: Array.isArray(user.roles) ? user.roles : user.roles ? [user.roles] : [], 
      });
    }
  }, [visible, user]);

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
    <Modal 
      title="Chỉnh sửa tài khoản" 
      open={visible} 
      onCancel={onCancel} 
      onOk={handleOk}
      destroyOnClose // Giúp form reset khi modal đóng
    >
      <Form form={form} layout="vertical">
        <Form.Item name="userName" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Vui lòng nhập Email!" }]}>
          <Input />
        </Form.Item>
      
        <Form.Item name="roles" label="Quyền">
          <Checkbox.Group options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal> 
  );
};

export default UserEdit;
