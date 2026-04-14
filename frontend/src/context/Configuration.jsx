import { ConfigProvider } from "antd"
import { createContext, useState, useContext, useEffect } from "react"
import { darkMode, lightMode } from "../constant/theme"

const ConfigurationContext = createContext()

export const ConfigurationProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saveTheme = localStorage.getItem('theme')

    let useTheme = lightMode

    switch (saveTheme) {
      case 'dark':
        useTheme = darkMode
        break
      case 'light':
        useTheme = lightMode
        break
      default:
        break;
    }
    return useTheme
  })
  return (
    <ConfigurationContext.Provider value={{ theme, setTheme }} >
      <ConfigProvider theme={theme}>
        {children}
      </ConfigProvider>
    </ConfigurationContext.Provider >
  )
}

export const useConfigurationContext = () => {
  const context = useContext(ConfigurationContext)
  if (!context) {
    throw new Error('useConfigurationContext must be used within a ConfigurationProvider')
  }
  return context
}
