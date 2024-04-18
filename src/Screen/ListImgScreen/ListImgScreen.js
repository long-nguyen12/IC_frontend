import React, { useEffect, useState } from "react";
import {
  App,
  Button,
  Col,
  Form,
  Image,
  Input,
  List,
  Row,
  Skeleton,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import axios from "axios";
import { API } from "../../constants/API";
import { formatString } from "../../constants/formatString";
import { useLocation, useParams } from "react-router-dom";
import request from "../../service/request";

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

const ListImage = () => {
  const { TextArea } = Input;
  let { folderName } = useParams();
  let location = useLocation();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [imgName, setImgName] = useState(null);
  const [describe, setDescribe] = useState(["", "", "", "", ""]);
  const [hasMore, setHasMore] = useState(true);
  const [select, setSelect] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  // --------------- useEffect ------------------
  useEffect(() => {
    // Reset data and page when folderName changes
    setData([]);
    setPage(1);
    setHasMore(true);
  }, [folderName]);

  useEffect(() => {
    console.log(folderName);
    loadMoreData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderName]);
  // --------------------------------------------
  // --------------- Action ---------------------
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    const formData = new FormData();
    formData.append("name", imgName);
    formData.append(
      "describe",
      JSON.stringify(Object.values(values.describes))
    );
    request
      .post(API.ADD_DESCRIBE, formData)
      .then((res) => {
        if (res.status === 200) {
          message.success(res?.data?.message);
        }
      })
      .catch((err) => console.log(err));
  };

  async function loadMoreData(newPage) {
    // if (!hasMore) {
    //   return;
    // }
    setHasMore(true);
    await request
      .get(
        formatString(API.GET_ALL_IMAGE_NAME, location.state.key, newPage, limit)
      )
      .then((res) => {
        if (res.data) {
          const newData = res.data.files;
          setData((prevData) => [...prevData, ...newData]);
          setPage(newPage);
          // setPage(pageNumber);
          // Check if there are more pages
          if (newData.length < limit) {
            setHasMore(false);
          }
        }
      });
    // .catch(() => {
    //   setHasMore(false);
    // })
    // .finally(() => {
    //   setHasMore(false);
    // });
  }
  const handleGetDescribe = async (name, index) => {
    // request.get(formatString(API.GET_DESCRIBE, name))
    setSelect(index);
    setImgName(name);
    request
      .get(formatString(API.GET_DESCRIBE, name))
      .then((res) => {
        if (res?.data) {
          setDescribe(res.data.describe.describe);
          const data = res.data.describe.describe;
          const array = [];
          data.map((item) => {
            return array.push(item);
          });
          form.setFieldsValue({
            describes: array,
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          form.setFieldsValue({
            describes: ["", "", "", "", ""],
          });
        }
      });
  };
  // const setFieldValue = () => {
  //   const newValues = ["Value 1", "Value 2", "Value 3"]; // Your new field values

  //   setInitialValues(newValues);

  //   // Set field values using setFields method
  //   form.setFieldsValue({
  //     describes: newValues.map((value, index) => ({
  //       [`describe_${index}`]: value,
  //     })),
  //   });
  // };
  // --------------------------------------------
  return (
    <Row style={{ maxHeight: 500, minHeight: 200 }}>
      <Col span={4}>
        <div id="scrollableDiv" style={{ height: 500, overflow: "auto" }}>
          <InfiniteScroll
            // style={{
            //   width: "100%",
            //   height: 500,
            // }}
            dataLength={data.length}
            next={() => loadMoreData(page + 1)}
            hasMore={hasMore}
            loader={<Skeleton.Image active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              grid={{
                gutter: 6,
                column: 1,
              }}
              renderItem={(item, index) => (
                <List.Item
                  key={index + 1}
                  style={{
                    borderWidth: select === index + 1 ? 2 : 0,
                    borderStyle: "solid",
                    borderColor: "red",
                  }}
                >
                  <Image
                    onClick={() => handleGetDescribe(item, index + 1)}
                    width={"100%"}
                    preview={true}
                    src={formatString(
                      API.API_HOST + API.VIEW_IMAGE,
                      folderName,
                      item
                    )}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Col>
      <Col
        span={20}
        style={{
          width: "80%",
          maxHeight: "100%",
        }}
      >
        <Form
          form={form}
          name="dynamic_form_item"
          {...formItemLayoutWithOutLabel}
          onFinish={onFinish}
          style={{
            maxWidth: "100%",
            maxHeight: 500,
            minHeight: 200,
            overflow: "auto",
          }}
        >
          <Form.List
            name="describes"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 5) {
                    return Promise.reject(new Error("At least 5 passengers"));
                  }
                },
              },
            ]}
            initialValue={describe}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? `Mô tả` : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Vui lòng nhập mô tả hoặc xóa dòng này",
                        },
                      ]}
                      noStyle
                    >
                      <TextArea
                        rows={2}
                        placeholder="Mô tả"
                        // onChange={(value) => console.log(value.currentTarget)}
                        style={{
                          width: "80%",
                        }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                        style={{
                          paddingLeft: 20,
                          position: "absolute",
                          top: "40%",
                          bottom: "40%",
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{
                      width: "60%",
                    }}
                    icon={<PlusOutlined />}
                  >
                    Thêm mô tả
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu mô tả
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default ListImage;
