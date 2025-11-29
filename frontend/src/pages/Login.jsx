import { Button, Divider, Flex, Form, Input, Space, theme, Typography } from "antd"
import Title from "antd/es/typography/Title"
import { useState } from "react";
import { login } from "../service/auth";
import { useNavigate } from "react-router";
import { usePermissionContext } from "../context/Permission";
import { ADMIN, STUDENT } from "../constant/Role";

const Login = () => {
  const [r, setR] = useState(ADMIN)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const { token } = theme.useToken()
  const nav = useNavigate()
  const { _, setRole } = usePermissionContext()
  const onFinish = async (value) => {
    setLoading(true)
    await login(value)
      .then(resp => {
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('role', resp.data.user.role.name)
        setRole(value.role)

        nav("/")
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
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

            <Input></Input>
          </Form.Item>
          <Form.Item name='password'>
            <Input></Input>
          </Form.Item>
          <Form.Item name='role' hidden initialValue={r}>

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
