import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloudUploadOutlined,
  CloudServerOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { API } from "../constants/API";
import { useAuth } from "../hooks/auth";
import request from "../service/request";
import { useDispatch } from 'react-redux';
import {UserUpdate} from './LoginScreen/UserSlice';



const { Header, Content, Footer, Sider } = Layout;

const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  let params = useParams();
  let location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [subMenu, setSubMenu] = useState([]);
  const [name, setName] = useState([]);
  const parentLabels = new Map();


  const menuItem = [
    {
      key: "UPLOAD",
      label: "Upload tập tin",
      icon: <CloudUploadOutlined />,
      onClick: () => navigate("/"),
    },
    {
      key: "IMAGE",
      label: "Danh sách ảnh",
      icon: <CloudServerOutlined />,
      onClick: () => navigate("/foders/all",{state:{fodername:`all`}}),
      
    },
    {
      key: "USER",
      label: "Quản lý người dùng",
      icon: <TeamOutlined />,
      onClick: () => navigate("/user"),
    },
    {
      key: "INFO",
      label: "Thông tin tài khoản",
      icon: <TeamOutlined />,
      onClick: () => navigate("/info"),
    },
    {
      key: "History",
      label: "Lịch sử cập nhật",
      icon:<ClockCircleOutlined />,
      onClick: () => navigate("/history"),
    }
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      label: <p onClick={() => handleLogOut()}>Đăng xuất</p>,
    },
  ];
  // --------------- useEffect ------------------
  useEffect(() => {
    // handleGetFolder();
    handleGetInfo();
    document.body.style.margin = 0;
  }, []);
  // --------------------------------------------
  // --------------- Action ---------------------
  const handleGetFolder = async () => {
    await request
      .get(API.FOLDER)
      .then((res) => {
        if (res?.data) {
          console.log("---------------------",res.data)
          setSubMenu(res.data?.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleGetInfo = async () => {
    await request
      .get(API.USERS_INFO)
      .then((res) => {
        if (res.data.user) {
          dispatch(UserUpdate(res.data))
          setName(res.data.user.userName);
        }
      })
      .catch((err) => navigate("/login"));
  };

  const handleLogOut = async () => {
    await logout();
    navigate("/login");
  };
  // --------------------------------------------
  return (
    <Layout style={{ minHeight: "100vh", overflowX: 'hidden' }}>
      <Sider
        breakpoint="lg"
        style={{ minHeight: "100%", maxHeight: "100%" }}
        collapsedWidth="0"
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {/* <Button
          type="primary"
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
        <div style={{ height: 64 }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={
            Object.keys(params).length > 0
              ? [params[Object.keys(params)[0]]]
              : [
                  location.pathname.replace("/", "").toUpperCase()
                    ? location.pathname.replace("/", "").toUpperCase()
                    : "UPLOAD",
                ]
          }
          defaultOpenKeys={Object.keys(params).length > 0 ? ["IMAGE"] : null}
          items={menuItem}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Space align="end" style={{ position: "absolute", right: "10%" }}>
            <Avatar>U</Avatar>
            <Dropdown placement="bottomLeft" arrow menu={{ items }}>
              <Button size="tiny" type="text">
                {name} 
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px",
            height: "100%"
            // width: '100%',
            // borderWidth: 1,
            // borderStyle: 'dashed'
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 400,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};
export default Root;
