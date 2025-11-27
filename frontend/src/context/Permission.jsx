import { createContext, useContext, useMemo, useState } from "react"
import { ADMIN, STUDENT } from "../constant/Role"

const PermissionContext = createContext()


export const PermissionProvider = ({ children }) => {
  const [role, setRole] = useState(STUDENT)
  return (
    <PermissionContext.Provider value={{ role, setRole }}>


      {children}
    </PermissionContext.Provider>

  )
}

export const usePermissionContext = () => (useContext(PermissionContext))
