import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import EquityInventory from './pages/Equity/Inventory'
import EquityInventoryDetail from './pages/Equity/InventoryDetail'
import InventoryCreate from './pages/Equity/InventoryCreate'
import EquityConfig from './pages/Equity/Config'
import EquityConfigDetail from './pages/Equity/ConfigDetail'
import ConfigCreate from './pages/Equity/ConfigCreate'
import OrderList from './pages/Order/List'
import OrderDetail from './pages/Order/Detail'
import SmsTemplate from './pages/Sms/Template'
import SmsCreate from './pages/Sms/Create'
import ApplicationList from './pages/Application/List'
import DictionarySetting from './pages/System/DictionarySetting'
import ExportSetting from './pages/System/ExportSetting'
import WriteOffStrategy from './pages/WriteOff/Strategy'
import WriteOffTask from './pages/WriteOff/Task'
import WriteOffCallback from './pages/WriteOff/Callback'

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="equity/inventory" element={<EquityInventory />} />
          <Route path="equity/inventory/:id" element={<EquityInventoryDetail />} />
          <Route path="equity/inventory/create" element={<InventoryCreate />} />
          <Route path="equity/config" element={<EquityConfig />} />
          <Route path="equity/config/:id" element={<EquityConfigDetail />} />
          <Route path="equity/config/create" element={<ConfigCreate />} />
          <Route path="order/list" element={<OrderList />} />
          <Route path="order/detail/:id" element={<OrderDetail />} />
          <Route path="writeoff/strategy" element={<WriteOffStrategy />} />
          <Route path="writeoff/task" element={<WriteOffTask />} />
          <Route path="writeoff/callback" element={<WriteOffCallback />} />
          <Route path="sms/template" element={<SmsTemplate />} />
          <Route path="sms/template/create" element={<SmsCreate />} />
          <Route path="application/list" element={<ApplicationList />} />
          <Route path="system/dictionary" element={<DictionarySetting />} />
          <Route path="system/export" element={<ExportSetting />} />
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
