import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
const roleOptions = ["admin", "edit", "upload"]; 

const UserEdit = ({ visible, user, onUpdate, onCancel }) => {
  const [form] = Form.useForm(); 
 
  useEffect(() => {
    if (visible && user) { 
      console.log("user",user)
      console.log("user.roles",user.role)
      form.setFieldsValue({
        userName: user.userName || "",
        email: user.email || "",
        password: "",
        role: Array.isArray(user.role) ? user.role : user.role ? [user.role] : [], 
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
      title="User Details" 
      open={visible} 
      onCancel={onCancel} 
      onOk={handleOk}
      destroyOnClose // Giúp form reset khi modal đóng
    >
      <div className="flex items-center mb-4">
        <Avatar size={64} icon={<UserOutlined />} /> 
        <div className="magin-left-15px">
          <Space direction="vertical" size={4}>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>{user?.userName}</span>
            <span style={{ fontSize: "14px", color: "#888" }}>{user?.email}</span>
          </Space>
        </div>
      </div>
      <Form form={form} layout="vertical">
        <Form.Item name="userName" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Vui lòng nhập Email!" }]}>
          <Input />
        </Form.Item>
      
        <Form.Item name="role" label="Quyền">
          <Checkbox.Group options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal> 
  );
};

export default UserEdit;
