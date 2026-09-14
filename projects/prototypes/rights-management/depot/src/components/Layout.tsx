import { useState } from 'react'
import {
  Layout as AntLayout,
  Menu,
  Dropdown,
  Avatar,
  Button,
  Tooltip,
} from 'antd'
import {
  HomeOutlined,
  TeamOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import routes from '@/routes'

const { Header, Sider, Content } = AntLayout

const menuItems = [
  { key: '/', label: '工作台', icon: <HomeOutlined /> },
  {
    key: 'supplier-group',
    label: '供给管理',
    icon: <TeamOutlined />,
    children: [
      { key: '/supplier', label: '供应商' },
      { key: '/product', label: '供应商产品' },
    ],
  },
  {
    key: 'catalog-group',
    label: '商品中心',
    icon: <TagsOutlined />,
    children: [
      { key: '/brand', label: '品牌管理' },
      { key: '/store', label: '门店管理' },
      { key: '/goods', label: '标准商品' },
      { key: '/spec', label: '商品规格' },
      { key: '/category', label: '分类管理' },
    ],
  },
  { key: '/order', label: '履约订单', icon: <ShoppingCartOutlined /> },
  { key: '/application', label: '应用管理', icon: <AppstoreOutlined /> },
  {
    key: 'settings-group',
    label: '系统管理',
    icon: <SettingOutlined />,
    children: [
      { key: '/settings', label: '系统概览' },
      { key: '/dictionary', label: '字典设置' },
      { key: '/export', label: '导出管理' },
    ],
  },
]

const userMenuItems = [
  { key: 'profile', label: '个人中心' },
  { key: 'settings', label: '账号设置' },
  { key: 'logout', label: '退出登录' },
]

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const currentRoute = routes.find((route) => route.path === location.pathname)
  const currentName = currentRoute?.name || '云仓工作台'

  return (
    <AntLayout className="rm-app">
      <Sider
        className="rm-sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={76}
        width={232}
      >
        <div className="rm-brand">
          <div className="rm-brand-mark" aria-hidden="true">YC</div>
          {!collapsed && (
            <div className="rm-brand-copy">
              <strong>云仓</strong>
              <small>Supply · 01</small>
            </div>
          )}
        </div>
        {!collapsed && <div className="rm-menu-label">权益协同平台</div>}
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['supplier-group', 'catalog-group']}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
        {!collapsed && (
          <div className="rm-sidebar-footer">标准化外部供给，向权益服务层提供稳定商品规格。</div>
        )}
      </Sider>

      <AntLayout className="rm-shell">
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
              <small>云仓 / 供给标准化</small>
              <strong>{currentName}</strong>
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
                <span className="rm-user-copy"><strong>管理员</strong><small>产品运营</small></span>
              </button>
            </Dropdown>
          </div>
        </Header>

        <Content className="rm-content">
          <div className="rm-page">
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  )
}
