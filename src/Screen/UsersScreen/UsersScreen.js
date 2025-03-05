import React, { useEffect, useState } from "react";
import { App, Checkbox, Row, Table, Button } from "antd";
// import { render } from "@testing-library/react";
import request from "../../service/request";
import { API } from "../../constants/API";
import UserEditModal from "./modalUpdate";

const UsersScreen = () => {
  const CheckboxGroup = Checkbox.Group;
  const [data, setData] = useState([]);
  const { message } = App.useApp();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [dataUpdate, setDataUpdate] = useState([]);
  const plainOptions = ["upload", "edit", "admin"];
  const [users, setUsers] = useState([]);

  console.log("data------------", data);

  const handleEdit = (user) => {
    // setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Cập nhật thông tin user
  const handleAddUser = (newUser) => {
    console.log("newUser", newUser);
    request
      .post(API.USERS_CREAT, newUser)
      .then((res) => {
        if (res.data) {
          console.log("res", res);
          setData([...data, res.data.user]);
        }
      })
      .catch((err) => console.log(err));

    const newUserWithId = { ...newUser, id: users.length + 1 };
    // setUsers([...users, newUserWithId]);
    message.success("Thêm người dùng thành công!");
    handleCancel();
  };

  const options = [
    {
      label: "Upload file",
      value: "upload",
      key: "upload",
    },
    {
      label: "Tạo mô tả",
      value: "edit",
      key: "edit",
    },
    {
      label: "Admin",
      value: "admin",
      key: "admin",
    },
  ];

  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (value, index) => (
        <Row key={index + value}>
          <CheckboxGroup
            key={index + "_key"}
            options={options}
            onChange={(value) => onChange(value, index)}
            defaultValue={value.includes("admin") ? plainOptions : value}
          />
        </Row>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (value, index) => (
        <Row key={index + value}>
          <Button type="primary">Chỉnh sửa</Button>
          <Button type="danger">Xoá</Button>
        </Row>
      ),
    },
  ];
  // ---------------- useEffect -----------------
  useEffect(() => {
    getUsers();
  }, []);
  // --------------------------------------------
  // ---------------- Action --------------------
  const onChange = (checkedValues, record) => {
    const oldRecord = data.find((item) => item._id === record._id);

    // Compare the old and new roles
    // const changedRoles = [];
    // for (const role of checkedValues) {
    //   // if (!oldRecord.role.includes(role)) {
    //   //   changedRoles.push(role);
    //   // }
    // }

    // Log the changes
    if (oldRecord.role.length !== checkedValues.length) {
      const formData = new FormData();
      formData.append("userId", record._id);
      formData.append("role", JSON.stringify(checkedValues));
      request
        .put(API.USERS, formData)
        .then((res) => {
          if (res.status === 200) {
            message.success("Chỉnh sửa quyền thành công");
          }
        })
        .catch((err) => console.log(err));
      console.log({ _id: record._id, role: checkedValues });
    }

    // const newData = data.map((item) => {
    //   if (item._id === record._id) {
    //     return {
    //       ...item,
    //       role: checkedValues,
    //     };
    //   }
    //   return item;
    // });

    // Update the table data
    // setDataUpdate(newData);
    getUsers();
  };

  const getUsers = async () => {
    request
      .get(API.USERS)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // ------------------------------------------
  return (
    <div>
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          style={{
            height: "38px",
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
            color: "#fff",
          }}
          onClick={() => handleEdit()}
        >
          Thêm tài khoản
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey={"_id"} />
      <UserEditModal
        visible={isModalOpen}
        user={selectedUser}
        onUpdate={handleAddUser}
        onCancel={handleCancel}
      />
    </div>
  );
};
export default UsersScreen;
