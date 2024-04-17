import React from "react";

import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";

import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { API } from "../../constants/API";
import { setToken } from "../../service/token.service";
import { useAuth } from "../../hooks/auth";
import request from "../../service/request";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function LoginScreen() {
  const { token } = useToken();
  const { verifyToken } = useAuth();
  const screens = useBreakpoint();
  const navigation = useNavigate();
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", values.username);
    urlencoded.append("password", values.password);
    request
      .post(API.LOGIN, urlencoded, {
        headers: myHeaders,
      })
      .then(async (res) => {
        if (res.data) {
          await verifyToken(res.data.token);
          setToken(res.data.token);
          navigation("/");
        }
      })
      .catch((err) => console.log(err));
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
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            Welcome back to AntBlocks UI! Please enter your details below to
            sign in.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="username"
            rules={[
              {
                type: "text",
                required: true,
                message: "Vui lòng nhập tài khoản!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Tên tài khoản" />
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ tài khoản</Checkbox>
            </Form.Item>
            <p style={styles.forgotPassword}>
              <Link to={"register"}>Quên mật khẩu?</Link>
            </p>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Chưa có tài khoản?</Text>{" "}
              <Link to={"register"}>Đăng ký</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
