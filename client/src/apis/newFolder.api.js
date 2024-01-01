import React from 'react'
import { axiosJWT } from "../helpers/axiosJWT"
import { URL_API } from '../helpers/URL_API'
export const newFolderApi = async (name, token) => {
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const response = await axiosJWT.post(URL_API + "/album", { album_name: name }, {
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
    })
    return response.data
}
