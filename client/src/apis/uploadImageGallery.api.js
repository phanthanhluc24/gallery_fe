import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const uploadImageGalleryApi = async (id,imageId) => {
  const response=await axiosJWT.post(URL_API+`/album/image-upload/${id}`,{imageId:imageId})
  return response.data
}
