import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
          colorPrimary: '#00b96b',
          colorSuccess: '#00b96b',
        },
      }}
    >
      <BrowserRouter basename="/projects/depot/dist">
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
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
