
import React, { useState, useEffect } from "react";
import { API } from "../../constants/API";
import request from "../../service/request";
import { Input, Image, Button, Modal } from 'antd';
import { Col, Divider, Row, Spin, Alert } from 'antd';
import { formatString } from '../../constants/formatString'
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import ContextMenu from "./ContextMenu";

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {  Dropdown, message, Space, Tooltip } from 'antd';

const ListFoderScreen = () => {
  const [active,setActive] = useState(false)
  const [foderName, setFoderName] = useState(`all`);
  const [foder, setFoder] = useState({});
  const [Select, setSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const paginatedChildren = foder.children?.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const paginatedImages = foder.images?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const items = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  const handleGetFolder = async () => {
    await request
      .get(API.FOLDERS + `/${location.state.fodername}`)
      .then((res) => {
        if (res?.data) {
          setFoder(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };





  function removeFirstSegment(pathStr) {
    const parts = pathStr.split(/[/\\]/);
    parts.shift();
    return parts.join("/");
  }

  function returnFoderSegment(pathStr) {
    const normalizedPath = pathStr.replace(/\\/g, "/");
    const parts = normalizedPath.split("/");
    return parts[1];
  }

  useEffect(() => {
    handleGetFolder();
  }, [location.state.fodername]);

 

  const downloadJson = (foldername) => {
    console.log(foldername);
  }



  return (
    <div>
      {foder ? (
        <div>

          {/* <AppBreadcrumb /> */}
          <div className="title-folder">{foder.name}</div>

          <Row gutter={16}>
            {paginatedChildren?.map(item => (
              <Col className="gutter-row" span={3} key={item.name}>
                <div className="Hover-Box">
                  <div className="poiter" onClick={() => navigate(`/foders/${item.name}`, { state: { fodername: `${item.path}` } })}>
                    <div className="foder-box"></div>
                    <div className="name-foder"><span>{item.name}</span></div>
                  </div>
                 < ContextMenu nameFolder={item.name} onFolderDeleted={handleGetFolder}/>
                </div>

              </Col>
            ))}

            {paginatedImages?.map((item, index) => (
              <Col className="gutter-row" span={3} key={item.name}>
              <div className="Hover-Box">
                <div className="poiter">
                  <div className="img-box">
                    <Image
                      src={formatString(
                        API.API_HOST + API.VIEW_IMAGE,
                        returnFoderSegment(item.path),
                        removeFirstSegment(
                          item.path.replace(/^uploads[\/\\]?/, "")
                        )
                      )}
                      preview={false}
                      onClick={() => navigate(`/image?folder=${returnFoderSegment(item.path)}&index=${index}&path=${item.path.replace(/\\/g, "/")}`, { state: { index: index } })}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="name-foder">
                    <span>
                      {item.name?.substring(item.name.length - 10)} {index}
                    </span>
                  </div>
                </div>
              </div>
              </Col>
            ))}


          </Row>
          <div>
            
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={(foder.children?.length || 0) + (foder.images?.length || 0)}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                style={{ marginTop: "20px", textAlign: "center" }}
              />

          </div>
        </div>
      ) : (
        <div>
          <Spin tip="Loading...">
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
        </div>
      )}
    </div>
  );
};
export default ListFoderScreen;
