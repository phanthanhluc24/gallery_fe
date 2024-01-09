import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const getUsersApi =async () => {
 const response=await axiosJWT.get(URL_API+"/user")
 return response.data
}
