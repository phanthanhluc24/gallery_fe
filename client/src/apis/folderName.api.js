import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const folderNameApi =async (token) => {
    const headers={
        Authorization:`Bearer ${token}`
      }
  const response=await axiosJWT.get(URL_API+"/album",{
    headers:{
        "Content-Type":"application/json",
        ...headers
    }
  })
  return response.data
}
