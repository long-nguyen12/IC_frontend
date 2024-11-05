import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import React, {  useState } from "react";
import { API } from "../../constants/API";
import request from "../../service/request";
import { Input } from 'antd';
import {  useSelector } from 'react-redux';



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




const InfoScreen = ()=>{
  const UserInfo =  useSelector((state) => state.User)
  console.log("UserInfo",UserInfo)
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [avartar, setAvatar]=useState("")
  const [newName, setName] = useState("")
  const [newPhone, setPhone] = useState("")
  const handleChange = (info) => {
   
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file,"aasdfghjklkjhgfdsdfghjklkjhgfddfghjkl")
      getBase64(info.file.originFileObj, (url) => {
       
        setAvatar(info.file.response.secure_url)
        setLoading(false);
        console.log("url",url)
        setImageUrl(url);
      });
    }
  };
  
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const UpdateProfile = (e)=>{
    e.preventDefault();
    const url = ``;
    const data = { 
      id: UserInfo._id,
      username: newName,
      phone:newPhone,
      avartar: avartar
    };

    console.log("data",data)
    request.put(url, data)
      .then(response => {
        console.log("data")
        // Store.dispatch(loginUser(response.data))
       
      })
      .catch(error => {
        console.error('Lỗi khi gửi yêu cầu PUT:', error);
      });
  
  }
  
  



  return (
    <div>
        {UserInfo?
        <div className="container-fluid">
          {
            UserInfo.role ==='pending'?
            <div className='row'>
              <div className='mess'> vinghiemxk@gmail.com</div>
            </div>:<></>
          }
          <div className="row">
            <div className="col-lg-3 col-xlg-3 col-md-12">
              <div className="white-box">
                <div className="user-bg">
                
                  <div className="overlay-box">
                    
                   
                      <div className="user-content">
                        <img src={UserInfo?.avartar } className="thumb-lg img-circle" alt="img"/>
                        <h4 className="text-white mt-2">{ UserInfo.username}</h4>
                        <h5 className="text-white mt-2">{UserInfo.email}</h5>
                      </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-12">
              <div className="card">
                  <div className="card-body">
                    <form className="form-horizontal form-material" onSubmit={UpdateProfile}>
                        <div className="form-group mb-4">
                          <label className="col-md-12 p-0">Họ tên</label>
                          <div className="col-md-12  p-0">
                            <Input disabled  placeholder={UserInfo?.name} onChange={(e)=>setName(e.target.value)} defaultValue={UserInfo?.username} />
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="example-email" className="col-md-12 p-0">Email</label>
                          <div className="col-md-12 p-0">
                            {
                              UserInfo ? 
                              
                              <Input disabled type="email" value={UserInfo?.email} onChange={(e)=>setPhone(e.target.value)} className="form-control p-0 border-0" name="example-email" id="example-email" />
                              :
                              <Input type="email" placeholder="" className="form-control p-0 border-0" name="example-email" id="example-email" />
                            }
                          </div>
                        </div>
                    
                        <div className="form-group mb-4">
                          <label className="col-md-12 p-0">Số điện thoại</label>
                          <div className="col-md-12 p-0">
                            <Input  disabled  placeholder={UserInfo?.phone} onChange={(e)=>setPhone(e.target.value)} defaultValue={UserInfo?.phone} />
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label className="col-md-12 p-0">Avatar</label>
                          <div className='row'>
                            <div className='col-md-4 p-0 d-flex my-avatar'>
                            {
                            <Upload
        
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                action ={``}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                              >
                                {imageUrl ? (
                                  <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                    }}
                                  />
                                ) : (
                                  uploadButton
                                )}
                              </Upload>
                            }

                            </div>
                            <div className='col-md-8 p-0'>
                              <div className='box-update'>
                                
                              </div>  
                            </div>
                          </div>
                        </div>
                      
                        <div className="form-group mb-4">
                          <div className="col-sm-12">
                              <button className="btn btn-success" >Update Profile</button>
                          </div>
                        </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
        :
        
        <>sssss</>}

    </div>
        
  )

}
export default InfoScreen;