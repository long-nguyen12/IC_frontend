import { Button, Col, Image, Row,Spin } from "antd";
import React, { useEffect, useState } from "react";
import { API } from "../../constants/API";
import { formatString } from "../../constants/formatString";
import { postGenerateImage } from "../../services/image.service";
import {  Skeleton } from "antd";
import request from "../../service/request";


const DetectionImage = ({ image }) => {
  const id = image._id
  const [loading,setLoading] = useState(false)
  const [data, setData] = useState(image);
  console.log(data)
  


  const handleGGetFile = async () => {
    setLoading(true);
    await request
      .get(API.GET_FILE_ID,{ params: { id: id } })
      .then((res) => {
        console.log(res.data)
        setData(res.data)

      })
      .catch((err) => console.log(err));
  };




  useEffect(() => {
    handleGGetFile()
    setLoading(true);
    if (image) {
      setData(image);
    }
    setLoading(false);
  }, [image]);






  function generateBoundingBox() {
    setLoading(true)
    postGenerateImage(data)
      .then((resp) => {
        if (resp) {
          setData(resp);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      <Row justify={"center"} style={{ margin: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => generateBoundingBox()}
        >
          Sinh bounding box
        </Button>
      </Row>
      { data.describe?
        <Row gutter={2}>
        <Col span={24}>
          {data && data.detection_name !== null ? (
            <div>
            {loading ? <div className="flex-center"><Spin size="large" /></div> : <Image
              src={
                data.describe
              }
              style={{ width: "100%" }}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)} 
            /> }
            </div>

          ) : "sss"

          }
        </Col>
      </Row>:``
    
      }
      
    </div>
  );
};
export default DetectionImage;
