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
    <Layout style={{ transition: 'all 2s ease', height: '100%' }}>
      <Header style={{
        display: "flex",
        alignItems: 'center',

      }}>
        <Title level={2} style={{ fontWeight: 'bolder', marginBottom: 0, marginLeft: 0, marginRight: 'auto' }}>Easy Study</Title>
        <Flex align="center" gap={15}>
          <Bell></Bell>
          <ThemeSwitch></ThemeSwitch>
        </Flex>

      </Header>


      <Layout>
        <Sider width={200} onCollapse={handleCollapse} collapsed={collapsed} collapsible >
          <Menu inlineCollapsed={collapsed} items={items} mode='inline' style={{ height: '100%', overflowY: 'scroll', scrollbarWidth: 'none', background: token.Layout.siderBg }}>

          </Menu>
        </Sider>
        <Layout style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}>
          <Breadcrumb style={{ marginBottom: 15 }}>
            <Breadcrumb.Item>sample</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ borderRadius: 15, background: token.colorContentBg, scrollbarWidth: 'none' }}>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout >

  )
}

export default MainPage



