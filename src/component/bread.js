import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbMap = {
  "/": "Trang chủ",
  "/users": "Người dùng",
};

const AppBreadcrumb = () => {
  const location = useLocation();
  console.log("location",location)
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbMap[url] || "Chi tiết"}</Link>
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link to="/">Trang chủ</Link>
      </Breadcrumb.Item>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
