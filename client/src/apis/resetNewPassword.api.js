import React from 'react'
import { URL_API } from '../helpers/URL_API'

export const resetNewPasswordApi = async(password,token) => {
  const response=await fetch(URL_API+"/user/reset-password",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({password:password,token:token})
  })
  return response.json()
}
