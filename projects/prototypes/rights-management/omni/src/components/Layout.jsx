import React, { useState } from 'react'
import { Layout, Menu, Button, Tooltip, Dropdown, Avatar } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  GiftOutlined,
  FileTextOutlined,
  MessageOutlined,
  SettingOutlined,
  AppstoreOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: '工作台' },
  {
    key: 'equity',
    icon: <GiftOutlined />,
    label: '权益中心',
    children: [
      { key: '/equity/inventory', label: '权益库存' },
      { key: '/equity/config', label: '权益配置' },
    ],
  },
  { key: '/order/list', icon: <FileTextOutlined />, label: '发放订单' },
  {
    key: 'sms',
    icon: <MessageOutlined />,
    label: '消息管理',
    children: [{ key: '/sms/template', label: '短信模板' }],
  },
  {
    key: 'application',
    icon: <AppstoreOutlined />,
    label: '应用管理',
    children: [{ key: '/application/list', label: '应用列表' }],
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      { key: '/system/dictionary', label: '字典设置' },
      { key: '/system/export', label: '导出设置' },
    ],
  },
]

const pageNames = {
  '/': '权益服务工作台',
  '/equity/inventory': '权益库存',
  '/equity/inventory/create': '新建权益库存',
  '/equity/config': '权益配置',
  '/equity/config/create': '新建权益配置',
  '/order/list': '发放订单',
  '/writeoff/strategy': '核销策略',
  '/writeoff/task': '核销任务',
  '/writeoff/callback': '结果回传',
  '/sms/template': '短信模板',
  '/sms/template/create': '新建短信模板',
  '/application/list': '应用列表',
  '/system/dictionary': '字典设置',
  '/system/export': '导出设置',
}

const userMenuItems = [
  { key: 'profile', label: '个人中心' },
  { key: 'settings', label: '账号设置' },
  { key: 'logout', label: '退出登录' },
]

function getPageName(path) {
  if (pageNames[path]) return pageNames[path]
  if (path.startsWith('/equity/inventory/')) return '权益库存详情'
  if (path.startsWith('/equity/config/')) return '权益配置详情'
  if (path.startsWith('/order/detail/')) return '订单详情'
  return '万象工作台'
}

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout className="rm-app">
      <Sider
        className="rm-sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={76}
        width={232}
      >
        <div className="rm-brand">
          <div className="rm-brand-mark" aria-hidden="true">WX</div>
          {!collapsed && (
            <div className="rm-brand-copy">
              <strong>万象</strong>
              <small>Service · 02</small>
            </div>
          )}
        </div>
        {!collapsed && <div className="rm-menu-label">权益协同平台</div>}
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={['equity']}
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
        {!collapsed && (
          <div className="rm-sidebar-footer">将标准商品组织为可配置、可发放、可追踪的权益服务。</div>
        )}
      </Sider>

      <Layout className="rm-shell">
        <Header className="rm-header">
          <div className="rm-header-start">
            <button
              className="rm-collapse"
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? '展开导航' : '收起导航'}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <div className="rm-context">
              <small>万象 / 权益服务</small>
              <strong>{getPageName(location.pathname)}</strong>
            </div>
            <span className="rm-stage">原型环境</span>
          </div>

          <div className="rm-header-end">
            <Tooltip title="帮助与说明">
              <Button type="text" aria-label="帮助与说明" icon={<QuestionCircleOutlined />} />
            </Tooltip>
            <Tooltip title="通知">
              <Button type="text" aria-label="通知" icon={<BellOutlined />} />
            </Tooltip>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <button className="rm-user" type="button">
                <Avatar size={28} icon={<UserOutlined />} style={{ background: '#2457e6' }} />
                <span className="rm-user-copy"><strong>管理员</strong><small>权益运营</small></span>
              </button>
            </Dropdown>
          </div>
        </Header>

        <Content className="rm-content">
          <div className="rm-page">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
