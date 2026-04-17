import Input from "antd/es/input/Input"
import { useMessage } from "../context/MessageProvider"
import { getCaptcha, verifyCaptcha } from "../service/captcha"
import { useEffect, useState } from "react"
import { Button, Space } from "antd"

const Captcha = ({ onCaptchaReady }) => {
  const { messageApi } = useMessage()

  const [captcha, setCaptcha] = useState("")
  const onVerify = () => {
    handleVerify()
    verify()
  }

  const loadCapcha = async () => {
    const resp = await getCaptcha()
    const key = resp.headers['x-captcha-key']
    const uri = URL.createObjectURL(resp.data)
    setCaptcha(uri)
    onCaptchaReady(key)
  }

  const refreshCaptcha = async () => {
    if (captcha) URL.revokeObjectURL(captcha)
    loadCapcha()
  }


  useEffect(() => {
    loadCapcha()
  }, [])
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: 32,
      border: '1px solid #d9d9d9',
      borderLeft: 'none',
      borderRadius: '0 6px 6px 0',
      overflow: 'hidden',
      background: '#fff'
    }}>
      <img
        src={captcha}
        alt="验证码"
        style={{
          width: 90,
          height: 32,
          cursor: 'pointer',
          objectFit: 'cover'
        }}

        onClick={refreshCaptcha}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = '加载失败';
        }}
      />
    </div>
  )

}
export default Captcha
