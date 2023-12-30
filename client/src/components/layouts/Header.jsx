import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/header.css"
import { currentUserApi } from '../../apis/currentUser.api';
import Cookies from 'js-cookie';
export const Header = () => {
    const token=Cookies.get("access-token");
    const [fullName,setFullName]=useState("")
    useEffect(()=>{
        currentUserApi(token)
        .then((res)=>{
            setFullName(res.name)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[token])

    const handleLogout=()=>{

    }
  return (
    <>
    <div className="header">
                <div className="logo">
                    <p>HCLOUND</p>
                </div>
                <div className="search-bar">
                    <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
                    <button type="submit" className="searchButton">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </div>
                <div className="profile-logout-bar">
                    <div className="logout" onClick={handleLogout}>
                        <div className="logout-button" >
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                            <p>Logout</p>
                        </div>
                    </div>
                    <div className="profile">
                        <p>{fullName.charAt(0)}</p>
                    </div>
                </div>
            </div>

    </>
  )
}
