import React, { useState } from 'react'
import { Layout, Menu, Button, theme } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  GiftOutlined,
  FileTextOutlined,
  MessageOutlined,
  SettingOutlined
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: '首页'
  },
  {
    key: 'equity',
    icon: <GiftOutlined />,
    label: '权益管理',
    children: [
      { key: '/equity/inventory', label: '权益库存' },
      { key: '/equity/config', label: '权益配置' }
    ]
  },
  {
    key: '/order/list',
    icon: <FileTextOutlined />,
    label: '全部订单'
  },
  {
    key: 'sms',
    icon: <MessageOutlined />,
    label: '短信模板',
    children: [
      { key: '/sms/template', label: '全部模板' }
    ]
  },
  {
    key: 'application',
    icon: <FileTextOutlined />,
    label: '应用管理',
    children: [
      { key: '/application/list', label: '应用列表' }
    ]
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: '系统设置',
    children: [
      { key: '/system/dictionary', label: '字典设置' },
      { key: '/system/export', label: '导出设置' }
    ]
  }
]

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  // 找到当前选中的菜单项
  const getSelectedKeys = () => {
    const path = location.pathname
    if (path === '/') return ['/']
    return [path]
  }

  // 找到当前展开的菜单项
  const getOpenKeys = () => {
    const path = location.pathname
    if (path.startsWith('/equity')) return ['equity']
    if (path.startsWith('/order')) return []
    if (path.startsWith('/mall')) return ['mall']
    if (path.startsWith('/sms')) return ['sms']
    if (path.startsWith('/application')) return ['application']
    if (path.startsWith('/system')) return ['system']
    return []
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        width={220}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#fff',
          fontSize: collapsed ? 16 : 20,
          fontWeight: 'bold'
        }}>
          {collapsed ? '万象' : '万象后台'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={getOpenKeys()}
          selectedKeys={getSelectedKeys()}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: 16, fontWeight: 500 }}>万象后台管理系统</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Button type="text">通知</Button>
            <Button type="text">设置</Button>
            <Button type="text">管理员</Button>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
