import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Supplier from './pages/Supplier'
import Product from './pages/Product'
import Brand from './pages/Brand'
import Store from './pages/Store'
import Goods from './pages/Goods'
import Spec from './pages/Spec'
import Category from './pages/Category'
import Order from './pages/Order'
import Application from './pages/Application'
import Settings from './pages/Settings'
import Dictionary from './pages/Dictionary'
import Export from './pages/Export'

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#2457e6',
          colorSuccess: '#0f9f6e',
          colorWarning: '#d97706',
          colorError: '#dc2626',
          colorText: '#172033',
          colorTextSecondary: '#64748b',
          colorBorder: '#e2e8f0',
          colorBgLayout: '#f3f5f9',
          borderRadius: 8,
          fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
        },
        components: {
          Layout: { headerBg: '#ffffff', siderBg: '#101828' },
          Menu: {
            darkItemBg: '#101828',
            darkSubMenuItemBg: '#0b1220',
            darkItemSelectedBg: '#2457e6',
          },
          Table: { headerBg: '#f8fafc', headerColor: '#475467' },
        },
      }}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="supplier" element={<Supplier />} />
            <Route path="product" element={<Product />} />
            <Route path="brand" element={<Brand />} />
            <Route path="store" element={<Store />} />
            <Route path="goods" element={<Goods />} />
            <Route path="spec" element={<Spec />} />
            <Route path="category" element={<Category />} />
            <Route path="order" element={<Order />} />
            <Route path="application" element={<Application />} />
            <Route path="settings" element={<Settings />} />
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="export" element={<Export />} />
          </Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
