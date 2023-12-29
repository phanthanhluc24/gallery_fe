import React from 'react'
import { URL_API } from '../helpers/URL_API'


export const registerApi = async(data) => {
  const response=await fetch(URL_API+"/auth/register",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  return response.json()
}
