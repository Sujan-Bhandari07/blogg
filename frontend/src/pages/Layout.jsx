import React from 'react'
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom"
import "../styles/Layout.css"
import logo from "../assets/logo.svg"
import arrow from "../assets/arrow.svg"
import user from "../assets/user_icon.svg"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../services/Userslice'
const Layout = () => {


 const{isauth} =useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location =useLocation()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
  return (
<div className="layout">
<nav>

    <img onClick={()=>navigate("/")} src={logo} alt="" />

    {isauth ? (
      <div className="user-menu">
        <img className="ion" src={user} alt="" />
        <div className="ab">
          <p onClick={handleLogout}>Logout</p>

          {!location.pathname.includes("/dashboard") && !location.pathname.includes("/add") && !location.pathname.includes("/list") && <p onClick={()=>navigate("/dashboard")} >Dashboard</p>}
          
         <Link to="/verify-otp"><p>Verify account</p></Link> 
        </div>
      </div>
    ) : (
      <button onClick={()=>navigate("/login")} className="login">Login<img src={arrow} alt="" /></button>
    )}


    
    </nav>
      <Outlet/>
</div>
  )
}

export default Layout