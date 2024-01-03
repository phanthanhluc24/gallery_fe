import React from 'react'
import { URL_API } from '../helpers/URL_API'

export const forgetPasswordApi =async (email) => {
    const response= await fetch(URL_API+'/user/forgot-password',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email:email})
    })
    return response.json()
}
