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
  Spin 
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
import DetectionImage from "./DetectionImage";
import { notification } from 'antd';
import { useSearchParams } from "react-router-dom";





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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const folder = params.get("folder");
  const path = params.get("path");
  const indexImage = params.get("index");
  const normalizedPath = path.replace(/\\/g, "/");
  const linkFolder = normalizedPath.substring(0, normalizedPath.lastIndexOf("/"));
  let { folderName } = useParams();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [dataFile, setDataFile] = useState({});
  const prevRef = useRef();
  const nextRef = useRef();
  const submitRef = useRef();
  const formRef = useRef(null);
  const [describe, setDescribe] = useState(["", "", "", "", ""]);
  const [hasMore, setHasMore] = useState(true);
  const [select, setSelect] = useState(indexImage);
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSort, setIsSort] = useState("asc");
  const [bbox, setBBox] = useState({});

  const [bboxTitle, setBBoxTitle] = useState();
  const [categories, setCategories] = useState([]);
  const [width, setWidth] = useState(window.innerWidth * 0.3);


  const handleGetFolder = async () => {
    setLoading(true);
    const url = formatString(
      API.GET_ALL_IMAGE_NAME_NEW,
      location?.state?.key ? location?.state?.key : folder,
      1,
      limit,
      isSort,
      location?.state?.child ? location?.state?.child : "all"
    )
    await request
      .get(url)
      .then((res) => {
        if (res?.data) {

          const listImg = res?.data.file
          setData(listImg)
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };



  // --------------- useEffect ------------------
  useEffect(() => {
    handleGetFolder()
    const handleResize = () => {
      setWidth(window.innerWidth * 0.3);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    setDescribe(data[select]?.caption || ["", "", "", "", ""])
    form.setFieldsValue(data[select]?.caption || ["", "", "", "", ""])
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const resetState = () => {
      // setData([]);
      setPage(1);
      setBBox(null);
      setBBoxTitle();
      setSelect(indexImage);
      setStatus(false);
      setHasMore(true);
    };
    resetState();
    handleGetFolder()
  }, [folderName]);



  useEffect(() => {
    setDescribe(data[select]?.caption?.describes || ["", "", "", "", ""])
    form.setFieldsValue(data[select]?.caption || ["", "", "", "", ""])
  }, [select, data]);

  const getImageList = async (sort) => {
    try {
      const res = await request.get(
        formatString(
          API.GET_ALL_IMAGE_NAME_NEW,
          location?.state?.key ? location?.state?.key : folder,
          1,
          limit,
          sort,
          location?.state?.child ? location?.state?.child : "all"
        )
      );

      if (res.data) {
        const newData = res.data.file;

        setData(newData);
        if (newData.length < limit) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = (values) => {
    const Data = {
      id: data[select]._id,
      caption: JSON.stringify({ ...values })
    }
    request
      .post(API.UPDATE_FILE, Data)
      .then((res) => {
        if (res.status === 200) {
          let fileData = res.data
          let newdata = [...data];
          const updatedData = newdata.map((item) =>
            item._id === res.data.file._id ? res.data.file : item
          );
          setData(updatedData);
          setDescribe(fileData.file.caption)
          form.setFieldsValue(fileData.file.caption)
          notification.success({
            message: "Thành công!",
            description: "Dữ liệu đã được tải thành công.",
            duration: 3,
          });


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
          if (newData.length < limit) {
            setHasMore(false);
          }
          return newData;
        }
      })
      .catch((err) => console.log(err));
  }
  const handleGetDescribe = async (name, index) => {
    setSelect(index);
    requestDescribe(name);
  };

  const handleGetCategories = async (name, index) => {
    request
      .get(API.CATEGORIES)
      .then((res) => {
        res.data.forEach((item) => {
          setCategories((prevCategories) => [
            ...prevCategories,
            item.categories_name,
          ]);
        });
      })
      .catch((err) => console.log(err));
  };



  const requestDescribe = (name) => {
    request
      .get(formatString(API.GET_DESCRIBE, name))
      .then((res) => {
        if (res?.data) {
          setDescribe(res.data.describe.describe);
          if (res.data.describe.bbox) {
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
      let x = Number(indexImage) - 1
      let fixedPath = data[x].name.replace(/\\/g, "/")
      setSearchParams({ folder: folder, index: x, path: fixedPath });
      setSelect(x);

    }
  };

  const moveToNextImg = () => {
    if (select === data.length - 1) {

      setSelect(0);
    } else {
      let x = Number(indexImage) + 1
      let fixedPath = data[x].name.replace(/\\/g, "/")
      setSearchParams({ folder: folder, index: x, path: fixedPath });
      setSelect(x);
    }
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


  const handleNewBbox = (newBbox) => {
    setBBox([...bbox, { ...newBbox }]);
  };

  const handleUpdateBbox = (updatedBbox) => {
    const updatedBboxes = bbox.map((bbox, index) =>
      index === updatedBbox.index ? updatedBbox : bbox
    );
    setBBox(updatedBboxes);
  };

  const handleDeleteBbox = (index) => {
    setBBox(bbox.filter((_, i) => i !== index));
  };

  return (
    <div>
    {loading?
    <div className="flex-center"><Spin size="large" /></div>
     
     :
    <div onKeyDown={handleKeyDown} style={{ height: "100%" }}>
      <Row style={{ height: "100%" }} gutter={2}>
        <Col span={12}>


          {data && data.length > 0 ? (
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src={data[indexImage]._id ?
                  API.API_HOST + "/" + path : API.API_HOST + "/" + API.API_HOST + "/" + data[indexImage].name
                }
                style={{ width: "100%" }}
              />
              <DetectionImage image={data[indexImage]} />
            </div>
          ) : null}

        </Col>
        <Col span={12}>
          <Form
            form={form}
            ref={formRef}
            initialValues={describe}
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}

            style={{
              maxWidth: "100%",
              width: "100%",
              maxHeight: "100%",
              minHeight: 400,
              overflow: "auto",
            }}
          >
            <Form.List   >
              {(fields, { add, remove }, { errors }) => (
                <div>
                  {fields.map((field, index) => {
                    return (
                      <Form.Item
                        key={field.key}
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? `Mô tả` : ""}
                        required={false}
                        tabIndex={index + 1}
                      >
                        <Space key={field.key} style={{ width: "100%" }} direction="vertical">
                          <Form.Item
                            {...field}
                            name={[field.name, "caption"]}
                            key={[field.key, "caption"]}
                            validateTrigger={["onChange", "onBlur"]}
                            noStyle
                          >
                            <Input rows={2} placeholder="Mô tả" style={{ width: width }} />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "segment_caption"]}
                            key={[field.key, "segment_caption"]}
                            validateTrigger={["onChange", "onBlur"]}
                            noStyle
                          >
                            <Input rows={2} placeholder="Segment Caption" style={{ width: width }} />
                          </Form.Item>
                        </Space>
                      </Form.Item>
                    );
                  })}
                </div>
              )}


            </Form.List>

            <Form.Item className="list-btn">
              <Row justify={"center"} style={{ margin: "0" }}>
                <Space>
                  <Button type="primary" htmlType="submit" ref={submitRef}>
                    Lưu mô tả
                  </Button>
                  {indexImage >= 1 ? (
                    <Button
                      type="primary"
                      ref={prevRef}
                      onClick={() => moveToPrevImg()}
                    >
                      Trước
                    </Button>
                  ) : null}

                  {indexImage == data.length - 1 ?
                    null
                    : (<Button
                      type="primary"
                      ref={nextRef}
                      onClick={() => moveToNextImg()}
                    >
                      Tiếp theo
                    </Button>)
                  }

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
          // loading={loading}
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
                      textAlign: 'center',
                    }}
                  >
                    <Image
                      onClick={() =>
                        handleGetDescribe(item.name.split("/")[1], index)
                      }
                      width={"50%"}
                      height={"auto"}
                      style={{ objectFit: "contain" }}
                      preview={true}
                      src={
                        API.API_HOST + "/" +
                        item.name
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </InfiniteScroll>
        </div>
      </Drawer>
    </div>
    }
    </div>
  );
};
export default ListImage;
