import { message } from "antd"
import { createContext, useContext } from "react"

const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
  const [messageApi, messageContent] = message.useMessage({
    duration: 2
  })
  return (
    <MessageContext.Provider value={{ messageApi }} >
      {messageContent}
      {children}
    </MessageContext.Provider>

  )

}

export const useMessage = () => {
  const context = useContext(MessageContext)

  return context
}
