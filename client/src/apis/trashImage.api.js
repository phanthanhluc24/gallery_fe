import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const trashImageApi =async () => {
  const response= await axiosJWT.get(URL_API+"/upload/trash")
  return response.data
}
