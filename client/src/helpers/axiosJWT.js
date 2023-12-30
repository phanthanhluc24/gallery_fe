import React from 'react'
import axios from "axios"
import Cookies from "js-cookie"
import { refreshTokenApi } from '../apis/refreshToken.api'
import { URL_API } from './URL_API'
const token=Cookies.get("access-token")
export const axiosJWT =axios.create({
    baseURL:URL_API,
    withCredentials:true
})

axiosJWT.interceptors.request.use(
    (config)=>{
        if (token) {
           config.headers["Authorization"]=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
    
)

axiosJWT.interceptors.response.use(
    (response)=>{
        return response
    },
    async (error)=>{
        const originalRequest=error.config
        if (error.response.status===401 && !originalRequest._retry) {
            originalRequest._retry=true
            try {
                await refreshTokenApi()
                .then((res)=>{
                    originalRequest.headers["Authorization"]=`Bearer ${res.newAccessToken}`
                    console.log("refreshToken successfully");
                })
                .catch((error)=>{
                    console.error(error);
                })
                return axiosJWT(originalRequest)
            } catch (error) {
                console.error("Error refresh token: ",error);
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)
