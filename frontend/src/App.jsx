import { BrowserRouter } from "react-router"
import './App.css'
import RoutesConfig from "./RoutesConfig"
import { PermissionProvider } from "./context/Permission"
import { ConfigurationProvider } from "./context/Configuration"
import { MessageProvider } from "./context/MessageProvider"

function App() {
  return (

    <BrowserRouter>
      <ConfigurationProvider>
        <MessageProvider>
          <PermissionProvider>

            <RoutesConfig></RoutesConfig>
          </PermissionProvider>
        </MessageProvider>
      </ConfigurationProvider>
    </BrowserRouter >
  )
}

export default App
