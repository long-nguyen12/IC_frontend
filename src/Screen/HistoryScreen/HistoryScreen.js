import React, { useEffect, useState } from "react";
import { API } from "../../constants/API";
import request from "../../service/request";
import "./History.css";
import Optionfill from "./OptionFill";
import { List, Table } from "antd";

export default function HistoryScreen() {
  const [datahistory, setDatahistory] = useState();
  const [listUser, setListuser] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const getUsers = async () => {
    setLoading(true);
    request
      .get(API.USERS)
      .then((res) => {
        if (res.data) {
          setListuser(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleGetData = async () => {
    setLoading(true);
    request
      .get(API.API_LOG)
      .then((res) => {
        if (res) {
          setDatahistory(res.data.reverse());
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleGetData();
    getUsers();
  }, []);

  function formatDateTimeToString(time) {
    console.log(typeof time);
    const date = new Date(time);
    var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
    var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    var yyyy = date.getFullYear();
    var hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return hours + ":" + minutes + " " + dd + "/" + MM + "/" + yyyy;
  }

  const columns = [
    {
      title: "Người thực hiện",
      dataIndex: "Email",
      key: "Email",
      render: (text) => <div className="container-item">{text}</div>,
    },
    {
      title: "Nội dung cập nhật",
      dataIndex: "action",
      key: "action",
      render: (text) => <div className="container-item">{text}</div>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <div className="container-item">{formatDateTimeToString(text)}</div>
      ),
    },
  ];

  return (
    <div className="slogs-content">
      <Table
        className="custom-list"
        bordered
        columns={columns}
        dataSource={datahistory}
        rowKey={(record, idx) => record._id || idx}
        pagination={true}
        loading={loading}
      />
    </div>
  );
}
