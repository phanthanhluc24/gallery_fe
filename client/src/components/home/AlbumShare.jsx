import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { getFolderShareApi } from '../../apis/getFolderShare.api'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

export const AlbumShare = () => {
    const token=Cookies.get("access-token")
    const [folder,setFolder]=useState([])
    useEffect(()=>{
        getFolderShareApi(token)
        .then((res)=>{
            setFolder(res)
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <>
        <div className="folder-container">
                <div className="row">
                    {folder.map((item, index) => (
                        <div key={index}>
                                <Link to={`${item.album_name}/${item._id}`} key={index}>
                                    <div className="col-md-6">
                                        <FontAwesomeIcon icon={faFolder} /> {" "}
                                        <span>{item.album_name}</span>
                                    </div>
                                </Link>
                        </div>
                    ))}
                </div>
            </div>
    </>
  )
}
