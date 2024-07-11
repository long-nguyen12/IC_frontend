import { Button, Col, Image, Row } from "antd";
import React, { useState } from "react";
import { API } from "../../constants/API";
import { formatString } from "../../constants/formatString";
import { postGenerateImage } from "../../services/image.service";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const DetectionImage = ({ image }) => {
  const [data, setData] = useState(image);
  async function generateBoundingBox() {
    let file_id = data._id;
    let resp = await postGenerateImage(file_id);
    console.log(resp);
  }

  return (
    <div style={{ height: "100%" }}>
      <Row justify={"center"} style={{ margin: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => generateBoundingBox()}
        >
          Sinh bounding box
        </Button>
      </Row>
      <Row style={{ height: "100%" }} gutter={2}>
        <Col span={12}>
          {/* {data ? (
            <Image
            src={formatString(
              API.API_HOST + API.VIEW_IMAGE,
              data.name
            )}
            style={{ width: "100%" }}
          />
          ) : null} */}
        </Col>
      </Row>
    </div>
  );
};
export default DetectionImage;
