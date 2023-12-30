import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/uploadImage.css"
export const UploadImage = () => {
    const fileInputRef=useRef()
    const [image,setImage]=useState(null)
    const handleIconClick=(e)=>{
        fileInputRef.current.click()
    }
    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        if (file) {
            const reader=new FileReader()
            reader.onload((e)=>{
                setImage(e.target.result)
            })
            reader.readAsDataURL(file)
        }
    }
    return (
        <>
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
