import { Breadcrumb, Flex, Layout, Menu, Space, theme } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import ThemeSwitch from "../component/ThemeSwitch";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { Outlet } from "react-router";
import Bell from "../icon/Bell/Bell";

const items = [
  {
    key: 'sub1',
    label: 'Navigation One',
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        key: 'g2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];




const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = theme.useToken()
  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout style={{ height: '100vh', transition: 'all 0.3s ease' }}>
      <Header style={{ display: "flex", alignItems: 'center', padding: '0 24px' }}>
        <Title level={2} style={{ fontWeight: 'bolder', margin: 0, marginRight: 'auto' }}>
          Easy Study
        </Title>
        <Flex align="center" gap={15}>
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
            items={items}
            mode="inline"
            style={{ height: '100%', background: token.Layout?.siderBg }}
          />
        </Sider>

        {/* 关键修改开始：让内容区域真正撑满 */}
        <Layout style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <Breadcrumb style={{ marginBottom: 16 }}>
          </Breadcrumb>

          {/* 最关键的一层：flex: 1 + overflow: hidden */}
          <Content
            style={{
              flex: 1,
              overflow: 'hidden',                    // 禁止 Content 自己滚动
              borderRadius: 15,
              background: token.colorContentBg,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Outlet />                               {/* 你的 Institute 组件就在这里 */}
          </Content>
        </Layout>
        {/* 关键修改结束 */}
      </Layout>
    </Layout >



  )
}

export default MainPage



