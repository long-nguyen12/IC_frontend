import { Button, Col, Image, Row,Spin } from "antd";
import React, { useEffect, useState } from "react";
import { API } from "../../constants/API";
import { formatString } from "../../constants/formatString";
import { postGenerateImage } from "../../services/image.service";
import {  Skeleton } from "antd";
const DetectionImage = ({ image }) => {
  const [loading,setLoading] = useState(false)
  const [data, setData] = useState(image);
  const [pathAi, setPathAi] = useState("");

  useEffect(() => {
    setLoading(true);
    if (image) {
     
      setData(image);
      setPathAi(image.describe?.split("/").pop() || "");
      setLoading(false);
    }
  }, [image]);

  function generateBoundingBox() {
    setLoading(true)
    postGenerateImage(data)
      .then((resp) => {
        if (resp) {
          setData(resp);
          setPathAi(resp.describe?.split("/").pop() || "");
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
      {pathAi?
        <Row gutter={2}>
        <Col span={24}>
          {data && data.detection_name !== null ? (
            <div>
            {loading ? <div className="flex-center"><Spin size="large" /></div> : <Image
              src={
                API.API_IMG + pathAi
              }
              style={{ width: "100%" }}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)} 
            /> }
            </div>

          ) : null

          }
        </Col>
      </Row>:``
    
      }
      
    </div>
  );
};
export default DetectionImage;
