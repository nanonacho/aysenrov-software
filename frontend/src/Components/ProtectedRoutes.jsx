import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../Auth/auth"

const ProtectedRoutes = ({
    noAuth = false,
    allowedRoles,
    redirectPath = "/",
    children,
  }) => {
    const auth = useAuth()
    if (noAuth) return (
      !auth.user ? (
        children ? children : <Outlet/>
      ) : (
        <Navigate to={redirectPath} replace />
      )
    )
    else return(
      allowedRoles?.find((role) => auth?.user?.role?.includes(role)) ? (
        children ? children : <Outlet/>
      ) : (
        <Navigate to={redirectPath} replace />
      )
    )
  }

export default ProtectedRoutes