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
          <Title style={styles.title}>Đăng nhập</Title>
          <Text style={styles.text}>Vui lòng nhập thông tin đăng nhập</Text>
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
            {/* <p style={styles.forgotPassword}>
              <Link to={"register"}>Quên mật khẩu?</Link>
            </p> */}
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Chưa có tài khoản?</Text>{" "}
              <Link to={"/register"}>Đăng ký</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
