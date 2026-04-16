import { createContext, useContext, useMemo, useState, useEffect } from "react"
import { ADMIN, STUDENT } from "../constant/Role"

const PermissionContext = createContext()


export const PermissionProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role")
    return storedRole || ""
  })

  useEffect(() => {
    // 当role变化时，更新localStorage
    if (role) {
      localStorage.setItem("role", role)
    }
  }, [role])

  return (
    <PermissionContext.Provider value={{ role, setRole }}>
      {children}
    </PermissionContext.Provider>
  )
}

export const usePermissionContext = () => (useContext(PermissionContext))
