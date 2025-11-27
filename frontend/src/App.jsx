import { BrowserRouter } from "react-router"
import './App.css'
import { Button, ConfigProvider } from "antd"
import ThemeSwitch from "./component/ThemeSwitch"
import RoutesConfig from "./RoutesConfig"
import { PermissionProvider } from "./context/Permission"
import { ConfigurationProvider } from "./context/Configuration"

function App() {
  return (

    <BrowserRouter>
      <ConfigurationProvider>

        <PermissionProvider>

          <RoutesConfig></RoutesConfig>
        </PermissionProvider>
      </ConfigurationProvider>
    </BrowserRouter >
  )
}

export default App
