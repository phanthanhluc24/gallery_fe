import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const uploadImageAlbumApi = async (token,image,id) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const response = await axiosJWT.post(URL_API + `/album/upload/${id}`, { image: image }, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...headers
    }
  })
  return response.data
}
