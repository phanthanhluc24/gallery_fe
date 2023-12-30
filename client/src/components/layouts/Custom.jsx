import React from 'react'
import { Header } from './Header'
import {Outlet} from "react-router-dom"
import "../../assets/css/body.css"
import { Sidebar } from './Sidebar'
export const Custom = () => {
  return (
    <>
    <div className="layout">
        <div className="header-side">
          <Header />
        </div>
        <div className="layout-body">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="layout-content">
            <Outlet />
          </div>
        </div>
      </div>

    </>
  )
}
