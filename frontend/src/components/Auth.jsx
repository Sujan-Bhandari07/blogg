import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'


const Auth = ({children}) => {


  const navigate = useNavigate()
  const location = useLocation()
  const { isauth } = useSelector(state => state.user)
  

  useEffect(() => {
    // Redirect unauthenticated users to login (except if already on login page)
    if (!isauth && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
    // Redirect authenticated users away from login/signup pages

    if (isauth && (location.pathname === "/login")) {
      navigate("/", { replace: true });
    }
  }, [isauth, location.pathname, navigate]);
  return (
<>
{children}
</>
  )
}

export default Auth