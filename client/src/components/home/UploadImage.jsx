import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/uploadImage.css"
import Cookies from 'js-cookie';
import { uploadImageApi } from '../../apis/uploadImage.api';
import { useEffect } from 'react';
import { imagesApi } from '../../apis/images.api';
import { URL_API } from '../../helpers/URL_API';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import {CopyToClipboard} from "react-copy-to-clipboard"
import { deleteUploadImageApi } from '../../apis/deleteUploadImage.api';
export const UploadImage = () => {
    const token = Cookies.get("access-token");
    const fileInputRef = useRef()
    const [gallery, setGallery] = useState([])
    const [link,setLink]=useState("")
    const handleIconClick = (e) => {
        fileInputRef.current.click()
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            uploadImageApi(token, file)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    useEffect(() => {
        imagesApi()
            .then((res) => {
                setGallery(res.data)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const handleCopyLink=(item)=>{
        setLink(item)
        console.log("copy",item);
    }
    const handleDelete=(id)=>{
        const updateImage=gallery.filter((item)=>item._id !==id)
        setGallery(updateImage)
        deleteUploadImageApi(id,1)
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
                    {gallery.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <ContextMenuTrigger id={`image-context-menu-${index}`}>
                                <span>{item.image_name.split("-")[1]}</span>
                                <img src={`${URL_API + item.image_name}`} alt="" />
                            </ContextMenuTrigger>
                            <ContextMenu id={`image-context-menu-${index}`}>
                                <div className="action-with-image">
                                    <div className="delete" onClick={()=>handleDelete(item._id)}>
                                        <MenuItem><FontAwesomeIcon icon={faTrash} /> Delete</MenuItem>
                                    </div>
                                    <div className="copy-link" onClick={()=>handleCopyLink(item.imageURL)}>
                                        <MenuItem>
                                            <CopyToClipboard text={link} >
                                                <div>
                                                    <FontAwesomeIcon icon={faCopy} />
                                                    Copy link
                                                </div>
                                            </CopyToClipboard>
                                        </MenuItem>
                                    </div>
                                </div>
                            </ContextMenu>
                        </div>
                    ))}
                </div>
            </div>
            <div className="profile-bar">
                <div className="upload" onClick={handleIconClick}>
                    <div className="upload-button" >
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        <form action="" method="post">
                            <input type="file" name="" id="" style={{ display: "none" }} ref={fileInputRef} onChange={handleImageChange} />
                        </form>
                        {/* <p>Upload</p> */}
                    </div>
                </div>
            </div>
        </>
    )
}
