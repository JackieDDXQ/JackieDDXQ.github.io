import { useState } from 'react'
import {
  Layout as AntLayout,
  Menu,
  Breadcrumb,
  Dropdown,
  Avatar,
  Tooltip,
} from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  PauseOutlined,
  ShoppingCartOutlined,
  MoreOutlined,
  AppstoreOutlined,
  SettingOutlined,
  CopyrightOutlined,
  CrownOutlined,
  BellOutlined,
  UpCircleOutlined,
  RestOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import routes from '@/routes'
import TabBar from './TabBar'

const { Header, Sider, Content } = AntLayout

const menuItems = [
  { key: '/', label: '首页', icon: <HomeOutlined /> },
  {
    key: 'supplier-group',
    label: '供应商管理',
    icon: <UserOutlined />,
    children: [
      { key: '/supplier', label: '供应商' },
      { key: '/product', label: '产品管理' },
    ],
  },
  {
    key: 'brand-group',
    label: '品牌管理',
    icon: <PauseOutlined />,
    children: [
      { key: '/brand', label: '品牌管理' },
      { key: '/store', label: '门店管理' },
      { key: '/goods', label: '商品管理' },
      { key: '/spec', label: '规格管理' },
      { key: '/category', label: '分类管理' },
    ],
  },
  {
    key: '/order',
    label: '订单管理',
    icon: <ShoppingCartOutlined />,
  },
  {
    key: '/application',
    label: '应用管理',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'settings-group',
    label: '系统设置',
    icon: <SettingOutlined />,
    children: [
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
  const [openKeys, setOpenKeys] = useState(['supplier-group', 'brand-group', 'settings-group'])

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key)
  }

  const getBreadcrumb = () => {
    const pathname = location.pathname
    const route = routes.find((r) => r.path === pathname)
    if (!route) return []

    const parts = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ path: '/', label: '首页' }]

    let currentPath = ''
    parts.forEach((part) => {
      currentPath += `/${part}`
      const routeItem = routes.find((r) => r.path === currentPath)
      if (routeItem) {
        breadcrumbs.push({ path: currentPath, label: routeItem.name })
      }
    })

    return breadcrumbs
  }

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: '#0d1117',
          minWidth: collapsed ? 64 : 200,
        }}
      >
        <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: collapsed ? 20 : 18,
              fontWeight: 'bold',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #00b96b, #009955)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: collapsed ? 0 : 8,
              }}
            >
              <MoreOutlined style={{ color: '#fff', fontSize: 18 }} />
            </div>
            {!collapsed && <span>云仓</span>}
          </div>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        >
          {menuItems.map((item) =>
            item.children ? (
              <Menu.SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
              >
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>{child.label}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <AntLayout>
        <Header
          style={{
            background: '#fff',
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '12px',
                cursor: 'pointer',
                fontSize: 18,
              }}
            >
              {collapsed ? (
                <CopyrightOutlined />
              ) : (
                <CrownOutlined />
              )}
            </button>

            <Breadcrumb
              style={{
                marginLeft: 16,
                fontSize: 14,
              }}
            >
              {getBreadcrumb().map((item, index) => (
                <Breadcrumb.Item key={item.path}>
                  {index === getBreadcrumb().length - 1 ? (
                    item.label
                  ) : (
                    <a href={item.path}>{item.label}</a>
                  )}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Tooltip title="刷新">
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 8,
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                <RestOutlined />
              </button>
            </Tooltip>

            <Tooltip title="帮助">
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 8,
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                <UpCircleOutlined />
              </button>
            </Tooltip>

            <Dropdown
              menu={{
                items: userMenuItems,
              }}
            >
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 8,
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                <BellOutlined />
              </button>
            </Dropdown>

            <Dropdown
              menu={{
                items: userMenuItems,
              }}
            >
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Avatar icon={<UserOutlined />} />
                <span style={{ fontSize: 14 }}>管理员</span>
                <MoreOutlined />
              </button>
            </Dropdown>
          </div>
        </Header>

        <TabBar />

        <Content
          style={{
            padding: '20px',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 130px)',
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}