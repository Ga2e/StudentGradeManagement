import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ConfigProvider } from 'antd'
import { ConfigurationProvider } from './context/Configuration.jsx'

createRoot(document.getElementById('root')).render(

  <App />


)
