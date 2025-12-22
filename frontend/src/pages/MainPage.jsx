import { Breadcrumb, Button, Flex, Layout, Menu, Space, theme } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import ThemeSwitch from "../component/ThemeSwitch";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Bell from "../icon/Bell/Bell";
import { PermissionProvider, usePermissionContext } from "../context/Permission";
import { ADMIN } from "../constant/Role";
import { logout } from "../service/auth";
import { useMessage } from "../context/MessageProvider";

const adminItems = [
  {
    key: 'institute',
    label: 'Institute',
  },
  {
    key: 'professional',
    label: 'Professional',
  },
  {
    key: 'class',
    label: 'Class',
  },
  {
    key: 'course',
    label: 'Course',
  },
  {
    key: 'teacher',
    label: 'Teacher',
  },
  {
    key: 'student',
    label: 'Student',
  },
  {
    key: 'grade',
    label: 'grade',
  },




];

const studentItems = [
  {
    key: '/student/grade',
    label: 'grade',
  },


]



const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = theme.useToken()
  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }
  const { messageApi } = useMessage()
  const nav = useNavigate()
  const { role, _ } = usePermissionContext()
  const handleClick = async () => {

    const resp = await logout()
    console.log(resp.data)
    if (resp.data.code === 200) {
      localStorage.removeItem('role')
      localStorage.removeItem('token')
      nav("/login")
    }
    else {
      messageApi.error(resp.data.message)
    }

  }
  return (
    <Layout style={{ height: '100vh', transition: 'all 0.3s ease' }}>
      <Header style={{ display: "flex", alignItems: 'center', padding: '0 24px' }}>
        <Title level={2} style={{ fontWeight: 'bolder', margin: 0, marginRight: 'auto' }}>
          Easy Study
        </Title>
        <Flex align="center" gap={15}>
          <Button onClick={handleClick}>
            logout
          </Button>
          <Bell />
          <ThemeSwitch />
        </Flex>
      </Header>

      <Layout hasSider>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
        >
          <Menu
            inlineCollapsed={collapsed}
            items={role === ADMIN ? adminItems : studentItems}
            mode="inline"
            style={{ height: '100%', background: token.Layout?.siderBg }}
            onClick={(e) => nav(e.key)}
          />
        </Sider>


        {/* 最关键的一层：flex: 1 + overflow: hidden */}
        <Content
          style={{
            margin: '25px',
            flex: 1,
            overflow: 'hidden',                    // 禁止 Content 自己滚动
            borderRadius: 15,
            background: token.colorContentBg,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Breadcrumb style={{ marginBottom: 16 }}>
          </Breadcrumb>

          <Outlet />                               {/* 你的 Institute 组件就在这里 */}
        </Content>
        {/* 关键修改结束 */}
      </Layout>
    </Layout >



  )
}

export default MainPage



