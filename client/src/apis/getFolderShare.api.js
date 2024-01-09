import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const getFolderShareApi =async (token) => {
  const response=await axiosJWT.get(URL_API+"/album/share-album",{
    headers:{
        Authorization:`Bearer ${token}`
    }
  })
  return response.data
}
