import React, { useState } from "react";
import { Menu, Dropdown, Modal, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { API } from "../../constants/API";
import request from "../../service/request";
import { useNavigate } from "react-router-dom";


const ContextMenu = ({ nameFolder, onFolderDeleted }) => {
    console.log("nameFolder",nameFolder)
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [active, setActive] = useState(false)
    const handleMenuClick = ({ key }) => {
        setMenuVisible(false);
        switch (key) {
            case "info":
                message.warning("Chức năng chưa hỗ trợ.");
                break;
            case "rename":
                message.warning("Chức năng đổi tên chưa hỗ trợ.");
                break;
            case "delete":
                Modal.confirm({
                    title: "Xác nhận xóa",
                    content: "Bạn có chắc chắn muốn xóa ảnh này không?",
                    onOk: () => DEleteFolder(nameFolder),
                });
                break;
            default:
                break;
        }
    };

    const DEleteFolder = (path) => {
        console.log("paht", path)
        request
            .get(API.DELETE_FOLDER + "/" + path)
            .then((res) => {
                if (res.data) {
                    message.success("Thư mục đã bị xóa!")
                    onFolderDeleted()
                    navigate("/foders/all",{state:{fodername:`all`}})
                    

                }
            })
            .catch((err) => console.log(err));
    }





    const handleClick = () => {
        setMenuVisible(!menuVisible);
        setActive(!active)
    };

    const menuItems = [
        { key: "info", label: "ℹ️ Thông tin tệp" },
        { key: "rename", label: "✏️ Đổi tên" },
        { key: "delete", label: "🗑️ Xóa thư mục", danger: true },
    ];


    return (
        <div onClick={() => setMenuVisible(false)} className="">
            <Dropdown
                menu={{ items: menuItems, onClick: handleMenuClick }}
                trigger={["click"]}
                onOpenChange={setMenuVisible}
                open={menuVisible}
            >
                <div
                    className={menuVisible ? 'Click-folder active1' : 'Click-folder'}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                    }}
                >
                    <MoreOutlined />
                </div>
            </Dropdown>
        </div>
    );
};

export default ContextMenu;
