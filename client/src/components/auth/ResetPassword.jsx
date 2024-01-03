import React, { useState } from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { resetNewPasswordApi } from '../../apis/resetNewPassword.api'
import {toast} from "react-toastify"
export const ResetPassword = () => {
    const {token}=useParams()
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    console.log(token);
    const handleResetPassword=(e)=>{
        e.preventDefault()
        resetNewPasswordApi(password,token)
        .then((res)=>{
            if (res.status==201) {
                toast.success(res.message)
                navigate("/")
            }else{
                toast.error(res.message)
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
        <>
            <div className="container-">
                <div className="body-form">
                    <form action="" method="post">
                        <div className="title-form">
                            <p>Enter your new password</p>
                        </div>
                        <div className="input-form">
                            <input type="password" name="" id="" placeholder='New password' onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="btn-form" onClick={handleResetPassword}>
                            <button>Reset Password</button>
                        </div>
                        <div className="link-signup">
                            <p>Already have a count? <Link className='link' to="/">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
