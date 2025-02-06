import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload, Avatar, Space } from 'antd';
import React, { useState } from "react";
import { API } from "../../constants/API";
import request from "../../service/request";
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import { Col, Divider, Row, Button } from 'antd';


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


const InfoScreen = () => {
  const UserInfo = useSelector((state) => state.User)
  console.log("UserInfo", UserInfo)
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [avartar, setAvatar] = useState("")
  const [newName, setName] = useState("")
  const [newPhone, setPhone] = useState("")

  const handleChange = (info) => {
    console.log("info", info)
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log('File sau khi tải lên:', info.file.response.file)

      setAvatar(info.file.response.file)
      setLoading(false);
      setImageUrl(info.file.response.file);

    }
  };



  console.log("avartar", avartar)
  const uploadProps = {
    name: 'image',
    action: API.API_AI + API.UPLOAD_IMAGE,
    onChange: handleChange,
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ có thể tải ảnh lên!');
      }
      console.log("file", file)
      return isImage;
    }
  };


  const UpdateProfile = (e) => {
    // e.preventDefault();
    const data = {
      // id: UserInfo._id,
      // username: newName,
      // phone: newPhone,
      avartar: avartar
    };

    console.log("data", data)
    request.put(API.USERS_UPDATE, data)
      .then(response => {
        console.log("data")
        // Store.dispatch(loginUser(response.data))
      })
      .catch(error => {
        console.error('Lỗi khi gửi yêu cầu PUT:', error);
      });
  }

  return (
    <div className="container-fluid">
      {UserInfo ?
        <div >
          {
            UserInfo.role === 'pending' ?
              <div className='row'>
                <div className='mess'> vinghiemxk@gmail.com</div>
              </div> : <></>
          }
          <div className="row">
            <div className='bg-gray'>
              <Row>
                <Col span={8}>
                  <div className="description-profile">
                    <div className="title">Ảnh hồ sơ</div>
                    <div className="description">Thay đổi thông tin tài khoản</div>
                  </div>
                </Col>
                <Col span={8}>
                  {avartar ?
                    <img src={avartar} className="thumb-lg img-circle" alt="img" />
                    :
                    <Avatar size={120}>U</Avatar>
                  }
                </Col>
                <Col span={8}>
                  <Upload {...uploadProps} >
                    <Button style={{
                      padding: '0 25px',
                      height: '38px',
                      backgroundColor: '#4CAF50',
                      borderColor: '#4CAF50',
                      color: '#fff'
                    }} >Thay đổi ảnh</Button>
                  </Upload>
                </Col>
              </Row>
            </div>
            <div className='bg-gray'>
              <Row gutter="40">
                <Col span={8}>
                  <div className="description-profile">
                    <div className="title">Thông tin cá nhân</div>
                    <div className="description">Cập nhật thông tin tài khoản</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="description-profile">
                    <label>Họ tên</label>
                    <div className="col-md-12  p-0">
                      <Input placeholder={UserInfo?.name} onChange={(e) => setName(e.target.value)} defaultValue={UserInfo?.username} />
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="description-profile">
                    <label>Email</label>
                    <div className="col-md-12 p-0">
                      <Input disabled placeholder={UserInfo?.email} defaultValue={UserInfo?.username} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Button style={{
                padding: '0 25px',
                height: '38px',
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
                color: '#fff'
              }} onClick={UpdateProfile}>Cập Nhật</Button>
            </div>
          </div>
        </div>
        :
        <LoadingOutlined />
      }
    </div>

  )

}
export default InfoScreen;