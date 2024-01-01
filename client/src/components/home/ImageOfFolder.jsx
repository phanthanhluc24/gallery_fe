import React, { useEffect, useRef, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { CopyToClipboard } from "react-copy-to-clipboard"
import { faArrowLeft, faArrowUpFromBracket, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { uploadImageAlbumApi } from '../../apis/uploadImageAlbum.api';
import {deleteUploadImageApi} from "../../apis/deleteUploadImage.api"
import { imageAlbumApi } from '../../apis/imageAlbum.api';
import { toast } from "react-toastify"
import { URL_API } from '../../helpers/URL_API';
export const ImageOfFolder = () => {
    const { id } = useParams()
    const {folder}=useParams()  
    const fileInputRef = useRef()
    const [gallery, setGallery] = useState([])
    const [link, setLink] = useState("")
    const token = Cookies.get("access-token");
    const navigate=useNavigate()
    const handleIconClick = (e) => {
        fileInputRef.current.click()
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            uploadImageAlbumApi(token, file,id)
                .then((res) => {
                    if (res.status == 200) {
                        toast.success(res.message)
                        return imageAlbumApi(id,token)
                    }
                })
                .then((res) => {
                    setGallery(res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    const handleCopyLink = (item) => {
        setLink(item)
    }
    const handleDelete = (id) => {
        const updateImage = gallery.filter((item) => item._id !== id)
        setGallery(updateImage)
        deleteUploadImageApi(id, 1)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        imageAlbumApi(id,token)
            .then((res) => {
                setGallery(res.data)
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [token])
    return (
        <>
            <div className='turn-back-page'>
                <FontAwesomeIcon icon={faArrowLeft } onClick={()=>navigate(-1)}/>
                <p>Album/<span>{folder}</span></p>
            </div>
          
            <div className="container">
                <div className="row">
                    {gallery[0]!=null && gallery.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <ContextMenuTrigger id={`image-context-menu-${index}`}>
                                <span>{item.image_name.split("-")[1]}</span>
                                <img src={`${URL_API + item.image_name}`} alt="" />
                            </ContextMenuTrigger>
                            <ContextMenu id={`image-context-menu-${index}`}>
                                <div className="action-with-image">
                                    <div className="delete" onClick={() => handleDelete(item._id)}>
                                        <MenuItem><FontAwesomeIcon icon={faTrash} /> Delete</MenuItem>
                                    </div>
                                    <div className="copy-link" onClick={() => handleCopyLink(item.imageURL)}>
                                        <MenuItem>
                                            <CopyToClipboard text={link} >
                                                <div>
                                                    <FontAwesomeIcon icon={faCopy} /> {" "}
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
