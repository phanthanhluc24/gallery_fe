import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'
import Cookies from 'js-cookie'
export const currentUserApi =async () => {
  // const headers={
  //   Authorization:`Bearer ${token}`
  // }
  const response=await axiosJWT.get(URL_API+"/auth/currentUser",{
    headers:{
      "Content-Type":"application/json",
        // ...headers
    }
  })
  return response.data
}
