import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const imagesApi =async () => {
  const response =await axiosJWT.get(URL_API+"/upload")
  return response.data
}
