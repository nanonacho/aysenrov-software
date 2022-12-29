import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../Auth/auth"

const ProtectedRoutes = ({
    allowedRoles,
    redirectPath = "/",
    children,
  }) => {
    const auth = useAuth()
    //return allowedRoles.find((role) => auth.user.role.includes(role)) ? (
    //    children
    //) : (
    //    <Navigate to={redirectPath} replace />
    //)
    if (auth.user && allowedRoles.find((role) => auth.user.role.includes(role))) return <Navigate to={redirectPath} replace />
    return children ? children : <Outlet />
  }

export default ProtectedRoutes