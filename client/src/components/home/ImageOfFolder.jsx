import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { CopyToClipboard } from "react-copy-to-clipboard"
import { faArrowLeft, faArrowUpFromBracket, faCopy, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { uploadImageAlbumApi } from '../../apis/uploadImageAlbum.api';
import { deleteUploadImageApi } from "../../apis/deleteUploadImage.api"
import { imageAlbumApi } from '../../apis/imageAlbum.api';
import { toast } from "react-toastify"
import { URL_API } from '../../helpers/URL_API';
import { Modal } from "antd";
import { imagesApi } from '../../apis/images.api';
import { uploadImageGalleryApi } from '../../apis/uploadImageGallery.api';
export const ImageOfFolder = () => {
    const { id } = useParams()
    const { folder } = useParams()
    const fileInputRef = useRef()
    const [gallery, setGallery] = useState([])
    const [image, setImage] = useState([])
    const [link, setLink] = useState("")
    const token = Cookies.get("access-token");
    const navigate = useNavigate()
    const [uploadImage, setUploadImage] = useState(false)
    const [exitImage, setExitImage] = useState([])
    const [idImage, setIdImage] = useState([])
    const handleIconClick = (e) => {
        fileInputRef.current.click()
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            uploadImageAlbumApi(token, file, id)
                .then((res) => {
                    if (res.status == 200) {
                        toast.success(res.message)
                        return imageAlbumApi(id, token)
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
        imageAlbumApi(id, token)
            .then((res) => {
                setGallery(res.data)
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [token])
    const handleUploadImage = () => {
        uploadImageGalleryApi(id, idImage)
            .then((res) => {
                return imageAlbumApi(id, token)
            })
            .then((res) => {
                setGallery(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
        setUploadImage(false)
    }
    useEffect(() => {
        imagesApi(token)
            .then((res) => {
                setImage(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [token])
    const handleChooseImage = (index, id) => {
        if (exitImage.includes(index)) {
            setExitImage(exitImage.filter((indexImage) => indexImage != index))
        } else {
            setExitImage([...exitImage, index])
        }
        if (idImage.includes(id)) {
            setIdImage(idImage.filter((imageId) => imageId != id))
        } else {
            setIdImage([...idImage, id])
        }
    }
    return (
        <>
            <div className='turn-back-page'>
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
                <p>Album/<span>{folder}</span></p>
            </div>

            <div className="container">
                <div className="row">
                    {gallery[0] != null && gallery.map((item, index) => (
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
            <Modal
                title="Share image with ..."
                centered
                open={uploadImage}
                onOk={() => handleUploadImage()}
                onCancel={() => setUploadImage(false)}
            >
                <div className="image-upload">
                    <div className="select-image-update">
                        {image.map((item, index) => (
                            <div key={index} onClick={() => handleChooseImage(index, item._id)}>
                                {
                                    exitImage.includes(index) ? (
                                        <div className='choose-image-upload'>
                                            <img src={URL_API + item.image_name} alt="" />
                                        </div>
                                    ) : (
                                        <div>
                                            <img src={URL_API + item.image_name} alt="" />
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
            <div className="upload-image-from-gallery">
                <div className="upload" onClick={() => setUploadImage(true)}>
                    <div className="upload-button" >
                        <FontAwesomeIcon icon={faImage} />
                    </div>
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
