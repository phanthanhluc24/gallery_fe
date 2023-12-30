import React from 'react'
import { URL_API } from '../helpers/URL_API'


export const refreshTokenApi = async() => {
  const response=await fetch(URL_API+"/auth/refresh-token",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    credentials:"include"
  })
  return response.json()
}
