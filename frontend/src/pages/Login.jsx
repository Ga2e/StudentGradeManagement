import { Button, Divider, Flex, Form, Input, Space, theme, Typography } from "antd"
import Title from "antd/es/typography/Title"

const Login = () => {
  const { token } = theme.useToken()
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
        <Form layout="vertical" style={{
        }} wrapperCol={{
        }} >

          <Form.Item name='username'>

            <Input></Input>
          </Form.Item>
          <Form.Item name='password'>
            <Input></Input>
          </Form.Item>
          <Form.Item style={{
            marginTop: 40
          }}>
            <Space size={90}>
              <Button type="primary">Submit</Button>
              <Button type="link">forget?</Button>
            </Space>
          </Form.Item>
        </Form >
      </Flex>
    </Flex >

  )

}

export default Login
