import React, { useEffect, useRef, useState } from "react";
import {
  App,
  Button,
  Col,
  Drawer,
  FloatButton,
  Form,
  Image,
  Input,
  List,
  Row,
  Skeleton,
  Space,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  CloudSyncOutlined,
  CloudDownloadOutlined,
  PictureOutlined,
  FallOutlined,
  RiseOutlined,
} from "@ant-design/icons";
// import axios from "axios";
import { API } from "../../constants/API";
import { formatString } from "../../constants/formatString";
import { useLocation, useParams } from "react-router-dom";
import request from "../../service/request";
import ImageWithBBoxes from "../../component/ImageWithBbox/ImageWithBBox";

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
  let { folderName } = useParams();
  let location = useLocation();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const prevRef = useRef();
  const nextRef = useRef();
  const submitRef = useRef();
  const formRef = useRef(null);
  // const [imgName, setImgName] = useState(null);
  const [describe, setDescribe] = useState(["", "", "", "", ""]);
  const [hasMore, setHasMore] = useState(true);
  const [select, setSelect] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSort, setIsSort] = useState("asc");
  const [bbox, setBBox] = useState({});
  // eslint-disable-next-line
  const [bboxTitle, setBBoxTitle] = useState();
  // --------------- useEffect ------------------
  useEffect(() => {
    const resetState = () => {
      setData([]);
      setPage(1);
      setBBox(null);
      setBBoxTitle();
      // setImgName(data[0]);
      setSelect(0);
      setStatus(false);
      setHasMore(true);
    };
    resetState();
    // loadAllDescribe();
    getImageList("asc");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderName]);
  useEffect(() => {
    const fileName = data[select]?.name;
    if (fileName) {
      requestDescribe(
        fileName.includes("/") ? fileName.split("/")[1] : fileName
      );
    }

    // eslint-disable-next-line
  }, [select, data]);
  // --------------------------------------------
  // --------------- Action ---------------------
  const getImageList = async (sort) => {
    try {
      const res = await request.get(
        formatString(
          API.GET_ALL_IMAGE_NAME_NEW,
          location?.state?.key ? location?.state?.key : folderName,
          1,
          limit,
          sort,
          location?.state?.child ? location?.state?.child : "all"
        )
      );

      if (res.data) {
        const newData = res.data.file;
        setData(newData, () => {
          // Use callback function to ensure data is updated
          const fileName = newData[select]?.name;
          if (fileName) {
            requestDescribe(
              fileName.includes("/") ? fileName.split("/")[1] : fileName
            );
          }
        });

        if (newData.length < limit) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("name", data[select].name);
    formData.append(
      "folder",
      location?.state?.key ? location?.state?.key : folderName
    );
    formData.append(
      "describe",
      JSON.stringify(Object.values(values.describes))
    );
    request
      .post(API.ADD_DESCRIBE, formData)
      .then((res) => {
        if (res.status === 200) {
          message.success(res?.data?.message);
          getImageList(isSort);
          // loadAllDescribe();
        }
      })
      .catch((err) => console.log(err));
  };

  async function loadMoreData(newPage) {
    setHasMore(true);
    await request
      .get(
        formatString(
          API.GET_ALL_IMAGE_NAME_NEW,
          location?.state?.key ? location?.state?.key : folderName,
          newPage,
          limit,
          isSort,
          location?.state?.child ? location?.state?.child : "all"
        )
      )
      .then((res) => {
        if (res.data) {
          const newData = res.data.file;
          setData((prevData) => [...prevData, ...newData]);
          setPage(newPage);
          // Check if there are more pages
          if (newData.length < limit) {
            setHasMore(false);
          }
          return newData;
        }
      })
      .catch((err) => console.log(err));
  }
  const handleGetDescribe = async (name, index) => {
    // request.get(formatString(API.GET_DESCRIBE, name))
    setSelect(index);
    // setImgName(name);
    requestDescribe(name);
  };

  const requestDescribe = (name) => {
    request
      .get(formatString(API.GET_DESCRIBE, name))
      .then((res) => {
        if (res?.data) {
          setDescribe(res.data.describe.describe);
          if (res.data.describe.bbox) {
            console.log("here", res.data.describe.bbox);
            setBBoxTitle(res.data.describe?.categories_name);
            const bboxData = res.data.describe.bbox;
            const bboxes = bboxData.map((coords, index) => ({
              title: res.data.describe.categories_name[index],
              x: coords[0],
              y: coords[1],
              width: coords[2],
              height: coords[3],
            }));
            setBBox(bboxes);
            console.log("asdsad >>", bboxes);
            // setBBox({
            //   x: res.data.describe?.bbox[0][0],
            //   y: res.data.describe?.bbox[0][1],
            //   height: res.data.describe?.bbox[0][2],
            //   width: res.data.describe?.bbox[0][3],
            // });
          }
          const data = res.data.describe.describe;
          const array = new Array(5).fill({});
          if (data.length > 0) {
            data.forEach((item, index) => {
              array[index] = item;
            });
          }
          form.setFieldsValue({
            describes: array,
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          form.setFieldsValue({
            describes: [
              {
                caption: "",
                segment_caption: "",
              },
              {
                caption: "",
                segment_caption: "",
              },
              {
                caption: "",
                segment_caption: "",
              },
              {
                caption: "",
                segment_caption: "",
              },
              {
                caption: "",
                segment_caption: "",
              },
            ],
          });
        }
      });
  };

  const exportFile = async () => {
    setLoading(true);
    const form = new FormData();
    form.append(
      "folderName",
      location?.state?.key ? location?.state?.key : folderName
    );
    form.append(
      "nameSubFolder",
      location?.state?.child ? location?.state?.child : "all"
    );
    await request
      .post(API.EXPORT_FILE, form)
      .then((res) => {
        if (res.data) {
          message.success(res.data.message);
          // window.open(res.data.file);
          setStatus(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus(false);
      });
  };

  const downloadFile = async () => {
    await request
      .get(
        formatString(
          API.DOWNLOAD,
          location?.state?.key ? location?.state?.key : folderName,
          location?.state?.child ? location?.state?.child : "all"
        ),
        { responseType: "blob" }
      )
      .then((res) => {
        if (res.data) {
          const blob = new Blob([res.data], { type: "application/json" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${folderName}.json`;
          link.click();
          setStatus(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus(false);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab" && event.target === submitRef.current) {
      event.preventDefault();
      nextRef.current.focus();
    }
    if (event.key === "Tab" && event.target === nextRef.current) {
      event.preventDefault();
      const firstTextarea = document.querySelector(
        ".ant-form-item-control-input-content:first-of-type input"
      );
      if (firstTextarea) {
        firstTextarea.focus();
      }
    }
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      // console.log("Ctrl + S");
      if (status) {
        downloadFile();
      } else {
        exportFile();
      }
    }
  };

  const moveToPrevImg = () => {
    if (select === 0) {
      setSelect(data.length - 1);
    } else {
      setSelect(select - 1);
    }
    // setImgName(data[select - 1]?.name);
    // console.log(select);
    // requestDescribe(data[select - 1]?.name.split("/")[1]);
  };

  const moveToNextImg = () => {
    console.log(data.length);
    console.log(select);
    if (select === data.length - 1) {
      setSelect(0);
    } else {
      setSelect(select + 1);
    }
    // setImgName(data[select + 1]?.name);
    // requestDescribe(data[select]?.name.split("/")[1]);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSort = async () => {
    if (isSort === "asc") {
      setIsSort("desc");
      getImageList("desc");
    } else {
      setIsSort("asc");
      getImageList("asc");
    }
  };
  // --------------------------------------------
  return (
    <div onKeyDown={handleKeyDown}>
      <Row style={{ maxHeight: 600, minHeight: 200 }} gutter={2}>
        <Col span={12}>
          {data && data.length > 0 ? (
            <div style={{ width: "100%", height: "100%" }}>
              <ImageWithBBoxes
                imageUrl={formatString(
                  API.API_HOST + API.VIEW_IMAGE,
                  location?.state?.key ? location?.state?.key : folderName,
                  data[select].name
                )}
                bboxes={bbox ? bbox : []}
                // title={bboxTitle}
              />
            </div>
          ) : null}
        </Col>
        <Col span={12}>
          <Form
            form={form}
            ref={formRef}
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            style={{
              maxWidth: "100%",
              width: "100%",
              maxHeight: 500,
              minHeight: 200,
              overflow: "auto",
            }}
          >
            <Form.List name="describes" initialValue={describe}>
              {(fields, { add, remove }, { errors }) => (
                <div>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? `Mô tả` : ""}
                      required={false}
                      tabIndex={index + 1}
                    >
                      <Space key={field.key} style={{ width: "100%"}} direction="vertical">
                        <Form.Item
                          {...field}
                          name={[field.name, "caption"]}
                          key={[field.key, "caption"]}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                        >
                          <Input rows={2} placeholder="Mô tả" style={{width: window.innerWidth * 0.3}} />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "segment_caption"]}
                          key={[field.key, "segment_caption"]}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                        >
                          <Input
                            rows={2}
                            placeholder="Segment Caption "
                            // noStyle
                            style={{width: window.innerWidth * 0.3}}
                          />
                        </Form.Item>
                      </Space>
                    </Form.Item>
                  ))}
                </div>
              )}
            </Form.List>
            <Form.Item>
              <Row>
                <Space>
                  <Button type="primary" htmlType="submit" ref={submitRef}>
                    Lưu mô tả
                  </Button>
                  {select >= 1 ? (
                    <Button
                      type="primary"
                      ref={prevRef}
                      onClick={() => moveToPrevImg()}
                    >
                      Prev
                    </Button>
                  ) : null}
                  <Button
                    type="primary"
                    ref={nextRef}
                    onClick={() => moveToNextImg()}
                  >
                    Next
                  </Button>
                </Space>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <FloatButton.Group>
        <FloatButton
          onClick={showModal}
          type="primary"
          shape="square"
          icon={<PictureOutlined />}
        />
        <FloatButton
          shape="square"
          type="primary"
          icon={status ? <CloudDownloadOutlined /> : <CloudSyncOutlined />}
          loading={loading}
          onClick={() => {
            status ? downloadFile() : exportFile();
          }}
        >
          {status ? "Tải file" : "Xuất file"}
        </FloatButton>
      </FloatButton.Group>
      <Drawer
        title={folderName}
        placement="bottom"
        open={isModalOpen}
        height={window.innerHeight - 50}
        onClose={handleCancel}
        extra={
          <Space>
            <Button
              type="primary"
              icon={isSort === "asc" ? <FallOutlined /> : <RiseOutlined />}
              onClick={handleSort}
            />
          </Space>
        }
      >
        <div
          id="scrollableDiv"
          style={{ height: "100%", overflow: "auto", width: "100%" }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={() => loadMoreData(page + 1)}
            hasMore={hasMore}
            loader={<Skeleton.Image active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              grid={{
                gutter: 12,
                column: 5,
              }}
              renderItem={(item, index) => {
                return (
                  <List.Item
                    key={index + 1}
                    style={{
                      borderWidth: item.haveCaption ? 2 : 0,
                      borderStyle: "solid",
                      borderColor: item.haveCaption ? "green" : "red",
                    }}
                  >
                    <Image
                      onClick={() =>
                        handleGetDescribe(item.name.split("/")[1], index)
                      }
                      width={"100%"}
                      height={150}
                      style={{ objectFit: "contain" }}
                      preview={true}
                      src={formatString(
                        API.API_HOST + API.VIEW_IMAGE,
                        location?.state?.key
                          ? location?.state?.key
                          : folderName,
                        item.name
                      )}
                    />
                  </List.Item>
                );
              }}
            />
          </InfiniteScroll>
        </div>
      </Drawer>
    </div>
  );
};
export default ListImage;
