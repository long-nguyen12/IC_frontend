import React, { useEffect, useState } from "react";
import { App, Checkbox, Row, Table, Button } from "antd";
// import { render } from "@testing-library/react";
import request from "../../service/request";
import { API } from "../../constants/API";

const UsersScreen = () => {
  const CheckboxGroup = Checkbox.Group;
  const [data, setData] = useState([]);
  const { message } = App.useApp();
  // const [dataUpdate, setDataUpdate] = useState([]);
  const plainOptions = ["upload", "edit", "admin"];
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
      render: (text) => <p>{text}</p>,
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
      <div style={{ marginBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{
            height: "38px",
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
            color: "#fff",
          }}
        >
          Thêm tài khoản
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey={"_id"} />
    </div>
  );
};
export default UsersScreen;
