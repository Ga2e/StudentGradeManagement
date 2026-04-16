import { Navigate } from "react-router"
import { usePermissionContext } from "../context/Permission"

const RoleCheck = ({ children, required = [] }) => {
  const { role, _ } = usePermissionContext()
  console.log("RoleCheck - role:", role, "required:", required)
  // 处理required是字符串的情况
  const requiredRoles = typeof required === 'string' ? [required] : required;
  if (!isSignIn(role) || !requiredRoles.includes(role)) {
    console.log("Permission denied")
    return <Navigate to="/login" replace></Navigate>

  }
  return <>{children}</>

}

const isSignIn = (role) => (role !== '')

export default RoleCheck
