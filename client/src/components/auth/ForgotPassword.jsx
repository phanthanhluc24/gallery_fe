import React from 'react'
import { Link } from 'react-router-dom'
import "../../assets/css/forgotPassword.css"
export const ForgotPassword = () => {
    return (
        <>
            <div className="container">
                <div className="body-form">
                    <form action="" method="post">
                        <div className="title-form">
                            <p>Enter the email address associated with your account
                                and we'll send you a link to reset your password.</p>
                        </div>
                        <div className="input-form">
                            <input type="email" name="" id="" placeholder='Email' />
                        </div>
                        <div className="btn-form">
                            <button>Continue</button>
                        </div>
                        <div className="link-signup">
                            <p>Don't have an account? <Link className='link' to={"/register"}>Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
