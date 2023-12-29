import React, { useState } from 'react'
import "../../assets/css/login.css"
import { Link } from 'react-router-dom'
import { loginApi } from '../../apis/login.api'
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
export const Login = () => {
  const [login,setLogin]=useState({email:"",password:""})
  const navigate=useNavigate()
  const handleLogin=(e)=>{
    e.preventDefault()
    loginApi(login)
    .then((res)=>{
      if (res.status==401) {
        toast.warning(res.error)
      }else{
        toast.success(res.message)
        console.log(res);
        navigate("/gallery")
      }
    })
  }
  return (
    <>
    <div className='body'>
            <div className="wrapper">
              <form action="" method="post" onSubmit={handleLogin}>
                <div>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" name='email' placeholder="Email" required onChange={(e)=>setLogin((preState)=>({...preState,email:e.target.value}))}/>
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" name='password' placeholder="Password" required onChange={(e)=>setLogin((preState)=>({...preState,password:e.target.value}))}/>
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember Me</label>
                        <Link to="/auth/forgot-password">Forgot Password</Link>
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
              </form>
            </div>
        </div>

    </>

  )
}
