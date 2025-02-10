import { LoadingOutlined, PlusOutlined , LockOutlined } from '@ant-design/icons';
import { Flex, message, Upload, Avatar, Space, Select } from 'antd';
import React, { useState ,useEffect} from "react";
import { API } from "../../constants/API";
import request from "../../service/request";
import { Input, Image } from 'antd';
import { useSelector } from 'react-redux';
import { Col, Divider, Row, Button, Spin, Alert } from 'antd';
import DetectionImage from '../ListImgScreen/DetectionImage'
import { formatString } from '../../constants/formatString'

const ListFoderScreen = () => {
  const [foder, setFoder] = useState({});
  const handleGetFolder = async () => {
    await request
      .get(API.FOLDER)
      .then((res) => {
        if (res?.data) {
          setFoder(res.data.data)
        }
      })
      .catch((err) => console.log(err));
  };

  function removeFirstSegment(pathStr) {
    const parts = pathStr.split(/[/\\]/);
    parts.shift();
    return parts.join("/"); 
  }

  useEffect(() => {
      handleGetFolder()
      // getUsers();
  }, []);


  const SelectFoder = async (path)=>{
    console.log("path---------",API.FOLDERS + path)
    await request
    .get(API.FOLDERS + '/'+ path )
    .then((res) => {
      if (res?.data) {
        setFoder(res.data.data)
      }
    })
    .catch((err) => console.log(err));
  }


  console.log("foder",foder)
  return (
    <div>
      {foder?        
        <div>
            <div>{foder.name}</div>
            <Row gutter={16}>
             {foder.children?.map(item =>(
               <Col className="gutter-row" span={3} key={item.name}>
               <div className='poiter'  onClick={() => SelectFoder(item.path)}>
                 <div className='foder-box' >
                   
                 </div>
                 <div className='name-foder'><span>{item.name}</span></div>
               </div>
             </Col>
             ))}
            
            {foder.otherFiles?.map(item =>(
               <Col className="gutter-row" span={3} key={item.name}>
               <div className='poiter'  >
                 <div className='foder-box' >
                    <LockOutlined />
                 </div>
                 <div className='name-foder'><span>{item.name}</span></div>
               </div>
             </Col>
             ))}

            {foder.images?.map(item =>(
               <Col className="gutter-row" span={3} key={item.name}>
               <div className='poiter'  >
                 <div className='img-box' >
                  <Image
                    src={formatString(
                          API.API_HOST + API.VIEW_IMAGE,
                          foder.name,
                          removeFirstSegment(item.path.replace(/^uploads[\/\\]?/, '')) 
                        )}
                    style={{ width: "100%" }}
                  />
                 </div>
                 <div className='name-foder'><span>{item.name}</span></div>
               </div>
             </Col>
             ))}






            </Row>
        </div>
      :
       <div>
        <Spin tip="Loading...">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
        </div>
      }
    </div>
  )

}
export default ListFoderScreen;