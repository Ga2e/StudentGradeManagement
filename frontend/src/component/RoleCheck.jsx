import { Navigate } from "react-router"
import { usePermissionContext } from "../context/Permission"

const RoleCheck = ({ children, required = [] }) => {
  const { role, _ } = usePermissionContext()
  if (!isSignIn(role) || !required.includes(role)) {
    return <Navigate to="/login" replace></Navigate>

  }
  return <>{children}</>

}

const isSignIn = (role) => (role !== '')

export default RoleCheck
