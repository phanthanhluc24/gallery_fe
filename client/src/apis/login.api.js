import React from 'react'
import { URL_API } from '../helpers/URL_API'
export const loginApi = async(data) => {
   const response=await fetch(URL_API+"/auth/login",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify(data)
   })
   return response.json()
}
