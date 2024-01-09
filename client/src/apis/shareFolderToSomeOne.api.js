import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const shareFolderToSomeOneApi = async(id,receive_id) => {
  const response=await axiosJWT.post(URL_API+`/album/share/${id}`,{receive_id:receive_id})
  return response.data
}
