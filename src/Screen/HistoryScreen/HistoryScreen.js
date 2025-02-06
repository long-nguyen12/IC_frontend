import React, { useEffect, useState } from 'react';
import { API } from "../../constants/API";
import request from "../../service/request";
import './History.css';
import Optionfill from "./OptionFill";
import { List } from 'antd';


export default function HistoryScreen() {
  const [datahistory, setDatahistory] = useState();
  const [listUser,setListuser] = useState([]);
  const getUsers = async () => {
    request
      .get(API.USERS)
      .then((res) => {
        if (res.data) {
          console.log("list user",res.data)
          setListuser(res.data);
        }
      })
      .catch((err) => console.log(err));
  };



  const handleGetData = async () => {
    request.get(API.API_LOG)
     .then((res) => {
       if (res) {
        console.log("res",res)
        setDatahistory( res.data.reverse())
       }
     })
     .catch((err) => console.log(err));
   };


   useEffect(() => {
    handleGetData();
    getUsers();
   }, []);
 


   function formatDateTimeToString(time) {
    console.log(typeof time)
    const date = new Date(time)
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    var yyyy = date.getFullYear();
    var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return (hours + ':' + minutes + " " + dd + "/" + MM + "/" + yyyy);
  }



  return (
    <div className="slogs-content">
      <div className="slogs-content-header slogs-content-item">
        <Optionfill title={'Người thực hiện'}  icon = {true} option = {listUser} />
        <Optionfill title={'Nội dung cập nhật'} icon = {true} />
        <Optionfill title={'Thời gian'} icon = {false} />
      </div>
      {/* footer list */}
      <div>
      <List
        className="custom-list"
        bordered
        dataSource={datahistory}
        renderItem={(item) => (
          <List.Item className='custom-list-item' 
            style={{padding: '0'}}
          >
            <div className='container-item'>{item.Email}</div>
            <div className='container-item'>{item.action}</div>
            <div className='container-item'>
            {formatDateTimeToString(item.createdAt)}
            </div>
          </List.Item>
        )}
        split={true} // Hiển thị các đường phân cách giữa các item
      />
      </div>

    </div>
  );
}
