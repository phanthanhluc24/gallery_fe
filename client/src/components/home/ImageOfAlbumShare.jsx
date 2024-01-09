import React, { useEffect, useState } from 'react'
import { imageAlbumApi } from '../../apis/imageAlbum.api'
import Cookies from 'js-cookie'
import {useParams} from "react-router-dom"
import { URL_API } from '../../helpers/URL_API'

export const ImageOfAlbumShare = () => {
    const [gallery,setGallery]=useState([])
    const token=Cookies.get("access-token")
    const {id}=useParams()
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
  return (
    <>
    <div className="container">
                <div className="row">
                    {gallery.map((item, index) => (
                        <div className="col-md-4" key={index}>
                                <span>{item.image_name.split("-")[1]}</span>
                                <img src={`${URL_API + item.image_name}`} alt="" />
                        </div>
                    ))}
                </div>
            </div>
    </>
  )
}
