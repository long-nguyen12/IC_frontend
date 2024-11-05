import React, { useEffect, useState } from 'react';
import { API } from "../../constants/API";
import request from "../../service/request";
import './History.css';
import Optionfill from "./OptionFill";
import { List } from 'antd';



// const data = [
//  {
//   name:"Admin ",
//   action:"Thêm mới File ",
//   time:"03/11/2024"
//  }
// ];  


export default function HistoryScreen() {
  const [datahistory, setDatahistory] = useState();



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
    
   }, []);
 






  return (
    <div className="slogs-content">
      <div className="slogs-content-header slogs-content-item">
        <Optionfill title={'Người thực hiện'}  icon = {true} />
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
          <List.Item className='custom-list-item'>
            <div className='container-item'>{item.Email}</div>
            <div className='container-item'>{item.action}</div>
            <div className='container-item'>{item.createdAt}</div>
          </List.Item>
        )}
        split={true} // Hiển thị các đường phân cách giữa các item
      />
      </div>

    </div>
  );
}
