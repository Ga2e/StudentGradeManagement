import { BrowserRouter } from "react-router"
import './App.css'
import RoutesConfig from "./RoutesConfig"
import { PermissionProvider } from "./context/Permission"
import { ConfigurationProvider } from "./context/Configuration"
import { MessageProvider } from "./context/MessageProvider"
import { App as AntdApp } from "antd"

function App() {
  return (

    <BrowserRouter>
      <AntdApp>
        <ConfigurationProvider>
          <MessageProvider>
            <PermissionProvider>

              <RoutesConfig></RoutesConfig>
            </PermissionProvider>
          </MessageProvider>
        </ConfigurationProvider>
      </AntdApp>
    </BrowserRouter >
  )
}

export default App
