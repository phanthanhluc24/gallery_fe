import React from 'react'
import { Login } from '../components/auth/Login'
import { Register } from '../components/auth/Register'
import { Home } from '../components/home/Home'
import { UploadImage } from '../components/home/UploadImage'
import { TrashImage } from '../components/home/TrashImage'
import { AlbumImage } from '../components/home/AlbumImage'
import { ImageOfFolder } from '../components/home/ImageOfFolder'
import { ForgotPassword } from '../components/auth/ForgotPassword'
import { ResetPassword } from '../components/auth/ResetPassword'
import { AlbumShare } from '../components/home/AlbumShare'
import { ImageOfAlbumShare } from '../components/home/ImageOfAlbumShare'

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
                element:<AlbumImage/>,
            },{
                path:"album/:folder/:id",
                element:<ImageOfFolder/>
            },
            {
                path:"share-album",
                element:<AlbumShare/>
            },{
                path:"share-album/:folder/:id",
                element:<ImageOfAlbumShare/>
            }
        ]
    },{
        path:"/forgot-password",
        element:<ForgotPassword/>
    },{
        path:"/reset-new-password/:token",
        element:<ResetPassword/>
    }
]
