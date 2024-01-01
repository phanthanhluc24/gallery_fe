import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const logoutApi =async (token) => {
  const headers={
    Authorization: `Bearer ${token}`
  }
  const response=await axiosJWT.post(URL_API+"/auth/logout",{
    headers:{
      "Content-Type":"application/json",
      ...headers
    },
  })
  return response.data
}
