import { useEffect, useState } from "react"

import { Switch, Typography } from "antd"
import { useConfigurationContext } from "../context/Configuration"
import { darkMode, lightMode } from "../constant/theme"


const ThemeSwitch = () => {
  const { theme, setTheme } = useConfigurationContext()
  // checked is true then mode is dark 
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    const shouldUseDark = theme === darkMode ? true : false

    setChecked(shouldUseDark)
    localStorage.setItem('theme', shouldUseDark ? 'dark' : 'light')
  }, [theme])
  const handleChange = (check) => {
    setTheme(check ? darkMode : lightMode)
    setChecked(check)
  }
  return (
    <Switch checked={checked} onChange={handleChange}>

    </Switch>
  )
}

export default ThemeSwitch
