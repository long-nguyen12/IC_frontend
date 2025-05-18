import React, { useState } from 'react';
import request from "../../service/request";
import { API } from '../../constants/API';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";


const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;


const ResetPassword = () => {
    const { token } = useToken();    
    const screens = useBreakpoint();
    const navigation = useNavigate();
    
    const handleSubmit = async (email) => {
        try {
        const res = await request.post(API.RESET_PASSWORD,  email );
        console.log(res.data); 
        
        navigation("/reset_password_success");   
        } catch (err) {
         console.log('Lỗi gửi yêu cầu');
        }
    };

const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100%" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>Đặt lại mật khẩu</Title>
          <Text style={styles.text}>Vui lòng nhập thông tin email để đặt lại mật khẩu</Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "text",
                required: true,
                message: "Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
        
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              block="true"
              type="primary"
              htmlType="submit"
              style={{
                height: "38px",
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                color: "#fff",
              }}
            >
              Xác nhận 
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

  

export default ResetPassword;