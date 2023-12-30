import React from 'react'
import { Login } from '../components/auth/Login'
import { Register } from '../components/auth/Register'
import { Home } from '../components/home/Home'
import { UploadImage } from '../components/home/UploadImage'

export const Index = () => [
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/gallery",
        element:<Home/>,
        children:[
            {
                path:"/gallery",
                element:<UploadImage/>
            }
        ]
    }
]
