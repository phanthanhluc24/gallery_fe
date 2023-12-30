import React, { useEffect, useState } from 'react'
import { trashImageApi } from '../../apis/trashImage.api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";
import { deleteUploadImageApi } from '../../apis/deleteUploadImage.api';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { URL_API } from '../../helpers/URL_API';
export const TrashImage = () => {
    const [trashImage, setTrashImage] = useState([])
    useEffect(() => {
        trashImageApi()
            .then((res) => {
                setTrashImage(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleDelete=(id)=>{
        const updateImage=trashImage.filter((item)=>item._id !==id)
        setTrashImage(updateImage)
        deleteUploadImageApi(id,3)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleRecover=(id)=>{
        const updateImage=trashImage.filter((item)=>item._id !==id)
        setTrashImage(updateImage)
        deleteUploadImageApi(id,2)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    {trashImage.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <ContextMenuTrigger id={`image-context-menu-${index}`}>
                                <span>{item.image_name.split("-")[1]}</span>
                                <img src={`${URL_API + item.image_name}`} alt="" />
                            </ContextMenuTrigger>
                            <ContextMenu id={`image-context-menu-${index}`}>
                                <div className="action-with-image">
                                    <div className="delete" onClick={() => handleDelete(item._id)}>
                                        <MenuItem><FontAwesomeIcon icon={faTrash} /> Delete forever</MenuItem>
                                    </div>
                                    <div className="copy-link" onClick={() => handleRecover(item._id)}>
                                        <MenuItem>
                                                    <FontAwesomeIcon icon={faUndo} />
                                                    Recover
                                        </MenuItem>
                                    </div>
                                </div>
                            </ContextMenu>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
