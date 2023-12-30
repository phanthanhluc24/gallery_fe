import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Modal } from "antd";
export const AlbumImage = () => {
    const [newFolder, setNewFolder] = useState(false);
    const handelCreateFolder=()=>{
        setNewFolder(false)
    }
    return (
        <>
            <Modal
                title="New Folder"
                centered
                open={newFolder}
                onOk={() => handelCreateFolder()}
                onCancel={() => setNewFolder(false)}
            >
                <input type="text" placeholder='New folder' style={{width:"300px",height:"40px",borderRadius:"4px",paddingLeft:"5px"}}/>
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
