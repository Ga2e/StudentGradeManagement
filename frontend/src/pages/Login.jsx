import { Button, Divider, Flex, Form, Image, Input, Space, theme, Typography } from "antd"
import Title from "antd/es/typography/Title"
import { useEffect, useState } from "react";
import { login } from "../service/auth";
import { useNavigate } from "react-router";
import { usePermissionContext } from "../context/Permission";
import { ADMIN, STUDENT } from "../constant/Role";
import { useMessage } from "../context/MessageProvider";
import { getCaptcha, verifyCaptcha } from "../service/captcha";
import Captcha from "../component/Captcha";

const Login = () => {
  const { messageApi } = useMessage()
  const { _, setRole } = usePermissionContext()
  const nav = useNavigate()
  const [form] = Form.useForm();
  const { token } = theme.useToken()

  const [r, setR] = useState(ADMIN)
  const [loading, setLoading] = useState(false)
  const [captchaKey, setCaptchaKey] = useState("")
  const onCaptchaReady = (captchaKey) => {
    setCaptchaKey(captchaKey)
  }
  const [captchaCode, setCaptchaCode] = useState("")


  const onFinish = async (value) => {
    setLoading(true)
    if (captchaCode === "") {
      messageApi.error("please input capthca")
      setLoading(false)

      return
    }
    const resp = await verifyCaptcha({ captchaCode: captchaCode, captchaKey: captchaKey })

    if (resp.code != 200) {
      messageApi.error("captcha verify faild")
      setLoading(false)
      return

    }

    await login(value)
      .then(resp => {
        if (resp.data.code === 200) {
          localStorage.setItem('token', resp.data.data.token)
          localStorage.setItem('role', resp.data.data.user.role.name)
          setRole(value.role)
          messageApi.info('login success')
          nav("/")

        } else {

          messageApi.error(resp.data.message)
          setLoading(false)
        }
      })
    setLoading(false)

  }
  return (
    <Flex
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
        background: token.Layout.bodyBg
      }}
    >


      <Flex align="center" vertical style={{
        border: token.colorBorder,
        flexBasis: 425,
        height: 600,
        background: token.colorContentBg,
        borderRadius: 20,
      }}>

        <Title level={2} style={{
          textAlign: 'center',
          margin: "50px 0px"
        }}>
          Easy Study
        </Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>

          <Form.Item name='username'>

            <Input placeholder="username"></Input>
          </Form.Item>
          <Form.Item name='password'>
            <Input placeholder="password"   ></Input>
          </Form.Item>
          <Form.Item name='role' hidden initialValue={r}>

          </Form.Item>
          <Form.Item>

            <Space.Compact style={{ width: '100%' }}>
              <Input
                style={{ width: 'calc(100% - 90px)' }}
                placeholder="captcha"
                onInput={(e) => setCaptchaCode(e.target.value)}
              >

              </Input>
              <Captcha onCaptchaReady={onCaptchaReady}>
              </Captcha>
            </Space.Compact >
          </Form.Item>
          <Form.Item style={{
            marginTop: 40
          }}>
            <Space size={90}>
              <Button type="primary" loading={loading} htmlType="submit">Submit</Button>
              <Button type="link">forget?</Button>
            </Space>
          </Form.Item>
        </Form >
      </Flex>
    </Flex >

  )

}

export default Login
