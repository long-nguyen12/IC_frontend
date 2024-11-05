import { Button, Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { API } from "../../constants/API";
import { formatString } from "../../constants/formatString";
import { postGenerateImage } from "../../services/image.service";

const DetectionImage = ({ image }) => {
  const [data, setData] = useState(image);

  useEffect(() => {
    setData(image);
  }, [image]);
  
  async function generateBoundingBox() {
    let file_id = data._id;
    let resp = await postGenerateImage(file_id);
    console.log(resp);
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
              src={formatString(
                API.API_HOST + API.VIEW_IMAGE,
                data.folder,
                data.detection_name
              )}
              style={{ width: "100%" }}
            />
          ) : null}
        </Col>
      </Row>
    </div>
  );
};
export default DetectionImage;
