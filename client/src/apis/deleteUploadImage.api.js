import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const deleteUploadImageApi =async (imageId,option) => {
  const response=await axiosJWT.patch(URL_API+`/upload/${imageId}/${option}`)
  return response.data
}
