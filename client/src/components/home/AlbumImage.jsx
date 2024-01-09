import { faPlus, faShare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react'
import { Modal, Select } from "antd";
import { newFolderApi } from '../../apis/newFolder.api';
import { folderNameApi } from '../../apis/folderName.api';
import Cookies from 'js-cookie';
import { toast } from "react-toastify"
import "../../assets/css/folder.css"
import { Link } from "react-router-dom"
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { getUsersApi } from '../../apis/getUsers.api';
import { shareFolderToSomeOneApi } from '../../apis/shareFolderToSomeOne.api';
export const AlbumImage = () => {
    const token = Cookies.get("access-token");
    const [newFolder, setNewFolder] = useState(false);
    const [nameFolder, setNameFolder] = useState("")
    const [folder, setFolder] = useState([])
    const [user, setUser] = useState([])
    const [userId, setUserId] = useState([])
    const [folderId, setFolderId] = useState("")
    const handelCreateFolder = () => {
        newFolderApi(nameFolder, token)
            .then((res) => {
                if (res.status == 200) {
                    toast.success(res.message)
                    return folderNameApi(token)
                }
            })
            .then((res) => {
                setFolder(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
        setNewFolder(false)
        setNameFolder("")
    }

    useEffect(() => {
        folderNameApi(token)
            .then((res) => {
                setFolder(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [token])
    //
    const [share, setShare] = useState(false)
    const handleShareFolder = () => {
        shareFolderToSomeOneApi(folderId, userId)
            .then((res) => {
                console.log({ message: res.message, data: res.data });
            })
            .catch((error) => {
                console.log(error);
            })
        setShare(false)
    }
    useEffect(() => {
        getUsersApi()
            .then((res) => {
                setUser(res)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    const handleSelectUser = (id) => {
        setUserId(id)
    }
    return (
        <>
            <div className="folder-container">
                <div className="row">
                    {folder.map((item, index) => (
                        <div key={index}>
                            <ContextMenuTrigger id={`image-context-menu-${index}`}>
                                <Link to={`${item.album_name}/${item._id}`} key={index}>
                                    <div className="col-md-6">
                                        <FontAwesomeIcon icon={faFolder} /> {" "}
                                        <span>{item.album_name}</span>
                                    </div>
                                </Link>
                            </ContextMenuTrigger>
                            <ContextMenu id={`image-context-menu-${index}`}>
                                <div className="action-with-image">
                                    <div className="delete">
                                        <MenuItem><FontAwesomeIcon icon={faTrash} /> Delete</MenuItem>
                                    </div>
                                    <div className="share-folder" onClick={() => { setShare(true), setFolderId(item._id) }}>
                                        <MenuItem><FontAwesomeIcon icon={faShare} /> Share </MenuItem>
                                    </div>
                                </div>
                            </ContextMenu>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                title="Share folder with..."
                centered
                open={share}
                onOk={() => handleShareFolder()}
                onCancel={() => setShare(false)}
            >
                <Select
                    mode='multiple'
                    style={{ width: 350 }}
                    onChange={handleSelectUser}
                >
                    {user.map((item, index) => (
                        <Select.Option key={index} value={item._id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            </Modal>
            <Modal
                title="New Folder"
                centered
                open={newFolder}
                onOk={() => handelCreateFolder()}
                onCancel={() => setNewFolder(false)}
            >
                <input type="text" placeholder='New folder' value={nameFolder} onChange={(e) => setNameFolder(e.target.value)} style={{ width: "300px", height: "40px", borderRadius: "4px", paddingLeft: "5px" }} />
            </Modal>
            <div className="profile-bar">
                <div className="upload">
                    <div className="upload-button" type="primary" onClick={() => setNewFolder(true)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>
        </>
    )
}
