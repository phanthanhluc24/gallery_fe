import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const logoutApi =async () => {
  const response=await axiosJWT.post(URL_API+"auth/logout")
  return response.data
}
