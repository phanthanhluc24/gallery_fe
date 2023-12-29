import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'
export const currentUserApi =async () => {
  const response=await axiosJWT.get(URL_API+"auth/currentUser")
  return response.data
}
