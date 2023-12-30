import React from 'react'
import { Login } from '../components/auth/Login'
import { Register } from '../components/auth/Register'
import { Home } from '../components/home/Home'
import { UploadImage } from '../components/home/UploadImage'
import { TrashImage } from '../components/home/TrashImage'
import { AlbumImage } from '../components/home/AlbumImage'

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
            },{
                path:"trash",
                element:<TrashImage/>
            },{
                path:"album",
                element:<AlbumImage/>
            }
        ]
    }
]
