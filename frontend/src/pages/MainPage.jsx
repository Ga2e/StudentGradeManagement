import React, { useState } from "react";
import { Breadcrumb, Button, Flex, Layout, Menu, Space, theme, Dropdown, Avatar } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import ThemeSwitch from "../component/ThemeSwitch";
import Title from "antd/es/typography/Title";
import { Outlet, useNavigate } from "react-router";
import Bell from "../icon/Bell/Bell";
import { PermissionProvider, usePermissionContext } from "../context/Permission";
import { ADMIN } from "../constant/Role";
import { logout } from "../service/auth";
import { useMessage } from "../context/MessageProvider";
import { HomeOutlined, SettingOutlined, BookOutlined, TeamOutlined, FileTextOutlined, UserOutlined, UsergroupAddOutlined, AppstoreOutlined } from "@ant-design/icons";

const adminItems = [

  {
    key: 'institute',
    label: '学院管理',
    icon: <SettingOutlined />,
  },
  {
    key: 'professional',
    label: '专业管理',
    icon: <BookOutlined />,
  },
  {
    key: 'plan',
    label: '培养方案',
    icon: <FileTextOutlined />,
  },
  {
    key: 'class',
    label: '班级管理',
    icon: <TeamOutlined />,
  },
  {
    key: 'course',
    label: '课程管理',
    icon: <FileTextOutlined />,
  },
  {
    key: 'teacher',
    label: '教师管理',
    icon: <UserOutlined />,
  },
  {
    key: 'student',
    label: '学生管理',
    icon: <UsergroupAddOutlined />,
  },
  {
    key: 'grade',
    label: '成绩管理',
    icon: <AppstoreOutlined />,
  },
];

const studentItems = [
  {
    key: '/student/grade',
    label: '我的成绩',
    icon: <FileTextOutlined />,
  },
  {
    key: '/student/gradechart',
    label: '成绩分析',
    icon: <AppstoreOutlined />,
  },
  {
    key: '/student/course-selection',
    label: '课程选择',
    icon: <BookOutlined />,
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
  const { role, user } = usePermissionContext()
  const handleClick = async () => {
    try {
      // 尝试调用后端 logout 接口
      await logout()
    } catch (error) {
      // 如果后端没有实现 logout 接口，直接清除本地存储并跳转
      console.log("Logout API not implemented, clearing local storage directly")
    } finally {
      // 无论后端是否实现 logout 接口，都清除本地存储并跳转
      localStorage.removeItem('role')
      localStorage.removeItem('token')
      // 使用 window.location.href 确保页面刷新并跳转到登录页面
      window.location.href = "/login"
    }
  }

  const menuItems = [
    {
      key: 'logout',
      label: '退出',
      onClick: handleClick,
    },
  ]


  return (
    <Layout style={{ height: '100vh', transition: 'all 0.3s ease' }}>
      <Header style={{ display: "flex", alignItems: 'center', padding: '0 24px', height: '60px' }}>
        <Title level={2} style={{ fontWeight: 'bolder', margin: 0, marginRight: 'auto' }}>
          Easy Study
        </Title>
        <Flex align="center" gap={15}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '0' }}>
              {(() => {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                return `${year}/${month}/${day}`;
              })()}
            </div>
          </div>
          <div style={{ textAlign: 'left', marginLeft: '15px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1890ff', margin: '0' }}>
              {(() => {
                const now = new Date();
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
              })()}
            </div>
          </div>
          <Dropdown menu={{ items: menuItems }} trigger={['hover']}>
            <div style={{ cursor: 'pointer' }}>
              <Avatar size={40} style={{ backgroundColor: '#1890ff' }}>
                {role === ADMIN ? `管理员` : `学生：张三`}
              </Avatar>
            </div>
          </Dropdown>
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
            items={role === ADMIN ? adminItems : studentItems}
            mode="inline"
            inlineCollapsed={collapsed}
            style={{ height: '100%', background: token.Layout?.siderBg, padding: '16px 0' }}
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



