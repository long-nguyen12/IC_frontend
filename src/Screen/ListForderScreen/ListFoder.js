
import React, { useState, useEffect } from "react";
import { API } from "../../constants/API";
import request from "../../service/request";
import { Image } from 'antd';
import { Col, Row, Spin, Alert } from 'antd';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import ContextMenu from "./ContextMenu";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const ListFoderScreen = () => {
  const [foder, setFoder] = useState({});
  const navigate = useNavigate();
  const location = useLocation();


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const paginatedChildren = foder.children?.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const paginatedImages = foder.images?.slice((currentPage - 1) * pageSize, currentPage * pageSize);



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

 
  const path = location.state?.fodername || "";

  // Chuyển path thành mảng thư mục
  const folders = path.split("/").filter(Boolean);
  function returnFoderSegment(pathStr) {
    const normalizedPath = pathStr.replace(/\\/g, "/");
    const parts = normalizedPath.split("/");
    return parts[1];
  }

  useEffect(() => {
    handleGetFolder();
  }, [location.state.fodername]);

  console.log("folders",folders)
 
  return (
    <div>
      {foder ? (
        <div>

          {/* <AppBreadcrumb /> */}
          {/* <div className="title-folder">{foder.name}</div> */}
          <Breadcrumb style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item>
              <span to="/foders/all">Uploads</span>
            </Breadcrumb.Item>
            {folders[0].replace(/\\/g, "/").split("/").slice(1).map((folder, index) => {
              console.log("foldersssss",folder)
              const linkPath = "/" + folders.slice(0, index + 1).join("/");
              return (
                <Breadcrumb.Item key={index}>
                  <Link to={linkPath} state={{ fodername: linkPath }}>
                    {folder}
                  </Link>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>


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
                      src={
                        API.API_HOST +"/" + item.name
                      }
                      preview={false}
                      onClick={() => navigate(`/image?folder=${returnFoderSegment(item.path)}&index=${index}&path=${item.name}`, { state: { index: index } })}
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
