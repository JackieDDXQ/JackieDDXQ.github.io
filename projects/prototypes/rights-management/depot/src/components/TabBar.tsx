import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'

interface Tab {
  key: string
  name: string
  path: string
}

const initialTabs: Tab[] = [
  { key: '/', name: '首页', path: '/' },
]

export default function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tabs, setTabs] = useState<Tab[]>(initialTabs)

  const currentPath = location.pathname

  const routeNames: Record<string, string> = {
    '/': '首页',
    '/supplier': '供应商',
    '/product': '产品管理',
    '/brand': '品牌管理',
    '/store': '门店管理',
    '/goods': '商品管理',
    '/spec': '规格管理',
    '/category': '分类管理',
    '/order': '订单管理',
    '/application': '应用管理',
    '/settings': '系统设置',
  }

  const currentTab = tabs.find((tab) => tab.path === currentPath)
  
  if (!currentTab) {
    const newTab: Tab = {
      key: currentPath,
      name: routeNames[currentPath] || currentPath,
      path: currentPath,
    }
    setTabs([...tabs, newTab])
  }

  const handleTabClick = (path: string) => {
    navigate(path)
  }

  const handleCloseTab = (key: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (tabs.length === 1) return
    if (key === currentPath) {
      const currentIndex = tabs.findIndex((tab) => tab.key === key)
      const newIndex = currentIndex === 0 ? 1 : currentIndex - 1
      navigate(tabs[newIndex].path)
    }
    setTabs(tabs.filter((tab) => tab.key !== key))
  }

  return (
    <div
      style={{
        background: '#fff',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        overflowX: 'auto',
      }}
    >
      {tabs.map((tab) => (
        <div
          key={tab.key}
          onClick={() => handleTabClick(tab.path)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            cursor: 'pointer',
            borderBottom:
              tab.path === currentPath ? '2px solid #00b96b' : 'none',
            color: tab.path === currentPath ? '#00b96b' : '#666',
            backgroundColor: tab.path === currentPath ? '#f6ffed' : 'transparent',
            whiteSpace: 'nowrap',
          }}
        >
          <span>{tab.name}</span>
          {tabs.length > 1 && (
            <button
              onClick={(e) => handleCloseTab(tab.key, e)}
              style={{
                border: 'none',
                background: 'transparent',
                marginLeft: 8,
                cursor: 'pointer',
                opacity: 0.5,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.5'
              }}
            >
              <CloseOutlined style={{ fontSize: 12 }} />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
