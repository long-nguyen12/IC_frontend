import React from "react";

import { App, Button, Form, Grid, Input, theme, Typography } from "antd";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import request from "../../service/request";
import { API } from "../../constants/API";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function SignUpPage() {
  const { token } = useToken();
  const { message } = App.useApp();
  const screens = useBreakpoint();
  // --------------- useEffect -------------------
  // ---------------------------------------------
  // --------------- Action ------------------------
  const onFinish = (values) => {
    const form = new FormData();
    form.append("userName", values.userName);
    form.append("password", values.password);
    form.append("email", values.email);
    request
      .post(API.REGISTER, form)
      .then((res) => {
        if (res.status === 201) {
          message.success("Tạo tài khoản thành công");
          navigator("login");
        }
      })
      .catch((err) => {
        message.error(err?.response?.data?.message);
        // console.log(err);
      });
    console.log("Received values of form: ", values);
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.paddingXL}px ${token.padding}px`,
      width: "380px",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100%" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    signup: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
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
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.125" width="32" height="32" rx="6.4" fill="#1890FF" />
            <path
              d="M19.3251 4.80005H27.3251V12.8H19.3251V4.80005Z"
              fill="white"
            />
            <path d="M12.925 12.8H19.3251V19.2H12.925V12.8Z" fill="white" />
            <path d="M4.92505 17.6H14.525V27.2001H4.92505V17.6Z" fill="white" />
          </svg>

          <Title style={styles.title}>Đăng ký</Title>
          <Text style={styles.text}>Tạo tài khoản để bắt đầu !</Text>
        </div>
        <Form
          name="normal_signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên tài khoản!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên tài khoản" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Vui lòng nhập Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block type="primary" htmlType="submit">
              Đăng ký
            </Button>
            <div style={styles.signup}>
              <Text style={styles.text}>Đã có tài khoản?</Text>{" "}
              <Link to="/login">Đăng nhập</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
