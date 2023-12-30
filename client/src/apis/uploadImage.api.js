import React from 'react'
import { axiosJWT } from '../helpers/axiosJWT'
import { URL_API } from '../helpers/URL_API'

export const uploadImageApi = async (token,image) => {
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const response = await axiosJWT.post(URL_API + "/upload/image", { image: image }, {
        headers: {
            "Content-Type": "multipart/form-data",
            ...headers
        }
    })
    return response.data
}
