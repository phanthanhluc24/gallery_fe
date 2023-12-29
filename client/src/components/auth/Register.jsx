import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import { registerApi } from '../../apis/register.api'
import {useNavigate} from "react-router-dom"
export const Register = () => {
  const [register,setRegister]=useState({name:"",email:"",password:""})
  const navigate=useNavigate()
  const handleRegister=(e)=>{
    e.preventDefault()
    registerApi(register)
    .then((res)=>{
      if (res.status==400) {
        toast.error(res.error)
      }else{
        toast.success(res.message)
        navigate("/")
      }
    })
  }
  return (
    <>
    <div className='body'>
                <div className="wrapper">
                    <form action="" onSubmit={handleRegister} method='post'>
                        <h1>Register</h1>
                        <div className="input-box">
                            <input type="text" name='name' placeholder="Full name" onChange={(e) => setRegister((preState) => ({ ...preState, name: e.target.value }))} />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input type="email" name='email' placeholder="Email"  onChange={(e) => setRegister((preState) => ({ ...preState, email: e.target.value }))} />
                            <i className='bx bxs-lock-alt' ></i>
                        </div>
                        <div className="input-box">
                            <input type="password" name='password' placeholder="Password" onChange={(e) => setRegister((preState) => ({ ...preState, password: e.target.value }))} />
                            <i className='bx bxs-lock-alt' ></i>
                        </div>
                        <button type="submit" className="btn-login">Register</button>
                        <div className="register-link">
                            <p>Already have a count? <Link to="/">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>

    </>
  )
}
