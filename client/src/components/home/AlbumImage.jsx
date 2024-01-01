import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react'
import { Modal } from "antd";
import { newFolderApi } from '../../apis/newFolder.api';
import { folderNameApi } from '../../apis/folderName.api';
import Cookies from 'js-cookie';
import { toast } from "react-toastify"
import "../../assets/css/folder.css"
import { Link } from "react-router-dom"
export const AlbumImage = () => {
    const token = Cookies.get("access-token");
    const [newFolder, setNewFolder] = useState(false);
    const [nameFolder, setNameFolder] = useState("")
    const [folder, setFolder] = useState([])
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
    return (
        <>
            <div className="folder-container">
                <div className="row">
                    {folder.map((item, index) => (
                        <Link to={`${item.album_name}/${item._id}`}  key={index}>
                            <div className="col-md-6">
                                <FontAwesomeIcon icon={faFolder} /> {" "}
                                <span>{item.album_name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
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
