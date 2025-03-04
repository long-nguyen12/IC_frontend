import { Button, Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { API } from "../../constants/API";
import { formatString } from "../../constants/formatString";
import { postGenerateImage } from "../../services/image.service";

const DetectionImage = ({ image }) => {
  console.log("imageimageimageimageimageimage",image)
  const nameAI = image.describe?.split("/").pop()
  const [data, setData] = useState(image);
  const [pathAi, setPathAi] = useState(nameAI);

  useEffect(() => {
    setData(image);
    setPathAi(nameAI)
  }, [image]);

  async function generateBoundingBox() {
    let resp = await postGenerateImage(data);
    if (resp) {
      let link = resp.describe?.split("/").pop()
      setPathAi(link)
    }
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
      <Row gutter={2}>
        <Col span={24}>
          {data && data.detection_name !== null ? (
            <Image
              src={
                API.API_IMG + pathAi
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
