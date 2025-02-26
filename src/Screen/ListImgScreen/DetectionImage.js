import { Button, Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { API } from "../../constants/API";
import { formatString } from "../../constants/formatString";
import { postGenerateImage } from "../../services/image.service";

const DetectionImage = ({ image }) => {
  const nameAI = image.describe?.split("/").pop()
  const [data, setData] = useState(image);
  const [pathAi, setPathAi] = useState('');
  console.log("------data------",data)
  useEffect(() => {
    setData(image);
  }, [image]);
  
  console.log("image",image)

  async function generateBoundingBox() {
    // let pathFile = data.name
    let resp = await postGenerateImage(data);
    console.log("đâsdasdasdasdsa",resp);
    let link = resp.dectect_path.split("/").pop()
    console.log("link",link)
    setPathAi(link)
    
  }

  console.log("pathAi",pathAi)
  useEffect(() => {
    console.log("Updated pathAi", pathAi);
  }, [pathAi]);


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
      <Row gutter={2}>
        <Col span={24}>
          {data && data.detection_name !== null ? (
            <Image
              src={
                API.API_IMG + data.describe?.split("/").pop()
              }
              style={{ width: "100%" }}
            />

            
          ) : null
          
          }

        </Col>
      </Row>
    </div>
  );
};
export default DetectionImage;
